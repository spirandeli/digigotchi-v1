import assert from "node:assert/strict";
import test from "node:test";

import { SPRITE_ANIMATIONS } from "./data.ts";

test("agumon idle uses the real sprite frame count and no invalid URLs", () => {
  const frames = SPRITE_ANIMATIONS.agumon.idle.frames;

  assert.equal(frames.length, 9);
  assert.ok(frames.every((frame) => frame.endsWith(".png")));
  assert.match(frames[0], /\/agumon\/idle\/idle_01\.png$/);
  assert.match(frames[frames.length - 1], /\/agumon\/idle\/idle_09\.png$/);
});

test("xvmon attack-vs-laser uses a valid frame set", () => {
  const frames = SPRITE_ANIMATIONS.xvmon["attack-vee-laser"].frames;

  assert.equal(frames.length, 12);
  assert.match(frames[0], /\/xvmon\/attack-vee-laser\/attack-vee-laser_01\.png$/);
});
