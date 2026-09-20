import { describe, it } from "node:test";
import assert from "node:assert";
import {
  normalizeDigimonName,
  getDigimonSpriteBasePath,
  resolveEnemyAnimation,
  getEnemyAnimationKey,
} from "./enemy-sprites";

describe("enemy-sprites utilities", () => {
  it("normalizes case, accents, hyphens, and spaces to canonical species names", () => {
    assert.strictEqual(normalizeDigimonName("Agumon"), "agumon");
    assert.strictEqual(normalizeDigimonName("AGUMON"), "agumon");
    assert.strictEqual(normalizeDigimonName("agumon"), "agumon");
    assert.strictEqual(normalizeDigimonName("VEE-MON"), "veemon");
    assert.strictEqual(normalizeDigimonName("Vee-mon"), "veemon");
    assert.strictEqual(normalizeDigimonName("Gazimon Selvagem"), "gabumon");
    assert.strictEqual(normalizeDigimonName("Sentinela Blindada"), "etemon");
    assert.strictEqual(normalizeDigimonName("Garurumon"), "garurumon");
    assert.strictEqual(normalizeDigimonName(null), "gabumon");
  });

  it("returns canonical browser sprite path", () => {
    assert.strictEqual(getDigimonSpriteBasePath("Agumon"), "/sprites/agumon/");
    assert.strictEqual(getDigimonSpriteBasePath("veemon"), "/sprites/veemon/");
  });

  it("resolves direct animations when available", () => {
    const agumonIdle = resolveEnemyAnimation("agumon", "idle");
    assert.strictEqual(agumonIdle.actualAction, "idle");
    assert.strictEqual(agumonIdle.fallbackUsed, false);
    assert.strictEqual(agumonIdle.frameCount, 9);

    const veemonHit = resolveEnemyAnimation("veemon", "hit");
    assert.strictEqual(veemonHit.actualAction, "hit");
    assert.strictEqual(veemonHit.fallbackUsed, false);
    assert.strictEqual(veemonHit.frameCount, 3);
  });

  it("safely falls back for missing animations", () => {
    // Gabumon lacks direct walk -> falls back to idle
    const gabumonWalk = resolveEnemyAnimation("gabumon", "walk");
    assert.strictEqual(gabumonWalk.actualAction, "idle");
    assert.strictEqual(gabumonWalk.fallbackUsed, true);

    // Etemon lacks attack_02 -> falls back to attack_01
    const etemonAttack2 = resolveEnemyAnimation("etemon", "attack_02");
    assert.strictEqual(etemonAttack2.actualAction, "attack_01");
    assert.strictEqual(etemonAttack2.fallbackUsed, true);
    assert.strictEqual(etemonAttack2.frameCount, 12);

    // Gabumon lacks hit -> falls back to idle
    const gabumonHit = resolveEnemyAnimation("gabumon", "hit");
    assert.strictEqual(gabumonHit.actualAction, "idle");
    assert.strictEqual(gabumonHit.fallbackUsed, true);
  });

  it("generates unique namespaced animation keys for Phaser", () => {
    assert.strictEqual(getEnemyAnimationKey("Agumon", "idle"), "enemy_agumon_idle");
    assert.strictEqual(getEnemyAnimationKey("veemon", "attack_01"), "enemy_veemon_attack_01");
  });
});
