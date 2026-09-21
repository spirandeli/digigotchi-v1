import os
from PIL import Image

# 1. Clean Gabumon
gab_path = "public/sprites/gabumon/walk/right/walk_right_01.png"
im_gab = Image.open(gab_path).convert("RGBA")
# Check pink pixels
cleared = 0
for y in range(im_gab.height):
    for x in range(im_gab.width):
        p = im_gab.getpixel((x, y))
        # pink badge is (255, 94, 221) or similar
        if p[0] > 220 and p[1] < 120 and p[2] > 180:
            im_gab.putpixel((x, y), (0, 0, 0, 0))
            cleared += 1
print(f"Gabumon cleared {cleared} pink pixels")
im_gab.save("scratch/gab_cleaned.png")

