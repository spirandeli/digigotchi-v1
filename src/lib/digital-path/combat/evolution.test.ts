import test from "node:test";
import assert from "node:assert/strict";
import { SKILL_EVOLUTIONS, checkAvailableEvolutions } from "./SkillEvolutionRegistry";

test("SKILL_EVOLUTIONS defines canonical evolutions for core Digimon skills", () => {
  assert.ok(SKILL_EVOLUTIONS.length >= 4);

  const flameEvo = SKILL_EVOLUTIONS.find((e) => e.baseSkillNameOrId === "Chama Bebê");
  assert.ok(flameEvo, "Should have evolution for Chama Bebê");
  assert.equal(flameEvo.requiredPassiveId, "core_flame_data");
  assert.equal(flameEvo.evolvedSkillName, "Mega Erupção de Magma");
});

test("checkAvailableEvolutions requires both base skill and required passive", () => {
  // Only skill, no passive -> no evolution
  const evoNoPassive = checkAvailableEvolutions(["Chama Bebê"], []);
  assert.equal(evoNoPassive.length, 0);

  // Both skill and required passive -> evolution unlocked!
  const evoUnlocked = checkAvailableEvolutions(["Chama Bebê"], ["core_flame_data"]);
  assert.equal(evoUnlocked.length, 1);
  assert.equal(evoUnlocked[0].evolvedSkillName, "Mega Erupção de Magma");

  // Already evolved -> not repeated
  const alreadyEvolved = checkAvailableEvolutions(
    ["Chama Bebê"],
    ["core_flame_data"],
    ["Mega Erupção de Magma"]
  );
  assert.equal(alreadyEvolved.length, 0);
});
