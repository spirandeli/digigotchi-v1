import test from "node:test";
import assert from "node:assert/strict";
import { getCombatRoomTimeline, getBossRoomAddsTimeline } from "./WaveTimeline";
import { EnemyDirector } from "./EnemyDirector";

test("WaveTimeline provides structured escalating waves for combat rooms", () => {
  const timeline = getCombatRoomTimeline(1, "fire");
  assert.equal(timeline.waves.length, 3, "Should have exactly 3 waves per room");
  assert.equal(timeline.waves[0].timestampMs, 0, "First wave starts at 0ms");
  assert.equal(timeline.maxSimultaneousAlive, 14, "Should cap at 14 simultaneous enemies to prevent lag");
});

test("EnemyDirector spawns waves dynamically and enforces maxSimultaneousAlive", () => {
  const director = new EnemyDirector();
  director.initRoom(1, "fire", "combat");

  // Initial wave at 0ms
  const initialSpawns = director.update(16, 0);
  assert.ok(initialSpawns.length > 0, "Should spawn initial pack");

  // Advance time to 15s (should trigger wave 2)
  const wave2Spawns = director.update(15000, 5);
  assert.ok(wave2Spawns.length > 0, "Should spawn wave 2 items");

  // When alive count is at cap, should not exceed cap
  const capSpawns = director.update(100, 100); // currentAlive = 100
  assert.equal(capSpawns.length, 0, "Should not spawn when at max alive cap");
});

test("EnemyDirector room completion logic", () => {
  const director = new EnemyDirector();
  director.initRoom(1, "fire", "combat");

  // Not completed at start
  assert.equal(director.isRoomCompleted(5), false);
  assert.equal(director.isRoomCompleted(0), false); // Waves not finished yet

  // Advance time past all waves across 80 seconds
  for (let t = 0; t < 800; t++) {
    director.update(100, 0);
  }
  assert.ok(director.isAllWavesSpawned(), "All waves should be spawned after 80s");

  // When enemies remain, not completed
  assert.equal(director.isRoomCompleted(3), false);

  // When 0 enemies remain after all waves, room is completed!
  assert.equal(director.isRoomCompleted(0), true);
});
