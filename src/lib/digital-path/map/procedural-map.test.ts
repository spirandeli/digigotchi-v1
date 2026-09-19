import assert from "node:assert/strict";
import test from "node:test";
import { createFiniteRun, generateDungeon, isPathConnected, validateDungeon } from "./procedural-map";

test("generates the same topology for the same seed", () => {
  const first = generateDungeon(42);
  const second = generateDungeon(42);
  assert.deepEqual(first.rooms, second.rooms);
  assert.deepEqual(first.tiles, second.tiles);
  assert.equal(validateDungeon(first), true);
});

test("varies topology for different seeds while preserving connectivity", () => {
  const first = generateDungeon(42);
  const second = generateDungeon(43);
  assert.notDeepEqual(first.rooms, second.rooms);
  assert.equal(validateDungeon(first), true);
  assert.equal(validateDungeon(second), true);
});

test("createFiniteRun produces exactly 6 rooms with guaranteed BFS connectivity and unique IDs", () => {
  const run = createFiniteRun(12345);
  assert.equal(run.totalRooms, 6);
  assert.equal(run.rooms.length, 6);

  const seenIds = new Set<string>();
  for (const room of run.rooms) {
    assert.equal(seenIds.has(room.id), false, `Duplicate room ID ${room.id}`);
    seenIds.add(room.id);
    assert.equal(isPathConnected(room.tiles, room.spawn, room.exit, room.width, room.height), true);
    assert.equal(room.tiles[room.spawn.y][room.spawn.x], "floor");
    assert.equal(room.tiles[room.exit.y][room.exit.x], "floor");
  }

  assert.deepEqual(Array.from(seenIds), [
    "room_01",
    "room_02",
    "room_03",
    "room_04",
    "room_05",
    "room_06",
  ]);
});