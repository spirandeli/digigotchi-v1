import { useEffect, useState } from "react";
import { useGame } from "@/lib/pet/store";

export function StartScreen() {
  const startNew = useGame((s) => s.startNew);
  const continueSave = useGame((s) => s.continueSave);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(useGame.getState().hasSave());
  }, []);

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-6">
      <div className="ds-console ds-shell-padding w-full max-w-md">
        <div className="ds-top-bezel">
          <div className="ds-lights">
            <span className="ds-led is-on" />
            <span className="ds-led" />
            <span className="ds-led" />
          </div>
          <div className="ds-screen room-day ds-gridline flex min-h-[310px] flex-col items-center justify-center px-6 py-10 text-center">
            <p className="ds-titlebar mb-4 px-4 py-1 text-[11px] font-semibold tracking-[0.28em] text-muted uppercase">
              Parceiro digital
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              Digital Pet
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Escolha uma linha, cuide todos os dias e evolua. O tempo continua mesmo quando voce sai.
            </p>
          </div>
        </div>

        <div className="ds-hinge" />

        <div className="ds-bottom-panel px-4 pb-5 pt-4">
          <div className="ds-slot px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Menu inferior estilo Nintendo DS
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={startNew}
              className="ds-button ds-button-primary h-12 text-sm font-semibold transition-transform duration-150"
            >
              Comecar
            </button>
            {saved ? (
              <button
                type="button"
                onClick={() => continueSave()}
                className="ds-button h-12 text-sm font-medium transition-transform duration-150"
              >
                Continuar
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
