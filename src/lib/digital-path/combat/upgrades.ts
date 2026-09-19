import { RunRNG } from "../map/rng";

export type UpgradeRarity = "common" | "rare" | "epic";

export type UpgradeDefinition = Readonly<{
  id: string;
  name: string;
  category: "attack" | "defense" | "utility" | "speed";
  rarity: UpgradeRarity;
  description: string;
  icon: string;
  attackMultiplier?: number;
  cooldownReduction?: number; // 0.20 = -20%
  maxHpBonus?: number;
  healImmediate?: number;
  speedMultiplier?: number;
  critChanceBonus?: number;
  thornPercent?: number;
  roomEnterHeal?: number;
  coinMultiplier?: number;
}>;

export const UPGRADES_CATALOG: readonly UpgradeDefinition[] = [
  {
    id: "flame_core",
    name: "Núcleo de Chamas",
    category: "attack",
    rarity: "common",
    description: "+20% de dano em todos os ataques e projéteis",
    icon: "🔥",
    attackMultiplier: 0.20,
  },
  {
    id: "rapid_data",
    name: "Dados Acelerados",
    category: "utility",
    rarity: "common",
    description: "-20% de tempo de recarga nas habilidades",
    icon: "⚡",
    cooldownReduction: 0.20,
  },
  {
    id: "recovery_chip",
    name: "Chip de Reparo Automático",
    category: "defense",
    rarity: "rare",
    description: "Recupera +15 HP automaticamente ao entrar em cada nova sala",
    icon: "💚",
    roomEnterHeal: 15,
  },
  {
    id: "iron_skin",
    name: "Blindagem de Dados",
    category: "defense",
    rarity: "common",
    description: "+35 de Vida Máxima e recupera 35 HP imediatamente",
    icon: "🛡️",
    maxHpBonus: 35,
    healImmediate: 35,
  },
  {
    id: "agile_steps",
    name: "Passos Cibernéticos",
    category: "speed",
    rarity: "common",
    description: "+20% de velocidade de movimentação pelo mapa",
    icon: "👟",
    speedMultiplier: 0.20,
  },
  {
    id: "crit_module",
    name: "Módulo de Precisão Crítica",
    category: "attack",
    rarity: "rare",
    description: "+15% de chance de causar Golpe Crítico com 2x de Dano",
    icon: "🎯",
    critChanceBonus: 0.15,
  },
  {
    id: "thorn_armor",
    name: "Barreira Espinhosa",
    category: "defense",
    rarity: "epic",
    description: "Reflete 30% do dano sofrido de volta aos inimigos atacantes",
    icon: "⚔️",
    thornPercent: 0.30,
  },
  {
    id: "greed_sensor",
    name: "Scanner de Bits",
    category: "utility",
    rarity: "common",
    description: "+50% de moedas de ouro coletadas dos inimigos e salas",
    icon: "💰",
    coinMultiplier: 0.50,
  },
];

/**
 * Returns 3 random upgrades without duplicates, influenced by seed RNG.
 */
export function getUpgradeChoices(rng: RunRNG, excludeIds: readonly string[] = []): UpgradeDefinition[] {
  const available = UPGRADES_CATALOG.filter((u) => !excludeIds.includes(u.id));
  const pool = available.length >= 3 ? available : UPGRADES_CATALOG;
  const shuffled = rng.shuffle(pool);
  return shuffled.slice(0, 3);
}

export type PlayerStatsModifiers = {
  attackMultiplier: number;
  cooldownMultiplier: number;
  maxHpBonus: number;
  speedMultiplier: number;
  critChance: number;
  thornPercent: number;
  roomEnterHeal: number;
  coinMultiplier: number;
};

/**
 * Compiles a list of applied upgrades into active stat modifiers.
 */
export function calculateModifiers(upgrades: readonly UpgradeDefinition[]): PlayerStatsModifiers {
  let attackMult = 1.0;
  let cooldownReductionTotal = 0;
  let maxHpBonus = 0;
  let speedMult = 1.0;
  let critChance = 0.05; // Base 5%
  let thornPercent = 0;
  let roomEnterHeal = 0;
  let coinMultiplier = 1.0;

  for (const up of upgrades) {
    if (up.attackMultiplier) attackMult += up.attackMultiplier;
    if (up.cooldownReduction) cooldownReductionTotal = Math.min(0.60, cooldownReductionTotal + up.cooldownReduction);
    if (up.maxHpBonus) maxHpBonus += up.maxHpBonus;
    if (up.speedMultiplier) speedMult += up.speedMultiplier;
    if (up.critChanceBonus) critChance += up.critChanceBonus;
    if (up.thornPercent) thornPercent += up.thornPercent;
    if (up.roomEnterHeal) roomEnterHeal += up.roomEnterHeal;
    if (up.coinMultiplier) coinMultiplier += up.coinMultiplier;
  }

  return {
    attackMultiplier: attackMult,
    cooldownMultiplier: Math.max(0.40, 1.0 - cooldownReductionTotal),
    maxHpBonus,
    speedMultiplier: speedMult,
    critChance: Math.min(0.75, critChance),
    thornPercent,
    roomEnterHeal,
    coinMultiplier,
  };
}
