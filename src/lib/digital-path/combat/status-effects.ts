export type StatusEffectType = "burn" | "slow" | "shock";

export type StatusEffectInstance = {
  type: StatusEffectType;
  durationMs: number;
  remainingMs: number;
  tickIntervalMs?: number;
  nextTickMs?: number;
  damagePerTick?: number;
  slowPercent?: number;
  sourceId?: string;
};

export function createBurnEffect(durationMs = 3000, damagePerTick = 4, tickIntervalMs = 750): StatusEffectInstance {
  return {
    type: "burn",
    durationMs,
    remainingMs: durationMs,
    tickIntervalMs,
    nextTickMs: tickIntervalMs,
    damagePerTick,
  };
}

export function createSlowEffect(durationMs = 2500, slowPercent = 0.35): StatusEffectInstance {
  return {
    type: "slow",
    durationMs,
    remainingMs: durationMs,
    slowPercent,
  };
}

export function createShockEffect(durationMs = 800): StatusEffectInstance {
  return {
    type: "shock",
    durationMs,
    remainingMs: durationMs,
  };
}

export type StatusEffectUpdateResult = {
  activeEffects: StatusEffectInstance[];
  damageToDeal: number;
  isStunned: boolean;
  speedMultiplier: number;
};

export function updateEntityStatusEffects(
  effects: readonly StatusEffectInstance[],
  deltaMs: number
): StatusEffectUpdateResult {
  let damageToDeal = 0;
  let isStunned = false;
  let speedMultiplier = 1.0;
  const nextEffects: StatusEffectInstance[] = [];

  for (const eff of effects) {
    const remaining = eff.remainingMs - deltaMs;
    if (remaining <= 0) continue;

    const next: StatusEffectInstance = { ...eff, remainingMs: remaining };

    if (eff.type === "burn") {
      let nextTick = (eff.nextTickMs ?? 0) - deltaMs;
      if (nextTick <= 0) {
        damageToDeal += eff.damagePerTick ?? 4;
        nextTick = eff.tickIntervalMs ?? 750;
      }
      next.nextTickMs = nextTick;
    } else if (eff.type === "slow") {
      speedMultiplier = Math.min(speedMultiplier, 1.0 - (eff.slowPercent ?? 0.35));
    } else if (eff.type === "shock") {
      isStunned = true;
    }

    nextEffects.push(next);
  }

  return {
    activeEffects: nextEffects,
    damageToDeal,
    isStunned,
    speedMultiplier: Math.max(0.2, speedMultiplier),
  };
}

export function mergeStatusEffect(
  current: readonly StatusEffectInstance[],
  newEffect: StatusEffectInstance
): StatusEffectInstance[] {
  const existingIndex = current.findIndex((e) => e.type === newEffect.type);
  if (existingIndex < 0) {
    return [...current, newEffect];
  }
  // Refresh duration if already active
  const updated = [...current];
  updated[existingIndex] = {
    ...updated[existingIndex],
    durationMs: Math.max(updated[existingIndex].durationMs, newEffect.durationMs),
    remainingMs: Math.max(updated[existingIndex].remainingMs, newEffect.remainingMs),
  };
  return updated;
}
