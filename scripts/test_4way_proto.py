import os
from PIL import Image, ImageDraw

def create_agumon_down(frame_idx):
    # Base canvas 96x96
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    # Palette extracted from Agumon
    c_outline = (50, 30, 10, 255)
    c_body_dark = (192, 107, 0, 255)
    c_body_mid = (248, 154, 0, 255)
    c_body_light = (255, 184, 32, 255)
    c_belly = (255, 240, 210, 255)
    c_belly_shadow = (220, 200, 160, 255)
    c_eye_green = (0, 168, 89, 255)
    c_eye_dark = (0, 100, 50, 255)
    c_eye_pupil = (0, 40, 20, 255)
    c_eye_shine = (255, 255, 255, 255)
    c_claw = (255, 255, 255, 255)
    c_claw_shadow = (200, 200, 200, 255)
    c_mouth = (140, 40, 20, 255)

    # Frame timing
    # 1: left step down, 2: neutral, 3: right step down
    bob = 1 if frame_idx == 2 else 0
    l_offset = 2 if frame_idx == 1 else (-2 if frame_idx == 3 else 0)
    r_offset = 2 if frame_idx == 3 else (-2 if frame_idx == 1 else 0)
    
    # --- FEET & LEGS ---
    # Left foot
    lf_y = 86 + l_offset
    draw.polygon([(32, lf_y-10), (42, lf_y-10), (45, lf_y+4), (28, lf_y+4)], fill=c_body_mid, outline=c_outline)
    draw.rectangle([29, lf_y+2, 33, lf_y+4], fill=c_claw, outline=c_outline)
    draw.rectangle([35, lf_y+2, 39, lf_y+4], fill=c_claw, outline=c_outline)
    draw.rectangle([41, lf_y+2, 45, lf_y+4], fill=c_claw, outline=c_outline)

    # Right foot
    rf_y = 86 + r_offset
    draw.polygon([(54, rf_y-10), (64, rf_y-10), (68, rf_y+4), (51, rf_y+4)], fill=c_body_mid, outline=c_outline)
    draw.rectangle([51, rf_y+2, 55, rf_y+4], fill=c_claw, outline=c_outline)
    draw.rectangle([57, rf_y+2, 61, rf_y+4], fill=c_claw, outline=c_outline)
    draw.rectangle([63, rf_y+2, 67, rf_y+4], fill=c_claw, outline=c_outline)

    # --- TORSO ---
    body_y = 52 + bob
    # Torso outline and fill
    draw.ellipse([34, body_y, 62, body_y + 26], fill=c_body_mid, outline=c_outline)
    # Belly bib
    draw.ellipse([40, body_y + 4, 56, body_y + 24], fill=c_belly, outline=c_belly_shadow)

    # --- ARMS ---
    # Left arm
    la_y = body_y + 6 - l_offset
    draw.polygon([(26, la_y), (35, la_y-2), (34, la_y+12), (24, la_y+10)], fill=c_body_mid, outline=c_outline)
    draw.rectangle([23, la_y+8, 26, la_y+12], fill=c_claw, outline=c_outline)
    draw.rectangle([27, la_y+9, 30, la_y+13], fill=c_claw, outline=c_outline)

    # Right arm
    ra_y = body_y + 6 - r_offset
    draw.polygon([(61, ra_y-2), (70, ra_y), (72, ra_y+10), (62, la_y+12)], fill=c_body_mid, outline=c_outline)
    draw.rectangle([66, ra_y+9, 69, ra_y+13], fill=c_claw, outline=c_outline)
    draw.rectangle([70, ra_y+8, 73, ra_y+12], fill=c_claw, outline=c_outline)

    # --- HEAD ---
    head_y = 20 + bob
    # Big round head
    draw.ellipse([27, head_y, 69, head_y + 36], fill=c_body_mid, outline=c_outline)
    # Highlight on forehead
    draw.ellipse([36, head_y + 4, 60, head_y + 14], fill=c_body_light)

    # Snout / bib
    draw.ellipse([34, head_y + 18, 62, head_y + 34], fill=c_body_mid, outline=c_outline)
    # Nostrils
    draw.rectangle([45, head_y + 22, 46, head_y + 23], fill=c_outline)
    draw.rectangle([50, head_y + 22, 51, head_y + 23], fill=c_outline)
    # Smile
    draw.line([(39, head_y + 27), (48, head_y + 29), (57, head_y + 27)], fill=c_outline, width=1)

    # Eyes (green, wide, cute)
    # Left eye
    draw.ellipse([32, head_y + 10, 42, head_y + 24], fill=c_eye_dark, outline=c_outline)
    draw.ellipse([33, head_y + 11, 41, head_y + 23], fill=c_eye_green)
    draw.ellipse([35, head_y + 13, 39, head_y + 21], fill=c_eye_pupil)
    draw.rectangle([34, head_y + 12, 36, head_y + 14], fill=c_eye_shine)

    # Right eye
    draw.ellipse([54, head_y + 10, 64, head_y + 24], fill=c_eye_dark, outline=c_outline)
    draw.ellipse([55, head_y + 11, 63, head_y + 23], fill=c_eye_green)
    draw.ellipse([57, head_y + 13, 61, head_y + 21], fill=c_eye_pupil)
    draw.rectangle([56, head_y + 12, 58, head_y + 14], fill=c_eye_shine)

    return canvas

def create_agumon_up(frame_idx):
    canvas = Image.new('RGBA', (96, 96), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    c_outline = (50, 30, 10, 255)
    c_body_dark = (192, 107, 0, 255)
    c_body_mid = (248, 154, 0, 255)
    c_body_light = (255, 184, 32, 255)
    c_claw_back = (180, 160, 140, 255)

    bob = 1 if frame_idx == 2 else 0
    l_offset = -3 if frame_idx == 1 else (1 if frame_idx == 3 else 0)
    r_offset = -3 if frame_idx == 3 else (1 if frame_idx == 1 else 0)

    # --- FEET (Seen from rear, showing soles/heels) ---
    lf_y = 86 + l_offset
    draw.polygon([(32, lf_y-10), (42, lf_y-10), (44, lf_y+4), (30, lf_y+4)], fill=c_body_dark, outline=c_outline)
    draw.ellipse([31, lf_y-2, 43, lf_y+4], fill=c_claw_back, outline=c_outline)

    rf_y = 86 + r_offset
    draw.polygon([(54, rf_y-10), (64, rf_y-10), (66, rf_y+4), (52, rf_y+4)], fill=c_body_dark, outline=c_outline)
    draw.ellipse([53, rf_y-2, 65, rf_y+4], fill=c_claw_back, outline=c_outline)

    # --- TAIL (Visible in center back!) ---
    tail_y = 66 + bob
    draw.polygon([(44, tail_y), (52, tail_y), (49, tail_y + 14), (47, tail_y + 14)], fill=c_body_mid, outline=c_outline)

    # --- TORSO (Solid orange back) ---
    body_y = 52 + bob
    draw.ellipse([34, body_y, 62, body_y + 26], fill=c_body_mid, outline=c_outline)
    # Spine shading
    draw.line([(48, body_y + 2), (48, body_y + 20)], fill=c_body_dark, width=2)

    # --- ARMS (Seen from back) ---
    la_y = body_y + 6 + l_offset
    draw.polygon([(26, la_y), (35, la_y-2), (33, la_y+10), (24, la_y+8)], fill=c_body_mid, outline=c_outline)

    ra_y = body_y + 6 + r_offset
    draw.polygon([(61, ra_y-2), (70, ra_y), (72, ra_y+8), (63, la_y+10)], fill=c_body_mid, outline=c_outline)

    # --- HEAD (Solid orange dome, no eyes, no snout!) ---
    head_y = 20 + bob
    draw.ellipse([27, head_y, 69, head_y + 36], fill=c_body_mid, outline=c_outline)
    # Back of head highlight / contour
    draw.arc([31, head_y + 4, 65, head_y + 30], start=180, end=360, fill=c_body_light, width=2)

    return canvas

os.makedirs('scratch', exist_ok=True)
for i in [1, 2, 3]:
    create_agumon_down(i).save(f'scratch/agumon_down_{i:02d}.png')
    create_agumon_up(i).save(f'scratch/agumon_up_{i:02d}.png')

print('Agumon down and up prototype generated!')
