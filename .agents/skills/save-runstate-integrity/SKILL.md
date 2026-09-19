---
name: save-runstate-integrity
description: Protege o save do Tamagotchi e separa estado persistente do RunState temporário, aplicando resultados do roguelike de forma validada e idempotente, inclusive com saves antigos/corrompidos.
---

# Objetivo

Garantir que o Caminho Digital nunca se torne uma segunda fonte de verdade do Digimon nem corrompa o Tamagotchi.

# Separação obrigatória

## Persistente

- identidade do Digimon;
- estágio/evolução;
- progresso permanente explicitamente permitido;
- unlocks permanentes;
- configurações;
- versão do save.

## RunState temporário

- seed;
- sala atual;
- vida da run;
- cooldowns;
- buffs temporários;
- inimigos derrotados;
- loot pendente;
- modificadores temporários.

# Procedimento

1. Descubra o schema real atual do save.
2. Introduza versionamento/migração apenas se necessário e de forma retrocompatível.
3. `createRunInput` deve extrair somente dados necessários.
4. O runtime Phaser não deve receber referência mutável ao save inteiro.
5. `applyRunResult` deve validar o resultado antes de persistir.
6. Aplique recompensa uma única vez usando run/result ID ou mecanismo equivalente quando houver risco de repetição.
7. Trate derrota, vitória e abandono explicitamente.
8. Trate save inexistente e campos legados.
9. Em save corrompido, falhe de forma recuperável e não sobrescreva cegamente.
10. Grave de maneira atômica quando a API de storage permitir padrão temporário/validação.

# Contrato de resultado

Use `references/run-result.example.json` como referência conceitual e adapte ao schema real.

# Testes obrigatórios

- entrada sem save;
- save antigo;
- save parcialmente inválido;
- vitória;
- derrota;
- abandono;
- reload após resultado;
- aplicar mesmo resultado duas vezes;
- evolução antes/depois da run;
- trocar Digimon;
- entrar/sair repetidamente.

# Critério de aceite

O mesmo save do Tamagotchi continua sendo a fonte de verdade e nenhum teste produz duplicação de recompensa ou regressão de identidade/evolução.
