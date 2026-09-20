# Auditoria Detalhada de Sprites: WEREGARURUMON

Data da Auditoria: 2026-09-20 17:22:32
Status Geral: **PARTIAL**

---

## 1. Arquivos Descobertos e Estrutura Física

- **Total de arquivos no diretório**: `363`
- **Total de imagens PNG**: `341`
- **Arquivos não-PNG / Metadados**: `22` (ex: `evolve`, `.gitkeep`)
- **Spritesheets / Folhas Mestre**: `2`
- **Frames individuais (ações montadas)**: `339`
- **Frames brutos em _raw (fatias brutas `sprite_XXXX`)**: `131`
- **Efeitos visuais desacoplados (VFX)**: `0`
- **Projéteis desacoplados**: `0`
- **Arquivos duplicados exatos (SHA-256 idêntico)**: `141`
- **Frames vazios detectados (100% transparentes)**: `0`

---

## 2. Spritesheets e Folhas Mestre Identificadas

| Caminho Relativo | Dimensões (LxA) | Tipo |
|---|---|---|
| `spritesheets/weregarurumon.png` | `688x216` | Spritesheet Consolidada |
| `_raw/weregarurumon.png` | `1299x1211` | Mestre de Referência (_raw) |

## 3. Avaliação Contra o CANONICAL_ACTION_SET

| Ação Canônica | Modo de Jogo | Requisito | Status Atual | Frames Válidos | Detalhes Técnicos |
|---|---|---|---|---:|---|
| `idle` | BOTH | Obrigatório | **COMPLETE** | 20 | 5 unique frames in idle/ |
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
| `eat` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 20 | 10 unique frames (total files: 20) |
| `sleep` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 12 | 6 unique frames (total files: 12) |
| `wake` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `play` | TAMAGOTCHI | Obrigatório | **PARTIAL** | 24 | 3 unique frames (total files: 24) |
| `clean` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 20 | 10 unique frames (total files: 20) |
| `heal` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 20 | 10 unique frames (total files: 20) |
| `evolution` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 28 | 14 unique frames (total files: 28) |
| `signature_attack` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 48 | 7 unique frames for attack-wolf-claw |

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

## 5. Ações Parciais (PARTIAL)

- **`play`**: 3 unique frames (total files: 24)

## 6. Duplicatas e Redundância Detectada

O personagem possui **141 arquivos duplicados exatos** (SHA-256 idêntico).
Isso decorre da co-existência do esquema de numeração original do Tamagotchi (`00.png` a `09.png`) com a cópia renomeada (`<action>_01.png` a `<action>_10.png`) nas pastas de cuidados virtuais (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`).

Exemplo de amostras duplicadas:
- `wake/04.png` == `wake/wake_05.png`
- `wake/07.png` == `wake/wake_08.png`
- `wake/05.png` == `wake/wake_06.png`
- `wake/01.png` == `wake/wake_02.png`
- `wake/02.png` == `wake/wake_03.png`
- `wake/wake_07.png` == `wake/06.png`
- `wake/03.png` == `wake/wake_04.png`
- `wake/wake_01.png` == `wake/00.png`

## 7. Itens para Revisão Manual (NEEDS_MANUAL_REVIEW)

### Master Spritesheets in _raw (1 sheets)
- **Motivo**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Arquivos envolvidos**: weregarurumon.png

### Raw Slices in _raw (131 frames)
- **Motivo**: Digimon has 131 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

## 8. Processamento Recomendado para Completude

1. **Combate Roguelike**: Inspecionar visualmente as 131 fatias em `_raw/` para mapear os índices de `sprite_XXXX.png` para:
   - `walk/left` e `walk/right`
   - `attacks/basic_1` (golpe físico básico)
   - `attacks/basic_2` (projétil ou ataque secundário)
   - `attacks/special` (especial)
   - `hit` (reação a dano)
   - `death` (animação de derrota)
2. **Normalização de Container**: Padronizar os frames selecionados em canvas `96x96` com ancoragem na baseline `y = 90` e centralização horizontal, sem distorcer o pixel art.
3. **Manifest**: Criar ou atualizar `docs/digital-path/manifests/weregarurumon.json` espelhando a estrutura do Veemon (`golden reference`).
4. **Limpeza de Duplicatas**: Unificar as pastas do Tamagotchi para consumir deterministicamente `_01.png`, descontinuando os arquivos legados `00.png` de forma segura.
