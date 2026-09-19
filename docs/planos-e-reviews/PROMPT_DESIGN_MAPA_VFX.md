# Prompt para geração de sprites e VFX do mapa/ambiente reativo

Você é um projetista senior de games 2D e de efeitos visuais para monstros / Digimons em pixel art. Sua tarefa é criar um pacote completo de sprites e efeitos visuais para o ambiente ao redor do digimon, incluindo cenário reativo em tempo real às ações e habilidades utilizadas.

## Objetivo
Criar um conjunto de ativos visuais que reflitam o impacto das ações do Digimon no mapa, sem depender apenas do personagem principal. O ambiente deve reagir em camadas: fundo, chão, partículas, elementos de impacto, auras, fumaça, energia, vibração visual, distorções de terreno e neblina.

## Regras gerais
- Manter estética pixel art, legível e coerente com o universo.
- Cada habilidade deve ter um efeito específico, diferente da outra.
- O ambiente deve reagir de forma proporcional ao tipo de ação executada.
- Os efeitos devem respeitar profundidade: fundo, meio, primeiro plano.
- Os elementos devem ser funcionais e reutilizáveis: brilho, partículas, rastro, impacto, charge, aura, destruição visual do terreno, etc.
- Preservar a clareza visual em resolução baixa e em telas móveis.
- Usar escala, opacidade, brilho e deslocamento para dar sensação de energia e reação.
- O mapa deve reagir à ação do Digimon sem quebrar a legibilidade da cena.

## Estrutura de assets a produzir
### 1) Auras e energias
- aura de foco
- aura de ataque elemental
- aura de evolução
- aura de cura
- aura de proteção
- aura de impacto

### 2) Partículas por elemento
- fogo: brasas, faíscas, cinzas, vapor, chamas pequenas
- gelo: cristais, gelo fino, puff de gelo, névoa fria
- eletricidade: flashes, faíscas, linhas de energia, estalos

### 3) Impactos no ambiente
- impacto de piso
- impacto em chão em forma de círculo
- rachaduras leves no terreno
- erupções de poeira
- vibração no fundo
- respingos de energia em torno do alvo

### 4) Efeitos de movimento e ação
- dash / corrida
- salto
- queda / pouso
- ataque corpo a corpo
- ataque de distância
- ataque especial
- habilidade de suporte
- cura / regeneração
- evolução / transformação

### 5) Reação do cenário
- chão que escurece ou brilha ao contato
- névoa que se desloca com o vento da técnica
- arbustos ou plantas sendo agitadas por impacto
- pedras e areia deslocadas por explosão
- água ou gelo congelando localmente
- faíscas que ricocheteiam em objetos do mapa

## Habilidades que devem ter VFX específicos
Cada Digimon possui uma identidade de ataque e o mapa deve responder ao tipo de energia usada:

### Agumon / GeoGreymon / WarGreymon
- fogo intenso
- brasas no chão
- chamas de baixo para cima
- fumaça densa
- piso escurecendo e rachando levemente

### Gabumon / Garurumon / WereGarurumon
- gelo e vento
- cristalização do chão
- névoa gelada
- traços de gelo em curto alcance
- superfícies congeladas após impacto

### Etemon / MetalEtemon
- energia sonora / eletrônica / brilho metálico
- faixa de luz circular
- sparks de metal
- vibração de ambiente
- campo de energia em torno do alvo

### Veemon / FlameDramon / XV-mon
- energia elétrica e laser
- linhas de energia dinâmicas
- impacto em forma de raio
- pulso de luz radial
- rastro de descarga no chão

## Regras por tipo de ação

### Idle
- leve respiração do ambiente
- pequenas partículas suspensas
- muito delicado, sem exagerar
- ambiente quase estático

### Walk / run
- poeira, folhas, pequenos pontos de movimento no chão
- sombras leves mudando
- ventilação ao redor do Digimon

### Attack melee
- impacto local
- partículas de energia ou poeira
- pressão no chão
- flash leve no entorno

### Attack ranged / projectile
- trail de energia
- impacto em alvo distante
- raio de luz ou explosão no ponto de chegada
- partículas se espalhando em cone ou círculo

### Heal
- aura circular de cura
- brilho suave
- névoa leve ao redor do corpo
- pequenas partículas ascendentes

### Evolve
- energia que cresce em camadas
- flash radial
- brilho de núcleo
- efeito de transformação em torno do corpo e do suelo

### Jump / landing
- poeira ou detritos ao pousar
- sombra e chão reagindo ao impacto
- vibração leve de cenário

### Sleep
- ambiente mais calmo
- luz esfumaçada
- partículas lentas
- ausência de brilho agressivo

## Estrutura visual recomendada
- Layer 1: fundo e cenário lento
- Layer 2: personagens + auras
- Layer 3: partículas de impacto
- Layer 4: projeções / energia / lasers / fogo
- Layer 5: impacto do chão e fumaça final

## Ações que devem gerar o ambiente reativo
1. ataque físico
2. ataque elemental
3. habilidade especial
4. dano recebido
5. cura
6. evolução
7. idle
8. dormir / acordar
9. salto / pouso
10. corrida / dash

## Entregável esperado
O resultado final deve conter:
- sprite set do mapa em diferentes intensidades
- VFX por tipo de elemento
- VFX por ação do Digimon
- uma paleta visual consistente
- variações de impacto conforme o contexto
- sprites reutilizáveis para ação, reação e cenário

## Formato de arte
- pixel art limpo
- transparente onde possível
- 2D em camadas
- atlas ou sequência por ação
- tamanho consistente
- impacto no mapa em escalas pequenas e médias

## Saída final desejada
O ambiente deve parecer vivo e responder ao Digimon como se o mapa fosse uma extensão do personagem. Quando um ataque ocorre, não basta apenas a animação do Digimon: o chão, a atmosfera, o brilho e os elementos ao redor devem reagir para mostrar que a ação teve peso e efeito.
