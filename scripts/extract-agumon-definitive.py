#!/usr/bin/env python3
"""Definitive, pixel-perfect Agumon sprite extractor.

Extracts canonical frames directly from the master sheet
`rougue-like-character-sprites/agumon/aagumon.png` with clean transparency,
consistent baseline alignment on a 96x96 canvas, zero noise, and
accurate directional orientation.
"""

from pathlib import Path
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SHEET_PATH = ROOT / "rougue-like-character-sprites" / "agumon" / "aagumon.png"
DEST_ROOT = ROOT / "rougue-like-character-sprites" / "agumon"
REVIEW_SHEET = ROOT / "screenshots" / "sprite-review" / "agumon-definitive-review.png"

CANVAS_SIZE = (96, 96)
GROUND_Y = 90  # Feet baseline corresponding to originY ~0.94 on a 96px canvas

def get_blobs(sheet: Image.Image, box: tuple[int, int, int, int], min_area=100, skip_blue=True):
    crop = sheet.crop(box)
    cw, ch = crop.size
    alpha = crop.getchannel("A")
    visited = set()
    blobs = []
    for y in range(ch):
        for x in range(cw):
            if (x, y) in visited or alpha.getpixel((x, y)) < 25:
                continue
            r, g, b, a = crop.getpixel((x, y))
            if skip_blue and b > 55 and r < 35 and g < 65:
                continue
            stack = [(x, y)]
            visited.add((x, y))
            min_x, max_x, min_y, max_y = x, x, y, y
            pixel_count = 0
            while stack:
                cx, cy = stack.pop()
                pixel_count += 1
                if cx < min_x: min_x = cx
                if cx > max_x: max_x = cx
                if cy < min_y: min_y = cy
                if cy > max_y: max_y = cy
                for ny in (cy - 1, cy + 1):
                    if 0 <= ny < ch and (cx, ny) not in visited and alpha.getpixel((cx, ny)) >= 25:
                        visited.add((cx, ny))
                        stack.append((cx, ny))
                for nx in (cx - 1, cx + 1):
                    if 0 <= nx < cw and (nx, cy) not in visited and alpha.getpixel((nx, cy)) >= 25:
                        visited.add((nx, cy))
                        stack.append((nx, cy))
            if pixel_count >= min_area and (max_x - min_x) > 15 and (max_y - min_y) > 15:
                bx1 = box[0] + min_x
                by1 = box[1] + min_y
                bx2 = box[0] + max_x + 1
                by2 = box[1] + max_y + 1
                blobs.append((bx1, by1, bx2, by2, pixel_count))
    blobs.sort(key=lambda b: b[0])
    return blobs

def place_on_canvas(frame: Image.Image, is_effect: bool = False) -> Image.Image:
    canvas = Image.new("RGBA", CANVAS_SIZE, (0, 0, 0, 0))
    fw, fh = frame.size
    if is_effect:
        # Center effect both horizontally and vertically
        x = max(0, (CANVAS_SIZE[0] - fw) // 2)
        y = max(0, (CANVAS_SIZE[1] - fh) // 2)
    else:
        # Align character by feet baseline
        x = max(0, (CANVAS_SIZE[0] - fw) // 2)
        y = max(0, min(CANVAS_SIZE[1] - fh, GROUND_Y - fh))
    canvas.alpha_composite(frame, (x, y))
    return canvas

def main():
    sheet = Image.open(SHEET_PATH).convert("RGBA")
    print(f"Loaded master sheet: {SHEET_PATH} ({sheet.size})")

    # Define extraction regions
    actions = {}

    # 1. Idle (9 frames)
    idles = get_blobs(sheet, (10, 50, 750, 165), min_area=1500)
    actions["idle"] = [sheet.crop(b[:4]) for b in idles]

    # 2. Walk Left (11 frames)
    w_left = get_blobs(sheet, (750, 48, 1530, 135), min_area=1000)
    actions["walk/left"] = [sheet.crop(b[:4]) for b in w_left]

    # 3. Walk Right (10 frames) - real right-facing walk frames!
    w_right = get_blobs(sheet, (750, 168, 1530, 260), min_area=1000)
    actions["walk/right"] = [sheet.crop(b[:4]) for b in w_right]

    # 4. Attack Basic 1 (Punch - 6 frames)
    punch = get_blobs(sheet, (10, 535, 410, 655), min_area=1000)
    actions["attacks/basic_1"] = [sheet.crop(b[:4]) for b in punch]

    # 5. Attack Basic 2 (Dragon Breath cast - 4 frames)
    drag = get_blobs(sheet, (410, 535, 900, 655), min_area=300)
    # drag_01..04 are character cast, 05..07 are projectile
    actions["attacks/basic_2"] = [sheet.crop(b[:4]) for b in drag[:4]]
    actions["projectiles/dragon"] = [sheet.crop(b[:4]) for b in drag[4:7]]

    # 6. Attack Special (Mega Blast - 3 charge frames + 6 blast effect frames)
    mega = get_blobs(sheet, (900, 535, 1530, 655), min_area=300)
    actions["attacks/special"] = [sheet.crop(b[:4]) for b in mega[:3]]
    actions["effects/mega-blast"] = [sheet.crop(b[:4]) for b in mega[3:]]

    # 7. Heal (Recovery - 5 frames)
    heal = get_blobs(sheet, (10, 690, 350, 815), min_area=500)
    actions["heal"] = [sheet.crop(b[:4]) for b in heal]

    # 8. Variations: Hit, Death, Victory
    var = get_blobs(sheet, (1080, 850, 1530, 1000), min_area=1000)
    # var_02 is red Dano (hit), var_03 is grey Morte (death), var_05 is Vitoria (victory)
    actions["hit"] = [sheet.crop(var[1][:4])]
    actions["death"] = [sheet.crop(var[2][:4])]
    actions["victory"] = [sheet.crop(var[4][:4])]

    # 9. Evolution (Teleport digital beam - 3 frames)
    tel = get_blobs(sheet, (1330, 690, 1530, 815), min_area=500)
    # tel_02, 03, 04 are the 3 frames
    actions["evolution"] = [sheet.crop(b[:4]) for b in tel[1:4]]

    # Write out each frame onto standardized 96x96 canvas
    total_frames = 0
    for action_path, frames in actions.items():
        folder = DEST_ROOT / action_path
        folder.mkdir(parents=True, exist_ok=True)
        stem = action_path.replace("/", "_").replace("-", "_")
        is_fx = action_path.startswith(("effects/", "projectiles/"))
        for i, raw_frame in enumerate(frames, start=1):
            canvas_frame = place_on_canvas(raw_frame, is_effect=is_fx)
            dest_file = folder / f"{stem}_{i:02d}.png"
            canvas_frame.save(dest_file, optimize=True)
            total_frames += 1

    print(f"Extracted and standardized {total_frames} frames across {len(actions)} actions.")

    # Render definitive review sheet
    row_height = 116
    label_width = 180
    max_cols = max(len(f) for f in actions.values())
    sheet_w = label_width + max_cols * 96 + 20
    sheet_h = len(actions) * row_height + 20
    review = Image.new("RGBA", (sheet_w, sheet_h), (24, 30, 42, 255))
    draw = ImageDraw.Draw(review)

    for r, (action_path, frames) in enumerate(actions.items()):
        y = r * row_height + 10
        draw.rectangle((10, y, sheet_w - 10, y + row_height - 6), fill=(34, 43, 58, 255))
        draw.text((20, y + 16), action_path, fill=(240, 246, 252, 255))
        draw.text((20, y + 38), f"{len(frames)} frames", fill=(140, 165, 195, 255))

        stem = action_path.replace("/", "_").replace("-", "_")
        for c in range(1, len(frames) + 1):
            frame_img = Image.open(DEST_ROOT / action_path / f"{stem}_{c:02d}.png")
            x = label_width + (c - 1) * 96
            review.alpha_composite(frame_img, (x, y + 10))
            draw.text((x + 4, y + 4), f"{c:02d}", fill=(140, 165, 195, 255))

    REVIEW_SHEET.parent.mkdir(parents=True, exist_ok=True)
    review.save(REVIEW_SHEET, optimize=True)
    print(f"Saved review sheet: {REVIEW_SHEET}")

if __name__ == "__main__":
    main()
