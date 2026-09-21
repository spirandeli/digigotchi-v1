import type { DigitalPathRunInput } from "@/lib/pet/digital-path-bridge";
import type { UpgradeDefinition } from "../combat/upgrades";

export type DigitalPathAnimation = {
  frames: string[];
  fps: number;
  loop: boolean;
};

export type DigitalPathSpriteManifest = {
  id: string;
  root: string;
  spriteReady: boolean;
  frame: { width: number; height: number; originX: number; originY: number };
  movementStyle?: "2-way" | "4-way";
  animations: Partial<Record<"idle" | "walk_down" | "walk_up" | "walk_left" | "walk_right" | "attack_basic_1" | "attack_basic_2" | "attack_special" | "hit" | "death", DigitalPathAnimation>>;
};

export type EventChoice = {
  id: string;
  title: string;
  description: string;
  type: "heal" | "coins" | "gamble";
};

export type ShopItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: string;
  type: "heal" | "tamagotchi_item" | "upgrade";
  tamagotchiItemId?: string;
  upgradeId?: string;
};

export type DigitalPathStartOptions = {
  parent: string | HTMLElement;
  input: DigitalPathRunInput;
  manifest: DigitalPathSpriteManifest;
  originalSpeciesId?: string;
  settings?: {
    screenShake?: boolean;
    damageNumbers?: boolean;
    sfxVolume?: number;
  };
  seed: number;
  floorNumber?: number;
  themeId?: string;
  onRoomChange?: (roomIndex: number, totalRooms: number, roomTitle: string, biome: string, floor: number, isBoss: boolean) => void;
  onPlayerStatsChange?: (stats: { currentHp: number; maxHp: number; xp: number; coins: number; isBossFighting?: boolean; bossHp?: number; bossMaxHp?: number; bossName?: string; bossPhase?: number }) => void;
  onCooldownChange?: (slot: "basic_1" | "basic_2" | "special", remainingMs: number, maxMs: number) => void;
  onActiveUpgradesChange?: (upgrades: readonly UpgradeDefinition[]) => void;
  onTriggerUpgradeDraft?: (choices: UpgradeDefinition[], onSelect: (selected: UpgradeDefinition) => void) => void;
  onTriggerEventModal?: (choices: EventChoice[], onSelect: (choiceIndex: number) => void) => void;
  onTriggerRestModal?: (onRestHp: () => void, onBuffAtk: () => void) => void;
  onTriggerShopModal?: (items: ShopItem[], onBuy: (item: ShopItem) => boolean, onClose: () => void) => void;
  onPauseToggle?: (isPaused: boolean) => void;
  onAwardXp?: (speciesId: string, amount: number) => void;
  onSaveCheckpoint?: (nextFloor: number, bossDefeated?: number) => void;
  onFinish: (result: {
    runId: string;
    outcome: "victory" | "defeat" | "abandoned";
    xp: number;
    coins: number;
    itemsWon?: Record<string, number>;
    alreadyAwardedXp?: boolean;
  }) => void;
};