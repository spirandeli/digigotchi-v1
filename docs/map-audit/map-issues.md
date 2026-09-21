# Registro de Problemas Corrigidos e Prevenção (Map Issues Log)

Histórico de defeitos arquiteturais e sua resolução definitiva:

1. **Mapas Vazios e Sem Vida:**
   - *Causa:* Ausência de microáreas, clusters e props; apenas chão aberto e 1-3 pilares genéricos.
   - *Solução:* Implementação do sistema de clusters semânticos, landmarks, orçamento ambiental e zonamento.

2. **Apenas 1 Tema Habilitado:**
   - *Causa:* Temas `fire`, `ice` e `tech` não haviam sido extraídos das pranchas conceituais.
   - *Solução:* Extração simétrica e auditoria visual de 62 assets por tema para os 4 biomas.

3. **Inversão de Orientação de Paredes:**
   - *Causa:* Checagens de borda do mapa consideravam o exterior como chão transitável.
   - *Solução:* Autotiling baseado em vizinhança ortogonal e diagonal estrita com verificação de limites.

4. **Spawns Inválidos ou Bloqueados:**
   - *Causa:* Props podiam ser gerados sobre o jogador, saída ou rotas de combate.
   - *Solução:* Aplicação estrita da `COMBAT_NAVIGATION_MASK` e validação BFS garantindo 100% de conectividade.

5. **Problemas de Profundidade (Layering):**
   - *Causa:* Z-index inconsistente em elementos decorativos e personagens.
   - *Solução:* Hierarquia de profundidade estrita de 0 a 40 no Phaser.
