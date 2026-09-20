import { readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/sprites');
const IGNORED_ROOT_DIRS = new Set(['animated', 'keyframes', 'maps', 'tilesets', 'fx']);

function getActionDirs(speciesDir) {
  const dirs = [];
  function scan(current) {
    const entries = readdirSync(current, { withFileTypes: true });
    const hasPngs = entries.some((e) => !e.isDirectory() && e.name.toLowerCase().endsWith('.png'));
    if (hasPngs && current !== speciesDir) {
      dirs.push(current);
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const name = entry.name;
        if (!name.startsWith('_') && name !== 'spritesheets' && name !== 'ui' && name !== 'effects' && name !== 'projectiles') {
          scan(path.join(current, name));
        }
      }
    }
  }
  scan(speciesDir);
  return dirs;
}

function getFrameNumbers(actionDir) {
  const files = readdirSync(actionDir)
    .filter((entry) => entry.toLowerCase().endsWith('.png'))
    .map((entry) => entry.replace(/\.png$/i, ''))
    .map((stem) => {
      // support both 00 and action_01
      const match = stem.match(/(\d+)$/);
      return match ? Number(match[1]) : null;
    })
    .filter((n) => n !== null);

  return [...new Set(files)].sort((a, b) => a - b);
}

let hasIssue = false;
for (const speciesDirName of readdirSync(root).sort()) {
  if (IGNORED_ROOT_DIRS.has(speciesDirName)) continue;
  const speciesDir = path.join(root, speciesDirName);
  if (!statSync(speciesDir).isDirectory()) continue;

  const actions = getActionDirs(speciesDir);
  console.log(`## ${speciesDirName}`);

  for (const actionDir of actions) {
    const actionName = actionDir.split(path.sep).at(-1);
    const frameNumbers = getFrameNumbers(actionDir);

    if (frameNumbers.length === 0) {
      console.log(`  ${actionName}: EMPTY`);
      hasIssue = true;
      continue;
    }

    const min = frameNumbers[0];
    const max = frameNumbers.at(-1);
    const expected = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const missing = expected.filter((value) => !frameNumbers.includes(value));
    const repeated = frameNumbers.filter((value, index) => frameNumbers.indexOf(value) !== index);
    const uniqueRepeated = [...new Set(repeated)];
    const ordered = frameNumbers.every((value, index) => index === 0 || value >= frameNumbers[index - 1]);

    console.log(
      `  ${actionName}: count=${frameNumbers.length} first=${min} last=${max} ordered=${ordered} missing=${missing.length ? missing.slice(0, 10).join(',') : 'none'} repeated=${uniqueRepeated.length ? uniqueRepeated.slice(0, 10).join(',') : 'none'}`,
    );

    if (!ordered || missing.length || uniqueRepeated.length) {
      hasIssue = true;
    }
  }

  console.log('');
}

if (hasIssue) {
  console.log('SPRITE REVIEW: issues detected');
  process.exit(1);
}

console.log('SPRITE REVIEW: all animation folders are ordered, continuous and free of duplicates.');
