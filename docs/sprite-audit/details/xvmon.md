# Auditoria Detalhada de Sprites: XVMON

Data da Auditoria: 2026-09-20 17:22:32
Status Geral: **PARTIAL**

---

## 1. Arquivos Descobertos e Estrutura Física

- **Total de arquivos no diretório**: `298`
- **Total de imagens PNG**: `275`
- **Arquivos não-PNG / Metadados**: `23` (ex: `evolve`, `.gitkeep`)
- **Spritesheets / Folhas Mestre**: `2`
- **Frames individuais (ações montadas)**: `257`
- **Frames brutos em _raw (fatias brutas `sprite_XXXX`)**: `95`
- **Efeitos visuais desacoplados (VFX)**: `0`
- **Projéteis desacoplados**: `16`
- **Arquivos duplicados exatos (SHA-256 idêntico)**: `97`
- **Frames vazios detectados (100% transparentes)**: `0`

---

## 2. Spritesheets e Folhas Mestre Identificadas

| Caminho Relativo | Dimensões (LxA) | Tipo |
|---|---|---|
| `spritesheets/xvmon.png` | `342x172` | Spritesheet Consolidada |
| `_raw/xxvmon.png` | `1447x1087` | Mestre de Referência (_raw) |

## 3. Avaliação Contra o CANONICAL_ACTION_SET

| Ação Canônica | Modo de Jogo | Requisito | Status Atual | Frames Válidos | Detalhes Técnicos |
|---|---|---|---|---:|---|
| `idle` | BOTH | Obrigatório | **COMPLETE** | 16 | 8 unique frames in idle/ |
| `walk_left` | ROGUELIKE | Obrigatório | **MISSING** | 0 | Folder empty (.gitkeep) |
| `walk_right` | ROGUELIKE | Obrigatório | **MISSING** | 0 | Folder empty (.gitkeep) |
| `walk_down` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `walk_up` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `dash` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `attack_basic_1` | ROGUELIKE | Obrigatório | **MISSING** | 0 | 0 frames |
| `attack_basic_2` | ROGUELIKE | Obrigatório | **MISSING** | 0 | 0 frames |
| `attack_special` | ROGUELIKE | Obrigatório | **MISSING** | 0 | 0 frames |
| `hit` | ROGUELIKE | Obrigatório | **MISSING** | 0 | 0 frames |
| `death` | BOTH | Obrigatório | **MISSING** | 0 | 0 frames |
| `victory` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `eat` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `sleep` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `wake` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `play` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `clean` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `heal` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `evolution` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `signature_attack` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames for attack-vee-laser |

---

## 4. Ações Faltantes (MISSING)

- **`walk_left`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`walk_right`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`walk_down`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`walk_up`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`dash`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`attack_basic_1`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`attack_basic_2`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`attack_special`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`hit`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`death`** (BOTH): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`victory`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`clean`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.

## 5. Ações Parciais (PARTIAL)

Nenhuma ação parcial detectada.

## 6. Duplicatas e Redundância Detectada

O personagem possui **97 arquivos duplicados exatos** (SHA-256 idêntico).
Isso decorre da co-existência do esquema de numeração original do Tamagotchi (`00.png` a `09.png`) com a cópia renomeada (`<action>_01.png` a `<action>_10.png`) nas pastas de cuidados virtuais (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`).

Exemplo de amostras duplicadas:
- `portrait.png` == `xvmon.png`
- `attack-vee-laser/04.png` == `attack-vee-laser/attack-vee-laser_05.png`
- `attack-vee-laser/attack-vee-laser_07.png` == `attack-vee-laser/06.png`
- `attack-vee-laser/00.png` == `attack-vee-laser/attack-vee-laser_01.png`
- `attack-vee-laser/01.png` == `attack-vee-laser/attack-vee-laser_02.png`
- `attack-vee-laser/attack-vee-laser_08.png` == `attack-vee-laser/07.png`
- `attack-vee-laser/attack-vee-laser_03.png` == `attack-vee-laser/02.png`
- `attack-vee-laser/attack-vee-laser_06.png` == `attack-vee-laser/05.png`

## 7. Itens para Revisão Manual (NEEDS_MANUAL_REVIEW)

### Master Spritesheets in _raw (1 sheets)
- **Motivo**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Arquivos envolvidos**: xxvmon.png

### Raw Slices in _raw (95 frames)
- **Motivo**: Digimon has 95 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

## 8. Processamento Recomendado para Completude

1. **Combate Roguelike**: Inspecionar visualmente as 95 fatias em `_raw/` para mapear os índices de `sprite_XXXX.png` para:
   - `walk/left` e `walk/right`
   - `attacks/basic_1` (golpe físico básico)
   - `attacks/basic_2` (projétil ou ataque secundário)
   - `attacks/special` (especial)
   - `hit` (reação a dano)
   - `death` (animação de derrota)
2. **Normalização de Container**: Padronizar os frames selecionados em canvas `96x96` com ancoragem na baseline `y = 90` e centralização horizontal, sem distorcer o pixel art.
3. **Manifest**: Criar ou atualizar `docs/digital-path/manifests/xvmon.json` espelhando a estrutura do Veemon (`golden reference`).
4. **Limpeza de Duplicatas**: Unificar as pastas do Tamagotchi para consumir deterministicamente `_01.png`, descontinuando os arquivos legados `00.png` de forma segura.
