# PROGRESSO — DIGIGOTCHI ROGUELIKE 2D

## Marco Atual
**MARCO 3 — CONCLUÍDO**

## Entregas Realizadas
- [x] Correção da causa raiz da geração infinita de mapas (isolamento em `screen: "digital-path"`).
- [x] Conversão de masmorra infinita em run finita de 6 salas com IDs únicos e BFS garantido.
- [x] Transformação da viewport do modal minúsculo (440x380) para tela inteira (100vw x 100vh com `Phaser.Scale.RESIZE`).
- [x] Integração de tilesets reais em `public/maps/tilesets/` (pedra, circuitos, portas animadas/destrancadas, baús).
- [x] 3 Habilidades jogáveis (Ataque 1 [J/Espaço], Ataque 2 Projétil [K], Especial AoE [L]).
- [x] Inimigos com IA de perseguição e recuo, barras dinâmicas de HP, dano e morte.
- [x] Portão condicional de saída (trancado até eliminar inimigos da sala).
- [x] Destruição e limpeza completa de salas anteriores entre transições (`cleanCurrentRoom`).
- [x] Retorno seguro e idempotente ao Tamagotchi com concessão de XP e moedas ao pet.
- [x] 69/69 testes unitários passando.
- [x] Typecheck e Build de produção passando sem erros.
- [x] Validação visual via Playwright headless com screenshots gravadas.
