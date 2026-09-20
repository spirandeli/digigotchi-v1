import { useEffect, useRef, useState } from "react";
import {
  Bath,
  Bed,
  CheckCircle2,
  Compass,
  Coins,
  HeartPulse,
  Package,
  RotateCcw,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Utensils,
  Volleyball,
} from "lucide-react";

import { ITEMS, LINES, SPRITE_ANIMATIONS, SPRITE_STAGE_LAYOUT } from "@/lib/pet/data";
import { currentName, currentSprite, getMood, xpToNext } from "@/lib/pet/engine";
import { actions, useGame } from "@/lib/pet/store";
import { createRunInput } from "@/lib/pet/digital-path-bridge";
import { maybePlayIdleSound, preloadDigimonAudio } from "@/lib/pet/audio";
import { getSkillForSpecies, QA_XP_MULTIPLIER } from "@/lib/pet/skills";
import { getDigitalPathManifest } from "@/lib/digital-path/runtime/manifests";
import { cn } from "@/lib/utils";

const SKILL_FX: Record<string, string> = {
  "attack-pepper-breath": "fire",
  "attack-mega-flame": "fire",
  "attack-terra-force": "energy",
  "attack-love-serenade": "sound-wave",
  "attack-banana-slip": "banana",
  "attack-blue-blaster": "blue-fire",
  "attack-howling-blaster": "blue-fire",
  "attack-wolf-claw": "claw",
  "attack-vee-headbutt": "speed",
  "attack-fire-rocket": "fire",
  "attack-vee-laser": "laser",
};

const STATS = [
  { key: "hunger", label: "Fome", cls: "bg-hunger" },
  { key: "happiness", label: "Felicidade", cls: "bg-happy" },
  { key: "energy", label: "Energia", cls: "bg-energy" },
  { key: "hygiene", label: "Higiene", cls: "bg-hygiene" },
  { key: "health", label: "Saude", cls: "bg-health" },
] as const;

export function PlayScreen() {
  const pet = useGame((s) => s.pet);
  const speech = useGame((s) => s.speech);
  const anim = useGame((s) => s.anim);
  const busyUntil = useGame((s) => s.busyUntil);
  const panel = useGame((s) => s.panel);
  const setPanel = useGame((s) => s.setPanel);
  const tick = useGame((s) => s.tick);
  const reset = useGame((s) => s.reset);

  useEffect(() => {
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  useEffect(() => {
    if (!pet?.speciesId) return;
    preloadDigimonAudio(pet.speciesId);
    if (pet.isSleeping) return;
    const idleId = window.setInterval(() => maybePlayIdleSound(pet.speciesId), 22000);
    return () => window.clearInterval(idleId);
  }, [pet?.speciesId, pet?.isSleeping]);

  if (!pet) return null;

  const name = currentName(pet);
  const sprite = currentSprite(pet);
  const mood = getMood(pet);
  const sleeping = pet.isSleeping;
  const actionBusy = busyUntil > Date.now();
  const spriteAction = sleeping ? "sleep" : SPRITE_ANIMATIONS[pet.speciesId]?.[anim] ? anim : "idle";

  return (
    <div className="mx-auto flex min-h-dvh max-w-lg items-center justify-center px-3 py-4 sm:px-4">
      <div className="ds-console ds-shell-padding w-full max-w-lg">
        <div className="ds-top-bezel">
          <div className="ds-lights">
            <span className="ds-led is-on" />
            <span className="ds-led" />
            <span className="ds-led" />
          </div>

          <header className="ds-titlebar relative z-20 mb-3 flex items-center justify-between px-4 py-2.5">
            <div>
              <p className="text-sm font-semibold text-fg">{name}</p>
              <p className="text-xs tabular-nums text-muted">
                Nv. {pet.level} · {pet.experience}/{xpToNext(pet.level)} XP
              </p>
            </div>
            <div className="ds-pill flex items-center gap-2 px-3 py-1.5 text-sm font-medium tabular-nums text-fg">
              <Coins className="size-3.5 text-muted" />
              {pet.coins}
            </div>
          </header>

          <section className={cn("ds-screen relative z-0 flex h-[42vh] min-h-[250px] max-h-[360px] shrink-0 items-center justify-center overflow-hidden", sleeping ? "room-night" : "room-day")}>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-black/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.3),transparent_68%)]" />
            <div className={cn("relative z-10", sleeping && "opacity-90")}>
              {actionBusy && SKILL_FX[spriteAction] ? <SkillEffect family={SKILL_FX[spriteAction]} /> : null}
              <PetSprite speciesId={pet.speciesId} action={spriteAction} fallback={sprite} name={name} isSleeping={sleeping} />
              {sleeping ? <span className="sleep-zzz" aria-hidden="true">Zzz</span> : null}
            </div>
            {sleeping ? (
              <span className="ds-pill absolute left-3 top-3 px-2.5 py-1 text-[11px] font-medium text-muted">
                Sono turbo · +8 energia / 1s
              </span>
            ) : null}
            {speech ? (
              <p className="absolute bottom-3 left-1/2 z-20 max-w-[85%] -translate-x-1/2 rounded-2xl border border-white/60 bg-white/85 px-3 py-1.5 text-center text-xs font-medium text-fg shadow-[0_6px_16px_rgba(0,0,0,0.14)]">
                {speech}
              </p>
            ) : null}
            {mood !== "idle" && mood !== "happy" ? (
              <span className="ds-pill absolute right-3 top-3 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted">
                {moodLabel(mood)}
              </span>
            ) : null}
          </section>
        </div>

        <div className="ds-hinge" />

        <div className="ds-bottom-panel px-3 pb-4 pt-3">
          <section className="ds-slot space-y-2 px-3 py-3">
            {STATS.map((s) => {
              const value = pet[s.key];
              return (
                <div key={s.key} className="grid grid-cols-[86px_1fr_34px] items-center gap-2 text-xs">
                  <span className="font-medium text-muted">{s.label}</span>
                  <div className="h-2.5 overflow-hidden rounded-full border border-white/65 bg-white/45 shadow-inner">
                    <div className={cn("h-full rounded-full transition-[width] duration-500", s.cls)} style={{ width: `${value}%` }} />
                  </div>
                  <span className="text-right tabular-nums font-semibold text-fg">{value}</span>
                </div>
              );
            })}
          </section>

          <nav className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            <Action icon={Utensils} label="Comer" disabled={actionBusy} onClick={() => actions.feed()} />
            <Action icon={Volleyball} label="Brincar" disabled={actionBusy} onClick={() => actions.play()} />
            <Action icon={Compass} label="Caminho Digital" onClick={() => setPanel("digital-path")} />
            <Action icon={Bed} label={sleeping ? "Acordar" : "Dormir"} disabled={actionBusy} onClick={() => actions.sleep()} />
            <Action icon={Bath} label="Banho" disabled={actionBusy} onClick={() => actions.clean()} />
            <Action icon={HeartPulse} label="Saude" disabled={actionBusy} onClick={() => actions.heal()} />
          </nav>

          <footer className="mt-3 grid grid-cols-5 gap-1.5 border-t border-[rgba(116,135,157,0.48)] px-1 pt-3">
            <NavBtn icon={Package} label="Itens" onClick={() => setPanel("inventory")} />
            <NavBtn icon={Store} label="Loja" onClick={() => setPanel("shop")} />
            <NavBtn icon={Sparkles} label="Evoluir" onClick={() => setPanel("evolution")} />
            <NavBtn icon={Settings} label="Ajustes" onClick={() => setPanel("settings")} />
            <NavBtn
              icon={RotateCcw}
              label="Novo"
              onClick={() => {
                if (window.confirm("Criar um novo parceiro? O atual sera apagado.")) reset();
              }}
            />
          </footer>
        </div>

        {panel ? (
          <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 p-3 sm:items-center" onClick={() => setPanel(null)}>
            <div className={cn("ds-modal max-h-[88vh] w-full overflow-y-auto p-5", panel === "digital-path" ? "max-w-xl" : "max-w-md")} onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-base font-semibold text-fg">
                  {panel === "inventory"
                    ? "Inventário"
                    : panel === "shop"
                    ? "Loja"
                    : panel === "training"
                    ? "Treino"
                    : panel === "digital-path"
                    ? "Caminho Digital"
                    : panel === "settings"
                    ? "Configurações"
                    : "Árvore de Evolução"}
                </h2>
                <button type="button" className="ds-button px-3 py-1.5 text-sm font-medium" onClick={() => setPanel(null)}>
                  Fechar
                </button>
              </div>
              {panel === "inventory" ? <Inventory /> : null}
              {panel === "shop" ? <Shop /> : null}
              {panel === "evolution" ? <Evolution /> : null}
              {panel === "training" ? <Training /> : null}
              {panel === "digital-path" ? <DigitalPathEntry /> : null}
              {panel === "settings" ? <SettingsPanel /> : null}
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
}

function PetSprite({
  speciesId,
  action,
  fallback,
  name,
  isSleeping,
}: {
  speciesId: string;
  action: string;
  fallback: string;
  name: string;
  isSleeping?: boolean;
}) {
  const resolvedAction = isSleeping ? "sleep" : action;
  const animation = SPRITE_ANIMATIONS[speciesId]?.[resolvedAction] ?? SPRITE_ANIMATIONS[speciesId]?.sleep ?? SPRITE_ANIMATIONS[speciesId]?.idle;
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    setFrameIndex(0);
    if (!animation || animation.frames.length <= 1) return;
    const frameMs = Math.max(70, Math.round(1000 / animation.fps));
    const id = window.setInterval(() => {
      setFrameIndex((current) => {
        if (animation.loop === false) return Math.min(current + 1, animation.frames.length - 1);
        return (current + 1) % animation.frames.length;
      });
    }, frameMs);
    return () => window.clearInterval(id);
  }, [animation, speciesId, resolvedAction]);

  useEffect(() => {
    const animations = SPRITE_ANIMATIONS[speciesId];
    if (!animations) return;
    const urls = Object.values(animations).flatMap((entry) => entry.frames);
    urls.forEach((url) => {
      const image = new Image();
      image.src = url;
    });
  }, [speciesId]);

  const safeFrameIndex = Math.max(0, Math.min(frameIndex, (animation?.frames.length ?? 1) - 1));
  const src = animation?.frames[safeFrameIndex] ?? fallback;
  const layout = SPRITE_STAGE_LAYOUT[speciesId] ?? { scale: 1, x: 0, y: 0 };
  const sleepPose = isSleeping ? { scale: Math.max(0.9, (layout.scale ?? 1) * 0.98), x: layout.x, y: (layout.y ?? 0) + 12 } : { scale: layout.scale, x: layout.x, y: layout.y };

  return (
    <img
      src={src}
      alt={name}
      className={cn(
        "pixel h-[208px] w-[208px] max-w-[76vw] object-contain object-bottom drop-shadow-[0_14px_30px_rgba(0,0,0,0.28)] sm:h-[236px] sm:w-[236px]",
        isSleeping && "brightness-90 contrast-110",
      )}
      style={{ transform: `translate(${sleepPose.x}px, ${sleepPose.y}px) scale(${sleepPose.scale})`, transformOrigin: "50% 100%" }}
      draggable={false}
      onError={(event) => {
        const target = event.currentTarget;
        if (target.src !== fallback) {
          target.src = fallback;
        }
      }}
    />
  );
}

function SkillEffect({ family }: { family: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setFrame((current) => (current + 1) % 8), 90);
    return () => window.clearInterval(id);
  }, [family]);

  return (
    <img
      src={`/fx/${family}/${String(frame).padStart(2, "0")}.png`}
      alt=""
      aria-hidden="true"
      className="skill-effect"
    />
  );
}


function Action({
  icon: Icon,
  label,
  disabled = false,
  onClick,
}: {
  icon: typeof Utensils;
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button type="button" disabled={disabled} onClick={onClick} className="ds-button flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold disabled:cursor-not-allowed disabled:opacity-45">
      <Icon className="size-4 text-muted" />
      {label}
    </button>
  );
}

function NavBtn({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Package;
  label: string;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} className="ds-nav-button flex min-h-11 items-center justify-center gap-1.5 px-2 text-xs font-semibold text-muted">
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}

function Inventory() {
  const pet = useGame((s) => s.pet);
  const actionBusy = useGame((s) => s.busyUntil > Date.now());
  const [tab, setTab] = useState<"all" | "food" | "care">("all");

  if (!pet) return null;
  const entries = Object.entries(pet.inventory).filter(([, q]) => q > 0);

  const filtered = entries.filter(([id]) => {
    const item = ITEMS[id];
    if (!item) return false;
    if (tab === "food") return item.category === "food";
    if (tab === "care") return item.category === "health" || item.category === "hygiene" || item.category === "toy";
    return true;
  });

  return (
    <div className="space-y-3">
      {/* Category Tabs */}
      <div className="flex gap-1.5 border-b border-[rgba(116,135,157,0.3)] pb-2 text-xs">
        <button
          type="button"
          onClick={() => setTab("all")}
          className={cn(
            "rounded-lg px-2.5 py-1 font-semibold transition-colors",
            tab === "all" ? "bg-accent text-white" : "text-muted hover:text-fg"
          )}
        >
          Todos ({entries.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("food")}
          className={cn(
            "rounded-lg px-2.5 py-1 font-semibold transition-colors",
            tab === "food" ? "bg-accent text-white" : "text-muted hover:text-fg"
          )}
        >
          Alimentos
        </button>
        <button
          type="button"
          onClick={() => setTab("care")}
          className={cn(
            "rounded-lg px-2.5 py-1 font-semibold transition-colors",
            tab === "care" ? "bg-accent text-white" : "text-muted hover:text-fg"
          )}
        >
          Cuidados
        </button>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted py-4 text-center">Nenhum item nesta categoria. Compre na loja ou conquiste no Caminho Digital.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {filtered.map(([id, qty]) => {
            const item = ITEMS[id];
            if (!item) return null;
            return (
              <button
                key={id}
                type="button"
                disabled={actionBusy}
                onClick={() => actions.use(id)}
                className="ds-card p-3 text-left disabled:cursor-not-allowed disabled:opacity-45 hover:border-accent transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-fg">{item.name}</p>
                    <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-bold text-accent">
                      x{qty}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">{item.desc}</p>
                </div>
                <div className="mt-2 text-[10px] text-muted flex gap-1.5 flex-wrap">
                  {Object.entries(item.effects).map(([stat, val]) => (
                    <span key={stat} className="rounded bg-black/5 dark:bg-white/5 px-1 py-0.5 font-medium">
                      +{val} {stat}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Shop() {
  const pet = useGame((s) => s.pet);
  const actionBusy = useGame((s) => s.busyUntil > Date.now());
  if (!pet) return null;
  return (
    <div className="grid grid-cols-2 gap-2">
      {Object.values(ITEMS).map((item) => (
        <button key={item.id} type="button" disabled={actionBusy} onClick={() => actions.buy(item.id)} className="ds-card p-3 text-left disabled:cursor-not-allowed disabled:opacity-45">
          <p className="text-sm font-semibold text-fg">{item.name}</p>
          <p className="mt-1 text-xs text-muted">{item.desc}</p>
          <p className="mt-2 text-xs tabular-nums font-semibold text-fg">{item.price} moedas</p>
        </button>
      ))}
    </div>
  );
}

function Evolution() {
  const pet = useGame((s) => s.pet);
  const actionBusy = useGame((s) => s.busyUntil > Date.now());
  if (!pet) return null;
  const line = LINES[pet.lineId];
  const list = line?.evolutions ?? [];

  return (
    <div className="space-y-4">
      <div className="ds-card p-3 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted">Forma Atual:</p>
          <p className="text-base font-bold text-fg">{currentName(pet)}</p>
        </div>
        <div className="text-right">
          <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-bold text-accent">
            Nível {pet.level}
          </span>
          <p className="mt-1 text-[11px] text-muted">Felicidade: {pet.happiness}%</p>
        </div>
      </div>

      <div className="space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted">Árvore Genealógica Digital</h4>
        
        {/* Rookie stage */}
        <div className="ds-card p-3 border-emerald-500/50 bg-emerald-500/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🐣</span>
            <div>
              <p className="font-bold text-sm text-fg">{line?.name || "Novato"}</p>
              <p className="text-[11px] text-muted">Estágio Inicial · Nv. 1</p>
            </div>
          </div>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="size-4" /> Desbloqueado
          </span>
        </div>

        {/* Evolution steps */}
        {list.map((evo, idx) => {
          const unlocked = pet.evolutionStage >= idx;
          const nextNeeded = pet.evolutionStage + 1 === idx;
          const levelMet = pet.level >= evo.level;
          const bondMet = pet.happiness >= 40;
          const canEvolve = nextNeeded && levelMet && bondMet;

          return (
            <div
              key={evo.id}
              className={cn(
                "ds-card p-3 transition-all",
                unlocked
                  ? "border-emerald-500/50 bg-emerald-500/5"
                  : canEvolve
                  ? "border-accent bg-accent/10 shadow-md"
                  : "border-border opacity-70"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{idx === 0 ? "⚔️" : "👑"}</span>
                  <div>
                    <p className="font-bold text-sm text-fg">{evo.name}</p>
                    <p className="text-[11px] text-muted">
                      {idx === 0 ? "Estágio Campeão" : "Estágio Extremo / Mega"}
                    </p>
                  </div>
                </div>

                {unlocked ? (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                    <CheckCircle2 className="size-4" /> Desbloqueado
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-muted">
                    Requer Nv. {evo.level} e Afinidade 40%
                  </span>
                )}
              </div>

              {nextNeeded && (
                <div className="mt-3 pt-2 border-t border-[rgba(116,135,157,0.2)]">
                  {canEvolve ? (
                    <button
                      type="button"
                      disabled={actionBusy}
                      onClick={() => actions.evolve()}
                      className="ds-button ds-button-accent w-full py-2 text-sm font-bold animate-pulse"
                    >
                      ✨ Evoluir para {evo.name}!
                    </button>
                  ) : (
                    <div className="space-y-1 text-xs text-muted">
                      <div className="flex justify-between">
                        <span>Progresso de Nível:</span>
                        <span className={levelMet ? "text-emerald-500 font-semibold" : "text-amber-500"}>
                          {pet.level}/{evo.level}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Afinidade (Felicidade):</span>
                        <span className={bondMet ? "text-emerald-500 font-semibold" : "text-amber-500"}>
                          {pet.happiness}%/40%
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SettingsPanel() {
  const pet = useGame((s) => s.pet);
  const reset = useGame((s) => s.reset);
  const setPanel = useGame((s) => s.setPanel);
  const [volume, setVolume] = useState(80);
  const [doubleConfirm, setDoubleConfirm] = useState(false);

  return (
    <div className="space-y-4 text-xs text-fg">
      <div className="ds-card p-3 space-y-2">
        <h4 className="font-semibold text-sm text-fg">Áudio e Visual</h4>
        <div className="space-y-1">
          <div className="flex justify-between text-muted">
            <span>Volume dos Efeitos Sonoros</span>
            <span>{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full cursor-pointer accent-accent"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="ds-button w-full py-1.5 font-medium mt-2"
        >
          ⛶ Alternar Tela Cheia
        </button>
      </div>

      <div className="ds-card p-3 space-y-2">
        <h4 className="font-semibold text-sm text-fg">Integridade do Save</h4>
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <ShieldCheck className="size-4" />
          <span>Save V2 com Espelho de Backup Ativo</span>
        </div>
        <p className="text-muted leading-tight">
          Seus dados são salvos com redundância dupla local (digital_pet_save_v2 e backup). Em caso de corrupção, o sistema recupera o estado automaticamente.
        </p>
      </div>

      <div className="ds-card p-3 space-y-2 border-red-500/40 bg-red-500/5">
        <h4 className="font-semibold text-sm text-red-600 dark:text-red-400">Zona de Perigo</h4>
        {!doubleConfirm ? (
          <button
            type="button"
            onClick={() => setDoubleConfirm(true)}
            className="ds-button border-red-500/50 text-red-600 dark:text-red-400 w-full py-2 font-semibold"
          >
            Reiniciar Progresso e Save
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-red-600 dark:text-red-400 font-medium">Tem certeza absoluta? Todo o progresso do seu Digimon será apagado permanentemente.</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  reset();
                  setPanel(null);
                }}
                className="ds-button ds-button-accent bg-red-600 hover:bg-red-700 text-white flex-1 py-1.5 font-bold"
              >
                Confirmar Reset
              </button>
              <button
                type="button"
                onClick={() => setDoubleConfirm(false)}
                className="ds-button flex-1 py-1.5 font-medium"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function DigitalPathEntry() {
  const pet = useGame((s) => s.pet);
  const manifest = pet ? getDigitalPathManifest(pet.speciesId) : null;
  const isReady = manifest?.spriteReady === true;
  const runInput = pet ? createRunInput(pet) : null;

  if (!pet) return null;

  return (
    <div className="space-y-3">
      <div className="ds-card p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Parceiro da run</p>
            <h3 className="mt-1 text-lg font-semibold text-fg">{runInput?.name ?? currentName(pet)}</h3>
            <p className="mt-1 text-sm text-muted">
              Nível {runInput?.level ?? pet.level} · {runInput?.element ?? "Desconhecido"}
            </p>
          </div>
          <span
            className={cn(
              "ds-pill px-2.5 py-1 text-xs font-medium",
              isReady ? "border-emerald-500/40 text-emerald-400" : "text-muted",
            )}
          >
            {isReady ? "Pronto para o combate" : "Sprites em preparação"}
          </span>
        </div>

        {runInput ? (
          <div className="mt-4 grid grid-cols-4 gap-2 border-t border-white/10 pt-3 text-center text-xs">
            <div className="rounded-lg bg-black/20 p-2">
              <span className="text-[10px] uppercase text-muted">Vida</span>
              <p className="font-semibold text-fg">{runInput.stats.health}</p>
            </div>
            <div className="rounded-lg bg-black/20 p-2">
              <span className="text-[10px] uppercase text-muted">Ataque</span>
              <p className="font-semibold text-fg">{runInput.stats.attack}</p>
            </div>
            <div className="rounded-lg bg-black/20 p-2">
              <span className="text-[10px] uppercase text-muted">Defesa</span>
              <p className="font-semibold text-fg">{runInput.stats.defense}</p>
            </div>
            <div className="rounded-lg bg-black/20 p-2">
              <span className="text-[10px] uppercase text-muted">Velocidade</span>
              <p className="font-semibold text-fg">{runInput.stats.speed}</p>
            </div>
          </div>
        ) : null}
      </div>

      {isReady ? (
        <div className="space-y-3">
          <div className="ds-slot p-3 text-xs text-muted">
            <p className="font-semibold text-fg">Instruções da Expedição:</p>
            <ul className="mt-1.5 list-inside list-disc space-y-1">
              <li>Mova o parceiro com <strong>W, A, S, D</strong> ou as <strong>Setas</strong>.</li>
              <li>Ataque básico físico com <strong>Espaço</strong> ou <strong>J</strong>.</li>
              <li>Ataque de projétil à distância com a tecla <strong>K</strong>.</li>
              <li>Especial explosivo em área com a tecla <strong>L</strong>.</li>
              <li>Derrote os inimigos para abrir o portão e avançar pelas 6 salas até o Boss!</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => actions.startDigitalPath()}
            className="ds-button ds-button-accent h-12 w-full text-sm font-semibold tracking-wide"
          >
            INICIAR CAMINHO DIGITAL (TELA CHEIA)
          </button>
        </div>
      ) : (
        <div className="ds-slot p-3 text-sm text-muted">
          Os sprites deste Digimon ainda estão em preparação. Consulte o guia em{" "}
          <code className="text-xs text-fg">docs/digital-path/MANUAL_SPRITE_ORGANIZATION_GUIDE.md</code> para organizar as pastas de animação e ativar o manifest.
        </div>
      )}
    </div>
  );
}

function Training() {
  const pet = useGame((s) => s.pet);
  const actionBusy = useGame((s) => s.busyUntil > Date.now());
  if (!pet) return null;
  const skill = getSkillForSpecies(pet.speciesId);
  if (!skill) return <p className="text-sm text-muted">Nenhuma habilidade configurada para esta forma.</p>;
  const xp = skill.xpGain * QA_XP_MULTIPLIER;
  const canTrain = !actionBusy && !pet.isSleeping && pet.energy >= skill.energyCost;

  return (
    <div className="space-y-3">
      <div className="ds-card p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Habilidade atual</p>
        <h3 className="mt-1 text-lg font-semibold text-fg">{skill.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{skill.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="ds-slot px-3 py-2">
            <span className="text-muted">Custo</span>
            <p className="mt-0.5 font-semibold text-fg">{skill.energyCost} Energia</p>
          </div>
          <div className="ds-slot px-3 py-2">
            <span className="text-muted">Ganho</span>
            <p className="mt-0.5 font-semibold text-fg">+{xp} XP</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] text-subtle">Modo de teste: multiplicador de XP x{QA_XP_MULTIPLIER}.</p>
      </div>
      <button
        type="button"
        disabled={!canTrain}
        onClick={() => actions.train()}
        className="ds-button ds-button-accent h-12 w-full text-sm font-semibold disabled:opacity-45"
      >
        {actionBusy ? "Aguarde a animacao" : pet.isSleeping ? "Acorde para treinar" : pet.energy < skill.energyCost ? "Energia insuficiente" : "TREINAR"}
      </button>
    </div>
  );
}

function moodLabel(mood: string) {
  const map: Record<string, string> = {
    sleep: "Dormindo",
    sick: "Doente",
    hungry: "Fome",
    tired: "Cansado",
    dirty: "Sujo",
    happy: "Feliz",
  };
  return map[mood] ?? mood;
}
