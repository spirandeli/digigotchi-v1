# Relatório Consolidado de Auditoria e Ações Faltantes de Sprites

**Data de Geração**: 2026-09-20 17:22:32  
**Referência Canônica**: Veemon (`public/sprites/veemon/`)  
**Processamento do Veemon**: **EXCLUÍDO (GOLDEN REFERENCE - SOMENTE LEITURA)**  

---

## 1. Resumo Executivo (Summary)

- **Total de Personagens Descobertos**: `11` (+ Veemon como referência)
- **Total de Personagens Auditados**: `11`
- **Personagens Completos (Todas as ações 100%)**: `0`
- **Personagens Parciais (Funcionais em um ou mais modos)**: `10`
- **Personagens com Ações Críticas Ausentes / Inativos**: `1` (`kingetemon`)
- **Total de Arquivos Analisados**: `3537`
- **Total de Imagens PNG Auditadas**: `3296`
- **Total de Spritesheets / Folhas Mestre Catalogadas**: `21`
- **Total de Fatias Brutas em _raw Catalogadas**: `1133`
- **Total de Duplicatas Exatas Detectadas**: `1231`

---

## 2. Matriz Geral de Completude

| Digimon | Status Geral | Ações Completas | Ações Parciais | Ações Faltantes | Spritesheets | Fatias em _raw | Duplicatas |
|---|---|---:|---:|---:|---:|---:|---:|
| **agumon** | `READY` | 19 | 0 | 1 | 2 | 133 | 116 |
| **etemon** | `PARTIAL` | 9 | 0 | 11 | 2 | 147 | 136 |
| **flamedramon** | `PARTIAL` | 7 | 2 | 11 | 2 | 96 | 119 |
| **gabumon** | `PARTIAL` | 9 | 0 | 11 | 2 | 127 | 117 |
| **garurumon** | `PARTIAL` | 8 | 1 | 11 | 2 | 102 | 137 |
| **geogreymon** | `PARTIAL` | 9 | 0 | 11 | 2 | 123 | 117 |
| **kingetemon** | `MISSING` | 0 | 0 | 20 | 1 | 47 | 0 |
| **metaletemon** | `PARTIAL` | 9 | 0 | 11 | 2 | 57 | 134 |
| **wargreymon** | `PARTIAL` | 9 | 0 | 11 | 2 | 75 | 117 |
| **weregarurumon** | `PARTIAL` | 8 | 1 | 11 | 2 | 131 | 141 |
| **xvmon** | `PARTIAL` | 8 | 0 | 12 | 2 | 95 | 97 |

---

## 3. Matriz de Ações por Digimon

| Digimon | Idle | Walk (Esq/Dir) | Walk (Cima/Baixo) | Ataque Básico 1 | Ataque Básico 2 | Ataque Especial | Hit / Dano | Morte | Tamagotchi (Cuidados) | Ataque Assinatura |
|---|---|---|---|---|---|---|---|---|---|---|
| **agumon** | COMPLETE | COMPLETE | COMPLETE (4-Way) | COMPLETE | COMPLETE | COMPLETE | COMPLETE | COMPLETE | COMPLETE | COMPLETE |
| **etemon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | COMPLETE | COMPLETE |
| **flamedramon** | PARTIAL | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | PARTIAL | COMPLETE |
| **gabumon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | COMPLETE | COMPLETE |
| **garurumon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | PARTIAL | COMPLETE |
| **geogreymon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | COMPLETE | COMPLETE |
| **kingetemon** | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING |
| **metaletemon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | COMPLETE | COMPLETE |
| **wargreymon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | COMPLETE | COMPLETE |
| **weregarurumon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | PARTIAL | COMPLETE |
| **xvmon** | COMPLETE | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | MISSING | PARTIAL | COMPLETE |

---

## 4. Auditoria Individual por Digimon

### AGUMON

- **Status Geral**: `READY` (Totalmente funcional em Tamagotchi e Roguelike com 4-Way completo)
- **Total de Arquivos**: `456` (PNGs: `446`, Duplicatas: `116`)
- **Acervo em _raw**: `133 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (9 unique frames in idle/)
- `walk_left` (11 frames)
- `walk_right` (10 frames)
- `walk_down` (3 frames gerados via 4-Way: `walk_down_01..03.png`)
- `walk_up` (3 frames gerados via 4-Way: `walk_up_01..03.png`)
- `attack_basic_1` (6 frames)
- `attack_basic_2` (4 frames)
- `attack_special` (3 frames)
- `hit` (1 frames)
- `death` (1 frames)
- `victory` (1 frames)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `play` (12 unique frames (total files: 24))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (12 unique frames for attack-pepper-breath)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente; mecânica opcional)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.

---

### ETEMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `381` (PNGs: `359`, Duplicatas: `136`)
- **Acervo em _raw**: `147 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (5 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `play` (7 unique frames (total files: 24))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (10 unique frames for attack-love-serenade)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (147 frames)**: Digimon has 147 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### FLAMEDRAMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `311` (PNGs: `289`, Duplicatas: `119`)
- **Acervo em _raw**: `96 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (4 unique frames for attack-fire-rocket)

#### Ações PARCIAIS
- `idle` (Only 2 unique frames)
- `play` (3 unique frames (total files: 24))

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (96 frames)**: Digimon has 96 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### GABUMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `361` (PNGs: `339`, Duplicatas: `117`)
- **Acervo em _raw**: `127 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (10 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `play` (12 unique frames (total files: 24))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (12 unique frames for attack-blue-blaster)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (127 frames)**: Digimon has 127 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### GARURUMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `336` (PNGs: `314`, Duplicatas: `137`)
- **Acervo em _raw**: `102 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (6 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (7 unique frames for attack-howling-blaster)

#### Ações PARCIAIS
- `play` (3 unique frames (total files: 24))

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (102 frames)**: Digimon has 102 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### GEOGREYMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `357` (PNGs: `335`, Duplicatas: `117`)
- **Acervo em _raw**: `123 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (10 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `play` (12 unique frames (total files: 24))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (12 unique frames for attack-mega-flame)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (123 frames)**: Digimon has 123 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### KINGETEMON

- **Status Geral**: `MISSING`
- **Total de Arquivos**: `80` (PNGs: `48`, Duplicatas: `0`)
- **Acervo em _raw**: `47 fatias individuais` + `1 folhas mestre`

#### Ações COMPLETAS
- *Nenhuma*

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `idle` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)
- `eat` (Diretório contém apenas `.gitkeep` ou está ausente)
- `sleep` (Diretório contém apenas `.gitkeep` ou está ausente)
- `wake` (Diretório contém apenas `.gitkeep` ou está ausente)
- `play` (Diretório contém apenas `.gitkeep` ou está ausente)
- `clean` (Diretório contém apenas `.gitkeep` ou está ausente)
- `heal` (Diretório contém apenas `.gitkeep` ou está ausente)
- `evolution` (Diretório contém apenas `.gitkeep` ou está ausente)
- `signature_attack` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (47 frames)**: Digimon has 47 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### METALETEMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `291` (PNGs: `269`, Duplicatas: `134`)
- **Acervo em _raw**: `57 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (4 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `play` (5 unique frames (total files: 24))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (11 unique frames for attack-banana-slip)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (57 frames)**: Digimon has 57 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### WARGREYMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `309` (PNGs: `287`, Duplicatas: `117`)
- **Acervo em _raw**: `75 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (10 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `play` (12 unique frames (total files: 24))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (12 unique frames for attack-terra-force)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (75 frames)**: Digimon has 75 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### WEREGARURUMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `363` (PNGs: `341`, Duplicatas: `141`)
- **Acervo em _raw**: `131 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (5 unique frames in idle/)
- `eat` (10 unique frames (total files: 20))
- `sleep` (6 unique frames (total files: 12))
- `wake` (8 unique frames (total files: 16))
- `clean` (10 unique frames (total files: 20))
- `heal` (10 unique frames (total files: 20))
- `evolution` (14 unique frames (total files: 28))
- `signature_attack` (7 unique frames for attack-wolf-claw)

#### Ações PARCIAIS
- `play` (3 unique frames (total files: 24))

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (131 frames)**: Digimon has 131 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

### XVMON

- **Status Geral**: `PARTIAL`
- **Total de Arquivos**: `298` (PNGs: `275`, Duplicatas: `97`)
- **Acervo em _raw**: `95 fatias individuais` + `2 folhas mestre`

#### Ações COMPLETAS
- `idle` (8 unique frames in idle/)
- `eat` (8 unique frames (total files: 16))
- `sleep` (8 unique frames (total files: 16))
- `wake` (8 unique frames (total files: 16))
- `play` (8 unique frames (total files: 16))
- `heal` (8 unique frames (total files: 16))
- `evolution` (8 unique frames (total files: 16))
- `signature_attack` (8 unique frames for attack-vee-laser)

#### Ações PARCIAIS
- *Nenhuma*

#### Ações FALTANTES (MISSING)
- `walk_left` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_right` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_down` (Diretório contém apenas `.gitkeep` ou está ausente)
- `walk_up` (Diretório contém apenas `.gitkeep` ou está ausente)
- `dash` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_1` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_basic_2` (Diretório contém apenas `.gitkeep` ou está ausente)
- `attack_special` (Diretório contém apenas `.gitkeep` ou está ausente)
- `hit` (Diretório contém apenas `.gitkeep` ou está ausente)
- `death` (Diretório contém apenas `.gitkeep` ou está ausente)
- `victory` (Diretório contém apenas `.gitkeep` ou está ausente)
- `clean` (Diretório contém apenas `.gitkeep` ou está ausente)

#### Necessita Revisão Manual (NEEDS_REVIEW)
- **Master Spritesheets in _raw (1 sheets)**: Master reference boards containing uncut animations, VFX and UI panels. Require visual grid segmentation mapping.
- **Raw Slices in _raw (95 frames)**: Digimon has 95 raw extracted slices in _raw/ waiting for semantic mapping to Roguelike actions.

---

## 5. Ordem Técnica Recomendada de Processamento de Assets (Recommended Asset Creation Order)

A ordem técnica recomendada para extração e completude prioriza os personagens que já possuem a base de Tamagotchi pronta e maior quantidade de matéria-prima já fatiada em `_raw/`:

1. **Agumon**
   - *Ações Faltantes*: apenas 2 (`walk_down`, `walk_up` para expansão de 2-way para 4-way, e `dash`).
   - *Status*: Já funcional no Roguelike e Tamagotchi.
2. **Gabumon**
   - *Matéria-Prima*: 127 fatias prontas em `_raw/` e Tamagotchi 100% pronto.
   - *Ações a mapear*: `walk_left`, `walk_right`, `attack_basic_1`, `attack_basic_2`, `attack_special`, `hit`, `death`.
3. **Geogreymon**
   - *Matéria-Prima*: 123 fatias em `_raw/` e Tamagotchi 100% pronto.
4. **Weregarurumon**
   - *Matéria-Prima*: 131 fatias em `_raw/` e Tamagotchi 100% pronto.
5. **Etemon**
   - *Matéria-Prima*: 147 fatias em `_raw/` e Tamagotchi 100% pronto.
6. **Garurumon**
   - *Matéria-Prima*: 102 fatias em `_raw/` e Tamagotchi 100% pronto.
7. **Flamedramon**
   - *Matéria-Prima*: 96 fatias em `_raw/` e Tamagotchi 100% pronto.
8. **XVmon**
   - *Matéria-Prima*: 95 fatias em `_raw/` e Tamagotchi 100% pronto.
9. **Wargreymon**
   - *Matéria-Prima*: 75 fatias em `_raw/` e Tamagotchi 100% pronto.
10. **Metaletemon**
    - *Matéria-Prima*: 57 fatias em `_raw/` e Tamagotchi 100% pronto.
11. **Kingetemon**
    - *Matéria-Prima*: 47 fatias em `_raw/`, requer montagem do Tamagotchi e Roguelike.
