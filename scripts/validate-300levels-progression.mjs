// @ts-check
import assert from "node:assert/strict";
import {
  isBossFloor,
  isMiniBossFloor,
  getBossForFloor,
  getMiniBossForFloor,
  DIGITAL_PATH_CONFIG,
} from "../src/lib/digital-path/combat/bosses.ts";
import {
  getRoomKind,
  calculateEnemyStats,
  calculateEnemyCount,
  BOSS_ROOMS,
  MINIBOSS_ROOMS,
  MAX_LEVEL,
} from "../src/lib/digital-path/map/procedural-map.ts";
import { RunRNG } from "../src/lib/digital-path/map/rng.ts";

console.log("=================================================");
console.log(" 300-LEVEL PROGRESSION & MILESTONE VERIFICATION");
console.log("=================================================");

assert.equal(MAX_LEVEL, 300, "MAX_LEVEL must be 300");
assert.equal(DIGITAL_PATH_CONFIG.maxFloor, 300, "DIGITAL_PATH_CONFIG.maxFloor must be 300");
assert.equal(DIGITAL_PATH_CONFIG.bossInterval, 10, "Boss interval must be 10");
assert.equal(DIGITAL_PATH_CONFIG.minibossOffset, 5, "Miniboss offset must be 5");

let bossCount = 0;
let minibossCount = 0;
let normalCount = 0;

const bossLevels = [];
const minibossLevels = [];

for (let lvl = 1; lvl <= 300; lvl++) {
  const isBoss = isBossFloor(lvl);
  const isMini = isMiniBossFloor(lvl);
  const kind = getRoomKind(lvl);

  // Strict exclusivity
  assert.ok(!(isBoss && isMini), `Level ${lvl} cannot be both Boss and Mini Boss!`);

  if (lvl % 10 === 0) {
    assert.equal(isBoss, true, `Level ${lvl} must be a Boss floor`);
    assert.equal(isMini, false, `Level ${lvl} cannot be a Mini Boss floor`);
    assert.equal(kind, "boss", `Level ${lvl} kind must be 'boss'`);
    
    const boss = getBossForFloor(lvl);
    assert.ok(boss, `Level ${lvl} must have a valid boss entity`);
    assert.ok(boss.baseHp > 0, `Level ${lvl} boss must have HP > 0`);
    assert.ok(boss.attackDamage > 0, `Level ${lvl} boss must have Attack > 0`);

    bossCount++;
    bossLevels.push(lvl);
  } else if (lvl % 10 === 5) {
    assert.equal(isMini, true, `Level ${lvl} must be a Mini Boss floor`);
    assert.equal(isBoss, false, `Level ${lvl} cannot be a Boss floor`);
    assert.equal(kind, "miniboss", `Level ${lvl} kind must be 'miniboss'`);

    const miniboss = getMiniBossForFloor(lvl);
    assert.ok(miniboss, `Level ${lvl} must have a valid miniboss entity`);
    assert.ok(miniboss.baseHp > 0, `Level ${lvl} miniboss must have HP > 0`);
    assert.ok(miniboss.attackDamage > 0, `Level ${lvl} miniboss must have Attack > 0`);

    minibossCount++;
    minibossLevels.push(lvl);
  } else {
    assert.equal(isBoss, false, `Level ${lvl} should NOT be a Boss floor`);
    assert.equal(isMini, false, `Level ${lvl} should NOT be a Mini Boss floor`);
    assert.notEqual(kind, "boss", `Level ${lvl} kind cannot be 'boss'`);
    assert.notEqual(kind, "miniboss", `Level ${lvl} kind cannot be 'miniboss'`);
    normalCount++;
  }
}

assert.equal(bossCount, 30, `Expected exactly 30 boss levels, got ${bossCount}`);
assert.equal(minibossCount, 30, `Expected exactly 30 miniboss levels, got ${minibossCount}`);
assert.equal(normalCount, 240, `Expected exactly 240 normal levels, got ${normalCount}`);

console.log(`✔ Exactly 30 Boss Rooms verified: ${bossLevels.slice(0, 5).join(", ")} ... ${bossLevels.slice(-5).join(", ")}`);
console.log(`✔ Exactly 30 Mini Boss Rooms verified: ${minibossLevels.slice(0, 5).join(", ")} ... ${minibossLevels.slice(-5).join(", ")}`);
console.log(`✔ Exactly 240 Procedural Rooms verified`);

// Test Enemy Stats Scaling across 6 tiers
console.log("\n--- Validating Enemy Stats Scaling (No runaway bloat) ---");
const rng = new RunRNG(12345);
const sampleLevels = [1, 25, 50, 75, 100, 150, 200, 250, 300];
const progressionSamples = sampleLevels.map((lvl) => {
  const stats = calculateEnemyStats(100, 15, 5, 50, 1000, 20, 10, lvl, false);
  const eliteStats = calculateEnemyStats(100, 15, 5, 50, 1000, 20, 10, lvl, true);
  return {
    level: lvl,
    normalHp: stats.hp,
    normalAtk: stats.attack,
    normalDef: stats.defense,
    eliteHp: eliteStats.hp,
    eliteAtk: eliteStats.attack,
  };
});

console.table(progressionSamples);

// Verify that level 300 normal enemy HP is reasonable (< 3,000 HP, not 30,000)
const maxNormalStats = calculateEnemyStats(100, 15, 5, 50, 1000, 20, 10, 300, false);
assert.ok(maxNormalStats.hp <= 3000, `Level 300 enemy HP (${maxNormalStats.hp}) exceeds anti-sponge threshold!`);
assert.ok(maxNormalStats.hp >= 600, `Level 300 enemy HP (${maxNormalStats.hp}) is too weak!`);

console.log("✔ Enemy stats curve scales cleanly without damage sponge explosion");
console.log("=================================================");
console.log(" ALL 300-LEVEL PROGRESSION CHECKS PASSED!");
console.log("=================================================");
