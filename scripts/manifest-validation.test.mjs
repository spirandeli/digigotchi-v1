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

const ALL_SPECIES = [
  "veemon", "agumon", "gabumon", "garurumon", "geogreymon",
  "wargreymon", "weregarurumon", "xvmon", "flamedramon",
  "etemon", "metaletemon", "kingetemon"
];

for (const species of ALL_SPECIES) {
  test(`${species} manifest is valid and runtime-ready with 4-way movement`, () => {
    const mfPath = resolve(`docs/digital-path/manifests/${species}.json`);
    const manifest = JSON.parse(readFileSync(mfPath, "utf8"));
    assert.equal(manifest.spriteReady, true);
    assert.equal(manifest.movementStyle, "4-way");
    assert.equal(validateSpriteManifest(manifest), true);

    const walkUp = resolveManifestAnimation(manifest, "walk_up");
    assert.equal(Boolean(walkUp?.frames.length), true);

    const walkDown = resolveManifestAnimation(manifest, "walk_down");
    assert.equal(Boolean(walkDown?.frames.length), true);

    const walkLeft = resolveManifestAnimation(manifest, "walk_left");
    assert.equal(Boolean(walkLeft?.frames.length), true);

    const walkRight = resolveManifestAnimation(manifest, "walk_right");
    assert.equal(Boolean(walkRight?.frames.length), true);

    const special = resolveManifestAnimation(manifest, "attack_special");
    assert.equal(Boolean(special?.frames.length), true);
  });
}
