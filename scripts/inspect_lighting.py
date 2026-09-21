from PIL import Image

im_light = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_14.png")
w, h = im_light.size

# Slice into 5 vertical bands of height ~250
im_light.crop((0, 0, w, 260)).save("scratch/light_band_1.png")
im_light.crop((0, 260, w, 520)).save("scratch/light_band_2.png")
im_light.crop((0, 520, w, 780)).save("scratch/light_band_3.png")
im_light.crop((0, 780, w, 1020)).save("scratch/light_band_4.png")
im_light.crop((0, 1020, w, 1254)).save("scratch/light_band_5.png")
print("Saved 5 lighting bands.")
