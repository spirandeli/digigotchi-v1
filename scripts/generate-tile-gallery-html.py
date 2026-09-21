import json
import os

with open("public/sprites/maps/map_sprite_manifest.json", "r", encoding="utf-8") as f:
    manifest = json.load(f)

html = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tile Gallery QA - Digital Path Maps</title>
  <style>
    body {
      background-color: #0d1117;
      color: #c9d1d9;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      margin: 20px;
      padding: 0;
    }
    h1 { color: #58a6ff; }
    h2 { color: #7ee787; margin-top: 30px; border-bottom: 1px solid #30363d; padding-bottom: 8px; }
    h3 { color: #d2a8ff; margin-top: 20px; }
    .theme-section {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 25px;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 10px;
    }
    .tile-card {
      background: #21262d;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 8px;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 110px;
    }
    .checkerboard {
      width: 96px;
      height: 96px;
      background-color: #2b313a;
      background-image:
        linear-gradient(45deg, #1c2128 25%, transparent 25%),
        linear-gradient(-45deg, #1c2128 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #1c2128 75%),
        linear-gradient(-45deg, transparent 75%, #1c2128 75%);
      background-size: 16px 16px;
      background-position: 0 0, 0 8px, 8px -8px, -8px 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      overflow: hidden;
    }
    .tile-img {
      width: 96px;
      height: 96px;
      image-rendering: pixelated;
    }
    .label {
      font-size: 10px;
      margin-top: 6px;
      text-align: center;
      word-break: break-all;
      color: #8b949e;
    }
  </style>
</head>
<body>
  <h1>Digital Path - Map Tile Gallery QA</h1>
  <p>Auditoria visual canônica de 96x96 px com verificação de zero-text, zero-bleed e transparência.</p>
"""

for theme_id, theme_data in manifest.items():
    html += f'\n  <div class="theme-section" id="theme-{theme_id}">\n'
    html += f'    <h2>Tema: {theme_data.get("name", theme_id)} ({theme_id})</h2>\n'
    for cat_name, file_list in theme_data.get("categories", {}).items():
        if not file_list:
            continue
        html += f'    <h3>Categoria: {cat_name.upper()} ({len(file_list)} tiles)</h3>\n'
        html += '    <div class="grid">\n'
        for fpath in file_list:
            fname = os.path.basename(fpath)
            html += f"""      <div class="tile-card">
        <div class="checkerboard">
          <img class="tile-img" src="{fpath}" alt="{fname}" />
        </div>
        <div class="label">{fname}</div>
      </div>\n"""
        html += '    </div>\n'
    html += '  </div>\n'

html += """
</body>
</html>
"""

with open("public/tile-gallery-qa.html", "w", encoding="utf-8") as f:
    f.write(html)

print("Updated public/tile-gallery-qa.html from manifest successfully!")
