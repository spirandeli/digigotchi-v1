# Revisão das sprites e organização de animações

## Resumo executado
Foi feita uma auditoria dos diretórios de animações em `public/sprites/animated` para validar a estrutura dos arquivos por espécie e ação.

### Resultado observado
- A organização por espécie e por ação está consistente na maioria dos Digimon.
- Exemplos válidos: `agumon/idle`, `agumon/eat`, `gabumon/attack-blue-blaster`, `veemon/attack-vee-headbutt`, etc.
- Os nomes de pastas observados estão alinhados com as ações do jogo: `idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolve`, `attack-*`.
- O caso de `xvmon` tem uma variação específica: há `attack` e `attack-vee-laser`, além de `jump`, o que é aceitável, mas precisa manter um padrão documental para evitar confusão entre ataque genérico e ataque especial.

### O que pode estar causando o problema "idle em dormir"
Não houve indício de a pasta física estar na pasta errada. A evidência sugere que o problema é mais provável do tipo:
1. mapeamento de ação incorreto no código;
2. nome de pasta inconsistente entre espécies;
3. sprite visualmente semelhante sendo usado por ação errada;
4. fallback ou contagem de frames divergindo de um estado em outro.

Em outras palavras, a estrutura em disco está organizada, mas ainda precisa de uma revisão visual cruzada para confirmar que cada pasta realmente corresponde à pose correta, e não apenas ao nome esperado.

## Checklist de revisão visual obrigatória
Para cada espécie, validar:
- `idle` não está sendo usado como `sleep`;
- `sleep` não está usando uma `idle` ou `wake` trocada;
- `wake` não é apenas um frame inicial da idle;
- `attack-*` realmente começa em charge/anticipation e não em execução completa;
- `evolve` não reutiliza frames de `heal`/`clean` por engano;
- `play`, `eat`, `heal` e `clean` têm pose inicial e final visíveis.

## Recomendação final
O próximo passo é uma checagem visual por espécie com uma planilha simples:
- espécie;
- pasta;
- ação;
- resultado: correto / corrigir / renomear / duplicar / remover;
- observação: frame inicial, frame final, pose e timing.

Essas verificações devem ser feitas antes de qualquer nova geração automatizada de VFX, para não repetir sprites em ações erradas.
