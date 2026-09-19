#!/usr/bin/env python3
"""Inventário de metadados de sprites. NÃO classifica ações visualmente."""
from pathlib import Path
import json, sys
try:
    from PIL import Image
except ImportError:
    raise SystemExit("Pillow não instalado. Instale apenas se o projeto permitir: python -m pip install Pillow")

root = Path(sys.argv[1] if len(sys.argv) > 1 else "rougue-like-character-sprites")
exts = {".png", ".jpg", ".jpeg", ".webp"}
rows = []
for p in sorted(root.rglob("*")):
    if p.is_file() and p.suffix.lower() in exts:
        try:
            with Image.open(p) as im:
                has_alpha = "A" in im.getbands() or "transparency" in im.info
                rows.append({
                    "path": str(p), "width": im.width, "height": im.height,
                    "mode": im.mode, "has_alpha": has_alpha, "bytes": p.stat().st_size
                })
        except Exception as e:
            rows.append({"path": str(p), "error": str(e)})
print(json.dumps(rows, indent=2, ensure_ascii=False))
