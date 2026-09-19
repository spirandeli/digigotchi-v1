---
name: roguelike-combat-abilities
description: Implementa combate Phaser do Caminho Digital com vida, dano, defesa, hitboxes, dois básicos e um especial por estágio, cooldown sem mana, VFX e validação de dados.
---

# Objetivo

Implementar combate legível e data-driven.

# Regra estrutural

Cada estágio utilizável no MVP possui exatamente:

1. `basic_1`
2. `basic_2`
3. `special`

Os básicos têm cooldown menor que o especial. Não existe mana.

# Dados mínimos da habilidade

- id único;
- nome;
- descrição;
- Digimon;
- estágio;
- linha evolutiva;
- tipo;
- elemento quando aplicável;
- dano/fórmula;
- alcance;
- área;
- cooldown;
- animação;
- VFX;
- ícone;
- som opcional;
- requisitos.

# Procedimento

1. Separe dados, execução, cooldown, dano, animação e UI.
2. Valide schema dos dados antes de iniciar a run.
3. Rejeite IDs duplicados e estágio sem os 3 slots.
4. Faça cooldown usar relógio consistente do Phaser/runtime.
5. Bloqueie reuso durante cooldown.
6. Não permita cooldown negativo.
7. Crie ataque melee/projétil/AOE apenas conforme dados.
8. Separe hitbox visual da hurtbox quando necessário.
9. Implemente feedback de acerto, dano recebido e morte.
10. Garanta que morrer finalize/desabilite input sem executar ataques residuais.
11. Limpe projéteis/timers/eventos ao mudar de sala ou sair da run.

# Controles sugeridos

- movimento: WASD/setas;
- basic 1: `1` ou `J`;
- basic 2: `2` ou `K`;
- especial: `3` ou `L`;
- interação: `E`;
- pausa: `ESC`.

Adapte se o projeto já possui controles.

# Testes

- cada habilidade executa;
- dano ocorre uma vez conforme regra;
- cooldown começa e termina;
- spam é bloqueado;
- especial tem cooldown maior;
- inimigo pode morrer;
- player pode morrer;
- colisão não acerta através de parede quando a habilidade não permite;
- estado reseta corretamente numa nova run.
