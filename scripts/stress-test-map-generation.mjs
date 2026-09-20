// @ts-check
import assert from "node:assert/strict";
import {
  generateSingleRoom,
  getBiomeForFloor,
  getRoomKind,
  isPathConnected,
  findReachableFloorTiles,
  MAP_CONFIG,
} from "../src/lib/digital-path/map/procedural-map.ts";

console.log("=================================================");
console.log(" 3,000-ROOM PROCEDURAL GENERATION STRESS TEST");
console.log("=================================================");

const TOTAL_TEST_ROOMS = 3000;
/** @type {Record<string, number>} */
const shapeCounts = {};
/** @type {Record<string, number>} */
const kindCounts = {};
let disconnectedRooms = 0;
let unreachableProps = 0;
let unreachableEnemies = 0;
let unsafeSpawns = 0;

const startTime = Date.now();

for (let i = 1; i <= TOTAL_TEST_ROOMS; i++) {
  // Floor cycles from 1 to 300
  const floor = ((i - 1) % 300) + 1;
  const seed = (i * 7919) ^ (floor * 104729);
  const biome = getBiomeForFloor(floor);
  const expectedKind = getRoomKind(floor);

  const room = generateSingleRoom(`stress_${i}`, i, expectedKind, seed, biome, floor);

  // Record metrics
  const shapeKey = room.shape || "rectangle";
  shapeCounts[shapeKey] = (shapeCounts[shapeKey] || 0) + 1;
  kindCounts[room.kind] = (kindCounts[room.kind] || 0) + 1;

  // 1. Verify BFS connectivity: Spawn -> Exit
  const connected = isPathConnected(room.tiles, room.spawn, room.exit, room.width, room.height);
  if (!connected) {
    disconnectedRooms++;
    console.error(`❌ Disconnected room at iteration ${i}, floor ${floor}, shape: ${shapeKey}`);
  }

  // 2. Verify all reachable tiles from spawn
  const reachableList = findReachableFloorTiles(room.tiles, room.spawn, room.width, room.height);
  const reachable = new Set(reachableList.map((p) => `${p.x},${p.y}`));

  // 3. Verify props reachability
  for (const prop of room.props) {
    if (!reachable.has(`${prop.tileX},${prop.tileY}`)) {
      unreachableProps++;
      console.error(`❌ Unreachable prop at iteration ${i}, floor ${floor} at (${prop.tileX}, ${prop.tileY})`);
    }
  }

  // 4. Verify enemies reachability
  for (const enemy of room.enemies) {
    if (!reachable.has(`${enemy.tileX},${enemy.tileY}`)) {
      unreachableEnemies++;
      console.error(`❌ Unreachable enemy at iteration ${i}, floor ${floor} at (${enemy.tileX}, ${enemy.tileY})`);
    }
  }

  // 5. Verify safe spawn (spawn tile is floor, not inside wall or out of bounds)
  if (
    room.spawn.x < 1 ||
    room.spawn.x >= room.width - 1 ||
    room.spawn.y < 1 ||
    room.spawn.y >= room.height - 1 ||
    room.tiles[room.spawn.y]?.[room.spawn.x] !== "floor"
  ) {
    unsafeSpawns++;
  }

  // Check if exit is also a valid floor
  assert.equal(room.tiles[room.exit.y]?.[room.exit.x], "floor", `Exit at (${room.exit.x}, ${room.exit.y}) must be floor`);
}

const elapsedMs = Date.now() - startTime;

console.log(`\nCompleted ${TOTAL_TEST_ROOMS} simulated rooms in ${elapsedMs}ms (${(elapsedMs / TOTAL_TEST_ROOMS).toFixed(2)}ms / room)`);
console.log("\n--- Room Shapes Distribution ---");
console.table(shapeCounts);

console.log("\n--- Room Archetypes Distribution ---");
console.table(kindCounts);

console.log("\n--- Integrity & Reachability Verdict ---");
console.log(`Disconnected Spawn -> Exit: ${disconnectedRooms} / ${TOTAL_TEST_ROOMS}`);
console.log(`Unreachable Props:         ${unreachableProps}`);
console.log(`Unreachable Enemies:       ${unreachableEnemies}`);
console.log(`Unsafe Spawns:             ${unsafeSpawns}`);

assert.equal(disconnectedRooms, 0, "No room should ever be disconnected!");
assert.equal(unreachableProps, 0, "All props must be reachable!");
assert.equal(unreachableEnemies, 0, "All enemies must be reachable!");
assert.equal(unsafeSpawns, 0, "All spawns must be completely safe!");

console.log("\n=================================================");
console.log(" ALL 3,000 ROOMS ARE 100% VALID AND REACHABLE!");
console.log("=================================================");
