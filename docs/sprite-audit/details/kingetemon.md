# Auditoria Detalhada de Sprites: KINGETEMON

Data da Auditoria: 2026-09-20 17:22:31
Status Geral: **MISSING**

---

## 1. Arquivos Descobertos e Estrutura Física

- **Total de arquivos no diretório**: `80`
- **Total de imagens PNG**: `48`
- **Arquivos não-PNG / Metadados**: `32` (ex: `evolve`, `.gitkeep`)
- **Spritesheets / Folhas Mestre**: `1`
- **Frames individuais (ações montadas)**: `47`
- **Frames brutos em _raw (fatias brutas `sprite_XXXX`)**: `47`
- **Efeitos visuais desacoplados (VFX)**: `0`
- **Projéteis desacoplados**: `0`
- **Arquivos duplicados exatos (SHA-256 idêntico)**: `0`
- **Frames vazios detectados (100% transparentes)**: `0`

---

## 2. Spritesheets e Folhas Mestre Identificadas

| Caminho Relativo | Dimensões (LxA) | Tipo |
|---|---|---|
| `_raw/kingetemon.png` | `1448x1086` | Mestre de Referência (_raw) |

## 3. Avaliação Contra o CANONICAL_ACTION_SET

| Ação Canônica | Modo de Jogo | Requisito | Status Atual | Frames Válidos | Detalhes Técnicos |
|---|---|---|---|---:|---|
| `idle` | BOTH | Obrigatório | **MISSING** | 0 | Folder empty (.gitkeep) |
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
| `eat` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `sleep` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `wake` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `play` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `clean` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `heal` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `evolution` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames (total files: 0) |
| `signature_attack` | TAMAGOTCHI | Obrigatório | **MISSING** | 0 | 0 unique frames for attack-monkey-claw |

---

## 4. Ações Faltantes (MISSING)

- **`idle`** (BOTH): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
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
- **`eat`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`sleep`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`wake`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`play`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`clean`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`heal`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`evolution`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`signature_attack`** (TAMAGOTCHI): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.

## 5. Ações Parciais (PARTIAL)

Nenhuma ação parcial detectada.

## 6. Duplicatas e Redundância Detectada

O personagem possui **0 arquivos duplicados exatos** (SHA-256 idêntico).
Isso decorre da co-existência do esquema de numeração original do Tamagotchi (`00.png` a `09.png`) com a cópia renomeada (`<action>_01.png` a `<action>_10.png`) nas pastas de cuidados virtuais (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`).

Exemplo de amostras duplicadas:

## 7. Itens para Revisão Manual (NEEDS_MANUAL_REVIEW)

### Master Spritesheets in _raw (1 sheets)
- **Motivo**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Arquivos envolvidos**: kingetemon.png

### Raw Slices in _raw (47 frames)
- **Motivo**: Digimon has 47 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

## 8. Processamento Recomendado para Completude

1. **Combate Roguelike**: Inspecionar visualmente as 47 fatias em `_raw/` para mapear os índices de `sprite_XXXX.png` para:
   - `walk/left` e `walk/right`
   - `attacks/basic_1` (golpe físico básico)
   - `attacks/basic_2` (projétil ou ataque secundário)
   - `attacks/special` (especial)
   - `hit` (reação a dano)
   - `death` (animação de derrota)
2. **Normalização de Container**: Padronizar os frames selecionados em canvas `96x96` com ancoragem na baseline `y = 90` e centralização horizontal, sem distorcer o pixel art.
3. **Manifest**: Criar ou atualizar `docs/digital-path/manifests/kingetemon.json` espelhando a estrutura do Veemon (`golden reference`).
4. **Limpeza de Duplicatas**: Unificar as pastas do Tamagotchi para consumir deterministicamente `_01.png`, descontinuando os arquivos legados `00.png` de forma segura.
