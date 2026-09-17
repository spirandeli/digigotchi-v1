import { INITIAL_INVENTORY, ITEMS, LINES, type Mood } from "./data";
import { getSkillForSpecies, QA_XP_MULTIPLIER } from "./skills";

export type PetState = {
  lineId: string;
  speciesId: string;
  nickname: string;
  level: number;
  experience: number;
  hunger: number;
  happiness: number;
  energy: number;
  hygiene: number;
  health: number;
  discipline: number;
  coins: number;
  inventory: Record<string, number>;
  isSleeping: boolean;
  lastSimulatedAt: number;
  createdAt: number;
  evolutionStage: number;
};

export type ActionResult = { ok: boolean; msg: string; animation?: string; durationMs?: number };

function clamp(v: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(v)));
}

export function xpToNext(level: number) {
  return 50 + level * 40;
}

export function createPet(lineId: string): PetState {
  const line = LINES[lineId];
  return {
    lineId,
    speciesId: lineId,
    nickname: line?.name ?? "Parceiro",
    level: 1,
    experience: 0,
    hunger: 100,
    happiness: 80,
    energy: 100,
    hygiene: 100,
    health: 100,
    discipline: 50,
    coins: 100,
    inventory: { ...INITIAL_INVENTORY },
    isSleeping: false,
    lastSimulatedAt: Date.now(),
    createdAt: Date.now(),
    evolutionStage: -1,
  };
}

export function currentSprite(pet: PetState) {
  const line = LINES[pet.lineId];
  const evo = line?.evolutions[pet.evolutionStage];
  return evo?.sprite ?? line?.sprite ?? "";
}

export function currentName(pet: PetState) {
  const line = LINES[pet.lineId];
  const evo = line?.evolutions[pet.evolutionStage];
  return evo?.name ?? line?.name ?? pet.nickname;
}

export function getMood(pet: PetState): Mood {
  if (pet.isSleeping) return "sleep";
  if (pet.health < 30) return "sick";
  if (pet.hunger < 25) return "hungry";
  if (pet.energy < 20) return "tired";
  if (pet.hygiene < 25) return "dirty";
  if (pet.happiness > 75) return "happy";
  return "idle";
}

export function getPhrase(pet: PetState) {
  const line = LINES[pet.lineId];
  const list = line?.phrases[getMood(pet)] ?? line?.phrases.idle ?? ["..."];
  return list[Math.floor(Math.random() * list.length)];
}

function applyEffects(pet: PetState, effects?: Record<string, number>) {
  if (!effects) return;
  if (effects.hunger) pet.hunger = clamp(pet.hunger + effects.hunger);
  if (effects.happiness) pet.happiness = clamp(pet.happiness + effects.happiness);
  if (effects.energy) pet.energy = clamp(pet.energy + effects.energy);
  if (effects.hygiene) pet.hygiene = clamp(pet.hygiene + effects.hygiene);
  if (effects.health) pet.health = clamp(pet.health + effects.health);
}

function addXp(pet: PetState, amount: number) {
  pet.experience += amount;
  while (pet.experience >= xpToNext(pet.level)) {
    pet.experience -= xpToNext(pet.level);
    pet.level += 1;
    pet.health = clamp(pet.health + 5);
    pet.happiness = clamp(pet.happiness + 10);
  }
}

export function simulateTime(pet: PetState): PetState {
  const next = { ...pet, inventory: { ...pet.inventory } };
  const now = Date.now();
  const elapsedMs = Math.min(now - next.lastSimulatedAt, 24 * 60 * 60 * 1000);

  // Sono turbo para QA: a energia sobe rápido o suficiente para testar o fluxo
  // sem esperar vários minutos. Recupera +8 por segundo enquanto dorme.
  if (next.isSleeping) {
    const sleepStepMs = 1000;
    const sleepSteps = Math.floor(elapsedMs / sleepStepMs);
    if (sleepSteps <= 0) return next;
    next.energy = clamp(next.energy + sleepSteps * 8);
    next.lastSimulatedAt += sleepSteps * sleepStepMs;
    return next;
  }

  // Fora do sono mantemos o ritmo lento original do pet virtual.
  const ticks = Math.floor(elapsedMs / (5 * 60 * 1000));
  if (ticks <= 0) return next;

  next.hunger = clamp(next.hunger - ticks * 1.2);
  next.energy = clamp(next.energy - ticks * 0.6);
  next.happiness = clamp(next.happiness - ticks * 0.5);
  next.hygiene = clamp(next.hygiene - ticks * 0.7);

  if (next.hunger < 20 || next.hygiene < 20 || next.energy < 15) {
    next.health = clamp(next.health - ticks * 0.8);
  } else if (next.hunger > 60 && next.hygiene > 60 && next.energy > 50) {
    next.health = clamp(next.health + ticks * 0.3);
  }

  next.lastSimulatedAt += ticks * 5 * 60 * 1000;
  return next;
}

export function feed(pet: PetState, itemId: string): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  const item = ITEMS[itemId];
  if (!item || item.category !== "food") return { pet: next, result: { ok: false, msg: "Item invalido" } };
  if ((next.inventory[itemId] ?? 0) <= 0) return { pet: next, result: { ok: false, msg: "Sem esse item no inventario" } };
  if (next.isSleeping) return { pet: next, result: { ok: false, msg: "Esta dormindo" } };
  if (next.hunger >= 100) return { pet: next, result: { ok: false, msg: "Ja esta satisfeito" } };
  next.inventory[itemId] -= 1;
  applyEffects(next, item.effects);
  addXp(next, 5);
  return { pet: next, result: { ok: true, msg: `${currentName(next)} comeu ${item.name}`, animation: "eat", durationMs: 1200 } };
}

export function feedAny(pet: PetState): { pet: PetState; result: ActionResult } {
  const foods = ["carne_digital", "fruta_digital", "racao_especial"];
  for (const id of foods) {
    if ((pet.inventory[id] ?? 0) > 0) return feed(pet, id);
  }
  return { pet, result: { ok: false, msg: "Sem comida. Abra a loja." } };
}

export function play(pet: PetState, itemId?: string): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  if (next.isSleeping) return { pet: next, result: { ok: false, msg: "Esta dormindo" } };
  if (next.energy < 15) return { pet: next, result: { ok: false, msg: "Muito cansado para brincar" } };
  if (itemId) {
    const item = ITEMS[itemId];
    if (!item || item.category !== "toy") return { pet: next, result: { ok: false, msg: "Nao e um brinquedo" } };
    if ((next.inventory[itemId] ?? 0) <= 0) return { pet: next, result: { ok: false, msg: "Sem esse item" } };
    next.inventory[itemId] -= 1;
    applyEffects(next, item.effects);
  } else {
    next.happiness = clamp(next.happiness + 15);
    next.energy = clamp(next.energy - 12);
    next.hygiene = clamp(next.hygiene - 5);
  }
  addXp(next, 8);
  next.coins += 3;
  return { pet: next, result: { ok: true, msg: `${currentName(next)} se divertiu`, animation: "play", durationMs: 1350 } };
}

export function sleepToggle(pet: PetState): { pet: PetState; result: ActionResult } {
  const simulated = pet.isSleeping ? simulateTime(pet) : pet;
  const next = {
    ...simulated,
    inventory: { ...simulated.inventory },
    isSleeping: !simulated.isSleeping,
    lastSimulatedAt: Date.now(),
  };
  if (next.isSleeping) {
    return { pet: next, result: { ok: true, msg: `${currentName(next)} foi dormir`, animation: "sleep", durationMs: 800 } };
  }
  return { pet: next, result: { ok: true, msg: `${currentName(next)} acordou`, animation: "wake", durationMs: 1050 } };
}

export function clean(pet: PetState, itemId = "sabao"): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  if (next.isSleeping) return { pet: next, result: { ok: false, msg: "Esta dormindo" } };
  if (next.hygiene >= 100) return { pet: next, result: { ok: false, msg: "Ja esta limpo" } };
  const item = ITEMS[itemId];
  if (item && (next.inventory[itemId] ?? 0) > 0) {
    next.inventory[itemId] -= 1;
    applyEffects(next, item.effects);
  } else {
    next.hygiene = clamp(next.hygiene + 30);
    next.energy = clamp(next.energy - 5);
    next.happiness = clamp(next.happiness + 5);
  }
  addXp(next, 4);
  return { pet: next, result: { ok: true, msg: `${currentName(next)} tomou banho`, animation: "clean", durationMs: 1250 } };
}

export function heal(pet: PetState, itemId = "medicina"): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  if (next.isSleeping) return { pet: next, result: { ok: false, msg: "Esta dormindo" } };
  if (next.health >= 100) return { pet: next, result: { ok: false, msg: "Ja esta saudavel" } };
  const item = ITEMS[itemId];
  if (!item || (next.inventory[itemId] ?? 0) <= 0) {
    return { pet: next, result: { ok: false, msg: "Voce precisa de Medicina" } };
  }
  next.inventory[itemId] -= 1;
  applyEffects(next, item.effects);
  addXp(next, 5);
  return { pet: next, result: { ok: true, msg: `${currentName(next)} se sente melhor`, animation: "heal", durationMs: 1250 } };
}

export function buy(pet: PetState, itemId: string): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  const item = ITEMS[itemId];
  if (!item) return { pet: next, result: { ok: false, msg: "Item nao existe" } };
  if (next.coins < item.price) return { pet: next, result: { ok: false, msg: "Moedas insuficientes" } };
  next.coins -= item.price;
  next.inventory[itemId] = (next.inventory[itemId] ?? 0) + 1;
  return { pet: next, result: { ok: true, msg: `Comprou ${item.name}` } };
}

export function tryEvolve(pet: PetState): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  const evoList = LINES[next.lineId]?.evolutions ?? [];
  const nextIdx = next.evolutionStage + 1;
  if (nextIdx >= evoList.length) return { pet: next, result: { ok: false, msg: "Forma maxima alcancada" } };
  const evo = evoList[nextIdx];
  if (next.level < evo.level) {
    return { pet: next, result: { ok: false, msg: `Precisa do nivel ${evo.level}` } };
  }
  if (next.happiness < 50 || next.health < 60) {
    return { pet: next, result: { ok: false, msg: "Precisa estar feliz e saudavel" } };
  }
  next.evolutionStage = nextIdx;
  next.speciesId = evo.id;
  next.nickname = evo.name;
  addXp(next, 20);
  return { pet: next, result: { ok: true, msg: `Evoluiu para ${evo.name}!`, animation: "evolve", durationMs: 1750 } };
}


export function trainSkill(pet: PetState): { pet: PetState; result: ActionResult } {
  const next = { ...pet, inventory: { ...pet.inventory } };
  if (next.isSleeping) return { pet: next, result: { ok: false, msg: "Acorde antes de treinar" } };
  const skill = getSkillForSpecies(next.speciesId);
  if (!skill) return { pet: next, result: { ok: false, msg: "Habilidade nao configurada" } };
  if (next.energy < skill.energyCost) {
    return { pet: next, result: { ok: false, msg: `Energia insuficiente para ${skill.name}` } };
  }

  next.energy = clamp(next.energy - skill.energyCost);
  next.happiness = clamp(next.happiness + 3);
  next.hygiene = clamp(next.hygiene - 2);
  const gainedXp = skill.xpGain * QA_XP_MULTIPLIER;
  addXp(next, gainedXp);
  next.coins += 2;

  return {
    pet: next,
    result: {
      ok: true,
      msg: `${skill.name} · +${gainedXp} XP`,
      animation: skill.animation,
      durationMs: 1350,
    },
  };
}

export function useItem(pet: PetState, itemId: string): { pet: PetState; result: ActionResult } {
  const item = ITEMS[itemId];
  if (!item) return { pet, result: { ok: false, msg: "Item invalido" } };
  if (item.category === "food") return feed(pet, itemId);
  if (item.category === "hygiene") return clean(pet, itemId);
  if (item.category === "health") return heal(pet, itemId);
  if (item.category === "toy") return play(pet, itemId);
  return { pet, result: { ok: false, msg: "Nao pode usar agora" } };
}
