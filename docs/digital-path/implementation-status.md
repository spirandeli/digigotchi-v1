# Status de Implementação - Caminho Digital

Atualizado após a FASE 0 e a primeira fatia de integração.

| Área | Status | Evidência |
|---|---|---|
| Auditoria arquitetural | `DONE` | `architecture-audit.md` |
| Baseline typecheck/build | `DONE` | `npm run typecheck` e `npm run build` passaram antes e depois da fatia; build pós-Phaser passou |
| Baseline de testes | `BLOCKED` | `npm test` para no glob literal `scripts/**/*.test.mjs` |
| Baseline lint | `NEEDS_REVIEW` | erros preexistentes em `client.server.ts` e `pet/store.ts` |
| Inventário de sprites | `DONE` | 1.254 PNGs em 12 personagens; 23 contact sheets revisadas |
| Classificação visual | `IN_PROGRESS` | 51 frames do Agumon confirmados; vertical/special e demais Digimon ainda em revisão |
| Segunda revisão de frames organizados | `IN_PROGRESS` | 51 cópias do Agumon passaram em revisão visual; M1 só termina quando lacunas críticas forem resolvidas |
| Manifests | `IN_PROGRESS` | Agumon possui manifest parcial validado com 51 paths; `spriteReady: false` |
| Contrato Tamagotchi -> run | `DONE` | `src/lib/pet/digital-path-bridge.ts` |
| Idempotência de resultado | `DONE` | ledger opcional `digitalPathResults` e validação de limites |
| Store bridge | `DONE` | `createDigitalPathRunInput` e `applyDigitalPathResult` |
| Substituição visual Treino -> Caminho Digital | `DONE` | `PlayScreen.tsx` |
| Phaser 3 | `BLOCKED` | dependência instalada; lifecycle implementado, mas Agumon ainda não possui manifest completo |
| Mapa procedural | `DONE` | gerador determinístico com salas, corredores e flood-fill validável |
| Combate | `IN_PROGRESS` | catálogo Agumon com três slots e cooldowns; animações obrigatórias bloqueadas até extração direta da fonte correta |
| QA visual no jogo | `BLOCKED` | não iniciar antes do primeiro Digimon passar o gate |

## O que está funcionando

- A aplicação continua compilando.
- O botão visual Treino foi substituído por Caminho Digital.
- O painel de entrada identifica o mesmo Digimon atual usado pelo Tamagotchi.
- O snapshot da run é separado e congelado.
- Resultados inválidos não alteram o save.
- A mesma recompensa não pode ser aplicada duas vezes pelo mesmo `runId`.
- O treino legado continua implementado para não quebrar a progressão enquanto a nova progressão não existe.

## Bloqueador atual

Os sprites em `rougue-like-character-sprites` são arquivos flat e misturam personagens, efeitos, projéteis, UI e painéis anotados. A inspeção visual confirmou material suficiente para uma futura organização, mas ainda não há uma sequência individualmente extraída e revisada diretamente dessa pasta que forneça, para um estágio, idle, movimento, dois básicos, especial, hit e death. Os derivados gerados anteriormente a partir de `public/sprites/animated` foram descartados por usarem a fonte errada. Integrar Phaser agora exigiria inventar ações ou usar fallback silencioso, o que viola os gates do projeto.

## Próxima ação segura

Agumon agora tem idle, caminhada lateral, dois básicos, hit, death, vitória, cura, projétil e efeito organizados diretamente da fonte correta. A próxima extração segura deve procurar somente `walk_up`, `walk_down` e uma sequência corporal de `attack_special`; caso não existam, a ausência deve ser registrada antes de adaptar o design de movimento/combate.
