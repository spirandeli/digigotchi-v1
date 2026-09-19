---
name: visual-gameplay-qa
description: Executa QA visual e funcional no jogo real: sprite por sprite em runtime, animações, escala, hitbox, HUD, combate, mapa, mobile, reentrada, console e matriz de testes com evidências.
---

# Objetivo

Validar o jogo executando o fluxo real. Existência de arquivo/função não é evidência suficiente.

# Procedimento de runtime por Digimon

1. Inicie o projeto pelo comando real.
2. Abra Tamagotchi e confirme Digimon atual.
3. Clique Caminho Digital.
4. Observe preload e console.
5. Verifique idle.
6. Mova em todas as direções implementadas.
7. Execute basic 1.
8. Execute basic 2.
9. Execute special.
10. Receba dano.
11. Teste morte.
12. Verifique escala/origin/hitbox em movimento e combate.
13. Compare visual da animação com a semântica da ação.
14. Teste vitória/derrota/retorno.
15. Entre e saia repetidamente.

# Regressão de sprite

Se um frame parecer semanticamente errado:

- volte para `sprite-visual-audit`;
- corrija pasta/ordem/manifest;
- repita o teste afetado.

# Mapa e combate

Teste seeds conhecidas e novas, colisões, portas, obstáculos, spawn, saída, inimigos, cooldowns e projéteis.

# UI

Verifique:

- botão Caminho Digital;
- ausência visual do Treino;
- HUD;
- cooldown;
- vida;
- legibilidade;
- foco/teclado;
- touch quando aplicável;
- responsividade;
- canvas fora de tela;
- overlays presos após retorno.

# Saída

Atualize `docs/digital-path/test-matrix.md`:

| ID | Teste | Pré-condição | Ação | Esperado | Real | Status | Gravidade | Evidência |
|---|---|---|---|---|---|---|---|---|

Status: `PASS`, `FAIL`, `BLOCKED`, `NOT_VERIFIED`.

# Regra

Nunca converter `NOT_VERIFIED` em `PASS` por inferência.
