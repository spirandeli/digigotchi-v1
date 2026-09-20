import { LINES } from "./data";
import { currentName, xpToNext, type PetState } from "./engine";

export type DigitalPathRunInput = Readonly<{
  runId: string;
  lineId: string;
  speciesId: string;
  name: string;
  level: number;
  experience: number;
  evolutionStage: number;
  element: string;
  stats: Readonly<{
    health: number;
    attack: number;
    defense: number;
    speed: number;
  }>;
}>;

export type DigitalPathRunResult = Readonly<{
  runId: string;
  outcome: "victory" | "defeat" | "abandoned";
  xp: number;
  coins: number;
  itemsWon?: Readonly<Record<string, number>>;
  alreadyAwardedXp?: boolean;
}>;

const MAX_RUN_REWARDS = {
  xp: 50000,
  coins: 25000,
} as const;

function stableRunId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `digital-path-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function boundedInteger(value: unknown, min: number, max: number) {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const integer = Math.floor(value);
  if (integer < min || integer > max) return null;
  return integer;
}

export function createRunInput(pet: PetState): DigitalPathRunInput | null {
  const line = LINES[pet.lineId];
  if (!line || !pet.speciesId || pet.level < 1 || pet.evolutionStage < -1) return null;

  return Object.freeze({
    runId: stableRunId(),
    lineId: pet.lineId,
    speciesId: pet.speciesId,
    name: currentName(pet),
    level: pet.level,
    experience: pet.experience,
    evolutionStage: pet.evolutionStage,
    element: line.element,
    stats: Object.freeze({
      health: pet.health,
      attack: Math.max(1, pet.level * 2),
      defense: Math.max(1, Math.floor(pet.discipline / 10)),
      speed: 100,
    }),
  });
}

export function validateRunResult(result: unknown): DigitalPathRunResult | null {
  if (!result || typeof result !== "object") return null;
  const candidate = result as Record<string, unknown>;
  if (typeof candidate.runId !== "string" || candidate.runId.length < 8 || candidate.runId.length > 120) return null;
  if (candidate.outcome !== "victory" && candidate.outcome !== "defeat" && candidate.outcome !== "abandoned") return null;

  const xp = boundedInteger(candidate.xp, 0, MAX_RUN_REWARDS.xp);
  const coins = boundedInteger(candidate.coins, 0, MAX_RUN_REWARDS.coins);
  if (xp === null || coins === null) return null;

  let itemsWon: Record<string, number> | undefined;
  if (candidate.itemsWon && typeof candidate.itemsWon === "object") {
    const rawItems = candidate.itemsWon as Record<string, unknown>;
    itemsWon = {};
    for (const [key, qty] of Object.entries(rawItems)) {
      if (typeof key === "string" && typeof qty === "number" && qty > 0 && qty <= 99) {
        itemsWon[key] = Math.floor(qty);
      }
    }
  }

  return Object.freeze({
    runId: candidate.runId,
    outcome: candidate.outcome,
    xp,
    coins,
    alreadyAwardedXp: Boolean(candidate.alreadyAwardedXp),
    ...(itemsWon && Object.keys(itemsWon).length > 0 ? { itemsWon: Object.freeze(itemsWon) } : {}),
  });
}

function addRunXp(pet: PetState, amount: number) {
  const next = { ...pet };
  next.experience += amount;
  while (next.experience >= xpToNext(next.level)) {
    next.experience -= xpToNext(next.level);
    next.level += 1;
    next.health = Math.min(100, next.health + 5);
    next.happiness = Math.min(100, next.happiness + 10);
  }
  return next;
}

export function applyRunResult(pet: PetState, rawResult: unknown): { pet: PetState; applied: boolean } {
  const result = validateRunResult(rawResult);
  if (!result) return { pet, applied: false };

  const appliedResults = pet.digitalPathResults ?? [];
  if (appliedResults.includes(result.runId)) return { pet, applied: false };

  const withLedger = {
    ...pet,
    digitalPathResults: [...appliedResults, result.runId].slice(-50),
  };

  const rewarded = result.alreadyAwardedXp ? withLedger : addRunXp(withLedger, result.xp);
  rewarded.coins += result.coins;
  if (result.itemsWon) {
    rewarded.inventory = { ...rewarded.inventory };
    for (const [key, qty] of Object.entries(result.itemsWon)) {
      rewarded.inventory[key] = (rewarded.inventory[key] ?? 0) + qty;
    }
  }
  return { pet: rewarded, applied: true };
}