---
name: tamagotchi-digital-path-integration
description: Substitui com segurança o botão Treino por Caminho Digital, preserva compatibilidade do Tamagotchi e cria a ponte de entrada/saída sem duplicar o Digimon ou corromper o save.
---

# Objetivo

Integrar o Caminho Digital ao shell real do Tamagotchi.

# Dependência

Use depois de `project-architecture-audit`.

# Procedimento

1. Localize o botão Treino real e seus listeners.
2. Mapeie efeitos colaterais do treino em atributos/evolução/save.
3. Remova **somente o ponto de entrada visual** de Treino inicialmente.
4. Coloque `Caminho Digital` no mesmo contexto visual, preservando layout, responsividade e acessibilidade.
5. Crie um handler único para abrir o modo roguelike.
6. Valide se existe Digimon atual válido.
7. Gere um snapshot/DTO de entrada da run, não uma cópia concorrente do save inteiro.
8. Esconda/pausa a UI principal apenas pelo tempo necessário.
9. Crie ou reutilize exatamente uma instância Phaser.
10. Ao sair, destrua/pare a instância conforme arquitetura, restaure a UI e o foco.
11. Garanta que reentradas não dupliquem canvas, listeners ou timers.
12. Preserve código legado de treino se ainda for dependência interna; marque para remoção posterior somente com prova.

# Contrato recomendado

```js
const runInput = TamagotchiBridge.createRunInput(tamagotchiState)
DigitalPath.start(runInput)

// ao concluir
TamagotchiBridge.applyRunResult(runResult)
DigitalPath.stop()
```

# Regras

- O Digimon do Tamagotchi é a fonte de verdade de identidade.
- Não criar seleção de personagem separada para o MVP.
- Não criar save paralelo permanente do Digimon.
- Não alterar necessidades/atributos permanentes no meio da run sem regra explícita.
- Não conceder recompensa antes de finalizar a run de forma idempotente.

# Critérios de aceite

- Treino não está visível.
- Caminho Digital está visível no lugar apropriado.
- Clique abre o roguelike.
- Digimon correto é passado.
- Retorno restaura o Tamagotchi.
- Save continua legível após entrar/sair várias vezes.
- Uma única instância/canvas/listener set permanece ativo.
