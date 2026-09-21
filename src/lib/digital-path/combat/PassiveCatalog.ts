/**
 * PassiveCatalog — BLOCK 7
 *
 * Defines the 8 core passive items for the Survivors-like build system.
 * Passives occupy up to 4 passive slots and scale global stats or enable evolutions.
 *
 * Pure data and logic — safe for unit tests and zero Phaser dependency.
 */

import type { UpgradeDefinition } from "./upgrades";

export interface PassiveDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxLevel: number;
  affectedStats: {
    mightPercentPerLevel?: number;       // +0.10 = +10% Dano
    cooldownReductionPerLevel?: number;  // 0.08 = -8% Recarga
    areaPercentPerLevel?: number;        // +0.15 = +15% Área
    projectileSpeedPerLevel?: number;    // +0.12 = +12% Vel Projétil
    magnetRadiusPerLevel?: number;       // +30px Raio Magneto
    growthPercentPerLevel?: number;      // +0.15 = +15% XP
    maxHpPerLevel?: number;              // +25 HP
    armorPerLevel?: number;              // +2 Redução Dano
    speedPercentPerLevel?: number;       // +0.08 = +8% Velocidade
    critChancePerLevel?: number;         // +0.05 = +5% Crítico
  };
  enablesEvolutionOfSkillId?: string;
}

export const PASSIVE_CATALOG: readonly PassiveDefinition[] = [
  {
    id: "core_power_data",
    name: "Núcleo de Força Digital",
    description: "+10% de dano global em todos os ataques por nível.",
    icon: "💪",
    maxLevel: 5,
    affectedStats: {
      mightPercentPerLevel: 0.10,
    },
  },
  {
    id: "core_rapid_clock",
    name: "Chip de Sobrecarga",
    description: "-8% de tempo de recarga em todas as habilidades por nível.",
    icon: "⏱️",
    maxLevel: 5,
    affectedStats: {
      cooldownReductionPerLevel: 0.08,
    },
  },
  {
    id: "core_expansion_lens",
    name: "Módulo de Expansão",
    description: "+15% de área de efeito e tamanho de projéteis por nível.",
    icon: "🔍",
    maxLevel: 5,
    affectedStats: {
      areaPercentPerLevel: 0.15,
    },
    enablesEvolutionOfSkillId: "veemon_vee_laser",
  },
  {
    id: "core_magnet_sensor",
    name: "Sensor Magnético",
    description: "+35px de raio de atração de orbes de dados/XP por nível.",
    icon: "🧲",
    maxLevel: 5,
    affectedStats: {
      magnetRadiusPerLevel: 35,
    },
  },
  {
    id: "core_growth_algorithm",
    name: "Algoritmo de Crescimento",
    description: "+15% de XP ganho ao coletar orbes de dados por nível.",
    icon: "📈",
    maxLevel: 5,
    affectedStats: {
      growthPercentPerLevel: 0.15,
    },
  },
  {
    id: "core_data_armor",
    name: "Armadura de Dados",
    description: "+2 de redução de dano sofrido e +25 HP Máximo por nível.",
    icon: "🛡️",
    maxLevel: 5,
    affectedStats: {
      armorPerLevel: 2,
      maxHpPerLevel: 25,
    },
  },
  {
    id: "core_velocity_bus",
    name: "Barramento de Velocidade",
    description: "+12% de velocidade de projéteis e +8% de movimentação por nível.",
    icon: "🚀",
    maxLevel: 5,
    affectedStats: {
      projectileSpeedPerLevel: 0.12,
      speedPercentPerLevel: 0.08,
    },
  },
  {
    id: "core_flame_data",
    name: "Núcleo Ígneo",
    description: "+15% de dano de fogo e canalizador de evolução de habilidades.",
    icon: "🔥",
    maxLevel: 5,
    affectedStats: {
      mightPercentPerLevel: 0.15,
      critChancePerLevel: 0.05,
    },
    enablesEvolutionOfSkillId: "agumon_baby_flame",
  },
];

/** Convert a PassiveDefinition to an UpgradeDefinition for the existing Draft UI */
export function passiveToUpgradeDefinition(passive: PassiveDefinition, currentLevel = 0): UpgradeDefinition {
  const nextLevel = currentLevel + 1;
  const isMax = nextLevel >= passive.maxLevel;
  const lvlSuffix = ` [Lv ${nextLevel}${isMax ? " MAX" : ""}]`;

  return {
    id: passive.id,
    name: `${passive.name}${lvlSuffix}`,
    category: "utility",
    rarity: nextLevel >= 4 ? "epic" : nextLevel >= 2 ? "rare" : "common",
    description: passive.description,
    icon: passive.icon,
    isPassive: true,
    passiveLevel: nextLevel,
    attackMultiplier: passive.affectedStats.mightPercentPerLevel,
    cooldownReduction: passive.affectedStats.cooldownReductionPerLevel,
    areaMultiplier: passive.affectedStats.areaPercentPerLevel,
    projectileSpeedMultiplier: passive.affectedStats.projectileSpeedPerLevel,
    magnetRadiusBonus: passive.affectedStats.magnetRadiusPerLevel,
    growthMultiplier: passive.affectedStats.growthPercentPerLevel,
    maxHpBonus: passive.affectedStats.maxHpPerLevel,
    armorBonus: passive.affectedStats.armorPerLevel,
    speedMultiplier: passive.affectedStats.speedPercentPerLevel,
    critChanceBonus: passive.affectedStats.critChancePerLevel,
  };
}
