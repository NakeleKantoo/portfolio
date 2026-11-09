/**
 * Efeito CRT via WebGL:
 * - curvatura de tubo, scanlines, máscara de fósforo
 * - bloom barato, vinheta, flicker, barra de rolagem
 * - monocromático: luminância x cor do fósforo (uniforme uTint)
 * Se WebGL não existir, cai para `drawImage` + overlays CSS.
 */
export type Painter = {
  setSource(src: HTMLCanvasElement): void;
  setTint(hex: string): void;
  resize(): void;
  dispose(): void;
  readonly kind: 'webgl' | '2d';
};

export function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace('#', '');
  const full = v.length === 3 ? v.split('').map((c) => c + c).join('') : v;
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ];
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uTex;
uniform vec2 uSize;
uniform float uTime;
uniform float uPower;
uniform float uCurve;
uniform float uScan;
uniform float uAberr;
uniform float uVig;
uniform float uMotion;
uniform vec3 uTint;

vec2 curve(vec2 uv) {
  uv = uv * 2.0 - 1.0;
  vec2 o = abs(uv.yx) / vec2(5.0, 4.0);
  uv += uv * o * o * uCurve;
  return uv * 0.5 + 0.5;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = curve(vUv);

  // fora do tubo: preto (cantos arredondados do CRT)
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    return;
  }

  vec2 cc = uv - 0.5;
  vec2 off = cc * (0.10 + dot(cc, cc) * 12.0) * uAberr;

  // sangramento de fósforo: luminância deslocada nas bordas
  float lum = texture2D(uTex, uv).r * 0.2126
            + texture2D(uTex, uv).g * 0.7152
            + texture2D(uTex, uv).b * 0.0722;

  float bleed = texture2D(uTex, uv + off).r * 0.2126
              + texture2D(uTex, uv + off).g * 0.7152
              + texture2D(uTex, uv + off).b * 0.0722;
  float bleed2 = texture2D(uTex, uv - off).r * 0.2126
               + texture2D(uTex, uv - off).g * 0.7152
               + texture2D(uTex, uv - off).b * 0.0722;
  lum = max(lum, (bleed + bleed2) * 0.35);

  // bloom
  vec2 px = 1.0 / uSize;
  float glow = 0.0;
  glow += texture2D(uTex, uv + vec2(px.x * 1.5, 0.0)).r;
  glow += texture2D(uTex, uv - vec2(px.x * 1.5, 0.0)).r;
  glow += texture2D(uTex, uv + vec2(0.0, px.y * 1.5)).r;
  glow += texture2D(uTex, uv - vec2(0.0, px.y * 1.5)).r;
  lum += glow * 0.06;

  // scanlines
  float lines = 0.5 + 0.5 * sin(uv.y * uSize.y * 3.14159265);
  lum *= mix(1.0, 0.72 + 0.42 * lines, uScan);

  // barra de rolagem + flicker + ruído (fora com prefers-reduced-motion)
  float roll = abs(fract(uv.y * 0.9 - uTime * 0.06) - 0.5) * 2.0;
  lum *= 1.0 - 0.10 * smoothstep(0.80, 1.0, roll) * uMotion;
  lum *= 1.0 + 0.012 * sin(uTime * 47.0) * uMotion;
  lum += (hash(uv * uSize + fract(uTime) * 91.0) - 0.5) * 0.03 * uMotion;

  // vinheta
  lum *= 1.0 - uVig * pow(min(1.0, length(cc) * 1.35), 2.2);

  // resposta do fósforo: gamma + cor única
  lum = pow(max(lum, 0.0), 0.94) * 1.10;
  vec3 col = uTint * lum;

  gl_FragColor = vec4(col * uPower, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function createPainter(
  canvas: HTMLCanvasElement,
  motion: boolean,
  force2d = false,
  tint = '#ffb000',
): Painter {
  if (force2d) return create2DPainter(canvas, tint);
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  });
  if (gl) {
    const painter = createWebGLPainter(canvas, gl, motion, tint);
    if (painter) return painter;
  }
  return create2DPainter(canvas, tint);
}

function createWebGLPainter(
  canvas: HTMLCanvasElement,
  gl: WebGLRenderingContext,
  motion: boolean,
  tint: string,
): Painter | null {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);

  const u = {
    tex: gl.getUniformLocation(program, 'uTex'),
    size: gl.getUniformLocation(program, 'uSize'),
    time: gl.getUniformLocation(program, 'uTime'),
    power: gl.getUniformLocation(program, 'uPower'),
    curve: gl.getUniformLocation(program, 'uCurve'),
    scan: gl.getUniformLocation(program, 'uScan'),
    aberr: gl.getUniformLocation(program, 'uAberr'),
    vig: gl.getUniformLocation(program, 'uVig'),
    motion: gl.getUniformLocation(program, 'uMotion'),
    tint: gl.getUniformLocation(program, 'uTint'),
  };

  gl.uniform1f(u.curve, 0.24);
  gl.uniform1f(u.scan, 0.6);
  gl.uniform1f(u.aberr, 0.0016);
  gl.uniform1f(u.vig, 0.34);
  gl.uniform1f(u.motion, motion ? 1 : 0);

  const applyTint = (hex: string) => {
    const [r, g, b] = hexToRgb(hex);
    gl.uniform3f(u.tint, r, g, b);
  };
  applyTint(tint);

  let hasSource = false;
  let raf = 0;
  const start = performance.now();

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(u.size, w, h);
  };

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    resize();
    gl.uniform1f(u.time, (now - start) / 1000);
    const t = Math.min(1, (now - start) / 700);
    gl.uniform1f(u.power, t * t * (3 - 2 * t));
    if (!hasSource) {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return;
    }
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  raf = requestAnimationFrame(loop);

  return {
    kind: 'webgl',
    resize,
    setTint: applyTint,
    setSource(src) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);
      hasSource = true;
    },
    dispose() {
      cancelAnimationFrame(raf);
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    },
  };
}

/** Fallback sem WebGL: desenha o canvas cru e deixa o CRT por conta do CSS. */
function create2DPainter(canvas: HTMLCanvasElement, tint: string): Painter {
  const ctx = canvas.getContext('2d');
  let source: HTMLCanvasElement | null = null;
  let color = tint;

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    paint();
  };

  const paint = () => {
    if (!ctx || !source) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
    // tinge o quadro com o fósforo escolhido
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';
  };

  return {
    kind: '2d',
    resize,
    setTint(hex) {
      color = hex;
      paint();
    },
    setSource(src) {
      source = src;
      paint();
    },
    dispose() {
      source = null;
    },
  };
}
