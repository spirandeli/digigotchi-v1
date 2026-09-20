import assert from "node:assert/strict";
import test from "node:test";
import { resolveManifestAnimation, validateSpriteManifest } from "./manifest-validation";
import type { DigitalPathSpriteManifest } from "./types";

const mockTwoWayManifest: DigitalPathSpriteManifest = {
  id: "agumon",
  root: "sprites/agumon",
  spriteReady: true,
  movementStyle: "2-way",
  frame: { width: 96, height: 96, originX: 0.5, originY: 0.94 },
  animations: {
    idle: { fps: 7, loop: true, frames: ["sprites/agumon/idle/idle_01.png"] },
    walk_left: { fps: 10, loop: true, frames: ["sprites/agumon/walk/left/walk_left_01.png"] },
    walk_right: { fps: 10, loop: true, frames: ["sprites/agumon/walk/right/walk_right_01.png"] },
    attack_basic_1: { fps: 12, loop: false, frames: ["sprites/agumon/attacks/basic_1/attacks_basic_1_01.png"] },
    attack_basic_2: { fps: 12, loop: false, frames: ["sprites/agumon/attacks/basic_2/attacks_basic_2_01.png"] },
    hit: { fps: 8, loop: false, frames: ["sprites/agumon/hit/hit_01.png"] },
    death: { fps: 5, loop: false, frames: ["sprites/agumon/death/death_01.png"] },
  },
};

test("resolveManifestAnimation resolves 2-way walk fallbacks for vertical movement", () => {
  const walkUp = resolveManifestAnimation(mockTwoWayManifest, "walk_up");
  assert.equal(walkUp?.frames[0], "sprites/agumon/walk/right/walk_right_01.png");

  const walkDown = resolveManifestAnimation(mockTwoWayManifest, "walk_down");
  assert.equal(walkDown?.frames[0], "sprites/agumon/walk/right/walk_right_01.png");
});

test("resolveManifestAnimation resolves attack_special fallback from basic_2/basic_1", () => {
  const special = resolveManifestAnimation(mockTwoWayManifest, "attack_special");
  assert.equal(special?.frames[0], "sprites/agumon/attacks/basic_2/attacks_basic_2_01.png");
});

test("validateSpriteManifest validates adapted 2-way manifest as ready", () => {
  assert.equal(validateSpriteManifest(mockTwoWayManifest), true);
});

test("validateSpriteManifest rejects manifest when spriteReady is false", () => {
  const notReady = { ...mockTwoWayManifest, spriteReady: false };
  assert.equal(validateSpriteManifest(notReady), false);
});
