/**
 * ChestManager — BLOCK 10
 *
 * Manages reward chests dropped by Elites, Minibosses, and Bosses.
 * Pure data and logic — safe for unit tests and zero Phaser dependency.
 */

export type ChestTier = "normal" | "rare" | "evolution";

export interface ChestReward {
  coins: number;
  healAmount: number;
  triggerUpgradeDraft: boolean;
  triggerEvolution: boolean;
}

export interface InGameChest {
  id: string;
  x: number;
  y: number;
  tier: ChestTier;
  opened: boolean;
}

export class ChestManager {
  private chests: InGameChest[] = [];
  private nextId = 1;

  reset(): void {
    this.chests = [];
  }

  spawnChest(x: number, y: number, tier: ChestTier = "normal"): InGameChest {
    const chest: InGameChest = {
      id: `chest_${this.nextId++}`,
      x,
      y,
      tier,
      opened: false,
    };
    this.chests.push(chest);
    return chest;
  }

  getUnopenedChests(): readonly InGameChest[] {
    return this.chests.filter((c) => !c.opened);
  }

  /**
   * Check collision with player and open chest if within interact radius (32px).
   * Returns reward if a chest was just opened, null otherwise.
   */
  checkOpen(playerX: number, playerY: number, interactRadius = 36): { chest: InGameChest; reward: ChestReward } | null {
    for (const chest of this.chests) {
      if (chest.opened) continue;
      const dx = playerX - chest.x;
      const dy = playerY - chest.y;
      if (Math.hypot(dx, dy) <= interactRadius) {
        chest.opened = true;
        const reward = this.rollReward(chest.tier);
        return { chest, reward };
      }
    }
    return null;
  }

  private rollReward(tier: ChestTier): ChestReward {
    switch (tier) {
      case "evolution":
        return {
          coins: 150,
          healAmount: 40,
          triggerUpgradeDraft: true,
          triggerEvolution: true,
        };
      case "rare":
        return {
          coins: 80,
          healAmount: 25,
          triggerUpgradeDraft: true,
          triggerEvolution: false,
        };
      default:
        return {
          coins: 40,
          healAmount: 15,
          triggerUpgradeDraft: true,
          triggerEvolution: false,
        };
    }
  }
}
