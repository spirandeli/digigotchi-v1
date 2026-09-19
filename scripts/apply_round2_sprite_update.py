from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageFilter
import numpy as np
import shutil

ROOT = Path(__file__).resolve().parents[1]
ANIM = ROOT / 'public' / 'sprites' / 'animated'
SHEETS_DIR = ROOT / 'attachments' / 'user_sprite_sheets_round2'
CANVAS = 96

SHEETS = {
    'garurumon': '/mnt/data/ghostwriter_images/context/545035af-ba89-5442-99a9-d067c2bce611.jpg',
    'gabumon': '/mnt/data/ghostwriter_images/context/08d629b8-ee68-55ee-8bd7-4333ff16c842.jpg',
    'veemon': '/mnt/data/ghostwriter_images/context/e73f96fc-611a-5115-9ffd-c66364334b31.jpg',
    'agumon': '/mnt/data/ghostwriter_images/context/41a6e073-462d-58ee-8c81-383b13aca053.jpg',
    'geogreymon': '/mnt/data/ghostwriter_images/context/6a3c6399-c45f-5195-be6c-660401e39f4d.jpg',
    'wargreymon': '/mnt/data/ghostwriter_images/context/bef61780-1ebb-5024-a910-8bc81cfea971.jpg',
    'etemon': '/mnt/data/ghostwriter_images/context/3104e9f5-e175-5421-94be-d699b66f08a5.jpg',
    'xvmon': '/mnt/data/ghostwriter_images/context/9003e04d-e579-5b23-8b42-f09737520b1d.jpg',
    'weregarurumon': '/mnt/data/ghostwriter_images/context/98136d57-acfc-5b24-814f-4bdcf84892f7.jpg',
    'metaletemon': '/mnt/data/ghostwriter_images/context/cfcc33e2-2efe-5de9-acda-f5d96b72b802.jpg',
    'flamedramon': '/mnt/data/ghostwriter_images/context/bc763154-f4c8-5bd4-9d9a-35558ec8ffea.jpg',
}

# Curated crop boxes from the user-provided sprite sheets. These only target the
# strongest new material; remaining actions keep the previous pipeline assets.
BOXES = {
    'flamedramon': {
        'idle': [
            (56, 21, 308, 379), (444, 32, 733, 380), (932, 32, 1240, 375),
            (1318, 43, 1620, 375), (1688, 41, 1995, 392),
        ],
        'play': [
            (1712, 394, 2025, 764), (68, 419, 359, 763), (1404, 459, 1674, 761),
        ],
        'attack-fire-rocket': [
            (932, 32, 1240, 375), (1318, 43, 1620, 375), (68, 419, 359, 763),
            (784, 431, 1072, 764), (1016, 430, 1378, 764),
            (1080, 811, 1933, 1141), (1080, 811, 1933, 1141),
            (1404, 459, 1674, 761), (564, 820, 904, 1141), (100, 800, 433, 1143),
        ],
    },
    'garurumon': {
        'idle': [
            (56, 70, 217, 183), (233, 71, 392, 184), (420, 71, 590, 184), (621, 67, 778, 184),
            (227, 464, 408, 573), (419, 460, 601, 576),
        ],
        'play': [
            (59, 936, 213, 1058), (224, 906, 380, 1034), (604, 919, 748, 1056),
        ],
        'attack-howling-blaster': [
            (227, 464, 408, 573), (419, 460, 601, 576),
            (613, 662, 827, 768), (1028, 692, 1191, 755), (1194, 684, 1293, 771),
            (1658, 656, 1820, 780), (1830, 656, 1993, 780),
            (227, 464, 408, 573), (419, 460, 601, 576),
        ],
    },
    'weregarurumon': {
        'idle': [
            (79, 32, 350, 380), (457, 34, 793, 379), (939, 33, 1242, 376),
            (1305, 49, 1629, 377), (1698, 33, 1997, 397),
        ],
        'play': [
            (1015, 431, 1325, 764), (1685, 774, 1980, 1143), (120, 802, 439, 1143),
        ],
        'attack-wolf-claw': [
            (457, 34, 793, 379), (939, 33, 1242, 376), (1305, 49, 1629, 377),
            (1015, 431, 1325, 764), (1066, 802, 1574, 1143), (1066, 802, 1574, 1143),
            (1685, 774, 1980, 1143), (120, 802, 439, 1143),
        ],
    },
    'etemon': {
        'idle': [
            (37, 43, 188, 341), (213, 43, 365, 341), (382, 46, 529, 341),
            (551, 46, 701, 341), (707, 46, 911, 341),
        ],
        'play': [
            (923, 44, 1046, 340), (1061, 44, 1206, 341), (1228, 44, 1374, 341),
            (38, 434, 221, 728), (230, 434, 389, 727), (398, 445, 550, 728),
            (559, 447, 731, 728),
        ],
        'attack-love-serenade': [
            (923, 44, 1046, 340), (1061, 44, 1206, 341), (1228, 44, 1374, 341),
            (38, 434, 221, 728), (230, 434, 389, 727), (398, 445, 550, 728),
            (559, 447, 731, 728), (743, 439, 925, 727), (1032, 444, 1194, 728),
            (1210, 443, 1373, 727),
        ],
    },
    'metaletemon': {
        'idle': [
            (46, 209, 344, 656), (383, 225, 642, 656), (661, 238, 979, 656),
            (1014, 166, 1346, 633),
        ],
        'play': [
            (48, 753, 434, 1266), (469, 865, 905, 1289), (1192, 989, 1364, 1157),
            (997, 1499, 1276, 1943), (505, 1695, 941, 1942),
        ],
        'attack-banana-slip': [
            (1014, 166, 1346, 633), (48, 753, 434, 1266),
            (1142, 838, 1276, 983), (919, 932, 999, 1002), (1030, 888, 1111, 959),
            (965, 1016, 1050, 1090), (1049, 977, 1184, 1043), (1192, 989, 1364, 1157),
            (929, 1098, 1010, 1177), (1082, 1066, 1174, 1157), (1044, 1148, 1128, 1221),
        ],
    },
}

COUNTS = {
    'idle': 10, 'eat': 10, 'play': 12, 'sleep': 6, 'wake': 8,
    'clean': 10, 'heal': 10, 'evolve': 14,
    'attack-fire-rocket': 12, 'attack-howling-blaster': 12,
    'attack-wolf-claw': 12, 'attack-love-serenade': 12, 'attack-banana-slip': 12,
}


def ensure_refs():
    SHEETS_DIR.mkdir(parents=True, exist_ok=True)
    mapping_lines = ['# Sprite sheets recebidas na rodada 2', '']
    for species, src in SHEETS.items():
        dest = SHEETS_DIR / f'{species}{Path(src).suffix.lower()}'
        shutil.copy2(src, dest)
        mapping_lines.append(f'- {species}: {dest.name}')
    (SHEETS_DIR / 'README.md').write_text('\n'.join(mapping_lines), encoding='utf-8')


def alpha_fix(im: Image.Image) -> Image.Image:
    arr = np.array(im.convert('RGBA')).astype(np.uint8)
    a = arr[:, :, 3]
    rgb = arr[:, :, :3]
    # zero very faint pixels
    arr[a < 20, 3] = 0
    # replace fringe rgb with nearby opaque color to avoid transparent lines
    opaque = arr[:, :, 3] > 200
    if np.any(opaque):
        ys, xs = np.where(opaque)
        for y, x in zip(*np.where((arr[:, :, 3] > 0) & (arr[:, :, 3] <= 200))):
            # search a small neighborhood
            y0, y1 = max(0, y-1), min(arr.shape[0], y+2)
            x0, x1 = max(0, x-1), min(arr.shape[1], x+2)
            neigh = opaque[y0:y1, x0:x1]
            if np.any(neigh):
                cols = rgb[y0:y1, x0:x1][neigh]
                arr[y, x, :3] = cols.mean(axis=0).astype(np.uint8)
        arr[(arr[:, :, 3] > 20) & (arr[:, :, 3] < 120), 3] = 0
        arr[(arr[:, :, 3] >= 120) & (arr[:, :, 3] < 200), 3] = 255
    return Image.fromarray(arr, 'RGBA')


def remove_bg(crop: Image.Image) -> Image.Image:
    rgba = crop.convert('RGBA')
    arr = np.array(rgba)
    rgb = arr[:, :, :3].astype(np.int16)
    alpha = arr[:, :, 3]
    # estimate bg from corners/border
    border = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]], axis=0)
    bg = np.median(border, axis=0)
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    keep = dist > 24
    # Also keep already transparent pixels as false.
    arr[~keep, 3] = 0
    # Keep only largest connected component to remove labels.
    mask = arr[:, :, 3] > 0
    if mask.any():
        h, w = mask.shape
        visited = np.zeros_like(mask, dtype=bool)
        best = []
        for sy, sx in zip(*np.where(mask)):
            if visited[sy, sx]:
                continue
            stack = [(sy, sx)]
            comp = []
            visited[sy, sx] = True
            while stack:
                y, x = stack.pop()
                comp.append((y, x))
                for ny, nx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        stack.append((ny, nx))
            if len(comp) > len(best):
                best = comp
        keep_mask = np.zeros_like(mask)
        for y, x in best:
            keep_mask[y, x] = True
        arr[~keep_mask, 3] = 0
    im = Image.fromarray(arr, 'RGBA')
    return alpha_fix(im)


def normalize(im: Image.Image, *, scale_limit: float = 1.0, bottom_pad: int = 5, sharpen=False) -> Image.Image:
    im = alpha_fix(im)
    bbox = im.getchannel('A').getbbox()
    if not bbox:
        return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    crop = im.crop(bbox)
    scale = min((CANVAS - 10) / crop.width, (CANVAS - 10) / crop.height, scale_limit)
    nw = max(1, round(crop.width * scale))
    nh = max(1, round(crop.height * scale))
    crop = crop.resize((nw, nh), Image.Resampling.NEAREST)
    if sharpen:
        crop = crop.filter(ImageFilter.SHARPEN)
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    x = (CANVAS - nw) // 2
    y = CANVAS - nh - bottom_pad
    canvas.alpha_composite(crop, (x, y))
    return canvas


def save_sequence(species: str, action: str, frames: list[Image.Image]):
    folder = ANIM / species / action
    folder.mkdir(parents=True, exist_ok=True)
    count = COUNTS[action]
    for p in folder.glob('*.png'):
        p.unlink()
    if not frames:
        return
    seq = [frames[i % len(frames)] for i in range(count)]
    for i, frame in enumerate(seq):
        frame.save(folder / f'{i:02d}.png')


def build_replacements():
    for species, action_boxes in BOXES.items():
        sheet = Image.open(SHEETS[species]).convert('RGBA')
        for action, boxes in action_boxes.items():
            frames = []
            for box in boxes:
                crop = sheet.crop(box)
                cut = remove_bg(crop)
                scale_limit = 0.95 if species in {'garurumon', 'weregarurumon'} else 1.0
                frames.append(normalize(cut, scale_limit=scale_limit, bottom_pad=5, sharpen=True))
            save_sequence(species, action, frames)


def dehalo_existing():
    for p in ANIM.rglob('*.png'):
        im = Image.open(p).convert('RGBA')
        fixed = alpha_fix(im)
        fixed.save(p)


def write_plan():
    text = '''# PLANO DE MELHORIA DE SPRITES E EFEITOS — RODADA 2

## O que foi aplicado nesta rodada

- Inclusão das **novas sprite sheets enviadas pelo usuário** em `attachments/user_sprite_sheets_round2/`.
- **Limpeza de halos e linhas transparentes** nos PNGs de animação já existentes.
- Substituição parcial das animações com melhor material novo para:
  - Flamedramon
  - Garurumon
  - WereGarurumon
  - Etemon
  - MetalEtemon
- Atualização do ataque de **Flamedramon**, ignorando a pose com roupa inconsistente.
- Preservação dos outros conjuntos como fallback, para evitar quebrar o jogo.

## Ajustes visuais priorizados

1. **Bordas**
   - Reduzir fringe/halo em pixels semi-transparentes.
   - Preservar outlines pretos do pixel art.

2. **FX mais limpos**
   - Ataques substituídos passaram a usar poses mais legíveis e impactos mais claros.
   - Ainda há espaço para uma rodada 3 focada em separar personagem e FX em layers distintas.

3. **Flamedramon**
   - A pose com roupa errada foi deixada fora da sequência principal.
   - O ataque `attack-fire-rocket` agora privilegia a pose final do foguete de fogo.

## Pendências recomendadas para a próxima rodada

- Recortar manualmente **Agumon, Gabumon, Veemon, XV-mon e GeoGreymon** diretamente das novas sheets com marcação humana quadro a quadro.
- Criar uma biblioteca de **FX separados** (fogo, gelo, impacto, energia, som) para reaproveitamento.
- Separar ataques em estrutura: `windup -> release -> travel -> impact -> recovery`.
- Revisar escala por estágio evolutivo em tela após teste jogável.
- Converter sheets finais para **PNG com transparência real**, evitando JPG como fonte de produção.

## Observação

Este pacote foi montado para entregar um estado **melhor e mais consistente sem quebrar o projeto**. Alguns monstros já receberam material novo diretamente; outros ainda usam o pipeline anterior com limpeza de bordas.
'''
    (ROOT / 'docs' / 'planos-e-reviews' / 'PLANO_MELHORIA_SPRITES_E_EFEITOS_RODADA_2.md').write_text(text, encoding='utf-8')


def tweak_layouts():
    path = ROOT / 'src' / 'lib' / 'pet' / 'data.ts'
    text = path.read_text(encoding='utf-8')
    replacements = {
        'garurumon: { scale: 0.93, x: 0, y: 2 },': 'garurumon: { scale: 0.91, x: 0, y: 2 },',
        'weregarurumon: { scale: 1.01, x: 0, y: -1 },': 'weregarurumon: { scale: 0.99, x: 0, y: -1 },',
        'flamedramon: { scale: 0.96, x: 0, y: 0 },': 'flamedramon: { scale: 0.94, x: 0, y: 0 },',
        'metaletemon: { scale: 1.04, x: 0, y: -1 },': 'metaletemon: { scale: 1.00, x: 0, y: -1 },',
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    path.write_text(text, encoding='utf-8')


if __name__ == '__main__':
    ensure_refs()
    dehalo_existing()
    build_replacements()
    tweak_layouts()
    write_plan()
    print('Round 2 sprite update applied.')
