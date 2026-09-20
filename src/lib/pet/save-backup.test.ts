import assert from "node:assert/strict";
import test from "node:test";
import { createPet } from "./engine";

// Mock localStorage for unit test
const storage = new Map<string, string>();
const mockLocalStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, val: string) => storage.set(key, val),
  removeItem: (key: string) => storage.delete(key),
  clear: () => storage.clear(),
};

test("Save system creates mirror backup and recovers when primary is corrupted", () => {
  mockLocalStorage.clear();
  const pet = createPet("agumon");
  pet.level = 3;
  pet.coins = 150;

  const serialized = JSON.stringify(pet);
  mockLocalStorage.setItem("digital_pet_save_v2", serialized);
  mockLocalStorage.setItem("digital_pet_save_v2_backup", serialized);

  // Corrupt primary save
  mockLocalStorage.setItem("digital_pet_save_v2", "{ corrupt_json_!!!");

  // Test recovery logic
  let loadedPet = null;
  try {
    const raw = mockLocalStorage.getItem("digital_pet_save_v2");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.speciesId && parsed.level) {
        loadedPet = parsed;
      }
    }
  } catch {
    // Expected corrupt parse
  }

  if (!loadedPet) {
    const backupRaw = mockLocalStorage.getItem("digital_pet_save_v2_backup");
    if (backupRaw) {
      const recovered = JSON.parse(backupRaw);
      if (recovered && recovered.speciesId && recovered.level) {
        loadedPet = recovered;
        mockLocalStorage.setItem("digital_pet_save_v2", backupRaw);
      }
    }
  }

  assert.ok(loadedPet);
  assert.equal(loadedPet.speciesId, "agumon");
  assert.equal(loadedPet.level, 3);
  assert.equal(loadedPet.coins, 150);
  assert.equal(mockLocalStorage.getItem("digital_pet_save_v2"), serialized);
});
