import { useState } from "react";
import { ELEMENT_LABEL, LINES } from "@/lib/pet/data";
import { useGame } from "@/lib/pet/store";
import { cn } from "@/lib/utils";

const ORDER = ["agumon", "etemon", "gabumon", "veemon"] as const;

export function ChooseScreen() {
  const choose = useGame((s) => s.choose);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <main className="flex min-h-dvh items-center justify-center px-4 py-5 sm:px-6">
      <div className="ds-console ds-shell-padding mx-auto w-full max-w-5xl">
        <div className="ds-top-bezel">
          <div className="ds-lights">
            <span className="ds-led is-on" />
            <span className="ds-led" />
            <span className="ds-led" />
          </div>
          <div className="ds-screen room-day ds-gridline px-4 py-6 sm:px-6">
            <h1 className="text-center font-display text-2xl font-semibold tracking-tight text-fg">Escolha sua linha</h1>
            <p className="mt-2 text-center text-sm text-muted">Voce comeca nesta forma e evolui cuidando bem.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {ORDER.map((id) => {
                const line = LINES[id];
                const on = selected === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    className={cn(
                      "ds-card flex flex-col items-center p-4 text-center transition-all duration-150",
                      on ? "ring-2 ring-accent border-[color:var(--color-accent)] translate-y-[-1px]" : "hover:translate-y-[-1px]",
                    )}
                  >
                    <div className="flex h-28 w-full items-center justify-center rounded-xl border border-white/60 bg-white/35">
                      <img src={line.sprite} alt="" className="pixel max-h-28 max-w-full object-contain" />
                    </div>
                    <h2 className="mt-3 text-sm font-semibold text-fg">{line.name}</h2>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">
                      {ELEMENT_LABEL[line.element]}
                    </p>
                    <p className="mt-2 text-xs leading-snug text-subtle">{line.blurb}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ds-hinge" />

        <div className="ds-bottom-panel px-4 pb-5 pt-4">
          <div className="ds-slot px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Toque em uma linha e confirme abaixo
          </div>
          <div className="mt-4 flex justify-center">
            <button
              type="button"
              disabled={!selected}
              onClick={() => selected && choose(selected)}
              className="ds-button ds-button-primary h-12 w-full max-w-xs text-sm font-semibold disabled:opacity-40"
            >
              Confirmar escolha
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
