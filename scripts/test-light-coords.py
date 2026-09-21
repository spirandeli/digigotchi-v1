from PIL import Image, ImageDraw, ImageChops

def remove_outer_white_bg(img, tolerance=250):
    rgba = img.convert("RGBA")
    w, h = rgba.size
    padded = Image.new("RGBA", (w + 4, h + 4), (255, 255, 255, 255))
    padded.paste(rgba, (2, 2))
    
    r, g, b, _ = padded.split()
    r_mask = r.point(lambda p: 255 if p >= tolerance else 0)
    g_mask = g.point(lambda p: 255 if p >= tolerance else 0)
    b_mask = b.point(lambda p: 255 if p >= tolerance else 0)
    mask = ImageChops.darker(ImageChops.darker(r_mask, g_mask), b_mask)
    
    ImageDraw.floodfill(mask, (0, 0), 128)
    alpha = mask.point(lambda p: 0 if p == 128 else 255)
    padded.putalpha(alpha)
    return padded.crop((2, 2, w + 2, h + 2))

im_light = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_14.png").convert("RGBA")

crops = {
    "test_w_top": im_light.crop((16, 368, 114, 476)),
    "test_w_spiked": im_light.crop((382, 526, 480, 635)),
    "test_door_cl": remove_outer_white_bg(im_light.crop((16, 715, 114, 820))),
    "test_chest_cl": remove_outer_white_bg(im_light.crop((514, 725, 595, 815))),
    "test_crate": remove_outer_white_bg(im_light.crop((16, 865, 114, 955))),
    "test_barrel": remove_outer_white_bg(im_light.crop((220, 865, 300, 955))),
    "test_statue": remove_outer_white_bg(im_light.crop((615, 865, 700, 955))),
    "test_coil": remove_outer_white_bg(im_light.crop((735, 865, 815, 955))),
    "test_trap": remove_outer_white_bg(im_light.crop((855, 865, 945, 955))),
    "test_crystal": remove_outer_white_bg(im_light.crop((265, 1000, 355, 1085))),
}

for name, c in crops.items():
    c.save(f"scratch/{name}.png")

print("All test crops processed!")
