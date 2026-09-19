---
name: token-economy
description: >
  Reduz o consumo de tokens durante desenvolvimento, debugging, análise de código,
  assets, sprites, mapas e implementação do roguelike. Use sempre que a tarefa
  envolver explorar o projeto, modificar código, corrigir bugs, analisar arquivos,
  sprites, manifests, mapas ou continuar trabalho de outra sessão/IA.
---

# Token Economy

Objetivo: resolver a tarefa corretamente usando o mínimo possível de contexto,
leituras de arquivos, chamadas de ferramentas e texto de resposta.

## REGRA PRINCIPAL

NÃO explore o projeto inteiro por padrão.

Use sempre:

BUSCAR -> LOCALIZAR -> LER TRECHO -> ALTERAR -> VALIDAR

Nunca:

LER TUDO -> ENTENDER TUDO -> ALTERAR

---

## 1. Leitura econômica

Antes de abrir arquivos:

1. descubra onde provavelmente está o código relevante;
2. use busca por nome, símbolo, classe, função ou texto;
3. abra somente os arquivos encontrados;
4. leia somente os trechos necessários.

Preferir:

* `rg`
* `grep`
* `find`
* `git diff`
* `git status`
* leitura por intervalo de linhas

Evitar:

* `cat` em arquivos grandes;
* listar recursivamente todo o projeto;
* abrir dezenas de arquivos para "entender o contexto";
* reler arquivos que não mudaram.

Arquivos maiores que aproximadamente 250 linhas:

NÃO ler inteiros sem necessidade.

Primeiro localizar:

```bash
rg "nomeDaFuncao|NomeDaClasse|texto" src/
```

Depois ler apenas a região relevante.

---

## 2. Contexto mínimo

Mantenha mentalmente apenas:

* objetivo atual;
* arquivos relevantes;
* decisões já confirmadas;
* alterações feitas;
* próximo passo.

Ignore informações que não afetam a tarefa atual.

Não repita explicações já conhecidas.

Não reanalise decisões já validadas sem evidência de problema.

---

## 3. Continuação de trabalho

Quando existir documentação como:

* `README`
* `final-report.md`
* `test-matrix.md`
* `sprite_manifest.json`
* manifests de assets
* arquivos de estado/progresso

use esses arquivos como fonte de contexto antes de investigar novamente o projeto.

Não refaça validações já documentadas como concluídas, exceto quando código relacionado tiver mudado.

---

## 4. Projeto Roguelike

Este projeto possui muitos assets, sprites e Digimons.

NÃO analisar visualmente todos os assets em cada tarefa.

Prioridade:

1. manifest;
2. nomes de arquivos;
3. estrutura de diretórios;
4. dimensões/metadados;
5. análise visual somente quando realmente necessária.

Se existir `sprite_manifest`, ele deve ser a principal fonte para descobrir:

* animações;
* frames;
* caminhos;
* dimensões;
* estados disponíveis.

---

## 5. Digimons

Ao trabalhar com um Digimon:

NÃO abra assets de outros Digimons.

Limite a análise à pasta do Digimon solicitado.

Somente faça análise global quando a tarefa explicitamente envolver todos eles.

Exemplo:

```text
assets/digimons/Agumon/
```

Se a tarefa for sobre Agumon, ignore Gabumon, Veemon, Flamedramon etc.

---

## 6. Mapas

Assets em diretórios de mapas, incluindo:

```text
sprite_lists_maps/
```

devem ser analisados somente quando a tarefa envolver:

* geração de mapa;
* tiles;
* cenário;
* colisão;
* bioma;
* integração visual;
* carregamento de tilesets.

Não carregue spritesheets de mapa em tarefas relacionadas apenas a personagens, UI ou combate.

---

## 7. Imagens e spritesheets

Antes de abrir uma imagem:

verifique se nome, manifest ou metadados já respondem à pergunta.

Não processe novamente imagens já validadas.

Ao verificar sprites:

* analise somente a animação afetada;
* não revise todas as animações automaticamente;
* não gere descrições longas das imagens;
* registre apenas problemas encontrados.

Para múltiplos PNGs, prefira inspeção automatizada de:

* largura;
* altura;
* transparência;
* quantidade;
* nomes;
* inconsistências.

Análise visual individual somente para arquivos suspeitos.

---

## 8. Busca em código

Nunca abra vários arquivos por tentativa.

Primeiro procure referências.

Exemplo:

```bash
rg "PlayerScene|Agumon|sprite_manifest|Phaser" src/
```

Depois abra os resultados mais relevantes.

Ao procurar uma função:

```bash
rg "functionName|methodName" .
```

Ao procurar uso:

```bash
rg "methodName\(" src/
```

---

## 9. Alterações

Faça mudanças cirúrgicas.

Não reescreva arquivos inteiros quando algumas linhas resolvem.

Não faça:

* refatoração paralela;
* melhorias estéticas não solicitadas;
* renomeações globais;
* reorganização de diretórios;
* mudanças arquiteturais;

a menos que sejam necessárias para completar a tarefa.

---

## 10. Validação

Depois de alterar código, execute primeiro a validação mais barata.

Ordem preferencial:

1. syntax/type check específico;
2. teste relacionado;
3. teste do módulo;
4. build;
5. suíte completa.

Não rode toda a suíte após cada pequena alteração.

Se apenas um módulo mudou, teste esse módulo primeiro.

---

## 11. Git como memória

Use:

```bash
git status --short
git diff --stat
git diff -- arquivo
```

para entender mudanças existentes.

Não releia arquivos inteiros apenas para descobrir o que foi modificado.

Nunca reverta mudanças do usuário sem solicitação.

---

## 12. Evitar loops

Nunca execute repetidamente a mesma estratégia esperando resultado diferente.

Após duas tentativas semelhantes sem sucesso:

1. pare;
2. identifique a hipótese que falhou;
3. mude a estratégia.

---

## 13. Respostas econômicas

Durante execução:

não explique cada comando.

Informe somente quando houver:

* descoberta importante;
* erro importante;
* decisão arquitetural;
* bloqueio;
* conclusão.

Ao terminar, responder preferencialmente:

```text
Concluído.

Alterado:
- arquivo A
- arquivo B

Validado:
- teste X
- build Y

Próximo ponto:
- Z
```

Evite resumos gigantes.

---

## 14. Não imprimir conteúdo desnecessário

Não copie para a conversa:

* arquivos inteiros;
* JSON grande;
* árvores enormes;
* logs completos;
* listas gigantes de assets;
* código que não foi alterado.

Logs:

mostre apenas erro + contexto relevante.

---

## 15. Agrupar operações

Quando possível, faça uma única busca capaz de responder várias perguntas.

Preferir:

```bash
rg "Agumon|Gabumon|sprite_manifest" src assets
```

em vez de várias buscas individuais.

Agrupe leitura de arquivos pequenos relacionados quando isso reduzir chamadas.

---

## 16. Budget de exploração

Para uma tarefa comum, tente permanecer dentro de:

```text
Busca inicial:      1-3 comandos
Arquivos lidos:    1-5
Arquivos alterados: mínimo necessário
Validações:        1-3
```

Esses valores não são limites absolutos.

Exceda somente quando a complexidade exigir.

---

## 17. Escalonamento

Use três níveis.

### Nível 1 — Cirúrgico

Default.

Investigar somente o arquivo ou módulo diretamente relacionado.

### Nível 2 — Módulo

Use quando o problema envolver dependências próximas.

Investigar arquivos relacionados ao mesmo sistema.

### Nível 3 — Projeto

Somente quando houver evidência de problema arquitetural/global ou quando o usuário explicitamente solicitar auditoria completa.

Nunca começar no Nível 3.

---

## 18. Regra para contexto grande

Se uma tarefa começar a exigir análise extensa, crie ou atualize um resumo compacto em:

```text
.gemini/project-state.md
```

Formato máximo recomendado:

```markdown
# Estado atual

Objetivo:
...

Concluído:
- ...

Arquivos relevantes:
- ...

Decisões:
- ...

Problemas:
- ...

Próximo:
- ...
```

Mantenha esse arquivo curto.

Use-o para continuar sessões futuras sem reler o projeto.

Não registre logs ou explicações detalhadas nele.

---

## 19. Tarefas novas

Antes de executar uma tarefa, determine silenciosamente:

```text
O que preciso descobrir?
Qual é o menor conjunto de arquivos capaz de responder isso?
Existe manifest/documentação que já contém a resposta?
Qual é a validação mais barata possível?
```

Somente então use ferramentas.

---

## 20. Proibições

NÃO:

* escanear o repositório inteiro sem motivo;
* analisar todos os Digimons quando apenas um importa;
* abrir todas as imagens;
* reler arquivos sem mudança;
* repetir o prompt do usuário;
* explicar código óbvio;
* gerar planos enormes;
* mostrar raciocínio interno;
* executar testes globais prematuramente;
* corrigir coisas fora do escopo;
* fazer refatorações oportunistas;
* criar documentação não solicitada;
* pesquisar na internet quando o projeto local contém a resposta.

---

# Prioridade final

Sempre otimizar nesta ordem:

1. Correção.
2. Não quebrar funcionalidades existentes.
3. Cumprir exatamente o escopo solicitado.
4. Menor quantidade de arquivos analisados.
5. Menor quantidade de operações.
6. Menor consumo de tokens.
7. Resposta mais curta possível.

Economia de tokens nunca pode justificar uma alteração sem validação suficiente.
