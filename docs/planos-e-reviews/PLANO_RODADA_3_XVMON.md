# RODADA 3 — TROCA COMPLETA DOS SPRITES DO XV-MON

## O que foi feito

- Todos os sprites do `xvmon` passaram a usar a **nova sheet enviada pelo usuário**.
- As pastas atualizadas foram:
  - `public/sprites/animated/xvmon/*`
  - `public/sprites/keyframes/xvmon/*`
  - `public/sprites/xvmon.png`
- Ajustei a escala visual do XV-mon em `src/lib/pet/data.ts` para reduzir o tamanho em tela e manter consistência com as outras gerações.
- Foi aplicada uma limpeza automática de fundo para extrair os sprites da sheet cinza clara.

## Observações importantes

- A nova sheet é muito melhor para poses de combate, corrida e poder.
- Algumas ações utilitárias do jogo (`eat`, `clean`, `heal`, `sleep`) foram remontadas reaproveitando as poses da nova sheet, já que ela não traz um quadro específico para todas essas ações.
- O objetivo desta rodada foi garantir que **todo o conjunto visual do XV-mon** fique coerente com o novo material.

## Próxima melhoria sugerida

- Fazer uma rodada 4 de refinamento manual quadro a quadro para utilidades (`sleep`, `eat`, `clean`, `heal`) se você quiser fidelidade máxima em cada ação.
- Separar efeitos visuais em camadas próprias para o ataque, para deixar os FX ainda mais modernos e menos acoplados ao corpo do sprite.
