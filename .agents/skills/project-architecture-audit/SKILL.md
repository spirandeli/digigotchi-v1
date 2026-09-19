---
name: project-architecture-audit
description: Audita a estrutura real do Tamagotchi antes de qualquer alteração: stack, entrypoints, save/load, evolução, botão Treino, assets, Phaser e riscos de integração. Use sempre no início ou quando a arquitetura mudar.
---

# Objetivo

Entender o projeto real antes de implementar o Caminho Digital. Esta skill é **bloqueante**: nenhuma refatoração estrutural, integração Phaser ou alteração do save deve começar sem esta auditoria.

# Entradas

- Repositório atual.
- `package.json`, HTML, CSS e JavaScript existentes.
- Estrutura de assets.
- Estado/save do Tamagotchi.
- Implementação atual de treino/evolução.

# Procedimento obrigatório

1. Liste a árvore relevante do projeto, evitando pastas geradas como `node_modules`, `dist`, `build` e caches.
2. Identifique stack, bundler, módulos ES, scripts npm, ponto de entrada e forma de execução local.
3. Localize o HTML principal, CSS principal e JavaScript que inicializa o Tamagotchi.
4. Localize a fonte de verdade do Digimon atual.
5. Localize save/load/reset, formato persistido, versionamento e compatibilidade com saves antigos.
6. Localize evolução, atributos, habilidades e quaisquer dependências da antiga ação de Treino.
7. Localize o botão Treino e todos os listeners/funções associados.
8. Localize `rougue-like-character-sprites` exatamente com esse nome e inventarie sua estrutura superficial.
9. Verifique se Phaser já é dependência e qual versão está instalada. Não instale outra cópia sem necessidade.
10. Execute os testes/build/lint existentes antes das mudanças, quando disponíveis, para separar problemas preexistentes de regressões.
11. Registre riscos: estado global, listeners duplicáveis, save sem versão, paths frágeis, imports quebrados, assets órfãos, dependência do treino para evolução etc.

# Regras de bloqueio

- Não reescrever o projeto por conveniência.
- Não remover código de treino antes de provar que não possui dependências.
- Não assumir formato de save pelo nome dos arquivos.
- Não declarar Phaser integrado apenas porque a dependência existe.
- Não avançar para mudanças destrutivas se `git status` revelar arquivos do usuário em risco sem primeiro preservar essas mudanças.

# Saída obrigatória

Produza `docs/digital-path/architecture-audit.md` ou equivalente contendo:

- stack e comandos de execução;
- entrypoints;
- mapa dos módulos relevantes;
- fluxo de estado do Tamagotchi;
- save/load;
- fluxo do Treino;
- localização dos sprites;
- problemas já existentes;
- riscos de integração;
- lista inicial de arquivos que provavelmente serão alterados.

Use status: `TODO`, `IN_PROGRESS`, `BLOCKED`, `NEEDS_REVIEW`, `DONE`.

# Critério de conclusão

A skill termina somente quando o agente consegue responder, com caminhos reais de arquivo: **onde o Tamagotchi inicia, onde o Digimon atual vive, como é salvo, onde Treino é acionado e onde o Caminho Digital deve se conectar**.
