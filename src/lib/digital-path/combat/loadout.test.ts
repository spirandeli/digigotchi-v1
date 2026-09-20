import assert from "node:assert/strict";
import test from "node:test";
import { PLAYABLE_COMBAT_PROFILES, getSpeciesCombatProfile } from "./loadout";

test("Playable combat profiles exist for Agumon, Veemon and Gabumon", () => {
  const agumon = getSpeciesCombatProfile("agumon");
  const veemon = getSpeciesCombatProfile("veemon");
  const gabumon = getSpeciesCombatProfile("gabumon");

  assert.equal(agumon.speciesId, "agumon");
  assert.equal(veemon.speciesId, "veemon");
  assert.equal(gabumon.speciesId, "gabumon");

  // Veemon is faster than Agumon and Gabumon
  assert.ok(veemon.baseSpeed > agumon.baseSpeed);
  assert.ok(veemon.baseSpeed > gabumon.baseSpeed);

  // Cooldowns and slots validation
  assert.ok(veemon.basic1.cooldownMs < agumon.basic1.cooldownMs);
  assert.equal(agumon.basic2.statusEffect, "burn");
  assert.equal(gabumon.basic2.statusEffect, "slow");
});

test("Fallback returns Agumon profile for unconfigured species", () => {
  const fallback = getSpeciesCombatProfile("unknown_species");
  assert.equal(fallback.speciesId, "agumon");
});

test("All combat profiles have attackType on every slot", () => {
  const validTypes = ["DIRECTIONAL_MELEE", "DIRECTIONAL_PROJECTILE", "DIRECTIONAL_SPECIAL", "RADIAL_AREA"];
  for (const [id, profile] of Object.entries(PLAYABLE_COMBAT_PROFILES)) {
    for (const slot of ["basic1", "basic2", "special"] as const) {
      const config = profile[slot];
      assert.ok(
        validTypes.includes(config.attackType),
        `${id}.${slot} has invalid attackType: ${config.attackType}`
      );
    }
    assert.equal(profile.basic1.attackType, "DIRECTIONAL_MELEE", `${id}.basic1`);
    assert.equal(profile.basic2.attackType, "DIRECTIONAL_PROJECTILE", `${id}.basic2`);
    assert.ok(
      profile.special.attackType === "RADIAL_AREA" || profile.special.attackType === "DIRECTIONAL_SPECIAL",
      `${id}.special`
    );
  }
});
