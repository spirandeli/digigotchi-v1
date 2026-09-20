# AUDITORIA COMPLETA DO SISTEMA DE MAPAS — CAMINHO DIGITAL

**Data da Auditoria:** 20/09/2026  
**Ambiente:** Digigotchi — Caminho Digital (Roguelike 2D Top-Down / Phaser 3 + React + TypeScript)  
**Documento de Referência:** Solicitação de Auditoria Completa e Expansão para 300 Níveis

---

## 1. SISTEMA ATUAL (COMO FUNCIONA HOJE)

O sistema de geração procedural e renderização do Caminho Digital está centralizado em dois módulos principais:
1. `src/lib/digital-path/map/procedural-map.ts` (geração de dados, topologia de grid, posições lógicas e BFS).
2. `src/lib/digital-path/runtime/DigitalPathGame.ts` (renderização no Phaser 3, autotiling, câmera, entidades, combate e depth).
3. Auxiliares: `src/lib/digital-path/map/map-themes.ts` (definição de sprites por tema), `rng.ts` (PRNG LCG determinístico) e `hazards.ts` (definição de armadilhas/efeitos de área).

### 1.1 Fluxo de Geração Atual
1. **Entrada de Nível:** Recebe `roomNumber` (atualmente limitado de 1 a 50 em `TOTAL_ROOMS = 50`).
2. **Resolução de Bioma e Tipo:**
   - Bioma resolvido por faixas fixas de 10 níveis: 1-10 (`digital`), 11-20 (`fire`), 21-30 (`ice`), 31-40 (`storm`), 41-50 (`dark`).
   - Tipo resolvido por listas estáticas:
     - Boss: `[10, 20, 30, 40, 50]`
     - Treasure: `[5, 11, 15, 21, 25, 31, 35, 41, 45]`
     - Rest: `[8, 28]`
     - Event: `[18, 38]`
     - Shop: `[24, 44]`
     - Elite: `[7, 17, 27, 37, 47]`
     - Combat: todas as demais.
3. **Determinação de Dimensões e Formato:**
   - Tamanhos via `MAP_CONFIG.roomSizeCategories`: `small` (20x14), `medium` (28x18), `large` (34x22), `arena` (36x24).
   - Formatos declarados: `rectangle`, `L`, `T`, `U`, `cross`.
4. **Carving da Geometria:**
   - A matriz de tiles é inicializada com `wall`.
   - `spawn` é fixado em `x = 3, y = Math.floor(height / 2)`.
   - `exit` é fixado em `x = width - 4, y = Math.floor(height / 2)`.
   - O formato da sala é escavado como `floor`.
   - **Ponto crítico:** Imediatamente após escavar a forma, a função `carveCorridor(tiles, spawn.x, spawn.y, exit.x, exit.y, corridorWidth, width, height)` é chamada, cavando um corredor horizontal contínuo de ponta a ponta na coordenada `height / 2`.
   - Se `hasLoop` (35% de chance), são cavados dois desvios em arco (superior e inferior).
   - Se `hasDeadEnd` (25% de chance), um pequeno corredor vertical de 3x3 é cavado.
   - Obstáculos: adiciona de 2 a 6 tiles isolados aleatórios convertidos de `floor` para `wall`.
5. **Validação:**
   - Executa `isPathConnected` usando BFS apenas entre `spawn` e `exit`.
   - Se falhar, tenta até 15 vezes; se todas falharem, cria `createSafeFallbackRoom` (um retângulo básico).
6. **População de Entidades:**
   - Inimigos gerados por tentativa e erro (`rng.int(3, width - 4)`), conferindo se é chão e distâncias mínimas (`dist(spawn) >= 5`, `dist(exit) >= 2.5`).
   - Props (baús, terminais) são posicionados no centro exato: `Math.floor(width / 2), Math.floor(height / 2)`.
7. **Renderização Phaser (`DigitalPathGame.ts`):**
   - Autotiling por inspeção dos vizinhos cardinais imediatos (cima, baixo, esquerda, direita).
   - O chão é desenhado com 80%+ de base dominante (`floorNormal`), 10-12% de variação em clusters (`floorVariation`) e 2-3% de decorativo perto de paredes (`floorDecor`).
   - Parede frontal voltada para o sul ganha um friso superior (rim neon) com depth de foreground (`RENDER_DEPTH.WALL_FOREGROUND = 15`).

---

## 2. RECURSOS EXISTENTES

* **Gerador Procedural com PRNG:** `RunRNG` (Linear Congruential Generator com seed composta por `seed ^ (index * 7919) ^ (floor * 3571)`).
* **Camadas Visuais e Render Depth:** Hierarquia estrita de 12 camadas (`RENDER_DEPTH`) garantindo que o jogador e inimigos (depth 10) nunca fiquem atrás do chão (depth 1) ou de efeitos de piso (depth 2-4).
* **Autotiling Básico:** Reconhece parede de topo (`wall_top`), rodapé (`wall_bottom`), parede esquerda (`wall_left`), parede direita (`wall_right`), horizontal (`wall_h`) e vertical (`wall_v`).
* **Spawn Seguro com Fallback:** `findValidSpawnTile` realiza busca em espiral BFS caso o tile inicial esteja obstruído.
* **Validação de Conectividade BFS:** `isPathConnected` impede mapas sem rota entre início e saída.
* **Filtro Grayscale em Tempo Real:** Shader de GPU `sprite.preFX.addColorMatrix().grayscale(1)` para converter sprites de Digimons em inimigos monocromáticos sem alterar os arquivos PNG.
* **Estrutura de Temas:** `MapThemeConfig` desacoplada das espécies de Digimon, suportando troca dinâmica de conjunto de tiles.
* **Props Interativos e Modais:** Baús com animação aberto/fechado, Terminais de Evento com escolhas narrativas, Nó de Descanso com cura/buff e Loja Digital.

---

## 3. RECURSOS INUTILIZADOS

1. **Grafo de Masmorra (`DungeonGraph` e `RoomEdge`):**
   - O gerador cria nós e arestas em `room.graph`, calculando loops e dead-ends, porém esse objeto é completamente ignorado no frontend; não há minimapa, visualizador de topologia ou uso para navegação.
2. **Assets de Bordas Externas (`public/sprites/maps/lighting/borders/`):**
   - Existem 18 sprites (`borders/bottom`, `borders/top`, `borders/left`, `borders/right`, `borders/horizontal`, `borders/vertical`) que nunca são carregados nem referenciados no tema ou no renderizador.
3. **Assets de Ambiente e Ruínas (`public/sprites/maps/lighting/environment/`):**
   - 6 sprites no disco (`environment/ambient/`, `elemental/`, `rocks/`, `ruins/`) não são mapeados nem spawnados como obstáculos ou decorações.
4. **Assets de Paredes Especiais (`walls/special/`):**
   - 10 sprites de paredes tecnológicas existem no disco, mas apenas uma pequena fração é usada, sem regras procedurais de colocação em nichos ou painéis.
5. **Assets de Portas (`doors/vertical/`):**
   - Dois sprites de portas (`sprite_0038`, `sprite_0042`) estão configurados no tema, mas o jogo usa um círculo desenhado via `graphics.strokeCircle` como saída da sala em vez dos sprites de porta.
6. **Biomas `fire`, `ice` e `tech`:**
   - Em `map-themes.ts`, esses biomas estão com `enabled: false` e utilizam fallbacks ou tilesets incompletos (apenas 2 ou 3 PNGs recortados cada), mantendo as imagens brutas (`ChatGPT Image...png`) sem uso.
7. **Sistema de Hazards em `hazards.ts`:**
   - Contém definições completas de `MapHazard` (lava e raio com dano, raio de alcance e cooldown), mas apenas um único hazard é colocado via código imperativo nas coordenadas do centro, sem integração com a geração do mapa.

---

## 4. PROBLEMAS ENCONTRADOS E BUGS IDENTIFICADOS

### 4.1 Corredor Central Destrói a Topologia dos Formatos
Mesmo quando o gerador seleciona o formato `L`, `T`, `U` ou `cross`, a função `carveCorridor` cava uma linha reta entre o spawn e a saída (ambos na altura central `height / 2`). Isso fura a parede divisória e converte qualquer formato complexo em uma sala retangular aberta com "buracos" ou cantos mortos, eliminando a sensação de labirinto ou arena diferenciada.

### 4.2 Obstáculos Gerados de Forma Aleatória e Feia
O gerador escolhe de 2 a 6 coordenadas aleatórias e define `tiles[oy][ox] = "wall"`. Isso gera bloquinhos de parede 1x1 soltos no meio do chão. No autotiler, esses bloquinhos recebem um topo neon e textura de parede horizontal solta, parecendo "glitches" flutuantes em vez de pilares ou obstáculos reais.

### 4.3 Spawn de Baús / Props em Paredes
Os props em `generateSingleRoom` são posicionados fixos em `(width / 2, height / 2)`. Em salas com formato `U`, o centro geométrico é parede. Em outras salas, um obstáculo aleatório pode ser gerado nessa mesma coordenada, fazendo o baú ou terminal spawnar dentro de uma parede sólida.

### 4.4 Inimigos e Props Fora da Rota Conectada
O teste BFS `isPathConnected` valida **apenas** se o jogador consegue ir do spawn até a saída. Ele **não** valida se:
- O jogador consegue alcançar o baú.
- O jogador consegue alcançar todos os inimigos.
Se um inimigo ou baú spawnar em um bolsão isolado ou atrás de obstáculos, o jogador fica impossibilitado de concluir a sala caso a saída exija derrotar todos os inimigos.

### 4.5 Causa Técnica dos Inimigos Voltando a Ficar Coloridos
Identificamos a causa exata no código de `DigitalPathGame.ts`:
1. **No Hit Flash (`DigitalPathGame.ts:2055`):** Ao tomar dano, o inimigo recebe um flash branco (`setTintFill(0xffffff)`). Após 90ms, o código executa `enemy.sprite.clearTint()`. Em renderizadores sem `preFX` (ou fallback canvas), o `clearTint()` apaga o neutral gray tint (`0xaaaaaa`) e restaura a imagem original 100% colorida do Digimon.
2. **Reaplicação de Tints Coloridos (`DigitalPathGame.ts:2057-2065`):** Logo após `clearTint()`, o código aplica explicitamente tints coloridos:
   - `0xff2222` (vermelho) para inimigos em estado de fúria.
   - `0xff6666` (rosa/vermelho) para Kuwagamon, Meramon, Seadramon e Etemon.
3. **Avisos de Ataque (`DigitalPathGame.ts:2674` e `2700`):** Aplica `0xffff00` (amarelo) no telegraph e `0xff2222` (vermelho) no golpe, colorindo o sprite.

### 4.6 Hardcoding de 50 Níveis e Falta de Suporte a 300+ Níveis
- A constante `TOTAL_ROOMS` está cravada em 50.
- `BOSS_ROOMS = [10, 20, 30, 40, 50]`.
- `CHEST_ROOMS = [5, 11, 15, 21, 25, 31, 35, 41, 45]`.
- As salas intermediárias (rest, event, shop, elite) usam números estáticos (`roomNumber === 8 || roomNumber === 28`, etc.).
- Não há suporte na arquitetura para regras modulares (ex: `level % 10 === 0` para Boss e `level % 10 === 5` para Mini Boss).
- Mini Bosses sequer existem como tipo de sala: o nível 5 é classificado apenas como `treasure` com 1 baú e 1-2 inimigos normais.

---

## 5. POR QUE OS MAPAS PARECEM BÁSICOS (CAUSA TÉCNICA)

1. **Topologia Efetiva Idêntica:** Por causa do `carveCorridor` central de spawn a exit, o fluxo de movimento é sempre o mesmo: andar em linha reta da esquerda para a direita.
2. **Falta de Arquétipos Táticos de Sala:** Não há distinção arquitetural entre uma sala aberta, um corredor de combate estreito, uma arena com pilares de cobertura, uma câmara com ilha central ou uma sala de emboscada.
3. **Posicionamento Ingênuo de Inimigos:** Inimigos são posicionados via `Math.random()` disperso, sem formações (clusters, patrulhas, sentinelas de flanco, guardiões de passagem ou emboscadas).
4. **Ausência de Obstáculos Coerentes:** Não há grupos de obstáculos que dividam linhas de tiro ou criem labirintos interessantes.
5. **Chão Monótono:** Apesar do sistema de clusters de variação funcionar, a falta de hazards de piso (buracos, áreas elétricas, fendas) no próprio grid deixa o piso visualmente plano e sem risco tático.

---

## 6. PROGRESSÃO ATUAL

* **Nível Máximo:** 50 salas.
* **Resolução de Salas Especiais:**
  - Boss: Lista estática `[10, 20, 30, 40, 50]`.
  - Baús: Lista estática `[5, 11, 15, 21, 25, 31, 35, 41, 45]`.
  - Rest/Event/Shop/Elite: Condicionais `if (roomNumber === X)`.
* **Escala de Dificuldade dos Inimigos:**
  - `calculateEnemyStats` aplica multiplicador linear com base no `enemyLevel` (offset de até 50).
  - Bosses recebem `1 + offset * 0.08` de HP. Para 300 níveis sem ajuste, isso resultaria em `1 + 299 * 0.08 = 24.92x`, transformando bosses de níveis altos em esponjas de dano puras se não houver faixas de macroprogressão estruturadas.

---

## 7. BOSS SYSTEM E MINI BOSS SYSTEM

### 7.1 Boss System Atual
* Executado nos andares 10, 20, 30, 40, 50.
* Bosses são instanciados a partir de `BOSS_DEFINITIONS` em `bosses.ts`:
  - Andar 10: Kuwagamon da Fenda (`digital`)
  - Andar 20: Meramon Incandescente (`fire`)
  - Andar 30: Seadramon Glacial (`ice`)
  - Andar 40: MetalEtemon Tirano Metálico (`storm`)
  - Andar 50: BlackWarGreymon Chefe Final (`dark`)
* Dimensões de arena: `arena` (36x24).
* Bosses possuem 2 fases configuradas em `bosses.ts` (transição ao atingir 50% ou 45% de HP).

### 7.2 Mini Boss System Atual
* **INEXISTENTE.**
* O andar 5 é tratado simplesmente como sala de baú (`treasure`), com 1 ou 2 inimigos genéricos de nível baixo.
* Não há classe, template de atributos ou lógica de arena para Mini Boss.

---

## 8. RECURSOS POSSÍVEIS E MELHORIAS VIÁVEIS

1. **Arquitetura Matemática de 300+ Níveis:**
   - Centralizar constantes: `MAX_LEVEL = 300`, `BOSS_INTERVAL = 10`, `MINIBOSS_INTERVAL = 10`, `MINIBOSS_OFFSET = 5`.
   - Prioridade estrita do Progression Resolver:
     ```typescript
     if (level % BOSS_INTERVAL === 0) -> "boss"
     else if (level % MINIBOSS_INTERVAL === MINIBOSS_OFFSET) -> "miniboss"
     else -> ProceduralWeightedArchetype (combat, elite, treasure, event, trap, rest, arena, ambush, etc.)
     ```
2. **Mini Boss Dedicado nos Andares 5, 15, 25, 35, ... 295 (30 no total):**
   - Arena intermediária apropriada.
   - Status balanceados (intermediário entre Elite e Boss).
   - Recompensa garantida de vitória.
3. **Novos Arquétipos e Topologias de Sala Reais:**
   - `OPEN_ARENA`, `PILLARS_ARENA` (pilares 2x2 regulares que criam cobertura para projéteis), `DIVIDED_CHAMBERS` (duas câmaras conectadas por passagem estreita), `CENTRAL_BLOCK` (ilha ou monumento no meio que força circulação), `AMBUSH_CORRIDOR` (corredor tenso com fechamento temporário).
4. **Validação Global de Navegabilidade (BFS Multi-Alvo):**
   - Garantir que `spawn` alcance: `exit`, `all props` e `all enemies`.
   - Se qualquer inimigo ou prop for inacessível, reposicionar ou regenerar a sala.
5. **Correção Definitiva do Preto e Branco nos Inimigos:**
   - Garantir que `setTint` não quebre o efeito monocromático.
   - Usar escala de cinza consistente em GPU com modulação de luminosidade para hits/telegraphs (ex: brilho branco ou contraste) em vez de tints coloridos.
6. **Memória Anti-Repetição:**
   - Manter histórico das últimas 3 salas geradas para impedir repetição do mesmo formato ou arquétipo consecutivamente.

---

## 9. MATRIZ DE MELHORIAS

| Sistema | Existe? | Funciona? | Impacto | Complexidade | Recomendação |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Room Shapes** | Sim | Parcial (furo no meio) | Alto | Média | **Refatorar:** Ajustar carving para não furar a topologia central; adicionar pilares e divisões reais. |
| **Room Archetypes** | Parcial | Não (tudo é combat genérico) | Alto | Média | **Implementar:** Criar enum e regras para Arena, Pilares, Câmaras Duplas, Emboscada, Tesouro. |
| **Obstacles** | Parcial | Não (1x1 flutuantes) | Alto | Média | **Refatorar:** Substituir blocos 1x1 por estruturas sólidas 2x2, pilares e barreiras de cobertura. |
| **Hazards** | Parcial | Parcial (apenas 1 central) | Médio | Média | **Expandir:** Posicionar poças/zonas de risco coerentes com o bioma e fora da área segura de spawn. |
| **Mini Boss Rooms** | Não | Não | Alto | Média | **Implementar:** Regra `level % 10 === 5` (30 minibosses em 300 andares) com arena e stats dedicados. |
| **Boss Rooms** | Sim | Sim (até 50) | Alto | Baixa | **Expandir:** Regra `level % 10 === 0` (30 bosses em 300 andares) com escala matemática por ciclo. |
| **Secret Rooms / Bolsões** | Parcial | Parcial (dead-ends básicos) | Médio | Baixa | **Melhorar:** Bolsões laterais com baús ou nós bônus devidamente validados por BFS. |
| **Enemy Formations** | Não | Não (aleatório puro) | Alto | Média | **Implementar:** Formações táticas (pinça, sentinelas de cobertura, patrulha, clusters). |
| **Autotiling** | Sim | Sim | Alto | Baixa | **Preservar & Expandir:** Manter regras de vizinhos e rim neon, adicionar mapeamento para quinas e pilares. |
| **Decorative Clusters** | Sim | Sim | Médio | Baixa | **Preservar:** Manter clusters de 2-3 células para quebra de monotonia no piso. |
| **Seeds (Determinismo)** | Sim | Sim | Alto | Baixa | **Preservar:** `RunRNG` já suporta seeds reproduzíveis por andar (`seed ^ floor`). |
| **Map Debugger** | Parcial | Parcial (apenas botões de HUD) | Médio | Baixa | **Implementar:** Painel de overlay com Level, Tipo, Bioma, Dimensões, Inimigos e Seed. |
| **Navigation Validation** | Parcial | Parcial (apenas start->exit) | Crítico | Baixa | **Expandir:** Validar conectividade completa: start -> exit, start -> props, start -> enemies. |
| **Map Stress Test** | Não | Não | Alto | Baixa | **Implementar:** Script simulando 300 a 3000 salas procedurais sem falhas ou crashes. |
| **300 Level Simulation** | Não | Não | Crítico | Baixa | **Implementar:** Teste automatizado validando 30 Bosses e 30 Mini Bosses de 1 a 300. |

---

## 10. LEVANTAMENTO DE ASSETS NECESSÁRIOS (REGISTRO SEM ALTERAÇÃO DE PNGS)

Em estrito cumprimento à regra de **NÃO ALTERAR, NÃO EDITAR E NÃO GERAR PNGS AUTOMATICAMENTE**, registramos os assets visuais recomendados para adição futura pelo usuário:

```text
[ASSET NECESSÁRIO 01]
- Categoria: maps/lighting/corners
- Finalidade: Quinas côncavas e convexas (inner/outer corners) para conexão suave de paredes horizontais e verticais
- Caminho sugerido: public/sprites/maps/lighting/corners/
- Quantidade aproximada: 4 a 8 tiles (outer_nw, outer_ne, outer_sw, outer_se, inner_nw, etc.)
- Onde será utilizado: Renderizador Phaser de paredes (autotiling refinado)

[ASSET NECESSÁRIO 02]
- Categoria: maps/lighting/obstacles
- Finalidade: Pilares de pedra/tecnologia e caixotes com colisão sólida para arenas
- Caminho sugerido: public/sprites/maps/lighting/obstacles/
- Quantidade aproximada: 4 a 6 tiles (pillar_top, pillar_base, tech_crate, broken_terminal)
- Onde será utilizado: Arenas táticas de combate e cobertura contra projéteis

[ASSET NECESSÁRIO 03]
- Categoria: maps/lighting/hazards
- Finalidade: Tiles visuais de piso eletrificado, fenda de dados e espinhos de circuito
- Caminho sugerido: public/sprites/maps/lighting/hazards/
- Quantidade aproximada: 4 a 6 tiles
- Onde será utilizado: Zonas de perigo em salas de armadilha e andares avançados

[ASSET NECESSÁRIO 04]
- Categoria: maps/fire (Recorte e Padronização de Spritesheet)
- Finalidade: Paredes, portas e decorações do bioma Fenda Vulcânica
- Caminho sugerido: public/sprites/maps/fire/walls/, public/sprites/maps/fire/doors/
- Quantidade aproximada: 12 a 16 tiles (a partir do ChatGPT Image existente)
- Onde será utilizado: Ativação completa do tema 'fire' nos andares vulcânicos

[ASSET NECESSÁRIO 05]
- Categoria: maps/ice (Recorte e Padronização de Spritesheet)
- Finalidade: Paredes, quinas e portas do bioma Glaciar de Dados
- Caminho sugerido: public/sprites/maps/ice/walls/, public/sprites/maps/ice/doors/
- Quantidade aproximada: 12 a 16 tiles (a partir do ChatGPT Image existente)
- Onde será utilizado: Ativação completa do tema 'ice' nos andares glaciais

[ASSET NECESSÁRIO 06]
- Categoria: maps/tech (Recorte e Padronização de Spritesheet)
- Finalidade: Paredes de laboratório e painéis de dados
- Caminho sugerido: public/sprites/maps/tech/walls/
- Quantidade aproximada: 8 a 12 tiles (a partir do ChatGPT Image existente)
- Onde será utilizado: Ativação completa do tema 'tech' nos andares cibernéticos
```

---

## 11. ROADMAP DE IMPLEMENTAÇÃO

### BLOCO A — Correções Críticas
1. **Paredes e Autotiling:** Refatorar o autotiling e garantir que blocos de parede no interior não recebam rims inadequados.
2. **Validação Completa de Navegação:** BFS expandido para validar `spawn -> exit`, `spawn -> props` e `spawn -> enemies`.
3. **Spawn Seguro do Jogador e Props:** Área de respiro de 3x3 no spawn; reposicionar props para tiles de piso verificados (nunca dentro de paredes).
4. **Preto e Branco Confiável nos Inimigos:** Impedir que o hit flash ou avisos de ataque repintem o inimigo com cores saturadas.

### BLOCO B — Progressão Escalável (300 Níveis)
1. **Configuração Centralizada:** `MAX_LEVEL = 300`, `BOSS_INTERVAL = 10`, `MINIBOSS_OFFSET = 5`.
2. **Progression Resolver:** Implementar algoritmo prioritário:
   - `level % 10 === 0` -> Boss (30 andares).
   - `level % 10 === 5` -> Mini Boss (30 andares).
   - Demais -> Salas procedurais balanceadas por pesos.
3. **Macroprogressão em 6 Faixas:**
   - 1-50: Introdução e fundamentos.
   - 51-100: Introdução de elites e salas com pilares táticos.
   - 101-150: Aumento de densidade e formações em pinça.
   - 151-200: Arenas com hazards ambientais ativos.
   - 201-250: Composição mista de longo alcance e tanques.
   - 251-300: Clímax de sobrevivência com chefes intensos.
4. **Escala Balanceada de Dificuldade:** Curva suave sem transformar inimigos em esponjas de vida.

### BLOCO C — Diversidade Estrutural
1. **Novos Formatos e Geometrias:**
   - `OPEN_ARENA`: Amplo espaço circular/quadrado para combate móvel.
   - `PILLARS_ARENA`: 2 a 4 pilares simétricos estruturados (2x2 tiles) para quebrar linha de tiro.
   - `DIVIDED_CHAMBERS`: Duas salas conectadas por corredor curto.
   - `CENTRAL_ISLAND`: Estrutura decorativa central forçando circulação.
2. **Eliminação do Furo no Carving:** Carving respeita as paredes do formato escolhido.
3. **Memória Anti-Repetição:** Buffer das últimas 3 salas para evitar formatos e tipos consecutivos idênticos.

### BLOCO D — Gameplay Ambiental e Mini Bosses
1. **Sistema de Mini Bosses:** Criação da lógica de miniboss (HP, ataque e arena específicos para níveis terminados em 5).
2. **Obstáculos Sólidos Estruturados:** Troca dos blocos 1x1 aleatórios por estruturas de cobertura sólidas e bem definidas.
3. **Formações Inimigas Procedurais:**
   - `CLUSTER`: Inimigos agrupados protegendo um ponto.
   - `FLANK`: Atiradores nas bordas e corpo-a-corpo no centro.
   - `AMBUSH`: Inimigos nas laterais ativando com aproximação.

### BLOCO E — Variedade Visual e Decoração
1. **Integração de Props Decorativos Existentes:** Utilizar os sprites de ruínas e rochas existentes em `environment/` como decoração sem colisão nas bordas.
2. **Preservação dos Clusters de Chão:** Manter a regra de 80%+ base, 12% variação agrupada e 3% decorativo.

### BLOCO F — Ferramentas e Testes de Validação
1. **Teste Automatizado de 300 Níveis:** Validar deterministicamente os 300 andares, comprovando exatamente 30 Bosses e 30 Mini Bosses sem desvios.
2. **Stress Test Multi-Seed (3.000 Salas):** Simular milhares de salas via script Node.js e atestar 100% de conectividade BFS sem mapas impossíveis.
3. **Painel de Debug Opcional no Jogo:** Exibir sementes, ciclo, arquétipo e métricas da sala atual.
