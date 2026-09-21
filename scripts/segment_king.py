import os
from PIL import Image

def segment_horizontal(im, min_gap=15, min_width=25):
    w, h = im.size
    in_s = False
    start_x = 0
    boxes = []
    for x in range(w):
        col_has_pixel = any(im.getpixel((x, y))[3] > 30 for y in range(h))
        if col_has_pixel and not in_s:
            in_s = True
            start_x = x
        elif not col_has_pixel and in_s:
            in_s = False
            if x - start_x >= min_width:
                crop = im.crop((start_x, 0, x, h))
                b = crop.getbbox()
                if b: boxes.append(crop.crop(b))
    return boxes

r1 = Image.open("scratch/king_row1.png")
r2 = Image.open("scratch/king_row2.png")
os.makedirs("scratch/king_crops", exist_ok=True)
b1 = segment_horizontal(r1)
b2 = segment_horizontal(r2)

print(f"Row 1 segmented: {len(b1)} sprites")
for i, s in enumerate(b1):
    s.save(f"scratch/king_crops/idle_{i:02d}.png")
    print(f"  idle {i}: {s.size}")

print(f"Row 2 segmented: {len(b2)} sprites")
for i, s in enumerate(b2):
    s.save(f"scratch/king_crops/walk_{i:02d}.png")
    print(f"  walk {i}: {s.size}")
