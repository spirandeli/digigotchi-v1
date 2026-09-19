import { readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/sprites/animated');

function getActionDirs(speciesDir) {
  return readdirSync(speciesDir)
    .map((entry) => path.join(speciesDir, entry))
    .filter((entry) => statSync(entry).isDirectory())
    .filter((entry) => !entry.split(path.sep).at(-1)?.startsWith('_'));
}

function getFrameNumbers(actionDir) {
  const files = readdirSync(actionDir)
    .filter((entry) => entry.toLowerCase().endsWith('.png'))
    .map((entry) => entry.replace(/\.png$/i, ''))
    .filter((stem) => /^\d+$/.test(stem));

  return files.map((file) => Number(file)).sort((a, b) => a - b);
}

let hasIssue = false;
for (const speciesDirName of readdirSync(root).sort()) {
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
