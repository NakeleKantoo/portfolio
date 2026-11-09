import { useEffect, useRef } from 'react';
import { projects } from '../shared/Projects';
import type { GameObject } from '../game/world';

type Props = {
  object: GameObject;
  onClose: () => void;
  onTextMode: () => void;
  onToggleSound: () => void;
  soundOn: boolean;
};

export function ProjectPanel({ object, onClose, onTextMode, onToggleSound, soundOn }: Props) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const target = object.target;

  useEffect(() => {
    closeRef.current?.focus();
  }, [object.id]);

  const project = target.kind === 'project' ? projects.find((p) => p.title === target.project) : undefined;
  const isDoc = target.kind === 'pdf';

  return (
    <div
      className={`panel${isDoc ? ' panel-doc' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
    >
      <div className="panel-bar">
        <span id="panel-title">┌─ {object.label} ─</span>
        <button ref={closeRef} type="button" onClick={onClose} className="panel-close">
          [ESC] fechar
        </button>
      </div>

      <div className="panel-body">
        {project && (
          <>
            <p className="panel-tagline">{project.tagline}</p>
            <p className="panel-text">{project.description}</p>
            <ul className="panel-tags">
              {project.tags.map((tag) => (
                <li key={tag}>[{tag.toLowerCase()}]</li>
              ))}
            </ul>
            <ul className="panel-links">
              {project.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    &gt; {link.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (abre em nova aba)</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {target.kind === 'link' && (
          <>
            <p className="panel-tagline">{object.hint}</p>
            <ul className="panel-links">
              <li>
                <a href={target.href} target="_blank" rel="noreferrer">
                  &gt; abrir <span aria-hidden="true">↗</span>
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            </ul>
          </>
        )}

        {isDoc && (
          <>
            <p className="panel-tagline">currículo · {object.hint}</p>
            <div className="panel-doc-frame">
              <iframe src={`${target.href}#view=FitH`} title="Currículo de Leonna Tomás Viegas" />
            </div>
            <ul className="panel-links panel-links-row">
              <li>
                <a href={target.href} target="_blank" rel="noreferrer">
                  &gt; abrir em nova aba <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a href={target.href} download>
                  &gt; baixar pdf <span aria-hidden="true">↓</span>
                </a>
              </li>
            </ul>
          </>
        )}

        {target.kind === 'sound' && (
          <>
            <p className="panel-text">
              Os blips do terminal são sintetizados na hora com WebAudio — nenhum arquivo de áudio.
              Ficam guardados na sua preferência local.
            </p>
            <ul className="panel-links">
              <li>
                <button type="button" onClick={onToggleSound} className="panel-link-button">
                  &gt; som: {soundOn ? 'ligado — desligar' : 'desligado — ligar'}
                </button>
              </li>
            </ul>
          </>
        )}

        {target.kind === 'text' && (
          <>
            <p className="panel-text">
              Canal de fuga: a versão em texto, sem jogo, com todos os projetos e links em HTML normal.
            </p>
            <ul className="panel-links">
              <li>
                <button type="button" onClick={onTextMode} className="panel-link-button">
                  &gt; entrar no modo texto
                </button>
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
