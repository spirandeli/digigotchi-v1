import test from "node:test";
import assert from "node:assert/strict";
import { RunRNG } from "../map/rng";
import { calculateModifiers, getUpgradeChoices, UPGRADES_CATALOG } from "./upgrades";

test("getUpgradeChoices returns exactly 3 distinct upgrades", () => {
  const rng = new RunRNG(42);
  const choices = getUpgradeChoices(rng);

  assert.equal(choices.length, 3);
  const uniqueIds = new Set(choices.map((c) => c.id));
  assert.equal(uniqueIds.size, 3);
});

test("calculateModifiers properly aggregates active upgrades", () => {
  const flameCore = UPGRADES_CATALOG.find((u) => u.id === "flame_core")!;
  const rapidData = UPGRADES_CATALOG.find((u) => u.id === "rapid_data")!;
  const recoveryChip = UPGRADES_CATALOG.find((u) => u.id === "recovery_chip")!;

  const mods = calculateModifiers([flameCore, rapidData, recoveryChip]);

  assert.equal(mods.attackMultiplier, 1.20);
  assert.equal(mods.cooldownMultiplier, 0.80);
  assert.equal(mods.roomEnterHeal, 15);
});
