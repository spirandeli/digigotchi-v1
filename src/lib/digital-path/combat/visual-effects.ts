/**
 * Digimon Visual Effects (VFX) & Projectile System
 * 
 * Centralized, data-driven mapping of authentic sprite visual effects,
 * directional offsets, projectile animations and impact bursts.
 */

export interface Basic1VfxConfig {
  hasVisualEffect: boolean;
  effectAnimKey?: string;
  effectTextureKey?: string;
  scale?: number;
  offsetForward?: number;
  rotationMode?: "match_facing" | "fixed";
  durationMs?: number;
}

export interface Basic2VfxConfig {
  hasProjectile: boolean;
  projectileAnimKey?: string;
  projectileTextureKey?: string;
  scale?: number;
  speed?: number;
  impactAnimKey?: string;
  impactTextureKey?: string;
  impactScale?: number;
  impactDurationMs?: number;
}

export interface SpecialVfxConfig {
  hasVisualEffect: boolean;
  effectAnimKey?: string;
  effectTextureKey?: string;
  secondaryAnimKey?: string;
  secondaryTextureKey?: string;
  scale?: number;
  secondaryScale?: number;
  offsetForward?: number;
  durationMs?: number;
  isGroundBurst?: boolean;
}

export interface HitImpactVfxConfig {
  animKey?: string;
  textureKey?: string;
  scale?: number;
  durationMs?: number;
}

export interface HealVfxConfig {
  animKey?: string;
  textureKey?: string;
  scale?: number;
  durationMs?: number;
}

export interface DigimonVfxProfile {
  speciesId: string;
  basic1: Basic1VfxConfig;
  basic2: Basic2VfxConfig;
  special: SpecialVfxConfig;
  hitImpact: HitImpactVfxConfig;
  heal: HealVfxConfig;
}

export const DIGIMON_VFX_PROFILES: Record<string, DigimonVfxProfile> = {
  agumon: {
    speciesId: "agumon",
    basic1: {
      hasVisualEffect: false,
      offsetForward: 32,
      durationMs: 140,
    },
    basic2: {
      hasProjectile: true,
      projectileAnimKey: "agumon_projectile_dragon",
      projectileTextureKey: "agumon_projectile_dragon_0",
      scale: 0.85,
      speed: 320,
      impactAnimKey: "agumon_effect_mega_blast",
      impactTextureKey: "agumon_effect_mega_blast_0",
      impactScale: 0.65,
      impactDurationMs: 240,
    },
    special: {
      hasVisualEffect: true,
      effectAnimKey: "agumon_effect_mega_blast",
      effectTextureKey: "agumon_effect_mega_blast_0",
      scale: 1.35,
      offsetForward: 48,
      durationMs: 380,
    },
    hitImpact: {
      animKey: "agumon_effect_mega_blast",
      textureKey: "agumon_effect_mega_blast_0",
      scale: 0.45,
      durationMs: 150,
    },
    heal: {
      animKey: "agumon_heal",
      textureKey: "agumon_heal_0",
      scale: 0.8,
      durationMs: 400,
    },
  },
  veemon: {
    speciesId: "veemon",
    basic1: {
      hasVisualEffect: true,
      effectAnimKey: "veemon_effects_attack_1",
      effectTextureKey: "veemon_effects_attack_1_0",
      scale: 0.95,
      offsetForward: 36,
      rotationMode: "match_facing",
      durationMs: 180,
    },
    basic2: {
      hasProjectile: true,
      projectileAnimKey: "veemon_projectile_laser",
      projectileTextureKey: "veemon_projectile_laser_0",
      scale: 0.9,
      speed: 390,
      impactAnimKey: "veemon_effects_hit",
      impactTextureKey: "veemon_effects_hit_0",
      impactScale: 1.15,
      impactDurationMs: 160,
    },
    special: {
      hasVisualEffect: true,
      effectAnimKey: "veemon_effects_special",
      effectTextureKey: "veemon_effects_special_0",
      secondaryAnimKey: "veemon_effects_attack_2",
      secondaryTextureKey: "veemon_effects_attack_2_0",
      scale: 1.25,
      secondaryScale: 1.05,
      offsetForward: 44,
      durationMs: 350,
      isGroundBurst: true,
    },
    hitImpact: {
      animKey: "veemon_effects_hit",
      textureKey: "veemon_effects_hit_0",
      scale: 1.0,
      durationMs: 140,
    },
    heal: {
      animKey: "veemon_heal",
      textureKey: "veemon_heal_0",
      scale: 0.85,
      durationMs: 400,
    },
  },
  gabumon: {
    speciesId: "gabumon",
    basic1: {
      hasVisualEffect: false,
      offsetForward: 30,
      durationMs: 140,
    },
    basic2: {
      hasProjectile: true,
      projectileTextureKey: "veemon_projectile_laser_0",
      scale: 0.8,
      speed: 280,
      impactTextureKey: "veemon_effects_hit_0",
      impactScale: 0.9,
      impactDurationMs: 150,
    },
    special: {
      hasVisualEffect: true,
      effectAnimKey: "veemon_effects_special",
      effectTextureKey: "veemon_effects_special_0",
      scale: 1.1,
      offsetForward: 40,
      durationMs: 320,
    },
    hitImpact: {
      textureKey: "veemon_effects_hit_0",
      scale: 0.9,
      durationMs: 130,
    },
    heal: {
      textureKey: "veemon_effects_hit_0",
      scale: 0.8,
      durationMs: 350,
    },
  },
};

/**
 * Returns the VFX profile for the specified species with safe fallback to Agumon.
 */
export function getSpeciesVfxProfile(speciesId: string): DigimonVfxProfile {
  const normalized = speciesId.toLowerCase().trim();
  return DIGIMON_VFX_PROFILES[normalized] || DIGIMON_VFX_PROFILES.agumon;
}

/**
 * Computes spawn position for directional effects with forward distance and vertical centering.
 */
export function getDirectionalVfxPosition(
  origin: { x: number; y: number },
  direction: "up" | "down" | "left" | "right",
  forwardDist: number
): { x: number; y: number } {
  switch (direction) {
    case "up":
      return { x: origin.x, y: origin.y - forwardDist };
    case "down":
      return { x: origin.x, y: origin.y + forwardDist };
    case "left":
      return { x: origin.x - forwardDist, y: origin.y };
    case "right":
    default:
      return { x: origin.x + forwardDist, y: origin.y };
  }
}

/**
 * Computes rotation (in radians) and flip flags for directional visual effects.
 */
export function getVfxTransform(direction: "up" | "down" | "left" | "right"): {
  rotation: number;
  flipX: boolean;
  flipY: boolean;
} {
  switch (direction) {
    case "up":
      return { rotation: -Math.PI / 2, flipX: false, flipY: false };
    case "down":
      return { rotation: Math.PI / 2, flipX: false, flipY: false };
    case "left":
      return { rotation: Math.PI, flipX: false, flipY: true };
    case "right":
    default:
      return { rotation: 0, flipX: false, flipY: false };
  }
}
