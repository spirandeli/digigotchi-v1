# Matriz de Prontidão dos Digimons (Digimon Readiness Matrix)

**Data de Atualização**: 2026-09-20  
**Referência Canônica**: Veemon (`public/sprites/veemon/` — Golden Reference)  
**Status da Padronização**: Auditado, Classificado, Manifests Criados, 4-Way Ativo.

---

## 1. Visão Geral Executiva

| Categoria | Quantidade | Digimons |
|---|---:|---|
| **READY em Ambos (Tamagotchi + Roguelike 4-Way)** | **2** | `veemon`, `agumon` |
| **PARTIAL (Tamagotchi Pronto + Roguelike Estruturado)** | **9** | `gabumon`, `garurumon`, `geogreymon`, `wargreymon`, `weregarurumon`, `xvmon`, `flamedramon`, `etemon`, `metaletemon` |
| **BLOCKED (Estrutura Criada, Pendente de Extração Integral)** | **1** | `kingetemon` |
| **Total no Escopo** | **12** | (11 do projeto + 1 Golden Reference) |

---

## 2. Detalhamento por Personagem

### 1. VEEMON (Golden Reference — Imunidade Absoluta)
- **Tamagotchi**: `READY` (Ações completas: idle, eat, sleep, wake, play, clean, heal, evolution, attack-vee-headbutt)
- **Roguelike**: `READY` (Movimento 4-way nativo, basic_1 Vee-Punch, basic_2 Vee-Laser, especial Vee-Headbutt, hit, death, victory)
- **4-Way**: `COMPLETE`
- **Manifest**: `docs/digital-path/manifests/veemon.json`
- **Sprites Originais**: 271
- **Sprites 4-Way Gerados**: 0 (nativos originais)
- **Ações Faltantes**: Nenhuma

---

### 2. AGUMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-pepper-breath)
- **Roguelike**: `READY` (Movimento 4-way completo, basic_1 Claw/Punch, basic_2 Dragon Breath, especial Mega Blast, hit, death, victory)
- **4-Way**: `COMPLETE` (Direções `walk_down` e `walk_up` geradas com baseline $y=90$ e validadas via `digimon-4way-sprite-generator`)
- **Manifest**: `docs/digital-path/manifests/agumon.json` (`movementStyle: "4-way"`)
- **Sprites Originais**: 440
- **Sprites 4-Way Gerados**: 6 (`walk_down_01..03.png`, `walk_up_01..03.png`)
- **Ações Faltantes**: Nenhuma

---

### 3. GABUMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-blue-blaster)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/gabumon/`, manifest registrado com `spriteReady: false`, 127 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED` (Aguardando promoção das fatias de caminhada de `_raw/`)
- **Manifest**: `docs/digital-path/manifests/gabumon.json`
- **Sprites Originais**: 339
- **Ações Faltantes no Roguelike**: `walk_left`, `walk_right`, `walk_down`, `walk_up`, `attack_basic_1`, `attack_basic_2`, `attack_special`, `hit`, `death`

---

### 4. GARURUMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-howling-blaster)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/garurumon/`, manifest registrado com `spriteReady: false`, 102 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/garurumon.json`
- **Sprites Originais**: 314
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 5. GEOGREYMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-mega-flame)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/geogreymon/`, manifest registrado com `spriteReady: false`, 123 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/geogreymon.json`
- **Sprites Originais**: 335
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 6. WARGREYMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-terra-force)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/wargreymon/`, manifest registrado com `spriteReady: false`, 75 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/wargreymon.json`
- **Sprites Originais**: 287
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 7. WEREGARURUMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-wolf-claw)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/weregarurumon/`, manifest registrado com `spriteReady: false`, 131 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/weregarurumon.json`
- **Sprites Originais**: 341
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 8. XVMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-vee-laser)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/xvmon/`, manifest registrado com `spriteReady: false`, 95 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/xvmon.json`
- **Sprites Originais**: 275
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 9. FLAMEDRAMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-fire-rocket)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/flamedramon/`, manifest registrado com `spriteReady: false`, 96 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/flamedramon.json`
- **Sprites Originais**: 289
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 10. ETEMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-love-serenade)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/etemon/`, manifest registrado com `spriteReady: false`, 147 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/etemon.json`
- **Sprites Originais**: 359
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 11. METALETEMON
- **Tamagotchi**: `READY` (idle, eat, sleep, wake, play, clean, heal, evolution, attack-banana-slip)
- **Roguelike**: `PARTIAL` (Estrutura de pastas padronizada em `public/sprites/metaletemon/`, manifest registrado com `spriteReady: false`, 57 fatias brutas em `_raw/`)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/metaletemon.json`
- **Sprites Originais**: 269
- **Ações Faltantes no Roguelike**: Ações de combate aguardando extração de `_raw/`

---

### 12. KINGETEMON
- **Tamagotchi**: `BLOCKED` (Estrutura de pastas criada em `public/sprites/kingetemon/`, porém sem frames populados)
- **Roguelike**: `BLOCKED` (Folha mestre e 47 fatias brutas presentes em `_raw/`, estrutura de runtime pronta)
- **4-Way**: `NOT_REQUIRED`
- **Manifest**: `docs/digital-path/manifests/kingetemon.json`
- **Sprites Originais**: 48 (em `_raw/`)
- **Ações Faltantes**: Todas as ações de Tamagotchi e Roguelike pendentes de povoamento.
