import test from "node:test";
import assert from "node:assert/strict";
import { SpatialHashGrid } from "./SpatialHashGrid";
import { ObjectPool } from "./ObjectPool";
import { ChestManager } from "./ChestManager";
import { rollEliteModifier, ELITE_MODIFIERS } from "./EliteModifiers";

test("SpatialHashGrid properly partitions and queries nearby entities", () => {
  const grid = new SpatialHashGrid<{ id: string; x: number; y: number }>(64);

  grid.insert({ id: "e1", x: 100, y: 100 });
  grid.insert({ id: "e2", x: 120, y: 110 });
  grid.insert({ id: "e3", x: 500, y: 500 }); // far away

  const near = grid.queryNearby(105, 105, 50);
  assert.equal(near.length, 2);
  const ids = near.map((e) => e.id).sort();
  assert.deepEqual(ids, ["e1", "e2"]);

  const far = grid.queryNearby(500, 500, 20);
  assert.equal(far.length, 1);
  assert.equal(far[0].id, "e3");
});

test("ObjectPool reuses instances and resets cleanly", () => {
  let createdCount = 0;
  const pool = new ObjectPool<{ val: number }>(
    () => {
      createdCount++;
      return { val: 0 };
    },
    5,
    (item) => {
      item.val = 0;
    }
  );

  assert.equal(createdCount, 5);
  assert.equal(pool.availableCount, 5);

  const obj = pool.acquire();
  obj.val = 42;
  assert.equal(pool.availableCount, 4);

  pool.release(obj);
  assert.equal(pool.availableCount, 5);
  assert.equal(obj.val, 0); // resetFn reset it
});

test("ChestManager spawns and handles chest opening", () => {
  const cm = new ChestManager();
  const chest = cm.spawnChest(100, 100, "evolution");
  assert.equal(chest.opened, false);

  // Player too far -> no open
  const noResult = cm.checkOpen(200, 200);
  assert.equal(noResult, null);

  // Player close -> open chest
  const result = cm.checkOpen(110, 105);
  assert.ok(result);
  assert.equal(result.chest.opened, true);
  assert.equal(result.reward.triggerEvolution, true);
  assert.ok(result.reward.coins > 0);
});

test("EliteModifiers rolls valid modifier definitions", () => {
  const mod0 = rollEliteModifier(0);
  const mod1 = rollEliteModifier(1);
  assert.ok(mod0.name);
  assert.ok(mod1.name);
  assert.ok(mod0.speedMultiplier > 0);
});
