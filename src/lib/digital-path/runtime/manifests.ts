import type { DigitalPathSpriteManifest } from "./types";
import agumonJson from "../../../../docs/digital-path/manifests/agumon.json";

export const DIGITAL_PATH_MANIFESTS: Record<string, DigitalPathSpriteManifest> = {
  agumon: agumonJson as unknown as DigitalPathSpriteManifest,
};

export function getDigitalPathManifest(speciesId: string): DigitalPathSpriteManifest | null {
  return DIGITAL_PATH_MANIFESTS[speciesId] ?? null;
}
