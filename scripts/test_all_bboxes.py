import os
from PIL import Image

def find_sprite_bbox(img, approx_box, bg_color_threshold=245):
    crop = img.crop(approx_box)
    w, h = crop.size
    min_x, max_x = w, 0
    min_y, max_y = h, 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = crop.getpixel((x, y))
            if a > 0 and (r < bg_color_threshold or g < bg_color_threshold or b < bg_color_threshold):
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
    return (approx_box[0] + min_x, approx_box[1] + min_y, approx_box[0] + max_x + 1, approx_box[1] + max_y + 1)

im_light = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_14.png").convert("RGBA")
print("Light w_top:", find_sprite_bbox(im_light, (15, 335, 115, 465)))
print("Light w_mid:", find_sprite_bbox(im_light, (138, 335, 238, 465)))
print("Light w_bot:", find_sprite_bbox(im_light, (260, 335, 360, 465)))
print("Light w_hor:", find_sprite_bbox(im_light, (382, 335, 482, 465)))
print("Light w_vert:", find_sprite_bbox(im_light, (504, 335, 545, 465)))
print("Light c_in:", find_sprite_bbox(im_light, (590, 335, 685, 465)))
print("Light c_out:", find_sprite_bbox(im_light, (710, 335, 805, 465)))

print("Light door cl:", find_sprite_bbox(im_light, (14, 745, 105, 880)))
print("Light door op:", find_sprite_bbox(im_light, (135, 745, 230, 880)))
print("Light ch cl:", find_sprite_bbox(im_light, (500, 785, 595, 880)))
print("Light ch op:", find_sprite_bbox(im_light, (620, 770, 720, 880)))

print("Light crate:", find_sprite_bbox(im_light, (15, 945, 85, 1045)))
print("Light barrel:", find_sprite_bbox(im_light, (220, 945, 290, 1045)))
print("Light coil:", find_sprite_bbox(im_light, (725, 940, 800, 1045)))
print("Light statue:", find_sprite_bbox(im_light, (610, 940, 685, 1045)))
print("Light trap:", find_sprite_bbox(im_light, (840, 950, 940, 1045)))
print("Light crystal:", find_sprite_bbox(im_light, (195, 1085, 285, 1175)))

im_fire = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_26.png").convert("RGBA")
print("Fire barrel:", find_sprite_bbox(im_fire, (15, 875, 105, 990)))
print("Fire crate:", find_sprite_bbox(im_fire, (230, 895, 305, 990)))
print("Fire urn:", find_sprite_bbox(im_fire, (415, 880, 500, 990)))
print("Fire trap:", find_sprite_bbox(im_fire, (695, 900, 785, 990)))
print("Fire hazard lava:", find_sprite_bbox(im_fire, (800, 900, 890, 990)))
print("Fire totem:", find_sprite_bbox(im_fire, (770, 1020, 890, 1220)))
print("Fire volcano:", find_sprite_bbox(im_fire, (1050, 1020, 1220, 1220)))

im_ice = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_39.png").convert("RGBA")
print("Ice barrel:", find_sprite_bbox(im_ice, (115, 850, 195, 975)))
print("Ice crate:", find_sprite_bbox(im_ice, (305, 875, 395, 975)))
print("Ice urn:", find_sprite_bbox(im_ice, (585, 865, 660, 975)))
print("Ice trap:", find_sprite_bbox(im_ice, (945, 885, 1050, 975)))
print("Ice crystal:", find_sprite_bbox(im_ice, (270, 1000, 380, 1140)))
print("Ice shrine:", find_sprite_bbox(im_ice, (1090, 1000, 1195, 1140)))
