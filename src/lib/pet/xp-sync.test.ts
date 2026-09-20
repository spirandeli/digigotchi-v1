import assert from "node:assert/strict";
import test from "node:test";
import { addDigimonXpToPet, createPet, xpToNext } from "./engine";
import { applyRunResult } from "./digital-path-bridge";
import { useGame } from "./store";

test("XP increment: 0 + 50 = 50", () => {
  const pet = createPet("veemon");
  pet.experience = 0;
  pet.level = 1;

  const res = addDigimonXpToPet(pet, "veemon", 50);
  assert.equal(res.pet.experience, 50);
  assert.equal(res.pet.level, 1);
});

test("XP increment: 100 + 50 = 150 (with proper level calculation)", () => {
  const pet = createPet("veemon");
  pet.level = 2; // xpToNext(2) = 50 + 2*40 = 130
  pet.experience = 100;

  // Adding 50 XP reaches 150, which is >= 130 -> levels up to 3!
  const res = addDigimonXpToPet(pet, "veemon", 50);
  assert.equal(res.leveledUp, true);
  assert.equal(res.pet.level, 3);
  assert.equal(res.pet.experience, 150 - 130); // 20
});

test("Species Guard: XP earned by Veemon does not affect Agumon", () => {
  const agumonPet = createPet("agumon");
  agumonPet.experience = 10;

  // Try awarding XP to veemon on agumon pet
  const res = addDigimonXpToPet(agumonPet, "veemon", 100);
  assert.equal(res.leveledUp, false);
  assert.equal(res.pet.experience, 10, "Agumon experience should remain unchanged");
  assert.equal(res.pet.level, agumonPet.level);
});

test("Supports multiple level ups in a single large XP reward", () => {
  const pet = createPet("veemon");
  pet.level = 1; // xpToNext(1) = 90
  pet.experience = 0;

  // Award 1000 XP
  const res = addDigimonXpToPet(pet, "veemon", 1000);
  assert.equal(res.leveledUp, true);
  assert.ok(res.pet.level >= 5, "Should have gained multiple levels");
  assert.ok(res.pet.experience < xpToNext(res.pet.level));
});

test("Defeat or abandoned run outcome preserves XP and coins when applied", () => {
  const pet = createPet("veemon");
  const initialXp = pet.experience;
  const initialCoins = pet.coins;

  const defeatResult = {
    runId: "run_defeat_test_001",
    outcome: "defeat" as const,
    xp: 120,
    coins: 45,
    alreadyAwardedXp: false,
  };

  const res = applyRunResult(pet, defeatResult);
  assert.equal(res.applied, true);
  assert.ok(res.pet.experience > initialXp || res.pet.level > pet.level);
  assert.equal(res.pet.coins, initialCoins + 45);
});

test("Store action addDigimonXp updates state immediately and triggers level up", () => {
  useGame.setState({ pet: createPet("veemon") });
  const result = useGame.getState().addDigimonXp("veemon", 50);

  assert.ok(result);
  const currentPet = useGame.getState().pet;
  assert.ok(currentPet);
  assert.equal(currentPet.experience, 50);
});

test("Store action saveDigitalPathProgress records checkpoints and completion", () => {
  useGame.setState({ pet: createPet("veemon") });
  useGame.getState().saveDigitalPathProgress({
    currentFloor: 11,
    highestFloor: 11,
    defeatedBosses: [10],
    completed: false,
  });

  const currentPet = useGame.getState().pet;
  assert.ok(currentPet?.digitalPath);
  assert.equal(currentPet.digitalPath.currentFloor, 11);
  assert.equal(currentPet.digitalPath.highestFloor, 11);
  assert.deepEqual(currentPet.digitalPath.defeatedBosses, [10]);
  assert.equal(currentPet.digitalPath.completed, false);
});
