export type MapHazardType = "lava" | "lightning";

export type MapHazard = {
  id: string;
  type: MapHazardType;
  x: number;
  y: number;
  radius: number;
  isActive: boolean;
  cooldownMs: number;
  timerMs: number;
  damage: number;
  telegraphSprite?: Phaser.GameObjects.Graphics;
  hazardSprite?: Phaser.GameObjects.Sprite | Phaser.GameObjects.Graphics;
};

export function createLavaHazard(id: string, x: number, y: number, radius = 32): MapHazard {
  return {
    id,
    type: "lava",
    x,
    y,
    radius,
    isActive: true,
    cooldownMs: 800,
    timerMs: 0,
    damage: 4,
  };
}

export function createLightningHazard(id: string, x: number, y: number, radius = 40): MapHazard {
  return {
    id,
    type: "lightning",
    x,
    y,
    radius,
    isActive: false,
    cooldownMs: 2400,
    timerMs: 2400,
    damage: 12,
  };
}
