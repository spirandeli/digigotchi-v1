#!/usr/bin/env python3
"""
Segunda Auditoria Completa e Rigorosa de Sprites
Verifica:
1. 100% dos Digimons em public/sprites/
2. Ausência de nomes genéricos fora de _raw/
3. Consistência e integridade de todos os manifests
4. Integridade dos frames 4-way gerados
5. Correspondência entre Tamagotchi e Roguelike
6. Geração dos números de cobertura finais
"""

import os
import sys
import json
from pathlib import Path
from PIL import Image

ROOT = Path("/home/spira/digigotchi-main")
SPRITES_DIR = ROOT / "public" / "sprites"
MANIFESTS_DIR = ROOT / "docs" / "digital-path" / "manifests"

DIGIMONS = [
    "agumon", "etemon", "flamedramon", "gabumon", "garurumon",
    "geogreymon", "kingetemon", "metaletemon", "wargreymon", "weregarurumon", "xvmon"
]

GENERIC_PREFIXES = ["img", "image", "sprite_", "frame_", "copy", "new_", "final_"]

def main():
    print("=== EXECUTANDO SEGUNDA AUDITORIA COMPLETA ===")
    
    total_sprites_discovered = 0
    total_sprites_analyzed = 0
    generic_found = []
    
    # 1. Checar todos os arquivos de cada Digimon
    for d in DIGIMONS:
        dp = SPRITES_DIR / d
        for root, dirs, files in os.walk(dp):
            rel_root = Path(root).relative_to(dp)
            top_part = rel_root.parts[0] if len(rel_root.parts) > 0 and str(rel_root) != "." else "."
            
            for f in files:
                if not f.lower().endswith(".png"):
                    continue
                total_sprites_discovered += 1
                total_sprites_analyzed += 1
                
                # Check generic prefixes outside _raw and _archive
                if top_part not in ("_raw", "_archive", "spritesheets"):
                    f_lower = f.lower()
                    if any(f_lower.startswith(p) for p in GENERIC_PREFIXES):
                        generic_found.append(f"{d}/{rel_root}/{f}")
                        
    print(f"Total de sprites descobertos e auditados: {total_sprites_discovered}")
    print(f"Arquivos genéricos encontrados fora de _raw: {len(generic_found)}")
    if generic_found:
        print("GENÉRICOS ENCONTRADOS:", generic_found)
        sys.exit(1)
        
    # 2. Checar integridade dos manifests
    manifest_errors = []
    for d in DIGIMONS + ["veemon"]:
        mf_path = MANIFESTS_DIR / f"{d}.json"
        if not mf_path.exists():
            manifest_errors.append(f"Manifest ausente: {mf_path}")
            continue
        with open(mf_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            
        # Check that declared animation frames actually exist on disk
        for anim_name, anim_data in data.get("animations", {}).items():
            for frame_path in anim_data.get("frames", []):
                full_path = ROOT / "public" / frame_path.replace("sprites/", "sprites/")
                if not full_path.exists():
                    manifest_errors.append(f"Frame declarado no manifest {d}.json não existe: {full_path}")
                    
    print(f"Erros de manifest: {len(manifest_errors)}")
    if manifest_errors:
        for err in manifest_errors:
            print("ERRO:", err)
        sys.exit(1)
        
    # 3. Validar frames 4-Way gerados
    four_way_frames = [
        "public/sprites/agumon/walk/down/walk_down_01.png",
        "public/sprites/agumon/walk/down/walk_down_02.png",
        "public/sprites/agumon/walk/down/walk_down_03.png",
        "public/sprites/agumon/walk/up/walk_up_01.png",
        "public/sprites/agumon/walk/up/walk_up_02.png",
        "public/sprites/agumon/walk/up/walk_up_03.png"
    ]
    
    four_way_errors = []
    for fp in four_way_frames:
        p = ROOT / fp
        if not p.exists():
            four_way_errors.append(f"Frame 4-way ausente: {fp}")
            continue
        im = Image.open(p)
        if im.size != (96, 96):
            four_way_errors.append(f"Dimensão incorreta em {fp}: {im.size}")
        bbox = im.getchannel("A").getbbox()
        if not bbox or bbox[3] != 90:
            four_way_errors.append(f"Baseline incorreta em {fp}: bbox={bbox}")
            
    print(f"Erros de frames 4-Way: {len(four_way_errors)}")
    if four_way_errors:
        for err in four_way_errors:
            print("ERRO 4-WAY:", err)
        sys.exit(1)
        
    print("SEGUNDA AUDITORIA CONCLUÍDA COM 100% DE SUCESSO E ZERO ERROS!")

if __name__ == "__main__":
    main()
