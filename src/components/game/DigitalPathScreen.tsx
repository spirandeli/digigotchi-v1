import { useEffect, useRef, useState } from "react";
import { useGame } from "@/lib/pet/store";
import { getDigitalPathManifest } from "@/lib/digital-path/runtime/manifests";
import { DigitalPathGame } from "@/lib/digital-path/runtime/DigitalPathGame";
import { createRunInput } from "@/lib/pet/digital-path-bridge";
import type { UpgradeDefinition } from "@/lib/digital-path/combat/upgrades";
import type { EventChoice, ShopItem } from "@/lib/digital-path/runtime/types";
import { getSpeciesCombatProfile } from "@/lib/digital-path/combat/loadout";
import { xpToNext } from "@/lib/pet/engine";
import { DIGITAL_PATH_CONFIG } from "@/lib/digital-path/combat/bosses";

export function DigitalPathScreen() {
  const pet = useGame((s) => s.pet);
  const exitDigitalPath = useGame((s) => s.exitDigitalPath);

  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<DigitalPathGame | null>(null);

  // HUD State synced from Phaser runtime
  const [currentHp, setCurrentHp] = useState(100);
  const [maxHp, setMaxHp] = useState(100);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);
  const [roomIndex, setRoomIndex] = useState(1);
  const [totalRooms, setTotalRooms] = useState(6);
  const [roomTitle, setRoomTitle] = useState("Portal de Entrada");
  const [biome, setBiome] = useState("digital");
  const [floorNumber, setFloorNumber] = useState(1);
  const [isBossRoom, setIsBossRoom] = useState(false);
  const [screenShake, setScreenShake] = useState(true);
  const [damageNumbers, setDamageNumbers] = useState(true);


  // Boss Battle State
  const [bossInfo, setBossInfo] = useState<{
    isFighting: boolean;
    hp: number;
    maxHp: number;
    name: string;
    phase: number;
  }>({
    isFighting: false,
    hp: 1,
    maxHp: 1,
    name: "",
    phase: 1,
  });

  // Upgrades & Modifiers
  const [activeUpgrades, setActiveUpgrades] = useState<UpgradeDefinition[]>([]);

  // Cooldowns State for HUD
  const [cooldowns, setCooldowns] = useState({
    basic_1: 0,
    basic_2: 0,
    special: 0,
  });

  // Pause & Modals
  const [isPaused, setIsPaused] = useState(false);
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  const [showDebug, setShowDebug] = useState(false);

  // Interactive In-Run Modals
  const [upgradeDraft, setUpgradeDraft] = useState<{
    choices: UpgradeDefinition[];
    onSelect: (selected: UpgradeDefinition) => void;
  } | null>(null);

  const [eventModal, setEventModal] = useState<{
    choices: EventChoice[];
    onSelect: (choiceIndex: number) => void;
  } | null>(null);

  const [restModal, setRestModal] = useState<{
    onRestHp: () => void;
    onBuffAtk: () => void;
  } | null>(null);

  const [shopModal, setShopModal] = useState<{
    items: ShopItem[];
    onBuy: (item: ShopItem) => boolean;
    onClose: () => void;
  } | null>(null);

  const [runResult, setRunResult] = useState<{
    outcome: "victory" | "defeat" | "abandoned";
    xp: number;
    coins: number;
    itemsWon?: Readonly<Record<string, number>>;
  } | null>(null);

  const [unreadySpecies, setUnreadySpecies] = useState<string | null>(null);

  // 1. Initialize Run once on mount (decoupled from pet tick!)
  useEffect(() => {
    if (!pet || !containerRef.current) return;

    const manifest = getDigitalPathManifest(pet.speciesId);
    const effectiveRunInput = createRunInput(pet);
    if (!effectiveRunInput) {
      exitDigitalPath();
      return;
    }

    if (!manifest || !manifest.spriteReady) {
      setUnreadySpecies(pet.speciesId);
      return;
    }

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    const game = new DigitalPathGame();
    gameRef.current = game;

    setCurrentHp(effectiveRunInput.stats.health || 100);
    setMaxHp(effectiveRunInput.stats.health || 100);

    game
      .start({
        parent: containerRef.current,
        input: effectiveRunInput,
        manifest,
        originalSpeciesId: pet.speciesId,
        settings: {
          screenShake,
          damageNumbers,
        },
        seed: (Date.now() ^ Math.floor(Math.random() * 100000)) >>> 0,
        floorNumber: pet.digitalPath?.currentFloor || 1,
        onAwardXp: (speciesId, amount) => {
          useGame.getState().addDigimonXp(speciesId, amount);
        },
        onSaveCheckpoint: (nextFloor, bossDefeated) => {
          const currentDefeated = useGame.getState().pet?.digitalPath?.defeatedBosses ?? [];
          const newDefeated = bossDefeated ? Array.from(new Set([...currentDefeated, bossDefeated])) : currentDefeated;
          useGame.getState().saveDigitalPathProgress({
            currentFloor: Math.min(300, nextFloor),
            highestFloor: Math.max(nextFloor, useGame.getState().pet?.digitalPath?.highestFloor ?? 1),
            defeatedBosses: newDefeated,
            completed: nextFloor >= 300 && Boolean(bossDefeated && bossDefeated >= 300),
          });
        },

        onRoomChange: (rIndex, total, title, rBiome, floor, boss) => {
          setRoomIndex(rIndex);
          setTotalRooms(total);
          setRoomTitle(title);
          setBiome(rBiome || "digital");
          setFloorNumber(floor || 1);
          setIsBossRoom(!!boss);
        },
        onPlayerStatsChange: (stats) => {
          setCurrentHp(stats.currentHp);
          setMaxHp(stats.maxHp);
          setXp(stats.xp);
          setCoins(stats.coins);
          if (stats.isBossFighting) {
            setBossInfo({
              isFighting: true,
              hp: stats.bossHp || 0,
              maxHp: stats.bossMaxHp || 1,
              name: stats.bossName || "Guardião Digital",
              phase: stats.bossPhase || 1,
            });
          } else {
            setBossInfo((prev) => (prev.isFighting ? { ...prev, isFighting: false } : prev));
          }
        },
        onCooldownChange: (slot, remainingMs, _maxMs) => {
          setCooldowns((prev) => ({ ...prev, [slot]: remainingMs }));
          window.setTimeout(() => {
            setCooldowns((prev) => ({ ...prev, [slot]: 0 }));
          }, remainingMs);
        },
        onActiveUpgradesChange: (upgrades) => {
          setActiveUpgrades([...upgrades]);
        },
        onTriggerUpgradeDraft: (choices, onSelect) => {
          setUpgradeDraft({ choices, onSelect });
        },
        onTriggerEventModal: (choices, onSelect) => {
          setEventModal({ choices, onSelect });
        },
        onTriggerRestModal: (onRestHp, onBuffAtk) => {
          setRestModal({ onRestHp, onBuffAtk });
        },
        onTriggerShopModal: (items, onBuy, onClose) => {
          setShopModal({ items, onBuy, onClose });
        },
        onPauseToggle: (paused) => {
          setIsPaused(paused);
        },
        onFinish: (result) => {
          useGame.getState().applyDigitalPathResult(result);
          setRunResult({
            outcome: result.outcome,
            xp: result.xp,
            coins: result.coins,
            itemsWon: result.itemsWon,
          });
        },
      })
      .catch((err) => {
        console.error("Erro ao iniciar runtime do Caminho Digital:", err);
      });

    return () => {
      game.stop();
      gameRef.current = null;
    };
  }, []); // Run once on mount!

  // Keyboard shortcut listener for upgrade draft selection (1, 2, 3)
  useEffect(() => {
    if (!upgradeDraft) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "1" && upgradeDraft.choices[0]) {
        const choice = upgradeDraft.choices[0];
        setUpgradeDraft(null);
        upgradeDraft.onSelect(choice);
      } else if (e.key === "2" && upgradeDraft.choices[1]) {
        const choice = upgradeDraft.choices[1];
        setUpgradeDraft(null);
        upgradeDraft.onSelect(choice);
      } else if (e.key === "3" && upgradeDraft.choices[2]) {
        const choice = upgradeDraft.choices[2];
        setUpgradeDraft(null);
        upgradeDraft.onSelect(choice);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [upgradeDraft]);

  const handleAbandon = () => {
    if (gameRef.current) {
      gameRef.current.stop();
      gameRef.current = null;
    }
    const result = {
      runId: `abandon_${Date.now()}`,
      outcome: "abandoned" as const,
      xp: Math.floor(xp * 0.3),
      coins: Math.floor(coins * 0.3),
    };
    useGame.getState().applyDigitalPathResult(result);
    setRunResult(result);
  };

  const handleTogglePause = () => {
    setIsPaused((prev) => {
      const next = !prev;
      if (gameRef.current?.activeScene) {
        gameRef.current.activeScene.isPaused = next;
      }
      return next;
    });
  };

  const handleResume = () => {
    setIsPaused(false);
    if (gameRef.current?.activeScene) {
      gameRef.current.activeScene.isPaused = false;
    }
  };

  if (!pet) return null;

  const hpPercent = Math.max(0, Math.min(100, (currentHp / maxHp) * 100));
  const bossHpPercent = Math.max(0, Math.min(100, (bossInfo.hp / bossInfo.maxHp) * 100));

  const biomeBadgeStyle: Record<string, { label: string; color: string; border: string }> = {
    digital: { label: "Setor Digital", color: "text-cyan-400 bg-cyan-950/60", border: "border-cyan-500/40" },
    fire: { label: "Fenda Vulcânica", color: "text-orange-400 bg-orange-950/60", border: "border-orange-500/40" },
    storm: { label: "Domínio da Tempestade", color: "text-yellow-400 bg-yellow-950/60", border: "border-yellow-500/40" },
    ice: { label: "Glaciar de Dados", color: "text-blue-300 bg-blue-950/60", border: "border-blue-400/40" },
  };

  const currentBiomeBadge = biomeBadgeStyle[biome] || biomeBadgeStyle.digital;

  const combatProfile = getSpeciesCombatProfile(pet.speciesId);
  const speciesEmoji = pet.speciesId.includes("veemon") ? "⚡" : pet.speciesId.includes("gabumon") ? "🐺" : "🦖";
  if (unreadySpecies) {
    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-950 font-sans text-slate-100 select-none p-6 text-center">
        <div className="w-full max-w-md rounded-2xl border border-amber-500/40 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-md">
          <div className="text-4xl mb-3">📁</div>
          <h2 className="text-lg font-bold text-white mb-2">Estrutura Pronta — Sprites Pendentes</h2>
          <p className="text-sm text-neutral-300 mb-3">
            A estrutura de pastas para <span className="font-semibold text-amber-400 capitalize">{unreadySpecies}</span> já está padronizada em:
          </p>
          <div className="bg-black/60 px-3 py-2 rounded text-xs font-mono text-amber-300 break-all mb-4">
            public/sprites/{unreadySpecies}/
          </div>
          <p className="text-xs text-neutral-400 mb-6 leading-relaxed">
            O Caminho Digital estará disponível para este personagem assim que as animações forem adicionadas às respectivas pastas.
          </p>
          <button
            type="button"
            onClick={exitDigitalPath}
            className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-lg transition cursor-pointer"
          >
            Voltar ao Hub
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-slate-950 font-sans text-slate-100 select-none">
      {/* 1. Fixed Top HUD */}
      <header className="z-30 flex h-16 w-full items-center justify-between border-b border-cyan-500/20 bg-slate-950/90 px-4 backdrop-blur-md">
        {/* Left: Pet & Vital Stats */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/50">
              <span className="text-xl">{speciesEmoji}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-wide text-cyan-300 uppercase">{pet.nickname}</span>
                <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-xs font-bold text-cyan-300">
                  Lv. {pet.level}
                </span>
              </div>
              <span className="text-[11px] text-purple-300 font-medium">
                XP {pet.experience} / {xpToNext(pet.level)}
              </span>
            </div>
          </div>

          {/* HP Bar */}
          <div className="w-36 sm:w-48">
            <div className="flex justify-between text-[11px] font-semibold">
              <span className="text-emerald-400">HP</span>
              <span className="text-slate-300">
                {currentHp}/{maxHp}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full transition-all duration-300 ${
                  hpPercent <= 25
                    ? "bg-gradient-to-r from-red-600 to-rose-500 animate-pulse"
                    : "bg-gradient-to-r from-emerald-500 to-teal-400"
                }`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>

          {/* In-Run Bits */}
          <div className="hidden items-center gap-3 text-xs sm:flex">
            <div className="rounded border border-amber-500/20 bg-amber-950/40 px-2 py-1 font-semibold text-amber-300">
              🪙 {coins} Bits
            </div>
          </div>
        </div>

        {/* Center: Digital Path Room & Boss Area Indicator */}
        <div className="hidden flex-col items-center md:flex">
          <div className="flex items-center gap-2">
            {isBossRoom ? (
              <div className="rounded-full border border-red-500/60 bg-red-950/90 px-3 py-1 text-xs font-black tracking-wider text-red-300 animate-pulse flex items-center gap-1.5 shadow-lg shadow-red-900/40">
                <span>⚠️ SALA {roomIndex} / {totalRooms || 300}</span>
                <span className="rounded bg-red-600/40 px-1.5 py-0.2 text-[10px] text-red-100 uppercase">ÁREA DE CHEFE</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold tracking-wider ${currentBiomeBadge.color} ${currentBiomeBadge.border}`}>
                  {currentBiomeBadge.label}
                </span>
                <div className="rounded-full border border-cyan-500/40 bg-cyan-950/70 px-3 py-0.5 text-xs font-bold tracking-wider text-cyan-300">
                  CAMINHO DIGITAL • SALA {roomIndex} / {totalRooms || 300}
                </div>
                <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300 font-semibold">
                  Inimigos Lv. ~{roomIndex}
                </span>
              </div>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-400">
            <span>{roomTitle}</span>
            <span>•</span>
            <span className="text-amber-400 font-medium">
              Bosses derrotados: {pet.digitalPath?.defeatedBosses?.length ?? 0} / {Math.floor((totalRooms || 300) / 10)}
            </span>
          </div>
        </div>

        {/* Right: Controls Guide, Cooldowns, Pause & Abandon */}
        <div className="flex items-center gap-3">
          {/* Skill Indicators */}
          <div className="hidden items-center gap-1.5 lg:flex">
            <div
              className={`flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${
                cooldowns.basic_1 > 0
                  ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60"
                  : "border-cyan-500/30 bg-cyan-950/40 text-cyan-300"
              }`}
            >
              <kbd className="rounded bg-black/40 px-1 text-[10px]">J/Espaço</kbd>
              <span>{combatProfile.basic1.name}</span>
            </div>

            <div
              className={`flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${
                cooldowns.basic_2 > 0
                  ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60"
                  : "border-amber-500/30 bg-amber-950/40 text-amber-300"
              }`}
            >
              <kbd className="rounded bg-black/40 px-1 text-[10px]">K</kbd>
              <span>{combatProfile.basic2.name}</span>
            </div>

            <div
              className={`flex items-center gap-1 rounded border px-2 py-1 text-xs transition-colors ${
                cooldowns.special > 0
                  ? "border-slate-700 bg-slate-900 text-slate-500 opacity-60"
                  : "border-rose-500/30 bg-rose-950/40 text-rose-300"
              }`}
            >
              <kbd className="rounded bg-black/40 px-1 text-[10px]">L</kbd>
              <span>{combatProfile.special.name}</span>
            </div>
          </div>


          {/* Pause Button */}
          <button
            onClick={handleTogglePause}
            className="rounded border border-cyan-500/30 bg-slate-900 px-2.5 py-1 text-xs font-semibold text-cyan-300 hover:bg-slate-800 transition-colors"
            title="Pausar jogo (ESC)"
          >
            ⏸ ESC
          </button>

          {/* Abandon Button */}
          <button
            onClick={() => setConfirmAbandon(true)}
            className="rounded border border-red-500/40 bg-red-950/30 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-900/40 hover:text-red-100 transition-colors"
          >
            Abandonar
          </button>
        </div>
      </header>

      {/* 2. Fullscreen Phaser Game Container */}
      <main className="relative flex-1 w-full overflow-hidden bg-black">
        <div ref={containerRef} id="digital-path-canvas-area" className="h-full w-full" />

        {/* Boss HP Bar Overlay (Top Center) */}
        {bossInfo.isFighting && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-80 sm:w-96 rounded-xl border border-red-500/40 bg-slate-950/90 p-3 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-bold text-red-400">
              <span className="tracking-wide">
                {bossInfo.name} {bossInfo.phase > 1 ? "⚡ FASE 2: FÚRIA" : ""}
              </span>
              <span className="text-slate-300">
                {bossInfo.hp}/{bossInfo.maxHp}
              </span>
            </div>
            <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-800 border border-red-900/60">
              <div
                className={`h-full transition-all duration-200 ${
                  bossInfo.phase > 1
                    ? "bg-gradient-to-r from-red-600 via-orange-500 to-amber-400 animate-pulse"
                    : "bg-gradient-to-r from-red-600 to-rose-400"
                }`}
                style={{ width: `${bossHpPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Active Upgrades Tray (Bottom Left) */}
        {activeUpgrades.length > 0 && (
          <div className="absolute bottom-4 left-4 z-20 flex flex-wrap items-center gap-1.5 rounded-xl border border-cyan-500/20 bg-slate-950/80 p-2 backdrop-blur-md max-w-sm">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider pr-1">Módulos:</span>
            {activeUpgrades.map((u, i) => (
              <div
                key={`${u.id}-${i}`}
                className="group relative flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-sm shadow-sm cursor-help hover:border-cyan-400 transition-colors"
              >
                <span>{u.icon}</span>
                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute bottom-9 left-0 hidden group-hover:block z-30 w-48 rounded-lg border border-cyan-500/40 bg-slate-950 p-2 text-left shadow-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300">{u.name}</span>
                    <span className="text-[9px] font-semibold text-amber-400 uppercase">{u.rarity}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300 leading-tight">{u.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Debug Toggle (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setShowDebug((v) => !v)}
            className="rounded border border-slate-700 bg-slate-900/80 px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-cyan-300 backdrop-blur-sm"
          >
            🛠️ Debug
          </button>
        </div>

        {/* Debug Controls Panel */}
        {showDebug && (
          <div className="absolute bottom-12 right-4 z-30 w-64 rounded-xl border border-cyan-500/30 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-md text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
              <span className="font-bold text-cyan-300">Controles de Teste</span>
              <button onClick={() => setShowDebug(false)} className="text-slate-500 hover:text-slate-200">✕</button>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => gameRef.current?.skipRoom()}
                className="rounded bg-cyan-950 border border-cyan-500/30 px-2 py-1 font-semibold text-cyan-300 hover:bg-cyan-900"
              >
                ⏩ Pular Sala (Avançar)
              </button>
              <button
                onClick={() => gameRef.current?.healPlayer(50)}
                className="rounded bg-emerald-950 border border-emerald-500/30 px-2 py-1 font-semibold text-emerald-300 hover:bg-emerald-900"
              >
                💚 Curar +50 HP
              </button>
              <button
                onClick={() => gameRef.current?.addCoins(50)}
                className="rounded bg-amber-950 border border-amber-500/30 px-2 py-1 font-semibold text-amber-300 hover:bg-amber-900"
              >
                🪙 Adicionar +50 Bits
              </button>
              <button
                onClick={() => gameRef.current?.togglePause()}
                className="rounded bg-slate-800 border border-slate-700 px-2 py-1 font-semibold text-slate-300 hover:bg-slate-700"
              >
                ⏸ Pausar / Despausar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 3. Modal Escolha de Upgrade (Draft 1 de 3) */}
      {upgradeDraft && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-2xl">
            <div className="text-center">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-950/60 px-3 py-1 text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Recompensa de Dados
              </span>
              <h2 className="mt-2 text-2xl font-black tracking-wide text-white">
                ESCOLHA UM MÓDULO DE EXPEDIÇÃO
              </h2>
              <p className="mt-1 text-sm text-slate-300">
                Selecione um dos microchips abaixo para aprimorar seu parceiro pelo restante desta run.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {upgradeDraft.choices.map((choice, idx) => {
                const rarityColor =
                  choice.rarity === "epic"
                    ? "border-amber-400 bg-gradient-to-b from-amber-950/40 to-slate-900 shadow-amber-900/30 text-amber-300"
                    : choice.rarity === "rare"
                    ? "border-purple-400 bg-gradient-to-b from-purple-950/40 to-slate-900 shadow-purple-900/30 text-purple-300"
                    : "border-cyan-500/40 bg-gradient-to-b from-cyan-950/40 to-slate-900 shadow-cyan-900/20 text-cyan-300";

                return (
                  <div
                    key={choice.id}
                    onClick={() => {
                      const sel = choice;
                      setUpgradeDraft(null);
                      sel && upgradeDraft.onSelect(sel);
                    }}
                    className={`group relative flex flex-col justify-between rounded-xl border p-4 shadow-lg cursor-pointer transition-all duration-200 hover:scale-105 hover:border-white ${rarityColor}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">{choice.icon}</span>
                        <span className="rounded bg-black/40 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                          {choice.rarity}
                        </span>
                      </div>
                      <h3 className="mt-2 font-bold text-white text-base group-hover:text-cyan-200">
                        {choice.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-300 leading-relaxed">
                        {choice.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">Atalho [{idx + 1}]</span>
                      <span className="rounded bg-cyan-500/20 px-2 py-1 text-[11px] font-bold text-cyan-300 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                        Instalar
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal de Evento Anomalia de Dados */}
      {eventModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-purple-500/40 bg-slate-950 p-6 shadow-2xl">
            <div className="text-center">
              <span className="text-4xl">📟</span>
              <h2 className="mt-2 text-2xl font-black tracking-wide text-purple-300">
                TERMINAL DE ANOMALIA DETECTADO
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Um fluxo de dados instável foi interceptado pelo Digivice. Escolha como seu Digimon deve interagir com o fluxo:
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              {eventModal.choices.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => {
                    setEventModal(null);
                    eventModal.onSelect(idx);
                  }}
                  className="flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-950/30 p-3.5 text-left transition-all hover:border-purple-400 hover:bg-purple-900/40"
                >
                  <div>
                    <h4 className="font-bold text-purple-200 text-sm">{c.title}</h4>
                    <p className="text-xs text-slate-300 mt-0.5">{c.description}</p>
                  </div>
                  <span className="text-xl">➔</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Modal Nó de Descanso */}
      {restModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-emerald-500/40 bg-slate-950 p-6 shadow-2xl text-center">
            <span className="text-4xl">🏕️</span>
            <h2 className="mt-2 text-2xl font-black tracking-wide text-emerald-400">
              NÓ DE RESTAURAÇÃO
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Uma zona segura e serena restaura o fluxo de dados do seu parceiro. O que deseja fazer?
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setRestModal(null);
                  restModal.onRestHp();
                }}
                className="flex flex-col items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 transition-all hover:scale-105 hover:bg-emerald-900/40"
              >
                <span className="text-3xl">💚</span>
                <span className="mt-2 font-bold text-emerald-300 text-sm">Descanso Profundo</span>
                <span className="text-xs text-slate-400 mt-1">+50 Pontos de Vida</span>
              </button>

              <button
                onClick={() => {
                  setRestModal(null);
                  restModal.onBuffAtk();
                }}
                className="flex flex-col items-center justify-center rounded-xl border border-amber-500/30 bg-amber-950/30 p-4 transition-all hover:scale-105 hover:bg-amber-900/40"
              >
                <span className="text-3xl">⚔️</span>
                <span className="mt-2 font-bold text-amber-300 text-sm">Calibrar Ataque</span>
                <span className="text-xs text-slate-400 mt-1">+15% Dano de Ataque</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal Loja / Terminal de Bits */}
      {shopModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-amber-500/40 bg-slate-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏪</span>
                <div>
                  <h3 className="font-bold text-amber-300 text-base">Terminal de Compras</h3>
                  <span className="text-xs text-slate-400">Troque seus Bits minerados</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-950/40 px-3 py-1 text-sm font-bold text-amber-300">
                <span>🪙</span>
                <span>{coins} Bits</span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5">
              {shopModal.items.map((item) => {
                const canAfford = coins >= item.price;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <span className="font-bold text-white text-sm">{item.name}</span>
                        <p className="text-xs text-slate-400">{item.description}</p>
                      </div>
                    </div>
                    <button
                      disabled={!canAfford}
                      onClick={() => {
                        shopModal.onBuy(item);
                      }}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                        canAfford
                          ? "bg-amber-500 text-black hover:bg-amber-400"
                          : "bg-slate-800 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      🪙 {item.price}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  setShopModal(null);
                  shopModal.onClose();
                }}
                className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                Voltar à Exploração
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Modal de Pause (ESC) */}
      {isPaused && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl border border-cyan-500/30 bg-slate-900 p-6 shadow-2xl text-center">
            <h3 className="text-xl font-bold text-cyan-300">JOGO PAUSADO</h3>
            <p className="mt-1 text-xs text-slate-400">Pressione ESC para retornar à ação</p>

            <div className="my-5 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Movimentação:</span>
                <span className="font-semibold text-white">W, A, S, D ou Setas</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Golpe Básico:</span>
                <span className="font-semibold text-white">J ou Barra de Espaço</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Disparo Digital:</span>
                <span className="font-semibold text-white">K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Ataque Especial:</span>
                <span className="font-semibold text-white">L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Interagir:</span>
                <span className="font-semibold text-white">E</span>
              </div>
            </div>

            {/* Run Settings */}
            <div className="my-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-left text-xs text-slate-300 space-y-2">
              <span className="font-bold text-cyan-400 block mb-1 uppercase tracking-wider text-[10px]">Configurações da Run</span>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Tremor de Tela (Shake)</span>
                <input
                  type="checkbox"
                  checked={screenShake}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setScreenShake(val);
                    gameRef.current?.setSettings({ screenShake: val });
                  }}
                  className="rounded border-slate-700 bg-slate-800 text-cyan-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span>Números de Dano (Damage Numbers)</span>
                <input
                  type="checkbox"
                  checked={damageNumbers}
                  onChange={(e) => {
                    const val = e.target.checked;
                    setDamageNumbers(val);
                    gameRef.current?.setSettings({ damageNumbers: val });
                  }}
                  className="rounded border-slate-700 bg-slate-800 text-cyan-500"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen().catch(() => {});
                  } else {
                    document.exitFullscreen().catch(() => {});
                  }
                }}
                className="w-full mt-1 rounded-lg border border-slate-700 bg-slate-900 py-1.5 text-center text-[11px] font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
              >
                ⛶ Alternar Tela Cheia
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button
                id="btn-resume-expedition"
                onClick={handleResume}
                className="w-full rounded-xl bg-cyan-600 py-2.5 text-xs font-bold text-white hover:bg-cyan-500 transition-colors"
              >
                Continuar Expedição
              </button>
              <button
                onClick={() => setConfirmAbandon(true)}
                className="w-full rounded-xl border border-red-500/40 bg-red-950/30 py-2 text-xs font-semibold text-red-300 hover:bg-red-900/40 transition-colors"
              >
                Abandonar Run
              </button>
            </div>
          </div>
        </div>
      )}


      {/* 8. Modal Confirmar Abandono */}
      {confirmAbandon && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-red-400">Abandonar Expedição?</h3>
            <p className="mt-2 text-sm text-slate-300">
              Você retornará ao Tamagotchi e manterá apenas uma fração dos recursos obtidos nesta run.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setConfirmAbandon(false)}
                className="rounded px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Continuar Jogando
              </button>
              <button
                onClick={() => {
                  setConfirmAbandon(false);
                  handleAbandon();
                }}
                className="rounded bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
              >
                Confirmar Saída
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Modal Resultado Final */}
      {runResult && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-2xl border border-cyan-500/30 bg-slate-900 p-8 text-center shadow-2xl">
            {runResult.outcome === "victory" ? (
              roomIndex >= (totalRooms || 300) || floorNumber >= (totalRooms || 300) ? (
                <>
                  <div className="text-5xl animate-bounce">👑</div>
                  <h2 className="mt-3 text-2xl font-black tracking-wide text-amber-300">
                    CAMINHO DIGITAL CONCLUÍDO!
                  </h2>
                  <p className="mt-1 text-sm text-slate-200 font-medium">
                    Você venceu todas as {totalRooms || 300} salas da expedição e derrotou o Chefe Final!
                  </p>
                  <div className="my-3 rounded-lg bg-amber-500/20 border border-amber-500/40 p-2.5 text-xs text-amber-200">
                    ✨ Parabéns! O Caminho Digital foi totalmente purificado.
                  </div>
                </>
              ) : (
                <>
                  <div className="text-5xl">🏆</div>
                  <h2 className="mt-3 text-2xl font-black tracking-wide text-emerald-400">
                    SALA {roomIndex} CONCLUÍDA!
                  </h2>
                  <p className="mt-1 text-sm text-slate-300">
                    O setor foi purificado com sucesso pelo seu Digimon!
                  </p>
                </>
              )
            ) : runResult.outcome === "defeat" ? (
              <>
                <div className="text-5xl">💀</div>
                <h2 className="mt-3 text-2xl font-black tracking-wide text-red-400">
                  DIGIMON EXAUSTO
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  Seu Digimon foi derrotado, mas aprendeu com a experiência.
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl">🚪</div>
                <h2 className="mt-3 text-2xl font-black tracking-wide text-amber-400">
                  RETORNO TÁTICO
                </h2>
                <p className="mt-1 text-sm text-slate-300">
                  A expedição foi encerrada antecipadamente.
                </p>
              </>
            )}

            <div className="mt-6 flex justify-center gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">XP Ganho</span>
                <span className="text-xl font-black text-purple-400">+{runResult.xp}</span>
              </div>
              <div className="w-px bg-slate-800" />
              <div>
                <span className="block text-[11px] font-semibold text-slate-400 uppercase">Bits</span>
                <span className="text-xl font-black text-amber-400">+{runResult.coins}</span>
              </div>
            </div>

            {runResult.itemsWon && Object.keys(runResult.itemsWon).length > 0 && (
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3 text-xs text-emerald-300">
                <span className="font-bold block mb-1">🎁 Itens Enviados ao Tamagotchi:</span>
                <div className="flex justify-center gap-3">
                  {Object.entries(runResult.itemsWon).map(([id, count]) => (
                    <span key={id} className="rounded bg-black/40 px-2 py-0.5 font-semibold">
                      +{count} {id.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => exitDigitalPath()}
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-bold text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all"
            >
              Retornar ao Tamagotchi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
