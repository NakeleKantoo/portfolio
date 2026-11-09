import { objects, type GameObject } from '../game/world';

/**
 * Versão "terminal menu" do leonna.os para telas pequenas:
 * a sala ASCII em 80 colunas vira ilegível no celular, então ali a navegação
 * é uma lista de verdade (DOM, tocável, acessível por teclado e leitor de tela).
 */
export function MenuScreen({
  activeId,
  onOpen,
}: {
  activeId: string | null;
  onOpen: (obj: GameObject) => void;
}) {
  return (
    <div className="menu-screen" role="navigation" aria-label="Objetos da sala">
      <p className="menu-cmd">leonna@navegador:~$ ls ~/sala</p>
      <ul>
        {objects.map((obj, i) => (
          <li key={obj.id}>
            <button
              type="button"
              onClick={() => onOpen(obj)}
              aria-current={activeId === obj.id ? 'true' : undefined}
              className="menu-item"
            >
              <span className="menu-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu-label">{obj.label}</span>
              <span aria-hidden="true">↗</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="menu-cmd menu-dim">clique num objeto para abrir</p>
    </div>
  );
}
