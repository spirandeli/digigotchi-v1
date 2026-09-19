import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

function resolveManifestAnimation(manifest, key) {
  const direct = manifest.animations?.[key];
  if (direct?.frames?.length) return direct;

  if (manifest.movementStyle === "2-way" || (!manifest.animations?.walk_up && !manifest.animations?.walk_down)) {
    if (key === "walk_up" || key === "walk_down") {
      return manifest.animations?.walk_right ?? manifest.animations?.walk_left;
    }
  }

  if (key === "attack_special" && !manifest.animations?.attack_special) {
    return manifest.animations?.attack_basic_2 ?? manifest.animations?.attack_basic_1;
  }

  return undefined;
}

function validateSpriteManifest(manifest) {
  if (!manifest.spriteReady || !manifest.id || !manifest.root) return false;
  const REQUIRED = ["idle", "walk_down", "walk_up", "walk_left", "walk_right", "attack_basic_1", "attack_basic_2", "attack_special", "hit", "death"];
  return REQUIRED.every((key) => {
    const anim = resolveManifestAnimation(manifest, key);
    return Boolean(anim?.frames?.length && anim.frames.every((f) => typeof f === "string" && f.length > 0 && !f.includes("..")) && anim.fps > 0);
  });
}

test("Agumon manifest is valid and runtime-ready with 2-way movement adaptation", () => {
  const agumon = JSON.parse(readFileSync(resolve("docs/digital-path/manifests/agumon.json"), "utf8"));
  assert.equal(agumon.spriteReady, true);
  assert.equal(agumon.movementStyle, "2-way");
  assert.equal(validateSpriteManifest(agumon), true);

  const walkUp = resolveManifestAnimation(agumon, "walk_up");
  assert.equal(Boolean(walkUp?.frames.length), true);

  const special = resolveManifestAnimation(agumon, "attack_special");
  assert.equal(Boolean(special?.frames.length), true);
});
