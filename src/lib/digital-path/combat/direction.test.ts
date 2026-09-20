import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  getFacingVector,
  getProjectileSpawnOffset,
  getAttackSpawnPosition,
  getDirectionalHitboxPosition,
  applyDirectionalVelocity,
  getProjectileRotation,
  getDirectionalEffectRotation,
  type FacingDirection,
} from "./direction";

describe("getFacingVector", () => {
  it("returns correct vector for each direction", () => {
    assert.deepStrictEqual(getFacingVector("up"), { x: 0, y: -1 });
    assert.deepStrictEqual(getFacingVector("down"), { x: 0, y: 1 });
    assert.deepStrictEqual(getFacingVector("left"), { x: -1, y: 0 });
    assert.deepStrictEqual(getFacingVector("right"), { x: 1, y: 0 });
  });

  it("vectors are unit length", () => {
    const dirs: FacingDirection[] = ["up", "down", "left", "right"];
    for (const dir of dirs) {
      const v = getFacingVector(dir);
      const len = Math.hypot(v.x, v.y);
      assert.strictEqual(len, 1, `${dir} vector length should be 1, got ${len}`);
    }
  });
});

describe("getProjectileSpawnOffset", () => {
  it("offsets correctly in each direction", () => {
    assert.deepStrictEqual(getProjectileSpawnOffset("right", 28), { x: 28, y: 0 });
    assert.deepStrictEqual(getProjectileSpawnOffset("left", 28), { x: -28, y: 0 });
    assert.deepStrictEqual(getProjectileSpawnOffset("up", 28), { x: 0, y: -28 });
    assert.deepStrictEqual(getProjectileSpawnOffset("down", 28), { x: 0, y: 28 });
  });

  it("works with zero offset", () => {
    assert.deepStrictEqual(getProjectileSpawnOffset("right", 0), { x: 0, y: 0 });
  });
});

describe("getAttackSpawnPosition & getDirectionalHitboxPosition", () => {
  const origin = { x: 100, y: 200 };
  const offset = 36;

  it("calculates correct spawn position ahead of character", () => {
    assert.deepStrictEqual(getAttackSpawnPosition(origin, "right", offset), { x: 136, y: 200 });
    assert.deepStrictEqual(getAttackSpawnPosition(origin, "left", offset), { x: 64, y: 200 });
    assert.deepStrictEqual(getAttackSpawnPosition(origin, "up", offset), { x: 100, y: 164 });
    assert.deepStrictEqual(getAttackSpawnPosition(origin, "down", offset), { x: 100, y: 236 });
  });

  it("getDirectionalHitboxPosition matches spawn position", () => {
    assert.deepStrictEqual(getDirectionalHitboxPosition(origin, "up", offset), { x: 100, y: 164 });
    assert.deepStrictEqual(getDirectionalHitboxPosition(origin, "down", offset), { x: 100, y: 236 });
  });
});

describe("applyDirectionalVelocity", () => {
  const speed = 360;

  it("calculates correct vx and vy for all 4 directions", () => {
    assert.deepStrictEqual(applyDirectionalVelocity("right", speed), { vx: 360, vy: 0 });
    assert.deepStrictEqual(applyDirectionalVelocity("left", speed), { vx: -360, vy: 0 });
    assert.deepStrictEqual(applyDirectionalVelocity("up", speed), { vx: 0, vy: -360 });
    assert.deepStrictEqual(applyDirectionalVelocity("down", speed), { vx: 0, vy: 360 });
  });
});

describe("getProjectileRotation", () => {
  it("right is 0 radians", () => {
    assert.strictEqual(getProjectileRotation("right"), 0);
  });

  it("down is PI/2", () => {
    assert.strictEqual(getProjectileRotation("down"), Math.PI / 2);
  });

  it("left is PI", () => {
    assert.strictEqual(getProjectileRotation("left"), Math.PI);
  });

  it("up is -PI/2", () => {
    assert.strictEqual(getProjectileRotation("up"), -Math.PI / 2);
  });

  it("getDirectionalEffectRotation matches getProjectileRotation", () => {
    assert.strictEqual(getDirectionalEffectRotation("up"), -Math.PI / 2);
    assert.strictEqual(getDirectionalEffectRotation("down"), Math.PI / 2);
  });
});
