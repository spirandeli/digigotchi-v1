from PIL import Image

im_fire = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_26.png")
w, h = im_fire.size
im_fire.crop((0, 600, w, 900)).save("scratch/fire_band_props.png")
im_fire.crop((0, 900, w, 1254)).save("scratch/fire_band_env.png")

im_ice = Image.open("sprite_lists_maps/ChatGPT Image 19_09_2026, 10_32_39.png")
w_i, h_i = im_ice.size
im_ice.crop((0, 600, w_i, 900)).save("scratch/ice_band_props.png")
im_ice.crop((0, 900, w_i, 1254)).save("scratch/ice_band_env.png")
print("Saved fire and ice bands.")
