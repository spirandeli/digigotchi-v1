#!/usr/bin/env python3
"""
Generate complete manifests for all Digimons in docs/digital-path/manifests/
following the schema of veemon.json (Golden Reference).
"""

import os
import json
from pathlib import Path

ROOT = Path("/home/spira/digigotchi-main")
MANIFESTS_DIR = ROOT / "docs" / "digital-path" / "manifests"
SPRITES_DIR = ROOT / "public" / "sprites"

SPECIES_METADATA = {
    "agumon": {"name": "Agumon", "stage": "rookie", "status": "READY", "spriteReady": True, "movementStyle": "4-way"},
    "veemon": {"name": "Veemon", "stage": "rookie", "status": "READY", "spriteReady": True, "movementStyle": "4-way"},
    "gabumon": {"name": "Gabumon", "stage": "rookie", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "etemon": {"name": "Etemon", "stage": "ultimate", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "flamedramon": {"name": "Flamedramon", "stage": "armor", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "garurumon": {"name": "Garurumon", "stage": "champion", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "geogreymon": {"name": "GeoGreymon", "stage": "champion", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "metaletemon": {"name": "MetalEtemon", "stage": "mega", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "wargreymon": {"name": "WarGreymon", "stage": "mega", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "weregarurumon": {"name": "WereGarurumon", "stage": "ultimate", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "xvmon": {"name": "XV-mon", "stage": "champion", "status": "PARTIAL", "spriteReady": False, "movementStyle": "4-way"},
    "kingetemon": {"name": "KingEtemon", "stage": "mega", "status": "BLOCKED", "spriteReady": False, "movementStyle": "4-way"}
}

def get_idle_frames(species: str):
    idle_dir = SPRITES_DIR / species / "idle"
    if not idle_dir.exists():
        return []
    frames = sorted([f for f in os.listdir(idle_dir) if f.startswith("idle_") and f.endswith(".png")])
    return [f"sprites/{species}/idle/{f}" for f in frames]

def generate_manifest(species: str):
    meta = SPECIES_METADATA[species]
    idle_frames = get_idle_frames(species)
    
    # Do not overwrite existing rich Agumon and Veemon manifests
    if species in ("agumon", "veemon"):
        return
    
    manifest = {
        "id": species,
        "name": meta["name"],
        "stage": meta["stage"],
        "root": f"sprites/{species}",
        "spriteReady": meta["spriteReady"],
        "status": meta["status"],
        "movementStyle": meta["movementStyle"],
        "reason": (
            "Estrutura de pastas padronizada em public/sprites/ e ações de Tamagotchi completas. "
            "Ações de combate do Roguelike catalogadas em _raw/ aguardando extração definitiva."
            if meta["status"] == "PARTIAL" else
            "Acervo bruto presente em _raw/, porém pastas de Tamagotchi e Roguelike pendentes de estruturação integral."
        ),
        "frame": {
            "width": 96,
            "height": 96,
            "originX": 0.5,
            "originY": 0.94
        },
        "scale": 1.0,
        "hitbox": {
            "width": 42,
            "height": 60,
            "offsetX": 27,
            "offsetY": 30
        },
        "animations": {
            "idle": {
                "fps": 7,
                "loop": True,
                "frames": idle_frames
            },
            "walk_down": {"fps": 8, "loop": True, "frames": []},
            "walk_up": {"fps": 8, "loop": True, "frames": []},
            "walk_left": {"fps": 8, "loop": True, "frames": []},
            "walk_right": {"fps": 8, "loop": True, "frames": []},
            "attack_basic_1": {"fps": 10, "loop": False, "frames": []},
            "attack_basic_2": {"fps": 8, "loop": False, "frames": []},
            "attack_special": {"fps": 8, "loop": False, "frames": []},
            "hit": {"fps": 8, "loop": False, "frames": []},
            "death": {"fps": 5, "loop": False, "frames": []},
            "victory": {"fps": 5, "loop": False, "frames": []}
        },
        "tamagotchiActions": {
            "idle": "validated" if idle_frames else "missing",
            "eat": "validated" if (SPRITES_DIR / species / "eat").exists() else "missing",
            "sleep": "validated" if (SPRITES_DIR / species / "sleep").exists() else "missing",
            "wake": "validated" if (SPRITES_DIR / species / "wake").exists() else "missing",
            "play": "validated" if (SPRITES_DIR / species / "play").exists() else "missing",
            "clean": "validated" if (SPRITES_DIR / species / "clean").exists() else "missing",
            "heal": "validated" if (SPRITES_DIR / species / "heal").exists() else "missing",
            "evolution": "validated" if (SPRITES_DIR / species / "evolution").exists() else "missing"
        },
        "roguelike": {
            "walk_left": "pending_raw_promotion",
            "walk_right": "pending_raw_promotion",
            "walk_up": "pending_4way_completion",
            "walk_down": "pending_4way_completion",
            "attack_basic_1": "pending_raw_promotion",
            "attack_basic_2": "pending_raw_promotion",
            "attack_special": "pending_raw_promotion",
            "hit": "pending_raw_promotion",
            "death": "pending_raw_promotion",
            "victory": "pending_raw_promotion"
        }
    }
    
    out_file = MANIFESTS_DIR / f"{species}.json"
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"Manifest gerado: {out_file}")

def main():
    for sp in SPECIES_METADATA:
        generate_manifest(sp)

if __name__ == "__main__":
    main()
