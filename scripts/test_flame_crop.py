import os
from PIL import Image

im = Image.open("public/sprites/flamedramon/_raw/flamedramon.png").convert("RGBA")
# Row 1 is between y: 0 and y: 155
# Find sprites along x
# Background is white (r > 245, g > 245, b > 245) or transparent
row1 = im.crop((0, 0, 1448, 155))
os.makedirs("scratch/flame_crops", exist_ok=True)

# Let us segment connected non-white components across x
w, h = row1.size
in_sprite = False
start_x = 0
boxes = []
for x in range(w):
    has_pixel = False
    for y in range(h):
        p = row1.getpixel((x, y))
        if p[3] > 50 and not (p[0] > 240 and p[1] > 240 and p[2] > 240):
            has_pixel = True
            break
    if has_pixel and not in_sprite:
        in_sprite = True
        start_x = x
    elif not has_pixel and in_sprite:
        in_sprite = False
        if x - start_x > 20: # ignore noise
            boxes.append((start_x, 0, x, h))

print(f"Found {len(boxes)} sprites in row 1:")
for i, box in enumerate(boxes):
    crop = row1.crop(box)
    b = crop.getbbox()
    # clean white bg
    cw, ch = crop.size
    clean = Image.new('RGBA', (cw, ch), (0, 0, 0, 0))
    for cy in range(ch):
        for cx in range(cw):
            p = crop.getpixel((cx, cy))
            if p[3] > 50 and not (p[0] > 240 and p[1] > 240 and p[2] > 240):
                clean.putpixel((cx, cy), p)
    clean = clean.crop(clean.getbbox())
    clean.save(f"scratch/flame_crops/sprite_{i:02d}.png")
    print(f"  Sprite {i}: width={clean.width}, height={clean.height}")

