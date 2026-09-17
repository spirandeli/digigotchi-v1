from __future__ import annotations
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
import math
from typing import List, Tuple
import numpy as np
import cv2

ROOT = Path(__file__).resolve().parents[1]
SPRITES = ROOT / 'public' / 'sprites' / 'animated'
OUT = SPRITES
CANVAS = 96

SPECIES = [
    'agumon', 'geogreymon', 'wargreymon', 'etemon', 'metaletemon',
    'gabumon', 'garurumon', 'weregarurumon', 'veemon', 'flamedramon', 'xvmon'
]
ACTIONS = ['idle', 'eat', 'play', 'sleep', 'wake', 'clean', 'heal', 'evolve']
COUNTS = {'idle': 8, 'eat': 8, 'play': 8, 'sleep': 4, 'wake': 8, 'clean': 8, 'heal': 8, 'evolve': 10}

MOUTH = {
    'agumon': (58, 38), 'geogreymon': (61, 31), 'wargreymon': (59, 33), 'etemon': (56, 28),
    'metaletemon': (56, 28), 'gabumon': (57, 36), 'garurumon': (58, 35), 'weregarurumon': (57, 31),
    'veemon': (55, 33), 'flamedramon': (53, 28), 'xvmon': (54, 28),
}

SPECIES_GROUPS = {
    'fire': {'agumon', 'geogreymon', 'wargreymon', 'flamedramon'},
    'music': {'etemon', 'metaletemon'},
    'wolf': {'gabumon', 'garurumon', 'weregarurumon'},
    'dragon': {'veemon', 'xvmon'},
}


def species_group(species: str) -> str:
    for key, values in SPECIES_GROUPS.items():
        if species in values:
            return key
    return 'other'

PLAY_FOCUS = {
    'agumon': (62, 48), 'geogreymon': (64, 42), 'wargreymon': (61, 44), 'etemon': (53, 44),
    'metaletemon': (55, 42), 'gabumon': (60, 48), 'garurumon': (62, 46), 'weregarurumon': (60, 42),
    'veemon': (60, 44), 'flamedramon': (59, 44), 'xvmon': (59, 42),
}


def load_frames(species: str, action: str) -> List[Image.Image]:
    p = SPRITES / species / action
    frames = []
    if p.exists():
        for img_path in sorted(p.glob('*.png')):
            frames.append(Image.open(img_path).convert('RGBA'))
    return frames


def save_frames(species: str, action: str, frames: List[Image.Image]):
    p = SPRITES / species / action
    p.mkdir(parents=True, exist_ok=True)
    for old in p.glob('*.png'):
        old.unlink()
    for i, frame in enumerate(frames):
        frame.save(p / f'{i:02d}.png')


def largest_bbox(alpha: Image.Image):
    data = alpha.load()
    w, h = alpha.size
    pts = [(x, y) for y in range(h) for x in range(w) if data[x, y] > 0]
    if not pts:
        return (0, 0, w, h)
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    return (min(xs), min(ys), max(xs) + 1, max(ys) + 1)


def cleanup(frame: Image.Image) -> Image.Image:
    # remove distant small artifacts while keeping transparent bg.
    arr = np.array(frame)
    alpha = arr[:, :, 3]
    if not np.any(alpha > 0):
        return frame
    mask = (alpha > 0).astype(np.uint8)
    n, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    if n > 1:
        areas = stats[1:, cv2.CC_STAT_AREA]
        main_idx = 1 + int(np.argmax(areas))
        x = stats[main_idx, cv2.CC_STAT_LEFT]
        y = stats[main_idx, cv2.CC_STAT_TOP]
        w = stats[main_idx, cv2.CC_STAT_WIDTH]
        h = stats[main_idx, cv2.CC_STAT_HEIGHT]
        keep = np.zeros_like(mask, dtype=bool)
        expand = 6
        bx0, by0, bx1, by1 = x - expand, y - expand, x + w + expand, y + h + expand
        for idx in range(1, n):
            area = stats[idx, cv2.CC_STAT_AREA]
            cx = stats[idx, cv2.CC_STAT_LEFT]
            cy = stats[idx, cv2.CC_STAT_TOP]
            cw = stats[idx, cv2.CC_STAT_WIDTH]
            ch = stats[idx, cv2.CC_STAT_HEIGHT]
            intersects = not (cx + cw < bx0 or cy + ch < by0 or cx > bx1 or cy > by1)
            if idx == main_idx or (area >= max(8, stats[main_idx, cv2.CC_STAT_AREA] * 0.025) and intersects):
                keep |= labels == idx
        arr[~keep, 3] = 0
    alpha_img = Image.fromarray(arr[:, :, 3], mode='L')
    bbox = alpha_img.getbbox()
    if not bbox:
        return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    cropped = Image.fromarray(arr, mode='RGBA').crop(bbox)
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    x = (CANVAS - cropped.width) // 2
    y = CANVAS - cropped.height - 4
    canvas.alpha_composite(cropped, (x, y))
    return canvas


def sample_frames(frames: List[Image.Image], count: int) -> List[Image.Image]:
    if not frames:
        return [Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0)) for _ in range(count)]
    if len(frames) == count:
        return [f.copy() for f in frames]
    if len(frames) == 1:
        return [frames[0].copy() for _ in range(count)]
    out = []
    for i in range(count):
        idx = round(i * (len(frames) - 1) / max(1, count - 1))
        out.append(frames[idx].copy())
    return out


def shift_scale(frame: Image.Image, dx=0, dy=0, scale=1.0) -> Image.Image:
    if abs(scale - 1.0) > 1e-3:
        nw = max(1, int(round(frame.width * scale)))
        nh = max(1, int(round(frame.height * scale)))
        img = frame.resize((nw, nh), Image.Resampling.NEAREST)
    else:
        img = frame.copy()
    canvas = Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))
    x = (CANVAS - img.width) // 2 + int(dx)
    y = (CANVAS - img.height) // 2 + int(dy)
    canvas.alpha_composite(img, (x, y))
    return cleanup(canvas)


def draw_shadow(im: Image.Image, width_scale=0.55) -> Image.Image:
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out.alpha_composite(im)
    d = ImageDraw.Draw(out)
    cx = CANVAS // 2
    cy = CANVAS - 8
    rx = int(CANVAS * width_scale / 2)
    ry = 7
    d.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=(0, 0, 0, 46))
    out.alpha_composite(im)
    return out


def overlay_bubbles(im: Image.Image, t: float):
    out = im.copy()
    d = ImageDraw.Draw(out)
    xs = [18, 28, 68, 78, 50]
    ys = [26, 58, 28, 54, 18]
    sizes = [7, 10, 9, 6, 5]
    for i, (x, y, s) in enumerate(zip(xs, ys, sizes)):
        offset = math.sin(t * math.tau + i) * 4
        alpha = 90 + int(60 * (0.5 + 0.5 * math.sin(t * math.tau + i * 1.4)))
        d.ellipse((x, y - offset, x + s, y + s - offset), fill=(220, 245, 255, alpha), outline=(255, 255, 255, min(255, alpha + 40)))
    return out


def overlay_heal(im: Image.Image, t: float):
    out = im.copy()
    d = ImageDraw.Draw(out)
    for i in range(4):
        ang = t * math.tau + i * math.pi / 2
        x = 48 + math.cos(ang) * 24
        y = 40 + math.sin(ang) * 18
        sz = 4 + (i % 2)
        color = (120, 255, 150, 185)
        d.rounded_rectangle((x - sz, y - 2, x + sz, y + 2), radius=1, fill=color)
        d.rounded_rectangle((x - 2, y - sz, x + 2, y + sz), radius=1, fill=color)
    return out


def overlay_sleep(im: Image.Image, idx: int, count: int):
    out = ImageEnhance.Brightness(im).enhance(0.9)
    d = ImageDraw.Draw(out)
    z_positions = [(68, 12), (74, 22), (80, 34)]
    active = min(3, 1 + idx)
    for i in range(active):
        x, y = z_positions[i]
        scale = 1 + i * 0.15
        color = (188, 216, 255, 210)
        # pixel-ish Z
        w = int(8 * scale)
        h = int(8 * scale)
        d.rectangle((x, y, x + w, y + 2), fill=color)
        d.rectangle((x + 2, y, x + w - 2, y + h), fill=color)
        d.rectangle((x, y + h - 2, x + w, y + h), fill=color)
    return out


def overlay_wake(im: Image.Image, idx: int, count: int):
    out = im.copy()
    d = ImageDraw.Draw(out)
    cx, cy = 74, 16
    radius = 6 + idx % 2
    d.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=(255, 223, 85, 200), outline=(255, 245, 180, 240))
    for ang in range(0, 360, 45):
        a = math.radians(ang)
        x1 = cx + math.cos(a) * (radius + 2)
        y1 = cy + math.sin(a) * (radius + 2)
        x2 = cx + math.cos(a) * (radius + 8)
        y2 = cy + math.sin(a) * (radius + 8)
        d.line((x1, y1, x2, y2), fill=(255, 240, 140, 230), width=2)
    if idx >= count // 2:
        d.text((18, 10), '!', fill=(255, 255, 255, 220))
    return out


def draw_food(d: ImageDraw.ImageDraw, x: int, y: int, species: str):
    group = species_group(species)
    if species in {'etemon', 'metaletemon'}:
        d.polygon([(x, y + 4), (x + 8, y), (x + 18, y + 8), (x + 12, y + 18), (x + 5, y + 16), (x, y + 10)], fill=(250, 220, 70, 235), outline=(170, 120, 0, 255))
        d.rectangle((x + 1, y + 15, x + 5, y + 19), fill=(150, 85, 35, 255))
    elif group == 'wolf':
        d.rounded_rectangle((x, y + 2, x + 18, y + 13), radius=4, fill=(184, 90, 50, 240), outline=(96, 41, 22, 255))
        d.rectangle((x + 14, y + 10, x + 18, y + 18), fill=(240, 233, 210, 240), outline=(214, 214, 214, 255))
    elif group == 'dragon':
        d.rounded_rectangle((x, y + 4, x + 16, y + 15), radius=3, fill=(245, 228, 175, 235), outline=(164, 118, 44, 255))
        d.rectangle((x + 3, y, x + 13, y + 6), fill=(255, 242, 201, 220))
    else:
        d.rounded_rectangle((x, y + 3, x + 18, y + 14), radius=4, fill=(174, 90, 62, 235), outline=(92, 36, 26, 255))
        d.circle((x + 13, y + 5), 2, fill=(255, 255, 255, 190))
        d.circle((x + 13, y + 10), 2, fill=(255, 255, 255, 190))


def overlay_eat(im: Image.Image, idx: int, count: int, species: str):
    out = im.copy()
    d = ImageDraw.Draw(out)
    mx, my = MOUTH[species]
    start_x = 10
    x = int(start_x + (mx - start_x - 12) * (idx / max(1, count - 1)))
    y = int(my + math.sin(idx / max(1, count - 1) * math.pi) * -4)
    draw_food(d, x, y, species)
    # bite spark on later frames
    if idx >= count // 2:
        d.arc((mx - 10, my - 6, mx + 6, my + 10), start=300, end=40, fill=(255, 255, 255, 230), width=2)
    return out


def overlay_play(im: Image.Image, idx: int, count: int, species: str):
    out = im.copy()
    d = ImageDraw.Draw(out)
    fx, fy = PLAY_FOCUS[species]
    t = idx / max(1, count - 1)
    x = int(12 + t * 68)
    y = int(54 - math.sin(t * math.pi) * 26)
    group = species_group(species)
    if group == 'music':
        r = 7
        d.ellipse((x - r, y - r, x + r, y + r), fill=(180, 210, 255, 235), outline=(255, 255, 255, 255))
        for ox, oy in [(-2, 2), (4, -3), (6, 5)]:
            d.ellipse((x + ox - 1, y + oy - 1, x + ox + 1, y + oy + 1), fill=(255, 255, 255, 220))
        d.arc((x - 16, y - 16, x + 16, y + 16), start=180, end=330, fill=(255, 255, 180, 140), width=2)
        if idx % 2 == 0:
            d.text((fx - 6, fy - 14), '♪', fill=(255, 235, 130, 240))
    elif group == 'fire':
        r = 8
        d.ellipse((x - r, y - r, x + r, y + r), fill=(255, 180, 60, 240), outline=(255, 240, 170, 255))
        d.polygon([(x, y - 10), (x + 5, y - 2), (x + 2, y + 8), (x - 3, y + 2), (x - 6, y + 12), (x - 8, y + 1)], fill=(255, 94, 40, 220))
        d.arc((x - 15, y - 15, x + 15, y + 15), start=200, end=320, fill=(255, 255, 255, 120), width=2)
    else:
        r = 7
        fill = (255, 126, 82, 240) if group == 'wolf' else (214, 74, 92, 240)
        d.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=(255, 236, 170, 255))
        d.line((x - 4, y, x + 4, y), fill=(255, 255, 255, 220), width=1)
        d.line((x, y - 4, x, y + 4), fill=(255, 255, 255, 220), width=1)
        d.arc((x - 14, y - 14, x + 14, y + 14), start=210, end=300, fill=(255, 255, 255, 120), width=2)
    if idx % 2 == 0:
        d.ellipse((fx - 2, fy - 2, fx + 2, fy + 2), fill=(255, 255, 255, 200))
    return out


def overlay_evolve(im: Image.Image, idx: int, count: int):
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    aura = Image.new('RGBA', im.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(aura)
    pulse = idx / max(1, count - 1)
    for r, color in [(24, (89, 209, 255, 70)), (32, (200, 92, 255, 60)), (40, (255, 235, 120, 55))]:
        rr = int(r + math.sin(pulse * math.pi * 2) * 2)
        d.ellipse((48 - rr, 48 - rr, 48 + rr, 48 + rr), outline=color, width=3)
    for i in range(8):
        a = (math.pi * 2 * i / 8) + pulse * 0.8
        x = 48 + math.cos(a) * 34
        y = 48 + math.sin(a) * 34
        d.ellipse((x - 2, y - 2, x + 2, y + 2), fill=(255, 255, 255, 210))
    out.alpha_composite(aura)
    if idx in {count // 2, count // 2 + 1}:
        glow = Image.new('RGBA', im.size, (255, 255, 255, 42 if idx == count // 2 else 78))
        out.alpha_composite(glow)
    out.alpha_composite(im)
    return out


def enhance_species_palette(frame: Image.Image, species: str) -> Image.Image:
    group = species_group(species)
    color_factor = 1.15
    sharp_factor = 1.08
    if group == 'fire':
        color_factor = 1.18
    elif group == 'music':
        color_factor = 1.1
        sharp_factor = 1.12
    elif group == 'dragon':
        color_factor = 1.14
    if species in {'garurumon', 'weregarurumon'}:
        return frame
    colored = ImageEnhance.Color(frame).enhance(color_factor)
    sharpened = ImageEnhance.Sharpness(colored).enhance(sharp_factor)
    return sharpened


def colorize_gray(frame: Image.Image, species: str) -> Image.Image:
    # targeted colorization for grayscale Garurumon / WereGarurumon extracted sheets.
    im = frame.copy()
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if max(r, g, b) - min(r, g, b) > 18:
                continue  # already colored enough
            lum = (r + g + b) // 3
            # preserve dark outline
            if lum < 40:
                continue
            rx, ry = x / max(1, w), y / max(1, h)
            if species == 'garurumon':
                # base fur map
                if lum > 210:
                    nr, ng, nb = 236, 245, 255
                elif lum > 150:
                    nr, ng, nb = 170, 201, 248
                elif lum > 90:
                    nr, ng, nb = 92, 120, 208
                else:
                    nr, ng, nb = 52, 62, 145
                # pink claws lower front and back paws
                if ry > 0.72 and (rx < 0.28 or rx > 0.72):
                    nr, ng, nb = 180, 55, 95
                # eye area
                if 0.45 < rx < 0.62 and 0.24 < ry < 0.42 and lum > 120:
                    nr, ng, nb = 236, 211, 74
                # mouth area
                if 0.48 < rx < 0.74 and 0.38 < ry < 0.60 and lum > 80:
                    nr, ng, nb = 185, 45, 54
            else:  # weregarurumon
                if lum > 220:
                    nr, ng, nb = 241, 243, 255
                elif lum > 165:
                    nr, ng, nb = 179, 190, 235
                elif lum > 100:
                    nr, ng, nb = 109, 125, 194
                else:
                    nr, ng, nb = 66, 74, 138
                # pants / lower body navy-blue block
                if ry > 0.52 and 0.22 < rx < 0.88 and lum > 65:
                    nr, ng, nb = 47, 75, 128
                # gloves / shoulder padding warm brownish
                if ((rx < 0.3 and 0.15 < ry < 0.55) or (rx > 0.72 and 0.1 < ry < 0.48)) and lum > 80:
                    nr, ng, nb = 155, 113, 70
                # claws and bandages
                if (ry > 0.75 and rx < 0.4) or (0.55 < ry < 0.9 and rx > 0.7):
                    nr, ng, nb = 214, 214, 224
                # mouth
                if 0.40 < rx < 0.70 and 0.25 < ry < 0.48 and lum > 80:
                    nr, ng, nb = 190, 48, 50
                # eye
                if 0.43 < rx < 0.60 and 0.17 < ry < 0.34 and lum > 100:
                    nr, ng, nb = 226, 206, 110
            px[x, y] = (nr, ng, nb, a)
    return im


def choose_source_frames(species: str, action: str):
    order_map = {
        'idle': ['idle'],
        'eat': ['eat', 'idle'],
        'play': ['play', 'idle', 'evolve'],
        'sleep': ['sleep', 'idle'],
        'wake': ['wake', 'sleep', 'idle'],
        'clean': ['clean', 'idle', 'play'],
        'heal': ['heal', 'idle', 'clean'],
        'evolve': ['evolve', 'play', 'idle'],
    }
    frames = []
    for src_action in order_map[action]:
        frames.extend(load_frames(species, src_action))
        if len(frames) >= 2:
            break
    return [cleanup(f) for f in frames]


def build_action(species: str, action: str) -> List[Image.Image]:
    base = choose_source_frames(species, action)
    desired = COUNTS[action]
    chosen = sample_frames(base, desired)
    out = []
    for idx, frame in enumerate(chosen):
        if species in {'garurumon', 'weregarurumon'}:
            frame = colorize_gray(frame, species)
        frame = enhance_species_palette(frame, species)
        # subtle per-frame motion
        bob = math.sin((idx / max(1, desired - 1)) * math.pi * 2)
        scale = 1.02 if action in {'idle', 'sleep'} and idx % 2 == 0 else (1.03 if action == 'evolve' and idx % 3 == 0 else 1.0)
        dy = -2 * bob if action in {'idle', 'play', 'wake'} else (1 * bob if action == 'sleep' else (-1 * bob if action == 'evolve' else 0))
        dx = 2 * bob if action == 'play' else (1 * bob if action == 'heal' else 0)
        cur = shift_scale(frame, dx=dx, dy=dy, scale=scale)
        if action == 'eat':
            cur = overlay_eat(cur, idx, desired, species)
        elif action == 'play':
            cur = overlay_play(cur, idx, desired, species)
        elif action == 'sleep':
            cur = overlay_sleep(cur, idx, desired)
        elif action == 'wake':
            cur = overlay_wake(cur, idx, desired)
        elif action == 'clean':
            cur = overlay_bubbles(cur, idx / max(1, desired - 1))
        elif action == 'heal':
            cur = overlay_heal(cur, idx / max(1, desired - 1))
        elif action == 'evolve':
            cur = overlay_evolve(cur, idx, desired)
        cur = draw_shadow(cur, 0.52 if species in {'garurumon', 'weregarurumon'} else 0.56)
        out.append(cur)
    return out


def main():
    for species in SPECIES:
        for action in ACTIONS:
            frames = build_action(species, action)
            save_frames(species, action, frames)
    print('Refined sprites generated.')

if __name__ == '__main__':
    main()
