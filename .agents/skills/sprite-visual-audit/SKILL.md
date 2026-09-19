---
name: sprite-visual-audit
description: Inspeciona visualmente cada sprite em rougue-like-character-sprites, identifica a ação real, recorta spritesheets, organiza por ação, normaliza frames com segurança, gera manifest e faz segunda revisão. Obrigatória antes de usar um Digimon no Phaser.
---

# Objetivo

Transformar `rougue-like-character-sprites` em assets confiáveis de runtime. Esta skill tem prioridade máxima sobre inferências baseadas em nome de arquivo.

# Regra central

**Cada imagem deve ser aberta e inspecionada visualmente. O nome do arquivo é apenas uma pista.**

Nenhum Digimon pode ser marcado como pronto para o Phaser sem auditoria visual individual + segunda revisão.

# Categorias de ação

Mapeie, quando realmente visível, para:

- `idle`
- `walk_up`
- `walk_down`
- `walk_left`
- `walk_right`
- `walk`
- `attack_basic_1`
- `attack_basic_2`
- `attack_special`
- `hit`
- `death`
- `victory`
- `heal`
- `evolution`
- `interaction`
- `spawn`
- `projectile`
- `effect`
- `portrait`
- `icon`
- `shadow`
- `ui`
- `unknown`

Não invente uma categoria para eliminar `unknown`.

# Fase A — inventário seguro

1. Confirme a pasta real `rougue-like-character-sprites`.
2. Verifique `git status` antes de mover/renomear qualquer asset.
3. Liste PNG/JPG/WEBP e quaisquer spritesheets.
4. Para cada arquivo registre caminho, dimensões, modo/canais, alpha quando detectável e tamanho em bytes.
5. Preserve um mapeamento origem -> destino para todas as alterações.

O script `scripts/inventory_sprites.py` desta skill pode ajudar com metadados, mas **não substitui a inspeção visual**.

# Fase B — inspeção visual arquivo por arquivo

Para CADA imagem:

1. Abra a imagem com a capacidade visual disponível.
2. Identifique o Digimon ou marque como não confirmado.
3. Determine se contém um frame ou vários.
4. Observe pose, movimento, direção, efeito, projétil, UI ou outra função.
5. Verifique transparência/fundo.
6. Verifique bordas cortadas.
7. Verifique padding excessivo ou inconsistente.
8. Verifique pixels de frames vizinhos.
9. Verifique se mais de um personagem aparece no mesmo frame.
10. Verifique escala relativa e ponto de apoio visual dos pés/corpo.
11. Registre nível de confiança: `high`, `medium`, `low`.
12. Em `low`, mande para `_review` e explique a ambiguidade.

# Fase C — spritesheets e recorte

Quando houver vários frames:

- detecte células visualmente, não suponha grid perfeito;
- recorte um frame por arquivo quando o runtime/manifest usar frames individuais;
- nunca deixe dois Digimon diferentes no mesmo PNG individual;
- preserve transparência;
- não corte aura, cauda, projétil integrante da animação ou membros;
- se o canvas precisar ser padronizado para evitar jitter, use canvas comum sem deformar o personagem;
- não faça upscale destrutivo como requisito de runtime; escala visual deve preferencialmente ser controlada no Phaser.

# Fase D — organização

Estrutura alvo, se compatível com o projeto:

```text
rougue-like-character-sprites/<digimon>/
├── idle/
├── walk/up/
├── walk/down/
├── walk/left/
├── walk/right/
├── attacks/basic_1/
├── attacks/basic_2/
├── attacks/special/
├── hit/
├── death/
├── victory/
├── heal/
├── evolution/
├── interaction/
├── projectiles/
├── effects/
├── ui/portrait/
├── ui/abilities/
└── _review/
```

Adapte a estrutura se o projeto já tiver convenção melhor.

Nomes determinísticos:

- `idle_01.png`
- `walk_down_01.png`
- `attack_basic_1_01.png`
- `attack_special_01.png`
- `hit_01.png`
- `death_01.png`

Nunca sobrescreva um arquivo com conteúdo diferente.

# Fase E — manifest

Gere um manifest por Digimon, refletindo **somente arquivos existentes e validados**. O schema de exemplo está em `references/sprite-manifest.example.json`.

O manifest deve permitir configurar:

- root;
- frame/canvas;
- origin;
- escala sugerida;
- hitbox sugerida;
- FPS/repeat quando aplicável;
- arrays ordenados de frames por ação/direção;
- flags de completude;
- itens pendentes.

# Fase F — segunda revisão visual obrigatória

Depois de mover/recortar/renomear:

1. Reabra TODOS os frames organizados do personagem.
2. Confirme pasta/ação.
3. Confirme ordem temporal.
4. Detecte duplicados e frames vazios.
5. Confirme que nenhuma parte foi cortada.
6. Confirme transparência.
7. Compare canvas/origem para evitar jitter.
8. Confirme que os ataques básicos e especial são semanticamente distintos quando os assets permitirem.
9. Se encontrar erro, corrija e repita a revisão afetada.

# Relatório obrigatório

Crie/atualize `docs/digital-path/sprite-audit.md` com:

| Arquivo original | Digimon | Ação | Direção | Frames | Dimensões | Alpha | Confiança | Problema | Destino | Status |
|---|---|---|---|---:|---|---|---|---|---|---|

Status: `validated`, `cropped`, `renamed`, `moved`, `needs-fix`, `ambiguous`, `unusable`.

# Gate para Phaser

Um Digimon só recebe `spriteReady: true` se:

- manifest existe;
- paths existem;
- idle existe;
- movimento mínimo necessário existe;
- `attack_basic_1`, `attack_basic_2`, `attack_special`, `hit` e `death` do estágio MVP foram verificados OU estão explicitamente bloqueados por falta de asset;
- segunda revisão foi concluída;
- nenhuma referência aponta para `_review` como se fosse asset final.
