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

type Screen = "start" | "choose" | "play";
type Panel = "inventory" | "shop" | "evolution" | "training" | null;

type GameStore = {
  screen: Screen;
  pet: PetState | null;
  panel: Panel;
  speech: string;
  anim: string;
  busyUntil: number;
  apply: (fn: (p: PetState) => { pet: PetState; result: ActionResult }) => ActionResult | null;
  startNew: () => void;
  continueSave: () => boolean;
  choose: (lineId: string) => void;
  setPanel: (p: Panel) => void;
  reset: () => void;
  tick: () => void;
  hasSave: () => boolean;
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
  hasSave: () => Boolean(loadSave()),
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
  setPanel: (panel) => set({ panel }),
  reset: () => {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      /* ignore */
    }
    set({ pet: null, screen: "start", panel: null, speech: "", anim: "", busyUntil: 0 });
  },
  tick: () => {
    const { pet } = get();
    if (!pet) return;
    const next = simulateTime(pet);
    persist(next);
    set({ pet: next });
  },
  apply: (fn) => {
    const { pet, busyUntil } = get();
    if (!pet) return null;
    if (Date.now() < busyUntil) {
      const result: ActionResult = { ok: false, msg: "Aguarde a animacao terminar" };
      set({ speech: result.msg });
      return result;
    }

    const { pet: next, result } = fn(pet);
    persist(next);
    const durationMs = result.durationMs ?? (result.animation ? 1300 : 900);
    set({
      pet: next,
      speech: result.msg,
      anim: result.animation ?? "",
      busyUntil: result.ok && result.animation ? Date.now() + durationMs : 0,
      panel: result.ok && result.animation ? null : get().panel,
    });

    if (result.ok) {
      const sound = animationToSound(result.animation);
      if (sound) playDigimonSound(next.speciesId, sound);
    }

    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        if (useGame.getState().speech === result.msg) {
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
  use: (id: string) => useGame.getState().apply((p) => useItem(p, id)),
};
