import os
from PIL import Image

def place_sprite_in_canvas(src_path, baseline_y=90, center_x=48, flip_x=False, crop_box=None, max_w=86, max_h=84):
    im = Image.open(src_path).convert('RGBA')
    if crop_box:
        im = im.crop(crop_box)
    b = im.getbbox()
    if b:
        im = im.crop(b)
    if flip_x:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    
    w, h = im.size
    scale = min(1.0, max_w / w if w > max_w else 1.0, max_h / h if h > max_h else 1.0)
    if scale < 1.0:
        im = im.resize((int(w * scale), int(h * scale)), Image.NEAREST)
    
    w, h = im.size
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    pos_x = max(0, min(96 - w, center_x - w // 2))
    pos_y = max(0, min(96 - h, baseline_y - h))
    canvas.paste(im, (pos_x, pos_y), im)
    return canvas

# 1. XV-MON
# Down: sprite_0039, sprite_0041, sprite_0058
# Up: sprite_0042, sprite_0045, sprite_0046
place_sprite_in_canvas('public/sprites/xvmon/_raw/sprite_0039.png').save('public/sprites/xvmon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/xvmon/_raw/sprite_0041.png').save('public/sprites/xvmon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/xvmon/_raw/sprite_0058.png').save('public/sprites/xvmon/walk/down/walk_down_03.png')

place_sprite_in_canvas('public/sprites/xvmon/_raw/sprite_0042.png').save('public/sprites/xvmon/walk/up/walk_up_01.png')
place_sprite_in_canvas('public/sprites/xvmon/_raw/sprite_0045.png').save('public/sprites/xvmon/walk/up/walk_up_02.png')
place_sprite_in_canvas('public/sprites/xvmon/_raw/sprite_0046.png').save('public/sprites/xvmon/walk/up/walk_up_03.png')
print('XVmon walk down/up updated!')

# 2. GABUMON
# Down: sprite_0044, sprite_0047, sprite_0051
# Up: sprite_0056 (dorsal), and slices from sprite_0000 (dorsal)
place_sprite_in_canvas('public/sprites/gabumon/_raw/sprite_0044.png').save('public/sprites/gabumon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/gabumon/_raw/sprite_0047.png').save('public/sprites/gabumon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/gabumon/_raw/sprite_0051.png').save('public/sprites/gabumon/walk/down/walk_down_03.png')

# sprite_0000 has 3 figures: front, dorsal 1, dorsal 2. Let's slice dorsal 1 & dorsal 2
im_g0 = Image.open('public/sprites/gabumon/_raw/sprite_0000.png')
# width ~150, 3 figures: 0-50 (front), 50-100 (back 1), 100-150 (back 2)
w_g, h_g = im_g0.size
f_w = w_g // 3
place_sprite_in_canvas('public/sprites/gabumon/_raw/sprite_0000.png', crop_box=(f_w, 0, f_w*2, h_g)).save('public/sprites/gabumon/walk/up/walk_up_01.png')
place_sprite_in_canvas('public/sprites/gabumon/_raw/sprite_0056.png').save('public/sprites/gabumon/walk/up/walk_up_02.png')
place_sprite_in_canvas('public/sprites/gabumon/_raw/sprite_0000.png', crop_box=(f_w*2, 0, w_g, h_g)).save('public/sprites/gabumon/walk/up/walk_up_03.png')
print('Gabumon walk down/up updated!')

# 3. WARGREYMON
# Down: sprite_0019, sprite_0020, sprite_0021
# Up: sprite_0033, sprite_0037, sprite_0056 (Brave shield dorsal!)
place_sprite_in_canvas('public/sprites/wargreymon/_raw/sprite_0019.png').save('public/sprites/wargreymon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/wargreymon/_raw/sprite_0020.png').save('public/sprites/wargreymon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/wargreymon/_raw/sprite_0021.png').save('public/sprites/wargreymon/walk/down/walk_down_03.png')

place_sprite_in_canvas('public/sprites/wargreymon/_raw/sprite_0033.png').save('public/sprites/wargreymon/walk/up/walk_up_01.png')
place_sprite_in_canvas('public/sprites/wargreymon/_raw/sprite_0037.png').save('public/sprites/wargreymon/walk/up/walk_up_02.png')
place_sprite_in_canvas('public/sprites/wargreymon/_raw/sprite_0056.png').save('public/sprites/wargreymon/walk/up/walk_up_03.png')
print('WarGreymon walk down/up updated!')

# 4. GEOGREYMON
# Down: sprite_0023, sprite_0043, sprite_0059
# Up: sprite_0011 (has 2 dorsal figures)
place_sprite_in_canvas('public/sprites/geogreymon/_raw/sprite_0023.png').save('public/sprites/geogreymon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/geogreymon/_raw/sprite_0043.png').save('public/sprites/geogreymon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/geogreymon/_raw/sprite_0059.png').save('public/sprites/geogreymon/walk/down/walk_down_03.png')

im_geo = Image.open('public/sprites/geogreymon/_raw/sprite_0011.png')
w_geo, h_geo = im_geo.size
place_sprite_in_canvas('public/sprites/geogreymon/_raw/sprite_0011.png', crop_box=(0, 0, w_geo//2, h_geo)).save('public/sprites/geogreymon/walk/up/walk_up_01.png')
place_sprite_in_canvas('public/sprites/geogreymon/_raw/sprite_0011.png', crop_box=(w_geo//4, 0, 3*w_geo//4, h_geo)).save('public/sprites/geogreymon/walk/up/walk_up_02.png')
place_sprite_in_canvas('public/sprites/geogreymon/_raw/sprite_0011.png', crop_box=(w_geo//2, 0, w_geo, h_geo)).save('public/sprites/geogreymon/walk/up/walk_up_03.png')
print('GeoGreymon walk down/up updated!')

# 5. METALETEMON
# Down: sprite_0044, sprite_0016, sprite_0018
# Up: sprite_0043 (dorsal), and stepping variations
place_sprite_in_canvas('public/sprites/metaletemon/_raw/sprite_0044.png').save('public/sprites/metaletemon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/metaletemon/_raw/sprite_0016.png').save('public/sprites/metaletemon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/metaletemon/_raw/sprite_0018.png').save('public/sprites/metaletemon/walk/down/walk_down_03.png')

up_m1 = place_sprite_in_canvas('public/sprites/metaletemon/_raw/sprite_0043.png')
up_m1.save('public/sprites/metaletemon/walk/up/walk_up_01.png')
up_m2 = place_sprite_in_canvas('public/sprites/metaletemon/_raw/sprite_0043.png', flip_x=True)
up_m2.save('public/sprites/metaletemon/walk/up/walk_up_02.png')
up_m1.save('public/sprites/metaletemon/walk/up/walk_up_03.png')
print('MetalEtemon walk down/up updated!')

# 6. ETEMON
# Down: sprite_0002, sprite_0059, sprite_0060
# Up: dorsal construction from body silhouette
place_sprite_in_canvas('public/sprites/etemon/_raw/sprite_0002.png').save('public/sprites/etemon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/etemon/_raw/sprite_0059.png').save('public/sprites/etemon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/etemon/_raw/sprite_0060.png').save('public/sprites/etemon/walk/down/walk_down_03.png')

# 7. KINGETEMON
# Down: sprite_0013, sprite_0014, sprite_0017
place_sprite_in_canvas('public/sprites/kingetemon/_raw/sprite_0013.png').save('public/sprites/kingetemon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/kingetemon/_raw/sprite_0014.png').save('public/sprites/kingetemon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/kingetemon/_raw/sprite_0017.png').save('public/sprites/kingetemon/walk/down/walk_down_03.png')

# 8. WEREGARURUMON
# Down: sprite_0044, sprite_0045, sprite_0047
place_sprite_in_canvas('public/sprites/weregarurumon/_raw/sprite_0044.png').save('public/sprites/weregarurumon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/weregarurumon/_raw/sprite_0045.png').save('public/sprites/weregarurumon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/weregarurumon/_raw/sprite_0047.png').save('public/sprites/weregarurumon/walk/down/walk_down_03.png')

# 9. FLAMEDRAMON
# Down: sprite_0025, sprite_0032, sprite_0045
place_sprite_in_canvas('public/sprites/flamedramon/_raw/sprite_0025.png').save('public/sprites/flamedramon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/flamedramon/_raw/sprite_0032.png').save('public/sprites/flamedramon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/flamedramon/_raw/sprite_0045.png').save('public/sprites/flamedramon/walk/down/walk_down_03.png')

# 10. GARURUMON
# Down: sprite_0075, sprite_0076, sprite_0077
place_sprite_in_canvas('public/sprites/garurumon/_raw/sprite_0075.png').save('public/sprites/garurumon/walk/down/walk_down_01.png')
place_sprite_in_canvas('public/sprites/garurumon/_raw/sprite_0076.png').save('public/sprites/garurumon/walk/down/walk_down_02.png')
place_sprite_in_canvas('public/sprites/garurumon/_raw/sprite_0077.png').save('public/sprites/garurumon/walk/down/walk_down_03.png')

print('Core 10 Digimons walk frames created!')
