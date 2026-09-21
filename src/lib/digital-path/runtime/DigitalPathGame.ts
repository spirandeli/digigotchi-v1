import type { RoomData, RunDefinition, EnemyKind } from "../map/procedural-map";
import {
  createFiniteRun,
  generateSingleRoom,
  findValidSpawnTile,
  getBiomeForFloor,
  getRoomKind,
  TOTAL_ROOMS,
  BOSS_ROOMS,
  MINIBOSS_ROOMS,
  CHEST_ROOMS,
  RENDER_DEPTH,
  isWalkable,
} from "../map/procedural-map";
import {
  MAP_THEMES,
  type MapThemeConfig,
  pickRandomTheme,
  getMapTheme,
} from "../map/map-themes";
import { resolveManifestAnimation, validateSpriteManifest } from "./manifest-validation";
import type { DigitalPathStartOptions } from "./types";
import { RunRNG } from "../map/rng";
import {
  type UpgradeDefinition,
  type PlayerStatsModifiers,
  calculateModifiers,
  getUpgradeChoices,
} from "../combat/upgrades";
import {
  getSpeciesCombatProfile,
  type PlayableSpeciesCombatProfile,
} from "../combat/loadout";
import {
  type StatusEffectInstance,
  updateEntityStatusEffects,
  mergeStatusEffect,
  createBurnEffect,
  createSlowEffect,
  createShockEffect,
} from "../combat/status-effects";
import { getBossForFloor, type BossDefinition } from "../combat/bosses";
import { type MapHazard, createLavaHazard, createLightningHazard } from "../map/hazards";
import {
  type FacingDirection,
  getFacingVector,
  getProjectileSpawnOffset,
  getAttackSpawnPosition,
  getDirectionalHitboxPosition,
  applyDirectionalVelocity,
  getProjectileRotation,
} from "../combat/direction";
import {
  normalizeDigimonName,
  getDigimonSpriteBasePath,
  resolveEnemyAnimation,
  getEnemyAnimationKey,
  ENEMY_SPECIES_ACTION_FRAMES,
} from "../combat/enemy-sprites";
import {
  type DigimonVfxProfile,
  getSpeciesVfxProfile,
  getDirectionalVfxPosition,
  getVfxTransform,
} from "../combat/visual-effects";

type PhaserModule = typeof import("phaser");

const TILE_SIZE = 48;
const PLAYER_SCALE = 0.65;

type ActiveEnemy = {
  id: string;
  name: string;
  kind: EnemyKind;
  species: string;
  currentAnimAction?: string;
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
  statusEffects?: StatusEffectInstance[];
  bossDefinition?: BossDefinition;
};

type ActiveProjectile = {
  sprite: Phaser.GameObjects.Sprite;
  vx: number;
  vy: number;
  damage: number;
  distanceTraveled: number;
  maxDistance: number;
  statusEffect?: "burn" | "slow" | "shock";
};

type ActiveEnemyProjectile = {
  sprite: Phaser.GameObjects.Sprite | Phaser.GameObjects.Graphics;
  vx: number;
  vy: number;
  damage: number;
  distanceTraveled: number;
  maxDistance: number;
};


export class DigitalPathGame {
  private game: import("phaser").Game | null = null;
  public run: RunDefinition | null = null;
  public runTheme: MapThemeConfig = MAP_THEMES.lighting;
  public currentRoomNumber = 1;
  private currentRoomIndex = 0;
  private generatedRoomIds = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public activeScene: any = null;
  private isStopped = false;

  async start(options: DigitalPathStartOptions): Promise<boolean> {
    this.isStopped = false;
    if (this.game) {
      this.stop();
    }

    if (options.input.speciesId !== options.manifest.id) {
      throw new Error("Sprite manifest does not match the current Digimon");
    }
    if (!validateSpriteManifest(options.manifest)) {
      throw new Error("Digital Path sprite manifest is not runtime-ready");
    }

    console.log("[Phaser Runtime] DigitalPathGame.start() starting. floorNumber:", options.floorNumber);
    const Phaser = await import("phaser");
    if (this.isStopped) {
      console.log("[Phaser Runtime] DigitalPathGame.start aborted: isStopped is true");
      return false;
    }

    if (options.parent) {
      if (typeof options.parent === "string") {
        const el = document.getElementById(options.parent);
        if (el) el.innerHTML = "";
      } else if (options.parent instanceof HTMLElement) {
        options.parent.innerHTML = "";
      }
    }

    this.currentRoomNumber = Math.max(1, Math.min(TOTAL_ROOMS, options.floorNumber || 1));
    this.currentRoomIndex = this.currentRoomNumber - 1;
    this.runTheme = options.themeId ? getMapTheme(options.themeId) : pickRandomTheme(new RunRNG(options.seed));
    this.run = createFiniteRun(options.seed, this.currentRoomNumber, this.runTheme.id);
    this.generatedRoomIds.clear();
    console.log(`[Phaser Runtime] Run created. Theme: ${this.runTheme.id} (${this.runTheme.name}) for room ${this.currentRoomNumber}`);

    const self = this;
    const manifest = options.manifest;
    const runRng = new RunRNG(options.seed);

    class DigitalPathScene extends Phaser.Scene {
      private player!: Phaser.GameObjects.Sprite;
      private playerHp = 100;
      private playerMaxHp = 100;
      private playerXp = 0;
      private playerCoins = 0;
      private invulnerableUntil = 0;
      private currentRoomNumber = self.currentRoomNumber;
      private bossDefeated = false;

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
        Tab: Phaser.Input.Keyboard.Key;
      };

      // Debug Visual Overlay
      private debugOverlayVisible = false;
      private debugOverlayContainer: Phaser.GameObjects.Container | null = null;

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

      // Visual Effects Profile & Transient VFX Tracking
      private vfxProfile!: DigimonVfxProfile;
      private transientVfx: (Phaser.GameObjects.Sprite | Phaser.GameObjects.GameObject)[] = [];

      // Player Attack Cooldowns & Input Buffering
      private partnerProfile!: PlayableSpeciesCombatProfile;
      private inputBuffer: { slot: "basic_1" | "basic_2" | "special"; timestamp: number } | null = null;
      private isHitstopped = false;
      private screenShakeEnabled = true;
      private damageNumbersEnabled = true;
      private hazards: MapHazard[] = [];
      private hazardGraphics: Phaser.GameObjects.Graphics[] = [];

      private isPlayerAttacking = false;
      private facing: FacingDirection = "right";

      public get facingDirection(): FacingDirection {
        return this.facing;
      }

      public set facingDirection(dir: FacingDirection) {
        this.facing = dir;
        if (this.player) {
          (this.player as any).facingDirection = dir;
        }
      }

      public getPlayerCenter(): { x: number; y: number } {
        return {
          x: this.player ? this.player.x : 0,
          y: this.player ? this.player.y - 18 : 0,
        };
      }

      public lastAttackEvent: {
        slot: "basic_1" | "basic_2" | "special";
        facing: FacingDirection;
        originX: number;
        originY: number;
        playerCenterX?: number;
        playerCenterY?: number;
        vx?: number;
        vy?: number;
        rotation?: number;
        timestamp: number;
      } | null = null;

      private recordAttackEvent(
        slot: "basic_1" | "basic_2" | "special",
        facing: FacingDirection,
        originX: number,
        originY: number,
        vx?: number,
        vy?: number,
        rotation?: number,
      ) {
        const center = this.getPlayerCenter();
        this.lastAttackEvent = {
          slot,
          facing,
          originX,
          originY,
          playerCenterX: center.x,
          playerCenterY: center.y,
          vx,
          vy,
          rotation,
          timestamp: Date.now(),
        };
        if (typeof window !== "undefined") {
          (window as any).__lastAttackEvent = this.lastAttackEvent;
        }
      }

      private basic1CooldownUntil = 0;
      private basic2CooldownUntil = 0;
      private specialCooldownUntil = 0;

      // Boss telegraph
      private bossTelegraphCircle: Phaser.GameObjects.Graphics | null = null;


      constructor() {
        super({ key: "digital-path-scene" });
      }

      preload() {
        // 1. Preload Map Themes Tilesets
        for (const theme of Object.values(MAP_THEMES)) {
          // Floor base (used ~80% of cells)
          theme.tiles.floorNormal.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_floor_${idx}`, p);
          });
          // Floor variation (used ~12-15% of cells — subtle cracks/moss)
          (theme.tiles.floorVariation ?? []).forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_floor_var_${idx}`, p);
          });
          // Floor decor (used ~3-5% near walls — thematic accents)
          (theme.tiles.floorDecor ?? []).forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_floor_decor_${idx}`, p);
          });
          // Legacy fields — still preloaded for compatibility
          theme.tiles.floorAlternate.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_floor_alt_${idx}`, p);
          });
          theme.tiles.floorSpecial.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_floor_spec_${idx}`, p);
          });
          theme.tiles.floorCracked.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_floor_crack_${idx}`, p);
          });
          // Wall sprites
          theme.tiles.walls.horizontal.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_h_${idx}`, p);
          });
          theme.tiles.walls.vertical.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_v_${idx}`, p);
          });
          theme.tiles.walls.top.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_top_${idx}`, p);
          });
          theme.tiles.walls.bottom.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_bottom_${idx}`, p);
          });
          theme.tiles.walls.left.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_left_${idx}`, p);
          });
          theme.tiles.walls.right.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_right_${idx}`, p);
          });
          theme.tiles.walls.special.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_wall_spec_${idx}`, p);
          });
          if (theme.tiles.doors.verticalClosed) {
            this.load.image(`theme_${theme.id}_door_closed`, theme.tiles.doors.verticalClosed);
          }
          if (theme.tiles.doors.verticalOpen) {
            this.load.image(`theme_${theme.id}_door_open`, theme.tiles.doors.verticalOpen);
          }
          theme.tiles.chests.closed.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_chest_closed_${idx}`, p);
          });
          theme.tiles.chests.open.forEach((p, idx) => {
            this.load.image(`theme_${theme.id}_chest_open_${idx}`, p);
          });

          // Corners autotiling sprites
          if (theme.tiles.corners) {
            if (theme.tiles.corners.outerTopLeft) this.load.image(`theme_${theme.id}_corner_outer_tl`, theme.tiles.corners.outerTopLeft);
            if (theme.tiles.corners.outerTopRight) this.load.image(`theme_${theme.id}_corner_outer_tr`, theme.tiles.corners.outerTopRight);
            if (theme.tiles.corners.outerBottomLeft) this.load.image(`theme_${theme.id}_corner_outer_bl`, theme.tiles.corners.outerBottomLeft);
            if (theme.tiles.corners.outerBottomRight) this.load.image(`theme_${theme.id}_corner_outer_br`, theme.tiles.corners.outerBottomRight);
            if (theme.tiles.corners.innerTopLeft) this.load.image(`theme_${theme.id}_corner_inner_tl`, theme.tiles.corners.innerTopLeft);
            if (theme.tiles.corners.innerTopRight) this.load.image(`theme_${theme.id}_corner_inner_tr`, theme.tiles.corners.innerTopRight);
            if (theme.tiles.corners.innerBottomLeft) this.load.image(`theme_${theme.id}_corner_inner_bl`, theme.tiles.corners.innerBottomLeft);
            if (theme.tiles.corners.innerBottomRight) this.load.image(`theme_${theme.id}_corner_inner_br`, theme.tiles.corners.innerBottomRight);
          }
          // Decorations
          if (theme.tiles.decorations) {
            (theme.tiles.decorations.floor ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_decor_floor_${idx}`, p);
            });
            (theme.tiles.decorations.medium ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_decor_med_${idx}`, p);
            });
            (theme.tiles.decorations.wall ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_decor_wall_${idx}`, p);
            });
          }
          // Environment
          if (theme.tiles.environment) {
            (theme.tiles.environment.ambient ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_env_ambient_${idx}`, p);
            });
            (theme.tiles.environment.rocks ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_env_rocks_${idx}`, p);
            });
            (theme.tiles.environment.ruins ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_env_ruins_${idx}`, p);
            });
            (theme.tiles.environment.elemental ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_env_elem_${idx}`, p);
            });
          }
          // Hazards
          if (theme.tiles.hazards) {
            (theme.tiles.hazards.floor ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_hazard_floor_${idx}`, p);
            });
          }
          // Landmarks
          if (theme.tiles.landmarks) {
            (theme.tiles.landmarks.monolith ?? []).forEach((p, idx) => {
              this.load.image(`theme_${theme.id}_landmark_mono_${idx}`, p);
            });
          }
        }

        // Fallback / legacy tilesets
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

        // 3. Preload Enemy Sprite Frames (Wild Digimon) from public/sprites/[species]/
        const loadedEnemyTextures = new Set<string>();
        const enemyPreloadSpecies = ["agumon", "veemon", "gabumon", "etemon", "garurumon", "flamedramon"];
        for (const sp of enemyPreloadSpecies) {
          const basePath = getDigimonSpriteBasePath(sp);
          // idle
          const idleRes = resolveEnemyAnimation(sp, "idle");
          for (let i = 1; i <= idleRes.frameCount; i++) {
            const pad = String(i).padStart(2, "0");
            const key = `enemy_frame_${sp}_idle_${i}`;
            if (!loadedEnemyTextures.has(key)) {
              loadedEnemyTextures.add(key);
              this.load.image(key, `${basePath}idle/idle_${pad}.png`);
            }
          }
          // attack_01 (somente se a ação existir e não for fallback)
          const atkRes = resolveEnemyAnimation(sp, "attack_01");
          if (atkRes.actualAction === "attack_01" && !atkRes.fallbackUsed) {
            for (let i = 1; i <= atkRes.frameCount; i++) {
              const pad = String(i).padStart(2, "0");
              const key = `enemy_frame_${sp}_attack_01_${i}`;
              if (!loadedEnemyTextures.has(key)) {
                loadedEnemyTextures.add(key);
                this.load.image(key, `${basePath}attack_01/attack_01_${pad}.png`);
              }
            }
          }
          // hit (if available)
          if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.hit) {
            const hitCount = ENEMY_SPECIES_ACTION_FRAMES[sp]!.hit!;
            for (let i = 1; i <= hitCount; i++) {
              const pad = String(i).padStart(2, "0");
              const key = `enemy_frame_${sp}_hit_${i}`;
              if (!loadedEnemyTextures.has(key)) {
                loadedEnemyTextures.add(key);
                this.load.image(key, `${basePath}hit/hit_${pad}.png`);
              }
            }
          }
          // death (if available)
          if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.death) {
            const deathCount = ENEMY_SPECIES_ACTION_FRAMES[sp]!.death!;
            for (let i = 1; i <= deathCount; i++) {
              const pad = String(i).padStart(2, "0");
              const key = `enemy_frame_${sp}_death_${i}`;
              if (!loadedEnemyTextures.has(key)) {
                loadedEnemyTextures.add(key);
                this.load.image(key, `${basePath}death/death_${pad}.png`);
              }
            }
          }
        }

        // Backward compatibility aliases for legacy texture keys
        for (let i = 0; i < 10; i++) {
          const pad = String(i + 1).padStart(2, "0");
          const veemonPad = String((i % 4) + 1).padStart(2, "0");
          this.load.image(`enemy_gabumon_idle_${i}`, `/sprites/gabumon/idle/idle_${pad}.png`);
          this.load.image(`enemy_veemon_idle_${i}`, `/sprites/veemon/idle/idle_${veemonPad}.png`);
          this.load.image(`enemy_etemon_idle_${i}`, `/sprites/etemon/idle/idle_${pad}.png`);
        }

        // Cross-Species Authentic Visual Effects & Projectiles
        const vfxToLoad = [
          // Agumon VFX
          { key: "agumon_projectile_dragon_0", path: "/sprites/agumon/projectiles/dragon/projectiles_dragon_01.png" },
          { key: "agumon_projectile_dragon_1", path: "/sprites/agumon/projectiles/dragon/projectiles_dragon_02.png" },
          { key: "agumon_projectile_dragon_2", path: "/sprites/agumon/projectiles/dragon/projectiles_dragon_03.png" },
          { key: "agumon_effect_mega_blast_0", path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_01.png" },
          { key: "agumon_effect_mega_blast_1", path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_02.png" },
          { key: "agumon_effect_mega_blast_2", path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_03.png" },
          { key: "agumon_effect_mega_blast_3", path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_04.png" },
          { key: "agumon_effect_mega_blast_4", path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_05.png" },
          { key: "agumon_effect_mega_blast_5", path: "/sprites/agumon/effects/mega-blast/effects_mega_blast_06.png" },
          { key: "agumon_heal_0", path: "/sprites/agumon/heal/heal_01.png" },
          { key: "agumon_heal_1", path: "/sprites/agumon/heal/heal_02.png" },
          { key: "agumon_heal_2", path: "/sprites/agumon/heal/heal_03.png" },
          { key: "agumon_heal_3", path: "/sprites/agumon/heal/heal_04.png" },
          { key: "agumon_heal_4", path: "/sprites/agumon/heal/heal_05.png" },

          // Veemon VFX
          { key: "veemon_projectile_laser_0", path: "/sprites/veemon/projectiles/laser/projectiles_laser_01.png" },
          { key: "veemon_projectile_laser_1", path: "/sprites/veemon/projectiles/laser/projectiles_laser_02.png" },
          { key: "veemon_effects_attack_1_0", path: "/sprites/veemon/effects/attack_01/effects_attack_01_01.png" },
          { key: "veemon_effects_attack_1_1", path: "/sprites/veemon/effects/attack_01/effects_attack_01_02.png" },
          { key: "veemon_effects_attack_1_2", path: "/sprites/veemon/effects/attack_01/effects_attack_01_03.png" },
          { key: "veemon_effects_attack_2_0", path: "/sprites/veemon/effects/attack_02/effects_attack_02_01.png" },
          { key: "veemon_effects_attack_2_1", path: "/sprites/veemon/effects/attack_02/effects_attack_02_02.png" },
          { key: "veemon_effects_special_0", path: "/sprites/veemon/effects/special_attack/effects_special_attack_01.png" },
          { key: "veemon_effects_special_1", path: "/sprites/veemon/effects/special_attack/effects_special_attack_02.png" },
          { key: "veemon_effects_special_2", path: "/sprites/veemon/effects/special_attack/effects_special_attack_03.png" },
          { key: "veemon_effects_hit_0", path: "/sprites/veemon/effects/hit/effects_hit_01.png" },
          { key: "veemon_heal_0", path: "/sprites/veemon/heal/heal_01.png" },
          { key: "veemon_heal_1", path: "/sprites/veemon/heal/heal_02.png" },
          { key: "veemon_heal_2", path: "/sprites/veemon/heal/heal_03.png" },
          { key: "veemon_heal_3", path: "/sprites/veemon/heal/heal_04.png" },
        ];

        for (const item of vfxToLoad) {
          if (!this.textures.exists(item.key)) {
            this.load.image(item.key, item.path);
          }
        }
      }

      create() {
        this.isFinished = false;
        this.isTransitioning = false;
        this.partnerProfile = getSpeciesCombatProfile(options.originalSpeciesId || options.input.speciesId);
        this.vfxProfile = getSpeciesVfxProfile(options.originalSpeciesId || options.input.speciesId);
        this.screenShakeEnabled = options.settings?.screenShake ?? true;
        this.damageNumbersEnabled = options.settings?.damageNumbers ?? true;
        this.playerHp = options.input.stats.health || 100;
        this.playerMaxHp = options.input.stats.health || 100;
        this.playerXp = 0;
        this.playerCoins = 0;

        this.cameras.main.setBackgroundColor("#080c14");


        // Register Animations
        this.registerAnimations();

        // Keyboard Inputs
        if (this.input.keyboard) {
          this.input.keyboard.resetKeys();
          this.input.keyboard.enabled = true;
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
            Tab: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB),
          };
          this.keys.Esc.on("down", () => this.togglePause());
          this.keys.Tab.on("down", () => this.toggleDebugOverlay());
        }

        // Reset runtime scene state flags
        this.isPaused = false;
        this.isFinished = false;
        this.isTransitioning = false;
        this.isHitstopped = false;
        this.isPlayerAttacking = false;

        // Focus canvas so key events are received immediately
        try {
          if (this.game.canvas) {
            this.game.canvas.setAttribute("tabindex", "0");
            this.game.canvas.focus();
          }
        } catch (_) {}

        // Create Player Sprite
        const idleAnim = resolveManifestAnimation(manifest, "idle");
        const defaultTexture = idleAnim?.frames?.[0] ? `${manifest.id}_idle_0` : "";
        this.player = this.add.sprite(0, 0, defaultTexture);
        this.player.setScale(PLAYER_SCALE);
        this.player.setOrigin(0.5, 0.85);
        this.player.setDepth(RENDER_DEPTH.ENTITIES);
        (this.player as any).facingDirection = this.facing;
        (this.player as any).getFacingDirection = () => this.facingDirection;

        (this as any).performAttackBySlot = (slot: "basic_1" | "basic_2" | "special") => {
          if (slot === "basic_1") this.performBasicAttack1(this.time.now);
          else if (slot === "basic_2") this.performBasicAttack2(this.time.now);
          else if (slot === "special") this.performSpecialAttack(this.time.now);
        };
        (this as any).setPlayerFacing = (dir: FacingDirection) => {
          this.facingDirection = dir;
          if (this.facingDirection === "left") {
            this.player.setFlipX(true);
          } else if (this.facingDirection === "right") {
            this.player.setFlipX(false);
          }
        };

        if (this.anims.exists("player-idle")) {
          this.player.play("player-idle");
        }

        // Camera follow
        this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
        this.cameras.main.setZoom(1.15);

        self.activeScene = this;
        console.log("[Phaser Runtime] DigitalPathScene.create() activeScene assigned, room:", this.currentRoomNumber);
        if (typeof window !== "undefined") {
          (window as any).__digitalPathActiveScene = this;
        }

        // Load First Room
        this.loadRoom(this.currentRoomNumber);
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
        createAnim("player-walk-up", "walk_up", true);
        createAnim("player-walk-down", "walk_down", true);
        createAnim("player-attack-basic-1", "attack_basic_1", false);
        createAnim("player-attack-basic-2", "attack_basic_2", false);
        createAnim("player-attack-special", "attack_special", false);
        createAnim("player-hit", "hit", false);
        createAnim("player-death", "death", false);
        createAnim("player-victory", "victory", false);

        // Enemy Animations (data-driven per species from public/sprites/[species]/)
        const enemyPreloadSpecies = ["agumon", "veemon", "gabumon", "etemon", "garurumon", "flamedramon"];
        for (const sp of enemyPreloadSpecies) {
          // Idle
          const idleKey = getEnemyAnimationKey(sp, "idle");
          const idleRes = resolveEnemyAnimation(sp, "idle");
          if (!this.anims.exists(idleKey)) {
            this.anims.create({
              key: idleKey,
              frames: Array.from({ length: idleRes.frameCount }, (_, i) => ({
                key: `enemy_frame_${sp}_idle_${i + 1}`,
              })),
              frameRate: sp === "veemon" ? 6 : 7,
              repeat: -1,
            });
          }

          // Walk (fallback to idle frames if walk not present on disk)
          const walkKey = getEnemyAnimationKey(sp, "walk");
          if (!this.anims.exists(walkKey)) {
            const walkRes = resolveEnemyAnimation(sp, "walk");
            this.anims.create({
              key: walkKey,
              frames: Array.from({ length: walkRes.frameCount }, (_, i) => ({
                key: `enemy_frame_${sp}_idle_${i + 1}`,
              })),
              frameRate: 8,
              repeat: -1,
            });
          }

          // Attack 01
          const atkKey = getEnemyAnimationKey(sp, "attack_01");
          const atkRes = resolveEnemyAnimation(sp, "attack_01");
          if (!this.anims.exists(atkKey)) {
            const framePrefix = atkRes.fallbackUsed ? `enemy_frame_${sp}_idle_` : `enemy_frame_${sp}_attack_01_`;
            this.anims.create({
              key: atkKey,
              frames: Array.from({ length: atkRes.frameCount }, (_, i) => ({
                key: `${framePrefix}${i + 1}`,
              })),
              frameRate: 10,
              repeat: 0,
            });
          }

          // Hit (if available)
          if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.hit) {
            const hitKey = getEnemyAnimationKey(sp, "hit");
            if (!this.anims.exists(hitKey)) {
              this.anims.create({
                key: hitKey,
                frames: Array.from({ length: ENEMY_SPECIES_ACTION_FRAMES[sp]!.hit! }, (_, i) => ({
                  key: `enemy_frame_${sp}_hit_${i + 1}`,
                })),
                frameRate: 8,
                repeat: 0,
              });
            }
          }

          // Death (if available)
          if (ENEMY_SPECIES_ACTION_FRAMES[sp]?.death) {
            const deathKey = getEnemyAnimationKey(sp, "death");
            if (!this.anims.exists(deathKey)) {
              this.anims.create({
                key: deathKey,
                frames: Array.from({ length: ENEMY_SPECIES_ACTION_FRAMES[sp]!.death! }, (_, i) => ({
                  key: `enemy_frame_${sp}_death_${i + 1}`,
                })),
                frameRate: 8,
                repeat: 0,
              });
            }
          }
        }

        // Backward-compatibility aliases for legacy anim keys
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

        // Agumon Authentic VFX Animations
        if (!this.anims.exists("agumon_projectile_dragon")) {
          this.anims.create({
            key: "agumon_projectile_dragon",
            frames: [0, 1, 2].map((i) => ({ key: `agumon_projectile_dragon_${i}` })),
            frameRate: 12,
            repeat: -1,
          });
        }
        if (!this.anims.exists("agumon_effect_mega_blast")) {
          this.anims.create({
            key: "agumon_effect_mega_blast",
            frames: [0, 1, 2, 3, 4, 5].map((i) => ({ key: `agumon_effect_mega_blast_${i}` })),
            frameRate: 14,
            repeat: 0,
          });
        }
        if (!this.anims.exists("agumon_heal")) {
          this.anims.create({
            key: "agumon_heal",
            frames: [0, 1, 2, 3, 4].map((i) => ({ key: `agumon_heal_${i}` })),
            frameRate: 10,
            repeat: 0,
          });
        }

        // Veemon Authentic VFX Animations
        if (!this.anims.exists("veemon_projectile_laser")) {
          this.anims.create({
            key: "veemon_projectile_laser",
            frames: [0, 1].map((i) => ({ key: `veemon_projectile_laser_${i}` })),
            frameRate: 12,
            repeat: -1,
          });
        }
        if (!this.anims.exists("veemon_effects_attack_1")) {
          this.anims.create({
            key: "veemon_effects_attack_1",
            frames: [0, 1, 2].map((i) => ({ key: `veemon_effects_attack_1_${i}` })),
            frameRate: 14,
            repeat: 0,
          });
        }
        if (!this.anims.exists("veemon_effects_attack_2")) {
          this.anims.create({
            key: "veemon_effects_attack_2",
            frames: [0, 1].map((i) => ({ key: `veemon_effects_attack_2_${i}` })),
            frameRate: 12,
            repeat: 0,
          });
        }
        if (!this.anims.exists("veemon_effects_special")) {
          this.anims.create({
            key: "veemon_effects_special",
            frames: [0, 1, 2].map((i) => ({ key: `veemon_effects_special_${i}` })),
            frameRate: 14,
            repeat: 0,
          });
        }
        if (!this.anims.exists("veemon_effects_hit")) {
          this.anims.create({
            key: "veemon_effects_hit",
            frames: [{ key: "veemon_effects_hit_0" }],
            frameRate: 8,
            repeat: 0,
          });
        }
        if (!this.anims.exists("veemon_heal")) {
          this.anims.create({
            key: "veemon_heal",
            frames: [0, 1, 2, 3].map((i) => ({ key: `veemon_heal_${i}` })),
            frameRate: 10,
            repeat: 0,
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

        // Destroy transient visual effects
        for (const vfx of this.transientVfx) {
          if (vfx && vfx.active) {
            vfx.destroy();
          }
        }
        this.transientVfx = [];

        if (this.bossTelegraphCircle) {
          this.bossTelegraphCircle.destroy();
          this.bossTelegraphCircle = null;
        }

        // Destroy hazards
        for (const h of this.hazardGraphics) {
          h.destroy();
        }
        this.hazardGraphics = [];
        this.hazards = [];
      }


      /**
       * Load a specific finite room arena (1 to 50).
       */
      private loadRoom(roomNumber: number) {
        this.cleanCurrentRoom();

        this.currentRoomNumber = Math.max(1, Math.min(TOTAL_ROOMS, roomNumber));
        self.currentRoomNumber = this.currentRoomNumber;
        self.currentRoomIndex = this.currentRoomNumber - 1;

        const roomSeed = (options.seed ^ (this.currentRoomNumber * 2654435761)) >>> 0;
        const biome = getBiomeForFloor(this.currentRoomNumber);
        const kind = getRoomKind(this.currentRoomNumber);
        const biomeThemeMap: Record<string, string> = {
          storm: "lighting",
          fire: "fire",
          ice: "ice",
          digital: "tech",
          dark: "tech",
        };
        const activeThemeId = options.themeId || biomeThemeMap[biome] || self.runTheme?.id || "lighting";
        const theme = getMapTheme(activeThemeId);
        self.runTheme = theme;

        const room = generateSingleRoom(
          `room_${String(this.currentRoomNumber).padStart(2, "0")}`,
          this.currentRoomNumber - 1,
          kind,
          roomSeed,
          biome,
          this.currentRoomNumber,
          undefined,
          undefined,
          theme.id
        );

        this.activeRoom = room;
        self.run = {
          runId: `run_${options.seed}_r${this.currentRoomNumber}`,
          seed: options.seed,
          floor: this.currentRoomNumber,
          totalRooms: TOTAL_ROOMS,
          theme,
          rooms: [room],
        };
        self.generatedRoomIds.add(room.id);

        if (this.modifiers.roomEnterHeal > 0) {
          this.playerHp = Math.min(this.playerMaxHp, this.playerHp + this.modifiers.roomEnterHeal);
        }

        const roomWidthPx = room.width * TILE_SIZE;
        const roomHeightPx = room.height * TILE_SIZE;

        // Set camera bounds for current room arena
        this.cameras.main.setBounds(0, 0, roomWidthPx, roomHeightPx);

        // === BACKGROUND LAYER (depth 0) ===
        // Solid dark fill behind the whole room so wall tiles show against a
        // visible surface instead of the raw Phaser canvas black.
        const bgColor: number =
          theme.biome === "fire" ? 0x1a0800 :
          theme.biome === "ice"  ? 0x040c18 :
          theme.biome === "storm" ? 0x03050a :
          0x06080f; // digital / default
        const bg = this.add.graphics();
        bg.fillStyle(bgColor, 1);
        bg.fillRect(0, 0, roomWidthPx, roomHeightPx);
        bg.setDepth(RENDER_DEPTH.BACKGROUND);
        this.roomTileObjects.push(bg);

        // Tint table for wall tiles per biome (makes walls clearly darker than floor)
        const wallTintByBiome: Record<string, number> = {
          fire:    0x4a1a08,  // deep ember red
          ice:     0x0c2840,  // deep arctic blue
          storm:   0x1a2040,  // deep digital blue (biome for 'lighting' theme)
          digital: 0x1a2040,
        };
        const wallTint = wallTintByBiome[theme.biome] ?? 0x1a2040;


        // ── TILE HASH HELPER ─────────────────────────────────────────────────────
        // Produces a deterministic pseudo-random float in [0,1) from (x, y, seed).
        const tileHash = (tx: number, ty: number): number => {
          const roomSeed = room.index * 7919;
          let h = (tx * 1664525 + ty * 1013904223 + roomSeed * 22695477) & 0x7fffffff;
          h ^= (h >>> 16);
          h = Math.imul(h, 0x45d9f3b);
          h ^= (h >>> 16);
          return (h >>> 0) / 0x100000000;
        };

        // ── FLOOR DISTRIBUTION PASS ─────────────────────────────────────────────
        // Requirements:
        // 1. Dominant base floor: >= 85% of walkable area (uniform, calm, clean).
        // 2. Variations: 10-12% grouped in natural 2-3 tile clusters (no isolated specks).
        // 3. Decor: rare (2-3% max, 2-3 tiles per room), strictly near walls.
        const floorVariants = theme.tiles.floorVariation ?? [];
        const floorDecorTiles = theme.tiles.floorDecor ?? [];
        const floorVariantFinal = new Uint8Array(room.width * room.height);
        const floorDecorFinal = new Uint8Array(room.width * room.height);

        const totalFloorCells: { x: number; y: number; idx: number; isNearWall: boolean }[] = [];
        const dirs4 = [[-1, 0], [1, 0], [0, -1], [0, 1]] as const;

        for (let ty = 0; ty < room.height; ty++) {
          for (let tx = 0; tx < room.width; tx++) {
            if (room.tiles[ty][tx] === "floor") {
              const idx = ty * room.width + tx;
              const isNearWall = dirs4.some(([dx, dy]) => {
                const nx = tx + dx, ny = ty + dy;
                return nx < 0 || nx >= room.width || ny < 0 || ny >= room.height || room.tiles[ny][nx] === "wall";
              });
              totalFloorCells.push({ x: tx, y: ty, idx, isNearWall });
            }
          }
        }

        // Place rare decor (2-3 tiles max, strictly near walls)
        if (floorDecorTiles.length > 0 && totalFloorCells.length > 0) {
          const nearWallCells = totalFloorCells.filter((c) => c.isNearWall);
          const decorTargetCount = Math.min(3, Math.max(1, Math.floor(totalFloorCells.length * 0.025)));
          const sortedForDecor = [...nearWallCells].sort((a, b) => tileHash(a.x, a.y) - tileHash(b.x, b.y));
          for (let i = 0; i < Math.min(decorTargetCount, sortedForDecor.length); i++) {
            floorDecorFinal[sortedForDecor[i].idx] = 1;
          }
        }

        // Place subtle variation clusters (2 to 3 small clusters of 2-3 tiles)
        if (floorVariants.length > 0 && totalFloorCells.length > 0) {
          const numClusters = Math.min(3, Math.max(2, Math.floor(totalFloorCells.length / 40)));
          const availableForCluster = totalFloorCells.filter((c) => !floorDecorFinal[c.idx]);
          const sortedSeeds = [...availableForCluster].sort(
            (a, b) => tileHash(a.x + 500, a.y + 500) - tileHash(b.x + 500, b.y + 500)
          );

          for (let i = 0; i < Math.min(numClusters, sortedSeeds.length); i++) {
            const seed = sortedSeeds[i];
            floorVariantFinal[seed.idx] = 1;
            // Expand to 1-2 adjacent cells for cluster cohesion
            for (const [dx, dy] of dirs4) {
              const nx = seed.x + dx, ny = seed.y + dy;
              if (nx >= 0 && nx < room.width && ny >= 0 && ny < room.height && room.tiles[ny][nx] === "floor") {
                const nIdx = ny * room.width + nx;
                if (!floorDecorFinal[nIdx] && tileHash(nx * 3, ny * 3) > 0.45) {
                  floorVariantFinal[nIdx] = 1;
                }
              }
            }
          }
        }

        for (let y = 0; y < room.height; y += 1) {
          for (let x = 0; x < room.width; x += 1) {
            const posX = x * TILE_SIZE;
            const posY = y * TILE_SIZE;
            const isFloor = room.tiles[y][x] === "floor";

            if (isFloor) {
              // ── FLOOR TILE SELECTION ─────────────────────────────────────────
              // Priority: DECOR (rare near walls) > VARIATION (clusters) > BASE (85%+)
              const cellIdx = y * room.width + x;
              const h = tileHash(x, y);
              let textureKey: string;

              if (floorDecorFinal[cellIdx] && floorDecorTiles.length > 0) {
                // ~2-3% — decorative accent (tech diamond circuit)
                const dIdx = Math.floor(h * floorDecorTiles.length) % floorDecorTiles.length;
                textureKey = `theme_${theme.id}_floor_decor_${dIdx}`;
              } else if (floorVariantFinal[cellIdx] && floorVariants.length > 0) {
                // ~10-12% — subtle variation (spark/lightning crack in cohesive clusters)
                const vIdx = Math.floor(h * floorVariants.length) % floorVariants.length;
                textureKey = `theme_${theme.id}_floor_var_${vIdx}`;
              } else {
                // ~85%+ — dominant base floor tile (uniform, peaceful, consistent)
                const nCount = theme.tiles.floorNormal.length || 1;
                const nIdx = Math.floor(tileHash(x + 1000, y + 2000) * nCount) % nCount;
                textureKey = `theme_${theme.id}_floor_${nIdx}`;
              }

              if (!this.textures.exists(textureKey)) {
                // Fallback to primary normal tile of current theme
                textureKey = this.textures.exists(`theme_${theme.id}_floor_0`)
                  ? `theme_${theme.id}_floor_0`
                  : (this.textures.exists("tile_stone") ? "tile_stone" : "__WHITE");
              }

              const tile = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, textureKey);
              tile.setDisplaySize(TILE_SIZE, TILE_SIZE);
              tile.setDepth(RENDER_DEPTH.FLOOR);
              if (theme.floorTint) {
                tile.setTint(theme.floorTint);
              }
              this.roomTileObjects.push(tile);
            } else {
              // ── WALL TILE AUTOTILING ───────────────────────────────────────────
              // Determine wall sprite based on actual adjacent walkable topology.
              const isFloorOrWalkable = (r: number, c: number) =>
                r >= 0 && r < room.height && c >= 0 && c < room.width && room.tiles[r][c] === "floor";

              const hasFloorBelow = isFloorOrWalkable(y + 1, x);
              const hasFloorAbove = isFloorOrWalkable(y - 1, x);
              const hasFloorRight = isFloorOrWalkable(y, x + 1);
              const hasFloorLeft  = isFloorOrWalkable(y, x - 1);
              const isOuterBorder = x === 0 || x === room.width - 1 || y === 0 || y === room.height - 1;

              const hasFloorBR = isFloorOrWalkable(y + 1, x + 1);
              const hasFloorBL = isFloorOrWalkable(y + 1, x - 1);
              const hasFloorTR = isFloorOrWalkable(y - 1, x + 1);
              const hasFloorTL = isFloorOrWalkable(y - 1, x - 1);

              let wallKey: string;

              // Convex Outer Corners (wall corner surrounded on 2 adjacent sides by floor)
              if (hasFloorBelow && hasFloorRight && this.textures.exists(`theme_${theme.id}_corner_outer_tl`)) {
                wallKey = `theme_${theme.id}_corner_outer_tl`;
              } else if (hasFloorBelow && hasFloorLeft && this.textures.exists(`theme_${theme.id}_corner_outer_tr`)) {
                wallKey = `theme_${theme.id}_corner_outer_tr`;
              } else if (hasFloorAbove && hasFloorRight && this.textures.exists(`theme_${theme.id}_corner_outer_bl`)) {
                wallKey = `theme_${theme.id}_corner_outer_bl`;
              } else if (hasFloorAbove && hasFloorLeft && this.textures.exists(`theme_${theme.id}_corner_outer_br`)) {
                wallKey = `theme_${theme.id}_corner_outer_br`;
              }
              // Concave Inner Corners (wall corner where orthogonal neighbors are walls but diagonal is floor)
              else if (!hasFloorBelow && !hasFloorRight && hasFloorBR && this.textures.exists(`theme_${theme.id}_corner_inner_tl`)) {
                wallKey = `theme_${theme.id}_corner_inner_tl`;
              } else if (!hasFloorBelow && !hasFloorLeft && hasFloorBL && this.textures.exists(`theme_${theme.id}_corner_inner_tr`)) {
                wallKey = `theme_${theme.id}_corner_inner_tr`;
              } else if (!hasFloorAbove && !hasFloorRight && hasFloorTR && this.textures.exists(`theme_${theme.id}_corner_inner_bl`)) {
                wallKey = `theme_${theme.id}_corner_inner_bl`;
              } else if (!hasFloorAbove && !hasFloorLeft && hasFloorTL && this.textures.exists(`theme_${theme.id}_corner_inner_br`)) {
                wallKey = `theme_${theme.id}_corner_inner_br`;
              }
              // Orthogonal edges:
              else if (!hasFloorBelow && !hasFloorAbove && !hasFloorLeft && !hasFloorRight) {
                // Deep interior wall (no floor neighbor): use solid/vertical
                wallKey = theme.tiles.walls.vertical.length > 0
                  ? `theme_${theme.id}_wall_v_0`
                  : `theme_${theme.id}_wall_h_0`;
              } else if (hasFloorBelow && !hasFloorLeft && !hasFloorRight) {
                // North wall border (walkable floor is below) → horizontal slab
                wallKey = theme.tiles.walls.top.length > 0
                  ? `theme_${theme.id}_wall_top_0`
                  : `theme_${theme.id}_wall_h_0`;
              } else if (hasFloorAbove && !hasFloorLeft && !hasFloorRight) {
                // South wall border (walkable floor is above) → horizontal slab
                wallKey = theme.tiles.walls.bottom.length > 0
                  ? `theme_${theme.id}_wall_bottom_0`
                  : `theme_${theme.id}_wall_h_0`;
              } else if (hasFloorRight && !hasFloorAbove && !hasFloorBelow) {
                // West column border (walkable floor is to right) → vertical sprite
                wallKey = theme.tiles.walls.left.length > 0
                  ? `theme_${theme.id}_wall_left_0`
                  : `theme_${theme.id}_wall_v_0`;
              } else if (hasFloorLeft && !hasFloorAbove && !hasFloorBelow) {
                // East column border (walkable floor is to left) → vertical sprite
                wallKey = theme.tiles.walls.right.length > 0
                  ? `theme_${theme.id}_wall_right_0`
                  : `theme_${theme.id}_wall_v_0`;
              } else if (hasFloorBelow || hasFloorAbove) {
                wallKey = `theme_${theme.id}_wall_h_0`;
              } else {
                wallKey = `theme_${theme.id}_wall_v_0`;
              }

              if (!this.textures.exists(wallKey)) wallKey = "tile_dark_stone";

              const wall = this.add.image(posX + TILE_SIZE / 2, posY + TILE_SIZE / 2, wallKey);
              wall.setDisplaySize(TILE_SIZE, TILE_SIZE);
              wall.setTint(isOuterBorder ? 0x080a10 : wallTint);
              wall.setDepth(RENDER_DEPTH.WALL_BASE);
              this.roomTileObjects.push(wall);

              // Foreground rim — neon accent on the top-facing face of wall tiles.
              // ONLY on walls that have floor immediately below (visible front face looking into the room)
              if (hasFloorBelow) {
                const rim = this.add.graphics();
                rim.fillStyle(theme.wallRimColor || 0x00f0ff, 0.85);
                rim.fillRect(posX + 1, posY + TILE_SIZE - 6, TILE_SIZE - 2, 6);
                rim.setDepth(RENDER_DEPTH.WALL_FOREGROUND);
                this.roomTileObjects.push(rim);
              }
            }
          }
        }

        // ── 1.5 RENDER SEMANTIC CLUSTERS & LANDMARKS ─────────────────────────
        if (room.clusters && room.clusters.length > 0) {
          for (const cluster of room.clusters) {
            let texKey: string;
            let isHazard = false;

            switch (cluster.type) {
              case "rubble":
                texKey = this.textures.exists(`theme_${theme.id}_env_rocks_0`)
                  ? `theme_${theme.id}_env_rocks_0`
                  : (this.textures.exists(`theme_${theme.id}_decor_floor_0`) ? `theme_${theme.id}_decor_floor_0` : `theme_${theme.id}_floor_var_0`);
                break;
              case "crystal":
                texKey = this.textures.exists(`theme_${theme.id}_env_elem_0`)
                  ? `theme_${theme.id}_env_elem_0`
                  : (this.textures.exists(`theme_${theme.id}_decor_floor_1`) ? `theme_${theme.id}_decor_floor_1` : `theme_${theme.id}_floor_decor_0`);
                break;
              case "energy":
                texKey = this.textures.exists(`theme_${theme.id}_env_ambient_0`)
                  ? `theme_${theme.id}_env_ambient_0`
                  : (this.textures.exists(`theme_${theme.id}_decor_floor_0`) ? `theme_${theme.id}_decor_floor_0` : `theme_${theme.id}_floor_decor_1`);
                break;
              case "tech":
                texKey = this.textures.exists(`theme_${theme.id}_decor_med_0`)
                  ? `theme_${theme.id}_decor_med_0`
                  : (this.textures.exists(`theme_${theme.id}_env_ruins_0`) ? `theme_${theme.id}_env_ruins_0` : `theme_${theme.id}_floor_decor_0`);
                break;
              case "hazard":
                texKey = this.textures.exists(`theme_${theme.id}_hazard_floor_0`)
                  ? `theme_${theme.id}_hazard_floor_0`
                  : `theme_${theme.id}_floor_crack_0`;
                isHazard = true;
                break;
              case "structure":
              default:
                texKey = this.textures.exists(`theme_${theme.id}_decor_wall_0`)
                  ? `theme_${theme.id}_decor_wall_0`
                  : (this.textures.exists(`theme_${theme.id}_env_ruins_0`) ? `theme_${theme.id}_env_ruins_0` : `theme_${theme.id}_wall_spec_0`);
                break;
            }

            for (const tilePos of cluster.tiles) {
              if (!this.textures.exists(texKey)) continue;
              const cX = tilePos.x * TILE_SIZE + TILE_SIZE / 2;
              const cY = tilePos.y * TILE_SIZE + TILE_SIZE / 2;
              const cSprite = this.add.image(cX, cY, texKey);
              cSprite.setDisplaySize(TILE_SIZE * 0.88, TILE_SIZE * 0.88);
              cSprite.setDepth(isHazard ? RENDER_DEPTH.FLOOR_HAZARD : RENDER_DEPTH.FLOOR_DECOR);
              if (cluster.type === "energy" && theme.accentTint) {
                cSprite.setTint(theme.accentTint);
              }
              this.roomTileObjects.push(cSprite);
            }
          }
        }

        // Render Landmark (Boss, Arena, Event rooms)
        if (room.landmark) {
          const lm = room.landmark;
          const lmKey = this.textures.exists(`theme_${theme.id}_landmark_mono_0`)
            ? `theme_${theme.id}_landmark_mono_0`
            : (this.textures.exists(`theme_${theme.id}_decor_med_0`) ? `theme_${theme.id}_decor_med_0` : "tile_circuit");

          const lmWidthPx = (lm.size?.width || 2) * TILE_SIZE;
          const lmHeightPx = (lm.size?.height || 2) * TILE_SIZE;
          const lmCenterX = lm.tileX * TILE_SIZE + lmWidthPx / 2;
          const lmCenterY = lm.tileY * TILE_SIZE + lmHeightPx / 2;

          if (this.textures.exists(lmKey)) {
            const lmSprite = this.add.image(lmCenterX, lmCenterY, lmKey);
            lmSprite.setDisplaySize(lmWidthPx * 0.9, lmHeightPx * 0.9);
            lmSprite.setDepth(RENDER_DEPTH.WALL_BASE);
            if (theme.accentTint) {
              lmSprite.setTint(theme.accentTint);
            }
            this.roomTileObjects.push(lmSprite);

            // Subtle pulsing glow for landmark
            this.tweens.add({
              targets: lmSprite,
              alpha: { from: 0.75, to: 1.0 },
              duration: 1600,
              yoyo: true,
              repeat: -1,
              ease: "Sine.easeInOut",
            });
          }
        }

        // 2. Place Player at Validated Room Spawn
        const validSpawn = findValidSpawnTile(room);
        this.player.x = validSpawn.x * TILE_SIZE + TILE_SIZE / 2;
        this.player.y = validSpawn.y * TILE_SIZE + TILE_SIZE / 2;
        this.player.setDepth(RENDER_DEPTH.ENTITIES);
        this.player.setVisible(true);
        this.player.setActive(true);

        // Spawn ring effect
        const spawnRing = this.add.graphics();
        spawnRing.lineStyle(2, 0x00ff88, 0.8);
        spawnRing.strokeCircle(this.player.x, this.player.y, 22);
        spawnRing.setDepth(RENDER_DEPTH.SPAWN_RING);
        this.roomTileObjects.push(spawnRing);

        // 3. Place Exit Door
        const exitX = room.exit.x * TILE_SIZE + TILE_SIZE / 2;
        const exitY = room.exit.y * TILE_SIZE + TILE_SIZE / 2;
        const hasEnemies = room.enemies.length > 0;
        this.isDoorUnlocked = !hasEnemies;

        const doorClosedKey = this.textures.exists(`theme_${theme.id}_door_closed`)
          ? `theme_${theme.id}_door_closed`
          : "door_closed";
        const doorOpenKey = this.textures.exists(`theme_${theme.id}_door_open`)
          ? `theme_${theme.id}_door_open`
          : "door_open";
        this.exitDoorSprite = this.add.sprite(exitX, exitY, this.isDoorUnlocked ? doorOpenKey : doorClosedKey);
        this.exitDoorSprite.setDisplaySize(TILE_SIZE, TILE_SIZE * 1.2);
        this.exitDoorSprite.setDepth(RENDER_DEPTH.ENTITIES);

        // Door label
        this.doorLabel = this.add.text(exitX, exitY - 32, this.isDoorUnlocked ? "SAIDA (ABERTA)" : "PORTAO TRANCADO", {
          fontSize: "11px",
          color: this.isDoorUnlocked ? "#00ffaa" : "#ff4444",
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: 3,
        }).setOrigin(0.5);
        this.doorLabel.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
        this.roomTileObjects.push(this.doorLabel);

        // 4. Place Props at Guaranteed Walkable Floor Location (closest to center)
        this.isChestOpened = false;
        this.isInteractivePropUsed = false;

        const midX = Math.floor(room.width / 2);
        const midY = Math.floor(room.height / 2);
        let bestPropTile = { x: midX, y: midY };
        let minPropDist = Infinity;

        for (let py = 1; py < room.height - 1; py++) {
          for (let px = 1; px < room.width - 1; px++) {
            if (room.tiles[py]?.[px] === "floor") {
              if ((px === validSpawn.x && py === validSpawn.y) || (px === room.exit.x && py === room.exit.y)) {
                continue;
              }
              const dist = Math.hypot(px - midX, py - midY);
              if (dist < minPropDist) {
                minPropDist = dist;
                bestPropTile = { x: px, y: py };
              }
            }
          }
        }

        const centerX = bestPropTile.x * TILE_SIZE + TILE_SIZE / 2;
        const centerY = bestPropTile.y * TILE_SIZE + TILE_SIZE / 2;

        if (room.kind === "treasure") {
          const chestClosedKey = this.textures.exists(`theme_${theme.id}_chest_closed_0`)
            ? `theme_${theme.id}_chest_closed_0`
            : "chest_closed";
          this.chestSprite = this.add.sprite(centerX, centerY, chestClosedKey);
          this.chestSprite.setDisplaySize(TILE_SIZE, TILE_SIZE);
          this.chestSprite.setDepth(RENDER_DEPTH.ENTITIES);

          this.chestPrompt = this.add.text(centerX, centerY - 26, "[E] ABRIR BAÚ", {
            fontSize: "10px",
            color: "#ffdd44",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.chestPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
          this.roomTileObjects.push(this.chestPrompt);
        } else if (room.kind === "event") {
          this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
          this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
          this.interactivePropSprite.setDepth(RENDER_DEPTH.ENTITIES);
          this.interactivePropSprite.setTint(0x00f0ff);

          this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] TERMINAL DE DADOS", {
            fontSize: "10px",
            color: "#00f0ff",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.interactivePropPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
          this.roomTileObjects.push(this.interactivePropPrompt);
        } else if (room.kind === "rest") {
          this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_charged");
          this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
          this.interactivePropSprite.setDepth(RENDER_DEPTH.ENTITIES);
          this.interactivePropSprite.setTint(0x00ff88);

          this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] NÓ DE REGENERAÇÃO", {
            fontSize: "10px",
            color: "#00ff88",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.interactivePropPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
          this.roomTileObjects.push(this.interactivePropPrompt);
        } else if (room.kind === "shop") {
          this.interactivePropSprite = this.add.sprite(centerX, centerY, "tile_circuit");
          this.interactivePropSprite.setDisplaySize(TILE_SIZE * 1.2, TILE_SIZE * 1.2);
          this.interactivePropSprite.setDepth(RENDER_DEPTH.ENTITIES);
          this.interactivePropSprite.setTint(0xffd700);

          this.interactivePropPrompt = this.add.text(centerX, centerY - 28, "[E] MERCADOR DIGITAL", {
            fontSize: "10px",
            color: "#ffd700",
            fontStyle: "bold",
            stroke: "#000000",
            strokeThickness: 3,
          }).setOrigin(0.5);
          this.interactivePropPrompt.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);
          this.roomTileObjects.push(this.interactivePropPrompt);
        }

        // 4.5. Spawn Biome Map Hazards
        if (room.biome === "fire" && (room.kind === "combat" || room.kind === "boss")) {
          const lava = createLavaHazard(`lava_${this.currentRoomNumber}`, centerX - 40, centerY + 30, 36);
          this.hazards.push(lava);
          const hGfx = this.add.graphics();
          hGfx.fillStyle(0xff4400, 0.35);
          hGfx.fillCircle(lava.x, lava.y, lava.radius);
          hGfx.lineStyle(2, 0xff8800, 0.7);
          hGfx.strokeCircle(lava.x, lava.y, lava.radius);
          hGfx.setDepth(RENDER_DEPTH.FLOOR_HAZARD);
          this.hazardGraphics.push(hGfx);
          this.roomTileObjects.push(hGfx);
        } else if (room.biome === "storm" && (room.kind === "combat" || room.kind === "boss")) {
          const lightning = createLightningHazard(`storm_${this.currentRoomNumber}`, centerX + 40, centerY - 30, 38);
          this.hazards.push(lightning);
          const hGfx = this.add.graphics();
          hGfx.fillStyle(0x00ccff, 0.25);
          hGfx.fillCircle(lightning.x, lightning.y, lightning.radius);
          hGfx.lineStyle(2, 0x00ffff, 0.6);
          hGfx.strokeCircle(lightning.x, lightning.y, lightning.radius);
          hGfx.setDepth(RENDER_DEPTH.FLOOR_HAZARD);
          this.hazardGraphics.push(hGfx);
          this.roomTileObjects.push(hGfx);
        }

        // 5. Spawn Enemies
        for (const enemyDef of room.enemies) {
          const ex = enemyDef.tileX * TILE_SIZE + TILE_SIZE / 2;
          const ey = enemyDef.tileY * TILE_SIZE + TILE_SIZE / 2;

          const species = normalizeDigimonName(enemyDef.digimon || enemyDef.name);
          let animKey = getEnemyAnimationKey(species, "idle");
          let scale = 0.65;
          let tint = 0xffffff;
          let bossDef: BossDefinition | undefined;

          let enemyName = enemyDef.name;
          let enemyHp = enemyDef.hp;
          let enemyMaxHp = enemyDef.maxHp;
          let enemyAttack = enemyDef.attack;
          let enemyDefense = enemyDef.defense;
          let enemySpeed = enemyDef.speed;
          let enemyXp = enemyDef.xpReward;
          let enemyCoins = enemyDef.coinReward;

          if (enemyDef.kind === "boss") {
            bossDef = getBossForFloor(this.currentRoomNumber, room.biome);
            enemyName = bossDef.name;
            enemyHp = enemyDef.hp || bossDef.baseHp;
            enemyMaxHp = enemyDef.maxHp || bossDef.baseHp;
            enemyAttack = enemyDef.attack || bossDef.attackDamage;
            enemyDefense = enemyDef.defense || bossDef.defense;
            enemySpeed = enemyDef.speed || bossDef.speed;
            enemyXp = enemyDef.xpReward || bossDef.xpReward;
            enemyCoins = enemyDef.coinReward || bossDef.coinReward;

            animKey = getEnemyAnimationKey("etemon", "idle");
            if (bossDef.id === "meramon") {
              scale = 1.05;
            } else if (bossDef.id === "seadramon") {
              scale = 1.1;
            } else if (bossDef.id === "metaletemon") {
              scale = 1.15;
            } else if (bossDef.id === "wargeymon") {
              scale = 1.25;
            } else {
              scale = 0.95;
            }
          } else if (enemyDef.kind === "miniboss") {
            scale = 0.95;
            animKey = getEnemyAnimationKey(species, "idle");
          } else if (enemyDef.kind === "elite") {
            scale = 0.8;
          }

          const sprite = this.add.sprite(ex, ey, animKey);
          sprite.setScale(scale);
          sprite.setOrigin(0.5, 0.85);
          sprite.setDepth(RENDER_DEPTH.ENTITIES);
          // ── ENEMY GRAYSCALE ──────────────────────────────────────────────────
          // Render all enemies in black & white at the rendering layer.
          // Assets are NOT modified. We use Phaser's preFX ColorMatrix pipeline
          // which converts the sprite to grayscale in real-time on the GPU.
          // The original tint value is preserved only for special hit-flash events.
          // Falls back to a neutral gray tint if preFX is unavailable (e.g. headless).
          try {
            if (sprite.preFX) {
              const cm = sprite.preFX.addColorMatrix();
              cm.grayscale(1); // fully desaturate
            } else {
              // Fallback: neutral gray tint (no color cast)
              sprite.setTint(0xaaaaaa);
            }
          } catch {
            sprite.setTint(0xaaaaaa);
          }
          if (this.anims.exists(animKey)) {
            sprite.play(animKey);
          }

          const hpBar = this.add.graphics();
          hpBar.setDepth(RENDER_DEPTH.ENTITIES_OVERLAY);

          this.enemies.push({
            id: enemyDef.id,
            name: enemyName,
            kind: enemyDef.kind,
            species,
            currentAnimAction: "idle",
            sprite,
            hpBar,
            currentHp: enemyHp,
            maxHp: enemyMaxHp,
            attack: enemyAttack,
            defense: enemyDefense,
            speed: enemySpeed,
            xpReward: enemyXp,
            coinReward: enemyCoins,
            isAttacking: false,
            attackCooldown: 0,
            state: "idle",
            statusEffects: [],
            bossDefinition: bossDef,
          });
        }

        // 6. Notify HUD with 1..50 room progress
        options.onRoomChange?.(
          this.currentRoomNumber,
          TOTAL_ROOMS,
          room.title,
          room.biome,
          this.currentRoomNumber,
          room.kind === "boss"
        );
        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
        });

        // Banner text
        const bannerText = room.kind === "boss"
          ? `SALA ${this.currentRoomNumber}/50 • ⚠️ ÁREA DE CHEFE\n${room.title.toUpperCase()}`
          : `SALA ${this.currentRoomNumber}/50: ${room.title.toUpperCase()}\nInimigos Lv. ~${this.currentRoomNumber}`;

        const banner = this.add.text(
          this.cameras.main.midPoint.x,
          this.cameras.main.midPoint.y - 120,
          bannerText,
          {
            fontSize: "14px",
            color: room.kind === "boss" ? "#ff4444" : "#00f0ff",
            fontStyle: "bold",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
          }
        ).setOrigin(0.5).setDepth(RENDER_DEPTH.HUD);

        this.tweens.add({
          targets: banner,
          y: banner.y - 20,
          alpha: 0,
          duration: 1800,
          onComplete: () => banner.destroy(),
        });

        if (this.debugOverlayVisible) {
          this.renderDebugOverlay();
        }
      }

      private toggleDebugOverlay() {
        this.debugOverlayVisible = !this.debugOverlayVisible;
        this.renderDebugOverlay();
      }

      private renderDebugOverlay() {
        if (this.debugOverlayContainer) {
          this.debugOverlayContainer.destroy();
          this.debugOverlayContainer = null;
        }

        if (!this.debugOverlayVisible || !this.activeRoom) return;

        this.debugOverlayContainer = this.add.container(0, 0);
        this.debugOverlayContainer.setDepth(9999);

        const room = this.activeRoom;

        // Room Header Info Banner
        const infoText = `[DEBUG OVERLAY (TAB)] Room: ${room.id} | Shape: ${room.shape || "arena"} | Biome: ${room.biome} | Theme: ${room.theme || "lighting"}\nFloor: ${room.floor} | Kind: ${room.kind} | EmptySpace: ${room.emptySpaceRatio ?? "N/A"} | Budget: ${room.budgetUsed ?? "N/A"}`;
        const headerBg = this.add.graphics();
        headerBg.fillStyle(0x000000, 0.85);
        headerBg.fillRect(8, 8, Math.min(520, room.width * TILE_SIZE - 16), 34);
        headerBg.lineStyle(1, 0x00f0ff, 0.9);
        headerBg.strokeRect(8, 8, Math.min(520, room.width * TILE_SIZE - 16), 34);
        this.debugOverlayContainer.add(headerBg);

        const headerTxt = this.add.text(14, 12, infoText, {
          fontFamily: "monospace",
          fontSize: "9px",
          color: "#00f0ff",
          fontStyle: "bold",
        });
        this.debugOverlayContainer.add(headerTxt);

        // Tile Grid Walkability Overlay
        for (let y = 0; y < room.height; y++) {
          for (let x = 0; x < room.width; x++) {
            const posX = x * TILE_SIZE;
            const posY = y * TILE_SIZE;
            const tileType = room.tiles[y][x];
            const isExit = x === room.exit?.x && y === room.exit?.y;
            const isSpawn = x === room.spawn?.x && y === room.spawn?.y;
            const hasProp = room.props?.some((p) => p.tileX === x && p.tileY === y);

            let label = "F";
            let strokeColor = 0x00ff88;
            if (tileType === "wall") {
              label = "W";
              strokeColor = 0xff3333;
            } else if (isExit) {
              label = "EXIT";
              strokeColor = 0xffff00;
            } else if (isSpawn) {
              label = "SPWN";
              strokeColor = 0x00ffff;
            } else if (hasProp) {
              label = "PROP";
              strokeColor = 0xff8800;
            }

            const rect = this.add.graphics();
            rect.lineStyle(1, strokeColor, 0.35);
            rect.strokeRect(posX, posY, TILE_SIZE, TILE_SIZE);
            this.debugOverlayContainer.add(rect);

            const txt = this.add.text(posX + 2, posY + 2, `${label}\n${x},${y}`, {
              fontFamily: "monospace",
              fontSize: "8px",
              color: strokeColor === 0x00ff88 ? "#aaffcc" : (strokeColor === 0xff3333 ? "#ffaabb" : "#ffffaa"),
              backgroundColor: "rgba(0,0,0,0.65)",
              padding: { x: 1, y: 1 },
            });
            this.debugOverlayContainer.add(txt);
          }
        }

        // Semantic Clusters Debug Overlay
        if (room.clusters && room.clusters.length > 0) {
          const clusterColors: Record<string, number> = {
            rubble: 0xaa8866,
            crystal: 0x00ffff,
            energy: 0xffff00,
            tech: 0x00ffcc,
            hazard: 0xff4400,
            structure: 0xaa44ff,
          };

          for (const c of room.clusters) {
            const cColor = clusterColors[c.type] || 0xffffff;
            for (const t of c.tiles) {
              const cRect = this.add.graphics();
              cRect.lineStyle(2, cColor, 0.85);
              cRect.strokeRect(t.x * TILE_SIZE + 2, t.y * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
              this.debugOverlayContainer.add(cRect);
            }

            const cLabel = this.add.text(
              c.centerX * TILE_SIZE + TILE_SIZE / 2,
              c.centerY * TILE_SIZE - 4,
              `[${c.type.toUpperCase()}]`,
              {
                fontFamily: "monospace",
                fontSize: "8px",
                color: `#${cColor.toString(16).padStart(6, "0")}`,
                backgroundColor: "rgba(0,0,0,0.85)",
                fontStyle: "bold",
                padding: { x: 2, y: 1 },
              }
            ).setOrigin(0.5);
            this.debugOverlayContainer.add(cLabel);
          }
        }

        // Landmark Debug Overlay
        if (room.landmark) {
          const lm = room.landmark;
          const lmW = (lm.size?.width || 2) * TILE_SIZE;
          const lmH = (lm.size?.height || 2) * TILE_SIZE;
          const lmRect = this.add.graphics();
          lmRect.lineStyle(3, 0xff00ff, 0.9);
          lmRect.strokeRect(lm.tileX * TILE_SIZE, lm.tileY * TILE_SIZE, lmW, lmH);
          this.debugOverlayContainer.add(lmRect);

          const lmLbl = this.add.text(
            lm.tileX * TILE_SIZE + lmW / 2,
            lm.tileY * TILE_SIZE - 6,
            `⭐ LANDMARK: ${lm.name}`,
            {
              fontFamily: "monospace",
              fontSize: "9px",
              color: "#ff00ff",
              backgroundColor: "rgba(0,0,0,0.85)",
              fontStyle: "bold",
              padding: { x: 3, y: 1 },
            }
          ).setOrigin(0.5);
          this.debugOverlayContainer.add(lmLbl);
        }
      }

      update(time: number, delta: number) {
        if (this.isFinished || this.isTransitioning || this.isPaused || this.isHitstopped) return;

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

        // 9. Update Biome Hazards
        this.updateHazards(delta);
      }

      private triggerHitstop(durationMs = 45) {
        this.isHitstopped = true;
        this.time.delayedCall(durationMs, () => {
          this.isHitstopped = false;
        });
      }

      private updateHazards(delta: number) {
        for (const hazard of this.hazards) {
          const distToPlayer = Phaser.Math.Distance.Between(this.player.x, this.player.y, hazard.x, hazard.y);
          if (hazard.type === "lava") {
            if (distToPlayer <= hazard.radius) {
              hazard.timerMs -= delta;
              if (hazard.timerMs <= 0) {
                hazard.timerMs = hazard.cooldownMs;
                this.damagePlayer(hazard.damage);
                this.showFloatingText(this.player.x, this.player.y - 30, `-${hazard.damage} LAVA`, "#ff4400");
              }
            } else {
              hazard.timerMs = Math.max(0, hazard.timerMs - delta);
            }
          } else if (hazard.type === "lightning") {
            hazard.timerMs -= delta;
            if (hazard.timerMs <= 0) {
              hazard.timerMs = hazard.cooldownMs;
              const flash = this.add.graphics();
              flash.fillStyle(0x00ffff, 0.6);
              flash.fillCircle(hazard.x, hazard.y, hazard.radius + 6);
              flash.setDepth(15);
              this.tweens.add({
                targets: flash,
                alpha: 0,
                duration: 150,
                onComplete: () => flash.destroy(),
              });

              if (distToPlayer <= hazard.radius) {
                this.damagePlayer(hazard.damage);
                this.showFloatingText(this.player.x, this.player.y - 30, `-${hazard.damage} CHOQUE!`, "#00ffff");
              }
            }
          }
        }
      }


      public togglePause() {
        this.isPaused = !this.isPaused;
        options.onPauseToggle?.(this.isPaused);
      }

      public healPlayer(amount: number) {
        this.playerHp = Math.min(this.playerMaxHp, this.playerHp + amount);
        this.showFloatingText(this.player.x, this.player.y - 35, `+${amount} HP!`, "#00ff88");
        this.spawnHealEffect(this.player.x, this.player.y - 20);
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
        if (this.isPlayerAttacking) {
          // Input buffering: store attack if pressed during action
          if (this.keys?.J?.isDown || this.keys?.Space?.isDown) {
            this.inputBuffer = { slot: "basic_1", timestamp: time };
          } else if (this.keys?.K?.isDown) {
            this.inputBuffer = { slot: "basic_2", timestamp: time };
          } else if (this.keys?.L?.isDown) {
            this.inputBuffer = { slot: "special", timestamp: time };
          }
          return;
        }

        // Process buffered attack if within 120ms
        if (this.inputBuffer && time - this.inputBuffer.timestamp <= 120) {
          const slot = this.inputBuffer.slot;
          this.inputBuffer = null;
          if (slot === "basic_1" && time >= this.basic1CooldownUntil) {
            this.performBasicAttack1(time);
            return;
          } else if (slot === "basic_2" && time >= this.basic2CooldownUntil) {
            this.performBasicAttack2(time);
            return;
          } else if (slot === "special" && time >= this.specialCooldownUntil) {
            this.performSpecialAttack(time);
            return;
          }
        } else {
          this.inputBuffer = null;
        }

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

      private applyStatusToEnemy(enemy: ActiveEnemy, type: "burn" | "slow" | "shock") {
        let eff: StatusEffectInstance;
        if (type === "burn") {
          eff = createBurnEffect();
        } else if (type === "slow") {
          eff = createSlowEffect();
        } else {
          eff = createShockEffect();
        }
        enemy.statusEffects = mergeStatusEffect(enemy.statusEffects || [], eff);
      }

      private performBasicAttack1(time: number) {
        const attackConfig = this.partnerProfile.basic1;
        this.isPlayerAttacking = true;
        this.basic1CooldownUntil = time + attackConfig.cooldownMs;
        options.onCooldownChange?.("basic_1", attackConfig.cooldownMs, attackConfig.cooldownMs);

        // Visual orientation of player sprite
        if (this.facingDirection === "left") {
          this.player.setFlipX(true);
        } else if (this.facingDirection === "right") {
          this.player.setFlipX(false);
        }

        const animKey = this.anims.exists(attackConfig.animation) ? attackConfig.animation : "player-attack-basic-1";
        if (this.anims.exists(animKey)) {
          this.player.play(animKey);
        }

        // Directional melee hitbox check ahead of the character
        const origin = this.getPlayerCenter();
        const hitboxOffset = 36;
        const hitboxPos = getDirectionalHitboxPosition(origin, this.facingDirection, hitboxOffset);
        const attackRange = attackConfig.range || 52;
        const rotation = getProjectileRotation(this.facingDirection);

        this.recordAttackEvent("basic_1", this.facingDirection, hitboxPos.x, hitboxPos.y, undefined, undefined, rotation);

        // Authentic directional visual slash effect (e.g. Veemon crescent slash)
        const b1Vfx = this.vfxProfile.basic1;
        if (b1Vfx.hasVisualEffect && b1Vfx.effectTextureKey && this.textures.exists(b1Vfx.effectTextureKey)) {
          const vfxPos = getDirectionalVfxPosition(origin, this.facingDirection, b1Vfx.offsetForward || 36);
          const slashSprite = this.add.sprite(vfxPos.x, vfxPos.y, b1Vfx.effectTextureKey);
          const transform = getVfxTransform(this.facingDirection);
          slashSprite.setRotation(transform.rotation);
          if (transform.flipY) slashSprite.setFlipY(true);
          slashSprite.setScale(b1Vfx.scale || 1.0);
          slashSprite.setDepth(15);
          if (b1Vfx.effectAnimKey && this.anims.exists(b1Vfx.effectAnimKey)) {
            slashSprite.play(b1Vfx.effectAnimKey);
          }
          this.transientVfx.push(slashSprite);
          this.tweens.add({
            targets: slashSprite,
            alpha: 0,
            duration: b1Vfx.durationMs || 180,
            onComplete: () => {
              slashSprite.destroy();
              this.transientVfx = this.transientVfx.filter((v) => v !== slashSprite);
            },
          });
        }

        // Damage enemies in range of directional hitbox
        for (const enemy of this.enemies) {
          if (enemy.state === "dead") continue;
          const dist = Phaser.Math.Distance.Between(hitboxPos.x, hitboxPos.y, enemy.sprite.x, enemy.sprite.y - 20);
          if (dist <= attackRange) {
            this.damageEnemy(enemy, attackConfig.damage);
            if (attackConfig.statusEffect) {
              this.applyStatusToEnemy(enemy, attackConfig.statusEffect);
            }
          }
        }

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isPlayerAttacking = false;
          if (this.anims.exists("player-idle")) {
            this.player.play("player-idle");
            if (this.facingDirection === "left") {
              this.player.setFlipX(true);
            } else if (this.facingDirection === "right") {
              this.player.setFlipX(false);
            }
          }
          if (this.inputBuffer && this.time.now - this.inputBuffer.timestamp <= 120) {
            this.handlePlayerAttacks(this.time.now);
          }
        });
      }

      private performBasicAttack2(time: number) {
        const attackConfig = this.partnerProfile.basic2;
        this.isPlayerAttacking = true;
        this.basic2CooldownUntil = time + attackConfig.cooldownMs;
        options.onCooldownChange?.("basic_2", attackConfig.cooldownMs, attackConfig.cooldownMs);

        // Visual orientation of player sprite
        if (this.facingDirection === "left") {
          this.player.setFlipX(true);
        } else if (this.facingDirection === "right") {
          this.player.setFlipX(false);
        }

        const animKey = this.anims.exists(attackConfig.animation) ? attackConfig.animation : "player-attack-basic-2";
        if (this.anims.exists(animKey)) {
          this.player.play(animKey);
        }

        // Spawn Projectile ahead of character in facingDirection
        const origin = this.getPlayerCenter();
        const spawnOffset = 32;
        const spawnPos = getAttackSpawnPosition(origin, this.facingDirection, spawnOffset);
        const b2Vfx = this.vfxProfile.basic2;
        const speed = b2Vfx.speed || (this.partnerProfile.speciesId === "veemon" ? 360 : 280);
        const { vx, vy } = applyDirectionalVelocity(this.facingDirection, speed);
        const rotation = getProjectileRotation(this.facingDirection);

        this.recordAttackEvent("basic_2", this.facingDirection, spawnPos.x, spawnPos.y, vx, vy, rotation);

        // Visual charge feedback burst
        const chargeCircle = this.add.graphics();
        const chargeColor = attackConfig.projectileColor ?? 0x00ffff;
        chargeCircle.lineStyle(2, chargeColor, 0.9);
        chargeCircle.strokeCircle(spawnPos.x, spawnPos.y, 10);
        chargeCircle.setDepth(13);
        this.tweens.add({
          targets: chargeCircle,
          scaleX: 1.8,
          scaleY: 1.8,
          alpha: 0,
          duration: 100,
          onComplete: () => chargeCircle.destroy(),
        });

        // 90ms charge delay before ejecting projectile
        this.time.delayedCall(90, () => {
          if (!this.scene.isActive()) return;

          let projTexture = b2Vfx.projectileTextureKey;
          if (!projTexture || !this.textures.exists(projTexture)) {
            projTexture = `${manifest.id}_projectile_dragon_0`;
          }
          if (!this.textures.exists(projTexture)) {
            projTexture = `${manifest.id}_projectile_laser_0`;
          }
          if (!this.textures.exists(projTexture)) {
            projTexture = `${manifest.id}_attack_basic_2_0`;
          }

          const projSprite = this.add.sprite(spawnPos.x, spawnPos.y, projTexture);
          projSprite.setScale(b2Vfx.scale || 0.85);
          projSprite.setRotation(rotation);
          projSprite.setDepth(12);

          if (attackConfig.projectileColor && !b2Vfx.projectileAnimKey) {
            projSprite.setTint(attackConfig.projectileColor);
          }

          if (b2Vfx.projectileAnimKey && this.anims.exists(b2Vfx.projectileAnimKey)) {
            projSprite.play(b2Vfx.projectileAnimKey);
          }

          this.projectiles.push({
            sprite: projSprite,
            vx,
            vy,
            damage: attackConfig.damage,
            distanceTraveled: 0,
            maxDistance: attackConfig.range || 380,
            statusEffect: attackConfig.statusEffect,
          });
        });

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isPlayerAttacking = false;
          if (this.anims.exists("player-idle")) {
            this.player.play("player-idle");
            if (this.facingDirection === "left") {
              this.player.setFlipX(true);
            } else if (this.facingDirection === "right") {
              this.player.setFlipX(false);
            }
          }
          if (this.inputBuffer && this.time.now - this.inputBuffer.timestamp <= 120) {
            this.handlePlayerAttacks(this.time.now);
          }
        });
      }

      private performSpecialAttack(time: number) {
        const attackConfig = this.partnerProfile.special;
        this.isPlayerAttacking = true;
        this.specialCooldownUntil = time + attackConfig.cooldownMs;
        options.onCooldownChange?.("special", attackConfig.cooldownMs, attackConfig.cooldownMs);

        // Visual orientation of player sprite
        if (this.facingDirection === "left") {
          this.player.setFlipX(true);
        } else if (this.facingDirection === "right") {
          this.player.setFlipX(false);
        }

        const animKey = this.anims.exists(attackConfig.animation) ? attackConfig.animation : "player-attack-special";
        if (this.anims.exists(animKey)) {
          this.player.play(animKey);
        }

        // Invulnerability frames if defined
        if (attackConfig.invulnerableFramesMs) {
          this.invulnerableUntil = Math.max(this.invulnerableUntil, time + attackConfig.invulnerableFramesMs);
        }

        // Camera Shake (if enabled)
        if (this.screenShakeEnabled) {
          this.cameras.main.shake(250, attackConfig.shakeIntensity || 0.008);
        }

        // Hitstop micro-pause (45ms)
        this.triggerHitstop(45);

        // Calculate directional parameters for Special
        const origin = this.getPlayerCenter();
        const dirVec = getFacingVector(this.facingDirection);
        const forwardOffset = 42;
        const blastPos = getAttackSpawnPosition(origin, this.facingDirection, forwardOffset);
        const rotation = getProjectileRotation(this.facingDirection);
        const { vx, vy } = applyDirectionalVelocity(this.facingDirection, 420);
        const blastRadius = attackConfig.area || 85;

        this.recordAttackEvent("special", this.facingDirection, blastPos.x, blastPos.y, vx, vy, rotation);

        // Dash / Thrust impulse in the facing direction
        const dashDistance = 44;
        const destX = this.player.x + dirVec.x * dashDistance;
        const destY = this.player.y + dirVec.y * dashDistance;
        const tileX = Math.floor(destX / TILE_SIZE);
        const tileY = Math.floor(destY / TILE_SIZE);
        if (isWalkable({ tiles: this.activeRoom.tiles } as any, tileX, tileY)) {
          this.tweens.add({
            targets: this.player,
            x: destX,
            y: destY,
            duration: 150,
            ease: "Quad.easeOut",
          });
        }

        // Authentic sprite visual effect for special attack (Agumon mega blast / Veemon special)
        const spVfx = this.vfxProfile.special;
        if (spVfx.hasVisualEffect && spVfx.effectTextureKey && this.textures.exists(spVfx.effectTextureKey)) {
          const vfxPos = getDirectionalVfxPosition(origin, this.facingDirection, spVfx.offsetForward || 44);
          const specialVfxSprite = this.add.sprite(vfxPos.x, vfxPos.y, spVfx.effectTextureKey);
          const transform = getVfxTransform(this.facingDirection);
          specialVfxSprite.setRotation(transform.rotation);
          if (transform.flipY) specialVfxSprite.setFlipY(true);
          specialVfxSprite.setScale(spVfx.scale || 1.25);
          specialVfxSprite.setDepth(15);
          if (spVfx.effectAnimKey && this.anims.exists(spVfx.effectAnimKey)) {
            specialVfxSprite.play(spVfx.effectAnimKey);
          }
          this.transientVfx.push(specialVfxSprite);

          this.tweens.add({
            targets: specialVfxSprite,
            x: vfxPos.x + dirVec.x * 40,
            y: vfxPos.y + dirVec.y * 40,
            alpha: 0,
            duration: spVfx.durationMs || 350,
            ease: "Cubic.easeOut",
            onComplete: () => {
              specialVfxSprite.destroy();
              this.transientVfx = this.transientVfx.filter((v) => v !== specialVfxSprite);
            },
          });

          // Secondary ground eruption/burst if available (e.g. Veemon ground explosion)
          if (spVfx.secondaryTextureKey && this.textures.exists(spVfx.secondaryTextureKey)) {
            const secSprite = this.add.sprite(vfxPos.x, vfxPos.y + 8, spVfx.secondaryTextureKey);
            secSprite.setScale(spVfx.secondaryScale || 1.05);
            secSprite.setDepth(14);
            if (spVfx.secondaryAnimKey && this.anims.exists(spVfx.secondaryAnimKey)) {
              secSprite.play(spVfx.secondaryAnimKey);
            }
            this.transientVfx.push(secSprite);
            this.tweens.add({
              targets: secSprite,
              alpha: 0,
              duration: (spVfx.durationMs || 350) + 60,
              onComplete: () => {
                secSprite.destroy();
                this.transientVfx = this.transientVfx.filter((v) => v !== secSprite);
              },
            });
          }
        }

        // Directional special energy blast projectile
        let specialProjTexture = `${manifest.id}_projectile_laser_0`;
        if (!this.textures.exists(specialProjTexture)) {
          specialProjTexture = `${manifest.id}_projectile_dragon_0`;
        }
        if (!this.textures.exists(specialProjTexture)) {
          specialProjTexture = `${manifest.id}_attack_special_0`;
        }
        if (this.textures.exists(specialProjTexture)) {
          const specialSprite = this.add.sprite(blastPos.x, blastPos.y, specialProjTexture);
          specialSprite.setScale(1.1);
          specialSprite.setRotation(rotation);
          // Removed artificial setTint(0x00ffff) to preserve authentic pixel art
          specialSprite.setDepth(13);
          this.projectiles.push({
            sprite: specialSprite,
            vx,
            vy,
            damage: attackConfig.damage,
            distanceTraveled: 0,
            maxDistance: 320,
            statusEffect: attackConfig.statusEffect,
          });
        }

        // Reflect / Destroy enemy projectiles in the forward blast zone
        if (attackConfig.reflectProjectiles) {
          for (let i = this.enemyProjectiles.length - 1; i >= 0; i--) {
            const ep = this.enemyProjectiles[i];
            const dist = Phaser.Math.Distance.Between(blastPos.x, blastPos.y, ep.sprite.x, ep.sprite.y);
            if (dist <= blastRadius + 20) {
              ep.sprite.destroy();
              this.enemyProjectiles.splice(i, 1);
            }
          }
        }

        // Damage all enemies in directional blast zone
        for (const enemy of this.enemies) {
          if (enemy.state === "dead") continue;
          const dist = Phaser.Math.Distance.Between(blastPos.x, blastPos.y, enemy.sprite.x, enemy.sprite.y - 20);
          if (dist <= blastRadius + 15) {
            this.damageEnemy(enemy, attackConfig.damage);
            if (attackConfig.statusEffect) {
              this.applyStatusToEnemy(enemy, attackConfig.statusEffect);
            }
          }
        }

        this.player.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
          this.isPlayerAttacking = false;
          if (this.anims.exists("player-idle")) {
            this.player.play("player-idle");
            if (this.facingDirection === "left") {
              this.player.setFlipX(true);
            } else if (this.facingDirection === "right") {
              this.player.setFlipX(false);
            }
          }
          if (this.inputBuffer && this.time.now - this.inputBuffer.timestamp <= 120) {
            this.handlePlayerAttacks(this.time.now);
          }
        });
      }


      private updateProjectiles(delta: number) {
        const dt = delta / 1000;
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
          const proj = this.projectiles[i];
          const stepX = proj.vx * dt;
          const stepY = proj.vy * dt;
          proj.sprite.x += stepX;
          proj.sprite.y += stepY;
          proj.distanceTraveled += Math.hypot(stepX, stepY);

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
              if (proj.statusEffect) {
                this.applyStatusToEnemy(enemy, proj.statusEffect);
              }
              hitEnemy = true;
              break;
            }
          }

          if (hitWall || hitEnemy || proj.distanceTraveled >= proj.maxDistance) {
            this.spawnProjectileImpact(proj.sprite.x, proj.sprite.y);
            proj.sprite.destroy();
            this.projectiles.splice(i, 1);
          }
        }
      }

      private damageEnemy(enemy: ActiveEnemy, baseDamage: number, canCrit = true) {
        const isCrit = canCrit && Math.random() < this.modifiers.critChance;
        const rawDamage = Math.round(baseDamage * this.modifiers.attackMultiplier * (isCrit ? 2 : 1));
        const finalDamage = Math.max(1, rawDamage - enemy.defense);
        enemy.currentHp -= finalDamage;

        if (isCrit) {
          this.triggerHitstop(40);
        }

        // Spawn authentic hit impact
        this.spawnHitImpact(enemy.sprite.x, enemy.sprite.y - 20);

        // Flash hurt (white flash) then restore clean grayscale
        enemy.sprite.setTintFill(0xffffff);
        this.time.delayedCall(90, () => {
          if (enemy.sprite.active) {
            enemy.sprite.clearTint();
            if (!enemy.sprite.preFX) {
              enemy.sprite.setTint(0xaaaaaa);
            }
          }
        });

        // Trigger hit animation if available
        const hitKey = getEnemyAnimationKey(enemy.species, "hit");
        if (this.anims.exists(hitKey) && !enemy.isAttacking) {
          enemy.sprite.play(hitKey);
          enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            const idleKey = getEnemyAnimationKey(enemy.species, "idle");
            if (enemy.sprite.active && this.anims.exists(idleKey) && !enemy.isAttacking && enemy.state !== "dead") {
              enemy.sprite.play(idleKey);
              enemy.currentAnimAction = "idle";
            }
          });
        }

        // Floating damage text
        this.showFloatingText(
          enemy.sprite.x,
          enemy.sprite.y - 45,
          isCrit ? `CRÍTICO! -${finalDamage}` : `-${finalDamage}`,
          isCrit ? "#ffd700" : "#ffffff",
          isCrit
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

        // Real-time synchronization of XP to Tamagotchi Pet
        const targetSpecies = options.originalSpeciesId || options.input.speciesId;
        options.onAwardXp?.(targetSpecies, xpEarned);

        if (enemy.kind === "boss") {
          if (!this.bossDefeated) {
            this.bossDefeated = true;
            if (enemy.bossDefinition?.guaranteedItemDrop) {
              const dropKey = enemy.bossDefinition.guaranteedItemDrop;
              this.itemsWon[dropKey] = (this.itemsWon[dropKey] || 0) + 1;
            }
            if (this.currentRoomNumber >= TOTAL_ROOMS) {
              options.onSaveCheckpoint?.(TOTAL_ROOMS, TOTAL_ROOMS);
            } else {
              options.onSaveCheckpoint?.(this.currentRoomNumber + 1, this.currentRoomNumber);
            }
          }
        }

        options.onPlayerStatsChange?.({
          currentHp: this.playerHp,
          maxHp: this.playerMaxHp,
          xp: this.playerXp,
          coins: this.playerCoins,
          isBossFighting: false,
        });

        // Elite and Mini-Boss kills offer a draft upgrade choice!
        if (enemy.kind === "elite" || enemy.kind === "miniboss") {
          const choices = getUpgradeChoices(runRng, this.activeUpgrades.map((u) => u.id));
          options.onTriggerUpgradeDraft?.(choices, (up) => this.applyUpgrade(up));
        }

        // Death animation if available, otherwise tween fallback
        const deathKey = getEnemyAnimationKey(enemy.species, "death");
        if (this.anims.exists(deathKey)) {
          enemy.sprite.play(deathKey);
          enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
            this.tweens.add({
              targets: enemy.sprite,
              alpha: 0,
              duration: 200,
              onComplete: () => {
                enemy.sprite.destroy();
                enemy.hpBar.destroy();
                this.checkRoomCompletion();
              },
            });
          });
        } else {
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
      }

      private checkRoomCompletion() {
        const aliveEnemies = this.enemies.filter((e) => e.state !== "dead");
        const bossAlive = this.enemies.some(
          (e) => (e.kind === "boss" || e.kind === "miniboss") && e.state !== "dead"
        );
        const isBossOrMiniBossRoom =
          this.activeRoom?.kind === "boss" || this.activeRoom?.kind === "miniboss";
        const roomCleared = isBossOrMiniBossRoom ? !bossAlive : aliveEnemies.length === 0;

        if (roomCleared && !this.isDoorUnlocked) {
          this.isDoorUnlocked = true;
          if (this.exitDoorSprite) {
            const theme = self.runTheme || MAP_THEMES.lighting;
            const doorOpenKey = this.textures.exists(`theme_${theme.id}_door_open`)
              ? `theme_${theme.id}_door_open`
              : "door_open";
            this.exitDoorSprite.setTexture(doorOpenKey);
          }
          if (this.doorLabel) {
            this.doorLabel.setText("SAIDA (ABERTA)");
            this.doorLabel.setColor("#00ffaa");
          }

          if (this.currentRoomNumber >= TOTAL_ROOMS && this.bossDefeated) {
            // Final Boss defeated! Complete the run!
            const finalVictoryBanner = this.add.text(
              this.cameras.main.midPoint.x,
              this.cameras.main.midPoint.y - 50,
              `CHEFE FINAL DERROTADO!\nCAMINHO DIGITAL CONQUISTADO (SALA ${TOTAL_ROOMS})!`,
              {
                fontSize: "20px",
                color: "#ffcc00",
                fontStyle: "bold",
                align: "center",
                stroke: "#000000",
                strokeThickness: 5,
              }
            ).setOrigin(0.5).setDepth(RENDER_DEPTH.HUD);

            this.tweens.add({
              targets: finalVictoryBanner,
              scale: { from: 0.7, to: 1.15 },
              duration: 500,
              yoyo: true,
              repeat: 1,
              onComplete: () => {
                finalVictoryBanner.destroy();
                this.triggerGrandVictory();
              },
            });
            return;
          }

          // Banner announcement
          const clearBanner = this.add.text(
            this.cameras.main.midPoint.x,
            this.cameras.main.midPoint.y - 50,
            "SALA LIMPA! PORTÃO DESBLOQUEADO",
            {
              fontSize: "18px",
              color: "#00ff88",
              fontStyle: "bold",
              stroke: "#000000",
              strokeThickness: 4,
            }
          ).setOrigin(0.5).setDepth(RENDER_DEPTH.HUD);

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
          const theme = self.runTheme || MAP_THEMES.lighting;
          const chestOpenKey = this.textures.exists(`theme_${theme.id}_chest_open_0`)
            ? `theme_${theme.id}_chest_open_0`
            : "chest_open";
          this.chestSprite.setTexture(chestOpenKey);
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

      private showFloatingText(
        x: number,
        y: number,
        text: string,
        color: string = "#ffffff",
        isCrit = false
      ) {
        if (!this.damageNumbersEnabled && color === "#ffffff") return;

        const spreadX = (Math.random() - 0.5) * 16;
        const label = this.add.text(x + spreadX, y, text, {
          fontSize: isCrit ? "14px" : "12px",
          color,
          fontStyle: "bold",
          stroke: "#000000",
          strokeThickness: isCrit ? 4 : 3,
        }).setOrigin(0.5).setDepth(25);

        if (isCrit) {
          label.setScale(1.3);
        }

        this.tweens.add({
          targets: label,
          y: y - 28,
          scale: isCrit ? 1.0 : 0.9,
          alpha: 0,
          duration: 950,
          onComplete: () => label.destroy(),
        });
      }


      private spawnProjectileImpact(x: number, y: number) {
        const b2 = this.vfxProfile.basic2;
        let textureKey = b2.impactTextureKey;
        if (!textureKey || !this.textures.exists(textureKey)) {
          textureKey = this.textures.exists("veemon_effects_hit_0")
            ? "veemon_effects_hit_0"
            : this.textures.exists("agumon_effect_mega_blast_0")
            ? "agumon_effect_mega_blast_0"
            : "";
        }
        if (!textureKey || !this.textures.exists(textureKey)) return;

        const impact = this.add.sprite(x, y, textureKey);
        impact.setScale(b2.impactScale || 1.0);
        impact.setDepth(15);
        if (b2.impactAnimKey && this.anims.exists(b2.impactAnimKey)) {
          impact.play(b2.impactAnimKey);
        }
        this.transientVfx.push(impact);
        this.tweens.add({
          targets: impact,
          alpha: 0,
          scale: (b2.impactScale || 1.0) * 1.25,
          duration: b2.impactDurationMs || 150,
          onComplete: () => {
            impact.destroy();
            this.transientVfx = this.transientVfx.filter((v) => v !== impact);
          },
        });
      }

      private spawnHitImpact(x: number, y: number) {
        const hitVfx = this.vfxProfile.hitImpact;
        let textureKey = hitVfx?.textureKey;
        if (!textureKey || !this.textures.exists(textureKey)) {
          textureKey = this.textures.exists("veemon_effects_hit_0")
            ? "veemon_effects_hit_0"
            : this.textures.exists("agumon_effect_mega_blast_0")
            ? "agumon_effect_mega_blast_0"
            : "";
        }
        if (!textureKey || !this.textures.exists(textureKey)) return;

        const impact = this.add.sprite(x, y, textureKey);
        impact.setScale(hitVfx?.scale || 0.9);
        impact.setDepth(16);
        if (hitVfx?.animKey && this.anims.exists(hitVfx.animKey)) {
          impact.play(hitVfx.animKey);
        }
        this.transientVfx.push(impact);
        this.tweens.add({
          targets: impact,
          alpha: 0,
          scale: (hitVfx?.scale || 0.9) * 1.2,
          duration: hitVfx?.durationMs || 140,
          onComplete: () => {
            impact.destroy();
            this.transientVfx = this.transientVfx.filter((v) => v !== impact);
          },
        });
      }

      private spawnHealEffect(x: number, y: number) {
        const healVfx = this.vfxProfile.heal;
        let textureKey = healVfx?.textureKey;
        if (!textureKey || !this.textures.exists(textureKey)) {
          textureKey = this.textures.exists("agumon_heal_0")
            ? "agumon_heal_0"
            : this.textures.exists("veemon_heal_0")
            ? "veemon_heal_0"
            : "";
        }
        if (!textureKey || !this.textures.exists(textureKey)) return;

        const healSprite = this.add.sprite(x, y, textureKey);
        healSprite.setScale(healVfx?.scale || 0.85);
        healSprite.setDepth(16);
        if (healVfx?.animKey && this.anims.exists(healVfx.animKey)) {
          healSprite.play(healVfx.animKey);
        }
        this.transientVfx.push(healSprite);
        this.tweens.add({
          targets: healSprite,
          y: y - 24,
          alpha: 0,
          duration: healVfx?.durationMs || 400,
          onComplete: () => {
            healSprite.destroy();
            this.transientVfx = this.transientVfx.filter((v) => v !== healSprite);
          },
        });
      }

      private spawnEnemyProjectile(
        x: number,
        y: number,
        targetX: number,
        targetY: number,
        damage: number,
        species = "veemon"
      ) {
        const angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
        const speed = 190;
        const normalizedSpecies = normalizeDigimonName(species);

        let textureKey = "veemon_projectile_laser_0";
        let animKey: string | undefined = "veemon_projectile_laser";
        let scale = 0.8;

        if (normalizedSpecies === "agumon" || normalizedSpecies.includes("greymon")) {
          textureKey = "agumon_projectile_dragon_0";
          animKey = "agumon_projectile_dragon";
          scale = 0.75;
        } else if (normalizedSpecies === "veemon" || normalizedSpecies.includes("xvmon")) {
          textureKey = "veemon_projectile_laser_0";
          animKey = "veemon_projectile_laser";
          scale = 0.85;
        }

        if (!this.textures.exists(textureKey)) {
          textureKey = this.textures.exists("veemon_projectile_laser_0")
            ? "veemon_projectile_laser_0"
            : this.textures.exists("agumon_projectile_dragon_0")
            ? "agumon_projectile_dragon_0"
            : "";
        }

        if (textureKey && this.textures.exists(textureKey)) {
          const sprite = this.add.sprite(x, y, textureKey);
          sprite.setRotation(angle);
          sprite.setScale(scale);
          sprite.setDepth(12);
          if (animKey && this.anims.exists(animKey)) {
            sprite.play(animKey);
          }
          this.enemyProjectiles.push({
            sprite,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            damage,
            distanceTraveled: 0,
            maxDistance: 450,
          });
        }
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
            this.spawnHitImpact(proj.sprite.x, proj.sprite.y);
          }

          if (hitWall || hitPlayer || proj.distanceTraveled >= proj.maxDistance) {
            if (!hitPlayer && (hitWall || proj.distanceTraveled >= proj.maxDistance)) {
              this.spawnProjectileImpact(proj.sprite.x, proj.sprite.y);
            }
            proj.sprite.destroy();
            this.enemyProjectiles.splice(i, 1);
          }
        }
      }

      private updateEnemies(time: number, delta: number) {
        const dt = delta / 1000;
        for (const enemy of this.enemies) {
          if (enemy.state === "dead" || !enemy.sprite.active) continue;

          // Process Status Effects (Burn, Slow, Shock)
          if (enemy.statusEffects && enemy.statusEffects.length > 0) {
            const effectResult = updateEntityStatusEffects(enemy.statusEffects, delta);
            enemy.statusEffects = effectResult.activeEffects;

            if (effectResult.damageToDeal > 0) {
              this.damageEnemy(enemy, effectResult.damageToDeal, false);
              this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 50, `-${effectResult.damageToDeal}`, "#ff6600");
            }

            if (effectResult.isStunned) {
              enemy.sprite.setAlpha(0.6);
              continue;
            } else if (enemy.sprite.alpha < 1.0) {
              enemy.sprite.setAlpha(1.0);
            }
          }

          const slowMult = enemy.statusEffects?.some((e) => e.type === "slow") ? 0.65 : 1.0;
          const currentSpeed = enemy.speed * slowMult;

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
              enemy.speed = Math.floor(enemy.speed * 1.35);
              this.triggerHitstop(60);
              if (this.screenShakeEnabled) {
                this.cameras.main.shake(300, 0.012);
              }
              const phaseName = enemy.bossDefinition ? enemy.bossDefinition.phases[1]?.name || "FÚRIA DIGITAL!" : "FÚRIA DIGITAL!";
              this.showFloatingText(enemy.sprite.x, enemy.sprite.y - 70, phaseName.toUpperCase(), "#ff2222", true);
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
                const nextX = enemy.sprite.x + Math.cos(angle) * currentSpeed * dt;
                const nextY = enemy.sprite.y + Math.sin(angle) * currentSpeed * dt;
                if (isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
                  enemy.sprite.x = nextX;
                  enemy.sprite.y = nextY;
                }
                if (enemy.currentAnimAction !== "walk" && !enemy.isAttacking) {
                  const walkKey = getEnemyAnimationKey(enemy.species, "walk");
                  if (this.anims.exists(walkKey) && enemy.sprite.anims.currentAnim?.key !== walkKey) {
                    enemy.sprite.play(walkKey);
                    enemy.currentAnimAction = "walk";
                  }
                }
              } else if (distToPlayer < 90) {
                // Retreat away from player
                const angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, enemy.sprite.x, enemy.sprite.y);
                const nextX = enemy.sprite.x + Math.cos(angle) * currentSpeed * dt;
                const nextY = enemy.sprite.y + Math.sin(angle) * currentSpeed * dt;
                if (isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
                  enemy.sprite.x = nextX;
                  enemy.sprite.y = nextY;
                }
                if (enemy.currentAnimAction !== "walk" && !enemy.isAttacking) {
                  const walkKey = getEnemyAnimationKey(enemy.species, "walk");
                  if (this.anims.exists(walkKey) && enemy.sprite.anims.currentAnim?.key !== walkKey) {
                    enemy.sprite.play(walkKey);
                    enemy.currentAnimAction = "walk";
                  }
                }
              }

              enemy.sprite.setFlipX(this.player.x < enemy.sprite.x);

              // Shoot projectile periodically
              if (time >= enemy.attackCooldown && distToPlayer <= 300) {
                enemy.attackCooldown = time + 2000;
                enemy.isAttacking = true;
                const atkKey = getEnemyAnimationKey(enemy.species, "attack_01");
                if (this.anims.exists(atkKey)) {
                  enemy.sprite.play(atkKey);
                  enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    enemy.isAttacking = false;
                    const idleKey = getEnemyAnimationKey(enemy.species, "idle");
                    if (enemy.sprite.active && this.anims.exists(idleKey) && enemy.state !== "dead") {
                      enemy.sprite.play(idleKey);
                      enemy.currentAnimAction = "idle";
                    }
                  });
                  const roomSnap = this.currentRoomNumber;
                  this.time.delayedCall(160, () => {
                    if (enemy.sprite.active && enemy.state !== "dead" && this.currentRoomNumber === roomSnap && !this.isTransitioning) {
                      this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y - 10, this.player.x, this.player.y - 15, enemy.attack, enemy.species);
                    }
                  });
                } else {
                  enemy.isAttacking = false;
                }
              }
            } else {
              enemy.state = "idle";
              if (enemy.currentAnimAction !== "idle" && !enemy.isAttacking) {
                const idleKey = getEnemyAnimationKey(enemy.species, "idle");
                if (this.anims.exists(idleKey) && enemy.sprite.anims.currentAnim?.key !== idleKey) {
                  enemy.sprite.play(idleKey);
                  enemy.currentAnimAction = "idle";
                }
              }
            }
          } else {
            // 2. Melee / Elite / Boss Movement & Attack
            if (distToPlayer < 520) {
              enemy.state = "chase";
              if (enemy.currentAnimAction !== "walk" && !enemy.isAttacking) {
                const walkKey = getEnemyAnimationKey(enemy.species, "walk");
                if (this.anims.exists(walkKey) && enemy.sprite.anims.currentAnim?.key !== walkKey) {
                  enemy.sprite.play(walkKey);
                  enemy.currentAnimAction = "walk";
                }
              }
              const angle = Phaser.Math.Angle.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
              const moveDist = currentSpeed * dt;

              const nextX = enemy.sprite.x + Math.cos(angle) * moveDist;
              const nextY = enemy.sprite.y + Math.sin(angle) * moveDist;

              const canMoveBoth = isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(nextX / TILE_SIZE), Math.floor(nextY / TILE_SIZE));
              if (canMoveBoth) {
                enemy.sprite.x = nextX;
                enemy.sprite.y = nextY;
              } else {
                // Wall sliding along independent axes
                if (isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(nextX / TILE_SIZE), Math.floor(enemy.sprite.y / TILE_SIZE))) {
                  enemy.sprite.x = nextX;
                } else if (isWalkable({ tiles: this.activeRoom.tiles } as any, Math.floor(enemy.sprite.x / TILE_SIZE), Math.floor(nextY / TILE_SIZE))) {
                  enemy.sprite.y = nextY;
                }
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
                enemy.isAttacking = true;
                const atkKey = getEnemyAnimationKey(enemy.species, "attack_01");
                if (this.anims.exists(atkKey)) {
                  enemy.sprite.play(atkKey);
                  enemy.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                    enemy.isAttacking = false;
                    const idleKey = getEnemyAnimationKey(enemy.species, "idle");
                    if (enemy.sprite.active && this.anims.exists(idleKey) && enemy.state !== "dead") {
                      enemy.sprite.play(idleKey);
                      enemy.currentAnimAction = "idle";
                    }
                  });

                  // Check hit upon attack impact frame (120ms) instead of instant damage on frame 0
                  const roomSnap = this.currentRoomNumber;
                  this.time.delayedCall(120, () => {
                    if (!enemy.sprite.active || enemy.state === "dead" || this.currentRoomNumber !== roomSnap || this.isTransitioning) return;
                    const currentDist = Phaser.Math.Distance.Between(enemy.sprite.x, enemy.sprite.y, this.player.x, this.player.y);
                    const maxHitDist = enemy.kind === "boss" ? 64 : 48;
                    if (currentDist <= maxHitDist) {
                      this.damagePlayer(enemy.attack);
                    }
                  });
                } else {
                  enemy.isAttacking = false;
                }

                // In Phase 2, boss also fires a 4-way projectile spread
                if (enemy.kind === "boss" && enemy.isEnraged) {
                  const offsets = [
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                  ];
                  for (const [ox, oy] of offsets) {
                    this.spawnEnemyProjectile(enemy.sprite.x, enemy.sprite.y, enemy.sprite.x + ox * 100, enemy.sprite.y + oy * 100, Math.round(enemy.attack * 0.8), enemy.species);
                  }
                }
              }
            } else {
              enemy.state = "idle";
              if (enemy.currentAnimAction !== "idle" && !enemy.isAttacking) {
                const idleKey = getEnemyAnimationKey(enemy.species, "idle");
                if (this.anims.exists(idleKey) && enemy.sprite.anims.currentAnim?.key !== idleKey) {
                  enemy.sprite.play(idleKey);
                  enemy.currentAnimAction = "idle";
                }
              }
            }
          }
        }
      }

      private damagePlayer(damage: number) {
        if (this.time.now < this.invulnerableUntil || this.isFinished || this.isTransitioning) return;

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
        if (this.screenShakeEnabled) {
          this.cameras.main.shake(120, 0.006);
        }

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

        const baseSpeed = this.partnerProfile?.baseSpeed || (options.input.stats.speed || 100);
        const speed = baseSpeed * 2.2 * this.modifiers.speedMultiplier;
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

          // Update facingDirection — horizontal axis takes priority in diagonals
          if (dx < 0) {
            this.facingDirection = "left";
          } else if (dx > 0) {
            this.facingDirection = "right";
          } else if (dy < 0) {
            this.facingDirection = "up";
          } else if (dy > 0) {
            this.facingDirection = "down";
          }

          // Sprite walk animation based on facing
          if (this.facingDirection === "left" && this.anims.exists("player-walk-left")) {
            this.player.setFlipX(false);
            this.player.play("player-walk-left", true);
          } else if (this.facingDirection === "right" && this.anims.exists("player-walk-right")) {
            this.player.setFlipX(false);
            this.player.play("player-walk-right", true);
          } else if (this.facingDirection === "up" && this.anims.exists("player-walk-up")) {
            this.player.setFlipX(false);
            this.player.play("player-walk-up", true);
          } else if (this.facingDirection === "down" && this.anims.exists("player-walk-down")) {
            this.player.setFlipX(false);
            this.player.play("player-walk-down", true);
          } else {
            // Fallback for 2-way Digimons (only left/right walk anims)
            const walkKey = (this.facingDirection === "left" || this.facingDirection === "up") ? "player-walk-left" : "player-walk-right";
            if (this.anims.exists(walkKey)) {
              this.player.play(walkKey, true);
            }
          }
        } else {
          // Idle — preserve facingDirection!
          if (this.anims.exists("player-idle") && this.player.anims.currentAnim?.key !== "player-idle") {
            this.player.play("player-idle", true);
            if (this.facingDirection === "left") {
              this.player.setFlipX(true);
            } else if (this.facingDirection === "right") {
              this.player.setFlipX(false);
            }
          }
        }
      }

      public advanceToNextRoom() {
        if (this.isTransitioning || this.isFinished) return;
        this.isTransitioning = true;

        this.cameras.main.fadeOut(250);
        this.time.delayedCall(250, () => {
          if (this.currentRoomNumber >= TOTAL_ROOMS) {
            // Room 50 complete - Grand Victory!
            this.cameras.main.fadeIn(200);
            this.isTransitioning = false;
            this.triggerGrandVictory();
            return;
          }

          this.currentRoomNumber += 1;
          self.currentRoomNumber = this.currentRoomNumber;
          self.currentRoomIndex = this.currentRoomNumber - 1;
          this.bossDefeated = false;
          this.loadRoom(this.currentRoomNumber);
          this.cameras.main.fadeIn(250);
          this.isTransitioning = false;
        });
      }

      private triggerGrandVictory() {
        if (this.isFinished) return;
        this.isFinished = true;
        if (this.anims.exists("player-victory")) {
          this.player.play("player-victory");
        }

        const victoryText = this.add.text(
          this.cameras.main.midPoint.x,
          this.cameras.main.midPoint.y - 40,
          `CAMINHO DIGITAL CONCLUÍDO!\nVOCÊ VENCEU TODAS AS ${TOTAL_ROOMS} SALAS!`,
          {
            fontSize: "26px",
            color: "#ffcc00",
            fontStyle: "bold",
            align: "center",
            stroke: "#000000",
            strokeThickness: 6,
          }
        ).setOrigin(0.5).setDepth(RENDER_DEPTH.HUD);

        this.tweens.add({
          targets: victoryText,
          scale: { from: 0.8, to: 1.2 },
          duration: 500,
          yoyo: true,
          repeat: 2,
          onComplete: () => {
            options.onSaveCheckpoint?.(TOTAL_ROOMS, TOTAL_ROOMS);
            options.onFinish({
              runId: options.input.runId,
              outcome: "victory",
              xp: this.playerXp + 500,
              coins: this.playerCoins + 250,
              itemsWon: {
                ...this.itemsWon,
                carne_digital: (this.itemsWon.carne_digital || 0) + 5,
                fruta_digital: (this.itemsWon.fruta_digital || 0) + 3,
              },
              alreadyAwardedXp: true,
            });
          },
        });
      }

      private triggerVictory() {
        this.triggerGrandVictory();
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
        ).setOrigin(0.5).setDepth(RENDER_DEPTH.HUD);

        this.time.delayedCall(1600, () => {
          options.onFinish({
            runId: options.input.runId,
            outcome: "defeat",
            xp: this.playerXp,
            coins: Math.floor(this.playerCoins * 0.5),
            alreadyAwardedXp: true,
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
    if (this.isStopped) {
      return false;
    }
    this.game = new Phaser.Game(config);
    return true;
  }

  stop() {
    console.log("[Phaser Runtime] DigitalPathGame.stop() called. Destroying game instance.");
    this.isStopped = true;
    if (typeof window !== "undefined") {
      (window as any).__digitalPathActiveScene = null;
    }
    if (this.game) {
      // Cleanup keyboard handlers before destroy to prevent listener leaks
      // that cause controls to stop working on respawn
      try {
        const scenes = this.game.scene?.scenes;
        if (scenes) {
          for (const scene of scenes) {
            if (scene?.input?.keyboard) {
              scene.input.keyboard.removeAllKeys(true);
              scene.input.keyboard.removeAllListeners();
            }
          }
        }
      } catch (_) {
        // Ignore errors during cleanup — game may already be partially destroyed
      }
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

  setSettings(settings: { screenShake?: boolean; damageNumbers?: boolean }) {
    if (this.activeScene) {
      if (typeof settings.screenShake === "boolean") {
        this.activeScene.screenShakeEnabled = settings.screenShake;
      }
      if (typeof settings.damageNumbers === "boolean") {
        this.activeScene.damageNumbersEnabled = settings.damageNumbers;
      }
    }
  }
}