import assert from "node:assert/strict";
import test from "node:test";
import {
  createFiniteRun,
  generateDungeon,
  generateSingleRoom,
  getBiomeForFloor,
  isPathConnected,
  MAP_CONFIG,
  validateDungeon,
} from "./procedural-map";

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

test("createFiniteRun produces valid run definition with 300 total rooms and guaranteed BFS connectivity", () => {
  const run = createFiniteRun(12345, 1);
  assert.equal(run.totalRooms, 300);
  assert.equal(run.rooms.length, 1);
  const room = run.rooms[0];
  assert.equal(room.id, "room_01");
  assert.equal(isPathConnected(room.tiles, room.spawn, room.exit, room.width, room.height), true);
  assert.equal(room.tiles[room.spawn.y][room.spawn.x], "floor");
  assert.equal(room.tiles[room.exit.y][room.exit.x], "floor");
});

test("MAP_CONFIG enforces +15% size increase and proper room size categories", () => {
  assert.equal(MAP_CONFIG.sizeMultiplier, 1.15);
  const expectedMediumWidth = Math.round(MAP_CONFIG.baseWidth * 1.15);
  const expectedMediumHeight = Math.round(MAP_CONFIG.baseHeight * 1.15);

  assert.equal(MAP_CONFIG.roomSizeCategories.medium.width, expectedMediumWidth); // 28
  assert.equal(MAP_CONFIG.roomSizeCategories.medium.height, expectedMediumHeight); // 18
  assert.ok(MAP_CONFIG.roomSizeCategories.large.width > expectedMediumWidth);
  assert.ok(MAP_CONFIG.roomSizeCategories.arena.width >= 36);
});

test("Procedural maps: 50 seeds tested with 100% BFS connectivity, loops, and dead-ends", () => {
  let loopsObserved = 0;
  let deadEndsObserved = 0;
  let totalWidth = 0;
  let totalHeight = 0;

  for (let seed = 1001; seed <= 1050; seed++) {
    const floor = ((seed - 1001) % 50) + 1;
    const room = generateSingleRoom(`test_${seed}`, 1, "combat", seed, getBiomeForFloor(floor), floor);

    // BFS connectivity must be 100% valid
    const connected = isPathConnected(room.tiles, room.spawn, room.exit, room.width, room.height);
    assert.equal(connected, true, `Seed ${seed} failed BFS connectivity`);

    // Dimensions must respect config bounds
    assert.ok(room.width >= MAP_CONFIG.minRoomWidth, `Width ${room.width} below min`);
    assert.ok(room.width <= MAP_CONFIG.roomSizeCategories.arena.width, `Width ${room.width} above max`);
    assert.ok(room.height >= MAP_CONFIG.minRoomHeight, `Height ${room.height} below min`);

    totalWidth += room.width;
    totalHeight += room.height;

    if (room.graph?.hasLoops) loopsObserved++;
    if (room.graph?.hasDeadEnds) deadEndsObserved++;
  }

  // Average size must be at least 15% larger than original 24x16 (average area > 24*16*1.15 = 441.6)
  const avgWidth = totalWidth / 50;
  const avgHeight = totalHeight / 50;
  const avgArea = avgWidth * avgHeight;
  const baseArea = MAP_CONFIG.baseWidth * MAP_CONFIG.baseHeight;
  assert.ok(avgArea >= baseArea * 1.15, `Average area ${avgArea} is not at least 15% larger than ${baseArea}`);

  // Loops and dead-ends must appear across 50 seeds
  assert.ok(loopsObserved > 5, `Expected loops across 50 seeds, got ${loopsObserved}`);
  assert.ok(deadEndsObserved > 5, `Expected dead ends across 50 seeds, got ${deadEndsObserved}`);
});

test("getBiomeForFloor maps 300 rooms smoothly across biomes", () => {
  assert.equal(getBiomeForFloor(1), "digital");
  assert.equal(getBiomeForFloor(10), "digital");
  assert.equal(getBiomeForFloor(11), "fire");
  assert.equal(getBiomeForFloor(20), "fire");
  assert.equal(getBiomeForFloor(21), "ice");
  assert.equal(getBiomeForFloor(30), "ice");
  assert.equal(getBiomeForFloor(31), "storm");
  assert.equal(getBiomeForFloor(40), "storm");
  assert.equal(getBiomeForFloor(41), "dark");
  assert.equal(getBiomeForFloor(50), "dark");
  // Next cycle starting at 51
  assert.equal(getBiomeForFloor(51), "digital");
  assert.equal(getBiomeForFloor(100), "dark");
  assert.equal(getBiomeForFloor(300), "dark");
});

test("BOSS_ROOMS has exactly 30 milestone boss encounters on every 10th room up to 300", async () => {
  const { BOSS_ROOMS, getRoomKind } = await import("./procedural-map");
  assert.equal(BOSS_ROOMS.length, 30);
  assert.equal(BOSS_ROOMS[0], 10);
  assert.equal(BOSS_ROOMS[29], 300);
  for (const r of BOSS_ROOMS) {
    assert.equal(r % 10, 0);
    assert.equal(getRoomKind(r), "boss");
  }
});

test("MINIBOSS_ROOMS has exactly 30 milestone miniboss encounters on every room ending in 5 up to 300", async () => {
  const { MINIBOSS_ROOMS, BOSS_ROOMS, getRoomKind } = await import("./procedural-map");
  assert.equal(MINIBOSS_ROOMS.length, 30);
  assert.equal(MINIBOSS_ROOMS[0], 5);
  assert.equal(MINIBOSS_ROOMS[29], 295);
  for (const r of MINIBOSS_ROOMS) {
    assert.equal(r % 10, 5);
    assert.equal(getRoomKind(r), "miniboss");
    assert.equal(BOSS_ROOMS.includes(r as any), false, `Miniboss room ${r} must not overlap with boss rooms`);
  }
});

test("calculateEnemyStats scales attributes smoothly based on enemyLevel", async () => {
  const { calculateEnemyStats } = await import("./procedural-map");
  const lv1 = calculateEnemyStats(50, 10, 2, 60, 1500, 20, 10, 1, false);
  const lv25 = calculateEnemyStats(50, 10, 2, 60, 1500, 20, 10, 25, false);
  const lv50 = calculateEnemyStats(50, 10, 2, 60, 1500, 20, 10, 50, false);

  assert.equal(lv1.level, 1);
  assert.equal(lv1.hp, 50);
  assert.equal(lv1.attack, 10);

  assert.ok(lv25.hp > lv1.hp);
  assert.ok(lv25.attack > lv1.attack);
  assert.ok(lv25.defense >= lv1.defense);
  assert.ok(lv25.speed <= 95);
  assert.ok(lv25.xpReward > lv1.xpReward);

  assert.ok(lv50.hp > lv25.hp);
  assert.ok(lv50.attack > lv25.attack);
  assert.ok(lv50.xpReward > lv25.xpReward);
});

test("calculateEnemyCount respects minimum and maximum bounds across run progression", async () => {
  const { calculateEnemyCount, getRoomKind, BOSS_ROOMS } = await import("./procedural-map");
  const { RunRNG } = await import("./rng");
  const rng = new RunRNG(42);

  // Tier 1 (rooms 1-49): 3-5 in standard combat rooms
  for (let r = 1; r <= 49; r++) {
    const kind = getRoomKind(r);
    if (kind !== "combat" && kind !== "elite") continue;
    const count = calculateEnemyCount(r, "medium", rng);
    assert.ok(count >= 3 && count <= 5, `Room ${r} expected 3-5 enemies, got ${count}`);
  }

  // Tiers 2 & 3 (rooms 51-149): 4-7 in standard combat rooms
  for (let r = 51; r <= 149; r += 5) {
    const kind = getRoomKind(r);
    if (kind !== "combat" && kind !== "elite") continue;
    const count = calculateEnemyCount(r, "medium", rng);
    assert.ok(count >= 4 && count <= 7, `Room ${r} expected 4-7 enemies, got ${count}`);
  }

  // Tiers 4-6 (rooms 151-299): 5-9 in standard combat rooms
  for (let r = 151; r <= 299; r += 7) {
    const kind = getRoomKind(r);
    if (kind !== "combat" && kind !== "elite") continue;
    const count = calculateEnemyCount(r, "medium", rng);
    assert.ok(count >= 5 && count <= 9, `Room ${r} expected 5-9 enemies, got ${count}`);
  }

  // Boss rooms: exactly 1
  for (const b of BOSS_ROOMS) {
    const count = calculateEnemyCount(b, "arena", rng);
    assert.equal(count, 1, `Boss room ${b} must have exactly 1 boss`);
  }
});

test("findValidSpawnTile returns a valid floor tile connected to exit", async () => {
  const { findValidSpawnTile, generateSingleRoom } = await import("./procedural-map");
  const room = generateSingleRoom("test_spawn", 0, "combat", 9999, "digital", 1);
  const spawn = findValidSpawnTile(room);

  assert.ok(spawn.x > 0 && spawn.x < room.width - 1);
  assert.ok(spawn.y > 0 && spawn.y < room.height - 1);
  assert.equal(room.tiles[spawn.y][spawn.x], "floor");
});