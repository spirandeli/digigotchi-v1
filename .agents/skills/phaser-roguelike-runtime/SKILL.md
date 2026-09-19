---
name: phaser-roguelike-runtime
description: Cria e mantém o runtime Phaser 3 do Caminho Digital: config, lifecycle, scenes, preload, player, câmera, input, colisões e animações ligadas aos manifests auditados.
---

# Objetivo

Implementar o núcleo Phaser 3 sem romper o HTML/CSS/JS existente.

# Dependências

- `project-architecture-audit`
- `sprite-visual-audit` para qualquer Digimon que será usado
- `tamagotchi-digital-path-integration` para o fluxo de entrada/saída

# Procedimento

1. Reutilize a versão Phaser existente ou instale somente a versão adequada à arquitetura após verificar `package.json`.
2. Crie config Phaser compatível com o container real do Tamagotchi.
3. Separe scenes apenas quando houver responsabilidade real: boot/preload, gameplay, UI/result.
4. Implemente lifecycle explícito: `start`, `pause/resume`, `stop/destroy`.
5. Preload deve consumir manifests, não listas hardcoded espalhadas.
6. Antes de carregar, valide existência dos paths obrigatórios.
7. Gere animações com keys namespaced por Digimon/ação para evitar colisão.
8. Implemente PlayerFactory baseado no Digimon recebido do Tamagotchi.
9. Configure origin, scale e hitbox a partir do manifest/config, com ajuste visual validado.
10. Implemente input WASD/setas e ações do combate de forma configurável.
11. Configure física/colisões e câmera.
12. Limpe eventos, keyboard handlers, timers e sons ao sair.

# Regras de animação

- Não criar animação referenciando frame inexistente.
- Não usar `_review` em runtime.
- Não mascarar ataque obrigatório ausente com `idle` sem registrar bloqueio.
- Fallback visual é permitido apenas para estado opcional e deve ser explícito.

# Critérios de aceite

- Phaser inicia sem erro crítico.
- Player corresponde ao Digimon atual.
- Idle e movimento funcionam.
- Sprite não apresenta jitter/corte grave.
- Colisão corresponde visualmente ao personagem.
- Abrir/fechar 10 vezes não duplica canvas ou listeners.
- Console não registra erro de asset obrigatório.
