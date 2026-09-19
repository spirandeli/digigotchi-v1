export type ElementKind = "fogo" | "gelo" | "eletricidade";
export type ItemCategory = "food" | "hygiene" | "health" | "toy";
export type Mood = "sleep" | "sick" | "hungry" | "tired" | "dirty" | "happy" | "idle";

export type SpriteAction = "idle" | "eat" | "play" | "sleep" | "wake" | "clean" | "heal" | "evolve";

export type SpriteAnimation = {
  frames: string[];
  fps: number;
  loop?: boolean;
};

const ACTION_FRAME_COUNTS: Record<string, Record<string, number>> = {
  agumon: { idle: 8, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-pepper-breath": 12 },
  geogreymon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-mega-flame": 12 },
  wargreymon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-terra-force": 12 },
  etemon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-love-serenade": 12 },
  metaletemon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-banana-slip": 12 },
  gabumon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-blue-blaster": 12 },
  garurumon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-howling-blaster": 12 },
  weregarurumon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-wolf-claw": 12 },
  veemon: { idle: 14, eat: 8, play: 8, sleep: 8, wake: 8, clean: 8, heal: 8, evolve: 8, "attack-vee-headbutt": 8 },
  flamedramon: { idle: 10, eat: 10, play: 12, sleep: 6, wake: 8, clean: 10, heal: 10, evolve: 14, "attack-fire-rocket": 12 },
  xvmon: { idle: 8, eat: 8, play: 8, sleep: 8, wake: 8, clean: 8, heal: 8, evolve: 8, jump: 8, "attack-vee-laser": 8, attack: 8 },
};

function animationFrames(species: string, action: string, fallbackCount: number) {
  const actualCount = ACTION_FRAME_COUNTS[species]?.[action] ?? fallbackCount;
  const loopCount = Math.max(1, actualCount, fallbackCount);
  const frameCycle = Math.max(1, actualCount);

  return Array.from({ length: loopCount }, (_, index) => {
    const frameIndex = index % frameCycle;
    return `/sprites/animated/${species}/${action}/${String(frameIndex).padStart(2, "0")}.png`;
  });
}

function animationSet(
  species: string,
  attackAction: string,
): Record<string, SpriteAnimation> {
  return {
    idle: { frames: animationFrames(species, "idle", 10), fps: 7, loop: true },
    eat: { frames: animationFrames(species, "eat", 10), fps: 9, loop: false },
    play: { frames: animationFrames(species, "play", 12), fps: 10, loop: false },
    sleep: { frames: animationFrames(species, "sleep", 6), fps: 5, loop: true },
    wake: { frames: animationFrames(species, "wake", 8), fps: 9, loop: false },
    clean: { frames: animationFrames(species, "clean", 10), fps: 9, loop: false },
    heal: { frames: animationFrames(species, "heal", 10), fps: 9, loop: false },
    evolve: { frames: animationFrames(species, "evolve", 14), fps: 11, loop: false },
    [attackAction]: { frames: animationFrames(species, attackAction, 12), fps: 12, loop: false },
  };
}

export const SPECIES_ATTACK_ANIMATION: Record<string, string> = {
  agumon: "attack-pepper-breath",
  geogreymon: "attack-mega-flame",
  wargreymon: "attack-terra-force",
  etemon: "attack-love-serenade",
  metaletemon: "attack-banana-slip",
  gabumon: "attack-blue-blaster",
  garurumon: "attack-howling-blaster",
  weregarurumon: "attack-wolf-claw",
  veemon: "attack-vee-headbutt",
  flamedramon: "attack-fire-rocket",
  xvmon: "attack-vee-laser",
};

export const SPRITE_ANIMATIONS: Record<string, Record<string, SpriteAnimation>> = {
  agumon: animationSet("agumon", SPECIES_ATTACK_ANIMATION.agumon),
  geogreymon: animationSet("geogreymon", SPECIES_ATTACK_ANIMATION.geogreymon),
  wargreymon: animationSet("wargreymon", SPECIES_ATTACK_ANIMATION.wargreymon),
  etemon: animationSet("etemon", SPECIES_ATTACK_ANIMATION.etemon),
  metaletemon: animationSet("metaletemon", SPECIES_ATTACK_ANIMATION.metaletemon),
  gabumon: animationSet("gabumon", SPECIES_ATTACK_ANIMATION.gabumon),
  garurumon: animationSet("garurumon", SPECIES_ATTACK_ANIMATION.garurumon),
  weregarurumon: animationSet("weregarurumon", SPECIES_ATTACK_ANIMATION.weregarurumon),
  veemon: animationSet("veemon", SPECIES_ATTACK_ANIMATION.veemon),
  flamedramon: animationSet("flamedramon", SPECIES_ATTACK_ANIMATION.flamedramon),
  xvmon: animationSet("xvmon", SPECIES_ATTACK_ANIMATION.xvmon),
};

export function animationDurationMs(species: string, action: string) {
  const animation = SPRITE_ANIMATIONS[species]?.[action];
  if (!animation) return 1000;
  const frameMs = Math.max(70, Math.round(1000 / animation.fps));
  return animation.frames.length * frameMs;
}

// Escala visual reduzida ~15% em relação à rodada anterior, com progressão
// gradual entre formas. Quadrúpedes largos usam um pouco menos de escala.
export const SPRITE_STAGE_LAYOUT: Record<string, { scale: number; x: number; y: number }> = {
  agumon: { scale: 0.90, x: 0, y: 1 },
  geogreymon: { scale: 0.96, x: 1, y: 0 },
  wargreymon: { scale: 1.07, x: 0, y: -2 },
  etemon: { scale: 0.92, x: 0, y: 0 },
  metaletemon: { scale: 1.00, x: 0, y: -1 },
  gabumon: { scale: 0.90, x: 0, y: 1 },
  garurumon: { scale: 0.91, x: 0, y: 2 },
  weregarurumon: { scale: 0.99, x: 0, y: -1 },
  veemon: { scale: 0.90, x: 0, y: 1 },
  flamedramon: { scale: 0.94, x: 0, y: 0 },
  xvmon: { scale: 0.94, x: 0, y: 0 },
};

export type Evolution = {
  id: string;
  name: string;
  level: number;
  sprite: string;
};

export type LineDef = {
  id: string;
  name: string;
  lineName: string;
  element: ElementKind;
  blurb: string;
  sprite: string;
  evolutions: Evolution[];
  phrases: Record<Mood, string[]>;
};

export type ItemDef = {
  id: string;
  name: string;
  category: ItemCategory;
  effects: Partial<Record<"hunger" | "happiness" | "energy" | "hygiene" | "health", number>>;
  price: number;
  desc: string;
};

export const LINES: Record<string, LineDef> = {
  agumon: {
    id: "agumon",
    name: "Agumon",
    lineName: "Linha de Agumon",
    element: "fogo",
    blurb: "Parceiro corajoso e cheio de energia.",
    sprite: "/sprites/agumon.png",
    evolutions: [
      { id: "geogreymon", name: "GeoGreymon", level: 5, sprite: "/sprites/geogreymon.png" },
      { id: "wargreymon", name: "WarGreymon", level: 12, sprite: "/sprites/wargreymon.png" },
    ],
    phrases: {
      idle: ["Ola!", "Estou bem!", "Vamos treinar?"],
      hungry: ["Estou com fome...", "Quero carne digital!"],
      happy: ["Isso!", "Adoro isso!", "Voce e o melhor!"],
      tired: ["Estou cansado...", "Quero dormir..."],
      dirty: ["Estou sujo...", "Preciso de um banho!"],
      sick: ["Nao me sinto bem...", "Preciso de cuidado..."],
      sleep: ["Zzz...", "Sonhando em evoluir..."],
    },
  },
  etemon: {
    id: "etemon",
    name: "Etemon",
    lineName: "Linha de Etemon",
    element: "fogo",
    blurb: "Estrela do palco digital.",
    sprite: "/sprites/etemon.png",
    evolutions: [{ id: "metaletemon", name: "MetalEtemon", level: 8, sprite: "/sprites/metaletemon.png" }],
    phrases: {
      idle: ["Show time!", "Sou uma estrela!", "Vamos dançar?"],
      hungry: ["Preciso de energia pro show!", "Quero banana digital!"],
      happy: ["Bravo!", "O publico ama!", "Mais uma!"],
      tired: ["O show acabou por hoje...", "Preciso descansar a voz..."],
      dirty: ["Nao posso subir no palco assim!", "Me limpe!"],
      sick: ["Cancelaram o show...", "Me ajuda!"],
      sleep: ["Zzz... bis..."],
    },
  },
  gabumon: {
    id: "gabumon",
    name: "Gabumon",
    lineName: "Linha de Gabumon",
    element: "gelo",
    blurb: "Fiel e protetor.",
    sprite: "/sprites/gabumon.png",
    evolutions: [
      { id: "garurumon", name: "Garurumon", level: 5, sprite: "/sprites/animated/garurumon/idle/00.png" },
      { id: "weregarurumon", name: "WereGarurumon", level: 10, sprite: "/sprites/animated/weregarurumon/idle/00.png" },
    ],
    phrases: {
      idle: ["Estou aqui!", "Confio em voce.", "Vamos juntos!"],
      hungry: ["Estou com fome...", "Tem algo para comer?"],
      happy: ["Obrigado!", "Fico feliz!", "Voce e especial!"],
      tired: ["Preciso descansar...", "Estou sonolento..."],
      dirty: ["Minha pele esta suja...", "Banho, por favor!"],
      sick: ["Estou fraco...", "Cuide de mim..."],
      sleep: ["Zzz... neve..."],
    },
  },
  veemon: {
    id: "veemon",
    name: "Veemon",
    lineName: "Linha de Veemon",
    element: "eletricidade",
    blurb: "Aventureiro e destemido.",
    sprite: "/sprites/veemon.png",
    evolutions: [
      { id: "flamedramon", name: "Flamedramon", level: 5, sprite: "/sprites/flamedramon.png" },
      { id: "xvmon", name: "XV-mon", level: 10, sprite: "/sprites/xvmon.png" },
    ],
    phrases: {
      idle: ["Vamos a aventura!", "Estou pronto!", "O que fazemos?"],
      hungry: ["Preciso de combustivel!", "Quero comer!"],
      happy: ["Legal!", "Isso e demais!", "Mais!"],
      tired: ["Ufa... descanso...", "Bateria baixa..."],
      dirty: ["Estou sujo da aventura!", "Banho!"],
      sick: ["Nao consigo voar...", "Ajuda!"],
      sleep: ["Zzz... voando..."],
    },
  },
};

export const ITEMS: Record<string, ItemDef> = {
  carne_digital: {
    id: "carne_digital",
    name: "Carne Digital",
    category: "food",
    effects: { hunger: 25, happiness: 5 },
    price: 15,
    desc: "Recupera fome",
  },
  fruta_digital: {
    id: "fruta_digital",
    name: "Fruta Digital",
    category: "food",
    effects: { hunger: 15, happiness: 15 },
    price: 20,
    desc: "Fome e felicidade",
  },
  racao_especial: {
    id: "racao_especial",
    name: "Racao Especial",
    category: "food",
    effects: { hunger: 30, health: 10 },
    price: 30,
    desc: "Fome e saude",
  },
  sabao: {
    id: "sabao",
    name: "Sabao Digital",
    category: "hygiene",
    effects: { hygiene: 40, happiness: 5 },
    price: 12,
    desc: "Limpa bem",
  },
  medicina: {
    id: "medicina",
    name: "Medicina",
    category: "health",
    effects: { health: 35, energy: 5 },
    price: 25,
    desc: "Cura doencas",
  },
  bola: {
    id: "bola",
    name: "Bola Digital",
    category: "toy",
    effects: { happiness: 20, energy: -10 },
    price: 18,
    desc: "Diversao garantida",
  },
};

export const INITIAL_INVENTORY: Record<string, number> = {
  carne_digital: 5,
  fruta_digital: 2,
  sabao: 2,
  medicina: 1,
};

export const SAVE_KEY = "digital_pet_save_v2";

export const ELEMENT_LABEL: Record<ElementKind, string> = {
  fogo: "Fogo",
  gelo: "Gelo",
  eletricidade: "Eletricidade",
};
