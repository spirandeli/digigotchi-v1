# PLANO DE MELHORIA DE SPRITES E EFEITOS — RODADA 2

## O que foi aplicado nesta rodada

- Inclusão das **novas sprite sheets enviadas pelo usuário** em `attachments/user_sprite_sheets_round2/`.
- **Limpeza de halos e linhas transparentes** nos PNGs de animação já existentes.
- Substituição parcial das animações com melhor material novo para:
  - Flamedramon
  - Garurumon
  - WereGarurumon
  - Etemon
  - MetalEtemon
- Atualização do ataque de **Flamedramon**, ignorando a pose com roupa inconsistente.
- Preservação dos outros conjuntos como fallback, para evitar quebrar o jogo.

## Ajustes visuais priorizados

1. **Bordas**
   - Reduzir fringe/halo em pixels semi-transparentes.
   - Preservar outlines pretos do pixel art.

2. **FX mais limpos**
   - Ataques substituídos passaram a usar poses mais legíveis e impactos mais claros.
   - Ainda há espaço para uma rodada 3 focada em separar personagem e FX em layers distintas.

3. **Flamedramon**
   - A pose com roupa errada foi deixada fora da sequência principal.
   - O ataque `attack-fire-rocket` agora privilegia a pose final do foguete de fogo.

## Pendências recomendadas para a próxima rodada

- Recortar manualmente **Agumon, Gabumon, Veemon, XV-mon e GeoGreymon** diretamente das novas sheets com marcação humana quadro a quadro.
- Criar uma biblioteca de **FX separados** (fogo, gelo, impacto, energia, som) para reaproveitamento.
- Separar ataques em estrutura: `windup -> release -> travel -> impact -> recovery`.
- Revisar escala por estágio evolutivo em tela após teste jogável.
- Converter sheets finais para **PNG com transparência real**, evitando JPG como fonte de produção.

## Observação

Este pacote foi montado para entregar um estado **melhor e mais consistente sem quebrar o projeto**. Alguns monstros já receberam material novo diretamente; outros ainda usam o pipeline anterior com limpeza de bordas.
