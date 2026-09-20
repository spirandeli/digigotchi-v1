#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const SPRITES_ROOT = path.join(ROOT_DIR, "public", "sprites");

/**
 * Estrutura oficial canônica baseada na referência funcional do Veemon.
 */
export const CANONICAL_DIGIMON_DIRECTORIES = [
  "_raw",
  "spritesheets",
  // Virtual Pet / Tamagotchi
  "idle",
  "eat",
  "sleep",
  "wake",
  "play",
  "clean",
  "heal",
  "evolution",
  // Caminho Digital - Movimento
  "walk",
  "walk/down",
  "walk/left",
  "walk/right",
  "walk/up",
  "run",
  "run/left",
  "run/right",
  // Caminho Digital - Combate
  "attacks",
  "attacks/basic_1",
  "attacks/basic_2",
  "attacks/special",
  "attack_01",
  "special_attack",
  "hit",
  "death",
  "victory",
  // Projéteis e Efeitos Visuais
  "projectiles",
  "effects",
  "effects/attack_01",
  "effects/attack_02",
  "effects/special_attack",
  "effects/hit",
];

export function createDigimonSpriteStructure(speciesName, options = { verbose: true }) {
  if (!speciesName || typeof speciesName !== "string") {
    throw new Error("Nome do Digimon inválido.");
  }

  const normalized = speciesName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  const targetBaseDir = path.join(SPRITES_ROOT, normalized);

  if (!fs.existsSync(targetBaseDir)) {
    fs.mkdirSync(targetBaseDir, { recursive: true });
    if (options.verbose) {
      console.log(`[CRIADO] Diretório base: public/sprites/${normalized}/`);
    }
  }

  let createdDirsCount = 0;
  let gitkeepsAddedCount = 0;

  for (const subDir of CANONICAL_DIGIMON_DIRECTORIES) {
    const fullDirPath = path.join(targetBaseDir, subDir);
    let wasCreated = false;

    if (!fs.existsSync(fullDirPath)) {
      fs.mkdirSync(fullDirPath, { recursive: true });
      createdDirsCount++;
      wasCreated = true;
      if (options.verbose) {
        console.log(`[CRIADO] ${path.relative(ROOT_DIR, fullDirPath)}/`);
      }
    }

    // Se o diretório estiver vazio (0 arquivos), adicionar .gitkeep
    const entries = fs.readdirSync(fullDirPath);
    if (entries.length === 0) {
      const gitkeepPath = path.join(fullDirPath, ".gitkeep");
      fs.writeFileSync(gitkeepPath, "");
      gitkeepsAddedCount++;
      if (options.verbose) {
        console.log(`  └─ Adicionado .gitkeep em ${subDir}`);
      }
    }
  }

  // Symlink de compatibilidade Tamagotchi: evolve -> evolution
  const evolveLink = path.join(targetBaseDir, "evolve");
  if (!fs.existsSync(evolveLink)) {
    try {
      fs.symlinkSync("evolution", evolveLink);
      if (options.verbose) {
        console.log(`[SYMLINK] Criado evolve -> evolution em public/sprites/${normalized}/`);
      }
    } catch (err) {
      // Caso o SO restrinja symlinks, cria pasta normal ou ignora
      if (options.verbose) {
        console.warn(`[AVISO] Não foi possível criar symlink evolve: ${err.message}`);
      }
    }
  }

  if (options.verbose) {
    console.log(`\nConcluído para '${normalized}': ${createdDirsCount} pastas criadas, ${gitkeepsAddedCount} .gitkeep adicionados.`);
  }

  return { targetBaseDir, createdDirsCount, gitkeepsAddedCount };
}

// Execução direta por linha de comando
if (process.argv[1] === __filename) {
  const targetSpecies = process.argv[2];
  if (!targetSpecies) {
    console.error("Uso: node scripts/create-digimon-sprite-structure.mjs <nome_do_digimon>");
    process.exit(1);
  }

  try {
    createDigimonSpriteStructure(targetSpecies, { verbose: true });
  } catch (err) {
    console.error(`Erro: ${err.message}`);
    process.exit(1);
  }
}
