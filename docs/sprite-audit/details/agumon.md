# Auditoria Detalhada de Sprites: AGUMON

Data da Auditoria: 2026-09-20 17:22:29
Status Geral: **PARTIAL**

---

## 1. Arquivos Descobertos e Estrutura Física

- **Total de arquivos no diretório**: `450`
- **Total de imagens PNG**: `440`
- **Arquivos não-PNG / Metadados**: `10` (ex: `evolve`, `.gitkeep`)
- **Spritesheets / Folhas Mestre**: `2`
- **Frames individuais (ações montadas)**: `426`
- **Frames brutos em _raw (fatias brutas `sprite_XXXX`)**: `133`
- **Efeitos visuais desacoplados (VFX)**: `8`
- **Projéteis desacoplados**: `4`
- **Arquivos duplicados exatos (SHA-256 idêntico)**: `116`
- **Frames vazios detectados (100% transparentes)**: `0`

---

## 2. Spritesheets e Folhas Mestre Identificadas

| Caminho Relativo | Dimensões (LxA) | Tipo |
|---|---|---|
| `spritesheets/agumon.png` | `1002x1040` | Spritesheet Consolidada |
| `_raw/aagumon.png` | `1536x1024` | Mestre de Referência (_raw) |

## 3. Avaliação Contra o CANONICAL_ACTION_SET

| Ação Canônica | Modo de Jogo | Requisito | Status Atual | Frames Válidos | Detalhes Técnicos |
|---|---|---|---|---:|---|
| `idle` | BOTH | Obrigatório | **COMPLETE** | 18 | 9 unique frames in idle/ |
| `walk_left` | ROGUELIKE | Obrigatório | **COMPLETE** | 11 | 11 frames |
| `walk_right` | ROGUELIKE | Obrigatório | **COMPLETE** | 10 | 10 frames |
| `walk_down` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `walk_up` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `dash` | ROGUELIKE | Opcional | **MISSING** | 0 | 0 frames |
| `attack_basic_1` | ROGUELIKE | Obrigatório | **COMPLETE** | 6 | 6 frames |
| `attack_basic_2` | ROGUELIKE | Obrigatório | **COMPLETE** | 4 | 4 frames |
| `attack_special` | ROGUELIKE | Obrigatório | **COMPLETE** | 3 | 3 frames |
| `hit` | ROGUELIKE | Obrigatório | **COMPLETE** | 1 | 1 frames |
| `death` | BOTH | Obrigatório | **COMPLETE** | 1 | 1 frames |
| `victory` | ROGUELIKE | Opcional | **COMPLETE** | 1 | 1 frames |
| `eat` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 20 | 10 unique frames (total files: 20) |
| `sleep` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 12 | 6 unique frames (total files: 12) |
| `wake` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 16 | 8 unique frames (total files: 16) |
| `play` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 24 | 12 unique frames (total files: 24) |
| `clean` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 20 | 10 unique frames (total files: 20) |
| `heal` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 20 | 10 unique frames (total files: 20) |
| `evolution` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 28 | 14 unique frames (total files: 28) |
| `signature_attack` | TAMAGOTCHI | Obrigatório | **COMPLETE** | 48 | 12 unique frames for attack-pepper-breath |

---

## 4. Ações Faltantes (MISSING)

- **`walk_down`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`walk_up`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.
- **`dash`** (ROGUELIKE): Diretório vazio com `.gitkeep` ou ausente. Necessita extração a partir de `_raw/` ou criação de assets.

## 5. Ações Parciais (PARTIAL)

Nenhuma ação parcial detectada.

## 6. Duplicatas e Redundância Detectada

O personagem possui **116 arquivos duplicados exatos** (SHA-256 idêntico).
Isso decorre da co-existência do esquema de numeração original do Tamagotchi (`00.png` a `09.png`) com a cópia renomeada (`<action>_01.png` a `<action>_10.png`) nas pastas de cuidados virtuais (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`).

Exemplo de amostras duplicadas:
- `portrait.png` == `agumon.png`
- `wake/04.png` == `wake/wake_05.png`
- `wake/07.png` == `wake/wake_08.png`
- `wake/05.png` == `wake/wake_06.png`
- `wake/01.png` == `wake/wake_02.png`
- `wake/02.png` == `wake/wake_03.png`
- `wake/wake_07.png` == `wake/06.png`
- `wake/03.png` == `wake/wake_04.png`

## 7. Itens para Revisão Manual (NEEDS_MANUAL_REVIEW)

### Master Spritesheets in _raw (1 sheets)
- **Motivo**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Arquivos envolvidos**: aagumon.png

## 8. Processamento Recomendado para Completude

1. **Combate Roguelike**: Inspecionar visualmente as 133 fatias em `_raw/` para mapear os índices de `sprite_XXXX.png` para:
   - `walk/left` e `walk/right`
   - `attacks/basic_1` (golpe físico básico)
   - `attacks/basic_2` (projétil ou ataque secundário)
   - `attacks/special` (especial)
   - `hit` (reação a dano)
   - `death` (animação de derrota)
2. **Normalização de Container**: Padronizar os frames selecionados em canvas `96x96` com ancoragem na baseline `y = 90` e centralização horizontal, sem distorcer o pixel art.
3. **Manifest**: Criar ou atualizar `docs/digital-path/manifests/agumon.json` espelhando a estrutura do Veemon (`golden reference`).
4. **Limpeza de Duplicatas**: Unificar as pastas do Tamagotchi para consumir deterministicamente `_01.png`, descontinuando os arquivos legados `00.png` de forma segura.
