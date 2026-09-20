import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const MAPS_ROOT = path.join(ROOT, 'public', 'sprites', 'maps');
const TILES_SRC = path.join(ROOT, 'public', 'maps', 'tilesets');
const RAW_SHEETS_DIR = path.join(ROOT, 'sprite_lists_maps');

const ELEMENTS = ['fire', 'ice', 'lightning', 'tech'];
const TIMES = ['day', 'night'];

// Definition of the 16 base categories and their subcategories as per specifications
const SUBCATEGORIES = {
  floor: [
    'normal',
    'alternate',
    'cracked',
    'damaged',
    'decorated',
    'edge',
    'special',
    'transition',
  ],
  walls: [
    'horizontal',
    'vertical',
    'top',
    'bottom',
    'left',
    'right',
    'special',
  ],
  corners: [
    'outer/top_left',
    'outer/top_right',
    'outer/bottom_left',
    'outer/bottom_right',
    'inner/top_left',
    'inner/top_right',
    'inner/bottom_left',
    'inner/bottom_right',
  ],
  borders: [
    'horizontal',
    'vertical',
    'top',
    'bottom',
    'left',
    'right',
  ],
  doors: [
    'horizontal/closed',
    'horizontal/open',
    'vertical/closed',
    'vertical/open',
  ],
  obstacles: [
    'small',
    'medium',
    'large',
    'blocking',
  ],
  decorations: [
    'floor',
    'wall',
    'small',
    'medium',
    'large',
    'ambient',
  ],
  hazards: [
    'floor',
    'projectile',
    'environmental',
    'trap',
    'animated',
  ],
  interactables: [
    'chest/closed',
    'chest/open',
    'altar',
    'switch',
    'terminal',
    'portal',
    'shrine',
    'lever',
    'event',
  ],
  breakables: [
    'crate/idle',
    'crate/breaking',
    'crate/broken',
    'barrel/idle',
    'barrel/breaking',
    'barrel/broken',
    'pottery/idle',
    'pottery/breaking',
    'pottery/broken',
    'crystal/idle',
    'crystal/breaking',
    'crystal/broken',
    'custom/idle',
    'custom/breaking',
    'custom/broken',
  ],
  structures: [
    'pillar',
    'bridge',
    'stairs',
    'platform',
    'ruins',
    'gate',
    'arch',
    'special',
  ],
  environment: [
    'rocks',
    'vegetation',
    'crystals',
    'elemental',
    'technology',
    'ruins',
    'ambient',
  ],
  transitions: [
    'floor_to_floor',
    'floor_to_wall',
    'biome',
    'room',
    'corridor',
    'special',
  ],
  spawn: [
    'player',
    'enemy',
    'item',
    'event',
    'exit',
  ],
  boss: [
    'floor',
    'walls',
    'entrance',
    'exit',
    'decorations',
    'hazards',
    'structures',
  ],
  minimap: [
    'room',
    'corridor',
    'player',
    'enemy',
    'boss',
    'chest',
    'event',
    'entrance',
    'exit',
  ],
};

// 1. Create all directories
console.log('Criando árvore completa de diretórios em public/sprites/maps/ ...');
for (const element of ELEMENTS) {
  for (const time of TIMES) {
    const timeDir = path.join(MAPS_ROOT, element, time);
    for (const [category, subs] of Object.entries(SUBCATEGORIES)) {
      for (const sub of subs) {
        const fullDir = path.join(timeDir, category, sub);
        fs.mkdirSync(fullDir, { recursive: true });
      }
    }
  }
}

// 2. Mapeamento estrito dos tiles existentes em public/maps/tilesets/
const TILE_MAPPING = [
  {
    src: 'stone.png',
    element: 'tech',
    time: 'day',
    category: 'floor',
    sub: 'normal',
    filename: 'floor_normal_01.png',
  },
  {
    src: 'circuit.png',
    element: 'tech',
    time: 'day',
    category: 'floor',
    sub: 'decorated',
    filename: 'floor_decorated_01.png',
  },
  {
    src: 'dark_stone.png',
    element: 'tech',
    time: 'night',
    category: 'floor',
    sub: 'normal',
    filename: 'floor_normal_01.png',
  },
  {
    src: 'cracked.png',
    element: 'fire',
    time: 'day',
    category: 'floor',
    sub: 'cracked',
    filename: 'floor_cracked_01.png',
  },
  {
    src: 'storm_stone.png',
    element: 'lightning',
    time: 'day',
    category: 'floor',
    sub: 'normal',
    filename: 'floor_normal_01.png',
  },
  {
    src: 'lightning.png',
    element: 'lightning',
    time: 'day',
    category: 'floor',
    sub: 'special',
    filename: 'floor_special_01.png',
  },
  {
    src: 'charged.png',
    element: 'ice',
    time: 'day',
    category: 'floor',
    sub: 'special',
    filename: 'floor_special_01.png',
  },
  {
    src: 'wet.png',
    element: 'ice',
    time: 'day',
    category: 'floor',
    sub: 'normal',
    filename: 'floor_normal_01.png',
  },
  {
    src: 'mossy.png',
    element: 'tech',
    time: 'day',
    category: 'floor',
    sub: 'alternate',
    filename: 'floor_alternate_01.png',
  },
  {
    src: 'grate.png',
    element: 'tech',
    time: 'day',
    category: 'floor',
    sub: 'decorated',
    filename: 'floor_decorated_02.png',
  },
  {
    src: 'door_closed.png',
    element: 'tech',
    time: 'day',
    category: 'doors',
    sub: 'vertical/closed',
    filename: 'door_vertical_closed_01.png',
  },
  {
    src: 'door_open.png',
    element: 'tech',
    time: 'day',
    category: 'doors',
    sub: 'vertical/open',
    filename: 'door_vertical_open_01.png',
  },
  {
    src: 'chest_closed.png',
    element: 'tech',
    time: 'day',
    category: 'interactables',
    sub: 'chest/closed',
    filename: 'chest_closed_01.png',
  },
  {
    src: 'chest_open.png',
    element: 'tech',
    time: 'day',
    category: 'interactables',
    sub: 'chest/open',
    filename: 'chest_open_01.png',
  },
];

console.log('Copiando e renomeando tiles existentes de public/maps/tilesets/ ...');
let copiedCount = 0;
for (const item of TILE_MAPPING) {
  const srcPath = path.join(TILES_SRC, item.src);
  if (!fs.existsSync(srcPath)) {
    console.warn(`Aviso: Arquivo fonte não encontrado: ${srcPath}`);
    continue;
  }
  const destDir = path.join(MAPS_ROOT, item.element, item.time, item.category, item.sub);
  fs.mkdirSync(destDir, { recursive: true });
  const destPath = path.join(destDir, item.filename);
  fs.copyFileSync(srcPath, destPath);
  copiedCount += 1;
  console.log(` -> [${item.element}/${item.time}] ${item.src} => ${item.category}/${item.sub}/${item.filename}`);
}

// 3. Scan and Build Manifest
console.log('Construindo manifesto public/sprites/maps/map_sprite_manifest.json ...');
const manifest = {
  fire: { day: {}, night: {} },
  ice: { day: {}, night: {} },
  lightning: { day: {}, night: {} },
  tech: { day: {}, night: {} },
};

function walkTree(dir, relativePrefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = relativePrefix ? `${relativePrefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...walkTree(full, rel));
    } else if (entry.name.endsWith('.png')) {
      files.push(rel);
    }
  }
  return files;
}

for (const element of ELEMENTS) {
  for (const time of TIMES) {
    const timeDir = path.join(MAPS_ROOT, element, time);
    manifest[element][time] = {};
    for (const category of Object.keys(SUBCATEGORIES)) {
      const catDir = path.join(timeDir, category);
      if (fs.existsSync(catDir)) {
        const found = walkTree(catDir);
        if (found.length > 0) {
          manifest[element][time][category] = found.map(f => `/sprites/maps/${element}/${time}/${category}/${f}`);
        } else {
          manifest[element][time][category] = [];
        }
      } else {
        manifest[element][time][category] = [];
      }
    }
  }
}

// Add uncropped raw source sheets metadata
const unclassifiedRawSheets = [];
if (fs.existsSync(RAW_SHEETS_DIR)) {
  const rawFiles = fs.readdirSync(RAW_SHEETS_DIR).filter(f => f.endsWith('.png'));
  for (const f of rawFiles) {
    let elem = 'unknown';
    if (f.includes('10_32_14')) elem = 'tech';
    else if (f.includes('10_32_26')) elem = 'fire';
    else if (f.includes('10_32_39')) elem = 'ice';
    else if (f.includes('10_35_14')) elem = 'lightning';

    unclassifiedRawSheets.push({
      file: `sprite_lists_maps/${f}`,
      element: elem,
      status: 'pending_crop_audit',
      note: 'Prancha de conceito inteira (1254x1254) pendente de recorte fino e validação',
    });
  }
}

manifest._meta = {
  version: '1.0.0',
  updated_at: new Date().toISOString(),
  categories: Object.keys(SUBCATEGORIES),
  unclassified_source_sheets: unclassifiedRawSheets,
};

const manifestPath = path.join(MAPS_ROOT, 'map_sprite_manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
console.log(`Manifesto gerado em: ${manifestPath}`);
console.log(`Tiles classificados: ${copiedCount}`);
console.log(`Pranchas brutas pendentes registradas: ${unclassifiedRawSheets.length}`);
