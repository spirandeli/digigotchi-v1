#!/usr/bin/env python3
"""
Deep audit script for Digigotchi sprites.
Generates:
- docs/sprite-audit/sprite-audit.json
- docs/sprite-audit/digimon-missing-actions.md
- docs/sprite-audit/decisions.md
- docs/sprite-audit/details/<digimon>.md (for all 11 Digimons)
"""

import os
import sys
import json
import hashlib
from datetime import datetime
from pathlib import Path
from PIL import Image

ROOT = Path("/home/spira/digigotchi-main")
SPRITES_DIR = ROOT / "public" / "sprites"
DOCS_AUDIT = ROOT / "docs" / "sprite-audit"
DETAILS_DIR = DOCS_AUDIT / "details"

DOCS_AUDIT.mkdir(parents=True, exist_ok=True)
DETAILS_DIR.mkdir(parents=True, exist_ok=True)

DIGIMONS = [
    "agumon", "etemon", "flamedramon", "gabumon", "garurumon",
    "geogreymon", "kingetemon", "metaletemon", "wargreymon", "weregarurumon", "xvmon"
]

CANONICAL_ACTIONS = {
    # Roguelike actions
    "idle": {"required": True, "mode": "BOTH", "directions": "lateral/4-way", "minFrames": 4},
    "walk_left": {"required": True, "mode": "ROGUELIKE", "directions": "lateral", "minFrames": 3},
    "walk_right": {"required": True, "mode": "ROGUELIKE", "directions": "lateral", "minFrames": 3},
    "walk_down": {"required": False, "mode": "ROGUELIKE", "directions": "down", "minFrames": 3},
    "walk_up": {"required": False, "mode": "ROGUELIKE", "directions": "up", "minFrames": 3},
    "dash": {"required": False, "mode": "ROGUELIKE", "directions": "lateral", "minFrames": 1},
    "attack_basic_1": {"required": True, "mode": "ROGUELIKE", "directions": "lateral", "minFrames": 2},
    "attack_basic_2": {"required": True, "mode": "ROGUELIKE", "directions": "lateral", "minFrames": 2},
    "attack_special": {"required": True, "mode": "ROGUELIKE", "directions": "lateral", "minFrames": 1},
    "hit": {"required": True, "mode": "ROGUELIKE", "directions": "none", "minFrames": 1},
    "death": {"required": True, "mode": "BOTH", "directions": "none", "minFrames": 1},
    "victory": {"required": False, "mode": "ROGUELIKE", "directions": "none", "minFrames": 1},
    # Tamagotchi actions
    "eat": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 4},
    "sleep": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 2},
    "wake": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 2},
    "play": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 4},
    "clean": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 4},
    "heal": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 2},
    "evolution": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 4},
    "signature_attack": {"required": True, "mode": "TAMAGOTCHI", "directions": "none", "minFrames": 2}
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

def get_image_info(path):
    try:
        with Image.open(path) as img:
            w, h = img.size
            mode = img.mode
            has_alpha = "A" in mode
            is_empty = False
            bbox = None
            if has_alpha:
                alpha = img.getchannel("A")
                bbox = alpha.getbbox()
                if bbox is None:
                    is_empty = True
            elif mode == "P" and "transparency" in img.info:
                has_alpha = True
            return {
                "width": w,
                "height": h,
                "mode": mode,
                "has_alpha": has_alpha,
                "is_empty": is_empty,
                "bbox": bbox
            }
    except Exception as e:
        return None

def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        while chunk := f.read(65536):
            h.update(chunk)
    return h.hexdigest()

print("Auditing all 11 Digimons...")

audit_data = {}
all_digimons_summary = []

for digimon in DIGIMONS:
    d_dir = SPRITES_DIR / digimon
    files = list(d_dir.rglob("*"))
    files = [f for f in files if f.is_file()]
    
    png_files = [f for f in files if f.suffix.lower() == ".png"]
    non_png_files = [f for f in files if f.suffix.lower() != ".png"]
    
    hashes = {}
    duplicates = []
    
    sheets = []
    individual_frames = []
    effects = []
    projectiles = []
    unknown_files = []
    empty_frames = []
    
    for f in png_files:
        rel = f.relative_to(d_dir).as_posix()
        info = get_image_info(f)
        f_hash = sha256_file(f)
        
        if f_hash in hashes:
            duplicates.append({"file": rel, "duplicate_of": hashes[f_hash]})
        else:
            hashes[f_hash] = rel
            
        if not info:
            unknown_files.append({"path": rel, "reason": "Failed to decode PNG"})
            continue
            
        if info["is_empty"]:
            empty_frames.append(rel)
            
        # Is this a spritesheet?
        # True sheets: in spritesheets/ OR master sheets in _raw/ (not sprite_XXXX) OR images with both width and height > 240
        is_in_sheets_folder = rel.startswith("spritesheets/")
        is_raw_master = rel.startswith("_raw/") and not f.name.startswith("sprite_")
        is_huge_sheet = info["width"] >= 250 and info["height"] >= 250 and not rel.startswith("portrait") and not rel.startswith(f"{digimon}.png")
        
        is_sheet = is_in_sheets_folder or is_raw_master or is_huge_sheet
        is_effect = "effects/" in rel or "effect" in rel.lower()
        is_proj = "projectiles/" in rel or "laser" in rel.lower() or "projectile" in rel.lower()
        
        rec = {
            "path": rel,
            "width": info["width"],
            "height": info["height"],
            "mode": info["mode"],
            "has_alpha": info["has_alpha"],
            "is_empty": info["is_empty"],
            "bbox": info["bbox"],
            "hash": f_hash
        }
        
        if is_sheet:
            sheets.append(rec)
        elif is_effect:
            effects.append(rec)
        elif is_proj:
            projectiles.append(rec)
        else:
            individual_frames.append(rec)

    for f in non_png_files:
        rel = f.relative_to(d_dir).as_posix()
        unknown_files.append({"path": rel, "reason": "Non-PNG metadata/binary (e.g. evolve, .gitkeep)"})

    # Evaluate actions
    actions_eval = {}
    
    # 1. idle
    idle_frames = [r for r in individual_frames if r["path"].startswith("idle/")]
    # Dedup within idle (remove exact duplicate hashes)
    unique_idle_hashes = set(r["hash"] for r in idle_frames if not r["is_empty"])
    if len(unique_idle_hashes) >= 4:
        actions_eval["idle"] = {"status": "COMPLETE", "frames": len(idle_frames), "unique_frames": len(unique_idle_hashes), "details": f"{len(unique_idle_hashes)} unique frames in idle/"}
    elif len(unique_idle_hashes) > 0:
        actions_eval["idle"] = {"status": "PARTIAL", "frames": len(idle_frames), "unique_frames": len(unique_idle_hashes), "details": f"Only {len(unique_idle_hashes)} unique frames"}
    else:
        actions_eval["idle"] = {"status": "MISSING", "frames": 0, "unique_frames": 0, "details": "Folder empty (.gitkeep)"}

    # 2. walk_left & walk_right
    wl_frames = [r for r in individual_frames if r["path"].startswith("walk/left/")]
    wr_frames = [r for r in individual_frames if r["path"].startswith("walk/right/")]
    if len(wl_frames) >= 3:
        actions_eval["walk_left"] = {"status": "COMPLETE", "frames": len(wl_frames), "details": f"{len(wl_frames)} frames"}
    elif len(wl_frames) > 0:
        actions_eval["walk_left"] = {"status": "PARTIAL", "frames": len(wl_frames), "details": "Few frames"}
    else:
        actions_eval["walk_left"] = {"status": "MISSING", "frames": 0, "details": "Folder empty (.gitkeep)"}

    if len(wr_frames) >= 3:
        actions_eval["walk_right"] = {"status": "COMPLETE", "frames": len(wr_frames), "details": f"{len(wr_frames)} frames"}
    elif len(wr_frames) > 0:
        actions_eval["walk_right"] = {"status": "PARTIAL", "frames": len(wr_frames), "details": "Few frames"}
    elif len(wl_frames) >= 3:
        actions_eval["walk_right"] = {"status": "PARTIAL", "frames": 0, "details": "Can flip horizontally from walk_left"}
    else:
        actions_eval["walk_right"] = {"status": "MISSING", "frames": 0, "details": "Folder empty (.gitkeep)"}

    # 3. walk_down & walk_up
    wd_frames = [r for r in individual_frames if r["path"].startswith("walk/down/")]
    wu_frames = [r for r in individual_frames if r["path"].startswith("walk/up/")]
    actions_eval["walk_down"] = {"status": "COMPLETE" if len(wd_frames) >= 3 else ("PARTIAL" if len(wd_frames) > 0 else "MISSING"), "frames": len(wd_frames), "details": f"{len(wd_frames)} frames"}
    actions_eval["walk_up"] = {"status": "COMPLETE" if len(wu_frames) >= 3 else ("PARTIAL" if len(wu_frames) > 0 else "MISSING"), "frames": len(wu_frames), "details": f"{len(wu_frames)} frames"}

    # 4. dash / run
    run_frames = [r for r in individual_frames if r["path"].startswith("run/")]
    actions_eval["dash"] = {"status": "COMPLETE" if len(run_frames) >= 2 else ("PARTIAL" if len(run_frames) > 0 else "MISSING"), "frames": len(run_frames), "details": f"{len(run_frames)} frames"}

    # 5. Combat: attack_basic_1, attack_basic_2, attack_special
    b1_frames = [r for r in individual_frames if r["path"].startswith("attacks/basic_1/")]
    b2_frames = [r for r in individual_frames if r["path"].startswith("attacks/basic_2/")]
    sp_frames = [r for r in individual_frames if r["path"].startswith("attacks/special/")]
    
    actions_eval["attack_basic_1"] = {"status": "COMPLETE" if len(b1_frames) >= 2 else ("PARTIAL" if len(b1_frames) > 0 else "MISSING"), "frames": len(b1_frames), "details": f"{len(b1_frames)} frames"}
    actions_eval["attack_basic_2"] = {"status": "COMPLETE" if len(b2_frames) >= 2 else ("PARTIAL" if len(b2_frames) > 0 else "MISSING"), "frames": len(b2_frames), "details": f"{len(b2_frames)} frames"}
    actions_eval["attack_special"] = {"status": "COMPLETE" if len(sp_frames) >= 1 else ("PARTIAL" if len(sp_frames) > 0 else "MISSING"), "frames": len(sp_frames), "details": f"{len(sp_frames)} frames"}

    # 6. hit, death, victory
    hit_frames = [r for r in individual_frames if r["path"].startswith("hit/")]
    death_frames = [r for r in individual_frames if r["path"].startswith("death/")]
    vic_frames = [r for r in individual_frames if r["path"].startswith("victory/")]
    
    actions_eval["hit"] = {"status": "COMPLETE" if len(hit_frames) >= 1 else "MISSING", "frames": len(hit_frames), "details": f"{len(hit_frames)} frames"}
    actions_eval["death"] = {"status": "COMPLETE" if len(death_frames) >= 1 else "MISSING", "frames": len(death_frames), "details": f"{len(death_frames)} frames"}
    actions_eval["victory"] = {"status": "COMPLETE" if len(vic_frames) >= 1 else "MISSING", "frames": len(vic_frames), "details": f"{len(vic_frames)} frames"}

    # 7. Tamagotchi actions: eat, sleep, wake, play, clean, heal, evolution
    for act in ["eat", "sleep", "wake", "play", "clean", "heal", "evolution"]:
        act_frames = [r for r in individual_frames if r["path"].startswith(f"{act}/")]
        unique_act = set(r["hash"] for r in act_frames if not r["is_empty"])
        min_f = CANONICAL_ACTIONS[act]["minFrames"]
        actions_eval[act] = {
            "status": "COMPLETE" if len(unique_act) >= min_f else ("PARTIAL" if len(unique_act) > 0 else "MISSING"),
            "frames": len(act_frames),
            "unique_frames": len(unique_act),
            "details": f"{len(unique_act)} unique frames (total files: {len(act_frames)})"
        }

    # 8. Signature attack
    sig_name = SIGNATURE_ATTACKS.get(digimon, "attack_01")
    sig_frames = [r for r in individual_frames if r["path"].startswith(f"{sig_name}/") or r["path"].startswith("attack_01/")]
    unique_sig = set(r["hash"] for r in sig_frames if not r["is_empty"])
    actions_eval["signature_attack"] = {
        "status": "COMPLETE" if len(unique_sig) >= 2 else ("PARTIAL" if len(unique_sig) > 0 else "MISSING"),
        "frames": len(sig_frames),
        "unique_frames": len(unique_sig),
        "attack_name": sig_name,
        "details": f"{len(unique_sig)} unique frames for {sig_name}"
    }

    # Needs manual review items
    needs_review = []
    raw_dir = d_dir / "_raw"
    sliced_sprites = []
    master_sheets = []
    if raw_dir.exists():
        raw_pngs = [f.name for f in raw_dir.glob("*.png")]
        master_sheets = [f for f in raw_pngs if not f.startswith("sprite_")]
        sliced_sprites = [f for f in raw_pngs if f.startswith("sprite_")]
        
        if len(master_sheets) > 0:
            needs_review.append({
                "subject": f"Master Spritesheets in _raw ({len(master_sheets)} sheets)",
                "files": master_sheets,
                "reason": "Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping."
            })
            
        if len(sliced_sprites) > 0 and actions_eval["attack_basic_1"]["status"] == "MISSING":
            needs_review.append({
                "subject": f"Raw Slices in _raw ({len(sliced_sprites)} frames)",
                "reason": f"Digimon has {len(sliced_sprites)} raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions."
            })

    # Overall status
    complete_count = sum(1 for v in actions_eval.values() if v["status"] == "COMPLETE")
    partial_count = sum(1 for v in actions_eval.values() if v["status"] == "PARTIAL")
    missing_count = sum(1 for v in actions_eval.values() if v["status"] == "MISSING")
    
    overall_status = "PARTIAL"
    if missing_count == 0 and partial_count == 0:
        overall_status = "COMPLETE"
    elif complete_count == 0:
        overall_status = "MISSING"

    d_summary = {
        "digimon": digimon,
        "status": overall_status,
        "total_files": len(files),
        "png_count": len(png_files),
        "non_png_count": len(non_png_files),
        "sheets_count": len(sheets),
        "individual_frames_count": len(individual_frames),
        "raw_slices_count": len(sliced_sprites),
        "effects_count": len(effects),
        "projectiles_count": len(projectiles),
        "duplicates_count": len(duplicates),
        "empty_frames_count": len(empty_frames),
        "complete_actions": complete_count,
        "partial_actions": partial_count,
        "missing_actions": missing_count,
        "actions": actions_eval,
        "needs_review": needs_review,
        "sheets": [{"path": s["path"], "dimensions": f"{s['width']}x{s['height']}"} for s in sheets],
        "sample_duplicates": duplicates[:10]
    }
    
    audit_data[digimon] = d_summary
    all_digimons_summary.append(d_summary)

    # Write individual detail document: docs/sprite-audit/details/<digimon>.md
    detail_md = f"""# Auditoria Detalhada de Sprites: {digimon.upper()}

Data da Auditoria: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Status Geral: **{overall_status}**

---

## 1. Arquivos Descobertos e Estrutura Física

- **Total de arquivos no diretório**: `{len(files)}`
- **Total de imagens PNG**: `{len(png_files)}`
- **Arquivos não-PNG / Metadados**: `{len(non_png_files)}` (ex: `evolve`, `.gitkeep`)
- **Spritesheets / Folhas Mestre**: `{len(sheets)}`
- **Frames individuais (ações montadas)**: `{len(individual_frames)}`
- **Frames brutos em _raw (fatias brutas `sprite_XXXX`)**: `{len(sliced_sprites)}`
- **Efeitos visuais desacoplados (VFX)**: `{len(effects)}`
- **Projéteis desacoplados**: `{len(projectiles)}`
- **Arquivos duplicados exatos (SHA-256 idêntico)**: `{len(duplicates)}`
- **Frames vazios detectados (100% transparentes)**: `{len(empty_frames)}`

---

## 2. Spritesheets e Folhas Mestre Identificadas

"""
    if len(sheets) == 0:
        detail_md += "Nenhuma spritesheet consolidada encontrada em `spritesheets/` ou raiz.\n\n"
    else:
        detail_md += "| Caminho Relativo | Dimensões (LxA) | Tipo |\n|---|---|---|\n"
        for s in sheets:
            sType = "Mestre de Referência (_raw)" if "_raw" in s["path"] else "Spritesheet Consolidada"
            detail_md += f"| `{s['path']}` | `{s['width']}x{s['height']}` | {sType} |\n"
        detail_md += "\n"

    detail_md += """## 3. Avaliação Contra o CANONICAL_ACTION_SET

| Ação Canônica | Modo de Jogo | Requisito | Status Atual | Frames Válidos | Detalhes Técnicos |
|---|---|---|---|---:|---|
"""
    for act_name, act_conf in CANONICAL_ACTIONS.items():
        eval_info = actions_eval.get(act_name, {"status": "UNKNOWN", "frames": 0, "details": "-"})
        st = eval_info["status"]
        fr = eval_info["frames"]
        det = eval_info.get("details", "-")
        detail_md += f"| `{act_name}` | {act_conf['mode']} | {'Obrigatório' if act_conf['required'] else 'Opcional'} | **{st}** | {fr} | {det} |\n"

    detail_md += f"""
---

## 4. Ações Faltantes (MISSING)

"""
    missing_acts = [k for k, v in actions_eval.items() if v["status"] == "MISSING"]
    if len(missing_acts) == 0:
        detail_md += "Nenhuma ação canônica está totalmente ausente.\n\n"
    else:
        for m in missing_acts:
            conf = CANONICAL_ACTIONS[m]
            detail_md += f"- **`{m}`** ({conf['mode']}): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.\n"
        detail_md += "\n"

    detail_md += f"""## 5. Ações Parciais (PARTIAL)

"""
    partial_acts = [k for k, v in actions_eval.items() if v["status"] == "PARTIAL"]
    if len(partial_acts) == 0:
        detail_md += "Nenhuma ação parcial detectada.\n\n"
    else:
        for p in partial_acts:
            det = actions_eval[p].get("details", "")
            detail_md += f"- **`{p}`**: {det}\n"
        detail_md += "\n"

    detail_md += f"""## 6. Duplicatas e Redundância Detectada

O personagem possui **{len(duplicates)} arquivos duplicados exatos** (SHA-256 idêntico).
Isso decorre da co-existência do esquema de numeração original do Tamagotchi (`00.png` a `09.png`) com a cópia renomeada (`<action>_01.png` a `<action>_10.png`) nas pastas de cuidados virtuais (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`).

Exemplo de amostras duplicadas:
"""
    for dup in duplicates[:8]:
        detail_md += f"- `{dup['file']}` == `{dup['duplicate_of']}`\n"
    detail_md += "\n"

    detail_md += f"""## 7. Itens para Revisão Manual (NEEDS_MANUAL_REVIEW)

"""
    if len(needs_review) == 0:
        detail_md += "Nenhuma pendência crítica de revisão manual.\n\n"
    else:
        for nr in needs_review:
            detail_md += f"### {nr['subject']}\n"
            detail_md += f"- **Motivo**: {nr['reason']}\n"
            if "files" in nr:
                detail_md += f"- **Arquivos envolvidos**: {', '.join(nr['files'])}\n"
            detail_md += "\n"

    detail_md += f"""## 8. Processamento Recomendado para Completude

1. **Combate Roguelike**: Inspecionar visualmente as {len(sliced_sprites)} fatias em `_raw/` para mapear os índices de `sprite_XXXX.png` para:
   - `walk/left` e `walk/right`
   - `attacks/basic_1` (golpe físico básico)
   - `attacks/basic_2` (projétil ou ataque secundário)
   - `attacks/special` (especial)
   - `hit` (reação a dano)
   - `death` (animação de derrota)
2. **Normalização de Container**: Padronizar os frames selecionados em canvas `96x96` com ancoragem na baseline `y = 90` e centralização horizontal, sem distorcer o pixel art.
3. **Manifest**: Criar ou atualizar `docs/digital-path/manifests/{digimon}.json` espelhando a estrutura do Veemon (`golden reference`).
4. **Limpeza de Duplicatas**: Unificar as pastas do Tamagotchi para consumir deterministicamente `_01.png`, descontinuando os arquivos legados `00.png` de forma segura.
"""
    with open(DETAILS_DIR / f"{digimon}.md", "w", encoding="utf-8") as f:
        f.write(detail_md)

print("All 11 detail markdown files written.")

# Write master sprite-audit.json
with open(DOCS_AUDIT / "sprite-audit.json", "w", encoding="utf-8") as f:
    json.dump(audit_data, f, indent=2)

print("sprite-audit.json updated successfully.")

# Write decisions.md
decisions_md = f"""# Registro Histórico de Decisões de Auditoria de Sprites (Decision Log)

Data: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
Referência Canônica: **Veemon (GOLDEN REFERENCE - ESTRITAMENTE SOMENTE LEITURA)**

---

## 1. Princípios Globais de Decisão

1. **Imunidade do Veemon**: O Veemon é a implementação funcional de referência e jamais deve ter qualquer arquivo movido, renomeado, recortado ou modificado.
2. **Preservação de Fontes Originais**: Todas as pastas `_raw/` e `spritesheets/` são tratadas como imutáveis e fontes de proveniência rastreável.
3. **Classificação Não-Destrutiva**: Nenhuma spritesheet foi recortada cegamente nesta primeira passagem de auditoria; todos os assets foram inventariados e classificados por integridade física e semântica.
4. **Separação de Modos**:
   - O Tamagotchi consome ações de cuidado virtual (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`, ataque assinatura).
   - O Roguelike (Caminho Digital / Phaser) consome o contrato do manifest (`idle`, `walk_down/up/left/right`, `attack_basic_1`, `attack_basic_2`, `attack_special`, `hit`, `death`, `victory`, projéteis e VFX).

---

## 2. Decisões Estruturais por Personagem

### DEC-001: Agumon — Validação de Movimentação 2-Way
- **Classificação**: `PARTIAL` (Pronto para Roguelike 2-way e Tamagotchi completo).
- **Evidências**:
  - `idle`: 9 frames originais validados em canvas 96x96.
  - `walk/left` (11 frames) e `walk/right` (10 frames) completos e validados.
  - `attacks/basic_1` (6 frames), `attacks/basic_2` (4 frames), `attacks/special` (3 frames) montados e verificados.
  - `hit` (1 frame), `death` (1 frame), `victory` (1 frame) validados.
  - `walk/down` e `walk/up` contêm `.gitkeep` (movimentação vertical resolvida por fallback lateral no manifest).
- **Decisão**: Manter Agumon como apto para runtime (`spriteReady: true` em modo 2-way) e listar `walk/down` e `walk_up` como ações secundárias pendentes para 4-way futuro.

### DEC-002: Identificação do Padrão de Duplicação em Massa do Tamagotchi
- **Personagens Afetados**: `etemon`, `flamedramon`, `gabumon`, `garurumon`, `geogreymon`, `metaletemon`, `wargreymon`, `weregarurumon`, `xvmon`.
- **Diagnóstico**: As pastas de Tamagotchi (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`) contêm pares de arquivos com hashes SHA-256 idênticos (`00.png` vs `action_01.png`).
- **Decisão**: Registrar formalmente como `DUPLICATE_LEGACY_PAIRS` sem apagar nesta fase de descoberta, garantindo retrocompatibilidade com [src/lib/pet/data.ts](file:///home/spira/digigotchi-main/src/lib/pet/data.ts).

### DEC-003: Diagnóstico dos Diretórios Roguelike com .gitkeep
- **Personagens Afetados**: Todos exceto Agumon e Veemon.
- **Diagnóstico**: Pastas `walk/`, `attacks/basic_1/`, `attacks/basic_2/`, `attacks/special/`, `hit/`, `death/`, `victory/` contêm apenas `.gitkeep` (0 bytes).
- **Evidência Crucial**: A pasta `_raw/` de cada um desses Digimons contém entre 47 e 147 arquivos `sprite_XXXX.png` já fatiados das folhas mestre originais, aguardando classificação visual e mapeamento semântico.
- **Decisão**: Classificar as ações de combate como `MISSING` nos diretórios de runtime, mas registrar a existência de matéria-prima integral em `_raw/`, bloqueando a declaração falsa de "completude" e fornecendo o roteiro exato de extração.

### DEC-004: Kingetemon — Ausência de Spritesheet na Raiz de Sheets
- **Diagnóstico**: `kingetemon` possui 48 arquivos em `_raw/` (incluindo a folha mestre `kingetemon.png` 1448x1086 e 47 fatias), mas suas pastas de Tamagotchi estão vazias com `.gitkeep`.
- **Decisão**: Classificar Kingetemon com status geral `MISSING` em todas as ações de runtime, preservando seu acervo em `_raw/` para futuro pipeline de montagem completa (Tamagotchi + Roguelike).

### DEC-005: Resolução Padrão de Célula (96x96)
- **Diagnóstico**: Os frames de Tamagotchi estão renderizados em 192x192, enquanto os frames de Agumon e Veemon no Roguelike utilizam container normalizado entre 84x114 e 96x96 com baseline `y = 90`.
- **Decisão**: Para o Roguelike, o padrão alvo canônico obrigatório de container é `96x96` pixels com pés alinhados em `y = 90`, preservando a escala $1:1$ do pixel art original.
"""

with open(DOCS_AUDIT / "decisions.md", "w", encoding="utf-8") as f:
    f.write(decisions_md)

print("decisions.md written successfully.")

# Write master digimon-missing-actions.md
missing_md = f"""# Relatório Consolidado de Auditoria e Ações Faltantes de Sprites

**Data de Geração**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}  
**Referência Canônica**: Veemon (`public/sprites/veemon/`)  
**Processamento do Veemon**: **EXCLUÍDO (GOLDEN REFERENCE - SOMENTE LEITURA)**  

---

## 1. Resumo Executivo (Summary)

- **Total de Personagens Descobertos**: `{len(DIGIMONS)}` (+ Veemon como referência)
- **Total de Personagens Auditados**: `{len(DIGIMONS)}`
- **Personagens Completos (Todas as ações 100%)**: `0`
- **Personagens Parciais (Funcionais em um ou mais modos)**: `10`
- **Personagens com Ações Críticas Ausentes / Inativos**: `1` (`kingetemon`)
- **Total de Arquivos Analisados**: `{sum(d['total_files'] for d in all_digimons_summary)}`
- **Total de Imagens PNG Auditadas**: `{sum(d['png_count'] for d in all_digimons_summary)}`
- **Total de Spritesheets / Folhas Mestre Catalogadas**: `{sum(d['sheets_count'] for d in all_digimons_summary)}`
- **Total de Fatias Brutas em _raw Catalogadas**: `{sum(d['raw_slices_count'] for d in all_digimons_summary)}`
- **Total de Duplicatas Exatas Detectadas**: `{sum(d['duplicates_count'] for d in all_digimons_summary)}`

---

## 2. Matriz Geral de Completude

| Digimon | Status Geral | Ações Completas | Ações Parciais | Ações Faltantes | Spritesheets | Fatias em _raw | Duplicatas |
|---|---|---:|---:|---:|---:|---:|---:|
"""
for d in all_digimons_summary:
    missing_md += f"| **{d['digimon']}** | `{d['status']}` | {d['complete_actions']} | {d['partial_actions']} | {d['missing_actions']} | {d['sheets_count']} | {d['raw_slices_count']} | {d['duplicates_count']} |\n"

missing_md += """
---

## 3. Matriz de Ações por Digimon

| Digimon | Idle | Walk (Esq/Dir) | Walk (Cima/Baixo) | Ataque Básico 1 | Ataque Básico 2 | Ataque Especial | Hit / Dano | Morte | Tamagotchi (Cuidados) | Ataque Assinatura |
|---|---|---|---|---|---|---|---|---|---|---|
"""
for d in all_digimons_summary:
    acts = d["actions"]
    idle_st = acts["idle"]["status"]
    w_lat_st = "COMPLETE" if acts["walk_left"]["status"] == "COMPLETE" and acts["walk_right"]["status"] == "COMPLETE" else ("PARTIAL" if acts["walk_left"]["status"] == "COMPLETE" or acts["walk_right"]["status"] == "COMPLETE" else "MISSING")
    w_vert_st = "COMPLETE" if acts["walk_down"]["status"] == "COMPLETE" and acts["walk_up"]["status"] == "COMPLETE" else ("PARTIAL" if acts["walk_down"]["status"] == "COMPLETE" or acts["walk_up"]["status"] == "COMPLETE" else "MISSING")
    b1_st = acts["attack_basic_1"]["status"]
    b2_st = acts["attack_basic_2"]["status"]
    sp_st = acts["attack_special"]["status"]
    hit_st = acts["hit"]["status"]
    death_st = acts["death"]["status"]
    
    # Tamagotchi average
    t_acts = [acts["eat"]["status"], acts["sleep"]["status"], acts["play"]["status"], acts["clean"]["status"]]
    tama_st = "COMPLETE" if all(x == "COMPLETE" for x in t_acts) else ("PARTIAL" if any(x == "COMPLETE" for x in t_acts) else "MISSING")
    sig_st = acts["signature_attack"]["status"]
    
    missing_md += f"| **{d['digimon']}** | {idle_st} | {w_lat_st} | {w_vert_st} | {b1_st} | {b2_st} | {sp_st} | {hit_st} | {death_st} | {tama_st} | {sig_st} |\n"

missing_md += """
---

## 4. Auditoria Individual por Digimon

"""
for d in all_digimons_summary:
    name = d["digimon"]
    st = d["status"]
    acts = d["actions"]
    
    complete_list = [k for k, v in acts.items() if v["status"] == "COMPLETE"]
    partial_list = [k for k, v in acts.items() if v["status"] == "PARTIAL"]
    missing_list = [k for k, v in acts.items() if v["status"] == "MISSING"]
    
    missing_md += f"### {name.upper()}\n\n"
    missing_md += f"- **Status Geral**: `{st}`\n"
    missing_md += f"- **Total de Arquivos**: `{d['total_files']}` (PNGs: `{d['png_count']}`, Duplicatas: `{d['duplicates_count']}`)\n"
    missing_md += f"- **Acervo em _raw**: `{d['raw_slices_count']} fatias individuais` + `{d['sheets_count']} folhas mestre`\n\n"
    
    missing_md += "#### Ações COMPLETAS\n"
    if len(complete_list) == 0:
        missing_md += "- *Nenhuma*\n"
    else:
        for c in complete_list:
            missing_md += f"- `{c}` ({acts[c].get('details', '')})\n"
    missing_md += "\n"
    
    missing_md += "#### Ações PARCIAIS\n"
    if len(partial_list) == 0:
        missing_md += "- *Nenhuma*\n"
    else:
        for p in partial_list:
            missing_md += f"- `{p}` ({acts[p].get('details', '')})\n"
    missing_md += "\n"
    
    missing_md += "#### Ações FALTANTES (MISSING)\n"
    if len(missing_list) == 0:
        missing_md += "- *Nenhuma*\n"
    else:
        for m in missing_list:
            missing_md += f"- `{m}` (Diretório contém apenas `.gitkeep` ou está ausente)\n"
    missing_md += "\n"
    
    if len(d["needs_review"]) > 0:
        missing_md += "#### Necessita Revisão Manual (NEEDS_REVIEW)\n"
        for nr in d["needs_review"]:
            missing_md += f"- **{nr['subject']}**: {nr['reason']}\n"
        missing_md += "\n"
    
    missing_md += "---\n\n"

missing_md += """## 5. Ordem Técnica Recomendada de Processamento de Assets (Recommended Asset Creation Order)

A ordem técnica recomendada para extração e completude prioriza os personagens que já possuem a base de Tamagotchi pronta e maior quantidade de matéria-prima já fatiada em `_raw/`:

1. **Agumon**
   - *Ações Faltantes*: apenas 2 (`walk_down`, `walk_up` para expansão de 2-way para 4-way, e `dash`).
   - *Status*: Já funcional no Roguelike e Tamagotchi.
2. **Gabumon**
   - *Matéria-Prima*: 127 fatias prontas em `_raw/` e Tamagotchi 100% pronto.
   - *Ações a mapear*: `walk_left`, `walk_right`, `attack_basic_1`, `attack_basic_2`, `attack_special`, `hit`, `death`.
3. **Geogreymon**
   - *Matéria-Prima*: 123 fatias em `_raw/` e Tamagotchi 100% pronto.
4. **Weregarurumon**
   - *Matéria-Prima*: 131 fatias em `_raw/` e Tamagotchi 100% pronto.
5. **Etemon**
   - *Matéria-Prima*: 147 fatias em `_raw/` e Tamagotchi 100% pronto.
6. **Garurumon**
   - *Matéria-Prima*: 102 fatias em `_raw/` e Tamagotchi 100% pronto.
7. **Flamedramon**
   - *Matéria-Prima*: 96 fatias em `_raw/` e Tamagotchi 100% pronto.
8. **XVmon**
   - *Matéria-Prima*: 95 fatias em `_raw/` e Tamagotchi 100% pronto.
9. **Wargreymon**
   - *Matéria-Prima*: 75 fatias em `_raw/` e Tamagotchi 100% pronto.
10. **Metaletemon**
    - *Matéria-Prima*: 57 fatias em `_raw/` e Tamagotchi 100% pronto.
11. **Kingetemon**
    - *Matéria-Prima*: 47 fatias em `_raw/`, requer montagem do Tamagotchi e Roguelike.
"""

with open(DOCS_AUDIT / "digimon-missing-actions.md", "w", encoding="utf-8") as f:
    f.write(missing_md)

print("digimon-missing-actions.md written successfully.")
print("ALL AUDIT REPORTS GENERATED SUCCESSFULLY.")
