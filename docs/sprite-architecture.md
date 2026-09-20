# Arquitetura Oficial de Sprites dos Digimons

Este documento detalha a arquitetura padronizada de diretórios para todos os Digimons do jogo, baseada na implementação oficial funcional do **Veemon** (`public/sprites/veemon/`).

Tanto o **Virtual Pet (Tamagotchi)** quanto o **Caminho Digital (Roguelike 2D top-down Phaser)** consomem exclusivamente esta árvore unificada:

```text
public/sprites/[nome_do_digimon]/
```

---

## 1. Visão Geral da Árvore Canônica

```text
public/sprites/[nome_do_digimon]/
├── _raw/                                    # Spritesheets brutos e cortes de origem
├── spritesheets/                            # Spritesheet compilado de referência
├── portrait.png                             # Retrato para diálogos e HUD (96x96 ou similar)
├── [digimon].png                            # Sprite estático / fallback raiz
├── evolve -> evolution                     # Symlink de compatibilidade com o Tamagotchi
│
├── [Ações do Virtual Pet / Tamagotchi]
│   ├── idle/                                # Respiração / Parado (compartilhado com Roguelike)
│   ├── eat/                                 # Animação de alimentação
│   ├── sleep/                               # Animação dormindo
│   ├── wake/                                # Animação acordando
│   ├── play/                                # Animação brincando
│   ├── clean/                               # Animação tomando banho / limpeza
│   ├── heal/                                # Animação de recuperação / curativo
│   ├── evolution/                           # Animação de evolução digital
│   └── attack-[nome-do-golpe]/              # Golpe assinatura específico do Tamagotchi
│
├── [Movimentação do Caminho Digital / Roguelike]
│   ├── walk/                                # Andar top-down 4 direções
│   │   ├── down/                            # Olhando para baixo (frente)
│   │   ├── left/                            # Olhando para a esquerda
│   │   ├── right/                           # Olhando para a direita
│   │   └── up/                              # Olhando para cima (costas)
│   └── run/                                 # Corrida / Movimento rápido
│       ├── left/                            # Corrida para a esquerda
│       └── right/                           # Corrida para a direita
│
├── [Combate do Caminho Digital / Roguelike]
│   ├── attacks/                             # Golpes do jogador no Roguelike
│   │   ├── basic_1/                         # Ataque 1: Físico / Melee (ex: Vee-Punch)
│   │   ├── basic_2/                         # Ataque 2: Disparo / Cast (ex: Vee-Laser)
│   │   └── special/                         # Ataque 3: Golpe Especial (ex: Vee-Headbutt)
│   ├── attack_01/                           # Ataque de inimigo selvagem
│   ├── special_attack/                      # Pose alternativa de especial
│   ├── hit/                                 # Reação a sofrer dano (hurt)
│   ├── death/                               # Animação de derrota / desmaio
│   └── victory/                             # Pose de vitória / comemoração
│
├── [Projéteis de Combate]
│   └── projectiles/                         # Projétil que se desloca pelo mapa
│       └── [nome_do_projetil]/              # Ex: laser/, dragon/, fireball/
│
└── [Efeitos Visuais / VFX]
    └── effects/                             # Efeitos gráficos associados às habilidades
        ├── attack_01/                       # VFX do ataque básico 1 (impacto físico)
        ├── attack_02/                       # VFX do ataque básico 2 (canalização/flash)
        ├── special_attack/                  # VFX do ataque especial (explosão/energia)
        └── hit/                             # VFX genérico de acerto no alvo
```

---

## 2. Detalhamento das Pastas e Ações

| Diretório | Sistema Utilizador | Convenção de Nomes | Direções? | Múltiplos Frames? | Efeitos? | O Que Adicionar Futuramente |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| `idle/` | Ambos (Pet + Roguelike) | `idle_01.png`, `idle_02.png`, ... | Não (Frontal) | Sim (4 a 10 frames) | Não | Animação do Digimon parado respirando. |
| `walk/down/` | Roguelike | `walk_down_01.png`, `walk_down_02.png`, ... | Sim (Baixo) | Sim (3 a 6 frames) | Não | Passos do Digimon descendo na vertical. |
| `walk/up/` | Roguelike | `walk_up_01.png`, `walk_up_02.png`, ... | Sim (Cima) | Sim (3 a 6 frames) | Não | Passos do Digimon subindo de costas. |
| `walk/left/` | Roguelike | `walk_left_01.png`, `walk_left_02.png`, ... | Sim (Esquerda) | Sim (3 a 6 frames) | Não | Passos do Digimon andando para a esquerda. |
| `walk/right/` | Roguelike | `walk_right_01.png`, `walk_right_02.png`, ... | Sim (Direita) | Sim (3 a 6 frames) | Não | Passos do Digimon andando para a direita. |
| `run/left/` | Roguelike | `run_left_01.png`, `run_left_02.png`, ... | Sim (Esquerda) | Sim (3 a 6 frames) | Não | Corrida rápida / dash para a esquerda. |
| `run/right/` | Roguelike | `run_right_01.png`, `run_right_02.png`, ... | Sim (Direita) | Sim (3 a 6 frames) | Não | Corrida rápida / dash para a direita. |
| `attacks/basic_1/` | Roguelike | `attacks_basic_1_01.png`, ... | Não | Sim (2 a 6 frames) | Não | Pose física do golpe corpo-a-corpo primário (Tecla J / Espaço). |
| `attacks/basic_2/` | Roguelike | `attacks_basic_2_01.png`, ... | Não | Sim (2 a 4 frames) | Não | Pose de disparo / canalização de projétil (Tecla K). |
| `attacks/special/` | Roguelike | `attacks_special_01.png`, ... | Não | Sim (1 a 4 frames) | Não | Pose do ataque especial em área (Tecla L). |
| `attack_01/` | Roguelike (Inimigo) | `attack_01_01.png`, ... | Não | Sim (4 a 12 frames) | Não | Ataque básico do Digimon quando atua como inimigo selvagem. |
| `special_attack/` | Ambos | `special_attack_01.png` ou `sprite_0004.png` | Não | Opcional | Não | Frame alternativo de golpe especial ou cutscene. |
| `hit/` | Roguelike | `hit_01.png`, `hit_02.png`, ... | Não | Sim (1 a 3 frames) | Não | Animação ao levar dano. |
| `death/` | Roguelike | `death_01.png`, `death_02.png`, ... | Não | Sim (1 a 3 frames) | Não | Animação caindo derrotado. |
| `victory/` | Roguelike | `victory_01.png`, ... | Não | Sim (1 a 4 frames) | Não | Pose comemorativa ao vencer o Boss ou limpar a masmorra. |
| `projectiles/[tipo]/` | Roguelike | `projectiles_[tipo]_01.png`, ... | Não | Sim (1 a 4 frames) | Sim | Projétil que se move pelo cenário (ex: bola de fogo, laser). |
| `effects/attack_01/` | Roguelike | `effects_attack_01_01.png`, ... | Não | Sim (2 a 4 frames) | Sim | Efeito de impacto no ar ou no alvo para o basic_1. |
| `effects/attack_02/` | Roguelike | `effects_attack_02_01.png`, ... | Não | Sim (2 a 4 frames) | Sim | Efeito saindo da boca/mãos durante o disparo do basic_2. |
| `effects/special_attack/` | Roguelike | `effects_special_attack_01.png`, ... | Não | Sim (2 a 6 frames) | Sim | Explosão em área ou anel de choque do ataque especial. |
| `effects/hit/` | Roguelike | `effects_hit_01.png` | Não | Sim (1 a 3 frames) | Sim | Faísca ou impacto visual genérico de dano no alvo. |
| `eat/` | Tamagotchi | `eat_01.png`, `eat_02.png`, ... | Não | Sim (6 a 10 frames) | Não | Digimon mastigando/comendo. |
| `sleep/` | Tamagotchi | `sleep_01.png`, `sleep_02.png`, ... | Não | Sim (4 a 8 frames) | Não | Digimon deitado dormindo (em loop). |
| `wake/` | Tamagotchi | `wake_01.png`, `wake_02.png`, ... | Não | Sim (4 a 8 frames) | Não | Digimon acordando e se espreguiçando. |
| `play/` | Tamagotchi | `play_01.png`, `play_02.png`, ... | Não | Sim (6 a 12 frames) | Não | Digimon pulando e brincando. |
| `clean/` | Tamagotchi | `clean_01.png`, `clean_02.png`, ... | Não | Sim (6 a 10 frames) | Não | Digimon se limpando / banho com bolhas. |
| `heal/` | Ambos | `heal_01.png`, `heal_02.png`, ... | Não | Sim (4 a 8 frames) | Não | Digimon recebendo curativo ou item médico. |
| `evolution/` | Tamagotchi | `evolution_01.png`, ... | Não | Sim (6 a 14 frames) | Não | Brilho e transformação da evolução. |
| `attack-[assinatura]/` | Tamagotchi | `[assinatura]_01.png`, ... | Não | Sim (6 a 12 frames) | Não | Animação de golpe no hub do pet (ex: `attack-pepper-breath`). |
| `spritesheets/` | Dev / Referência | `[digimon].png` | Não | 1 arquivo | Não | Folha de sprites completa para arquivo. |
| `_raw/` | Dev / Backup | `sprite_0001.png`, ... | Não | Vários | Não | Frames brutos recortados individualmente para arquivo. |

---

## 3. Padrões de Especificação dos Sprites

1. **Formato:** PNG com canal Alpha (transparência 32-bit RGBA).
2. **Resolução de Célula Recomendada:** 96x96 pixels (ou 84x114 para Veemon).
3. **Alinhamento dos Pés (Baseline):** Apoiar os pés do Digimon no pixel `y = 90` (com margem de 6 pixels inferiores) e centralizar horizontalmente `x = (96 - largura) / 2`. Isso evita qualquer oscilação vertical ("jitter") na transição entre `idle`, `walk` e `attacks`.
4. **Numeração:** Sempre dois dígitos com zero à esquerda: `_01.png`, `_02.png`, etc.
5. **Orientação:**
   - Subpastas `left/`: o sprite deve estar virado para a esquerda.
   - Subpastas `right/`: o sprite deve estar virado para a direita (ou espelhado horizontalmente).

---

## 4. Como Criar Automaticamente a Estrutura para Novos Digimons

Para gerar a estrutura canônica para qualquer novo Digimon:

```bash
node scripts/create-digimon-sprite-structure.mjs <nome_do_digimon>
```

Exemplo:
```bash
node scripts/create-digimon-sprite-structure.mjs patamon
```

Isso criará:
- `public/sprites/patamon/` com todas as 33 subpastas canônicas;
- O symlink `evolve -> evolution`;
- O arquivo `.gitkeep` em cada subpasta vazia, permitindo commit no Git sem erros.
- **O script não baixa, não altera imagens e não copia assets do Veemon.**

---

## 5. Tolerância a Pastas Vazias e Ativação no Jogo

- A simples existência de pastas vazias com `.gitkeep` **NÃO causa erros nem downloads 404** no jogo.
- O loader do Phaser carrega exclusivamente as espécies que possuem o manifest correspondente com `spriteReady: true` (atualmente `veemon` e `agumon`).
- Digimons com sprites em preparação exibem uma tela segura no Caminho Digital indicando o caminho das pastas onde os sprites devem ser colocados, com retorno garantido ao Hub e sem substituir o personagem por outro.
