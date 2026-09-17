from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw
import numpy as np
import shutil

ROOT = Path(__file__).resolve().parents[1]
ANIM = ROOT / 'public' / 'sprites' / 'animated' / 'xvmon'
KEY = ROOT / 'public' / 'sprites' / 'keyframes' / 'xvmon'
SRC = Path('/mnt/data/ghostwriter_images/context/105c5bb8-02d9-5e12-8fc0-c086098792d5.jpg')
REF_DIR = ROOT / 'attachments' / 'user_sprite_sheets_round3'
PREV_DIR = ROOT / 'attachments' / 'round3_previews'
CANVAS = 96

# Curated crop boxes from the new user-provided XV-mon / ExVeemon sheet.
BOXES = {
    0: (24, 19, 308, 379),
    1: (332, 34, 621, 373),
    2: (632, 67, 812, 372),
    3: (799, 67, 956, 373),
    4: (952, 67, 1096, 372),
    5: (1072, 67, 1225, 373),
    6: (1243, 71, 1517, 375),
    7: (1512, 90, 1761, 376),
    8: (1752, 50, 2021, 373),
    9: (1683, 396, 2009, 765),
    10: (68, 416, 402, 764),
    11: (414, 423, 758, 761),
    12: (768, 427, 1089, 760),
    13: (1103, 436, 1336, 760),
    14: (1347, 427, 1661, 761),
    15: (544, 791, 1174, 1141),
    16: (1175, 773, 1669, 1137),
    17: (84, 812, 426, 1143),
    18: (1647, 812, 1989, 1142),
}

# Built entirely from the new sheet as requested.
ACTION_BOXES = {
    'idle': [0, 2, 3, 4, 5, 4, 3, 2],
    'eat': [17, 10, 17, 12, 17, 10],
    'play': [6, 7, 13, 14, 6, 8],
    'sleep': [18, 18, 18, 18],
    'wake': [18, 13, 10, 0],
    'clean': [17, 10, 9, 17, 0],
    'heal': [17, 10, 12, 17, 0],
    'evolve': [18, 17, 10, 9, 13, 14, 15, 16, 8, 0, 1],
    'attack-vee-laser': [10, 17, 12, 15, 15, 16, 8, 6],
}

COUNTS = {
    'idle': 10,
    'eat': 10,
    'play': 12,
    'sleep': 6,
    'wake': 8,
    'clean': 10,
    'heal': 10,
    'evolve': 14,
    'attack-vee-laser': 12,
}


def ensure_dirs() -> None:
    REF_DIR.mkdir(parents=True, exist_ok=True)
    PREV_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(SRC, REF_DIR / 'xvmon_round3_source.jpg')
    (REF_DIR / 'README.md').write_text(
        '# Rodada 3\n\n- Fonte utilizada para substituir todos os sprites do XV-mon: `xvmon_round3_source.jpg`\n',
        encoding='utf-8'
    )


def alpha_fix(im: Image.Image) -> Image.Image:
    arr = np.array(im.convert('RGBA')).astype(np.uint8)
    a = arr[:, :, 3]
    rgb = arr[:, :, :3]
    arr[a < 18, 3] = 0
    opaque = arr[:, :, 3] > 220
    if np.any(opaque):
        fringe = (arr[:, :, 3] > 0) & (arr[:, :, 3] <= 220)
        ys, xs = np.where(fringe)
        for y, x in zip(ys, xs):
            y0, y1 = max(0, y - 1), min(arr.shape[0], y + 2)
            x0, x1 = max(0, x - 1), min(arr.shape[1], x + 2)
            nmask = opaque[y0:y1, x0:x1]
            if np.any(nmask):
                cols = rgb[y0:y1, x0:x1][nmask]
                arr[y, x, :3] = cols.mean(axis=0).astype(np.uint8)
        arr[(arr[:, :, 3] > 18) & (arr[:, :, 3] < 120), 3] = 0
        arr[(arr[:, :, 3] >= 120) & (arr[:, :, 3] < 221), 3] = 255
    return Image.fromarray(arr, 'RGBA')


def remove_bg(crop: Image.Image) -> Image.Image:
    rgba = crop.convert('RGBA')
    arr = np.array(rgba)
    rgb = arr[:, :, :3].astype(np.int16)
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]], axis=0)
    bg = np.median(border, axis=0)
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    keep = dist > 25
    arr[~keep, 3] = 0
    mask = arr[:, :, 3] > 0
    if mask.any():
        h, w = mask.shape
        vis = np.zeros_like(mask, dtype=bool)
        best = []
        for sy, sx in zip(*np.where(mask)):
            if vis[sy, sx]:
                continue
            stack = [(sy, sx)]
            vis[sy, sx] = True
            comp = []
            while stack:
                y, x = stack.pop()
                comp.append((y, x))
                for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not vis[ny, nx]:
                        vis[ny, nx] = True
                        stack.append((ny, nx))
            if len(comp) > len(best):
                best = comp
        keep_mask = np.zeros_like(mask)
        for y, x in best:
            keep_mask[y, x] = True
        arr[~keep_mask, 3] = 0
    return alpha_fix(Image.fromarray(arr, 'RGBA'))


def normalize(im: Image.Image, scale_limit: float = 0.94, bottom_pad: int = 5) -> Image.Image:
    im = alpha_fix(im)
    bbox = im.getchannel('A').getbbox()
    if not bbox:
        return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    crop = im.crop(bbox)
    scale = min((CANVAS - 10) / crop.width, (CANVAS - 10) / crop.height, scale_limit)
    nw = max(1, round(crop.width * scale))
    nh = max(1, round(crop.height * scale))
    crop = crop.resize((nw, nh), Image.Resampling.NEAREST).filter(ImageFilter.SHARPEN)
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    x = (CANVAS - nw) // 2
    y = CANVAS - nh - bottom_pad
    canvas.alpha_composite(crop, (x, y))
    return canvas


def build_frames() -> dict[int, Image.Image]:
    sheet = Image.open(SRC).convert('RGBA')
    out: dict[int, Image.Image] = {}
    for idx, box in BOXES.items():
        out[idx] = normalize(remove_bg(sheet.crop(box)))
    return out


def write_sequences(frames: dict[int, Image.Image]) -> None:
    for action, idxs in ACTION_BOXES.items():
        count = COUNTS[action]
        seq = [frames[i] for i in idxs]
        folder = ANIM / action
        folder.mkdir(parents=True, exist_ok=True)
        for p in folder.glob('*.png'):
            p.unlink()
        expanded = [seq[i % len(seq)] for i in range(count)]
        for i, frame in enumerate(expanded):
            frame.save(folder / f'{i:02d}.png')
        # mirror into keyframes
        kfolder = KEY / action
        if kfolder.exists():
            for p in kfolder.glob('*.png'):
                p.unlink()
        else:
            kfolder.mkdir(parents=True, exist_ok=True)
        for i, frame in enumerate(expanded):
            frame.save(kfolder / f'{i:02d}.png')


def update_main_sprite(frames: dict[int, Image.Image]) -> None:
    main = normalize(remove_bg(Image.open(SRC).convert('RGBA').crop(BOXES[0])), scale_limit=1.0, bottom_pad=2)
    (ROOT / 'public' / 'sprites').mkdir(parents=True, exist_ok=True)
    main.save(ROOT / 'public' / 'sprites' / 'xvmon.png')


def update_scale() -> None:
    path = ROOT / 'src' / 'lib' / 'pet' / 'data.ts'
    txt = path.read_text(encoding='utf-8')
    txt = txt.replace('xvmon: { scale: 0.98, x: 0, y: -1 },', 'xvmon: { scale: 0.94, x: 0, y: 0 },')
    path.write_text(txt, encoding='utf-8')


def write_plan() -> None:
    text = '''# RODADA 3 — TROCA COMPLETA DOS SPRITES DO XV-MON

## O que foi feito

- Todos os sprites do `xvmon` passaram a usar a **nova sheet enviada pelo usuário**.
- As pastas atualizadas foram:
  - `public/sprites/animated/xvmon/*`
  - `public/sprites/keyframes/xvmon/*`
  - `public/sprites/xvmon.png`
- Ajustei a escala visual do XV-mon em `src/lib/pet/data.ts` para reduzir o tamanho em tela e manter consistência com as outras gerações.
- Foi aplicada uma limpeza automática de fundo para extrair os sprites da sheet cinza clara.

## Observações importantes

- A nova sheet é muito melhor para poses de combate, corrida e poder.
- Algumas ações utilitárias do jogo (`eat`, `clean`, `heal`, `sleep`) foram remontadas reaproveitando as poses da nova sheet, já que ela não traz um quadro específico para todas essas ações.
- O objetivo desta rodada foi garantir que **todo o conjunto visual do XV-mon** fique coerente com o novo material.

## Próxima melhoria sugerida

- Fazer uma rodada 4 de refinamento manual quadro a quadro para utilidades (`sleep`, `eat`, `clean`, `heal`) se você quiser fidelidade máxima em cada ação.
- Separar efeitos visuais em camadas próprias para o ataque, para deixar os FX ainda mais modernos e menos acoplados ao corpo do sprite.
'''
    (ROOT / 'PLANO_RODADA_3_XVMON.md').write_text(text, encoding='utf-8')


def write_preview(frames: dict[int, Image.Image]) -> None:
    rows = []
    for action in ['idle', 'eat', 'play', 'sleep', 'wake', 'clean', 'heal', 'evolve', 'attack-vee-laser']:
        files = sorted((ANIM / action).glob('*.png'))[:min(10, COUNTS[action])]
        row = Image.new('RGBA', (len(files) * 96, 118), (255, 255, 255, 255))
        for i, file in enumerate(files):
            row.alpha_composite(Image.open(file).convert('RGBA'), (i * 96, 6))
        ImageDraw.Draw(row).text((4, 101), action, fill='black')
        rows.append(row.convert('RGB'))
    sheet = Image.new('RGB', (max(r.width for r in rows), len(rows) * 118), (240, 240, 240))
    y = 0
    for row in rows:
        sheet.paste(row, (0, y))
        y += 118
    sheet.save(PREV_DIR / 'xvmon_round3_preview.png')


if __name__ == '__main__':
    ensure_dirs()
    frames = build_frames()
    write_sequences(frames)
    update_main_sprite(frames)
    update_scale()
    write_plan()
    write_preview(frames)
    print('Round 3 XV-mon replacement applied.')
