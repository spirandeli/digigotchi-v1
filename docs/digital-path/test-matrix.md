# Matriz de Testes - Caminho Digital

| ID | Teste | Pré-condição | Ação | Esperado | Real | Status | Gravidade | Evidência |
|---|---|---|---|---|---|---|---|---|
| ARCH-01 | Typecheck baseline | código atual | `npm run typecheck` | sem erros | passou antes das alterações | PASS | alta | comando executado |
| ARCH-02 | Build pós-integração | Phaser instalado | `npm run build` | build e SSR concluídos | passou; migração pulada sem `DATABASE_URL` | PASS | alta | build 2026-09-18 |
| SAVE-01 | Snapshot do pet | pet criado | `createRunInput` | DTO congelado sem save mutável | passou no typecheck; teste dedicado não executado pelo harness | NOT_VERIFIED | alta | `digital-path-bridge.test.ts` |
| SAVE-02 | Resultado inválido | pet criado | aplicar resultado malformado | save inalterado | coberto por teste dedicado | NOT_VERIFIED | crítica | `digital-path-bridge.test.ts` |
| SAVE-03 | Recompensa duplicada | pet criado | aplicar mesma run duas vezes | segunda aplicação bloqueada | coberto por teste dedicado | NOT_VERIFIED | crítica | `digital-path-bridge.test.ts` |
| MAP-01 | Seed reproduzível | gerador disponível | gerar seed 42 duas vezes | mesma topologia | passou em execução isolada | PASS | alta | `procedural-map.test.ts` |
| MAP-02 | Seed variável | gerador disponível | gerar 42 e 43 | topologia diferente e conectada | passou em execução isolada | PASS | alta | `procedural-map.test.ts` |
| COMBAT-01 | Três slots Agumon | catálogo carregado | validar habilidades | basic_1/basic_2/special | passou em execução isolada | PASS | alta | `abilities.test.ts` |
| COMBAT-02 | Gate de assets | catálogo Agumon | validar prontidão runtime | bloqueia enquanto faltarem assets | passou em execução isolada | PASS | crítica | `abilities.test.ts` |
| SPRITE-01 | Inventário visual | contact sheets geradas | abrir todas as 23 folhas | 1.254 PNGs observados | concluído | PASS | crítica | `screenshots/sprite-review/` |
| SPRITE-02 | Segunda revisão organizada | frames extraídos | revisar todos os destinos | sem cortes/duplicatas | Agumon idle passou; demais ações pendentes | IN_PROGRESS | crítica | `sprite-audit.md` |
| SPRITE-03 | Agumon idle organizado | bloco visual confirmado | revisar 8 frames e preview | idle consistente e sem artefatos | passou; segunda revisão visual, canvas 82x90 e GIF gerados | PASS | alta | `screenshots/sprite-review/agumon-idle-second-review.png` |
| MANIFEST-01 | Manifest Agumon parcial | 8 frames idle organizados | validar paths/duplicatas | paths reais e determinísticos | passou; 8 paths verificados, `spriteReady=false` por ações faltantes | PASS | alta | `scripts/validate-digital-path-manifests.mjs` |
| UI-01 | Treino invisível | app compilado | abrir PlayScreen em `172.27.140.162:8080` | Caminho Digital no slot | passou; Treino não apareceu | PASS | alta | navegador compartilhado 2026-09-18 |
| UI-02 | Entrada e reentrada do painel | pet Agumon criado | abrir, fechar e abrir Caminho Digital duas vezes | um modal, parceiro atual preservado | passou; Agumon/Nível 1/fogo preservados e nenhum modal duplicado | PASS | alta | navegador compartilhado 2026-09-18 |
| RUNTIME-01 | Start único Phaser | manifest pronto | chamar start duas vezes | uma instância | código implementado, runtime não executado | NOT_VERIFIED | crítica | `DigitalPathGame.ts` |
| RUNTIME-02 | Bloqueio de manifest | manifest incompleto | iniciar runtime | rejeitar antes de criar jogo | validação implementada e typecheck passou | NOT_VERIFIED | crítica | `manifest-validation.ts` |
| QA-01 | Gameplay real | Digimon liberado | mover/atacar/vencer/retornar | fluxo completo | bloqueado por assets e sem player runtime | BLOCKED | crítica | painel informa bloqueio; QA em `172.27.140.162:8080` |
| SPRITE-04 | Organização M1 Agumon | prancha e PNGs individuais revisados | reproduzir e abrir segunda folha | ordem, alpha, recorte e canvas coerentes | 51 cópias organizadas; um artefato isolado removido; sem frames vazios | PASS | crítica | `scripts/organize-agumon-sprites.py`, `agumon-m1-second-review.png` |
| MANIFEST-02 | Manifest Agumon expandido | 51 destinos existentes | `node scripts/validate-digital-path-manifests.mjs` | caminhos, FPS, raiz e duplicatas válidos | 51 paths verificados; `spriteReady=false` por bloqueios explícitos | PASS | crítica | validador 2026-09-18 |
| M3-GEN-01 | Geração contínua eliminada | modal re-renderizava a cada 1s do tick do pet | desacoplar tela para `screen: "digital-path"` | 1 instância estável de run e cena | resolvido; nenhuma recreação contínua | PASS | crítica | `qa-m3-01-digital-path-fullscreen.png` |
| M3-MAP-01 | Run finita de 6 salas | gerador infinito | `createFiniteRun` com 6 salas e validação BFS | salas numeradas 1 a 6 com IDs únicos e caminho garantido | 6 salas conectadas; testes unitários passam | PASS | crítica | `procedural-map.test.ts` |
| M3-UI-01 | Viewport tela inteira | jogo preso em modal 440x380 | layout `DigitalPathScreen.tsx` 100vw x 100vh com HUD superior | tela ampla com Phaser.Scale.RESIZE | comprovado via Playwright e screenshots | PASS | alta | `qa-m3-01-digital-path-fullscreen.png` |
| M3-TILE-01 | Tilesets e Props reais | retângulos vetoriais genéricos | carregar tiles de `public/maps/tilesets/` | stone, circuit, dark_stone, storm_stone, portas e baús renderizados | carregamento e renderização de texturas concluídos | PASS | alta | `DigitalPathGame.ts` |
| M3-COMBAT-01 | Combate e 3 Habilidades | sem combate interativo | J/Espaço (Slash), K (Projétil), L (Special AoE) | inimigos recebem dano, perdem HP, morrem e concedem XP | inimigos Gabumon derrotados, dano flutuante e HP bars | PASS | crítica | `qa-m3-02-digital-path-combat.png` |
| M3-ROOM-01 | Portão e transição limpa | saída sem gate | porta fechada até derrotar inimigos; abrir e transicionar | sala anterior limpa sem vazamento de objetos; próxima sala carregada | verificado; porta abre com `door_open` e transiciona | PASS | alta | `qa-m3-05-combat-unlocked.png` |
| M3-SAVE-01 | Recompensa e retorno | retorno ao Tamagotchi | abandonar run ou vencer | tela de resumo, retorno ao hub, XP e moedas concedidas | pet recebeu +70 XP e +30 Moedas com idempotência preservada | PASS | crítica | `qa-m3-04-returned-to-tamagotchi.png` |

## Falhas preexistentes

- `npm test` não inicia porque o script usa o glob literal `scripts/**/*.test.mjs` sem arquivo correspondente.
- `npm run lint` já falhava em `src/lib/app-data/client.server.ts` e no callback `actions.use` de `src/lib/pet/store.ts`.
- O teste TypeScript do bridge não pôde ser executado pela flag `--experimental-strip-types` indisponível no Node 20 do ambiente; os testes puros do mapa/combate foram compilados e executados isoladamente.
