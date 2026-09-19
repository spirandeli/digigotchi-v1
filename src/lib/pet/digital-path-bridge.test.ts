import assert from "node:assert/strict";
import test from "node:test";
import { applyRunResult, createRunInput } from "./digital-path-bridge";
import { createPet } from "./engine";

test("creates a run snapshot from the current pet without exposing mutable state", () => {
  const pet = createPet("agumon");
  const input = createRunInput(pet);

  assert.ok(input);
  assert.equal(input.speciesId, "agumon");
  assert.equal(input.name, "Agumon");
  assert.notEqual(input.stats, pet);
  assert.equal(Object.isFrozen(input), true);
  assert.equal(Object.isFrozen(input.stats), true);
});

test("rejects malformed run results without changing the pet", () => {
  const pet = createPet("veemon");
  const result = applyRunResult(pet, { runId: "short", outcome: "victory", xp: 10, coins: 2 });

  assert.equal(result.applied, false);
  assert.deepEqual(result.pet, pet);
});

test("applies a victory once even when the result is submitted twice", () => {
  const pet = createPet("gabumon");
  const runResult = { runId: "digital-path-test-001", outcome: "victory", xp: 25, coins: 10 } as const;
  const first = applyRunResult(pet, runResult);
  const second = applyRunResult(first.pet, runResult);

  assert.equal(first.applied, true);
  assert.equal(second.applied, false);
  assert.equal(first.pet.coins, pet.coins + 10);
  assert.equal(second.pet.coins, first.pet.coins);
  assert.deepEqual(second.pet.digitalPathResults, [runResult.runId]);
});

test("applies items won in the digital path to pet inventory on victory", () => {
  const pet = createPet("agumon");
  const initialCarne = pet.inventory.carne_digital ?? 0;
  const initialFruta = pet.inventory.fruta_digital ?? 0;

  const runResult = {
    runId: "digital-path-test-items-002",
    outcome: "victory",
    xp: 40,
    coins: 20,
    itemsWon: {
      carne_digital: 3,
      fruta_digital: 2,
    },
  } as const;

  const res = applyRunResult(pet, runResult);
  assert.equal(res.applied, true);
  assert.equal(res.pet.inventory.carne_digital, initialCarne + 3);
  assert.equal(res.pet.inventory.fruta_digital, initialFruta + 2);
});

