import assert from "node:assert/strict";
import test from "node:test";
import {
  BOSS_DEFINITIONS,
  DIGITAL_PATH_CONFIG,
  getBossForFloor,
  isBossFloor,
} from "./bosses";

test("DIGITAL_PATH_CONFIG specifies exactly 50 floors and 5 boss encounters", () => {
  assert.equal(DIGITAL_PATH_CONFIG.maxFloor, 50);
  assert.deepEqual(Array.from(DIGITAL_PATH_CONFIG.bossFloors), [10, 20, 30, 40, 50]);
  assert.deepEqual(Array.from(DIGITAL_PATH_CONFIG.checkpointFloors), [1, 11, 21, 31, 41]);
});

test("isBossFloor accurately identifies boss floors", () => {
  assert.equal(isBossFloor(10), true);
  assert.equal(isBossFloor(20), true);
  assert.equal(isBossFloor(30), true);
  assert.equal(isBossFloor(40), true);
  assert.equal(isBossFloor(50), true);

  assert.equal(isBossFloor(1), false);
  assert.equal(isBossFloor(9), false);
  assert.equal(isBossFloor(11), false);
  assert.equal(isBossFloor(49), false);
  assert.equal(isBossFloor(51), false);
});

test("getBossForFloor returns unique multi-phase bosses for each boss milestone", () => {
  const boss10 = getBossForFloor(10);
  assert.equal(boss10.id, "kuwagamon");
  assert.equal(boss10.phases.length, 2);

  const boss20 = getBossForFloor(20);
  assert.equal(boss20.id, "meramon");
  assert.equal(boss20.phases.length, 2);

  const boss30 = getBossForFloor(30);
  assert.equal(boss30.id, "seadramon");
  assert.equal(boss30.phases.length, 2);

  const boss40 = getBossForFloor(40);
  assert.equal(boss40.id, "metaletemon");
  assert.equal(boss40.phases.length, 2);

  const boss50 = getBossForFloor(50);
  assert.equal(boss50.id, "wargeymon");
  assert.equal(boss50.phases.length, 2);
  assert.ok(boss50.baseHp > boss40.baseHp, "Final boss must have higher HP than floor 40 boss");
  assert.ok(boss50.attackDamage > boss40.attackDamage, "Final boss must have higher attack than floor 40 boss");
});

test("All 5 bosses have valid drops, rewards and rage phases (<50% HP)", () => {
  for (const boss of Object.values(BOSS_DEFINITIONS)) {
    assert.ok(boss.baseHp >= 250, `${boss.name} HP too low`);
    assert.ok(boss.attackDamage >= 16, `${boss.name} Atk too low`);
    assert.ok(boss.xpReward >= 150, `${boss.name} XP reward too low`);
    assert.ok(boss.coinReward >= 80, `${boss.name} Coin reward too low`);
    assert.ok(boss.guaranteedItemDrop.length > 0, `${boss.name} missing item drop`);

    // Must have 2 phases with rage phase trigger at <= 50%
    assert.equal(boss.phases.length, 2);
    assert.equal(boss.phases[0].phase, 1);
    assert.equal(boss.phases[1].phase, 2);
    assert.ok(boss.phases[1].triggerHpPercent <= 0.5, "Phase 2 must trigger at <= 50% HP");
    assert.ok(boss.phases[1].speedMultiplier > 1.0, "Phase 2 must have speed boost");
  }
});
