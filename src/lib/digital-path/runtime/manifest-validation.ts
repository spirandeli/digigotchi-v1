import type { DigitalPathAnimation, DigitalPathSpriteManifest } from "./types";

export const REQUIRED_ANIMATIONS = [
  "idle",
  "walk_down",
  "walk_up",
  "walk_left",
  "walk_right",
  "attack_basic_1",
  "attack_basic_2",
  "attack_special",
  "hit",
  "death",
] as const;

export type RequiredAnimationKey = (typeof REQUIRED_ANIMATIONS)[number];

export function resolveManifestAnimation(
  manifest: DigitalPathSpriteManifest,
  key: RequiredAnimationKey,
): DigitalPathAnimation | undefined {
  const direct = manifest.animations[key];
  if (direct?.frames?.length) return direct;

  // 2-way movement adaptation: vertical walking falls back to lateral walk
  if (manifest.movementStyle === "2-way" || (!manifest.animations.walk_up && !manifest.animations.walk_down)) {
    if (key === "walk_up" || key === "walk_down") {
      return manifest.animations.walk_right ?? manifest.animations.walk_left;
    }
  }

  // Attack special adaptation: if special has no dedicated body cycle, fallback to basic_2 or basic_1
  if (key === "attack_special" && !manifest.animations.attack_special) {
    return manifest.animations.attack_basic_2 ?? manifest.animations.attack_basic_1;
  }

  return undefined;
}

export function validateSpriteManifest(manifest: DigitalPathSpriteManifest) {
  if (!manifest.spriteReady || !manifest.id || !manifest.root) return false;
  return REQUIRED_ANIMATIONS.every((key) => {
    const animation = resolveManifestAnimation(manifest, key);
    return Boolean(
      animation?.frames?.length &&
      animation.frames.every((frame) => typeof frame === "string" && frame.length > 0 && !frame.includes("..")) &&
      animation.fps > 0,
    );
  });
}