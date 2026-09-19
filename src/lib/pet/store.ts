import { create } from "zustand";
import { SAVE_KEY } from "./data";
import {
  buy,
  clean,
  createPet,
  feedAny,
  heal,
  play,
  simulateTime,
  sleepToggle,
  tryEvolve,
  trainSkill,
  useItem,
  type ActionResult,
  type PetState,
} from "./engine";
import { animationToSound, playDigimonSound } from "./audio";
import {
  applyRunResult,
  createRunInput,
  type DigitalPathRunInput,
} from "./digital-path-bridge";

export type Screen = "start" | "choose" | "play" | "digital-path";
export type Panel = "inventory" | "shop" | "evolution" | "training" | "digital-path" | null;

export type GameStore = {
  screen: Screen;
  pet: PetState | null;
  panel: Panel;
  speech: string;
  anim: string;
  busyUntil: number;
  animationRunId: number;
  apply: (fn: (p: PetState) => { pet: PetState; result: ActionResult }) => ActionResult | null;
  startNew: () => void;
  continueSave: () => boolean;
  choose: (lineId: string) => void;
  setScreen: (s: Screen) => void;
  setPanel: (p: Panel) => void;
  startDigitalPath: () => void;
  exitDigitalPath: () => void;
  reset: () => void;
  tick: () => void;
  hasSave: () => boolean;
  createDigitalPathRunInput: () => DigitalPathRunInput | null;
  applyDigitalPathResult: (result: unknown) => boolean;
};

function persist(pet: PetState) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(pet));
  } catch {
    /* ignore */
  }
}

function loadSave(): PetState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PetState;
  } catch {
    return null;
  }
}

export const useGame = create<GameStore>((set, get) => ({
  screen: "start",
  pet: null,
  panel: null,
  speech: "",
  anim: "",
  busyUntil: 0,
  animationRunId: 0,
  hasSave: () => Boolean(loadSave()),
  createDigitalPathRunInput: () => {
    const { pet } = get();
    return pet ? createRunInput(pet) : null;
  },
  applyDigitalPathResult: (result) => {
    const { pet } = get();
    if (!pet) return false;
    const applied = applyRunResult(pet, result);
    if (!applied.applied) return false;
    persist(applied.pet);
    set({ pet: applied.pet, speech: "Resultado do Caminho Digital aplicado" });
    return true;
  },
  startNew: () => set({ screen: "choose" }),
  continueSave: () => {
    const saved = loadSave();
    if (!saved) return false;
    const pet = simulateTime(saved);
    persist(pet);
    set({ pet, screen: "play", speech: "Bem-vindo de volta" });
    return true;
  },
  choose: (lineId) => {
    const pet = createPet(lineId);
    persist(pet);
    set({ pet, screen: "play", speech: "Cuide de mim!" });
  },
  setScreen: (screen) => set({ screen }),
  setPanel: (panel) => set({ panel }),
  startDigitalPath: () => set({ screen: "digital-path", panel: null }),
  exitDigitalPath: () => set({ screen: "play", panel: null }),
  reset: () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      /* ignore */
    }
    set({ pet: null, screen: "start", panel: null, speech: "", anim: "", busyUntil: 0, animationRunId: 0 });
  },
  tick: () => {
    const { pet } = get();
    if (!pet) return;
    const next = simulateTime(pet);
    persist(next);
    set({ pet: next });
  },
  apply: (fn) => {
    const { pet, busyUntil, animationRunId } = get();
    if (!pet) return null;
    if (Date.now() < busyUntil) {
      const result: ActionResult = { ok: false, msg: "Aguarde a animacao terminar" };
      set({ speech: result.msg });
      return result;
    }

    const { pet: next, result } = fn(pet);
    persist(next);
    const durationMs = result.durationMs ?? (result.animation ? 1300 : 900);
    const nextAnimationRunId = animationRunId + 1;
    set({
      pet: next,
      speech: result.msg,
      anim: result.animation ?? "",
      busyUntil: result.ok && result.animation ? Date.now() + durationMs : 0,
      animationRunId: nextAnimationRunId,
      panel: result.ok && result.animation ? null : get().panel,
    });

    if (result.ok) {
      const sound = animationToSound(result.animation);
      if (sound) playDigimonSound(next.speciesId, sound);
    }

    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        const state = useGame.getState();
        if (state.animationRunId === nextAnimationRunId && state.speech === result.msg) {
          useGame.setState({ speech: "", anim: "", busyUntil: 0 });
        }
      }, durationMs);
    }
    return result;
  },
}));

export const actions = {
  feed: () => useGame.getState().apply(feedAny),
  play: () => useGame.getState().apply((p) => play(p)),
  sleep: () => useGame.getState().apply(sleepToggle),
  clean: () => useGame.getState().apply((p) => clean(p)),
  heal: () => useGame.getState().apply((p) => heal(p)),
  buy: (id: string) => useGame.getState().apply((p) => buy(p, id)),
  evolve: () => useGame.getState().apply(tryEvolve),
  train: () => useGame.getState().apply(trainSkill),
  startDigitalPath: () => useGame.getState().startDigitalPath(),
  exitDigitalPath: () => useGame.getState().exitDigitalPath(),
  createDigitalPathRunInput: () => useGame.getState().createDigitalPathRunInput(),
  use: (id: string) => useGame.getState().apply((p) => useItem(p, id)),
};
