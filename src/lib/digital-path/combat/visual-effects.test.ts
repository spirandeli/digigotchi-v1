import assert from "node:assert/strict";
import test from "node:test";
import {
  DIGIMON_VFX_PROFILES,
  getDirectionalVfxPosition,
  getSpeciesVfxProfile,
  getVfxTransform,
} from "./visual-effects";

test("getSpeciesVfxProfile returns defined profile for agumon, veemon, and gabumon", () => {
  const agumon = getSpeciesVfxProfile("agumon");
  assert.equal(agumon.speciesId, "agumon");
  assert.equal(agumon.basic2.hasProjectile, true);
  assert.equal(agumon.basic2.projectileAnimKey, "agumon_projectile_dragon");
  assert.equal(agumon.special.effectAnimKey, "agumon_effect_mega_blast");

  const veemon = getSpeciesVfxProfile("veemon");
  assert.equal(veemon.speciesId, "veemon");
  assert.equal(veemon.basic1.hasVisualEffect, true);
  assert.equal(veemon.basic1.effectAnimKey, "veemon_effects_attack_1");
  assert.equal(veemon.basic2.projectileAnimKey, "veemon_projectile_laser");
  assert.equal(veemon.special.effectAnimKey, "veemon_effects_special");
  assert.equal(veemon.special.secondaryAnimKey, "veemon_effects_attack_2");

  const gabumon = getSpeciesVfxProfile("gabumon");
  assert.equal(gabumon.speciesId, "gabumon");
});

test("getSpeciesVfxProfile falls back to agumon for unknown or unconfigured species", () => {
  const fallback = getSpeciesVfxProfile("unknown_mon");
  assert.equal(fallback.speciesId, "agumon");
});

test("getDirectionalVfxPosition offsets forward in all 4 cardinal directions", () => {
  const origin = { x: 100, y: 100 };
  const up = getDirectionalVfxPosition(origin, "up", 30);
  assert.deepEqual(up, { x: 100, y: 70 });

  const down = getDirectionalVfxPosition(origin, "down", 30);
  assert.deepEqual(down, { x: 100, y: 130 });

  const left = getDirectionalVfxPosition(origin, "left", 30);
  assert.deepEqual(left, { x: 70, y: 100 });

  const right = getDirectionalVfxPosition(origin, "right", 30);
  assert.deepEqual(right, { x: 130, y: 100 });
});

test("getVfxTransform calculates proper rotation and flips for 4 directions", () => {
  const right = getVfxTransform("right");
  assert.equal(right.rotation, 0);
  assert.equal(right.flipX, false);

  const left = getVfxTransform("left");
  assert.equal(left.rotation, Math.PI);
  assert.equal(left.flipY, true);

  const up = getVfxTransform("up");
  assert.equal(up.rotation, -Math.PI / 2);

  const down = getVfxTransform("down");
  assert.equal(down.rotation, Math.PI / 2);
});
