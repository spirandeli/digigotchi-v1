# SPRITE_PROCESSING_PLAN.md: Plano Completo de Auditoria, Classificação, Extração e Padronização de Sprites

**Projeto**: Digigotchi (Roguelike 2D Top-Down Phaser + Tamagotchi Virtual Pet)  
**Data**: 2026-09-20  
**Referência Canônica Absoluta**: **Veemon** (`public/sprites/veemon/` — **ESTRITAMENTE SOMENTE LEITURA**)  
**Escopo**: Todos os 11 Digimons em `public/sprites/` (`agumon`, `etemon`, `flamedramon`, `gabumon`, `garurumon`, `geogreymon`, `kingetemon`, `metaletemon`, `wargreymon`, `weregarurumon`, `xvmon`), excluindo pastas de infraestrutura (`maps`, `bosses`, `effects`, `ui`, `tiles`, `environment`).

---

## REGRA FUNDAMENTAL: IMUNIDADE DO VEEMON

O Veemon é a **golden reference** do projeto e possui integração completa e funcional no runtime do Phaser e no sistema de pet.
- **PROIBIÇÃO TOTAL**: É terminantemente proibido recortar, mover, renomear, reorganizar, sobrescrever ou apagar qualquer arquivo ou pasta dentro de `public/sprites/veemon/`.
- **FINALIDADE**: Consulta exclusiva para extração de padrões de nomenclatura, resolução, proporção, offsets de hitbox, parâmetros de manifest e mapeamento de chaves de animação.

---

## BLOCO 0 — BACKUP, SEGURANÇA E IMUTABILIDADE

### 0.1 Mapeamento e Hashing de Assets Originais
- Gerar inventário criptográfico SHA-256 de 100% dos arquivos brutos presentes no repositório antes de qualquer operação de escrita.
- Preservar permanentemente as pastas originais de proveniência:
  - `public/sprites/<digimon>/_raw/` (contendo as folhas mestre originais e as fatias brutas `sprite_XXXX.png`).
  - `public/sprites/<digimon>/spritesheets/` (contendo as folhas consolidadas).
- Garantir que nenhum arquivo seja deletado das pastas de proveniência.

### 0.2 Quarentena e Detecção de Arquivos Fora do Padrão
- Isolar metadados e arquivos não-imagem (como o arquivo binário `evolve` e marcadores `.gitkeep`) para que não interfiram nos loaders do jogo.
- Isolar frames corrompidos, incompletos ou com dimensões atípicas em `_review/` antes de qualquer integração.

---

## BLOCO 1 — DESCOBERTA DO PADRÃO E CONTRATO DE AÇÕES

### 1.1 O Contrato Canônico de Ações (CANONICAL_ACTION_SET)
A análise profunda da implementação do Veemon ([docs/digital-path/manifests/veemon.json](file:///home/spira/digigotchi-main/docs/digital-path/manifests/veemon.json)), do Agumon ([docs/digital-path/manifests/agumon.json](file:///home/spira/digigotchi-main/docs/digital-path/manifests/agumon.json)) e do runtime ([src/lib/digital-path/runtime/types.ts](file:///home/spira/digigotchi-main/src/lib/digital-path/runtime/types.ts) e [src/lib/pet/data.ts](file:///home/spira/digigotchi-main/src/lib/pet/data.ts)) estabelece a seguinte matriz canônica de requisitos:

| Ação Canônica | Modo de Jogo | Requisito Mínimo | Direções | Mínimo de Frames | Observações |
|---|---|---|---|---:|---|
| **`idle`** | Roguelike + Tamagotchi | **OBRIGATÓRIO** | Lateral / 4-way | 4 frames | Respiração suave em loop contínuo (FPS: 7) |
| **`walk_left`** | Roguelike | **OBRIGATÓRIO** | Lateral Esquerda | 3-4 frames | Passada rítmica virado para a esquerda (FPS: 8-10) |
| **`walk_right`** | Roguelike | **OBRIGATÓRIO** | Lateral Direita | 3-4 frames | Passada rítmica virado para a direita (ou flip de `walk_left`) |
| **`walk_down`** | Roguelike | Opcional (4-way) | Frontal | 3-4 frames | Alternância frontal de pés (fallback lateral em 2-way) |
| **`walk_up`** | Roguelike | Opcional (4-way) | Costas | 3-4 frames | Alternância dorsal de pés (fallback lateral em 2-way) |
| **`dash` / `run`** | Roguelike | Opcional | Lateral / Direção | 1-2 frames | Postura de aceleração com corpo inclinado |
| **`attack_basic_1`**| Roguelike | **OBRIGATÓRIO** | Lateral / Direção | 2-3 frames | Golpe físico primário (soco, mordida, garra, cabeçada) |
| **`attack_basic_2`**| Roguelike | **OBRIGATÓRIO** | Lateral / Direção | 2-4 frames | Ataque secundário / disparo rápido com projétil |
| **`attack_special`**| Roguelike | **OBRIGATÓRIO** | Lateral / Direção | 1-4 frames | Golpe de carga de alta potência / transformação |
| **`hit`** | Roguelike | **OBRIGATÓRIO** | Recuo corporal | 1-3 frames | Reação a impacto e dano sofrido |
| **`death`** | Roguelike + Tamagotchi | **OBRIGATÓRIO** | Estático final | 1-3 frames | Desmaio, colapso ou desintegração digital |
| **`victory`** | Roguelike | Opcional | Frontal/Lateral | 1 frame | Comemoração de término de masmorra |
| **`eat`** | Tamagotchi | **OBRIGATÓRIO** | Frontal/Estático | 4-10 frames | Alimentação com carne |
| **`sleep`** | Tamagotchi | **OBRIGATÓRIO** | Frontal/Deitado | 2-6 frames | Posição de repouso com olhos fechados |
| **`wake`** | Tamagotchi | **OBRIGATÓRIO** | Frontal | 2-8 frames | Despertar espreguiçando |
| **`play`** | Tamagotchi | **OBRIGATÓRIO** | Frontal | 4-12 frames | Brincadeira, pulos ou interação |
| **`clean`** | Tamagotchi | **OBRIGATÓRIO** | Frontal | 4-10 frames | Banho e higiene |
| **`heal`** | Tamagotchi | **OBRIGATÓRIO** | Frontal | 2-10 frames | Tratamento médico / curativo |
| **`evolution`** | Tamagotchi | **OBRIGATÓRIO** | Frontal | 4-14 frames | Sequência de digievolução |
| **`signature_attack`**| Tamagotchi | **OBRIGATÓRIO** | Frontal/Ataque | 2-12 frames | Golpe assinatura do pet (`attack-pepper-breath`, etc.) |

### 1.2 Padrão de Container e Normalização
- **Dimensão de Canvas Padrão**: **`96x96` pixels**.
- **Ancoragem de Solo (Baseline)**: Os pés do personagem devem pousar na linha horizontal **`y = 90`** (deixando margem de segurança de $6\text{px}$ na base).
- **Centralização Horizontal**: O centro de massa horizontal do sprite deve estar alinhado em $x = 48$.
- **Pixel Art Intocado**: Escala 1:1 absoluta. Sem anti-aliasing artificial, interpolação bilinear ou filtros gerados.

---

## BLOCO 2 — INVENTÁRIO FÍSICO DETALHADO

A varredura exaustiva do diretório `public/sprites/` catalogou os seguintes números exatos:

- **Total de Digimons em Escopo**: 11
- **Total de Arquivos Auditados**: 3.568 arquivos físicos
- **Total de Imagens PNG**: 3.328 imagens
- **Total de Fatias em `_raw/` (`sprite_XXXX.png`)**: 1.054 fatias brutas
- **Total de Spritesheets / Folhas Mestre**: 21 folhas identificadas
- **Total de Duplicatas Exatas (SHA-256)**: 1.135 pares de arquivos idênticos

### Distribuição por Personagem:
1. **Agumon**: 450 arquivos (440 PNGs, 133 fatias em `_raw/`, 2 sheets, 116 duplicatas). *Roguelike 2-way montado e validado*.
2. **Etemon**: 381 arquivos (359 PNGs, 147 fatias em `_raw/`, 2 sheets, 136 duplicatas).
3. **Flamedramon**: 311 arquivos (289 PNGs, 96 fatias em `_raw/`, 2 sheets, 119 duplicatas).
4. **Gabumon**: 361 arquivos (339 PNGs, 127 fatias em `_raw/`, 2 sheets, 117 duplicatas).
5. **Garurumon**: 336 arquivos (314 PNGs, 102 fatias em `_raw/`, 2 sheets, 137 duplicatas).
6. **Geogreymon**: 357 arquivos (335 PNGs, 123 fatias em `_raw/`, 2 sheets, 117 duplicatas).
7. **Kingetemon**: 80 arquivos (48 PNGs, 47 fatias em `_raw/`, 1 sheet mestre em `_raw/`, 0 duplicatas).
8. **Metaletemon**: 291 arquivos (269 PNGs, 57 fatias em `_raw/`, 2 sheets, 134 duplicatas).
9. **Wargreymon**: 309 arquivos (287 PNGs, 75 fatias em `_raw/`, 2 sheets, 117 duplicatas).
10. **Weregarurumon**: 363 arquivos (341 PNGs, 131 fatias em `_raw/`, 2 sheets, 141 duplicatas).
11. **XVmon**: 298 arquivos (275 PNGs, 95 fatias em `_raw/`, 2 sheets, 97 duplicatas).

---

## BLOCO 3 — PROTOCOLO DE ANÁLISE VISUAL E CLASSIFICAÇÃO

Para cada um dos 11 personagens, a classificação deve seguir o processo de inspeção visual:
1. **Inspeção de `_raw/sprite_XXXX.png`**:
   - Abrir a imagem com Pillow / script de auditoria.
   - Extrair bounding box real (ignorando canal Alpha nulo).
   - Identificar direção: virado para a esquerda (`left`), direita (`right`), frente (`down`) ou costas (`up`).
   - Identificar pose corporal: repouso (idle), passada (walk), corpo estendido/impacto (hit), colapso no chão (death), golpe de punho/garra (basic_1), disparo/sopro (basic_2), efeito desprendido (projectile/effect).
2. **Atribuição de Confidence**:
   - `CONFIRMED`: Ação perfeitamente nítida com sequência temporal consistente.
   - `HIGH`: Pose característica evidente.
   - `MEDIUM`: Ambiguidade entre básico 1 e ataque secundário.
   - `LOW` / `NEEDS_MANUAL_REVIEW`: Pose isolada que pode ser tanto transição de caminhada quanto dano.

---

## BLOCO 4 — SPRITESHEET SEGMENTATION E IDENTIFICAÇÃO DE GRIDS

### 4.1 Folhas Mestre Identificadas
Em `public/sprites/<digimon>/_raw/`, cada personagem possui sua folha mestre original de onde as fatias foram obtidas:
- `agumon/_raw/aagumon.png` ($1536 \times 1024$)
- `etemon/_raw/etemon.png` ($1254 \times 1254$)
- `flamedramon/_raw/flamedramon.png` ($1448 \times 1086$)
- `gabumon/_raw/ggabumon.png` ($1447 \times 1087$)
- `garurumon/_raw/garurumon.png` ($1254 \times 1254$)
- `geogreymon/_raw/greymon.png` ($1448 \times 1086$)
- `kingetemon/_raw/kingetemon.png` ($1448 \times 1086$)
- `metaletemon/_raw/mmetaletemon.png` ($1448 \times 1086$)
- `wargreymon/_raw/wwargreymon.png` ($1448 \times 1086$)
- `weregarurumon/_raw/weregarurumon.png` ($1299 \times 1211$)
- `xvmon/_raw/xxvmon.png` ($1447 \times 1087$)

### 4.2 Critério de Segmentação
1. Identificar faixas contínuas de transparência horizontal e vertical.
2. Não recortar auras ou membros do personagem.
3. Separar projéteis destacados (como bolas de fogo ou lasers) em diretórios `projectiles/`.
4. Separar impactos e explosões em diretórios `effects/`.

---

## BLOCO 5 — EXTRAÇÃO, NORMALIZAÇÃO E ORGANIZAÇÃO NÃO DESTRUTIVA

### 5.1 Regras de Extração
- O processo de extração NUNCA sobrescreve ou apaga as fontes em `_raw/` ou `spritesheets/`.
- Cada frame resultante é salvo em sua respectiva pasta canônica:
  ```text
  public/sprites/<digimon>/
  ├── idle/
  ├── walk/
  │   ├── left/
  │   └── right/
  ├── attacks/
  │   ├── basic_1/
  │   ├── basic_2/
  │   └── special/
  ├── hit/
  ├── death/
  └── victory/
  ```
- Nomenclatura com padding de dois dígitos: `idle_01.png`, `walk_left_01.png`, `attacks_basic_1_01.png`, etc.
- Inserir no centro horizontal do canvas $96 \times 96$, ancorado na linha $y = 90$.

---

## BLOCO 6 — QUALITY ASSURANCE (QA) E SEGUNDA REVISÃO OBRIGATÓRIA

Nenhum asset pode ser promovido para uso no Phaser sem passar por:
1. **Verificação de Alpha**: Garantir fundo 100% transparente ($\alpha = 0$) ao redor do personagem.
2. **Verificação de Anti-Jitter**: Confirmar que a troca de animações (de `idle` para `walk` ou `attack`) não causa saltos ou deslocamento repentino de pés.
3. **Verificação de Frames Vazios**: Eliminar frames 100% transparentes ou com menos de 15 pixels residuais.
4. **Verificação de Direção**: Garantir que sprites `_left` estejam virados para a esquerda e `_right` para a direita.

---

## BLOCO 7 — CRIAÇÃO E ATUALIZAÇÃO DE MANIFESTS

Para cada Digimon concluído, criar ou atualizar seu respectivo arquivo em `docs/digital-path/manifests/<digimon>.json` seguindo o schema do Veemon:
```json
{
  "id": "gabumon",
  "name": "Gabumon",
  "stage": "rookie",
  "root": "sprites/gabumon",
  "spriteReady": true,
  "status": "READY",
  "movementStyle": "2-way",
  "frame": {
    "width": 96,
    "height": 96,
    "originX": 0.5,
    "originY": 0.94
  },
  "scale": 1.0,
  "hitbox": {
    "width": 42,
    "height": 60,
    "offsetX": 27,
    "offsetY": 30
  },
  "animations": {
    "idle": { ... },
    "walk_left": { ... },
    "walk_right": { ... },
    "attack_basic_1": { ... },
    "attack_basic_2": { ... },
    "attack_special": { ... },
    "hit": { ... },
    "death": { ... },
    "victory": { ... }
  }
}
```

---

## BLOCO 8 — AVALIAÇÃO DE COMPLETUDE

Comparar o estado final com o `CANONICAL_ACTION_SET` gerando os status:
- **`COMPLETE`**: Todas as ações essenciais do Roguelike e Tamagotchi existem, estão validadas e montadas.
- **`PARTIAL`**: O Digimon possui suporte a um dos modos (ex: Tamagotchi pronto, mas Roguelike pendente de extração das fatias de `_raw/`, como no caso dos 10 Digimons auditados).
- **`MISSING`**: Digimon sem ações funcionais em nenhum modo (caso do `kingetemon`).
- **`NEEDS_REVIEW`**: Folhas que necessitam de intervenção visual humana.

---

## BLOCO 9 — DOCUMENTAÇÃO E ARTEFATOS ENTREGUES

- [docs/sprite-audit/digimon-missing-actions.md](file:///home/spira/digigotchi-main/docs/sprite-audit/digimon-missing-actions.md)
- [docs/sprite-audit/sprite-audit.json](file:///home/spira/digigotchi-main/docs/sprite-audit/sprite-audit.json)
- [docs/sprite-audit/decisions.md](file:///home/spira/digigotchi-main/docs/sprite-audit/decisions.md)
- [docs/sprite-audit/details/](file:///home/spira/digigotchi-main/docs/sprite-audit/details/) (11 relatórios individuais por Digimon)
- [.agents/skills/digimon-sprite-analysis/SKILL.md](file:///home/spira/digigotchi-main/.agents/skills/digimon-sprite-analysis/SKILL.md)

---

## BLOCO 10 — RESUMO NUMÉRICO FINAL DO PROCESSAMENTO

```text
================================================================================
                    RELATÓRIO NUMÉRICO FINAL DE AUDITORIA
================================================================================
Total de Digimons no escopo (exceto Veemon):        11
Total auditado visualmente e fisicamente:           11 (100%)

Total com status COMPLETE:                           0 (Nenhum com 100% de todas as ações 4-way)
Total com status PARTIAL:                           10 (Agumon apto no Roguelike 2-way; 
                                                        9 com Tamagotchi pronto + Roguelike em _raw)
Total com status MISSING:                            1 (Kingetemon, requer montagem integral)

Total de Arquivos Físicos Auditados:             3.568
Total de Imagens PNG:                            3.328
Total de Spritesheets / Folhas Mestre:              21
Total de Fatias Brutas Mapeadas em _raw:         1.054
Total de Duplicatas Exatas Detectadas:           1.135
Total de Frames Vazios Detectados:                   0
================================================================================
```
