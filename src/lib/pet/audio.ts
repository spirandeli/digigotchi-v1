export type DigimonSoundAction =
  | "idle"
  | "feed"
  | "play"
  | "sleep"
  | "wake"
  | "clean"
  | "heal"
  | "attack"
  | "evolve";

const ACTION_VOLUME: Record<DigimonSoundAction, number> = {
  idle: 0.26,
  feed: 0.38,
  play: 0.42,
  sleep: 0.25,
  wake: 0.40,
  clean: 0.34,
  heal: 0.38,
  attack: 0.52,
  evolve: 0.58,
};

const CACHE = new Map<string, HTMLAudioElement>();
const LAST_PLAYED = new Map<string, number>();
let activeAudio: HTMLAudioElement | null = null;
let masterVolume = 0.8;
let lastIdleAt = 0;

function audioPath(speciesId: string, action: DigimonSoundAction, ext: "ogg" | "mp3") {
  return `/audio/digimon/${speciesId}/${action}.${ext}`;
}

function browserSupportsOgg() {
  if (typeof document === "undefined") return true;
  const audio = document.createElement("audio");
  return Boolean(audio.canPlayType('audio/ogg; codecs="vorbis"'));
}

function cachedAudio(speciesId: string, action: DigimonSoundAction) {
  if (typeof Audio === "undefined") return null;
  const ext = browserSupportsOgg() ? "ogg" : "mp3";
  const key = `${speciesId}:${action}:${ext}`;
  const existing = CACHE.get(key);
  if (existing) return existing;
  const audio = new Audio(audioPath(speciesId, action, ext));
  audio.preload = "auto";
  CACHE.set(key, audio);
  return audio;
}

export function setDigimonMasterVolume(value: number) {
  masterVolume = Math.max(0, Math.min(1, value));
}

export function preloadDigimonAudio(speciesId: string) {
  const actions: DigimonSoundAction[] = ["idle", "feed", "play", "sleep", "wake", "clean", "heal", "attack", "evolve"];
  actions.forEach((action) => cachedAudio(speciesId, action)?.load());
}

export function playDigimonSound(speciesId: string, action: DigimonSoundAction) {
  if (typeof window === "undefined") return;
  const now = performance.now();
  const cooldownKey = `${speciesId}:${action}`;
  const last = LAST_PLAYED.get(cooldownKey) ?? -Infinity;
  const cooldown = action === "evolve" ? 700 : action === "attack" ? 450 : 300;
  if (now - last < cooldown) return;
  LAST_PLAYED.set(cooldownKey, now);

  const audio = cachedAudio(speciesId, action);
  if (!audio) return;
  if (activeAudio && activeAudio !== audio && !activeAudio.paused) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
  }
  audio.currentTime = 0;
  audio.volume = Math.max(0, Math.min(1, ACTION_VOLUME[action] * masterVolume));
  activeAudio = audio;
  void audio.play().catch(() => {
    // Browsers may block autoplay before the first user interaction.
  });
}

export function animationToSound(animation?: string): DigimonSoundAction | null {
  if (!animation) return null;
  if (animation.startsWith("attack-")) return "attack";
  const map: Record<string, DigimonSoundAction> = {
    eat: "feed",
    play: "play",
    sleep: "sleep",
    wake: "wake",
    clean: "clean",
    heal: "heal",
    evolve: "evolve",
    idle: "idle",
  };
  return map[animation] ?? null;
}

export function maybePlayIdleSound(speciesId: string) {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - lastIdleAt < 22000) return;
  lastIdleAt = now;
  playDigimonSound(speciesId, "idle");
}
