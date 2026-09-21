/**
 * SkillEvolutionRegistry — BLOCK 8
 *
 * Defines skill evolution pairs: when an active skill reaches its max tier (e.g. Lv 5)
 * and the player has the corresponding passive, the skill can evolve into an evolved
 * legendary variant with enhanced visual effects, damage, and behaviors.
 *
 * Pure data and logic — safe for unit tests and zero Phaser dependency.
 */

import type { AttackSlotConfig } from "./loadout";

export interface SkillEvolutionPair {
  baseSkillNameOrId: string;
  requiredPassiveId: string;
  evolvedSkillName: string;
  evolvedSkillDescription: string;
  config: Partial<AttackSlotConfig>;
}

export const SKILL_EVOLUTIONS: readonly SkillEvolutionPair[] = [
  {
    baseSkillNameOrId: "Chama Bebê",
    requiredPassiveId: "core_flame_data",
    evolvedSkillName: "Mega Erupção de Magma",
    evolvedSkillDescription: "Disparo ígneo colossal que explode ao contato, liberando magma em área com queimadura intensa.",
    config: {
      damage: 75,
      area: 120,
      range: 300,
      cooldownMs: 500,
      projectileColor: 0xff3300,
      statusEffect: "burn",
      shakeIntensity: 0.012,
    },
  },
  {
    baseSkillNameOrId: "Vee-Laser",
    requiredPassiveId: "core_expansion_lens",
    evolvedSkillName: "Plasma Cannon Contínuo",
    evolvedSkillDescription: "Feixe de plasma ultra-concentrado de alta frequência que perfura todos os inimigos na linha.",
    config: {
      damage: 60,
      area: 60,
      range: 420,
      cooldownMs: 400,
      projectileColor: 0x00ffff,
      shakeIntensity: 0.008,
    },
  },
  {
    baseSkillNameOrId: "Golpe de Garra",
    requiredPassiveId: "core_power_data",
    evolvedSkillName: "Garras do Dragão Voraz",
    evolvedSkillDescription: "Golpes devastadores em arco frontal com dano massivo e chance de acerto crítico duplo.",
    config: {
      damage: 55,
      range: 75,
      cooldownMs: 280,
      shakeIntensity: 0.01,
    },
  },
  {
    baseSkillNameOrId: "Vee-Punch",
    requiredPassiveId: "core_velocity_bus",
    evolvedSkillName: "Combo Meteoro Sônico",
    evolvedSkillDescription: "Rajada ultrassônica de socos contínuos empurrando hordas com knockback elevado.",
    config: {
      damage: 40,
      range: 65,
      cooldownMs: 180,
    },
  },
];

/** Check if any equipped skill can evolve given the current passives and skill levels */
export function checkAvailableEvolutions(
  activeSkillNames: readonly string[],
  passiveIds: readonly string[],
  alreadyEvolvedNames: readonly string[] = [],
): SkillEvolutionPair[] {
  const available: SkillEvolutionPair[] = [];

  for (const evo of SKILL_EVOLUTIONS) {
    if (alreadyEvolvedNames.includes(evo.evolvedSkillName)) continue;

    const hasBaseSkill = activeSkillNames.some(
      (name) => name.toLowerCase() === evo.baseSkillNameOrId.toLowerCase()
    );
    const hasPassive = passiveIds.includes(evo.requiredPassiveId);

    if (hasBaseSkill && hasPassive) {
      available.push(evo);
    }
  }

  return available;
}
