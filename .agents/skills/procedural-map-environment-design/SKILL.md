---
name: procedural-map-environment-design
description: >
  Especializada em design e geração procedural de mapas, composição de ambientes vivos,
  clusters semânticos, landmarks, autotiling com cantos, controle de densidade e cumprimento
  rigoroso do Visual Fidelity Contract baseado exclusivamente nos assets locais de cada tema.
---

# Procedural Map & Environment Design

Esta skill estabelece os padrões e contratos mandatórios para a criação, expansão, auditoria e geração procedural de mapas no Caminho Digital / Roguelike.

---

# 1. VISUAL FIDELITY CONTRACT (Regra Absoluta)

Nenhum asset de mapa (tile, parede, canto, prop, hazard, decoração, marco visual) pode ser gerado, modificado ou adicionado sem cumprir integralmente o seguinte fluxo de fidelidade:

## As 7 Etapas Invioláveis
1. **Referências Locais:** Identificar e carregar exclusivamente os arquivos da pasta do próprio tema (ex: `public/sprites/maps/fire/` para o tema Fire). É expressamente proibido usar o estilo de outro bioma como referência estética.
2. **Análise Visual das Referências:** Inspecionar os sprites e spritesheets existentes do tema para absorver paleta HSL/RGB, contornos, iluminação zenital, sombreamento, textura e ruído característico.
3. **Medição Estrutural:** Medir com precisão a resolução do canvas original (114x114 px na prancha), tamanho de renderização no Phaser (48x48 px), proporções e padding.
4. **Geração Pontual (Unitária):** Nunca gerar pacotes massivos sem validação intermediária. Gerar 1 asset por vez.
5. **Comparação Técnica e Estilística:** Comparar lado a lado com pelo menos 2 a 3 Golden References do mesmo tema.
6. **Registro de Evidência:** Registrar em `docs/map-audit/generated-assets-evidence.md` e `.json` todos os parâmetros aferidos.
7. **Validação e Quality Gate:** Aplicar a Pergunta Obrigatória do QA Visual:
   > *"Se eu colocar esse sprite no meio dos assets originais daquele tema sem informar qual foi gerado, ele parece fazer parte exatamente do mesmo pack?"*
   - Se a resposta for **NÃO** ou **TALVEZ**: **REJEITAR**.
   - Apenas aceitar se a resposta for **SIM**, comprovado por evidências.

---

# 2. Pipeline de Geração de Assets Faltantes

```text
IDENTIFY MISSING ASSET
        ↓
IDENTIFY THEME (lightning / fire / ice / tech)
        ↓
LOCATE LOCAL REFERENCES (na pasta do próprio tema)
        ↓
OPEN REFERENCES VISUALLY (inspecionar PNGs e prancha)
        ↓
ANALYZE STYLE (paleta, contorno, luz, textura)
        ↓
MEASURE TILE/CANVAS (114x114 original / 48x48 display)
        ↓
GENERATE ONE ASSET
        ↓
VISUAL COMPARISON (contra 3 Golden References locais)
        ↓
TECHNICAL COMPARISON (alpha, bounds, resolução)
        ↓
PASS?
  ↙           ↘
NO             YES
↓               ↓
REJECT       ACCEPT & REGISTER
```

---

# 3. Orientação Geométrica de Paredes e Cantos (Autotiling)

## Regra Crítica de Orientação
Nunca utilizar `wall_vertical` onde geometricamente é necessária `wall_horizontal` e vice-versa:
- **Paredes Norte (Top):** Superfície horizontal voltada para o sul (chão abaixo). Utilizam `wall_top` / `wall_horizontal`.
- **Paredes Sul (Bottom):** Superfície horizontal voltada para o norte (chão acima). Utilizam `wall_bottom` / `wall_horizontal`.
- **Paredes Oeste (Left):** Pilares e blocos verticais formando a coluna esquerda (chão à direita). Utilizam `wall_left`.
- **Paredes Leste (Right):** Pilares e blocos verticais formando a coluna direita (chão à esquerda). Utilizam `wall_right`.
- **Cantos Externos (Convexos):**
  - Outer Top-Left: Encontro de parede superior e esquerda (chão a sudeste).
  - Outer Top-Right: Encontro de parede superior e direita (chão a sudoeste).
  - Outer Bottom-Left: Encontro de parede inferior e esquerda (chão a nordeste).
  - Outer Bottom-Right: Encontro de parede inferior e direita (chão a noroeste).
- **Cantos Internos (Côncavos):**
  - Inner Top-Left, Inner Top-Right, Inner Bottom-Left, Inner Bottom-Right para encontros angulares internos.

---

# 4. Composição de Ambientes Vivos e Orgânicos

O principal defeito a ser evitado é o "mar de chão vazio". Salas nunca devem ser apenas um retângulo com piso uniforme.

## A. Microáreas e Zonas Funcionais
Toda sala deve ser subdividida deterministicamente em zonas:
- `spawn_zone`: Área do player limpa, segura e desimpedida.
- `combat_zone`: Área central aberta e legível (55% a 75% da sala livre de colisões).
- `treasure_zone`: Alcova ou recesso guardado para baús.
- `hazard_zone`: Área de perigo concentrada com telégrafo visual.
- `landmark_zone`: Ponto focal contendo a estrutura principal da sala.
- `exit_zone`: Portal/porta de saída em posição de destaque.

## B. Clusters Semânticos de Ambientação
Elementos não são espalhados aleatoriamente tile por tile (efeito ruído/confete). Eles são agrupados em clusters com temática coerente:
- **RUBBLE_CLUSTER:** 2 a 4 pedras/destroços próximos a paredes danificadas.
- **CRYSTAL_CLUSTER:** Formações cristalinas que brotam de fissuras ou cantos.
- **ENERGY_CLUSTER:** Linhas de condução, circuitos ou runas de dados no chão.
- **TECH_CLUSTER:** Terminais, cabos e maquinário conectados.
- **HAZARD_CLUSTER:** Poças de lava, placas de gelo fraturadas ou condutores elétricos desencapados.
- **STRUCTURE_CLUSTER:** Pilares duplos ou ruínas arquitetônicas.

## C. Orçamento Ambiental (Environment Budget)
Cada sala possui uma pontuação máxima de preenchimento para evitar poluição visual:
- Small Room: Budget = 8
- Medium Room: Budget = 15
- Large Room: Budget = 25
- Arena / Boss: Budget = 35

### Custos:
- Decoração de chão sutil: 1 pt
- Prop médio (pedra, barril, cristal): 2 pts
- Prop grande / obstáculo: 4 pts
- Landmark temático: 7 pts

## D. Variações de Piso (Floor Variations)
- **Base Dominante (80% a 88%):** Lajes consistentes e limpas da mesma família visual.
- **Variações em Manchas (10% a 15%):** Rachaduras ou texturas secundárias em manchas naturais contíguas (2 a 4 tiles vizinhos).
- **Acentos Decorativos Raros (2% a 4%):** Símbolos ou circuitos sutis próximos a estruturas.
- **Repetition Cooldown:** Evitar que o mesmo sprite idêntico se repita em tiles adjacentes se houver variantes disponíveis.

---

# 5. Arquétipos de Sala (12 Variantes Topológicas)

1. `ARENA`: Ampla com circulação livre para grandes batalhas.
2. `CORRIDOR`: Conexão estreita com chokepoints e emboscadas.
3. `CROSS`: Cruzamento ortogonal com 4 quadrantes táticos.
4. `L_SHAPE`: Formato em L com curva cega e recesso.
5. `T_SHAPE`: Bifurcação em T com alcovas laterais.
6. `OPEN`: Espaço contínuo com ilhas de cobertura.
7. `COMPACT`: Sala densa de combate rápido e tenso.
8. `MULTI_ROOM`: Câmaras interconectadas por passagens curtas.
9. `ASYMMETRIC`: Geometria orgânica irregular.
10. `WINDING`: Corredor sinuoso com coberturas alternadas.
11. `CHOKEPOINT`: Passagens estreitas entre duas áreas maiores.
12. `CENTRAL_ARENA`: Sala com grande estrutura/ilha no centro forçando movimentação circular.

---

# 6. Preservação Absoluta do Gameplay e Safe Spawns

## COMBAT_NAVIGATION_MASK
Antes de posicionar qualquer prop ou obstáculo físico:
- Traçar uma máscara inviolável de navegação abrangendo:
  - Raio de 3 tiles ao redor do spawn do player;
  - Raio de 3 tiles ao redor da porta de saída;
  - Rota principal direta do spawn até a saída (verificada via BFS);
  - Raio de 2 tiles ao redor do spawn de cada inimigo.
- Nenhum prop impeditivo ou hazard letal pode nascer dentro da máscara.

## Validação BFS Contínua
Após a escavação da geometria e após a colocação de obstáculos, rodar BFS:
- `findReachableFloorTiles`: O número de tiles alcançáveis a partir do spawn deve ser `>= 25`.
- `exit` deve ser 100% alcançável. Se falhar, regenerar deterministicamente com nova semente.

---

# 7. Hierarquia de Camadas (Render Depth Hierarchy)

Para eliminar definitivamente sobreposição de sprites (personagem sob o chão ou atrás de paredes):
```text
BACKGROUND (0)
-> FLOOR (1)
-> FLOOR_DECORATION (2)
-> FLOOR_HAZARD (3)
-> SPAWN_RING (4)
-> LOW_PROPS / SHADOWS (5-8)
-> CHARACTERS / ENEMIES / CHESTS (10)
-> ENTITIES_OVERLAY: Healthbars, Prompts, Badges (11)
-> WALL_BASE (2)
-> WALL_FOREGROUND / OVERHEAD RIMS (15)
-> PROJECTILES (22)
-> VFX / SLASHES / EXPLOSIONS (25)
-> FLOATING_TEXT / DAMAGE NUMBERS (30)
-> HUD / UI (40)
```
