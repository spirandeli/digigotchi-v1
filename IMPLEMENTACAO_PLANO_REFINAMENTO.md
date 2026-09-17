# Implementação do Plano de Refinamento

Esta versão aplica o plano de sprites, escala, áudio e habilidades à main do Digigotchi.

## Implementado

- Pipeline reproduzível de sprites em `scripts/build_sprite_pipeline.py`.
- Keyframes originais preservados em `public/sprites/keyframes/`.
- Novas sequências finais em `public/sprites/animated/`.
- Quantidades finais por Digimon:
  - idle: 10 frames;
  - comer: 10 frames;
  - brincar: 12 frames;
  - dormir: 6 frames;
  - acordar: 8 frames;
  - banho: 10 frames;
  - cura: 10 frames;
  - evolução: 14 frames;
  - ataque exclusivo: 12 frames.
- Animações não-idle configuradas para executar até o último frame antes do retorno ao idle.
- Movimentos com antecipação, mudança corporal, execução, follow-through e recovery.
- Efeitos de ataque reutilizáveis em `public/fx/`.
- Escala visual reduzida e progressiva por geração em `SPRITE_STAGE_LAYOUT`.
- Áudio original sintetizado para cada espécie e ação em `.ogg` e `.mp3`.
- Preload de áudio da espécie atual, cooldown e interrupção do som anterior.
- `src/lib/pet/skills.ts` com uma habilidade para cada forma.
- Menu **Treinar** na interface inferior estilo Nintendo DS.
- Treino consome energia, concede XP e moedas e executa animação/som do ataque.
- Multiplicador de QA separado (`QA_XP_MULTIPLIER = 3`).
- Bloqueio contra spam enquanto uma ação animada está em execução.
- Dockerfile e `docker-compose.yml` simplificados para iniciar em `8080`.

## Habilidades

- Agumon — Pepper Breath / Baby Flame
- GeoGreymon — Mega Flame
- WarGreymon — Terra Force / Gaia Force
- Etemon — Love Serenade / Concert Crush
- MetalEtemon — Banana Slip
- Gabumon — Blue Blaster / Petit Fire
- Garurumon — Howling Blaster / Fox Fire
- WereGarurumon — Wolf Claw / Kaiser Nail
- Veemon — Vee Headbutt
- Flamedramon — Fire Rocket
- XV-mon — Vee-Laser / X-Laser

## Validação

Execute:

```bash
python3 scripts/qa_refinement.py
```

O relatório completo fica em `QA_REFINAMENTO.md`. Na entrega atual, todas as 11 formas passam a validação automática de quantidade de frames, transparência, ausência de frames exatamente duplicados e presença dos arquivos de áudio.

Para subir com Docker:

```bash
docker compose down -v --remove-orphans
docker compose up --build
```

O Vite fica exposto na porta `8080`.
