export type SkillDef = {
  id: string;
  name: string;
  speciesId: string;
  energyCost: number;
  xpGain: number;
  animation: string;
  sound: string;
  element?: string;
  description: string;
};

// Mantido separado do balanceamento normal para facilitar testes de evolução.
export const QA_XP_MULTIPLIER = 3;

export const SKILLS: Record<string, SkillDef> = {
  agumon: {
    id: "pepper_breath",
    name: "Pepper Breath / Baby Flame",
    speciesId: "agumon",
    energyCost: 7,
    xpGain: 11,
    animation: "attack-pepper-breath",
    sound: "/audio/digimon/agumon/attack.ogg",
    element: "fogo",
    description: "Agumon recua a cabeça e lança uma pequena bola de fogo.",
  },
  geogreymon: {
    id: "mega_flame",
    name: "Mega Flame",
    speciesId: "geogreymon",
    energyCost: 9,
    xpGain: 14,
    animation: "attack-mega-flame",
    sound: "/audio/digimon/geogreymon/attack.ogg",
    element: "fogo",
    description: "GeoGreymon prepara a postura e dispara uma rajada de fogo maior.",
  },
  wargreymon: {
    id: "terra_force",
    name: "Terra Force / Gaia Force",
    speciesId: "wargreymon",
    energyCost: 14,
    xpGain: 21,
    animation: "attack-terra-force",
    sound: "/audio/digimon/wargreymon/attack.ogg",
    element: "fogo",
    description: "WarGreymon concentra energia acima do corpo e a lança à frente.",
  },
  etemon: {
    id: "love_serenade",
    name: "Love Serenade / Concert Crush",
    speciesId: "etemon",
    energyCost: 10,
    xpGain: 16,
    animation: "attack-love-serenade",
    sound: "/audio/digimon/etemon/attack.ogg",
    element: "som",
    description: "Etemon faz uma pose performática e libera uma onda sonora.",
  },
  metaletemon: {
    id: "banana_slip",
    name: "Banana Slip",
    speciesId: "metaletemon",
    energyCost: 13,
    xpGain: 20,
    animation: "attack-banana-slip",
    sound: "/audio/digimon/metaletemon/attack.ogg",
    element: "som",
    description: "MetalEtemon arremessa uma casca de banana em um ataque cômico.",
  },
  gabumon: {
    id: "blue_blaster",
    name: "Blue Blaster / Petit Fire",
    speciesId: "gabumon",
    energyCost: 7,
    xpGain: 11,
    animation: "attack-blue-blaster",
    sound: "/audio/digimon/gabumon/attack.ogg",
    element: "gelo",
    description: "Gabumon inspira e lança uma pequena chama azul.",
  },
  garurumon: {
    id: "howling_blaster",
    name: "Howling Blaster / Fox Fire",
    speciesId: "garurumon",
    energyCost: 9,
    xpGain: 14,
    animation: "attack-howling-blaster",
    sound: "/audio/digimon/garurumon/attack.ogg",
    element: "gelo",
    description: "Garurumon rosna, avança a cabeça e dispara uma chama azul.",
  },
  weregarurumon: {
    id: "wolf_claw",
    name: "Wolf Claw / Kaiser Nail",
    speciesId: "weregarurumon",
    energyCost: 11,
    xpGain: 17,
    animation: "attack-wolf-claw",
    sound: "/audio/digimon/weregarurumon/attack.ogg",
    element: "gelo",
    description: "WereGarurumon antecipa o corpo e executa um corte duplo de garras.",
  },
  veemon: {
    id: "vee_headbutt",
    name: "Vee Headbutt",
    speciesId: "veemon",
    energyCost: 7,
    xpGain: 11,
    animation: "attack-vee-headbutt",
    sound: "/audio/digimon/veemon/attack.ogg",
    element: "eletricidade",
    description: "Veemon recua e dispara para frente em uma cabeçada curta.",
  },
  flamedramon: {
    id: "fire_rocket",
    name: "Fire Rocket",
    speciesId: "flamedramon",
    energyCost: 9,
    xpGain: 14,
    animation: "attack-fire-rocket",
    sound: "/audio/digimon/flamedramon/attack.ogg",
    element: "fogo",
    description: "Flamedramon envolve o avanço em chamas e explode para frente.",
  },
  xvmon: {
    id: "vee_laser",
    name: "Vee-Laser / X-Laser",
    speciesId: "xvmon",
    energyCost: 10,
    xpGain: 15,
    animation: "attack-vee-laser",
    sound: "/audio/digimon/xvmon/attack.ogg",
    element: "eletricidade",
    description: "XV-mon carrega o X do peito e dispara um feixe frontal.",
  },
};

export function getSkillForSpecies(speciesId: string) {
  return SKILLS[speciesId] ?? null;
}
