import assert from "node:assert/strict";
import test from "node:test";
import { AGUMON_ABILITIES, isAbilitySetRuntimeReady, validateAbilitySet } from "./abilities";

test("Agumon has exactly three structured combat slots", () => {
  assert.equal(validateAbilitySet(AGUMON_ABILITIES), true);
  assert.deepEqual(AGUMON_ABILITIES.map((ability) => ability.slot), ["basic_1", "basic_2", "special"]);
  assert.equal(AGUMON_ABILITIES[2].cooldownMs > AGUMON_ABILITIES[0].cooldownMs, true);
});

test("Agumon combat remains blocked until all mandatory animations are verified", () => {
  assert.equal(isAbilitySetRuntimeReady(AGUMON_ABILITIES), false);
});