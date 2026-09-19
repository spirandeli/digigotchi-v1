---
name: digimon-content-research
description: Pesquisa e classifica dados de Digimon usados no jogo, separando fonte oficial, wiki, adaptação de gameplay e criação original; valida nome, estágio, linha e ataques antes de cadastrar conteúdo.
---

# Objetivo

Evitar conteúdo atribuído ao Digimon errado e deixar explícito o que é oficial versus adaptação de gameplay.

# Fontes prioritárias

1. `https://digimon.net/reference_en/`
2. `https://wikimon.net/`
3. `https://digimon.fandom.com/`

# Procedimento por Digimon

1. Confirme grafia.
2. Confirme estágio/nível evolutivo quando disponível.
3. Confirme linha/evoluções relevantes ao projeto.
4. Confirme características visuais necessárias para reconhecer sprites.
5. Pesquise ataques conhecidos.
6. Compare com os três slots exigidos pelo gameplay.
7. Se adaptar um ataque, marque `gameplay_adaptation`.
8. Se criar algo original, marque `original_game_content`.
9. Nunca rotule wiki como oficial automaticamente.
10. Registre URL/fonte/data no relatório de conteúdo.

# Saída recomendada

```js
{
  id: '...',
  name: '...',
  stage: '...',
  evolutionLine: '...',
  abilities: [...],
  provenance: {
    name: 'official',
    stage: 'official|wiki|unconfirmed',
    abilities: [{ id: '...', sourceType: 'official|wiki|gameplay_adaptation|original_game_content' }]
  }
}
```

# Regras

- Não copiar textos extensos das fontes.
- Não inventar confirmação oficial.
- Divergências devem aparecer no relatório, não ser silenciosamente resolvidas.
