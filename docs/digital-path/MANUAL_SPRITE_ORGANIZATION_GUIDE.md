# Guia de Organização Manual de Sprites e Assets

Este documento orienta como organizar manualmente os sprites dos Digimons e dos mapas, detalhando de onde cada modo de jogo consome seus assets e como manter a compatibilidade com o runtime.

---

## 1. De Onde o Jogo Pega os Sprites?

O projeto possui **dois modos principais**, cada um com seu próprio pipeline e diretório de assets:

### A. Tamagotchi (Modo Principal / Cuidados)
- **Localização dos frames animados:** `public/sprites/keyframes/<digimon>/<ação>/<00..07>.png`
  - Exemplo: `public/sprites/keyframes/agumon/idle/00.png`
  - Ações do pet: `idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolve`, `attack-*`
- **Sprites estáticos (fallback):** `public/sprites/<digimon>.png`
- **Efeitos de habilidades (VFX):** `public/fx/<family>/<frame>.png`
- **Onde é configurado no código:**
  - [src/lib/pet/data.ts](file:///home/spira/digigotchi-main/src/lib/pet/data.ts) em `STATIC_SPRITES`, `SPRITE_ANIMATIONS` e `SPRITE_STAGE_LAYOUT`.

---

### B. Roguelike: Caminho Digital (Modo Aventura / Phaser)
- **Sprites dos Personagens:** `rougue-like-character-sprites/<digimon>/`
  - Cada Digimon possui uma pasta própria dividida em ações individuais (`idle/`, `walk/left/`, `attacks/basic_1/`, etc.).
  - Configurado via **Manifest**: `docs/digital-path/manifests/<digimon>.json`.
  - O runtime do Phaser e a bridge do jogo leem diretamente os caminhos definidos no manifest do personagem.
- **Sprites dos Mapas:** `public/maps/`
  - `public/maps/tilesets/`: Tilesets do chão, paredes, portas e corredores da masmorra.
  - `public/maps/props/`: Objetos, baús, armadilhas, tochas e pilares.
  - `public/maps/backgrounds/`: Fundos do canvas ou parallax.
  - O mapa procedural ([src/lib/digital-path/map/procedural-map.ts](file:///home/spira/digigotchi-main/src/lib/digital-path/map/procedural-map.ts)) gera a matriz de `floor` e `wall`, e o Phaser mapeia essas células para as texturas em `public/maps/`.

---

## 2. Estrutura de Pastas Criada por Digimon

Todas as pastas de movimentos e ações foram criadas em `rougue-like-character-sprites/<digimon>/`:

```text
rougue-like-character-sprites/<digimon>/
├── idle/                    # Animação de respiração/parado (8 a 9 frames)
├── walk/
│   ├── left/                # Movimento para a esquerda (virado para a esquerda)
│   ├── right/               # Movimento para a direita (virado para a direita)
│   ├── up/                  # Movimento vertical cima (opcional ou 4-way)
│   └── down/                # Movimento vertical baixo (opcional ou 4-way)
├── run/
│   ├── left/                # Corrida para a esquerda (opcional)
│   └── right/               # Corrida para a direita (opcional)
├── attacks/
│   ├── basic_1/             # Ataque básico 1 (ex: Soco/Golpe corporal)
│   ├── basic_2/             # Ataque básico 2 (ex: Bafo de Pimenta / Disparo)
│   └── special/             # Ataque Especial (ex: Mega Blast)
├── hit/                     # Frame/animação ao receber dano (Dano)
├── death/                   # Frame/animação de derrota/desmaio (Morte)
├── victory/                 # Pose de comemoração/vitória
├── heal/                    # Animação de cura/recuperação
├── evolution/               # Feixe digital ou animação de evolução
├── projectiles/             # Projéteis disparados (bolas de fogo, lasers, etc.)
├── effects/                 # Efeitos de impacto, explosões e auras
├── ui/
│   ├── portrait/            # Retrato para diálogos e HUD
│   └── icon/                # Mini ícone
├── _legacy/                 # Guardar versões antigas ou não utilizadas (segurança)
└── _review/                 # Sprites que precisam de corte ou verificação
```

---

## 3. Padrão de Nomenclatura e Dimensões

1. **Nomes dos Arquivos:**
   - Padronizados com índice de 2 dígitos:
     - `idle_01.png`, `idle_02.png`, ...
     - `walk_left_01.png`, `walk_left_02.png`, ...
     - `walk_right_01.png`, `walk_right_02.png`, ...
     - `attacks_basic_1_01.png`, ...
     - `attacks_basic_2_01.png`, ...
     - `attacks_special_01.png`, ...
     - `hit_01.png`
     - `death_01.png`
     - `victory_01.png`
     - `heal_01.png`, ...
2. **Dimensão do Canvas:**
   - **Tamanho padrão de célula:** `96x96` pixels.
   - **Alinhamento dos Pés (Baseline):** Coloque a base dos pés do personagem na linha `y = 90` (deixando 6 pixels de margem inferior). Centralize horizontalmente (`x = (96 - largura) / 2`).
   - Isso garante que a troca de animações (ex: de `idle` para `walk`) não cause tremulação (jitter vertical).
3. **Transparência:**
   - PNG em 32-bit (RGBA) com canal Alpha real.
   - Sem fundos brancos, pretos ou cinzas.
   - Sem pixels soltos ou resíduos de texto.
4. **Orientação:**
   - Sprites `_left` devem olhar para a esquerda.
   - Sprites `_right` devem olhar para a direita. Se o sprite original só possuir o lado esquerdo, espelhe horizontalmente para `_right`.

---

## 4. Como Vincular ao Manifest

Após colocar os arquivos nas pastas, o arquivo de manifest em `docs/digital-path/manifests/<digimon>.json` deve listar os caminhos:

```json
{
  "id": "agumon",
  "name": "Agumon",
  "stage": "rookie",
  "root": "rougue-like-character-sprites/agumon",
  "spriteReady": true,
  "movementStyle": "2-way",
  "frame": { "width": 96, "height": 96, "originX": 0.5, "originY": 0.94 },
  "animations": {
    "idle": {
      "fps": 8, "loop": true,
      "frames": [
        "rougue-like-character-sprites/agumon/idle/idle_01.png",
        "rougue-like-character-sprites/agumon/idle/idle_02.png"
      ]
    },
    "walk_left": {
      "fps": 10, "loop": true,
      "frames": [
        "rougue-like-character-sprites/agumon/walk/left/walk_left_01.png"
      ]
    },
    "walk_right": {
      "fps": 10, "loop": true,
      "frames": [
        "rougue-like-character-sprites/agumon/walk/right/walk_right_01.png"
      ]
    },
    "attack_basic_1": {
      "fps": 12, "loop": false,
      "frames": ["rougue-like-character-sprites/agumon/attacks/basic_1/attacks_basic_1_01.png"]
    },
    "attack_basic_2": {
      "fps": 12, "loop": false,
      "frames": ["rougue-like-character-sprites/agumon/attacks/basic_2/attacks_basic_2_01.png"]
    },
    "hit": {
      "fps": 8, "loop": false,
      "frames": ["rougue-like-character-sprites/agumon/hit/hit_01.png"]
    },
    "death": {
      "fps": 5, "loop": false,
      "frames": ["rougue-like-character-sprites/agumon/death/death_01.png"]
    }
  }
}
```

---

## 5. Como Validar Automaticamente

Para checar se todos os caminhos declarados no manifest existem no disco e estão no padrão:

```bash
node scripts/validate-digital-path-manifests.mjs
npm test
```
