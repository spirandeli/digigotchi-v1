---
name: digimon-sprite-analysis
description: Especializada em análise visual assistida por visão computacional, classificação semântica de ações, detecção de grids/spritesheets, separação de efeitos/projéteis, recorte não destrutivo, padronização de container e auditoria de sprites de Digimon para o Roguelike e Tamagotchi.
---

# digimon-sprite-analysis

Esta skill define o protocolo rigoroso e reproduzível de **Engenharia Reversa de Assets, Visão Computacional Assistida, Inspeção Visual, Classificação Semântica, Recorte e Auditoria de Sprites** para os Digimons do projeto Digigotchi (Roguelike Top-Down Phaser + Tamagotchi Virtual Pet).

---

## 1. Objetivo da Skill

A skill é responsável por:
1. **Localizar e inventariar** todos os assets visuais brutos e derivados de personagens em `public/sprites/`.
2. **Identificar a natureza de cada arquivo**: frame individual, spritesheet regular, spritesheet irregular, efeito visual isolado (VFX), projétil ou metadado/anotação.
3. **Analisar visualmente** cada imagem (frame por frame ou célula por célula) determinando pose, silhueta, direção, elementos acoplados e dinâmica temporal.
4. **Classificar semânticamente as ações** segundo o contrato canônico do projeto (`CANONICAL_ACTION_SET`).
5. **Detectar e decompor sequências complexas de ataque** em: preparação corporal, liberação, projétil descolado e efeitos de impacto.
6. **Determinar grids e regiões desconectadas** em spritesheets sem supor dimensões cegas.
7. **Extrair frames individuais** com preservação estrita de pixel art, integridade de canal Alpha e sem clipping acidental.
8. **Padronizar containers** (ex: canvas 96x96 com baseline e ancoragem corporal consistentes) prevenindo jitter visual em runtime.
9. **Eliminar resíduos**: frames vazios, duplicados desnecessários ou fragmentos cortados de frames vizinhos.
10. **Gerar inventários de proveniência rastreável** (mapeamento célula/imagem de origem $\rightarrow$ frame extraído).
11. **Produzir manifests estruturados** e relatórios de completude (`COMPLETE`, `PARTIAL`, `MISSING`, `NEEDS_MANUAL_REVIEW`).

---

## 2. Princípio Fundamental de Inspeção Visual

> **O NOME DO ARQUIVO É APENAS UMA EVIDÊNCIA AUXILIAR. A CLASSIFICAÇÃO FINAL É DETERMINADA PELA INSPEÇÃO VISUAL.**

Nenhum arquivo nomeado `special_attack.png`, `walk.png` ou `idle_01.png` pode ser classificado ou integrado com base puramente em seu nome textual. A classificação final deve sintetizar:
1. **Inspeção visual direta** da silhueta, anatomia e pose.
2. **Sequência visual temporal** (continuidade de movimento entre quadros vizinhos).
3. **Contexto visual dos frames vizinhos** na mesma pasta ou folha.
4. **Metadados e evidências auxiliares**: nome do arquivo, nome da folha de origem, anotações de layout.
5. **Comparação semântica** com outras ações do mesmo personagem (para não confundir básico 1 com especial).
6. **Contrato de referência do Veemon** (Golden Reference).
7. **Consistência geométrica** (proporções anatômicas, escala relativa e contato com o solo).

---

## 3. Hierarquia de Confiança (Confidence Scoring)

Toda classificação de arquivo ou frame deve carregar um nível de confiança explícito e auditável:

| Nível | Critério de Classificação | Ação do Pipeline |
|---|---|---|
| **CONFIRMED** | Ação verificada visualmente frame a frame, com sequência temporal completa coerente com a anatomia e mecânica do jogo. | Liberado para manifest e runtime. |
| **HIGH** | Ação visualmente clara (ex: pose de respiração ou golpe nítido), porém com pequenas variações de direção ou contagem de frames. | Liberado com documentação. |
| **MEDIUM** | Há fortes indícios visuais da ação, mas existe ambiguidade (ex: golpe corporal que pode ser soco ou cabeçada secundária). | Exige validação contextual com o código. |
| **LOW** | Pose isolada sem contexto sequencial suficiente para confirmar se é hit, transição de walk ou animação de derrota. | Enviado para quarentena / `_review`. |
| **UNKNOWN** | Visual atípico, arte conceitual, frame cortado pela metade ou elemento irreconhecível. | Mantido intacto; não entra no manifest. |
| **NEEDS_MANUAL_REVIEW**| Spritesheet com grid irregular, personagens sobrepostos, ou colisão semântica irresolúvel por heurística. | Bloqueia automação; documentado em `decisions.md`. |

---

## 4. Protocolo de Análise de Sprite Individual

Para cada imagem analisada, audite os seguintes parâmetros:
- **Dimensões e Bounding Box**: Largura, altura, caixa delimitadora exata dos pixels não transparentes ($\alpha > 10$).
- **Integridade de Alpha**: Verificar se o fundo é 100% transparente ou se há ruído de recorte (halos, fundo cinza/preto residual).
- **Conteúdo Anatômico**: Personagem único, partes cortadas (cabeça, cauda, pés) ou presença de elementos de outro personagem.
- **Direção Nativa**: `down` (frontal), `up` (costas), `left` (perfil esquerdo), `right` (perfil direito) ou isométrica/diagonal.
- **Pose e Apoio**: Posição do pé mais baixo ($y_{max}$ do bounding box) em relação à base do canvas.
- **Artefatos Integrados**: Presença de armas empunhadas, auras de energia, fumaça ou projéteis ainda acoplados ao corpo.

---

## 5. Protocolo de Detecção de Spritesheets

Uma imagem é formalmente candidata a spritesheet quando atende a um ou mais critérios:
1. **Critério Dimensional**: Largura $\ge 192\text{px}$ ou Altura $\ge 192\text{px}$ (ou área significativamente superior a um único frame).
2. **Critério de Repetição Estrutural**: Múltiplas ilhas de opacidade isoladas ou repetição nítida da silhueta do personagem em poses alternadas.
3. **Padrão de Grade (Grid)**: Arranjo em linhas e colunas espaçadas regular ou semirregularmente.
4. **Indicação Textual / Nome de Origem**: `sheet`, `spritesheet`, `anim`, `strip`, `attack`, `walk`, `actions`.

---

## 6. Descoberta de Grid e Segmentação Regular

Ao processar uma spritesheet:
1. **Nunca assumir dimensões cegas** ($32\times 32$, $64\times 64$, $96\times 96$).
2. **Projeção de Densidade de Alpha**:
   - Calcular projeção horizontal ($\sum \alpha(x, y)$ por linha) e vertical ($\sum \alpha(x, y)$ por coluna).
   - Identificar faixas contínuas de transparência total ($\alpha = 0$) que separam linhas e colunas.
3. **Candidatos de Célula**:
   - Testar divisores inteiros das dimensões da imagem ($C \times R$, ex: $4\times 2$, $8\times 1$, $6\times 4$).
   - Verificar se as caixas delimitadoras de cada célula contêm exatamente um personagem centrado sem cortar bordas.
4. **Validação de Sobreposição**: Rejeitar o grid caso qualquer pixel visível do personagem ultrapasse o limite da célula candidata.

---

## 7. Segmentação de Spritesheets Irregulares

Para folhas com layout livre, montagens compostas ou poses de tamanhos variáveis:
1. **Componentes Conectados (Connected Component Labeling)**:
   - Agrupar pixels contíguos com canal Alpha $> 0$.
   - Mesclar componentes que compartilham proximidade espacial imediata (ex: corpo do Digimon + faísca a 2 pixels de distância).
2. **Separação de Projéteis / Efeitos Flutuantes**:
   - Componentes que se distanciam progressivamente do centro de massa do personagem através dos frames devem ser segmentados como entidades separadas (`projectile` ou `effect`).
3. **Bounding Boxes Isoladas**: Criar retângulos de corte individuais baseados na extensão real de cada componente validado.
4. **Quarentena Preventiva**: Caso haja sobreposição física de dois personagens sem margem de separação, marcar como `NEEDS_MANUAL_REVIEW` e não recortar automaticamente.

---

## 8. Recorte Não Destrutivo e Padronização de Container

Ao extrair os frames finais de uma folha:
1. **Regra de Unicidade**: Cada frame final gerado deve conter estritamente **1 personagem**, **1 efeito** ou **1 projétil**. Jamais agrupar dois momentos da animação no mesmo arquivo.
2. **Preservação Absoluta do Pixel Art**:
   - É estritamente PROIBIDO redesenhar, suavizar, filtrar bilinearmente, interpolar ou alterar a paleta de cores.
   - É estritamente PROIBIDO gerar frames sintéticos por IA ou inventar partes inexistentes.
3. **Normalização do Canvas**:
   - Adotar o container padrão do projeto: **$96 \times 96$ pixels**.
   - Ancorar o personagem de forma que o ponto mais baixo de contato com o solo fique alinhado na baseline padrão: **$y = 90$** (deixando margem inferior de $6\text{px}$).
   - Centralizar horizontalmente o personagem: $x_{offset} = \lfloor(96 - \text{width}_{bbox}) / 2\rfloor$.
   - Manter a escala física $1:1$ do pixel art (sem upscale destrutivo; escala de cena é tratada na engine).

---

## 9. Heurísticas Semânticas por Ação

### A. Ações de Movimento e Postura (Roguelike + Tamagotchi)
- **`idle`**: Ciclo curto (geralmente 4 a 10 frames). Personagem com os pés fixos, micro-movimentos de respiração, balanço de orelhas/cauda ou piscar de olhos.
- **`walk`**: Ciclo contínuo de passadas alternadas. Distinguir direções:
  - `walk_down`: Frente/visão frontal com pés alternando para baixo.
  - `walk_up`: Costas com pés alternando para cima.
  - `walk_left` / `walk_right`: Perfil lateral. Se houver apenas uma direção nativa, registrar capacidade de flip horizontal (`can_flip: true`).
- **`run` / `dash`**: Passada alongada, corpo inclinado na direção do deslocamento, linhas de velocidade ou translação rápida.

### B. Ações de Combate (Roguelike)
- **`attack_basic_1`**: Golpe físico direto de curto alcance (soco, garra, cabeçada frontal, mordida). Arco de movimento rápido: preparação rápida $\rightarrow$ extensão máxima $\rightarrow$ recuperação.
- **`attack_basic_2`**: Ataque secundário ou à distância (disparo de energia menor, sopro rápido de projétil, golpe com efeito). Identificar se há disparo de projétil acoplado.
- **`attack_special`**: Movimento de alta intensidade (carga prolongada, explosão de aura, raio gigante, invocação de chamas maciças).
- **`hit`**: Reação a dano. O corpo recua subitamente, inclinação para trás, expressão de choque ou recuo rápido em 1 a 3 frames.
- **`death`**: Sequência terminal não cíclica. O personagem perde o equilíbrio, desaba no chão ou se desintegra em dados digitais.

### C. Projéteis e Efeitos Desacoplados
- **`projectile`**: Elemento cinético móvel que viaja de forma independente (bola de fogo, flecha de energia, míssil, laser contínuo).
- **`effects`**: Auras de carga nos pés/mãos (`effects_attack`), clarões no ponto de liberação ou explosões de impacto (`effects_hit`).

### D. Ações do Virtual Pet (Tamagotchi)
- **`eat`**: Personagem ingerindo carne, mastigando ou abrindo a boca ritmicamente em frente a comida.
- **`sleep` / `wake`**: Olhos fechados, bolha de sono ("Zzz"), corpo encolhido deitado no chão; sequência de despertar espreguiçando.
- **`play`**: Movimento lúdico, pulos de alegria, aceno com os braços, interação com bola.
- **`clean` / `shower`**: Tomando banho, esfregando o corpo, enxaguando-se ou interagindo com patinho de borracha / esponja.
- **`heal`**: Curativo na cabeça, termômetro, pose abatida recebendo injeção ou medicamento.
- **`evolution`**: Brilho digital, silhueta envolta por feixes de luz ascendentes ou transição de dados.

---

## 10. Detecção de Duplicados e Frames Vazios

1. **Frames Vazios**: Imagens com $100\%$ dos pixels transparentes ou com menos de 15 pixels visíveis isolados (ruído de corte) devem ser rejeitadas como inválidas (`INVALID`).
2. **Detecção de Duplicados**:
   - Calcular hash criptográfico (SHA-256) dos pixels RGBA brutos.
   - Comparar com outros frames da mesma pasta. Se os hashes forem idênticos, registrar se é um loop intencional ou duplicação acidental de arquivo.
3. **Variações Sutis**: Pequenas diferenças de respiração não são duplicados; são variações intencionais da animação.

---

## 11. Preservação de Proveniência e Mapeamento de Origem

Cada frame extraído ou catalogado deve possuir registro inalterável de sua origem:
```json
{
  "frame": "public/sprites/agumon/attacks/basic_1/attacks_basic_1_01.png",
  "provenance": {
    "sourceFile": "public/sprites/agumon/spritesheets/agumon.png",
    "sourceType": "spritesheet",
    "cellIndex": 4,
    "row": 0,
    "column": 4,
    "sourceBBox": [128, 0, 160, 32],
    "extractionMethod": "grid_segmentation"
  }
}
```

---

## 12. Regra de Ouro: Veemon Intocado (Golden Reference)

O Veemon (`public/sprites/veemon/`) é a **implementação de referência sagrada**:
- **É expressamente PROIBIDO**: modificar, mover, renomear, recortar, substituir ou apagar qualquer arquivo ou pasta dentro de `public/sprites/veemon/`.
- **Uso exclusivo**: Consulta de estrutura de pastas, convenção de nomes de arquivos, parâmetros de manifest (`origin`, `hitbox`, `scale`) e chaves de animação do Phaser.
