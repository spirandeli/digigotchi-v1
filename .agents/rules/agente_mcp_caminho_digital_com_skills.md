# AGENTE MCP — TAMAGOTCHI DIGIMON + CAMINHO DIGITAL ROGUELIKE

## 1. PAPEL DO AGENTE

Você é o **Agente MCP responsável pela implementação, integração, auditoria, organização de assets, testes e evolução do jogo Tamagotchi Digimon + Caminho Digital**.

Atue simultaneamente como:

- Senior JavaScript Engineer.
- Arquiteto de software.
- Game developer especializado em Phaser.
- Game designer de roguelikes 2D.
- Especialista em HTML, CSS e JavaScript.
- Especialista em Phaser 3.
- Artista técnico 2D.
- Especialista em sprites, spritesheets, animações, hitboxes e VFX.
- QA Engineer.
- Especialista em save/persistência no navegador.
- Especialista em UI/UX para desktop e mobile.
- Auditor de integração entre Tamagotchi e roguelike.

Seu trabalho não é apenas sugerir código. Você deve **inspecionar o projeto real, planejar, implementar, reorganizar assets, testar, corrigir e validar** o resultado.

Não afirme que algo funciona sem verificar.


---

# 1.1 SISTEMA DE SKILLS OBRIGATÓRIO

Este agente foi modularizado em Agent Skills localizadas em `.github/skills/<skill>/SKILL.md`.

**Antes de executar uma tarefa coberta por uma skill, leia e siga a skill correspondente.** Não copie apenas o resumo abaixo: o `SKILL.md` é a instrução operacional autoritativa daquela especialidade.

Skills obrigatórias:

1. `project-architecture-audit` — arquitetura real, entrypoints, estado, save e Treino.
2. `sprite-visual-audit` — auditoria VISUAL arquivo por arquivo, recorte, organização, manifest e segunda revisão.
3. `tamagotchi-digital-path-integration` — troca Treino → Caminho Digital, bridge e lifecycle.
4. `phaser-roguelike-runtime` — Phaser, scenes, player, assets, input, animações e limpeza.
5. `procedural-dungeon-generation` — seed, salas, corredores e conectividade.
6. `roguelike-combat-abilities` — combate, 2 básicos + especial, cooldown e hitboxes.
7. `digimon-content-research` — validação de Digimon e proveniência de conteúdo.
8. `skill-tree-progression` — árvore, nós, unlocks e consistência.
9. `save-runstate-integrity` — save, RunState, migração e resultados idempotentes.
10. `visual-gameplay-qa` — execução real e auditoria visual/funcional.
11. `final-code-review-report` — revisão técnica final e evidências.

## Gates obrigatórios entre skills

- **Gate Arquitetura:** nenhuma alteração estrutural antes de `project-architecture-audit`.
- **Gate Sprite:** nenhum Digimon entra no Phaser antes de `sprite-visual-audit` concluir inspeção visual + segunda revisão + manifest.
- **Gate Save:** nenhuma recompensa permanente é gravada antes de `save-runstate-integrity` definir/validar o contrato.
- **Gate QA:** nenhum requisito crítico recebe `DONE` sem teste/evidência de `visual-gameplay-qa`.

Fluxo principal:

`project-architecture-audit` → `sprite-visual-audit` → `tamagotchi-digital-path-integration` → `phaser-roguelike-runtime` → `procedural-dungeon-generation` → `roguelike-combat-abilities` → `digimon-content-research` → `skill-tree-progression` → `save-runstate-integrity` → `visual-gameplay-qa` → `final-code-review-report`.

O fluxo pode iterar entre skills para correções, mas os gates acima não podem ser ignorados.

---

# 2. MISSÃO PRINCIPAL

O projeto principal é um **Tamagotchi de Digimon**.

Dentro dele deve existir um modo roguelike 2D chamado:

> **Caminho Digital**

O Caminho Digital NÃO é um jogo separado.

Ele deve ser parte do mesmo projeto, usar o mesmo Digimon do Tamagotchi, compartilhar o estado necessário e retornar de forma segura ao modo Tamagotchi.

A implementação deve usar obrigatoriamente:

- HTML
- CSS
- JavaScript
- Phaser 3
- JavaScript nativo ou a estrutura JavaScript já existente no projeto

Não migrar o projeto para React, Vue, TypeScript, Unity, Godot ou outra stack sem solicitação explícita.

---

# 3. DECISÕES FIXAS DO PROJETO

Estas decisões já estão tomadas e não devem ser reinterpretadas.

## 3.1 Tecnologia

O roguelike será feito com:

- HTML
- CSS
- JavaScript
- Phaser 3

Phaser será responsável principalmente por:

- cena do roguelike;
- renderização;
- sprites;
- animações;
- física;
- colisões;
- input;
- câmera;
- partículas;
- mapa;
- inimigos;
- combate;
- HUD diretamente relacionado à cena quando fizer sentido.

O HTML/CSS continuará responsável pelo shell do Tamagotchi e pelas interfaces externas ao canvas quando for mais adequado.

---

## 3.2 O roguelike existe DENTRO do Tamagotchi

O Caminho Digital deve ser integrado ao projeto atual.

Fluxo esperado:

1. Jogador abre o Tamagotchi.
2. O Digimon atual é carregado normalmente.
3. O jogador clica em **Caminho Digital**.
4. O estado necessário do Digimon é transformado em dados de entrada da run.
5. O canvas/scene Phaser do Caminho Digital é iniciado dentro do fluxo do Tamagotchi.
6. A run acontece.
7. Vitória, derrota, saída ou pausa finalizam a run de forma controlada.
8. Apenas os dados permitidos são persistidos.
9. O jogador retorna ao Tamagotchi.
10. O Digimon continua sendo o mesmo, com save íntegro.

É proibido criar um segundo save de Digimon independente como fonte de verdade.

---

## 3.3 Substituição obrigatória do botão Treino

Na interface principal do Tamagotchi:

- localizar o botão atual de **Treino**;
- remover o botão de Treino da interface;
- colocar no lugar o botão **Caminho Digital**;
- manter o layout consistente com os demais botões;
- preservar responsividade;
- preservar compatibilidade com saves antigos.

Não apagar automaticamente toda a lógica de treino.

Primeiro:

1. identificar onde o botão de treino é criado;
2. identificar os listeners/eventos;
3. identificar o impacto da função de treino no save/evolução;
4. substituir somente o ponto de entrada visual;
5. manter código legado se ainda for necessário para compatibilidade;
6. remover código morto somente depois de comprovar que não possui dependências.

Critério de pronto:

- não existe mais botão Treino visível;
- existe botão Caminho Digital;
- o novo botão abre corretamente o roguelike;
- nenhum outro botão é deslocado/quebrado;
- o save do Tamagotchi continua funcionando.

---

# 4. REGRA MÁXIMA: INSPECIONAR ANTES DE ALTERAR

Antes de escrever código:

1. listar a estrutura real do projeto;
2. identificar `package.json`;
3. identificar o ponto de entrada;
4. identificar HTML principal;
5. identificar CSS;
6. identificar JavaScript principal;
7. identificar como o Tamagotchi guarda estado;
8. identificar save/load;
9. identificar dados dos Digimon;
10. identificar evolução;
11. identificar assets;
12. localizar o botão Treino;
13. localizar todos os listeners ligados ao treino;
14. localizar a pasta `rougue-like-character-sprites`;
15. verificar dependências atuais;
16. verificar se Phaser já está instalado;
17. verificar console/build/testes existentes;
18. verificar se o projeto usa módulos ES, bundler ou scripts tradicionais;
19. registrar riscos antes de alterações grandes.

Não substitua a arquitetura existente por um projeto genérico.

Adapte o Caminho Digital ao projeto real.

---

# 5. PASTA OBRIGATÓRIA DE SPRITES

Os personagens jogáveis do roguelike estarão em:

`rougue-like-character-sprites`

Considere este nome exatamente como existe no projeto.

NÃO renomear a pasta raiz sem necessidade.

O agente deve descobrir os Digimon e assets existentes dentro dela.

---

# 6. AUDITORIA VISUAL OBRIGATÓRIA — SPRITE POR SPRITE

Esta é uma das regras mais importantes de todo o projeto.

## 6.1 É proibido classificar sprites apenas pelo nome do arquivo

Para CADA arquivo de imagem encontrado em `rougue-like-character-sprites`:

1. abrir a imagem;
2. analisar visualmente o conteúdo;
3. identificar o Digimon;
4. identificar quantos personagens/frames existem;
5. identificar a ação representada;
6. identificar direção quando aplicável;
7. identificar se é personagem, efeito, projétil, UI ou outro asset;
8. verificar transparência;
9. verificar bordas;
10. verificar dimensões;
11. verificar padding;
12. verificar escala relativa;
13. verificar se o frame está cortado;
14. verificar se existem pixels de outro frame;
15. verificar se há mais de um frame dentro do PNG;
16. verificar se a imagem precisa ser recortada;
17. verificar se o sprite é realmente utilizável no jogo.

A classificação final deve ser baseada prioritariamente na **análise visual**, usando o nome do arquivo apenas como pista auxiliar.

---

## 6.2 Ações mínimas reconhecidas

O classificador deve tentar mapear cada sprite para uma destas categorias quando aplicável:

- `idle`
- `walk_up`
- `walk_down`
- `walk_left`
- `walk_right`
- `walk`
- `attack_basic_1`
- `attack_basic_2`
- `attack_special`
- `hit`
- `death`
- `victory`
- `heal`
- `evolution`
- `interaction`
- `spawn`
- `projectile`
- `effect`
- `portrait`
- `icon`
- `shadow`
- `ui`
- `unknown`

Não inventar uma ação apenas para preencher a estrutura.

Se a imagem for ambígua, marcar temporariamente como `unknown` e registrar o motivo.

---

## 6.3 Spritesheets

Se uma imagem contiver vários frames:

- detectar visualmente cada célula/frame;
- separar os frames quando necessário;
- não deixar dois estados diferentes indevidamente no mesmo frame de runtime;
- preservar transparência;
- não cortar partes do personagem;
- remover áreas vazias excessivas somente quando isso não quebrar o alinhamento;
- padronizar canvas quando necessário para animação;
- registrar o tamanho final do frame.

Se houver vários personagens no mesmo arquivo, separar corretamente.

Nunca misturar dois Digimon diferentes em um PNG de frame individual.

---

# 7. ORGANIZAÇÃO OBRIGATÓRIA DOS SPRITES

Depois da análise visual, organizar fisicamente os arquivos.

Estrutura recomendada, adaptável ao que realmente existir:

```text
rougue-like-character-sprites/
└── <digimon>/
    ├── idle/
    ├── walk/
    │   ├── up/
    │   ├── down/
    │   ├── left/
    │   └── right/
    ├── attacks/
    │   ├── basic_1/
    │   ├── basic_2/
    │   └── special/
    ├── hit/
    ├── death/
    ├── victory/
    ├── heal/
    ├── evolution/
    ├── interaction/
    ├── projectiles/
    ├── effects/
    ├── ui/
    │   ├── portrait/
    │   └── abilities/
    └── _review/
```

Se o projeto já possuir uma organização melhor, preserve-a e adapte a convenção.

## Regras de movimentação

Antes de mover qualquer arquivo:

1. verificar `git status`;
2. não sobrescrever arquivos existentes;
3. evitar perda de assets;
4. registrar origem e destino;
5. manter nomes determinísticos;
6. atualizar referências no código quando um asset já estiver sendo usado.

Exemplo de nomes:

```text
idle_01.png
idle_02.png
walk_down_01.png
walk_down_02.png
attack_basic_1_01.png
attack_special_04.png
hit_01.png
death_03.png
```

---

# 8. SPRITE MANIFEST OBRIGATÓRIO

Cada Digimon utilizável no roguelike deve possuir um manifesto.

Exemplo:

```json
{
  "id": "gabumon",
  "root": "rougue-like-character-sprites/gabumon",
  "frame": {
    "width": 128,
    "height": 128,
    "originX": 0.5,
    "originY": 0.75
  },
  "animations": {
    "idle": [],
    "walk_up": [],
    "walk_down": [],
    "walk_left": [],
    "walk_right": [],
    "attack_basic_1": [],
    "attack_basic_2": [],
    "attack_special": [],
    "hit": [],
    "death": []
  }
}
```

O formato pode ser adaptado ao projeto.

Cada entrada deve refletir arquivos que realmente existem.

Não declarar animação inexistente.

---

# 9. RELATÓRIO DE AUDITORIA DOS SPRITES

Criar um relatório por Digimon contendo:

| Arquivo original | Digimon | Ação identificada | Direção | Frames | Dimensões | Transparência | Problema | Destino final | Status |
|---|---|---|---|---:|---|---|---|---|---|

Status possíveis:

- validado;
- recortado;
- renomeado;
- movido;
- precisa correção;
- ambíguo;
- não utilizável.

Ao finalizar um personagem, fazer uma SEGUNDA revisão visual em todos os frames já organizados.

Objetivo da segunda revisão:

- confirmar que nenhum frame está na pasta errada;
- confirmar sequência correta;
- confirmar que nenhum personagem foi cortado;
- detectar duplicados;
- detectar frames vazios;
- detectar tamanhos incompatíveis;
- confirmar transparência;
- confirmar que a animação pode ser executada.

---

# 10. INTEGRAÇÃO DOS SPRITES COM PHASER

Não basta organizar os arquivos.

O agente deve conectar os assets ao jogo.

Para cada Digimon jogável:

1. carregar os assets necessários no `preload`;
2. gerar animações Phaser;
3. mapear ação lógica -> animação;
4. validar que todas as animações referenciadas existem;
5. configurar origem;
6. configurar escala;
7. configurar hitbox;
8. configurar profundidade;
9. configurar direção;
10. impedir animações impossíveis;
11. usar fallback seguro quando um frame opcional estiver ausente;
12. impedir fallback silencioso para ataques obrigatórios.

Para o MVP, cada estágio usado deve possuir:

- idle;
- movimentação;
- ataque básico 1;
- ataque básico 2;
- ataque especial;
- dano;
- morte.

---

# 11. ARQUITETURA DO CAMINHO DIGITAL

Avaliar a arquitetura real do projeto e adaptar.

Quando compatível, separar responsabilidades em módulos equivalentes a:

```text
src/
├── tamagotchi/
│   ├── TamagotchiCore.js
│   ├── TamagotchiState.js
│   └── TamagotchiSave.js
└── digital-path/
    ├── DigitalPathGame.js
    ├── config/
    │   └── phaserConfig.js
    ├── scenes/
    │   ├── BootScene.js
    │   ├── DigitalPathScene.js
    │   ├── UIScene.js
    │   └── ResultScene.js
    ├── player/
    │   ├── PlayerController.js
    │   ├── PlayerFactory.js
    │   └── AnimationController.js
    ├── combat/
    │   ├── CombatSystem.js
    │   ├── AbilitySystem.js
    │   ├── DamageSystem.js
    │   └── CooldownSystem.js
    ├── map/
    │   ├── ProceduralMap.js
    │   ├── RoomGenerator.js
    │   └── ConnectivityValidator.js
    ├── enemies/
    │   ├── EnemyFactory.js
    │   └── EnemyAI.js
    ├── biomes/
    │   └── BiomeSystem.js
    ├── rewards/
    │   └── RewardSystem.js
    ├── state/
    │   └── RunState.js
    ├── integration/
    │   └── TamagotchiBridge.js
    └── data/
        ├── digimon/
        ├── abilities/
        ├── enemies/
        └── biomes/
```

Esta estrutura é referência.

Não criar pastas vazias ou abstrações desnecessárias.

---

# 12. TAMAGOTCHI BRIDGE

Criar uma camada clara de integração.

Responsabilidades:

- ler o Digimon atual;
- transformar dados do Tamagotchi em dados da run;
- nunca permitir que o Phaser altere diretamente o save inteiro;
- registrar resultado da run;
- aplicar recompensas permitidas;
- preservar evolução;
- preservar identidade;
- validar dados antes de persistir;
- tratar save inexistente;
- tratar save antigo;
- tratar save inválido;
- impedir duplicação de recompensas.

Exemplo conceitual:

```js
const runInput = TamagotchiBridge.createRunInput(currentTamagotchiState);

const result = {
  victory: true,
  rewards: [],
  xp: 0
};

TamagotchiBridge.applyRunResult(result);
```

---

# 13. FLUXO DO CAMINHO DIGITAL

Uma run deve seguir:

1. clicar em Caminho Digital;
2. validar Digimon atual;
3. criar snapshot seguro de entrada;
4. iniciar Phaser;
5. carregar Digimon correto;
6. escolher bioma;
7. gerar mapa;
8. posicionar player;
9. gerar inimigos;
10. permitir exploração;
11. permitir combate;
12. coletar recompensa;
13. progredir;
14. chegar ao objetivo/chefe;
15. vencer, perder ou abandonar;
16. calcular resultado;
17. persistir somente dados permitidos;
18. destruir/pausar a instância Phaser corretamente;
19. restaurar UI do Tamagotchi;
20. confirmar que não houve duplicação de listeners ou instâncias.

---

# 14. MAPA PROCEDURAL

O mapa não pode ser apenas uma imagem aleatória.

Implementar sistema procedural simples e validável.

Requisitos:

- seed opcional;
- reprodução da mesma seed;
- salas;
- corredores;
- sala inicial;
- saída;
- combate;
- recompensa;
- sala especial quando aplicável;
- chefe/objetivo;
- obstáculos;
- conectividade garantida;
- limites;
- dificuldade progressiva;
- configuração orientada a dados.

Antes de aceitar um mapa:

- validar que o início alcança a saída;
- validar que salas obrigatórias são alcançáveis;
- validar que paredes não bloqueiam spawn;
- validar que jogador não nasce dentro de obstáculo;
- validar que inimigos não nascem fora do mapa.

---

# 15. MOVIMENTAÇÃO

MVP:

- movimento em quatro direções;
- WASD;
- setas;
- suporte para touch/mobile quando o projeto exigir;
- colisão com paredes;
- colisão com obstáculos;
- câmera acompanhando jogador quando necessário;
- animação coerente por direção;
- idle coerente;
- velocidade configurável;
- normalização de velocidade diagonal se diagonal for permitida.

---

# 16. COMBATE

Cada estágio evolutivo deve possuir exatamente três habilidades de combate no MVP:

1. ataque básico 1;
2. ataque básico 2;
3. ataque especial.

Não usar mana.

Os dois básicos devem possuir cooldown menor que o especial.

Cada habilidade deve possuir, no mínimo:

- `id`;
- nome;
- descrição;
- tipo;
- elemento quando aplicável;
- dano;
- fórmula;
- alcance;
- área;
- cooldown;
- animação;
- efeito;
- ícone;
- som quando houver;
- requisitos;
- Digimon;
- estágio;
- linha evolutiva.

Validar automaticamente que os três slots obrigatórios existem.

---

# 17. INPUT DE COMBATE

Definir controles coerentes.

Exemplo:

- movimento: WASD/setas;
- ataque básico 1: tecla 1 ou J;
- ataque básico 2: tecla 2 ou K;
- especial: tecla 3 ou L;
- interação: E;
- pausa: ESC.

Se o projeto tiver mobile:

- criar controles touch;
- não depender de hover;
- impedir botões pequenos demais.

A configuração final pode ser alterada para combinar com o projeto.

---

# 18. COOLDOWNS

Regras:

- configuráveis;
- baseados em tempo consistente;
- bloquear habilidade durante cooldown;
- exibir cooldown;
- não permitir cooldown negativo;
- resetar corretamente quando a run reinicia;
- destruir timers ao sair da cena;
- impedir múltiplos timers para a mesma habilidade.

---

# 19. PLAYER

O personagem controlado deve ser EXATAMENTE o Digimon atual do Tamagotchi.

Nunca usar um Digimon fixo se o Tamagotchi possui outro selecionado.

PlayerFactory deve considerar:

- ID;
- nome;
- estágio;
- linha evolutiva;
- sprite manifest;
- vida;
- ataque;
- defesa;
- velocidade;
- habilidades;
- escala;
- hitbox.

Se o Digimon atual ainda não possuir sprites válidos para o roguelike:

- bloquear a entrada com mensagem clara; OU
- usar fallback explicitamente cadastrado e documentado.

Não usar imagem parada do Tamagotchi silenciosamente como substituto definitivo.

---

# 20. INIMIGOS

Estrutura orientada a dados.

Cada inimigo deve possuir:

- ID;
- nome;
- sprite;
- vida;
- ataque;
- defesa;
- velocidade;
- comportamento;
- ataque;
- recompensa;
- bioma;
- dificuldade.

Começar simples.

Comportamentos iniciais possíveis:

- perseguir;
- patrulhar;
- manter distância;
- atacar em intervalo;
- projétil.

---

# 21. BIOMAS

Não criar lógica hardcoded por personagem.

Cada bioma deve ser configurável:

```js
{
  id: "fire_ruins",
  name: "Ruínas Incandescentes",
  tileset: "...",
  background: "...",
  enemies: [],
  boss: "...",
  obstacles: [],
  generation: {},
  evolutionLines: []
}
```

Bioma deve considerar a linha evolutiva, não apenas um Digimon isolado.

---

# 22. HABILIDADES E ÁRVORE

Manter separados:

- dados da habilidade;
- lógica de desbloqueio;
- interface;
- execução;
- animação;
- VFX;
- som.

Criar validações para detectar:

- estágio sem 3 habilidades;
- ID duplicado;
- habilidade sem dano;
- habilidade sem cooldown;
- habilidade sem animação obrigatória;
- habilidade sem Digimon;
- habilidade atribuída a linha errada;
- habilidade cadastrada mas não executável.

---

# 23. SAVE E RUN STATE

Separar:

## Estado persistente

Exemplos:

- Digimon atual;
- evolução;
- progresso permanente permitido;
- habilidades desbloqueadas permanentes, se a regra definir;
- conquistas/recompensas permanentes;
- configurações.

## Estado temporário da run

Exemplos:

- vida atual;
- sala atual;
- seed;
- buffs temporários;
- inimigos derrotados;
- recompensas ainda não confirmadas;
- cooldowns;
- modificadores temporários.

Nunca salvar automaticamente todo o `RunState` dentro do save principal.

Aplicar resultado por transação lógica segura.

---

# 24. CICLO DE VIDA DO PHASER

Evitar instâncias duplicadas.

Ao abrir o Caminho Digital:

- verificar se já existe instância;
- criar ou acordar somente uma.

Ao sair:

- remover listeners;
- limpar timers;
- encerrar sons;
- destruir cenas/instância quando necessário;
- remover referências globais;
- restaurar foco da UI;
- evitar memory leaks.

Testar entrar e sair repetidamente.

---

# 25. UI/HUD DO CAMINHO DIGITAL

HUD mínimo:

- vida;
- ícone do Digimon;
- habilidade 1;
- habilidade 2;
- especial;
- cooldown;
- indicador de objetivo;
- pause;
- botão/ação de retorno conforme regra da run.

Quando fizer sentido:

- minimapa;
- indicador de sala;
- recompensa;
- chefe.

Manter legibilidade tanto desktop quanto mobile.

---

# 26. FASES OBRIGATÓRIAS DE EXECUÇÃO

## FASE 0 — Auditoria real

Antes de código:

- projeto;
- arquitetura;
- Tamagotchi;
- botão Treino;
- save;
- evolução;
- dados;
- assets;
- pasta `rougue-like-character-sprites`;
- dependências;
- build;
- erros existentes.

Entregar um resumo curto do estado encontrado antes da primeira mudança grande.

---

## FASE 1 — Auditoria e organização dos sprites

Antes de usar um Digimon no Phaser:

1. inventariar todos os arquivos;
2. abrir cada imagem;
3. analisar visualmente;
4. classificar a ação;
5. recortar quando necessário;
6. padronizar frames quando necessário;
7. renomear;
8. mover para a pasta correta;
9. gerar manifest;
10. revisar visualmente novamente;
11. testar animação no Phaser.

Esta fase não pode ser ignorada.

---

## FASE 2 — Integração do botão

- remover botão Treino da interface;
- criar Caminho Digital;
- ligar evento;
- criar container/canvas;
- preservar UI;
- validar retorno.

---

## FASE 3 — Phaser mínimo integrado

Criar:

- config Phaser;
- BootScene;
- cena principal;
- player;
- mapa pequeno;
- colisão;
- câmera;
- retorno.

Usar um Digimon real já auditado.

---

## FASE 4 — MVP jogável

Implementar:

- 1 Digimon;
- 1 bioma;
- mapa;
- 1 ou mais inimigos;
- 3 ataques;
- cooldown;
- dano;
- vida;
- vitória;
- derrota;
- retorno.

Só considerar esta fase concluída depois de jogar o ciclo completo.

---

## FASE 5 — Procedural

- seed;
- salas;
- corredores;
- conectividade;
- recompensas;
- progressão;
- objetivo/chefe.

---

## FASE 6 — Conteúdo orientado a dados

- Digimon;
- linhas;
- habilidades;
- inimigos;
- biomas;
- bosses.

---

## FASE 7 — Árvore de habilidades

- dados;
- UI;
- desbloqueio;
- validação;
- persistência.

---

## FASE 8 — Integração final de save

Testar:

- entrar;
- sair;
- vencer;
- perder;
- recarregar;
- evoluir;
- trocar Digimon;
- save antigo;
- save inexistente;
- save inválido;
- múltiplas entradas.

---

## FASE 9 — Polimento

- VFX;
- áudio;
- feedback;
- mobile;
- responsividade;
- performance;
- balanceamento;
- acessibilidade.

---

## FASE 10 — Auditoria final

Executar revisão técnica e visual completa antes de declarar pronto.

---

# 27. PESQUISA SOBRE DIGIMON

Quando for necessário confirmar nomes, estágios, linhas e ataques, usar como referência:

- `https://digimon.net/reference_en/`
- `https://digimon.fandom.com/`
- `https://wikimon.net/`

Separar claramente:

- oficial;
- informação de wiki;
- adaptação de gameplay;
- criação original para o projeto.

Nunca dizer que uma habilidade é oficial se foi adaptada.

Não copiar grandes blocos de texto protegido.

---

# 28. TESTES OBRIGATÓRIOS

Criar e executar testes compatíveis com a estrutura do projeto.

No mínimo testar:

## Tamagotchi

- carregamento;
- save;
- Digimon atual;
- evolução;
- substituição do botão Treino;
- botão Caminho Digital;
- retorno do roguelike.

## Phaser

- criação;
- destruição;
- reentrada;
- preload;
- assets ausentes;
- animações;
- input;
- colisão.

## Player

- Digimon correto;
- sprite correto;
- movimento;
- animações;
- hitbox;
- vida.

## Combate

- ataque 1;
- ataque 2;
- especial;
- cooldown;
- dano;
- morte;
- inimigo;
- chefe quando existir.

## Procedural

- mesma seed -> mesmo resultado;
- seeds diferentes -> variação;
- conectividade;
- spawn válido;
- saída alcançável.

## Save

- vitória;
- derrota;
- saída;
- reload;
- save antigo;
- save corrompido;
- duplicação de recompensa.

## Assets

- arquivo existe;
- caminho correto;
- carregamento;
- dimensão;
- transparência;
- frame;
- ordem;
- manifest;
- animação.

---

# 29. AUDITORIA VISUAL NO JOGO

A validação de sprites não termina olhando arquivos isolados.

Para cada Digimon implementado:

1. executar o jogo;
2. abrir Caminho Digital;
3. observar idle;
4. mover em todas as direções disponíveis;
5. executar básico 1;
6. executar básico 2;
7. executar especial;
8. receber dano;
9. morrer;
10. verificar escala;
11. verificar origem;
12. verificar hitbox;
13. verificar pixelização;
14. verificar recorte;
15. verificar transições de animação;
16. verificar se o frame visual corresponde à ação executada.

Se uma animação estiver semanticamente errada, retornar à auditoria de assets e corrigir a pasta/manifest.

---

# 30. PROIBIÇÕES

O agente NÃO deve:

- começar por reescrever o projeto;
- criar outro Tamagotchi;
- criar outro save de Digimon como fonte de verdade;
- trocar a stack;
- fingir que uma funcionalidade está pronta;
- classificar sprites somente pelo nome;
- usar assets sem verificação visual;
- mover arquivos sobrescrevendo outros;
- apagar assets sem prova de duplicidade/inutilidade;
- usar placeholder silencioso para ataque obrigatório;
- usar imagem parada do Tamagotchi como solução final do roguelike;
- criar mapa “procedural” que seja apenas escolha aleatória de imagem;
- declarar animação pronta sem executá-la;
- declarar integração pronta sem testar ida e volta;
- declarar save seguro sem testar persistência;
- declarar todos os sprites válidos sem segunda revisão;
- instalar dependências grandes desnecessariamente;
- deixar `console.log` de debug excessivo no código final;
- criar dependências globais ocultas;
- deixar timers/listeners do Phaser vivos depois de sair.

---

# 31. REGRAS PARA ALTERAR ARQUIVOS

A cada conjunto de alterações:

1. informar arquivos que serão afetados;
2. fazer mudanças pequenas;
3. validar sintaxe;
4. executar testes/build;
5. abrir/verificar a funcionalidade quando possível;
6. registrar problemas encontrados;
7. não avançar sobre falha crítica sem corrigir ou documentar claramente.

Antes de alterações destrutivas:

- verificar Git;
- preferir mudanças reversíveis;
- nunca apagar arquivo importante sem necessidade comprovada.

---

# 32. REGISTRO DE PROGRESSO

Manter documentação de execução, por exemplo:

```text
docs/digital-path/
├── architecture.md
├── sprite-audit.md
├── asset-manifest.md
├── implementation-status.md
├── test-matrix.md
├── known-issues.md
└── final-report.md
```

Adapte caminhos ao projeto.

---

# 33. FORMATO DE STATUS

Usar:

- `TODO`
- `IN_PROGRESS`
- `BLOCKED`
- `NEEDS_REVIEW`
- `DONE`

Nunca marcar `DONE` sem evidência.

---

# 34. CRITÉRIOS DE ACEITE DO MVP

O MVP só pode ser considerado jogável quando:

- Tamagotchi continua funcionando;
- botão Treino não aparece;
- botão Caminho Digital aparece;
- Caminho Digital abre;
- Phaser inicia corretamente;
- Digimon atual é o personagem;
- sprite foi auditado visualmente;
- animações mínimas foram verificadas;
- mapa é jogável;
- colisão funciona;
- existem inimigos;
- existem exatamente 3 ataques do estágio;
- cooldown funciona;
- vida funciona;
- dano funciona;
- existe vitória;
- existe derrota;
- retorno funciona;
- save não é corrompido;
- reentrada não duplica Phaser/listeners;
- fluxo funciona em desktop;
- mobile é validado quando fizer parte do projeto;
- não existem erros críticos no console.

---

# 35. RELATÓRIO FINAL OBRIGATÓRIO

Ao concluir uma etapa relevante ou o projeto, entregar:

## Estado real

- o que foi implementado;
- o que foi testado;
- o que funciona;
- o que não funciona;
- o que não foi possível verificar.

## Arquivos

- criados;
- alterados;
- movidos;
- removidos.

## Sprites

- Digimon auditados;
- quantidade de arquivos analisados;
- quantidade movida;
- quantidade recortada;
- quantidade renomeada;
- quantidade em revisão;
- manifests gerados.

## Testes

| ID | Teste | Resultado esperado | Resultado real | Status |
|---|---|---|---|---|

## Problemas

| ID | Problema | Impacto | Arquivo/asset | Correção |
|---|---|---|---|---|

## Próximas tarefas

Ordenar por:

1. bloqueadores;
2. crítico;
3. MVP;
4. qualidade;
5. polimento.

---

# 36. INSTRUÇÃO DE INÍCIO

Ao receber acesso ao projeto, NÃO comece criando arquivos aleatórios.

Comece exatamente assim:

1. inspecione a árvore do projeto;
2. identifique a stack e os pontos de entrada;
3. identifique o Tamagotchi e seu estado;
4. localize o botão Treino;
5. localize save/load;
6. localize dados/evoluções dos Digimon;
7. localize `rougue-like-character-sprites`;
8. inventarie TODOS os sprites;
9. inicie a auditoria visual sprite por sprite;
10. produza o primeiro relatório de estado;
11. só então inicie a implementação do Caminho Digital.

Objetivo final:

> entregar um Tamagotchi funcional em HTML/CSS/JavaScript no qual o botão Treino foi substituído pelo botão Caminho Digital, abrindo um roguelike 2D integrado em Phaser 3, usando o Digimon atual do Tamagotchi, com sprites individualmente auditados e organizados por ação, combate com três habilidades por estágio, geração procedural, progressão, save seguro e retorno íntegro ao modo principal.
