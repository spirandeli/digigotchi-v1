import test from "node:test";
import assert from "node:assert/strict";
import {
  MAP_THEMES,
  getAvailableThemes,
  pickRandomTheme,
  getMapTheme,
  normalizeThemeId,
  setThemeEnabled,
} from "./map-themes";
import { RunRNG } from "./rng";

test("MAP_THEMES configuration defaults", () => {
  assert.equal(MAP_THEMES.lighting.enabled, true, "lighting must be enabled by default");
  assert.equal(MAP_THEMES.fire.enabled, false, "fire must be disabled until sprites sliced");
  assert.equal(MAP_THEMES.ice.enabled, false, "ice must be disabled until sprites sliced");
  assert.equal(MAP_THEMES.tech.enabled, false, "tech must be disabled until sprites sliced");
});

test("normalizeThemeId handles aliases and invalid inputs", () => {
  assert.equal(normalizeThemeId("lighting"), "lighting");
  assert.equal(normalizeThemeId("lightning"), "lighting");
  assert.equal(normalizeThemeId("LIGHTNING"), "lighting");
  assert.equal(normalizeThemeId("fire"), "fire");
  assert.equal(normalizeThemeId("ice"), "ice");
  assert.equal(normalizeThemeId("tech"), "tech");
  assert.equal(normalizeThemeId("unknown_xyz"), "lighting");
  assert.equal(normalizeThemeId(undefined), "lighting");
});

test("Case A: Only lighting enabled returns 100% lighting", () => {
  setThemeEnabled("lighting", true);
  setThemeEnabled("fire", false);
  setThemeEnabled("ice", false);
  setThemeEnabled("tech", false);

  const available = getAvailableThemes();
  assert.equal(available.length, 1);
  assert.equal(available[0].id, "lighting");

  const rng = new RunRNG(42);
  for (let i = 0; i < 20; i++) {
    const picked = pickRandomTheme(rng);
    assert.equal(picked.id, "lighting");
  }
});

test("Case B: lighting and fire enabled picks only between those two", () => {
  try {
    setThemeEnabled("lighting", true);
    setThemeEnabled("fire", true);
    setThemeEnabled("ice", false);
    setThemeEnabled("tech", false);

    const available = getAvailableThemes();
    assert.equal(available.length, 2);

    const pickedIds = new Set<string>();
    const rng = new RunRNG(12345);
    for (let i = 0; i < 50; i++) {
      const picked = pickRandomTheme(rng);
      assert.ok(picked.id === "lighting" || picked.id === "fire");
      pickedIds.add(picked.id);
    }
    assert.equal(pickedIds.size, 2, "Must have picked both enabled themes");
  } finally {
    // Restore default
    setThemeEnabled("fire", false);
  }
});

test("Case C: All themes enabled randomly samples across all 4", () => {
  try {
    setThemeEnabled("lighting", true);
    setThemeEnabled("fire", true);
    setThemeEnabled("ice", true);
    setThemeEnabled("tech", true);

    const available = getAvailableThemes();
    assert.equal(available.length, 4);

    const pickedIds = new Set<string>();
    const rng = new RunRNG(999);
    for (let i = 0; i < 100; i++) {
      const picked = pickRandomTheme(rng);
      pickedIds.add(picked.id);
    }
    assert.equal(pickedIds.size, 4, "Must have picked all 4 enabled themes");
  } finally {
    // Restore defaults
    setThemeEnabled("fire", false);
    setThemeEnabled("ice", false);
    setThemeEnabled("tech", false);
  }
});

test("Case D: All disabled falls back safely to lighting with warning", () => {
  try {
    setThemeEnabled("lighting", false);
    setThemeEnabled("fire", false);
    setThemeEnabled("ice", false);
    setThemeEnabled("tech", false);

    const picked = pickRandomTheme();
    assert.equal(picked.id, "lighting", "Must safely fallback to lighting");
  } finally {
    // Restore default
    setThemeEnabled("lighting", true);
  }
});
