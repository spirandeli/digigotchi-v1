import test from "node:test";
import assert from "node:assert/strict";
import { RunRNG } from "../map/rng";
import { PASSIVE_CATALOG, passiveToUpgradeDefinition } from "./PassiveCatalog";
import { calculateModifiers, getUpgradeChoices, UPGRADES_CATALOG } from "./upgrades";
import { LevelUpManager } from "./LevelUpManager";

test("PASSIVE_CATALOG contains 8 unique passives", () => {
  assert.equal(PASSIVE_CATALOG.length, 8);
  const ids = new Set(PASSIVE_CATALOG.map((p) => p.id));
  assert.equal(ids.size, 8);
});

test("calculateModifiers properly scales with passives (magnet, armor, growth, area)", () => {
  const powerPassive = UPGRADES_CATALOG.find((u) => u.id === "core_power_data")!;
  const magnetPassive = UPGRADES_CATALOG.find((u) => u.id === "core_magnet_sensor")!;
  const armorPassive = UPGRADES_CATALOG.find((u) => u.id === "core_data_armor")!;
  const growthPassive = UPGRADES_CATALOG.find((u) => u.id === "core_growth_algorithm")!;

  const mods = calculateModifiers([powerPassive, magnetPassive, armorPassive, growthPassive]);

  assert.ok(mods.attackMultiplier >= 1.10, "Attack multiplier should be boosted");
  assert.ok(mods.magnetRadius > 120, "Magnet radius should be boosted above 120");
  assert.equal(mods.armor, 2, "Armor should be 2");
  assert.equal(mods.growthMultiplier, 1.15, "Growth multiplier should be 1.15");
});

test("getUpgradeChoices respects 4 passives build limit", () => {
  const rng = new RunRNG(12345);
  // When player already has 4 passives, no new passives should be offered
  const choices = getUpgradeChoices(rng, [], 4);
  const passivesInChoices = choices.filter((c) => c.isPassive);
  assert.equal(passivesInChoices.length, 0, "No new passives when at cap (4)");
});

test("LevelUpManager tracks run level, XP progression and passives", () => {
  const lum = new LevelUpManager();
  assert.equal(lum.runLevel, 1);
  assert.equal(lum.passiveCount, 0);

  lum.recordPassive("core_power_data");
  assert.equal(lum.passiveCount, 1);

  // Add small XP (no level up)
  const didLv1 = lum.addXp(10);
  assert.equal(didLv1, false);

  // Add enough XP to level up
  const didLv2 = lum.addXp(50);
  assert.equal(didLv2, true);
  assert.equal(lum.runLevel, 2);

  lum.reset();
  assert.equal(lum.runLevel, 1);
  assert.equal(lum.passiveCount, 0);
});
