import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const ROUGUELIKE_DIR = path.join(ROOT, 'rougue-like-character-sprites');
const ANIMATED_DIR = path.join(ROOT, 'public/sprites/animated');
const KEYFRAMES_DIR = path.join(ROOT, 'public/sprites/keyframes');
const SHEETS_DIR = path.join(ROOT, 'public/sprite-sheets');
const TARGET_SPRITES_DIR = path.join(ROOT, 'public/sprites');

const SPECIES_LIST = [
  'agumon',
  'veemon',
  'gabumon',
  'flamedramon',
  'garurumon',
  'geogreymon',
  'etemon',
  'metaletemon',
  'wargreymon',
  'weregarurumon',
  'xvmon',
  'kingetemon',
];

// Helper to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper to copy file
function copyFileSafe(src, dest) {
  if (!fs.existsSync(src)) return false;
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return true;
}

// Helper to copy directory recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) return 0;
  ensureDir(dest);
  let count = 0;
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      count += copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      count++;
    }
  }
  return count;
}

console.log('--- STARTING UNIFIED SPRITE MIGRATION ---');

const migrationStats = {};

for (const species of SPECIES_LIST) {
  console.log(`\nMigrating species: ${species}...`);
  const speciesTarget = path.join(TARGET_SPRITES_DIR, species);
  ensureDir(speciesTarget);

  let migratedFiles = 0;

  // 1. Migrate Spritesheet
  const sheetSrc = path.join(SHEETS_DIR, `${species}.png`);
  if (fs.existsSync(sheetSrc)) {
    const sheetDest = path.join(speciesTarget, 'spritesheets', `${species}.png`);
    if (copyFileSafe(sheetSrc, sheetDest)) {
      migratedFiles++;
      console.log(`  ✓ Spritesheet: ${species}.png`);
    }
  }

  // 2. Migrate Portrait / Base sprite
  const portraitSrc = path.join(TARGET_SPRITES_DIR, `${species}.png`);
  if (fs.existsSync(portraitSrc)) {
    copyFileSafe(portraitSrc, path.join(speciesTarget, `${species}.png`));
    copyFileSafe(portraitSrc, path.join(speciesTarget, 'portrait.png'));
    console.log(`  ✓ Portrait copied to ${species}/${species}.png`);
  }

  // 3. Migrate from rougue-like-character-sprites
  // Note: for wargreymon, the old folder was 'wargeymon'
  const rlFolderName = species === 'wargreymon' ? 'wargeymon' : species;
  const rlSpeciesDir = path.join(ROUGUELIKE_DIR, rlFolderName);

  if (fs.existsSync(rlSpeciesDir)) {
    // Copy all structured subfolders from rougue-like
    for (const entry of fs.readdirSync(rlSpeciesDir, { withFileTypes: true })) {
      const srcSub = path.join(rlSpeciesDir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name.startsWith('_legacy') || entry.name.startsWith('_review')) {
          // preserve legacy/review in _archive
          const destSub = path.join(speciesTarget, '_archive', entry.name);
          migratedFiles += copyDirRecursive(srcSub, destSub);
        } else {
          const destSub = path.join(speciesTarget, entry.name);
          migratedFiles += copyDirRecursive(srcSub, destSub);
        }
      } else if (entry.name.endsWith('.png')) {
        // Raw loose files (e.g. sprite_0000.png) -> move to _raw/
        const destRaw = path.join(speciesTarget, '_raw', entry.name);
        copyFileSafe(srcSub, destRaw);
        migratedFiles++;
      }
    }
    console.log(`  ✓ Migrated rougue-like folders & raw files`);
  }

  // 4. Migrate Tamagotchi actions from animated/
  const animatedSpeciesDir = path.join(ANIMATED_DIR, species);
  if (fs.existsSync(animatedSpeciesDir)) {
    for (const actionEntry of fs.readdirSync(animatedSpeciesDir, { withFileTypes: true })) {
      if (!actionEntry.isDirectory() || actionEntry.name.startsWith('_')) continue;
      const actionName = actionEntry.name;
      const srcActionDir = path.join(animatedSpeciesDir, actionName);

      // Normalize action name
      let normalizedAction = actionName;
      if (actionName === 'evolve') normalizedAction = 'evolution';
      else if (actionName.startsWith('attack-')) normalizedAction = actionName; // keep signature or attack_01

      const targetActionDir = path.join(speciesTarget, normalizedAction);
      ensureDir(targetActionDir);

      const files = fs.readdirSync(srcActionDir).filter((f) => f.endsWith('.png')).sort();

      // If idle already has files from rougue-like (e.g. agumon 9 frames, veemon 4 frames),
      // we preserve those as canonical idle_01.png and also provide 00.png symlinks/aliases
      const isIdle = normalizedAction === 'idle';
      const hasExistingIdle = isIdle && fs.existsSync(path.join(speciesTarget, 'idle', 'idle_01.png'));

      if (hasExistingIdle) {
        console.log(`  ℹ ${species} idle already has canonical Roguelike frames; preserving single source of truth.`);
        // Ensure 00.png ... aliases point to idle_01.png ... so old pet loaders never 404
        const existingIdleFrames = fs.readdirSync(path.join(speciesTarget, 'idle')).filter((f) => f.startsWith('idle_')).sort();
        existingIdleFrames.forEach((frame, idx) => {
          const aliasPad = String(idx).padStart(2, '0') + '.png';
          const aliasPath = path.join(speciesTarget, 'idle', aliasPad);
          if (!fs.existsSync(aliasPath)) {
            fs.copyFileSync(path.join(speciesTarget, 'idle', frame), aliasPath);
          }
        });
      } else {
        // Copy frames with both naming conventions:
        // 1. normalized action_01.png, action_02.png, ...
        // 2. 00.png, 01.png, ... for backward compatibility
        files.forEach((file, index) => {
          const srcFile = path.join(srcActionDir, file);
          const num = String(index + 1).padStart(2, '0');
          const normalizedName = `${normalizedAction}_${num}.png`;
          const destNormalized = path.join(targetActionDir, normalizedName);
          const destCompat = path.join(targetActionDir, file);

          copyFileSafe(srcFile, destNormalized);
          copyFileSafe(srcFile, destCompat);
          migratedFiles += 2;
        });

        // Also if normalizedAction === 'idle', ensure idle_01.png exists
        if (isIdle) {
          files.forEach((file, index) => {
            const srcFile = path.join(srcActionDir, file);
            const num = String(index + 1).padStart(2, '0');
            const idleFrame = path.join(speciesTarget, 'idle', `idle_${num}.png`);
            copyFileSafe(srcFile, idleFrame);
          });
        }
      }

      // If action is attack-..., also mirror to attack_01 if attack_01 is empty
      if (normalizedAction.startsWith('attack-')) {
        const attack01Dir = path.join(speciesTarget, 'attack_01');
        if (!fs.existsSync(attack01Dir) || fs.readdirSync(attack01Dir).length === 0) {
          ensureDir(attack01Dir);
          files.forEach((file, index) => {
            const srcFile = path.join(srcActionDir, file);
            const num = String(index + 1).padStart(2, '0');
            copyFileSafe(srcFile, path.join(attack01Dir, `attack_01_${num}.png`));
            copyFileSafe(srcFile, path.join(attack01Dir, file));
          });
        }
      }
    }
    console.log(`  ✓ Migrated animated actions (eat, sleep, play, clean, heal, evolution, etc.)`);
  }

  migrationStats[species] = migratedFiles;
}

console.log('\n--- MIGRATION FILE COUNTS ---');
console.log(JSON.stringify(migrationStats, null, 2));
console.log('Unified sprite directory population complete.');
