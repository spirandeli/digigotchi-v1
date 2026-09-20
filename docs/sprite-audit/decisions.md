# Registro Histórico de Decisões de Auditoria de Sprites (Decision Log)

Data: 2026-09-20 17:22:32
Referência Canônica: **Veemon (GOLDEN REFERENCE - ESTRITAMENTE SOMENTE LEITURA)**

---

## 1. Princípios Globais de Decisão

1. **Imunidade do Veemon**: O Veemon é a implementação funcional de referência e jamais deve ter qualquer arquivo movido, renomeado, recortado ou modificado.
2. **Preservação de Fontes Originais**: Todas as pastas `_raw/` e `spritesheets/` são tratadas como imutáveis e fontes de proveniência rastreável.
3. **Classificação Não-Destrutiva**: Nenhuma spritesheet foi recortada cegamente nesta primeira passagem de auditoria; todos os assets foram inventariados e classificados por integridade física e semântica.
4. **Separação de Modos**:
   - O Tamagotchi consome ações de cuidado virtual (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`, ataque assinatura).
   - O Roguelike (Caminho Digital / Phaser) consome o contrato do manifest (`idle`, `walk_down/up/left/right`, `attack_basic_1`, `attack_basic_2`, `attack_special`, `hit`, `death`, `victory`, projéteis e VFX).

---

## 2. Decisões Estruturais por Personagem

### DEC-001: Agumon — Validação de Movimentação 2-Way
- **Classificação**: `PARTIAL` (Pronto para Roguelike 2-way e Tamagotchi completo).
- **Evidências**:
  - `idle`: 9 frames originais validados em canvas 96x96.
  - `walk/left` (11 frames) e `walk/right` (10 frames) completos e validados.
  - `attacks/basic_1` (6 frames), `attacks/basic_2` (4 frames), `attacks/special` (3 frames) montados e verificados.
  - `hit` (1 frame), `death` (1 frame), `victory` (1 frame) validados.
  - `walk/down` e `walk/up` contêm `.gitkeep` (movimentação vertical resolvida por fallback lateral no manifest).
- **Decisão**: Manter Agumon como apto para runtime (`spriteReady: true` em modo 2-way) e listar `walk/down` e `walk_up` como ações secundárias pendentes para 4-way futuro.

### DEC-002: Identificação do Padrão de Duplicação em Massa do Tamagotchi
- **Personagens Afetados**: `etemon`, `flamedramon`, `gabumon`, `garurumon`, `geogreymon`, `metaletemon`, `wargreymon`, `weregarurumon`, `xvmon`.
- **Diagnóstico**: As pastas de Tamagotchi (`idle`, `eat`, `play`, `sleep`, `wake`, `clean`, `heal`, `evolution`) contêm pares de arquivos com hashes SHA-256 idênticos (`00.png` vs `action_01.png`).
- **Decisão**: Registrar formalmente como `DUPLICATE_LEGACY_PAIRS` sem apagar nesta fase de descoberta, garantindo retrocompatibilidade com [src/lib/pet/data.ts](file:///home/spira/digigotchi-main/src/lib/pet/data.ts).

### DEC-003: Diagnóstico dos Diretórios Roguelike com .gitkeep
- **Personagens Afetados**: Todos exceto Agumon e Veemon.
- **Diagnóstico**: Pastas `walk/`, `attacks/basic_1/`, `attacks/basic_2/`, `attacks/special/`, `hit/`, `death/`, `victory/` contêm apenas `.gitkeep` (0 bytes).
- **Evidência Crucial**: A pasta `_raw/` de cada um desses Digimons contém entre 47 e 147 arquivos `sprite_XXXX.png` já fatiados das folhas mestre originais, aguardando classificação visual e mapeamento semântico.
- **Decisão**: Classificar as ações de combate como `MISSING` nos diretórios de runtime, mas registrar a existência de matéria-prima integral em `_raw/`, bloqueando a declaração falsa de "completude" e fornecendo o roteiro exato de extração.

### DEC-004: Kingetemon — Ausência de Spritesheet na Raiz de Sheets
- **Diagnóstico**: `kingetemon` possui 48 arquivos em `_raw/` (incluindo a folha mestre `kingetemon.png` 1448x1086 e 47 fatias), mas suas pastas de Tamagotchi estão vazias com `.gitkeep`.
- **Decisão**: Classificar Kingetemon com status geral `MISSING` em todas as ações de runtime, preservando seu acervo em `_raw/` para futuro pipeline de montagem completa (Tamagotchi + Roguelike).

### DEC-005: Resolução Padrão de Célula (96x96)
- **Diagnóstico**: Os frames de Tamagotchi estão renderizados em 192x192, enquanto os frames de Agumon e Veemon no Roguelike utilizam container normalizado entre 84x114 e 96x96 com baseline `y = 90`.
- **Decisão**: Para o Roguelike, o padrão alvo canônico obrigatório de container é `96x96` pixels com pés alinhados em `y = 90`, preservando a escala $1:1$ do pixel art original.

### DEC-006: Geração 4-Way Estrita do Agumon
- **Classificação**: `READY` integral (Tamagotchi + Roguelike 4-Way).
- **Evidências**:
  - Geração unitária de 3 frames para `walk/down/walk_down_01..03.png` e 3 frames para `walk/up/walk_up_01..03.png`.
  - Conformidade geométrica rigorosa: Canvas $96\times96$, baseline $y=90$, centro $x=47$, canal Alpha limpo.
  - Testes unitários e E2E aprovados sem regressões.
- **Decisão**: Promover Agumon no manifest `docs/digital-path/manifests/agumon.json` de `movementStyle: "2-way"` para `movementStyle: "4-way"`.

### DEC-007: Padronização e Registro de Manifests para Todas as Espécies
- **Personagens Afetados**: Todos os 12 Digimons (`veemon`, `agumon`, `gabumon`, `garurumon`, `geogreymon`, `wargreymon`, `weregarurumon`, `xvmon`, `flamedramon`, `etemon`, `metaletemon`, `kingetemon`).
- **Decisão**: Criar manifests estruturados para todas as espécies em `docs/digital-path/manifests/<digimon>.json` e registrá-los em `src/lib/digital-path/runtime/manifests.ts`. As espécies com combate pendente são declaradas com `spriteReady: false`, permitindo que o frontend ative proteções contra 404 e exiba a tela de estrutura pronta.

