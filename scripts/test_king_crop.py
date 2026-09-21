import os
from PIL import Image

def flood_fill_transparent(im):
    im = im.convert("RGBA")
    w, h = im.size
    visited = set()
    queue = []
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
    
    def is_bg(x, y):
        p = im.getpixel((x, y))
        if p[3] < 100: return True
        if p[0] > 235 and p[1] > 235 and p[2] > 235: return True
        return False

    res = im.copy()
    for sx, sy in queue:
        if (sx, sy) not in visited and is_bg(sx, sy):
            visited.add((sx, sy))
            q = [(sx, sy)]
            while q:
                cx, cy = q.pop()
                res.putpixel((cx, cy), (0, 0, 0, 0))
                for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < w and 0 <= ny < h and (nx, ny) not in visited:
                        if is_bg(nx, ny):
                            visited.add((nx, ny))
                            q.append((nx, ny))
    return res

im = Image.open("public/sprites/kingetemon/_raw/kingetemon.png")
# Let us crop Row 1 (y: 0..140, x: 200..1400)
# and Row 2 (y: 140..270, x: 200..1400)
row1 = flood_fill_transparent(im.crop((180, 0, 1448, 140)))
row2 = flood_fill_transparent(im.crop((180, 140, 1448, 270)))
row1.save("scratch/king_row1.png")
row2.save("scratch/king_row2.png")
print("Saved king_row1.png and king_row2.png")
