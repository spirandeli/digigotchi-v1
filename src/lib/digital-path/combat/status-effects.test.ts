import assert from "node:assert/strict";
import test from "node:test";
import {
  createBurnEffect,
  createSlowEffect,
  createShockEffect,
  updateEntityStatusEffects,
  mergeStatusEffect,
} from "./status-effects";

test("burn effect applies periodic damage", () => {
  const burn = createBurnEffect(3000, 5, 1000);
  const effects = [burn];

  // Advance 500ms -> No damage yet
  const step1 = updateEntityStatusEffects(effects, 500);
  assert.equal(step1.damageToDeal, 0);
  assert.equal(step1.activeEffects.length, 1);

  // Advance another 600ms -> 1100ms total, should trigger tick (damage 5)
  const step2 = updateEntityStatusEffects(step1.activeEffects, 600);
  assert.equal(step2.damageToDeal, 5);
  assert.equal(step2.activeEffects.length, 1);
});

test("slow effect reduces speed multiplier", () => {
  const slow = createSlowEffect(2000, 0.4);
  const res = updateEntityStatusEffects([slow], 500);

  assert.equal(res.speedMultiplier, 0.6);
  assert.equal(res.isStunned, false);
});

test("shock effect stuns entity", () => {
  const shock = createShockEffect(800);
  const res = updateEntityStatusEffects([shock], 200);

  assert.equal(res.isStunned, true);
});

test("mergeStatusEffect refreshes duration instead of duplicating", () => {
  const burn1 = createBurnEffect(3000, 5, 1000);
  const burn2 = createBurnEffect(4000, 5, 1000);

  const merged = mergeStatusEffect([burn1], burn2);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].durationMs, 4000);
});
