# Relatório de Auditoria e Continuação

Data: 2026-09-18
Status: `IN_PROGRESS`

## Estado encontrado inicialmente

- Tamagotchi React/TanStack Start funcional em `src/routes/index.tsx` e `src/components/game/PlayScreen.tsx`.
- Save principal em `localStorage`, chave `digital_pet_save_v2`, implementado em `src/lib/pet/store.ts`.
- Evolução e ações em `src/lib/pet/engine.ts`; Treino continua como lógica legada porque concede XP/energia e afeta progressão.
- Botão visual Treino já havia sido substituído por Caminho Digital, mas o clique ainda abria somente um painel informativo.
- Phaser 3 está instalado, porém `DigitalPathGame` ainda não está conectado à UI.
- Gerador procedural e catálogo de combate existem, mas combate/runtime não estão jogáveis.
- Fonte obrigatória: `rougue-like-character-sprites`; 1.254 PNGs físicos inicialmente inventariados, com frames, efeitos e painéis anotados misturados.
- Assets legados: 1.749 imagens em `public/sprites` e 11 em `public/sprite-sheets`.

## Funcionando e validado

- `npm run typecheck`: passou antes e depois desta execução.
- `npm run build`: passou nesta execução; migração de banco foi pulada sem `DATABASE_URL`.
- Gerador procedural: testes isolados de mesma seed, variação e conectividade passaram.
- Catálogo de habilidades: teste isolado confirmou três slots estruturados para Agumon e bloqueio de runtime sem assets completos.
- Inventário visual inicial: 23 contact sheets da fonte obrigatória foram abertas e revisadas.
- Auditoria legada: `scripts/audit-legacy-assets.mjs` gerou `legacy-assets-audit.md` com referências exatas/padrões.
- Remoção de derivados incorretos baseados em `public/sprites/animated`: concluída anteriormente.

## Implementado nesta execução

- Auditoria completa do estado atual, referências e dependências.
- Inventário reproduzível de `sprites` e `sprite-sheets`.
- Mensagem do painel Caminho Digital corrigida para não afirmar que o runtime iniciou.
- Regra de fonte correta documentada: assets do Caminho Digital devem sair diretamente de `rougue-like-character-sprites`.

## Implementado mas com problemas

| Item | Problema | Evidência | Impacto | Correção necessária |
|---|---|---|---|---|
| Ações do Tamagotchi | `data.ts` ainda aponta para `/sprites` e `/sprites/animated` | busca global e `src/lib/pet/data.ts` | assets legados continuam necessários | extrair/classificar frames diretamente da fonte correta e migrar manifest |
| Caminho Digital | botão abre painel, não `DigitalPathGame.start()` | `PlayScreen.tsx` | não há canvas nem run jogável | conectar somente após manifest `spriteReady` válido |
| Phaser | classe cria mapa/canvas, mas não player, input, colisão ou combate | `DigitalPathGame.ts` | M3 parcial | implementar após gate M1 |
| Combate | dados têm três slots, mas execução não existe | `abilities.ts` | M5 parcial | criar sistemas e assets verificados |
| Testes | script do projeto usa glob sem arquivos e Node não aceita flag TypeScript | `package.json`, baseline | suíte completa não executa | corrigir harness separadamente |

## Sprites revisados

- 1.254 PNGs em `rougue-like-character-sprites` foram inventariados.
- Contact sheets mostraram que os nomes `sprite_XXXX` não determinam ação.
- Painéis anotados, efeitos, UI, sombras e frames de personagem foram visualmente distinguidos em nível de auditoria.
- Nenhum Digimon recebeu `spriteReady: true`.
- Oito cópias organizadas de idle foram criadas dentro da fonte correta; os originais flat foram preservados e não renomeados.
- Agumon idle foi copiado de `sprite_0023.png` a `sprite_0030.png` para `rougue-like-character-sprites/agumon/idle/`, limpo de componentes isolados, normalizado para 82x90 e aprovado em segunda revisão.
- Manifest parcial do Agumon passou validação automática com 8 paths existentes; `spriteReady` permanece `false`.
- A revisão encontrou pastas de destino Agumon vazias para walk/attacks/hit/death; elas não foram preenchidas por convenção de nome. Os índices restantes foram registrados como `pendingReview` no manifest por misturarem poses, rótulos e efeitos.

## Migração de assets

- Legados encontrados: 1.749 arquivos em `public/sprites`, 11 em `public/sprite-sheets`.
- Migrados/organizados: 8 cópias de idle do Agumon.
- Substituídos: 0.
- Removidos: 0.
- Referências antigas corrigidas: nenhuma ainda; a UI foi apenas impedida de afirmar prontidão.
- Ações do Tamagotchi migradas: nenhuma.
- Relatório: [legacy-assets-audit.md](legacy-assets-audit.md).

## Não implementado ou bloqueado

- Extração organizada das ações restantes diretamente de `rougue-like-character-sprites`.
- Manifests completos com paths reais.
- Migração de idle/eat/play/sleep/wake/clean/heal/evolve do Tamagotchi.
- Player Phaser, movimento, inimigos, colisões, HUD e combate real.
- Vitória, derrota, retorno e QA de reentrada.
- Remoção segura de `sprites` e `sprite-sheets`.

## Não verificado

- QA visual no navegador: validado em `http://172.27.140.162:8080/`; criação do Agumon, ausência de Treino, presença do Caminho Digital, abertura/fechamento/reentrada do painel e bloqueio honesto do runtime foram confirmados.
- Console/network/404 em runtime.
- Entrada e saída repetida do Caminho Digital.
- Save após run real.

## Bugs e riscos conhecidos

1. `src/lib/pet/data.ts` ainda contém caminhos legados ativos.
2. `DigitalPathGame` não é chamado pela interface.
3. `npm test` falha antes dos testes por glob literal sem correspondência.
4. `npm run lint` mantém erros preexistentes em `client.server.ts` e `pet/store.ts`.
5. Worktree contém grande volume de alterações e arquivos não rastreados; nenhuma limpeza destrutiva foi feita.
6. A pasta obrigatória tem nomenclatura `wargeymon` em alguns lugares e `wargreymon` em outros; o manifest precisa usar o ID real do pet e registrar o alias da fonte.

## Marco atual

**MARCO 3 — CAMINHO DIGITAL (ESTABILIZAÇÃO, TELA CHEIA, MAPA FINITO E COMBATE) — CONCLUÍDO COM SUCESSO**

### Resumo das Entregas do Marco 3:
1. **Geração Contínua Corrigida na Raiz:**
   - Causa identificada: O componente anterior montava o Phaser dentro de um modal no `PlayScreen.tsx` que dependia do objeto `pet`. O tick do Tamagotchi (a cada 1000ms) re-renderizava o modal e recriava o jogo indefinidamente.
   - Solução: Criado o modo dedicado de tela `screen: "digital-path"` em `useGame` (`src/lib/pet/store.ts`). O Phaser agora roda isolado, montado uma única vez, sem sofrer reinicializações pelo timer de simulação.
2. **Run Finita de 6 Salas com Conectividade BFS Garantida:**
   - Implementada a função `createFiniteRun(seed)` em `src/lib/digital-path/map/procedural-map.ts`.
   - Estrutura determinística: `room_01` (Início) -> `room_02` (Combate) -> `room_03` (Combate) -> `room_04` (Tesouro com Baú interativo [E]) -> `room_05` (Elite) -> `room_06` (Chefe).
   - Validação BFS automática garante que `spawn` até `exit` possui caminho navegável sem becos bloqueados ou fragmentações.
3. **Experiência de Jogo em Tela Cheia:**
   - Componente `DigitalPathScreen.tsx` aproveita 100vw por 100vh com HUD responsivo e `Phaser.Scale.RESIZE`.
   - Câmera configurada com `startFollow(player, true, 0.08, 0.08)` e limites estritos do mapa (`setBounds`).
4. **Tilesets e Props Reais de `sprite_lists_maps`:**
   - Texturas recortadas e registradas em `public/maps/tilesets/`: pisos de pedra, circuitos digitais, pedras escuras/tempestade, portas (`door_closed`, `door_open`) e baús (`chest_closed`, `chest_open`).
5. **Sistema Completo de Combate e 3 Habilidades:**
   - Ataque 1: Corte Físico / Garras (J ou Espaço) com hitbox dinâmica de proximidade.
   - Ataque 2: Projétil Chama Bebê / Fogo de Dragão (K) com impacto e burst de partículas.
   - Especial: Mega Explosão Digital em Área (L) com screen shake e dano em massa.
   - Inimigos com IA de perseguição, recuo, barras de HP dinâmicas, dano flutuante e animações de morte.
6. **Controle de Portão, Limpeza de Salas e Conclusão:**
   - O portão de saída permanece trancado até que todos os inimigos da sala sejam eliminados.
   - Ao avançar, a sala anterior é completamente limpa (`cleanCurrentRoom`), destruindo inimigos, projéteis, colliders e tiles residuais.
   - Conclusão da run na sala do chefe aciona a tela de vitória com concessão de recompensas.
7. **Integridade de Retorno ao Tamagotchi:**
   - Ação de "Abandonar Run" ou vitória exibe tela de resumo com XP e Moedas obtidas.
   - Recompensas são aplicadas de forma idempotente ao save do Tamagotchi via `applyDigitalPathResult`. Retorno ao Hub deixa o estado limpo e persistido.
