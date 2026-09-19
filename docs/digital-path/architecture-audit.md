# Auditoria de Arquitetura - Caminho Digital

Status geral: `DONE` para a FASE 0. A integração Phaser permanece `TODO`.

## Stack e execução

- Aplicação React 19 com TanStack Start/Router, Vite 8 e Tailwind CSS 4.
- Módulos TypeScript/TSX com alias `@/` configurado pelo Vite/tsconfig.
- Entrada de rota: `src/routes/index.tsx`.
- Shell/documento: `src/routes/__root.tsx`.
- Router: `src/router.tsx`, com `defaultErrorComponent`.
- CSS global: `src/styles.css`.
- Desenvolvimento: `npm run dev`, servido em `0.0.0.0:8080`.
- Build: `npm run build`; a migração de banco é opcional e foi pulada porque `DATABASE_URL` não está definido.
- Persistência do pet é local no navegador; não há necessidade de banco para o Caminho Digital neste momento.

## Módulos relevantes

| Responsabilidade | Arquivo | Situação |
|---|---|---|
| Roteamento da tela principal | `src/routes/index.tsx` | confirmado |
| Tela inicial | `src/components/game/StartScreen.tsx` | confirmado |
| Escolha da linha | `src/components/game/ChooseScreen.tsx` | confirmado |
| Tela principal do pet e ações | `src/components/game/PlayScreen.tsx` | confirmado |
| Estado global e persistência | `src/lib/pet/store.ts` | confirmado |
| Regras, evolução e ações | `src/lib/pet/engine.ts` | confirmado |
| Dados de linhas, evolução e sprites | `src/lib/pet/data.ts` | confirmado |
| Habilidades atuais de treino | `src/lib/pet/skills.ts` | confirmado |
| Áudio do pet | `src/lib/pet/audio.ts` | confirmado |
| Configuração de build/dev | `vite.config.ts`, `package.json` | confirmado |

## Funcionamento do Tamagotchi

`index.tsx` lê `useGame((s) => s.screen)` e alterna entre `StartScreen`, `ChooseScreen` e `PlayScreen`. A escolha de uma linha cria um `PetState`; a tela de jogo inicia um tick a cada segundo, simula a passagem do tempo, renderiza o Digimon atual e dispara ações por `actions`.

O pet atual é a propriedade `pet` do store Zustand. A identidade jogável é composta por `lineId`, `speciesId`, `evolutionStage`, `nickname`, atributos, nível e inventário. A forma exibida é calculada por `currentName`/`currentSprite`, usando a evolução correspondente quando desbloqueada.

## Save/load

- Chave atual: `digital_pet_save_v2`, definida em `src/lib/pet/data.ts`.
- `src/lib/pet/store.ts` serializa o `PetState` diretamente em `localStorage`.
- `continueSave()` carrega JSON, aplica `simulateTime()` e grava novamente.
- `reset()` remove a chave.
- Falhas de leitura/parsing retornam `null`, sem migração, schema validation ou versão explícita no payload.
- O estado temporário de UI (`screen`, `panel`, `speech`, `anim`, `busyUntil`) não é persistido.

Risco: saves antigos/corrompidos podem ser aceitos como `PetState` sem validação estrutural. O bridge do Caminho Digital deverá receber um snapshot validado e aplicar apenas um resultado idempotente, sem salvar o `RunState` inteiro.

## Evolução

`src/lib/pet/engine.ts` implementa `tryEvolve()`. A linha é obtida por `lineId`; o próximo estágio depende de nível, felicidade e saúde. Em caso de sucesso, o engine atualiza `evolutionStage`, `speciesId`, `nickname` e XP. `PlayScreen` lista a evolução e chama `actions.evolve()`.

As linhas atuais são Agumon, Etemon, Gabumon e Veemon, com formas posteriores definidas em `LINES`. As habilidades atuais são uma por `speciesId` em `src/lib/pet/skills.ts`; isso atende ao treino do pet, mas ainda não atende ao contrato futuro de três habilidades de combate por estágio.

## Treino: botão, listeners e dependências

- O botão visual está em `src/components/game/PlayScreen.tsx`, no `nav` de ações, como `Action` com `Dumbbell`, label `Treinar` e `onClick={() => setPanel("training")}`.
- O painel é exibido quando `panel === "training"` e contém o botão `TREINAR`.
- O botão do painel chama `actions.train()`.
- `actions.train()` chama `useGame.getState().apply(trainSkill)`.
- `trainSkill()` em `src/lib/pet/engine.ts` valida sono/energia, consome energia, concede XP/moedas e dispara animação/áudio.
- Não há listener DOM externo nem rota separada para Treino.
- O treino influencia diretamente nível/XP, portanto não pode ser removido sem decidir a substituição de progressão.

## Sprites atuais

- Pasta obrigatória encontrada: `rougue-like-character-sprites/`.
- 12 diretórios: `agumon`, `etemon`, `flamedramon`, `gabumon`, `garurumon`, `geogreymon`, `kingetemon`, `metaletemon`, `veemon`, `wargeymon`, `weregarurumon`, `xvmon`.
- Inventário inicial: 1.254 PNGs, aproximadamente 55,4 MB.
- Arquivos estão majoritariamente diretamente na pasta do personagem, sem organização por ação/direção e sem manifest por personagem encontrado nesta auditoria.
- Dimensões são heterogêneas, variando de sprites pequenos a imagens grandes; há transparência/alpha candidata nos 12 diretórios.
- Ação, direção, frame, recorte, padding e semântica ainda não foram validados visualmente arquivo a arquivo.
- Nenhum sprite pode receber `spriteReady: true` ou entrar no Phaser antes da Skill `sprite-visual-audit`, com inspeção individual e segunda revisão.

O worktree já contém muitas modificações e arquivos não rastreados em assets, `public/` e `.vercel/`. Por isso, nenhum sprite foi movido, renomeado ou sobrescrito nesta fase.

## Dependências

- Phaser não está declarado em `package.json` e não foi encontrado nos lockfiles.
- A integração deverá adicionar uma única dependência Phaser 3 somente após a arquitetura e o primeiro Digimon auditado definirem o ponto de entrada.
- O projeto já possui React/TanStack; o requisito HTML/CSS/JavaScript deve ser interpretado dentro da stack existente, sem reescrita para uma aplicação HTML isolada.

## Baseline antes das alterações

- `npm run typecheck`: passou.
- `npm run build`: passou; `db:migrate` foi pulado por ausência de `DATABASE_URL`.
- `npm test`: bloqueado antes da execução porque o script usa o glob literal `scripts/**/*.test.mjs`, que não encontra arquivos nesse ambiente.
- `npm run lint`: falhou com erros preexistentes em `src/lib/app-data/client.server.ts` (bloco vazio) e `src/lib/pet/store.ts` (regra de Hooks no callback `actions.use`); também há dois avisos.

## Riscos de integração

1. Worktree sujo com grande quantidade de alterações de usuário/geradas: movimentação destrutiva de assets pode perder trabalho.
2. Save sem validação de schema, migração ou transação; entrada e resultado do roguelike precisam ser isolados.
3. `useGame` mistura estado persistente, timers, animações e UI; entrada/saída do Phaser precisa limpar listeners, timers e instância.
4. A aplicação atual usa imagens/frame paths do `public/`, enquanto a pasta obrigatória de sprites ainda não tem manifest nem runtime mapping confiável.
5. `SPRITE_ANIMATIONS` gera caminhos por contagem fixa; isso pode referenciar arquivos inexistentes ou classificar semanticamente ações erradas.
6. A evolução altera `speciesId`; o player do roguelike deverá ser derivado desse valor no momento de iniciar a run, sem cópia independente do Digimon.
7. O lint e a suíte de testes já têm falhas, então cada fase deverá usar validações focadas além da baseline.

## Arquivos provavelmente afetados

Primeiro conjunto provável, ainda sem alteração nesta fase:

- `src/components/game/PlayScreen.tsx` - substituir o ponto de entrada visual e montar/desmontar o shell do Caminho Digital.
- `src/lib/pet/store.ts` - expor snapshot/retorno de run sem duplicar o save.
- `src/lib/pet/engine.ts` - compartilhar validação e aplicar resultados permitidos.
- `src/lib/pet/data.ts` e/ou novos módulos de dados - manifest e dados do roguelike.
- `src/lib/pet/skills.ts` - somente se o contrato de combate exigir extensão compatível.
- `src/styles.css` - container responsivo do canvas, se necessário.
- novos módulos `src/lib/digital-path/` - bridge, RunState, runtime Phaser, mapa e combate.
- `package.json` e lockfile - adicionar Phaser 3, após confirmar a integração.
- `docs/digital-path/` - auditoria de sprites, manifests, status e matriz de testes.

## Primeira sequência de implementação

1. `IN_PROGRESS`: concluir inventário e auditoria visual individual de todos os PNGs, sem inferir ação pelo nome.
2. `TODO`: gerar relatório `sprite-audit.md`, organizar somente assets confirmados e criar manifests refletindo arquivos reais.
3. `TODO`: fazer segunda revisão visual dos frames organizados e marcar explicitamente bloqueios de cada Digimon.
4. `TODO`: definir o contrato de `TamagotchiBridge`/`RunState` e testes de entrada, saída, derrota, vitória e save idempotente.
5. `TODO`: adicionar Phaser 3 e implementar uma cena mínima apenas com um Digimon cujo gate visual esteja `DONE`.
6. `TODO`: substituir visualmente Treino por Caminho Digital, preservando `trainSkill` até a nova progressão estar coberta.
7. `TODO`: implementar mapa reproduzível, movimento, combate, HUD, retorno e QA desktop/mobile.
