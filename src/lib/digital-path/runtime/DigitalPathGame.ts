import type { RoomData, RunDefinition } from "../map/procedural-map";
import { createFiniteRun, isWalkable } from "../map/procedural-map";
import { resolveManifestAnimation, validateSpriteManifest } from "./manifest-validation";
import type { DigitalPathStartOptions } from "./types";
import { RunRNG } from "../map/rng";
import {
  type UpgradeDefinition,
  type PlayerStatsModifiers,
  calculateModifiers,
  getUpgradeChoices,
} from "../combat/upgrades";

type PhaserModule = typeof import("phaser");

const TILE_SIZE = 48;
const PLAYER_SCALE = 0.65;

type ActiveEnemy = {
  id: string;
  name: string;
  kind: "melee" | "ranged" | "elite" | "boss" | "bug" | "beast";
  sprite: Phaser.GameObjects.Sprite;
  hpBar: Phaser.GameObjects.Graphics;
  currentHp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  xpReward: number;
  coinReward: number;
  state: "idle" | "chase" | "dead" | "telegraph";
  attackCooldown: number;
  isAttacking?: boolean;
  isEnraged?: boolean;
};

type ActiveProjectile = {
  sprite: Phaser.GameObjects.Sprite;
  vx: number;
  vy: number;
  damage: number;
  distanceTraveled: number;
  maxDistance: number;
};

type ActiveEnemyProjectile = {
  sprite: Phaser.GameObjects.Graphics;
  vx: number;
  vy: number;
  damage: number;
  distanceTraveled: number;
  maxDistance: number;
};

export class DigitalPathGame {
  private game: import("phaser").Game | null = null;
  private run: RunDefinition | null = null;
  private currentRoomIndex = 0;
  private generatedRoomIds = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public activeScene: any = null;

  async start(options: DigitalPathStartOptions): Promise<boolean> {
    if (this.game) {
      this.stop();
    }

    if (options.input.speciesId !== options.manifest.id) {
      throw new Error("Sprite manifest does not match the current Digimon");
    }
    if (!validateSpriteManifest(options.manifest)) {
      throw new Error("Digital Path sprite manifest is not runtime-ready");
    }

    const Phaser = await import("phaser");
    this.run = createFiniteRun(options.seed, options.floorNumber || 1);
    this.currentRoomIndex = 0;
    this.generatedRoomIds.clear();

    const self = this;
    const runDefinition = this.run;
    const manifest = options.manifest;
    const runRng = new RunRNG(options.seed);

    class DigitalPathScene extends Phaser.Scene {
      private player!: Phaser.GameObjects.Sprite;
      private playerHp = 100;
      private playerMaxHp = 100;
      private playerXp = 0;
      private playerCoins = 0;
      private invulnerableUntil = 0;

      // In-Run Upgrades & Modifiers
      private activeUpgrades: UpgradeDefinition[] = [];
      private modifiers: PlayerStatsModifiers = calculateModifiers([]);
      private itemsWon: Record<string, number> = {};
      private isPaused = false;

      // Inputs
      private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
      private keys!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
        J: Phaser.Input.Keyboard.Key;
        K: Phaser.Input.Keyboard.Key;
        L: Phaser.Input.Keyboard.Key;
        Space: Phaser.Input.Keyboard.Key;
        E: Phaser.Input.Keyboard.Key;
        Esc: Phaser.Input.Keyboard.Key;
      };

      // Room State
      private activeRoom!: RoomData;
      private roomTileObjects: Phaser.GameObjects.GameObject[] = [];
      private exitDoorSprite: Phaser.GameObjects.Sprite | null = null;
      private doorLabel: Phaser.GameObjects.Text | null = null;
      private isDoorUnlocked = false;
      private isTransitioning = false;
      private isFinished = false;

      // Combat Entities
      private enemies: ActiveEnemy[] = [];
      private projectiles: ActiveProjectile[] = [];
      private enemyProjectiles: ActiveEnemyProjectile[] = [];

      // Interactive Props
      private chestSprite: Phaser.GameObjects.Sprite | null = null;
      private chestPrompt: Phaser.GameObjects.Text | null = null;
      private isChestOpened = false;

      private interactivePropSprite: Phaser.GameObjects.Sprite | null = null;
      private interactivePropPrompt: Phaser.GameObjects.Text | null = null;
      private isInteractivePropUsed = false;

      // Player Attack Cooldowns
      private isPlayerAttacking = false;
      private facing: "left" | "right" = "right";
      private basic1CooldownUntil = 0;
      private basic2CooldownUntil = 0;
      private specialCooldownUntil = 0;

      // Boss telegraph
      private bossTelegraphCircle: Phaser.GameObjects.Graphics | null = null;

      constructor() {
        super({ key: "digital-path-scene" });
      }

      preload() {
        // 1. Preload Map Tilesets
        this.load.image("tile_stone", "/maps/tilesets/stone.png");
        this.load.image("tile_dark_stone", "/maps/tilesets/dark_stone.png");
        this.load.image("tile_circuit", "/maps/tilesets/circuit.png");
        this.load.image("tile_storm_stone", "/maps/tilesets/storm_stone.png");
        this.load.image("tile_cracked", "/maps/tilesets/cracked.png");
        this.load.image("tile_lightning", "/maps/tilesets/lightning.png");
        this.load.image("tile_charged", "/maps/tilesets/charged.png");
        this.load.image("door_closed", "/maps/tilesets/door_closed.png");
        this.load.image("door_open", "/maps/tilesets/door_open.png");
        this.load.image("chest_closed", "/maps/tilesets/chest_closed.png");
        this.load.image("chest_open", "/maps/tilesets/chest_open.png");

        // 2. Preload Manifest frames for Agumon
        const loadedKeys = new Set<string>();
        for (const [animKey, anim] of Object.entries(manifest.animations)) {
          if (!anim?.frames) continue;
          anim.frames.forEach((framePath, index) => {
            const textureKey = `${manifest.id}_${animKey}_${index}`;
            if (!loadedKeys.has(textureKey)) {
              loadedKeys.add(textureKey);
              const url = framePath.startsWith("/") ? framePath : `/${framePath}`;
              this.load.image(textureKey, url);
            }
          });
        }

        // 3. Preload Enemy Sprite Frames (Wild Digimon)
        for (let i = 0; i < 10; i++) {
          const pad = String(i).padStart(2, "0");
          this.load.image(`enemy_gabumon_idle_${i}`, `/sprites/animated/gabumon/idle/${pad}.png`);
          this.load.image(`enemy_veemon_idle_${i}`, `/sprites/animated/veemon/idle/${pad}.png`);
          this.load.image(`enemy_etemon_idle_${i}`, `/sprites/animated/etemon/idle/${pad}.png`);
        }
      }

      create() {
        this.isFinished = false;
        this.isTransitioning = false;
        this.playerHp = options.input.stats.health || 100;
        this.playerMaxHp = options.input.stats.health || 100;
        this.playerXp = 0;
        this.playerCoins = 0;

        this.cameras.main.setBackgroundColor("#080c14");

        // Register Animations
        this.registerAnimations();

        // Keyboard Inputs
        if (this.input.keyboard) {
          this.cursors = this.input.keyboard.createCursorKeys();
          this.keys = {
            W: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            A: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            S: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            D: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            J: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J),
            K: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K),
            L: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L),
            Space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            E: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
            Esc: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
          };
          this.keys.Esc.on("down", () => this.togglePause());
        }

        // Create Player Sprite
        const idleAnim = resolveManifestAnimation(manifest, "idle");
        const defaultTexture = idleAnim?.frames?.[0] ? `${manifest.id}_idle_0` : "";
        this.player = this.add.sprite(0, 0, defaultTexture);
        this.player.setScale(PLAYER_SCALE);
        this.player.setOrigin(0.5, 0.85);
        this.player.setDepth(10);

        if (this.anims.exists("player-idle")) {
          this.player.play("player-idle");
        }

        // Camera follow
        this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
        this.cameras.main.setZoom(1.15);

        self.activeScene = this;

        // Load First Room
        this.loadRoom(self.currentRoomIndex);
      }

      private registerAnimations() {
        const createAnim = (key: string, manifestKey: string, loop: boolean) => {
          const animDef = manifest.animations[manifestKey as keyof typeof manifest.animations];
          if (!animDef?.frames?.length) return;
          const frames = animDef.frames.map((_, i) => ({
            key: `${manifest.id}_${manifestKey}_${i}`,
          }));
          if (!this.anims.exists(key)) {
            this.anims.create({
              key,
              frames,
              frameRate: animDef.fps || 8,
              repeat: loop ? -1 : 0,
            });
          }
        };

        createAnim("player-idle", "idle", true);
        createAnim("player-walk-left", "walk_left", true);
        createAnim("player-walk-right", "walk_right", true);
        createAnim("player-attack-basic-1", "attack_basic_1", false);
        createAnim("player-attack-basic-2", "attack_basic_2", false);
        createAnim("player-hit", "hit", false);
        createAnim("player-death", "death", false);
        createAnim("player-victory", "victory", false);

        // Enemy Idle Animations
        if (!this.anims.exists("enemy-gabumon-idle")) {
          this.anims.create({
            key: "enemy-gabumon-idle",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `enemy_gabumon_idle_${i}` })),
            frameRate: 7,
            repeat: -1,
          });
        }
        if (!this.anims.exists("enemy-veemon-idle")) {
          this.anims.create({
            key: "enemy-veemon-idle",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `enemy_veemon_idle_${i}` })),
            frameRate: 7,
            repeat: -1,
          });
        }
        if (!this.anims.exists("enemy-etemon-idle")) {
          this.anims.create({
            key: "enemy-etemon-idle",
            frames: Array.from({ length: 10 }, (_, i) => ({ key: `enemy_etemon_idle_${i}` })),
            frameRate: 7,
            repeat: -1,
          });
        }
      }

      /**
       * Clean all entities of the active room to prevent memory leaks and ghost objects.
       */
      private cleanCurrentRoom() {
        // Destroy room tiles and floor sprites
        for (const obj of this.roomTileObjects) {
          obj.destroy();
        }
        this.roomTileObjects = [];

        // Destroy exit door
        if (this.exitDoorSprite) {
          this.exitDoorSprite.destroy();
          this.exitDoorSprite = null;
        }
        this.doorLabel = null;

        // Destroy chest
        if (this.chestSprite) {
          this.chestSprite.destroy();
          this.chestSprite = null;
        }
        this.chestPrompt = null;

        // Destroy interactive props
        if (this.interactivePropSprite) {
          this.interactivePropSprite.destroy();
          this.interactivePropSprite = null;
        }
        this.interactivePropPrompt = null;
        this.isInteractivePropUsed = false;

        // Destroy enemies and their HP bars
        for (const enemy of this.enemies) {
          enemy.hpBar.destroy();
          enemy.sprite.destroy();
        }
        this.enemies = [];

        // Destroy active player projectiles
        for (const proj of this.projectiles) {
          proj.sprite.destroy();
        }
        this.projectiles = [];

        // Destroy enemy projectiles
        for (const ep of this.enemyProjectiles) {
          ep.sprite.destroy();
        }
        this.enemyProjectiles = [];

        if (this.bossTelegraphCircle) {
          this.bossTelegraphCircle.destroy();
          this.bossTelegraphCircle = null;
        }
      }

      /**
       * Load a specific finite room arena.
       */
      private loadRoom(roomIndex: number) {
        if (!runDefinition) return;
        this.cleanCurrentRoom();

        const room = runDefinition.rooms[roomIndex];
        this.activeRoom = room;
        self.generatedRoomIds.add(room.id);

        if (this.modifiers.roomEnterHeal > 0) {
          this.playerHp = Math.min(this.playerMaxHp, this.playerHp + this.modifiers.roomEnterHeal);
        }

        const roomWidthPx = room.width * TILE_SIZE;
        const roomHeightPx = room.height * TILE_SIZE;

        // Set camera bounds for current room arena
        this.cameras.main.setBounds(0, 0, roomWidthPx, roomHeightPx);

        for (let y = 0; y < room.height; y += 1) {
          for (let x = 0; x < room.width; x += 1) {
            const posX = x * TILE_SIZE;
            const posY = y * TILE_SIZE;
            const isFloor = room.tiles[y][x] === "floor";

            if (isFloor) {
              const isAccent = (x * 3 + y * 5) % 7 === 0;
              let textureKey = "tile_stone";
              if (room.biome === "fire") {
                textureKey = isAccent ? "tile_circuit" : "tile_dark_stone";
              } else if (room.biome === "storm") {
                textureKey = isAccent ? "tile_lightning" : "tile_storm_stone";
              } else if (room.biome === "ice") {
                textureKey = isAccent ? "tile_charged" : "tile_storm_stone";
              } else {
                textureKey = isAccent ? "tile_circuit" : "tile_stone";
              }

              const tile = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, textureKey);
              tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
              tile.setDepth(0);
              if (!isAccent && (x + y) % 2 === 0) {
                tile.setTint(room.biome === "fire" ? 0xffccaa : 0xdddddd);
              }
              this.roomTileObjects.push(tile);
            } else {
              // Wall
              const wallKey = room.biome === "fire" ? "tile_cracked" : "tile_dark_stone";
              const wall = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, wallKey);
              wall.setDisplaySize(TILE_SIZE, TILE_SIZE);
              wall.setDepth(2);
              this.roomTileObjects.push(wall);

              // Top neon rim
              if (y + 1 < room.height && room.tiles[y + 1][x] === "floor") {
                const rim = this.add.graphics();
                rim.fillStyle(room.biome === "fire" ? 0xff4400 : 0x00f0ff, 0.4);
                rim.fillRect(posX, posY + TILE_SIZE - 4, TILE_SIZE, 4);
                rim.setDepth(3);
                this.roomTileObjects.push(rim);
              }
            }
          }
        }

        // 2. Place Player at Room Spawn
        this.player.x = room.spawn.x * TILE_SIZE + TILE_SIZE / 2;
        this.player.y = room.spawn.y * TILE_SIZE + TILE_SIZE / 2;

        // Spawn ring effect
        const spawnRing = this.add.graphics();
        spawnRing.lineStyle(2, 0x00ff88, 0.8);
        spawnRing.strokeCircle(this.player.x, this.player.y, 22);
        spawnRing.setDepth(1);
        this.roomTileObjects.push(spawnRing);

        // 3. Place Exit Door
        const exitX = room.exit.x * TILE_SIZE + TILE_SIZE / 2;
        const exitY = room.exit.y * TILE_SIZE + TILE_SIZE / 2;
        const hasEnemies = room.enemies.length > 0;
        this.isDoorUnlocked = !hasEnemies;

        this.exitDoorSprite = this.add.sprite(exitX, exitY, this.isDoorUnlocked ? "door_open" : "door_closed");
        this.exitDoorSprite.setDisplaySize(TILE_SIZE, TILE_SIZE * 1.2);
        this.exitDoorSprite.setDepth(4);

        // Door label
        this.doorLabel = this.add.text(exitX, exitY - 32, this.isDoorUnlocked ? "SAIDA (ABERTA)" : "PORTAO TRANCADO", {
          fontSize: "11px",
          color: this.isDoorUnlocked ? "#00ffaa" : "#ff4444",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 3,
        }).setOrigin(0.5);
        this.doorLabel.setDepth(5);
        this.roomTileObjects.push(this.doorLabel);

        // 4. Place Props
        this.isChestOpened = false;
        this.isInteractivePropUsed = false;
        const centerX = Math.floor(room.width / 2) * TILE_SIZE + TILE_SIZE / 2;
        const centerY = Math.floor(room.height / 2) * TILE_SIZE + TILE_SIZE / 2;

        if (room.kind === "treasure") {
          this.chestSprite = this.add.sprite(centerX, centerY, "chest_closed");
          this.chestSprite.setDisplaySize(TILE_SIZE, TILE_SIZE);
          this.chestSprite.setDepth(4);

          this.chestPrompt = this.add.text(centerX, centerY - 26, "[E] ABRIR BAÚ", {
            fontSize: "10px",
            color: "#ffdd44",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.chestPrompt.setDepth(5);
          this.roomTileObjects.push(this.chestPrompt);
        } else if (room.kind === "event") {
          this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
          this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
          this.interactivePropSprite.setDepth(4);
          this.interactivePropSprite.setTint(0x00f0ff);

          this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] TERMINAL DE DADOS", {
            fontSize: "10px",
            color: "#00f0ff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.interactivePropPrompt.setDepth(5);
          this.roomTileObjects.push(this.interactivePropPrompt);
        } else if (room.kind === "rest") {
          this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_charged");
          this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
          this.interactivePropSprite.setDepth(4);
          this.interactivePropSprite.setTint(0x00ff88);

          this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] NÓ DE REGENERAÇÃO", {
            fontSize: "10px",
            color: "#00ff88",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.interactivePropPrompt.setDepth(5);
          this.roomTileObjects.push(this.interactivePropPrompt);
        } else if (room.kind === "shop") {
          this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
          this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
          this.interactivePropSprite.setDepth(4);
          this.interactivePropSprite.setTint(0xffd700);

          this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] MERCADOR DIGITAL", {
            fontSize: "10px",
            color: "#ffd700",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.interactivePropPrompt.setDepth(5);
          this.roomTileObjects.push(this.interactivePropPrompt);
        }

        // 5. Spawn Enemies
        for (const enemyDef of room.enemies) {
          const ex = enemyDef.tileX * TILE_SIZE + TILE_SIZE / 2;
          const ey = enemyDef.tileY * TILE_SIZE + TILE_SIZE / 2;

          let animKey = "enemy-gabumon-idle";
          let scale = 0.65;
          let tint = 0xffffff;

          if (enemyDef.kind === "boss") {
            animKey = "enemy-etemon-idle";
            scale = 0.95;
            tint = 0xff6666;
          } else if (enemyDef.kind === "elite") {
            animKey = "enemy-veemon-idle";
            scale = 0.8;
            tint = 0xffaa44;
          } else if (enemyDef.id.includes("2")) {
            animKey = "enemy-veemon-idle";
            scale = 0.65;
            tint = 0x88ccff;
          }

          const sprite = this.add.sprite(ex, ey, animKey);
          sprite.setScale(scale);
          sprite.setOrigin(0.5, 0.85);
          sprite.setDepth(9);
          sprite.setTint(tint);
          if (this.anims.exists(animKey)) {
            sprite.play(animKey);
          }

          const hpBar = this.add.graphics();
          hpBar.setDepth(11);

          this.enemies.push({
            id: enemyDef.id,
            name: enemyDef.name,
            kind: enemyDef.kind,
            sprite,
            hpBar,
            currentHp: enemyDef.hp,
            maxHp: enemyDef.maxHp,
            attack: enemyDef.attack,
            defense: enemyDef.defense,
            speed: enemyDef.speed,
            xpReward: enemyDef.xpReward,
            coinReward: enemyDef.coinReward,
            isAttacking: false,
            attackCooldown: 0,
            state: "idle",
          });
        }

        // 6. Notify HUD
        options.onRoomChange?.(roomIndex + 1, runDefinition.totalRooms, room.title, room.biome, room.floor, room.kind === "boss");
        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });

        // Banner text
        const banner = this.add.text(
          this.player.x,
          this.player.y - 60,
          `SALA ${roomIndex + 1}/${runDefinition.totalRooms}: ${room.title.toUpperCase()}`,
          {
            fontSize: "14px",
            color: "#00f0ff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 4,
          }
        ).setOrigin(0.5).setDepth(20);

        this.tweens.add({
          targets: banner,
          y: banner.y - 20,
          alpha: 0,
          duration: 1800,
          onComplete: () => banner.destroy(),
        });
      }

      update(time: number, delta: number) {
        if (this.isFinished || this.isTransitioning || this.isPaused) return;

        // 1. Check Exit Door Interaction
        const distToDoor = this.exitDoorSprite
          ? Phaser.Math.Distance.Between(this.player.x, this.player.y, this.exitDoorSprite.x, this.exitDoorSprite.y)
          : 999;
        if (this.isDoorUnlocked && distToDoor < 45) {
          this.advanceToNextRoom();
          return;
        }

        // 2. Check Chest Interaction in Treasure Room
        if (this.chestSprite && !this.isChestOpened) {
          const distToChest = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.chestSprite.x, this.chestSprite.y);
          if (distToChest < 48 && this.keys?.E?.isDown) {
            this.openChest();
          }
        }

        // 3. Check Interactive Prop (Event, Rest, Shop)
        if (this.interactivePropSprite && !this.isInteractivePropUsed) {
          const distToProp = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.interactivePropSprite.x, this.interactivePropSprite.y);
          if (distToProp < 48 && this.keys?.E?.isDown) {
            if (this.activeRoom.kind === "event") {
              this.openEvent();
            } else if (this.activeRoom.kind === "rest") {
              this.openRest();
            } else if (this.activeRoom.kind === "shop") {
              this.openShop();
            }
          }
        }

        // 4. Player Attack Inputs
        this.handlePlayerAttacks(time);

        // 5. Player Movement Input
        this.handlePlayerMovement(delta);

        // 6. Update Projectiles
        this.updateProjectiles(delta);

        // 7. Update Enemy Projectiles
        this.updateEnemyProjectiles(delta);

        // 8. Update Enemies AI & HP Bars
        this.updateEnemies(time, delta);
      }

      public togglePause() {
        this.isPaused = !this.isPaused;
        options.onPauseToggle?.(this.isPaused);
      }

      public healPlayer(amount: number) {
        this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amount);
        this.showFloatingText(this.player.x, this.player.y - 35, `+${amount} HP!`, "#00ff88");
        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });
      }

      public addCoins(amount: number) {
        this.playerCoins += amount;
        this.showFloatingText(this.player.x, this.player.y - 35, `+${amount} BITS!`, "#ffd700");
        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });
      }

      private handlePlayerAttacks(time: number) {
        if (this.isPlayerAttacking) return;

        // Basic 1 (J or Space)
        if ((this.keys?.J?.isDown || this.keys?.Space?.isDown) && time >= this.basic1CooldownUntil) {
          this.performBasicAttack1(time);
          return;
        }

        // Basic 2 (K - Projectile)
        if (this.keys?.K?.isDown && time >= this.basic2CooldownUntil) {
          this.performBasicAttack2(time);
          return;
        }

        // Special (L - AoE Mega Blast)
        if (this.keys?.L?.isDown && time >= this.specialCooldownUntil) {
          this.performSpecialAttack(time);
          return;
        }
      }

      private performBasicAttack1(time: number) {
        this.isPlayerAttacking = true;
        this.basic1CooldownUntil = time + 450;
        options.onCooldownChange?.("basic_1", 450, 450);

        if (this.anims.exists("player-attack-basic-1")) {
          this.player.play("player-attack-basic-1");
        }

        // Melee hitbox check
        const attackRange = 64;
        const attackOriginX = this.player.x + (this.facing === "right" ? 32 : -32);
        const attackOriginY = this.player.y - 16;

        // Visual slash particle
        const slash = this.add.graphics();
        slash.lineStyle(3, 0xffaa00, 0.8);
        slash.strokeCircle(attackOriginX, attackOriginY, 20);
        slash.setDepth(15);
        this.tweens.add({
          targets: slash,
          alpha: 0,
          scale: 1.4,
          duration: 150,
          onComplete: () => slash.destroy(),
        });

        // Damage enemies in range
        for (const enemy of this.enemies) {
          if (enemy.state === "dead") continue;
          const dist = Phaser.Math.Distance.Between(attackOriginX, attackOriginY, enemy.sprite.x, enemy.sprite.y - 20);
          if (dist <= attackRange) {
            this.damageEnemy(enemy, 24);
          }
        }

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isPlayerAttacking = false;
          if (this.anims.exists("player-idle")) {
            this.player.play("player-idle");
          }
        });
      }

      private performBasicAttack2(time: number) {
        this.isPlayerAttacking = true;
        this.basic2CooldownUntil = time + 800;
        options.onCooldownChange?.("basic_2", 800, 800);

        if (this.anims.exists("player-attack-basic-2")) {
          this.player.play("player-attack-basic-2");
        }

        // Spawn Dragon Projectile
        const projX = this.player.x + (this.facing === "right" ? 28 : -28);
        const projY = this.player.y - 20;
        const speed = 280;
        const vx = this.facing === "right" ? speed : -speed;

        let projTexture = `${manifest.id}_projectile_dragon_0`;
        if (!this.textures.exists(projTexture)) {
          projTexture = `${manifest.id}_attack_basic_2_0`;
        }

        const projSprite = this.add.sprite(projX, projY, projTexture);
        projSprite.setScale(0.7);
        projSprite.setFlipX(this.facing === "left");
        projSprite.setDepth(12);

        this.projectiles.push({
          sprite: projSprite,
          vx,
          vy: 0,
          damage: 32,
          distanceTraveled: 0,
          maxDistance: 380,
        });

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isPlayerAttacking = false;
          if (this.anims.exists("player-idle")) {
            this.player.play("player-idle");
          }
        });
      }

      private performSpecialAttack(time: number) {
        this.isPlayerAttacking = true;
        this.specialCooldownUntil = time + 3000;
        options.onCooldownChange?.("special", 3000, 3000);

        if (this.anims.exists("player-attack-basic-2")) {
          this.player.play("player-attack-basic-2");
        }

        // Camera Shake
        this.cameras.main.shake(250, 0.01);

        // Mega Blast AoE explosion
        const blastX = this.player.x;
        const blastY = this.player.y - 20;

        const blastGlow = this.add.graphics();
        blastGlow.fillStyle(0xff3300, 0.5);
        blastGlow.fillCircle(blastX, blastY, 90);
        blastGlow.lineStyle(4, 0xffff00, 0.9);
        blastGlow.strokeCircle(blastX, blastY, 95);
        blastGlow.setDepth(14);

        this.tweens.add({
          targets: blastGlow,
          scale: 1.3,
          alpha: 0,
          duration: 350,
          onComplete: () => blastGlow.destroy(),
        });

        // Damage all enemies in blast radius
        for (const enemy of this.enemies) {
          if (enemy.state === "dead") continue;
          const dist = Phaser.Math.Distance.Between(blastX, blastY, enemy.sprite.x, enemy.sprite.y - 20);
          if (dist <= 110) {
            this.damageEnemy(enemy, 65);
          }
        }

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isPlayerAttacking = false;
          if (this.anims.exists("player-idle")) {
            this.player.play("player-idle");
          }
        });
      }

      private updateProjectiles(delta: number) {
        const dt = delta / 1000;
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
          const proj = this.projectiles[i];
          const stepX = proj.vx * dt;
          proj.sprite.x += stepX;
          proj.distanceTraveled += Math.abs(stepX);

          // Wall collision
          const tileX = Math.floor(proj.sprite.x / TILE_SIZE);
          const tileY = Math.floor(proj.sprite.y / TILE_SIZE);
          const hitWall = !isWalkable({ tiles: this.activeRoom.tiles } as any, tileX, tileY);

          // Enemy collision
          let hitEnemy = false;
          for (const enemy of this.enemies) {
            if (enemy.state === "dead") continue;
            const dist = Phaser.Math.Distance.Between(proj.sprite.x, proj.sprite.y, enemy.sprite.x, enemy.sprite.y - 20);
            if (dist < 32) {
              this.damageEnemy(enemy, proj.damage);
              hitEnemy = true;
              break;
            }
          }

          if (hitWall || hitEnemy || proj.distanceTraveled >= proj.maxDistance) {
            // Small impact burst
            const burst = this.add.graphics();
            burst.fillStyle(0xffaa00, 0.7);
            burst.fillCircle(proj.sprite.x, proj.sprite.y, 14);
            burst.setDepth(13);
            this.tweens.add({
              targets: burst,
              alpha: 0,
              scale: 1.5,
              duration: 100,
              onComplete: () => burst.destroy(),
            });

            proj.sprite.destroy();
            this.projectiles.splice(i, 1);
          }
        }
      }

      private damageEnemy(enemy: ActiveEnemy, baseDamage: number) {
        const isCrit = Math.random() < this.modifiers.critChance;
        const rawDamage = Math.round(baseDamage * this.modifiers.attackMultiplier * (isCrit ? 2 : 1));
        const finalDamage = Math.max(1, rawDamage - enemy.defense);
        enemy.currentHp -= finalDamage;

        // Flash hurt
        enemy.sprite.setTintFill(0xffffff);
        this.time.delayedCall(90, () => {
          if (enemy.sprite.active) {
            enemy.sprite.clearTint();
            if (enemy.isEnraged) {
              enemy.sprite.setTint(0xff2222);
            } else if (enemy.name.includes("Etemon") || enemy.name.includes("Kuwagamon")) {
              enemy.sprite.setTint(0xff6666);
            }
          }
        });

        // Floating damage text
        this.showFloatingText(
          enemy.sprite.x,
          enemy.sprite.y - 45,
          isCrit ? `CRÍTICO! -${finalDamage}` : `-${finalDamage}`,
          isCrit ? "#ffd700" : "#ffffff"
        );

        if (enemy.currentHp <= 0) {
          this.killEnemy(enemy);
        }
      }

      private killEnemy(enemy: ActiveEnemy) {
        enemy.state = "dead";
        enemy.hpBar.clear();

        // Award rewards with coin multiplier
        const xpEarned = enemy.xpReward;
        const coinsEarned = Math.round(enemy.coinReward * this.modifiers.coinMultiplier);
        this.playerXp += xpEarned;
        this.playerCoins += coinsEarned;

        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
          isBossFighting: false,
        });

        // Elite kill offers a draft upgrade choice!
        if (enemy.kind === "elite") {
          const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
          options.onTriggerUpgradeDraft?.(choices, (up) => this.applyUpgrade(up));
        }

        // Death particle & fade out
        this.tweens.add({
          targets: enemy.sprite,
          alpha: 0,
          scale: 0.1,
          angle: 180,
          duration: 350,
          onComplete: () => {
            enemy.sprite.destroy();
            enemy.hpBar.destroy();
            this.checkRoomCompletion();
          },
        });
      }

      private checkRoomCompletion() {
        const aliveEnemies = this.enemies.filter((e) => e.state !== "dead");
        if (aliveEnemies.length === 0 && !this.isDoorUnlocked) {
          this.isDoorUnlocked = true;
          if (this.exitDoorSprite) {
            this.exitDoorSprite.setTexture("door_open");
          }
          if (this.doorLabel) {
            this.doorLabel.setText("SAIDA (ABERTA)");
            this.doorLabel.setColor("#00ffaa");
          }

          // Banner announcement
          const clearBanner = this.add.text(
            this.cameras.main.midPoint.x,
            this.cameras.main.midPoint.y - 50,
            "SETOR LIMPO! PORTÃO DESBLOQUEADO",
            {
              fontSize: "18px",
              color: "#00ff88",
              fontStyle: "bold",
              stroke: "#000000",
              strokeThickness: 4,
            }
          ).setOrigin(0.5).setDepth(20);

          this.tweens.add({
            targets: clearBanner,
            scale: { from: 0.6, to: 1.1 },
            duration: 400,
            yoyo: true,
            repeat: 1,
            onComplete: () => clearBanner.destroy(),
          });
        }
      }

      private openChest() {
        this.isChestOpened = true;
        if (this.chestSprite) {
          this.chestSprite.setTexture("chest_open");
        }
        if (this.chestPrompt) {
          this.chestPrompt.destroy();
          this.chestPrompt = null;
        }

        this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 30);
        this.playerCoins += 40;
        this.playerXp += 20;

        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });

        // Trigger Upgrade Draft modal with 3 choices
        const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
        options.onTriggerUpgradeDraft?.(choices, (selectedUpgrade) => {
          this.applyUpgrade(selectedUpgrade);
        });
      }

      private openEvent() {
        this.isInteractivePropUsed = true;
        if (this.interactivePropPrompt) {
          this.interactivePropPrompt.destroy();
          this.interactivePropPrompt = null;
        }

        const eventChoices = [
          {
            id: "heal",
            title: "Recuperar Dados",
            description: "Nanobots reparam seu corpo digital restaurando +35 de Vida.",
            type: "heal" as const,
          },
          {
            id: "coins",
            title: "Descarregar Bits",
            description: "Extrai arquivos criptografados rendendo +50 Moedas de Ouro.",
            type: "coins" as const,
          },
          {
            id: "gamble",
            title: "Sobrecarga Experimental",
            description: "Arrisca integridade (-20 HP) em troca de um Módulo Raro de Combate.",
            type: "gamble" as const,
          },
        ];

        options.onTriggerEventModal?.(eventChoices, (choiceIdx) => {
          if (choiceIdx === 0) {
            this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 35);
            this.showFloatingText(this.player.x, this.player.y - 35, "+35 HP!", "#00ff88");
          } else if (choiceIdx === 1) {
            this.playerCoins += 50;
            this.showFloatingText(this.player.x, this.player.y - 35, "+50 MOEDAS!", "#ffd700");
          } else if (choiceIdx === 2) {
            this.playerHp = Math.max(1, this.playerHp - 20);
            const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
            if (choices.length > 0) {
              this.applyUpgrade(choices[0]);
            }
          }

          options.onPlayerStatsChange?.({
            currentHp: this.playerHp,
            maxHp: this.playerMaxHp,
            xp: this.playerXp,
            coins: this.playerCoins,
          });
        });
      }

      private openRest() {
        this.isInteractivePropUsed = true;
        if (this.interactivePropPrompt) {
          this.interactivePropPrompt.destroy();
          this.interactivePropPrompt = null;
        }

        options.onTriggerRestModal?.(
          () => {
            this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 50);
            this.showFloatingText(this.player.x, this.player.y - 35, "+50 HP RECUPERADO!", "#00ff88");
            options.onPlayerStatsChange?.({
              currentHp: this.playerHp,
              maxHp: this.playerMaxHp,
              xp: this.playerXp,
              coins: this.playerCoins,
            });
          },
          () => {
            this.modifiers.attackMultiplier += 0.15;
            this.showFloatingText(this.player.x, this.player.y - 35, "+15% DANO TEMPORÁRIO!", "#ff8800");
          }
        );
      }

      private openShop() {
        const shopItems = [
          {
            id: "shop_potion",
            name: "Cápsula de Reparo",
            price: 30,
            description: "Recupera +40 de Vida imediatamente",
            icon: "🧪",
            type: "heal" as const,
          },
          {
            id: "shop_meat",
            name: "Carne Digital",
            price: 40,
            description: "Envia +1 Carne Digital para o inventário do Tamagotchi!",
            icon: "🍖",
            type: "tamagotchi_item" as const,
            tamagotchiItemId: "carne_digital",
          },
          {
            id: "shop_fruit",
            name: "Fruta Digital",
            price: 35,
            description: "Envia +1 Fruta Digital para o inventário do Tamagotchi!",
            icon: "🍎",
            type: "tamagotchi_item" as const,
            tamagotchiItemId: "fruta_digital",
          },
          {
            id: "shop_upgrade",
            name: "Chip Misterioso de Combate",
            price: 55,
            description: "Desbloqueia um upgrade de combate aleatório",
            icon: "💾",
            type: "upgrade" as const,
          },
        ];

        options.onTriggerShopModal?.(
          shopItems,
          (item) => {
            if (this.playerCoins < item.price) return false;
            this.playerCoins -= item.price;

            if (item.type === "heal") {
              this.playerHp = Math.min(this.playerMaxHp, this.playerHp + 40);
              this.showFloatingText(this.player.x, this.player.y - 35, "+40 HP!", "#00ff88");
            } else if (item.type === "tamagotchi_item" && item.tamagotchiItemId) {
              this.itemsWon[item.tamagotchiItemId] = (this.itemsWon[item.tamagotchiItemId] || 0) + 1;
              this.showFloatingText(this.player.x, this.player.y - 35, `+1 ${item.name} SALVO!`, "#ffd700");
            } else if (item.type === "upgrade") {
              const available = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
              if (available.length > 0) {
                this.applyUpgrade(available[0]);
              }
            }

            options.onPlayerStatsChange?.({
              currentHp: this.playerHp,
              maxHp: this.playerMaxHp,
              xp: this.playerXp,
              coins: this.playerCoins,
            });
            return true;
          },
          () => {}
        );
      }

      public applyUpgrade(upgrade: UpgradeDefinition) {
        this.activeUpgrades.push(upgrade);
        this.modifiers = calculateModifiers(this.activeUpgrades);

        if (upgrade.maxHpBonus) {
          this.playerMaxHp += upgrade.maxHpBonus;
        }
        if (upgrade.healImmediate) {
          this.playerHp = Math.min(this.playerMaxHp, this.playerHp + upgrade.healImmediate);
        }

        options.onActiveUpgradesChange?.(this.activeUpgrades);
        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });

        this.showFloatingText(this.player.x, this.player.y - 45, `+ UPGRADE: ${upgrade.name.toUpperCase()}`, "#ffff00");
      }

      private showFloatingText(x: number, y: number, text: string, color: string = "#ffffff") {
        const label = this.add.text(x, y, text, {
          fontSize: "12px",
          color,
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 3,
        }).setOrigin(0.5).setDepth(25);

        this.tweens.add({
          targets: label,
          y: y - 28,
          alpha: 0,
          duration: 1000,
          onComplete: () => label.destroy(),
        });
      }

      private spawnEnemyProjectile(x: number, y: number, targetX: number, targetY: number, damage: number) {
        const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
        const speed = 190;

        const gfx = this.add.graphics();
        gfx.fillStyle(0xcc00ff, 0.9);
        gfx.fillCircle(0, 0, 7);
        gfx.lineStyle(2, 0xff00cc, 0.8);
        gfx.strokeCircle(0, 0, 7);
        gfx.x = x;
        gfx.y = y;
        gfx.setDepth(12);

        this.enemyProjectiles.push({
          sprite: gfx,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          damage,
          distanceTraveled: 0,
          maxDistance: 450,
        });
      }

      private updateEnemyProjectiles(delta: number) {
        const dt = delta / 1000;
        for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
          const proj = this.enemyProjectiles[i];
          proj.sprite.x += proj.vx * dt;
          proj.sprite.y += proj.vy * dt;
          proj.distanceTraveled += Math.hypot(proj.vx * dt, proj.vy * dt);

          const tileX = Math.floor(proj.sprite.x / TILE_SIZE);
          const tileY = Math.floor(proj.sprite.y / TILE_SIZE);
          const hitWall = !isWalkable({ tiles: this.activeRoom.tiles } as any, tileX, tileY);

          const distToPlayer = Phaser.Math.Distance.Between(proj.sprite.x, proj.sprite.y, this.player.x, this.player.y);
          let hitPlayer = false;

          if (distToPlayer < 24) {
            hitPlayer = true;
            this.damagePlayer(proj.damage);
          }

          if (hitWall || hitPlayer || proj.distanceTraveled >= proj.maxDistance) {
            proj.sprite.destroy();
            this.enemyProjectiles.splice(i, 1);
          }
        }
      }

      private updateEnemies(time: number, delta: number) {
        const dt = delta / 1000;
        for (const enemy of this.enemies) {
          if (enemy.state === "dead" || !enemy.sprite.active) continue;

          // Render HP Bar
          enemy.hpBar.clear();
          const barWidth = enemy.kind === "boss" ? 54 : 36;
          const barHeight = enemy.kind === "boss" ? 6 : 4;
          const barX = enemy.sprite.x - barWidth / 2;
          const barY = enemy.sprite.y - (enemy.kind === "boss" ? 68 : 54);

          enemy.hpBar.fillStyle(0x330000, 0.8);
          enemy.hpBar.fillRect(barX, barY, barWidth, barHeight);
          const hpRatio = Phaser.Math.Clamp(enemy.currentHp / enemy.maxHp, 0, 1);
          enemy.hpBar.fillStyle(enemy.isEnraged ? 0xff0000 : 0xff3333, 1);
          enemy.hpBar.fillRect(barX, barY, barWidth * hpRatio, barHeight);

          // Boss Enrage Check (< 50% HP)
          if (enemy.kind === "boss") {
            if (hpRatio <= 0.5 && !enemy.isEnraged) {
              enemy.isEnraged = true;
              enemy.speed = Math.floor(enemy.speed * 1.3);
              enemy.sprite.setTint(0xff2222);
              this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 70, "FÚRIA DIGITAL!", "#ff0000");
            }

            options.onPlayerStatsChange?.({
              currentHp: this.playerHp,
              maxHp: this.playerMaxHp,
              xp: this.playerXp,
              coins: this.playerCoins,
              isBossFighting: true,
              bossHp: enemy.currentHp,
              bossMaxHp: enemy.maxHp,
              bossName: enemy.name,
              bossPhase: enemy.isEnraged ? 2 : 1,
            });
          }

          const distToPlayer = Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);

          // 1. Ranged Enemy Behavior
          if (enemy.kind === "ranged") {
            if (distToPlayer < 360) {
              if (distToPlayer > 180) {
                // Move towards player
                const angle = Phaser.Math.Angle.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
                const nextX = enemy.sprite.x + Math.cos(angle) * enemy.speed * dt;
                const nextY = enemy.sprite.y + Math.sin(angle) * enemy.speed * dt;
                if (isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
                  enemy.sprite.x = nextX;
                  enemy.sprite.y = nextY;
                }
              } else if (distToPlayer < 90) {
                // Retreat away from player
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, enemy.sprite.x, enemy.sprite.y);
                const nextX = enemy.sprite.x + Math.cos(angle) * enemy.speed * dt;
                const nextY = enemy.sprite.y + Math.sin(angle) * enemy.speed * dt;
                if (isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
                  enemy.sprite.x = nextX;
                  enemy.sprite.y = nextY;
                }
              }

              enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);

              // Shoot projectile periodically
              if (time >= enemy.attackCooldown && distToPlayer <= 300) {
                enemy.attackCooldown = time + 2000;
                enemy.sprite.setTintFill(0x00ffff);
                this.time.delayedCall(200, () => {
                  if (enemy.sprite.active) {
                    enemy.sprite.clearTint();
                    this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y - 10, this.player.x, this.player.y - 15, enemy.attack);
                  }
                });
              }
            }
          } else {
            // 2. Melee / Elite / Boss Movement & Attack
            if (distToPlayer < 360) {
              enemy.state = "chase";
              const angle = Phaser.Math.Angle.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
              const moveDist = enemy.speed * dt;

              const nextX = enemy.sprite.x + Math.cos(angle) * moveDist;
              const nextY = enemy.sprite.y + Math.sin(angle) * moveDist;

              const tileX = Math.floor(nextX / TILE_SIZE);
              const tileY = Math.floor(nextY / TILE_SIZE);

              if (isWalkable({ tiles: this.activeRoom.tiles } as any, tileX, tileY)) {
                enemy.sprite.x = nextX;
                enemy.sprite.y = nextY;
              }

              enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);

              // Boss special projectile attack in Phase 2
              if (enemy.kind === "boss" && enemy.isEnraged && time >= enemy.attackCooldown - 400 && time < enemy.attackCooldown) {
                // Show telegraph circle around boss
                if (!this.bossTelegraphCircle) {
                  this.bossTelegraphCircle = this.add.graphics();
                  this.bossTelegraphCircle.lineStyle(2, 0xff0000, 0.7);
                  this.bossTelegraphCircle.fillStyle(0xff0000, 0.2);
                  this.bossTelegraphCircle.strokeCircle(enemy.sprite.x, enemy.sprite.y, 60);
                  this.bossTelegraphCircle.fillCircle(enemy.sprite.x, enemy.sprite.y, 60);
                  this.bossTelegraphCircle.setDepth(5);
                  this.time.delayedCall(400, () => {
                    this.bossTelegraphCircle?.destroy();
                    this.bossTelegraphCircle = null;
                  });
                }
              }

              if (distToPlayer < (enemy.kind === "boss" ? 58 : 42) && time >= enemy.attackCooldown) {
                enemy.attackCooldown = time + (enemy.kind === "boss" ? 1400 : 1200);
                this.damagePlayer(enemy.attack);

                // In Phase 2, boss also fires a 4-way projectile spread
                if (enemy.kind === "boss" && enemy.isEnraged) {
                  const offsets = [
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                  ];
                  for (const [ox, oy] of offsets) {
                    this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y, enemy.sprite.x + ox * 100, enemy.sprite.y + oy * 100, Math.round(enemy.attack * 0.8));
                  }
                }
              }
            } else {
              enemy.state = "idle";
            }
          }
        }
      }

      private damagePlayer(damage: number) {
        if (this.time.now < this.invulnerableUntil || this.isFinished) return;

        this.invulnerableUntil = this.time.now + 800; // 800ms i-frames
        this.playerHp = Math.max(0, this.playerHp - damage);

        // Flash player red
        this.player.setTint(0xff3333);
        this.time.delayedCall(120, () => {
          if (this.player.active) this.player.clearTint();
        });

        // Thorns reflect damage
        if (this.modifiers.thornPercent > 0) {
          const reflectDmg = Math.max(1, Math.round(damage * this.modifiers.thornPercent));
          for (const enemy of this.enemies) {
            if (enemy.state !== "dead") {
              const dist = Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
              if (dist < 120) {
                this.damageEnemy(enemy, reflectDmg);
                break;
              }
            }
          }
        }

        // Camera micro shake
        this.cameras.main.shake(120, 0.006);

        // Notify HUD
        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });

        if (this.playerHp <= 0) {
          this.triggerDefeat();
        }
      }

      private handlePlayerMovement(delta: number) {
        if (this.isPlayerAttacking) return;

        let dx = 0;
        let dy = 0;

        if (this.cursors?.left?.isDown || this.keys?.A?.isDown) dx -= 1;
        if (this.cursors?.right?.isDown || this.keys?.D?.isDown) dx += 1;
        if (this.cursors?.up?.isDown || this.keys?.W?.isDown) dy -= 1;
        if (this.cursors?.down?.isDown || this.keys?.S?.isDown) dy += 1;

        if (dx !== 0 && dy !== 0) {
          dx *= 0.7071;
          dy *= 0.7071;
        }

        const speed = (options.input.stats.speed || 100) * 2.2;
        const moveDist = (speed * delta) / 1000;

        if (dx !== 0 || dy !== 0) {
          const nextX = this.player.x + dx * moveDist;
          const nextY = this.player.y + dy * moveDist;

          // Wall collision check
          const margin = 12;
          const canMoveX =
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((nextX - margin) / TILE_SIZE), Math.floor((this.player.y - margin) / TILE_SIZE)) &&
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((nextX + margin) / TILE_SIZE), Math.floor((this.player.y - margin) / TILE_SIZE)) &&
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((nextX - margin) / TILE_SIZE), Math.floor((this.player.y + margin) / TILE_SIZE)) &&
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((nextX + margin) / TILE_SIZE), Math.floor((this.player.y + margin) / TILE_SIZE));

          const canMoveY =
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((this.player.x - margin) / TILE_SIZE), Math.floor((nextY - margin) / TILE_SIZE)) &&
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((this.player.x + margin) / TILE_SIZE), Math.floor((nextY - margin) / TILE_SIZE)) &&
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((this.player.x - margin) / TILE_SIZE), Math.floor((nextY + margin) / TILE_SIZE)) &&
            isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor((this.player.x + margin) / TILE_SIZE), Math.floor((nextY + margin) / TILE_SIZE));

          if (canMoveX) this.player.x = nextX;
          if (canMoveY) this.player.y = nextY;

          // Sprite orientation & walk anim
          if (dx < 0) {
            this.facing = "left";
            if (this.anims.exists("player-walk-left")) {
              this.player.play("player-walk-left", true);
            }
          } else if (dx > 0) {
            this.facing = "right";
            if (this.anims.exists("player-walk-right")) {
              this.player.play("player-walk-right", true);
            }
          } else {
            const walkKey = this.facing === "left" ? "player-walk-left" : "player-walk-right";
            if (this.anims.exists(walkKey)) {
              this.player.play(walkKey, true);
            }
          }
        } else {
          // Idle
          if (this.anims.exists("player-idle") && this.player.anims.currentAnim?.key !== "player-idle") {
            this.player.play("player-idle", true);
          }
        }
      }

      public advanceToNextRoom() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;

        this.cameras.main.fadeOut(250);
        this.time.delayedCall(250, () => {
          self.currentRoomIndex += 1;
          if (!runDefinition || self.currentRoomIndex >= runDefinition.totalRooms) {
            this.triggerVictory();
          } else {
            this.loadRoom(self.currentRoomIndex);
            this.cameras.main.fadeIn(250);
            this.isTransitioning = false;
          }
        });
      }

      private triggerVictory() {
        this.isFinished = true;
        if (this.anims.exists("player-victory")) {
          this.player.play("player-victory");
        }

        const victoryText = this.add.text(
          this.cameras.main.midPoint.x,
          this.cameras.main.midPoint.y - 30,
          "CAMINHO DIGITAL CONCLUÍDO!\nVITÓRIA!",
          {
            fontSize: "26px",
            color: "#00ff88",
            fontStyle: "bold",
            align: "center",
            stroke: "#000000",
            strokeThickness: 5,
          }
        ).setOrigin(0.5).setDepth(30);

        this.tweens.add({
          targets: victoryText,
          scale: { from: 0.7, to: 1.2 },
          duration: 400,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            options.onFinish({
              runId: options.input.runId,
              outcome: "victory",
              xp: this.playerXp + 150,
              coins: this.playerCoins + 80,
              itemsWon: {
                ...this.itemsWon,
                carne_digital: (this.itemsWon.carne_digital || 0) + 2,
                fruta_digital: (this.itemsWon.fruta_digital || 0) + 1,
              },
            });
          },
        });
      }

      private triggerDefeat() {
        this.isFinished = true;
        if (this.anims.exists("player-death")) {
          this.player.play("player-death");
        }

        const defeatText = this.add.text(
          this.cameras.main.midPoint.x,
          this.cameras.main.midPoint.y - 30,
          "EXPEDIÇÃO INTERROMPIDA\nDIGIMON EXAUSTO",
          {
            fontSize: "24px",
            color: "#ff3344",
            fontStyle: "bold",
            align: "center",
            stroke: "#000000",
            strokeThickness: 5,
          }
        ).setOrigin(0.5).setDepth(30);

        this.time.delayedCall(1600, () => {
          options.onFinish({
            runId: options.input.runId,
            outcome: "defeat",
            xp: Math.floor(this.playerXp * 0.5),
            coins: Math.floor(this.playerCoins * 0.5),
          });
        });
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: options.parent,
      backgroundColor: "#080c14",
      scene: [DigitalPathScene],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };
    this.game = new Phaser.Game(config);
    return true;
  }

  stop() {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
      this.run = null;
      this.activeScene = null;
      this.currentRoomIndex = 0;
      this.generatedRoomIds.clear();
    }
  }

  togglePause() {
    if (this.activeScene && typeof this.activeScene.togglePause === "function") {
      this.activeScene.togglePause();
    }
  }

  skipRoom() {
    if (this.activeScene && typeof this.activeScene.advanceToNextRoom === "function") {
      this.activeScene.advanceToNextRoom();
    }
  }

  healPlayer(amount: number) {
    if (this.activeScene && typeof this.activeScene.healPlayer === "function") {
      this.activeScene.healPlayer(amount);
    }
  }

  addCoins(amount: number) {
    if (this.activeScene && typeof this.activeScene.addCoins === "function") {
      this.activeScene.addCoins(amount);
    }
  }
}