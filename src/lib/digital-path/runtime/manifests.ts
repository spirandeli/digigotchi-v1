import type { DigitalPathSpriteManifest } from "./types";
import agumonJson from "../../../../docs/digital-path/manifests/agumon.json";
import veemonJson from "../../../../docs/digital-path/manifests/veemon.json";
import gabumonJson from "../../../../docs/digital-path/manifests/gabumon.json";
import etemonJson from "../../../../docs/digital-path/manifests/etemon.json";
import flamedramonJson from "../../../../docs/digital-path/manifests/flamedramon.json";
import garurumonJson from "../../../../docs/digital-path/manifests/garurumon.json";
import geogreymonJson from "../../../../docs/digital-path/manifests/geogreymon.json";
import kingetemonJson from "../../../../docs/digital-path/manifests/kingetemon.json";
import metaletemonJson from "../../../../docs/digital-path/manifests/metaletemon.json";
import wargreymonJson from "../../../../docs/digital-path/manifests/wargreymon.json";
import weregarurumonJson from "../../../../docs/digital-path/manifests/weregarurumon.json";
import xvmonJson from "../../../../docs/digital-path/manifests/xvmon.json";

export const DIGITAL_PATH_MANIFESTS: Record<string, DigitalPathSpriteManifest> = {
  agumon: agumonJson as unknown as DigitalPathSpriteManifest,
  veemon: veemonJson as unknown as DigitalPathSpriteManifest,
  gabumon: gabumonJson as unknown as DigitalPathSpriteManifest,
  etemon: etemonJson as unknown as DigitalPathSpriteManifest,
  flamedramon: flamedramonJson as unknown as DigitalPathSpriteManifest,
  garurumon: garurumonJson as unknown as DigitalPathSpriteManifest,
  geogreymon: geogreymonJson as unknown as DigitalPathSpriteManifest,
  kingetemon: kingetemonJson as unknown as DigitalPathSpriteManifest,
  metaletemon: metaletemonJson as unknown as DigitalPathSpriteManifest,
  wargreymon: wargreymonJson as unknown as DigitalPathSpriteManifest,
  weregarurumon: weregarurumonJson as unknown as DigitalPathSpriteManifest,
  xvmon: xvmonJson as unknown as DigitalPathSpriteManifest,
};

export function getDigitalPathManifest(speciesId: string): DigitalPathSpriteManifest | null {
  return DIGITAL_PATH_MANIFESTS[speciesId] ?? null;
}
