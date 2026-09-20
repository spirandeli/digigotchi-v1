# ROADMAP — DIGIGOTCHI (ROGUELIKE 2D + TAMAGOTCHI)

## Visão Geral
Combinação contínua de Tamagotchi / Virtual Pet com Roguelike de Ação 2D Top-Down ("Caminho Digital"), mantendo a integridade do mesmo parceiro Digimon nos dois modos.

---

## MARCO 1 — Assets, Sprites e Manifests
- [x] Inventário e auditoria da fonte de sprites `rougue-like-character-sprites/`.
- [x] Extração e organização padronizada do Agumon MVP (idle, walk, attacks, hit, death, victory, heal, projectiles, effects).
- [x] Estruturação do validador automático de manifests (`scripts/validate-digital-path-manifests.mjs`).
- [x] Guia manual de organização para os outros 11 Digimons (`docs/digital-path/MANUAL_SPRITE_ORGANIZATION_GUIDE.md`).

---

## MARCO 2 — Ponte de Integração e Runtime Phaser Base
- [x] Substituição do botão visual Treino por Caminho Digital no Tamagotchi.
- [x] Ponte de dados desacoplada e segura (`digital-path-bridge.ts`).
- [x] Idempotência na concessão de recompensas de run para prevenir duplicação de saves.
- [x] Instanciação controlada do canvas Phaser sem vazamento de memória.

---

## MARCO 3 — Estabilização do Caminho Digital, Tela Cheia, Geração Finita e Combate
- [x] **Eliminação da geração contínua:** Identificado e corrigido o ciclo em que o tick de 1s do Tamagotchi recriava o modal e o runtime do Phaser. Isolado em modo de tela dedicado `screen: "digital-path"`.
- [x] **Run Finita e Determinística:** 6 salas por run (`room_01` a `room_06`) com papéis definidos (Início, Combate 1, Combate 2, Tesouro com baú interativo [E], Elite e Chefe).
- [x] **Conectividade BFS Garantida:** Algoritmo automático de flood fill (`isPathConnected`) valida caminho contínuo navegável entre Spawn e Saída.
- [x] **Experiência em Tela Cheia:** Viewport responsivo `100vw` por `100vh` com `Phaser.Scale.RESIZE`, câmera com `startFollow` suave e limites de borda estritos.
- [x] **Tilesets Reais:** Integração de texturas de `sprite_lists_maps` em `public/maps/tilesets/` (chão de pedra, placas de circuito, pedras escuras, portas e baús).
- [x] **Combate e 3 Habilidades:** Ataque 1 (J / Espaço - físico), Ataque 2 (K - projétil de fogo), Especial (L - explosão digital em área). Inimigos com IA, barras de HP, dano flutuante e efeitos de derrota.
- [x] **Portão de Saída e Transição:** Portão trancado enquanto houver inimigos vivos; desbloqueio automático e transição com destruição limpa da sala anterior.
- [x] **Retorno Seguro ao Tamagotchi:** Conclusão ou abandono de run fecha o Phaser sem processos zumbis, apresenta resumo de recompensas e persiste XP e moedas no save local.

---

## MARCO 4 — Conteúdo, Progressão, Variedade e Polimento
- [x] **PRNG Determinístico por Seed:** Módulo `RunRNG` (Mulberry32) para reprodução exata de sequências, layouts e escolhas aleatórias.
- [x] **Multi-Biomas e Andares:** Setor Digital (Floor 1), Fenda Vulcânica (Floor 2), Domínio da Tempestade (Floor 3) e Glaciar de Dados com tilesets temáticos e iluminação dinâmica.
- [x] **Variedade de Salas Procedurais:** Início (`start`), Combate Melee/Ranged (`combat`), Elite com minions (`elite`), Tesouro com draft de upgrades (`treasure`), Anomalia de Dados com escolhas morais (`event`), Nó de Regeneração / Acampamento (`rest`), Mercador de Bits (`shop`) e Chefe em múltiplas fases (`boss`).
- [x] **Sistema de Upgrades & Builds em Run:** 8 microchips com raridades (Comum, Raro, Épico), cálculo de modificadores cumulativos (ataque, vida máxima, aceleração de recarga, crítico, espinhos, roubo de vida).
- [x] **Arquétipos Inimigos & IA Avançada:** Melee Chasers, Spitters Ranged (disparam projéteis com telegrafia e alcance esquivável), Elites com suporte e Chefes multi-fase com modo Fúria (< 50% HP, telegrafia e disparos radiais quádruplos).
- [x] **Menu de Pausa e Guia de Controles:** Tecla ESC ou botão HUD abre overlay com resumo de comandos (WASD, J/Espaço, K, L, E) e opção de abandono tático seguro.
- [x] **Meta-Progressão & Tamagotchi Relevante:** Transferência automática e persistente de XP, Bits e consumíveis obtidos na run (`carne_digital`, `fruta_digital`) diretamente para o inventário do Tamagotchi.
- [x] **Barra de Vida de Chefe:** Indicador central no topo exibindo nome do guardião, fase atual e barra animada com pulsação em Fúria.
- [x] **Resiliência e Compatibilidade Total:** Digimons evoluídos ou com manifests em organização utilizam fallback proxy seguro garantindo gameplay contínuo sem travamentos.
- [x] **Validação E2E com Playwright:** Suíte de testes automatizados com 10 capturas de tela cobrindo todos os módulos do Marco 4 e 0 erros de console.

---

## MARCO 5 — ALPHA JOGÁVEL, POLIMENTO, CONTEÚDO E ESTABILIDADE
- [x] **Loadouts & Perfis de Espécie:** Agumon (Garra / Chama Bebê / Bafo de Pimenta), Veemon (Vee-Punch / Vee-Laser / Vee-Headbutt) e Gabumon (Horn Thrust / Blue Blaster / Garuru-Aura) com atributos, alcances e efeitos temáticos distintos.
- [x] **Motor de Efeitos de Status (DoT & CC):** Queimadura (Burn - dano periódico com VFX laranja), Lentidão (Slow - velocidade reduzida com VFX azul) e Eletrocutado (Shock - atordoamento/interrupção) com atualização limpa de duração.
- [x] **Multi-Bosses em 2 Fases com Fúria:** Kuwagamon da Fenda (Andar 1), Meramon Vulcânico (Andar 2) e Seadramon Abissal (Andar 3), com projéteis temáticos, transição de fúria aos 50% de vida, telegrafia e disparos quádruplos.
- [x] **Perigos de Terreno Dinâmicos (Hazards):** Poças de lava com queima contínua e zonas de descarga elétrica telegrafadas que aplicam choque caso o jogador não se esquive a tempo.
- [x] **Game Feel, Feedback & Combate:**
  - *Input Buffering (120ms):* Enfileiramento de comandos para execução suave de ataques sem perda de inputs entre frames.
  - *Hitstop (45ms):* Micro-pausa de impacto em acertos críticos, finalizações e troca de fases do chefe.
  - *Opções Visuais e Tremor:* Toggles em tempo real no menu de pausa para Tremor de Tela (Screen Shake) e Números de Dano (Damage Numbers).
- [x] **Polimento e UX do Hub Tamagotchi:**
  - *Árvore de Evolução Visual:* Painel detalhado exibindo a linha genealógica do parceiro, requisitos de nível e afinidade/felicidade e progresso em tempo real.
  - *Inventário Categorizado:* Abas com filtros ("Todos", "Alimentos", "Cuidados") e contadores de itens.
  - *Painel de Configurações & Integridade:* Controle de volume de SFX, atalho de tela cheia, selo de integridade do save espelho e reinício de save com confirmação em duas etapas.
  - *Offline Decay Cap:* Limite de degradação off-line de até 8 horas com piso de segurança para proteger o pet contra morte imediata em ausências prolongadas.
- [x] **Integridade & Recuperação de Save (Mirror Backup):**
  - Redundância dupla com salvamento simultâneo em `digital_pet_save_v2` e `digital_pet_save_v2_backup`.
  - Auto-recuperação resiliente caso a chave primária sofra corrupção acidental ou parsing inválido.
- [x] **Estabilidade e Validação Total:**
  - 82 testes unitários passando (`npx tsx --test`).
  - Suíte E2E automatizada Playwright (`scripts/qa-m5-alpha-full.mjs`) com 10 etapas e 0 erros de console.
  - Testes de renderização e paridade no servidor de build (`browser-smoke.mjs`) em Desktop e Mobile sem divergências.

