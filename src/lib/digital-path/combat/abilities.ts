export type AbilitySlot = "basic_1" | "basic_2" | "special";

export type AbilityDefinition = Readonly<{
  id: string;
  name: string;
  speciesId: string;
  stage: number;
  lineId: string;
  slot: AbilitySlot;
  type: "melee" | "projectile" | "area";
  element: string;
  damage: number;
  range: number;
  area: number;
  cooldownMs: number;
  animation: string;
  vfx: string;
  icon: string;
  description: string;
  assetStatus: "verified" | "blocked";
}>;

export const AGUMON_ABILITIES: readonly AbilityDefinition[] = [
  {
    id: "agumon-pepper-breath",
    name: "Pepper Breath",
    speciesId: "agumon",
    stage: 0,
    lineId: "agumon",
    slot: "basic_1",
    type: "projectile",
    element: "fogo",
    damage: 18,
    range: 180,
    area: 18,
    cooldownMs: 650,
    animation: "attack-pepper-breath",
    vfx: "fire",
    icon: "/fx/fire/00.png",
    description: "Dispara uma chama curta em linha reta.",
    assetStatus: "verified",
  },
  {
    id: "agumon-tail-sweep",
    name: "Tail Sweep",
    speciesId: "agumon",
    stage: 0,
    lineId: "agumon",
    slot: "basic_2",
    type: "melee",
    element: "fisico",
    damage: 14,
    range: 48,
    area: 42,
    cooldownMs: 800,
    animation: "",
    vfx: "claw",
    icon: "/fx/claw/00.png",
    description: "Golpe circular de curto alcance adaptado para gameplay.",
    assetStatus: "blocked",
  },
  {
    id: "agumon-baby-flame-burst",
    name: "Baby Flame Burst",
    speciesId: "agumon",
    stage: 0,
    lineId: "agumon",
    slot: "special",
    type: "area",
    element: "fogo",
    damage: 34,
    range: 130,
    area: 78,
    cooldownMs: 2400,
    animation: "",
    vfx: "fire",
    icon: "/fx/fire/00.png",
    description: "Explosao de fogo em area; nome e balanceamento sao adaptacao original do jogo.",
    assetStatus: "blocked",
  },
];

export function validateAbilitySet(abilities: readonly AbilityDefinition[]) {
  const ids = new Set<string>();
  const slots = new Set<AbilitySlot>();
  for (const ability of abilities) {
    if (ids.has(ability.id) || slots.has(ability.slot) || ability.damage <= 0 || ability.cooldownMs <= 0) return false;
    ids.add(ability.id);
    slots.add(ability.slot);
  }
  return abilities.length === 3 && slots.has("basic_1") && slots.has("basic_2") && slots.has("special") && abilities.every((ability) => ability.slot === "special" ? ability.cooldownMs > 1000 : ability.cooldownMs < 1000);
}

export function isAbilitySetRuntimeReady(abilities: readonly AbilityDefinition[]) {
  return validateAbilitySet(abilities) && abilities.every((ability) => ability.assetStatus === "verified" && ability.animation.length > 0);
}