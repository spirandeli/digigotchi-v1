import os
from PIL import Image, ImageDraw

def make_dorsal_from_reference(ref_path, species, frame_idx):
    ref = Image.open(ref_path).convert('RGBA')
    b = ref.getbbox()
    if b: ref = ref.crop(b)
    w, h = ref.size
    scale = min(1.0, 84.0 / w if w > 84 else 1.0, 82.0 / h if h > 82 else 1.0)
    if scale < 1.0:
        ref = ref.resize((int(w*scale), int(h*scale)), Image.NEAREST)
    w, h = ref.size
    
    # Create canvas
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    pos_x = max(0, min(96 - w, 48 - w // 2))
    pos_y = max(0, min(96 - h, 90 - h))
    
    # Symmetrize silhouette horizontally to create back view, but keep pixel-art textures
    back_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    half_w = w // 2
    for y in range(h):
        for x in range(w):
            # Sample from the back/spine side of the reference
            sample_x = min(w - 1, max(0, w - 1 - abs(x - half_w)))
            p = ref.getpixel((sample_x, y))
            back_img.putpixel((x, y), p)
            
    # Apply walking leg offset based on frame_idx (1: left up, 2: neutral, 3: right up)
    final_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    for y in range(h):
        for x in range(w):
            offset_y = 0
            if y > int(h * 0.7): # leg region
                if x < half_w: # left leg
                    offset_y = -3 if frame_idx == 1 else (1 if frame_idx == 3 else 0)
                else: # right leg
                    offset_y = -3 if frame_idx == 3 else (1 if frame_idx == 1 else 0)
            src_y = y - offset_y
            if 0 <= src_y < h:
                final_img.putpixel((x, y), back_img.getpixel((x, src_y)))
                
    canvas.paste(final_img, (pos_x, pos_y), final_img)
    return canvas

# Generate for species needing custom dorsal synthesis:
species_refs = {
    'agumon': 'public/sprites/agumon/walk/right/walk_right_01.png',
    'garurumon': 'public/sprites/garurumon/walk/down/walk_down_01.png',
    'weregarurumon': 'public/sprites/weregarurumon/walk/down/walk_down_01.png',
    'flamedramon': 'public/sprites/flamedramon/walk/down/walk_down_01.png',
    'etemon': 'public/sprites/etemon/walk/down/walk_down_01.png',
    'kingetemon': 'public/sprites/kingetemon/walk/down/walk_down_01.png'
}

for sp, ref in species_refs.items():
    for f_idx in [1, 2, 3]:
        dorsal = make_dorsal_from_reference(ref, sp, f_idx)
        out_f = f'public/sprites/{sp}/walk/up/walk_up_{f_idx:02d}.png'
        dorsal.save(out_f)
    print(f'Generated dorsal walk_up for {sp}')

# Also for Agumon walk_down:
# Take Agumon walk_right_01, symmetrize into frontal view with green eyes and belly
def make_agumon_front(frame_idx):
    ref = Image.open('public/sprites/agumon/walk/right/walk_right_01.png').convert('RGBA')
    b = ref.getbbox()
    ref = ref.crop(b)
    w, h = ref.size
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    pos_x = max(0, min(96 - w, 48 - w // 2))
    pos_y = max(0, min(96 - h, 90 - h))
    
    half_w = w // 2
    front = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    for y in range(h):
        for x in range(w):
            src_x = min(w - 1, max(0, half_w + abs(x - half_w)))
            front.putpixel((x, y), ref.getpixel((src_x, y)))
            
    # Draw green eyes on left and right
    draw = ImageDraw.Draw(front)
    eye_y = int(h * 0.22)
    # Left eye
    draw.ellipse([half_w - 14, eye_y, half_w - 6, eye_y + 12], fill=(0, 168, 89, 255), outline=(0, 60, 30, 255))
    draw.rectangle([half_w - 12, eye_y + 3, half_w - 9, eye_y + 6], fill=(255, 255, 255, 255))
    # Right eye
    draw.ellipse([half_w + 6, eye_y, half_w + 14, eye_y + 12], fill=(0, 168, 89, 255), outline=(0, 60, 30, 255))
    draw.rectangle([half_w + 8, eye_y + 3, half_w + 11, eye_y + 6], fill=(255, 255, 255, 255))
    # Cream belly
    draw.ellipse([half_w - 10, int(h * 0.52), half_w + 10, int(h * 0.78)], fill=(255, 240, 210, 255), outline=(220, 200, 160, 255))
    
    # Leg stride
    final_img = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    for y in range(h):
        for x in range(w):
            offset_y = 0
            if y > int(h * 0.75):
                if x < half_w:
                    offset_y = 2 if frame_idx == 1 else (-2 if frame_idx == 3 else 0)
                else:
                    offset_y = 2 if frame_idx == 3 else (-2 if frame_idx == 1 else 0)
            src_y = y - offset_y
            if 0 <= src_y < h:
                final_img.putpixel((x, y), front.getpixel((x, src_y)))
                
    canvas.paste(final_img, (pos_x, pos_y), final_img)
    return canvas

for f_idx in [1, 2, 3]:
    make_agumon_front(f_idx).save(f'public/sprites/agumon/walk/down/walk_down_{f_idx:02d}.png')
print('Agumon walk_down updated!')

