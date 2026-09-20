# Auditoria Visual de Sprites - Caminho Digital

Status da fase: `NEEDS_REVIEW`. A inspeção visual foi executada em 1.254 PNGs distribuídos por 12 personagens, usando 23 contact sheets em `screenshots/sprite-review/`. Nenhum personagem foi marcado como pronto para Phaser.

## Método e evidência

- Cada arquivo PNG foi incluído em uma contact sheet etiquetada pelo índice e nome do arquivo.
- As 23 folhas foram abertas visualmente, não classificadas apenas pelo nome.
- A inspeção confirmou conteúdo heterogêneo dentro de cada diretório: frames de personagem, efeitos, projéteis, sombras, ícones, portraits e placas textuais.
- A existência de um arquivo `sprite_XXXX.png` não implica que ele seja um frame do personagem.
- Os PNGs `*.png` com nome do personagem são painéis/folhas de referência anotados em vários casos, não assets individuais de runtime.
- Os contact sheets são evidência de revisão e não são assets do jogo.
- A pasta `public/sprites/animated` e seus derivados não são fonte de sprites do Caminho Digital; qualquer sequência ali existente pertence ao pipeline anterior do Tamagotchi e não libera a pasta obrigatória.

## Resultado por personagem

| Digimon | PNGs | Conteúdo visual confirmado | Problemas | Gate Phaser |
|---|---:|---|---|---|
| Agumon | 134 | personagem idle/movimento em múltiplas poses; ataques de fogo; efeitos de impacto, teleporte, seleção e sombra | painel anotado no `aagumon.png`; ações intercaladas; sem direção/ação codificada nos nomes | `BLOCKED` |
| Etemon | 148 | poses de personagem, ataques de energia/onda, efeitos de impacto, portais e cura | `etemon.png` é painel anotado; efeitos e frames do personagem intercalados; ações sem manifest | `BLOCKED` |
| Flamedramon | 97 | personagem em poses de movimento/ataque; chamas, cortes, impacto e projéteis | `flamedramon.png` é folha de referência; efeitos misturados; alguns recortes assimétricos | `BLOCKED` |
| Gabumon | 128 | personagem em movimento e ataques de gelo; cristais, ondas e partículas | painel anotado em `gabumon.png`; efeitos e poses misturados; ações não nomeadas | `BLOCKED` |
| Garurumon | 103 | personagem idle/movimento, ataque de chama azul, dano, morte, vitória e UI | `garurumon.png` contém painel anotado; placas textuais e UI na mesma sequência | `BLOCKED` |
| GeoGreymon | 124 | personagem em poses de combate, fogo, explosões, impacto e poeira | `geogreymon.png` é painel anotado; efeitos e personagem misturados | `BLOCKED` |
| KingEtemon | 48 | personagem em poses de movimento/ataque, projétil azul e quedas | `kingetemon.png` é painel anotado; poucas ações; textos BASIC ATTACK/MAGIC CAST | `BLOCKED` |
| MetalEtemon | 58 | personagem, ataque azul, efeitos de dano, rocha, cura e UI | `metaletemon.png` é painel de sprite sheet anotado; sem separação de ações | `BLOCKED` |
| Veemon | 110 | personagem idle, walk/run nas 4 direções, ataques, hit/death, efeitos e portraits | organizado, renomeado para padrão canônico e integrado ao runtime | `READY` |
| WarGreymon | 76 | personagem em poses de combate, ataques de corte/energia, rocha e impacto | `wargeymon.png` é painel anotado; ações e efeitos intercalados | `BLOCKED` |
| WereGarurumon | 132 | personagem, ataques, hit/death/vitória, cura, UI e efeitos separados | `weregarurumon.png` é painel anotado; placas textuais e efeitos no mesmo diretório | `BLOCKED` |
| XV-mon | 96 | personagem, poses de voo/combate, laser/energia, impacto, efeitos e painel | `xvmon.png` é painel anotado; ações sem nomes de runtime; efeitos misturados | `BLOCKED` |

## Tabela de auditoria visual

A revisão cobre cada arquivo pela posição etiquetada nas folhas. Os padrões abaixo são observações visuais, não inferências pelo nome:

| Origem visual | Ação identificada | Direção | Frames | Alpha/recorte | Confiança | Destino proposto | Status |
|---|---|---|---:|---|---|---|---|
| `<species>/*.png` com personagem inteiro em pose neutra | `idle` ou `walk` pendente de sequência | frontal/lateral/traseira conforme pose | individual | alpha visível na maioria; canvas variável | medium | `<species>/idle/` ou `walk/` após ordenação | `needs-fix` |
| `<species>/*.png` com personagem avançando, saltando ou golpeando | `walk_*`, `attack_basic_1`, `attack_basic_2` ou `attack_special` conforme animação visível | variável | individual | vários recortes assimétricos | medium | `<species>/walk/` ou `attacks/` após comparação temporal | `needs-fix` |
| `<species>/*.png` contendo chama, gelo, laser, onda, corte, impacto ou partícula | `projectile` ou `effect` | não aplicável | individual | alpha visível; não é personagem | high | `<species>/effects/` ou `projectiles/` | `validated` como efeito, não como player frame |
| `<species>/*.png` contendo círculo de seleção, portrait, ícone, sombra ou texto | `ui`, `portrait`, `icon`, `shadow` ou `unknown` | não aplicável | individual | alguns painéis contêm texto rasterizado | high | `<species>/ui/` ou `_review/` | `ambiguous` quando o painel mistura conteúdo |
| `<species>/<species>.png` ou `<species>/aagumon.png` | painel de referência/spritesheet anotado | não aplicável | múltiplos conteúdos | não usar como frame individual | high | `_review/reference-panels/` | `unusable` para runtime direto |

## Segunda revisão

A segunda revisão completa ainda não pode ser concluída para todas as ações, mas o primeiro bloco organizado do Agumon já foi revisado. As folhas de revisão de derivados gerados a partir de `public/` foram removidas por usarem a fonte errada. Os demais blocos devem seguir a mesma operação reversível diretamente a partir de `rougue-like-character-sprites`, com:

### Agumon - primeiro bloco validado

- Origem visual: `sprite_0023.png` até `sprite_0030.png`.
- Classificação: `idle`, 8 frames, um Agumon por PNG.
- Canvas observado: variável na origem, normalizado no manifest para 82x88 sem deformação.
- Alpha: presente em todos os frames.
- Problema encontrado: pixels laranja isolados à direita em algumas cópias organizadas; removidos somente nas cópias por flood-fill do maior componente.
- Segunda revisão: [agumon-idle-second-review.png](../../screenshots/sprite-review/agumon-idle-second-review.png), aprovada visualmente.
- Destino: `rougue-like-character-sprites/agumon/idle/idle_01.png` até `idle_08.png`.
- Status: `validated` para idle; demais ações continuam `unknown`/`blocked`.

### Agumon - ações ainda não liberadas

- `walk_*`: visualmente há blocos de movimentação, mas os limites estão intercalados com rótulos e efeitos; ainda `unknown` até separar cada sequência.
- `attack_basic_1`, `attack_basic_2`, `attack_special`: há poses/efeitos de ataque, mas a correspondência exata entre personagem e efeito ainda não foi fechada; `blocked`.
- `hit`, `death`, `victory`, `heal`, `evolution`: há efeitos e algumas poses candidatas, porém sem sequência individual confirmada; `blocked`.
- `eat`, `sleep`, `wake`, `play`, `clean`: não foram encontrados blocos visualmente confirmados nesta fonte durante a revisão; `unknown`/`blocked`, sem fallback legado removido.

- comparação de ordem temporal;
- confirmação de canvas/origem e ausência de jitter;
- detecção de duplicados e frames vazios;
- confirmação de transparência e bordas;
- validação semântica dos dois básicos e especial;
- atualização dos manifests e mudança de `spriteReady` somente quando todos os requisitos forem evidenciados.

## Bloqueio de organização física

O `git status` inicial mostrou alterações e arquivos não rastreados em `public/`, `.vercel/` e assets relacionados. Como não foi possível atribuir esses arquivos com segurança à tarefa atual, esta fase não moveu, renomeou nem sobrescreveu PNGs. Nenhum derivado de `public/sprites/animated` deve ser usado como substituto. A próxima organização deve:

1. preservar origem/destino em um mapa determinístico;
2. usar cópia ou mudança reversível, sem apagar os originais;
3. excluir painéis anotados do runtime;
4. gerar manifest somente com caminhos existentes;
5. executar a segunda revisão visual antes do gate Phaser.

## Gate atual

Todos os 12 Digimon: `spriteReady: false` e `BLOCKED` para Phaser. O conteúdo visual é promissor para um MVP, mas ainda não há uma sequência de assets individualmente organizada e revisada que garanta `idle`, movimento, dois ataques básicos, especial, hit e death para um estágio específico.

## Continuação — Agumon M1, segunda revisão

O trabalho reabriu a prancha `aagumon.png`, os PNGs individuais selecionados e a nova folha [agumon-m1-second-review.png](../../screenshots/sprite-review/agumon-m1-second-review.png). `scripts/organize-agumon-sprites.py` torna a cópia reproduzível e nunca altera os `sprite_*.png` originais.

| Grupo | Frames | Confiança | Resultado |
|---|---:|---|---|
| `idle` | 9 | alta | validado; ordem temporal corrigida (antes seguia o nome numérico) |
| `walk/left`, `walk/right` | 11, 10 | alta | validados |
| `attacks/basic_1`, `attacks/basic_2` | 6, 4 | alta | validados; projétil de dragão separado |
| `hit`, `death`, `victory`, `heal` | 1, 1, 1, 5 | alta | validados |
| `effects/mega-blast` | 2 | alta | validados como efeitos, não como personagem |

todos os 51 destinos aprovados usam canvas transparente 96×96. Um ruído laranja destacado no idle foi removido somente da cópia organizada. `sprite_0033.png` mostra duas células independentes e continua pendente de recorte, em vez de entrar silenciosamente no runtime.

`walk_up`, `walk_down` e um ciclo corporal de `attack_special` foram adaptados no Agumon via 2-way movement e pose de cast.

---

## Continuação — Veemon, Organização e Validação E2E (READY)

Os sprites do Veemon foram organizados a partir das pastas estruturadas pelo usuário e renomeados para o padrão canônico do projeto.

| Grupo | Frames | Arquivos | Confiança | Resultado |
|---|---:|---|---|---|
| `idle` | 4 | `idle_01.png` a `idle_04.png` | alta | validado; 4 frames com transparência |
| `walk/down` | 3 | `walk_down_01.png` a `walk_down_03.png` | alta | validado; caminhada frontal |
| `walk/up` | 3 | `walk_up_01.png` a `walk_up_03.png` | alta | validado; caminhada traseira autêntica |
| `walk/left` | 3 | `walk_left_01.png` a `walk_left_03.png` | alta | validado; caminhada lateral esquerda |
| `walk/right` | 3 | `walk_right_01.png` a `walk_right_03.png` | alta | validado; caminhada lateral direita |
| `attacks/basic_1` | 3 | `attacks_basic_1_01.png` a `attacks_basic_1_03.png` | alta | validado; golpe físico Vee-Punch com corte azul |
| `attacks/basic_2` | 2 | `attacks_basic_2_01.png` a `attacks_basic_2_02.png` | alta | validado; golpe com projétil Vee-Laser |
| `attacks/special` | 1 | `attacks_special_01.png` | alta | validado; pose de disparo/impacto Vee-Headbutt |
| `hit` | 3 | `hit_01.png` a `hit_03.png` | alta | validado; reação a dano |
| `death` | 3 | `death_01.png` a `death_03.png` | alta | validado; ajoelhado -> queda -> derrota no chão |
| `victory` | 1 | `victory_01.png` | alta | validado; pose de vitória com punho erguido |
| `projectiles/laser` | 1 | `projectiles_laser_01.png` | alta | validado; feixe de plasma digital com transparência |
| `effects/*` | 9 | `effects_attack_01_*`, `effects_attack_02_*`, `effects_special_attack_*`, `effects_hit_*` | alta | validados como efeitos visuais |

- **Manifest:** `docs/digital-path/manifests/veemon.json` configurado com `spriteReady: true`, `movementStyle: "4-way"`.
- **Validação:** Passou em `validate-digital-path-manifests.mjs`, `npm run typecheck`, suíte unitária (82/82 testes) e E2E Playwright sem erros de console.
- **Status Phaser:** `READY`.

