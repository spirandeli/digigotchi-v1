import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = process.cwd();
const MAPS_ROOT = path.join(ROOT, 'public', 'sprites', 'maps');
const RAW_DIR = path.join(ROOT, 'sprite_lists_maps');
const MANIFEST_FILE = path.join(MAPS_ROOT, 'map_sprite_manifest.json');

const ELEMENTS = ['fire', 'ice', 'lighting', 'tech'];

const SUBCATEGORIES = {
  floor: ['normal', 'alternate', 'cracked', 'damaged', 'decorated', 'edge', 'special', 'transition'],
  walls: ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right', 'special'],
  corners: [
    'outer/top_left', 'outer/top_right', 'outer/bottom_left', 'outer/bottom_right',
    'inner/top_left', 'inner/top_right', 'inner/bottom_left', 'inner/bottom_right'
  ],
  borders: ['horizontal', 'vertical', 'top', 'bottom', 'left', 'right'],
  doors: ['horizontal/closed', 'horizontal/open', 'vertical/closed', 'vertical/open'],
  obstacles: ['small', 'medium', 'large', 'blocking'],
  decorations: ['floor', 'wall', 'small', 'medium', 'large', 'ambient'],
  hazards: ['floor', 'projectile', 'environmental', 'trap', 'animated'],
  interactables: ['chest/closed', 'chest/open', 'altar', 'switch', 'terminal', 'portal', 'shrine', 'lever', 'event'],
  breakables: [
    'crate/idle', 'crate/breaking', 'crate/broken',
    'barrel/idle', 'barrel/breaking', 'barrel/broken',
    'pottery/idle', 'pottery/breaking', 'pottery/broken',
    'crystal/idle', 'crystal/breaking', 'crystal/broken',
    'custom/idle', 'custom/breaking', 'custom/broken'
  ],
  structures: ['pillar', 'bridge', 'stairs', 'platform', 'ruins', 'gate', 'arch', 'special'],
  environment: ['rocks', 'vegetation', 'crystals', 'elemental', 'technology', 'ruins', 'ambient'],
  transitions: ['floor_to_floor', 'floor_to_wall', 'biome', 'room', 'corridor', 'special'],
  spawn: ['player', 'enemy', 'item', 'event', 'exit'],
  boss: ['floor', 'walls', 'entrance', 'exit', 'decorations', 'hazards', 'structures'],
  minimap: ['room', 'corridor', 'player', 'enemy', 'boss', 'chest', 'event', 'entrance', 'exit'],
};

let allOk = true;
const elementStatus = {};

// 1. Validate directories for each element (single visual theme, NO day/night)
for (const element of ELEMENTS) {
  let elemOk = true;
  const elementPath = path.join(MAPS_ROOT, element);
  if (!fs.existsSync(elementPath)) {
    elemOk = false;
    allOk = false;
    console.error(`ERRO: Diretório faltando: ${elementPath}`);
    elementStatus[element] = 'ERROR';
    continue;
  }

  // lighting is the reference complete theme
  if (element === 'lighting') {
    for (const [cat] of Object.entries(SUBCATEGORIES)) {
      const p = path.join(elementPath, cat);
      if (!fs.existsSync(p)) {
        elemOk = false;
        allOk = false;
        console.error(`ERRO: Subdiretório faltando em lighting: ${p}`);
      }
    }
  }
  elementStatus[element] = elemOk ? 'OK' : 'ERROR';
}

// 2. Validate Naming convention & Duplicate check in public/sprites/maps/
let duplicatesCount = 0;
const fileHashes = new Map();
let invalidNamesCount = 0;

function checkFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isSymbolicLink()) continue; // skip symlinks
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      checkFiles(full);
    } else if (e.name.endsWith('.png')) {
      const validPattern = /^[a-z0-9]+(_[a-z0-9]+)*\.png$/;
      if (!validPattern.test(e.name)) {
        // Skip uncropped raw sheet files in theme roots
        if (e.name.startsWith('ChatGPT')) continue;
        console.error(`ERRO: Nomenclatura inválida: ${e.name} em ${full}`);
        invalidNamesCount++;
        allOk = false;
      }

      const content = fs.readFileSync(full);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      if (fileHashes.has(hash)) {
        duplicatesCount++;
      } else {
        fileHashes.set(hash, full);
      }
    }
  }
}

checkFiles(MAPS_ROOT);

// 3. Validate Manifest
let manifestOk = true;
if (!fs.existsSync(MANIFEST_FILE)) {
  manifestOk = false;
  console.error(`ERRO: Manifesto não encontrado: ${MANIFEST_FILE}`);
} else {
  try {
    const data = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf8'));
    for (const element of ELEMENTS) {
      if (!data[element]) {
        manifestOk = false;
        console.error(`ERRO no manifesto: elemento '${element}' ausente`);
      } else {
        if (typeof data[element].enabled !== 'boolean') {
          manifestOk = false;
          console.error(`ERRO no manifesto: '${element}.enabled' flag ausente`);
        }
        if (!Array.isArray(data[element].floor)) {
          manifestOk = false;
          console.error(`ERRO no manifesto: '${element}.floor' ausente`);
        }
      }
    }
  } catch (err) {
    manifestOk = false;
    console.error(`ERRO de parse no manifesto:`, err);
  }
}

// 4. Count unclassified sprites in raw dir
let unclassifiedCount = 0;
if (fs.existsSync(RAW_DIR)) {
  unclassifiedCount = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.png')).length;
}

// 5. Output standardized report format
console.log('\n========================================');
console.log(`MAP STRUCTURE: ${allOk ? 'OK' : 'ERROR'}`);
console.log(`FIRE: ${elementStatus['fire']}`);
console.log(`ICE: ${elementStatus['ice']}`);
console.log(`LIGHTING: ${elementStatus['lighting']}`);
console.log(`TECH: ${elementStatus['tech']}`);
console.log(`MANIFEST: ${manifestOk ? 'OK' : 'ERROR'}`);
console.log(`UNCLASSIFIED SPRITES: ${unclassifiedCount}`);
console.log('========================================\n');

if (!allOk || !manifestOk) {
  process.exit(1);
} else {
  process.exit(0);
}
