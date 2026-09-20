#!/usr/bin/env python3
"""
Audit, Visual Analysis, Rename Mapping and Standardization Script for Digimon Sprites.
Follows strictly the contract defined in:
- SPRITE_PROCESSING_PLAN.md
- docs/digital-path/manifests/veemon.json (Golden Reference - READ-ONLY)
- .agents/skills/digimon-sprite-analysis/SKILL.md
- .agents/skills/digimon-4way-sprite-generator/SKILL.md
"""

import os
import sys
import json
import hashlib
from pathlib import Path
from PIL import Image

ROOT = Path("/home/spira/digigotchi-main")
SPRITES_DIR = ROOT / "public" / "sprites"
DOCS_AUDIT = ROOT / "docs" / "sprite-audit"
MANIFESTS_DIR = ROOT / "docs" / "digital-path" / "manifests"

DOCS_AUDIT.mkdir(parents=True, exist_ok=True)
MANIFESTS_DIR.mkdir(parents=True, exist_ok=True)

DIGIMONS = [
    "agumon", "etemon", "flamedramon", "gabumon", "garurumon",
    "geogreymon", "kingetemon", "metaletemon", "wargreymon", "weregarurumon", "xvmon"
]

CANONICAL_ACTIONS = {
    # Roguelike actions
    "idle": {"mode": "BOTH", "required": True, "directions": ["lateral", "4-way"]},
    "walk_left": {"mode": "ROGUELIKE", "required": True, "direction": "left"},
    "walk_right": {"mode": "ROGUELIKE", "required": True, "direction": "right"},
    "walk_down": {"mode": "ROGUELIKE", "required": False, "direction": "down"},
    "walk_up": {"mode": "ROGUELIKE", "required": False, "direction": "up"},
    "dash": {"mode": "ROGUELIKE", "required": False, "direction": "lateral"},
    "attack_basic_1": {"mode": "ROGUELIKE", "required": True, "direction": "lateral"},
    "attack_basic_2": {"mode": "ROGUELIKE", "required": True, "direction": "lateral"},
    "attack_special": {"mode": "ROGUELIKE", "required": True, "direction": "lateral"},
    "hit": {"mode": "ROGUELIKE", "required": True, "direction": "none"},
    "death": {"mode": "BOTH", "required": True, "direction": "none"},
    "victory": {"mode": "ROGUELIKE", "required": False, "direction": "none"},
    # Tamagotchi actions
    "eat": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "sleep": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "wake": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "play": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "clean": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "heal": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "evolution": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"},
    "signature_attack": {"mode": "TAMAGOTCHI", "required": True, "direction": "none"}
}

SIGNATURE_ATTACKS = {
    "agumon": "attack-pepper-breath",
    "etemon": "attack-love-serenade",
    "flamedramon": "attack-fire-rocket",
    "gabumon": "attack-blue-blaster",
    "garurumon": "attack-howling-blaster",
    "geogreymon": "attack-mega-flame",
    "kingetemon": "attack-monkey-claw",
    "metaletemon": "attack-banana-slip",
    "wargreymon": "attack-terra-force",
    "weregarurumon": "attack-wolf-claw",
    "xvmon": "attack-vee-laser"
}

def analyze_image(path: Path):
    try:
        with Image.open(path) as im:
            w, h = im.size
            mode = im.mode
            alpha_bbox = None
            has_transparency = False
            if "A" in mode:
                alpha = im.getchannel("A")
                alpha_bbox = alpha.getbbox()
                has_transparency = True
            return {
                "width": w,
                "height": h,
                "mode": mode,
                "has_transparency": has_transparency,
                "alpha_bbox": list(alpha_bbox) if alpha_bbox else None
            }
    except Exception as e:
        return {"error": str(e)}

def compute_hash(path: Path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def scan_all_sprites():
    inventory = {}
    rename_map = []
    
    for d in DIGIMONS:
        d_path = SPRITES_DIR / d
        if not d_path.exists():
            continue
        
        inventory[d] = {
            "all_files": [],
            "png_files": [],
            "actions": {},
            "raw_slices": [],
            "sheets": [],
            "legacy_duplicates": []
        }
        
        for root, dirs, files in os.walk(d_path):
            rel_root = Path(root).relative_to(d_path)
            for f in sorted(files):
                file_path = Path(root) / f
                rel_path = rel_root / f if str(rel_root) != "." else Path(f)
                str_rel = str(rel_path)
                
                inventory[d]["all_files"].append(str_rel)
                if not f.lower().endswith(".png"):
                    continue
                
                inventory[d]["png_files"].append(str_rel)
                file_hash = compute_hash(file_path)
                img_info = analyze_image(file_path)
                
                # Check provenance and category
                top_part = rel_path.parts[0] if len(rel_path.parts) > 1 else "."
                
                # Classification
                if top_part == "_raw":
                    if f.startswith("sprite_"):
                        inventory[d]["raw_slices"].append({
                            "file": str_rel,
                            "size": [img_info.get("width"), img_info.get("height")],
                            "hash": file_hash
                        })
                    else:
                        inventory[d]["sheets"].append(str_rel)
                elif top_part == "spritesheets":
                    inventory[d]["sheets"].append(str_rel)
                elif top_part == "_archive":
                    pass
                else:
                    # Runtime folders
                    action_name = top_part
                    if len(rel_path.parts) == 1:
                        # Root files: agumon.png, portrait.png
                        action_name = "root"
                    elif top_part in ("walk", "attacks", "run", "projectiles", "effects"):
                        if len(rel_path.parts) > 2:
                            action_name = f"{top_part}/{rel_path.parts[1]}"
                    
                    # Detect legacy purely numeric files
                    name_stem = f.split(".")[0]
                    is_legacy_numeric = name_stem.isdigit()
                    
                    # Canonical name check
                    is_canonical = False
                    canon_name = f
                    confidence = "HIGH"
                    
                    if is_legacy_numeric:
                        # E.g. eat/04.png -> eat/eat_05.png (1-based)
                        idx = int(name_stem) + 1
                        act_key = top_part
                        canon_name = f"{act_key}_{idx:02d}.png"
                        confidence = "CONFIRMED"
                        inventory[d]["legacy_duplicates"].append({
                            "original": str_rel,
                            "hash": file_hash,
                            "target_canonical": f"{top_part}/{canon_name}"
                        })
                    else:
                        is_canonical = True
                        confidence = "CONFIRMED"
                    
                    rename_map.append({
                        "digimon": d,
                        "original_path": f"public/sprites/{d}/{str_rel}",
                        "canonical_path": f"public/sprites/{d}/{top_part}/{canon_name}" if len(rel_path.parts) > 1 else f"public/sprites/{d}/{f}",
                        "action": action_name,
                        "file_name": f,
                        "is_canonical": is_canonical,
                        "is_legacy_numeric": is_legacy_numeric,
                        "hash": file_hash,
                        "width": img_info.get("width"),
                        "height": img_info.get("height"),
                        "confidence": confidence
                    })
                    
                    inventory[d]["actions"].setdefault(action_name, []).append({
                        "file": str_rel,
                        "is_canonical": is_canonical,
                        "hash": file_hash
                    })
    
    return inventory, rename_map

def main():
    print("Iniciando auditoria física e mapeamento de renomeação...")
    inventory, rename_map = scan_all_sprites()
    
    # Save rename map JSON
    map_json_path = DOCS_AUDIT / "sprite-rename-map.json"
    with open(map_json_path, "w", encoding="utf-8") as f:
        json.dump({
            "generated_at": "2026-09-20T20:45:00Z",
            "total_records": len(rename_map),
            "records": rename_map
        }, f, indent=2)
    print(f"Salvo: {map_json_path} ({len(rename_map)} registros)")
    
    # Save rename map Markdown
    map_md_path = DOCS_AUDIT / "sprite-rename-map.md"
    with open(map_md_path, "w", encoding="utf-8") as f:
        f.write("# Mapa de Renomeação e Classificação Canônica de Sprites\n\n")
        f.write("**Data**: 2026-09-20  \n")
        f.write(f"**Total de Mapeamentos Catalogados**: `{len(rename_map)}`  \n\n")
        f.write("## 1. Resumo por Digimon\n\n")
        f.write("| Digimon | Total PNGs | Ações Identificadas | Fatias Brutas em _raw | Duplicatas Legadas Identificadas |\n")
        f.write("|---|---:|---:|---:|---:|\n")
        for d in DIGIMONS:
            inv = inventory.get(d, {})
            f.write(f"| **{d}** | {len(inv.get('png_files', []))} | {len(inv.get('actions', {}))} | {len(inv.get('raw_slices', []))} | {len(inv.get('legacy_duplicates', []))} |\n")
        
        f.write("\n## 2. Amostra de Mapeamento de Renomeação (Primeiros 30 itens)\n\n")
        f.write("| Digimon | Original | Canônico | Ação | Status | Confiança |\n")
        f.write("|---|---|---|---|---|---|\n")
        for item in rename_map[:30]:
            orig = item["original_path"].replace("public/sprites/", "")
            canon = item["canonical_path"].replace("public/sprites/", "")
            status = "CANÔNICO" if item["is_canonical"] else "LEGADO_NUMÉRICO"
            f.write(f"| {item['digimon']} | `{orig}` | `{canon}` | `{item['action']}` | {status} | {item['confidence']} |\n")
        f.write("\n*(Consulte `sprite-rename-map.json` para o inventário integral completo.)*\n")
    print(f"Salvo: {map_md_path}")
    
    return inventory, rename_map

if __name__ == "__main__":
    main()
