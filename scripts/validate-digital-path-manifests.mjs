import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const root = resolve(".");
const manifestDirectory = resolve("docs/digital-path/manifests");
let errors = 0;
const REQUIRED_RUNTIME_ANIMATIONS = [
  "idle",
  "walk_down",
  "walk_up",
  "walk_left",
  "walk_right",
  "attack_basic_1",
  "attack_basic_2",
  "attack_special",
  "hit",
  "death",
];

function issue(filename, message) {
  console.error(`${filename}: ${message}`);
  errors += 1;
}

for (const filename of readdirSync(manifestDirectory).filter((name) => name.endsWith(".json")).sort()) {
  const path = join(manifestDirectory, filename);
  let manifest;
  try {
    manifest = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    issue(filename, `invalid JSON (${error instanceof Error ? error.message : "unknown error"})`);
    continue;
  }
  if (!manifest || typeof manifest !== "object") {
    issue(filename, "manifest must be an object");
    continue;
  }
  if (typeof manifest.id !== "string" || !manifest.id) issue(filename, "missing id");
  if (typeof manifest.root !== "string" || !manifest.root) {
    issue(filename, "missing root");
  } else if (!existsSync(resolve(manifest.root)) || !statSync(resolve(manifest.root)).isDirectory()) {
    issue(filename, `missing manifest root: ${manifest.root}`);
  }

  const animations = manifest.animations ?? {};
  if (!animations || typeof animations !== "object" || Array.isArray(animations)) {
    issue(filename, "animations must be an object");
    continue;
  }
  const paths = [];
  for (const [animationName, animation] of Object.entries(animations)) {
    if (!animation || typeof animation !== "object" || Array.isArray(animation)) {
      issue(filename, `${animationName}: animation must be an object`);
      continue;
    }
    if (!Array.isArray(animation.frames) || animation.frames.length === 0) {
      issue(filename, `${animationName}: animation has no frames`);
      continue;
    }
    if (!Number.isFinite(animation.fps) || animation.fps <= 0) issue(filename, `${animationName}: invalid fps`);
    for (const frame of animation.frames) {
      if (typeof frame !== "string" || !frame) {
        issue(filename, `${animationName}: non-string frame path`);
      } else {
        paths.push(frame);
      }
    }
  }
  const uniquePaths = new Set(paths);
  if (paths.length !== uniquePaths.size) {
    issue(filename, "duplicate animation frame path");
  }
  for (const frame of paths) {
    if (frame.includes("/_review/") || frame.includes("/_review") || frame.includes("..")) issue(filename, `runtime frame points outside validated assets: ${frame}`);
    if (typeof manifest.root === "string" && !frame.startsWith(manifest.root + "/")) issue(filename, `frame does not belong to manifest root: ${frame}`);
    if (!existsSync(resolve(frame))) {
      issue(filename, `missing frame: ${frame}`);
    }
  }
  if (manifest.spriteReady === true) {
    const isTwoWay = manifest.movementStyle === "2-way" || (!animations.walk_up && !animations.walk_down);
    for (const key of REQUIRED_RUNTIME_ANIMATIONS) {
      let animation = animations[key];
      if (!animation?.frames?.length && isTwoWay && (key === "walk_up" || key === "walk_down")) {
        animation = animations.walk_right || animations.walk_left;
      }
      if (!animation?.frames?.length && key === "attack_special" && (animations.attack_basic_2 || animations.attack_basic_1)) {
        animation = animations.attack_basic_2 || animations.attack_basic_1;
      }
      if (!animation?.frames?.length) issue(filename, `spriteReady requires ${key}`);
    }
  }
  console.log(`${filename}: ${paths.length} frame paths checked; spriteReady=${manifest.spriteReady}`);
}

if (errors) process.exit(1);
console.log("DIGITAL PATH MANIFESTS: valid paths and no duplicate frames");
