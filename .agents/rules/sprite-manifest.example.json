---
name: skill-tree-progression
description: Implementa e audita árvore de habilidades/progressão por linha evolutiva, separando dados, unlocks, UI e persistência e detectando nós/skills órfãos ou duplicados.
---

# Objetivo

Criar progressão consistente por linha evolutiva sem misturar habilidades entre Digimon/estágios.

# Dependências

- dados de Digimon validados;
- `roguelike-combat-abilities` para abilities executáveis;
- `save-runstate-integrity` para persistência permanente, quando aplicável.

# Procedimento

1. Modele uma árvore/grafo por linha evolutiva.
2. Cada nó deve ter ID, Digimon, estágio, requisitos e referência às habilidades.
3. Separe dados do grafo da UI.
4. Separe regra de desbloqueio da execução de combate.
5. Valide IDs únicos.
6. Detecte nós órfãos/inacessíveis.
7. Detecte habilidade de linha errada.
8. Detecte estágio sem 3 habilidades obrigatórias.
9. Interface deve distinguir locked/unlocked/available.
10. Evolução do Tamagotchi deve atualizar corretamente o conjunto acessível sem duplicar estado.

# Validações automáticas

Falhar quando houver:

- node sem ID;
- ability inexistente;
- ability duplicada indevida;
- estágio sem basic1/basic2/special;
- requisito impossível;
- nó inacessível não intencional;
- referência a Digimon inexistente.

# Critério de aceite

A árvore exibida e os dados executáveis devem apontar para as mesmas abilities; não pode existir habilidade apenas “desenhada” na UI.
