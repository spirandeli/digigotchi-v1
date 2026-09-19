# Plano de Refinamento — Sprites, Escala, Áudio e Habilidades

## Objetivo

Levar o Digigotchi para uma apresentação mais fluida e convincente, priorizando a criação de **novos frames reais de animação**, redução e padronização do tamanho dos Digimon, sons específicos por ação e um sistema inicial de habilidades/ataques utilizáveis durante treino.

O foco desta rodada é evitar a sensação de “sprite parado com efeito por cima”. Cada ação importante deve ter mudança real de pose, antecipação, execução e retorno ao idle.

---

## 1. Refinamento principal dos sprites

### 1.1. Regra geral

Para cada Digimon, revisar individualmente todas as animações e criar frames novos quando os sprites disponíveis não forem suficientes.

Não considerar uma animação pronta quando:
- vários frames forem visualmente idênticos;
- apenas o efeito externo mudar e o corpo permanecer parado;
- membros atravessarem o corpo;
- a silhueta variar de tamanho sem motivo;
- o ponto dos pés mudar demais entre frames;
- houver fundo residual, pixels soltos ou halo de recorte;
- a ação não tiver começo, execução e retorno.

### 1.2. Quantidade-alvo de frames

| Ação | Frames alvo | FPS inicial | Objetivo visual |
|---|---:|---:|---|
| Idle | 8–10 | 6–8 | Respiração, cauda, cabeça, pequenos movimentos |
| Comer | 8–12 | 8–10 | Olhar comida → aproximar → morder → mastigar → voltar |
| Brincar | 10–14 | 9–12 | Preparar → perseguir/interagir → impacto → reação |
| Dormir | 6–8 | 4–6 | Abaixar corpo → acomodar → respirar dormindo |
| Acordar | 6–8 | 8–10 | Levantar → espreguiçar/reagir → idle |
| Banho | 8–10 | 8–10 | Reação corporal real às bolhas/água |
| Cura | 8–10 | 8–10 | Fraqueza → reação ao tratamento → recuperação |
| Evolução | 12–16 | 10–12 | Preparação → energia → flash → pose de conclusão |
| Ataque | 10–16 | 10–14 | Antecipação → golpe → impacto → recuperação |

### 1.3. Criação de novos frames

Usar os sprites existentes apenas como **keyframes**. Criar frames intermediários para aumentar fluidez:

1. identificar pose inicial e final;
2. separar cabeça, braços, pernas, cauda/asas quando necessário;
3. criar 2–4 poses intermediárias reais;
4. corrigir pixels manualmente após interpolação;
5. preservar proporções e paleta original;
6. garantir transparência total do fundo;
7. validar em velocidade real, não apenas olhando a sprite sheet.

Para sprites com poucos frames, como folhas antigas de GBA/DS/WonderSwan, criar novos frames usando o desenho existente como referência visual, em vez de apenas repetir a mesma imagem.

### 1.4. Princípios de animação a aplicar

- **Anticipation:** pequeno movimento contrário antes de atacar/pular.
- **Follow-through:** cauda, braço, pelo ou cabeça continuam o movimento após o impacto.
- **Ease in / ease out:** evitar deslocamento linear robótico.
- **Squash & stretch leve:** apenas onde não deformar demais o sprite original.
- **Arcos de movimento:** cabeça, mãos, pés e objetos não devem se mover em linha reta quando o movimento pede arco.
- **Pose de contato:** ataques precisam de um frame claro de impacto.
- **Recovery:** depois do ataque o Digimon retorna ao idle, não “teleporta” para a pose inicial.

---

## 2. Revisão Digimon por Digimon

A revisão deve ser feita separadamente para:

- Agumon
- GeoGreymon
- WarGreymon
- Etemon
- MetalEtemon
- Gabumon
- Garurumon
- WereGarurumon
- Veemon
- Flamedramon
- XV-mon / ExVeemon

Para cada um criar uma ficha de QA contendo:

- escala na tela;
- centro visual;
- altura do chão;
- quantidade real de poses diferentes;
- frames com artefatos;
- frames repetidos;
- coerência de cores;
- legibilidade de cada ação;
- ataque exclusivo;
- som principal;
- problemas restantes.

---

## 3. Tamanho e escala dos Digimon

### 3.1. Problema atual

No teste mais recente os Digimon ficaram visualmente grandes demais dentro da área de jogo. A primeira correção deve reduzir a escala geral em aproximadamente **15%**.

### 3.2. Regra de escala

Primeiro aplicar:

```ts
newScale = oldScale * 0.85
```

Depois normalizar por geração para impedir saltos exagerados.

Sugestão inicial de bandas:

| Geração / grupo visual | Escala de referência |
|---|---:|
| Rookie | 0.90 |
| Champion / Armor | 0.96 |
| Ultimate | 1.02 |
| Mega | 1.08 |

Permitir ajuste individual de aproximadamente `±0.03` conforme a silhueta.

Exemplo: um quadrúpede comprido como Garurumon pode usar uma escala um pouco menor que um humanoide de mesma geração, pois ocupa mais largura.

### 3.3. Regras de enquadramento

- pés/patas devem compartilhar uma linha de chão consistente;
- não deixar chifres, asas ou caudas encostarem na moldura;
- manter margem mínima de aproximadamente 8–12% da área útil;
- evoluções maiores devem parecer maiores, mas não ocupar o dobro do espaço;
- a progressão de tamanho deve ser perceptível e gradual.

Arquivo principal a revisar:

```text
src/lib/pet/data.ts
SPRITE_STAGE_LAYOUT
```

---

## 4. Sons dos Digimon

### 4.1. Direção sonora

Criar sons curtos inspirados no tipo de criatura de cada Digimon, evitando depender de falas/áudios extraídos de anime ou jogos comerciais.

Grupos sugeridos:

- **Agumon / GeoGreymon / WarGreymon:** rosnado de réptil/dinossauro, respiração forte, rugido.
- **Gabumon / Garurumon / WereGarurumon:** lobo/canídeo, rosnado, ganido curto, uivo.
- **Etemon / MetalEtemon:** vocalização de primata, grunhido e sons cômicos curtos.
- **Veemon / Flamedramon / XV-mon:** vocalização reptiliana/dragão jovem, rugido curto e crescente conforme evolução.

### 4.2. Um som por ação

Cada espécie deve possuir, no mínimo:

```text
idle.ogg
feed.ogg
play.ogg
sleep.ogg
wake.ogg
clean.ogg
heal.ogg
attack.ogg
evolve.ogg
```

Estrutura proposta:

```text
public/audio/digimon/agumon/
public/audio/digimon/geogreymon/
...
```

### 4.3. Regras de reprodução

- não sobrepor dezenas de sons ao clicar rapidamente;
- aplicar cooldown de 250–400 ms;
- ação nova pode interromper um som antigo não essencial;
- evolução tem prioridade máxima;
- volume individual configurável;
- preload apenas dos sons da espécie atual;
- formato preferencial: `.ogg` + fallback `.mp3` se necessário.

Criar configuração central em:

```text
src/lib/pet/audio.ts
```

---

## 5. Sistema de habilidades e ataques

### 5.1. Objetivo

Adicionar um botão/menu **Treinar**, permitindo executar uma habilidade da forma atual. A ação deve:

1. tocar animação exclusiva de ataque;
2. tocar som de ataque;
3. mostrar nome da habilidade;
4. consumir energia;
5. conceder XP;
6. retornar suavemente ao idle.

### 5.2. Uma habilidade inicial para cada Digimon

| Digimon | Habilidade inicial | Ideia de animação |
|---|---|---|
| Agumon | **Pepper Breath / Baby Flame** | recua cabeça → abre boca → pequena bola de fogo |
| GeoGreymon | **Mega Flame** | postura baixa → boca carrega fogo → rajada maior |
| WarGreymon | **Terra Force / Gaia Force** | ergue braços → esfera cresce → lançamento |
| Etemon | **Love Serenade / Concert Crush** | pose de cantor → notas/onda sonora → pose final |
| MetalEtemon | **Banana Slip** | arremessa casca → reação cômica / pose confiante |
| Gabumon | **Blue Blaster / Petit Fire** | inspiração → chama azul pela boca |
| Garurumon | **Howling Blaster / Fox Fire** | rosna → cabeça avança → chama azul |
| WereGarurumon | **Wolf Claw / Kaiser Nail** | antecipação → avanço → corte duplo de garras |
| Veemon | **Vee Headbutt** | recua → corrida curta → cabeçada → recovery |
| Flamedramon | **Fire Rocket** | carrega punho/corpo com fogo → avanço explosivo |
| XV-mon / ExVeemon | **Vee-Laser / X-Laser** | abre postura → X do peito brilha → feixe frontal |

### 5.3. Configuração proposta

Criar:

```text
src/lib/pet/skills.ts
```

Modelo:

```ts
export type SkillDef = {
  id: string;
  name: string;
  speciesId: string;
  energyCost: number;
  xpGain: number;
  animation: string;
  sound: string;
  element?: string;
};
```

Exemplo:

```ts
{
  id: "pepper_breath",
  name: "Pepper Breath",
  speciesId: "agumon",
  energyCost: 8,
  xpGain: 12,
  animation: "attack-pepper-breath",
  sound: "/audio/digimon/agumon/attack.ogg",
  element: "fire"
}
```

---

## 6. Treino

### Fluxo

Adicionar no painel inferior:

```text
Treinar
```

Ao tocar:

```text
[ Nome da habilidade ]
Custo: X Energia
Ganho: Y XP
[ TREINAR ]
```

Durante treino:

- bloquear spam enquanto a animação estiver executando;
- executar animação inteira;
- aplicar custo e recompensa no frame de impacto ou ao final;
- exibir `+XP` discretamente;
- voltar ao idle.

### Balanceamento inicial

Para o modo normal:

```text
Rookie:   custo 6–8 energia / 10–12 XP
Champion: custo 8–10 energia / 12–15 XP
Ultimate: custo 10–12 energia / 15–18 XP
Mega:     custo 12–15 energia / 18–22 XP
```

Para QA, permitir multiplicador separado, por exemplo:

```ts
const QA_XP_MULTIPLIER = 3;
```

Assim não é necessário desbalancear permanentemente o jogo apenas para testar evoluções.

---

## 7. Pipeline de animação de ataque

Cada habilidade deve ter:

```text
01 anticipation
02 anticipation forte
03 início do golpe
04 execução
05 execução
06 impacto
07 impacto forte / FX
08 follow-through
09 recovery
10 idle bridge
```

Para ataques de projétil, separar visualmente:

```text
sprite do Digimon
+ projectile FX
+ impact FX
```

Isso permite reutilizar o efeito sem sacrificar a animação corporal.

---

## 8. Organização de assets

Estrutura recomendada:

```text
public/
  sprites/
    animated/
      agumon/
        idle/
        eat/
        play/
        sleep/
        wake/
        clean/
        heal/
        evolve/
        attack-pepper-breath/
      ...
  fx/
    fire/
    ice/
    claw/
    energy/
    sound-wave/
  audio/
    digimon/
      agumon/
      geogreymon/
      ...
```

---

## 9. Ordem de implementação

### Fase 1 — Escala e enquadramento
- reduzir todos aproximadamente 15%;
- criar bandas de escala por geração;
- validar em desktop e mobile;
- corrigir chão/centro de cada espécie.

### Fase 2 — Sprites base
- revisar idle de todos;
- eliminar fundos e artefatos;
- corrigir tamanho e alinhamento dos frames;
- criar novos in-betweens reais.

### Fase 3 — Ações de cuidado
- comer;
- brincar;
- dormir/acordar;
- banho;
- cura;
- evolução.

### Fase 4 — Sistema de habilidades
- criar `skills.ts`;
- adicionar ação de treino;
- implementar energia + XP;
- adicionar uma habilidade por Digimon.

### Fase 5 — Ataques animados
- criar 10–16 frames por habilidade;
- criar projéteis/FX;
- sincronizar hit frame, som e XP.

### Fase 6 — Áudio
- produzir/selecionar sons de criatura;
- um som por ação por espécie;
- preload e cooldown;
- controle de volume.

### Fase 7 — QA final
- validar todas as espécies e gerações;
- verificar frames duplicados;
- verificar fundos;
- verificar escala;
- verificar som e sincronização;
- verificar treinamento e XP;
- testar spam de botões;
- testar troca de evolução durante/apos animação;
- testar mobile e desktop.

---

## 10. Critérios de aceite

A rodada só deve ser considerada concluída quando:

- todos os Digimon estiverem aproximadamente 15% menores que o teste anterior;
- a diferença de tamanho entre gerações for gradual;
- cada ação possuir movimento corporal real;
- cada ataque possuir pelo menos 10 frames ou equivalente visual convincente;
- nenhuma animação depender apenas de efeitos sobre um sprite completamente estático;
- não houver fundo sólido nos sprites;
- todos os Digimon tiverem pelo menos uma habilidade treinável;
- todos tiverem som de ataque e sons das ações principais;
- som e frame de impacto estiverem sincronizados;
- treino conceder XP e consumir energia;
- não houver corte de sprite na moldura da tela;
- o jogo permanecer legível e confortável na UI estilo Nintendo DS.

---

## 11. Resultado esperado

Ao final desta rodada, cada Digimon deverá parecer um personagem vivo, e não apenas uma sequência de imagens. Evoluções devem crescer de forma moderada, ações devem ter personalidade própria, ataques devem ser reconhecíveis e o treino deve se tornar uma atividade visual e funcional do loop principal do jogo.
