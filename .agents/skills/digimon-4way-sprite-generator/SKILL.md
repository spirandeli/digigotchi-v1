---
name: digimon-4way-sprite-generator
description: Especializada na geração rigorosa de frames direcionais ausentes (4-way) para sprites de Digimon, produzindo estritamente 1 frame por PNG com preservação absoluta de escala, proporção, ancoragem, pixel art e identidade visual baseada exclusivamente no próprio Digimon.
---

# digimon-4way-sprite-generator

Esta skill define o contrato técnico, metodológico e operacional para completar **direções ausentes (4-Way)** em animações de Digimons no projeto Digigotchi (Roguelike Top-Down Phaser + Tamagotchi Virtual Pet).

---

## 1. Quando Utilizar a Skill

A skill deve ser acionada **exclusivamente** quando todas as seguintes condições forem satisfeitas:
1. **Ação Base Existente**: O Digimon já possui a ação (ex: `walk` ou `attacks/basic_1`) com frames válidos e consistentes em pelo menos uma direção (ex: `down` ou `left`/`right`).
2. **Direção Ausente Necessária**: O runtime (Phaser/Roguelike) requer navegação ou disparo na direção faltante (`up` ou `down`), e a ação não pode ser solucionada por espelhamento horizontal.
3. **Completude Direcional**: O objetivo é transformar uma animação 2-way ou unilateral em uma animação 4-way íntegra.

---

## 2. Quando NÃO Utilizar a Skill

É **terminantemente proibido** utilizar esta skill nas seguintes situações:
1. **Ação Inteira Ausente**: Se o Digimon não possui nenhuma animação de `sleep`, `dash` ou `special`, **nunca** invente a ação do zero. Ela deve permanecer classificada como `MISSING`.
2. **Espelhamento Válido (`flipX`)**: Quando a direção oposta (`left` a partir de `right`, ou vice-versa) puder ser obtida por inversão horizontal simples com simetria anatômica preservada.
3. **Direção Já Existente**: Nunca sobrescrever ou substituir frames originais existentes, mesmo que a versão gerada pareça "mais nítida" ou "modernizada". Sprites originais têm prioridade absoluta.
4. **Interpretação Alternativa ou Redesenho**: Nunca reimaginar ou alterar o design original do Digimon.

---

## 3. Seleção de Referências Visuais

A geração de um frame direcional exige um conjunto estrito de referências visuais, limitadas **exclusivamente aos sprites existentes do próprio Digimon**. É estritamente proibido usar outro Digimon como base visual.

### Hierarquia de Referências:
1. **Referência Primária (Temporal Idêntica)**:
   - O mesmo Digimon + mesma ação + **mesmo frame index** em outra direção.
   - *Exemplo*: Para gerar `walk_up_02.png`, a referência primária obrigatória é `walk_down_02.png` e/ou `walk_right_02.png`. Isso garante sincronia na passada da perna.
2. **Referência Secundária (Perspectiva Dorsal/Frontal Existente)**:
   - O mesmo Digimon + a **mesma direção** em outra ação já existente (ex: `idle_up_01.png` ou `attack_special_up_01.png`).
   - Fornece o modelo exato da silhueta de costas, anatomia da cauda, espinhos, asas e padrão de iluminação dorsal.
3. **Referência Terciária (Consistência Global de Paleta e Contorno)**:
   - Demais frames canônicos do personagem (`idle_01.png`, `hit_01.png`) para extração precisa da paleta de cores (RGB exatos), espessura de outline e densidade de pixel art.

---

## 4. Medição de Escala e Proporções

A escala visual do personagem deve ser matematicamente preservada:
1. **Cálculo da Altura Aparente**:
   $$\text{altura\_personagem} = y_{\max} - y_{\min}$$
   nos frames originais com $\alpha > 25$.
2. **Variação Máxima Permitida**:
   A variação de altura e largura entre a direção gerada e as direções existentes não deve exceder $\pm 5\%$, justificável unicamente pelo encurtamento de perspectiva (foreshortening) natural da visão top-down.

---

## 5. Medição de Bounding Box

Para cada frame de referência e para o frame gerado:
1. Extrair os limites exatos do canal Alpha ($\alpha > 10$):
   $$\text{bbox} = (x_{\min}, y_{\min}, x_{\max}, y_{\max})$$
2. Inspecionar que o personagem não toca as bordas do canvas (margem de segurança mínima de 4 pixels em relação aos limites $96\times96$).
3. Assegurar que nenhum membro anatômico (garras, orelhas, asas) tenha sido cortado pelo retângulo do canvas.

---

## 6. Preservação de Ancoragem (Anchor & Baseline)

O runtime do Phaser posiciona o sprite com `originX = 0.5` e `originY = 0.94`:
- **Dimensão Fixa de Canvas**: $96\times96$ pixels, formato PNG RGBA com canal Alpha limpo.
- **Linha de Chão (Baseline)**: O ponto mais baixo dos pés do personagem ($y_{\max}$ da bounding box) deve pousar estritamente na linha horizontal:
  $$y = 90$$
- **Centralização Horizontal**: O centro de massa horizontal da silhueta deve estar alinhado com o centro do canvas:
  $$x = 48$$
Isso elimina o tremor visual (jitter) durante a transição de direção e movimentação.

---

## 7. Preservação de Estilo, Paleta e Pixel Art

O frame gerado deve ser indistinguível do lote original:
- **Pixel Art Real 1:1**: Sem suavização bilinear, sem anti-aliasing artificial de bordas e sem gradientes vetoriais.
- **Paleta Estrita**: Utilizar as cores hexadecimais extraídas diretamente dos frames de referência do personagem.
- **Outline Consistente**: Preservar o contorno característico dos sprites originais do Digimon (linhas escuras sólidas de 1 pixel).
- **Iluminação e Sombreamento**: Manter a direção de iluminação padrão (zenital / top-down ligeiramente frontal), projetando sombras consistentes nos membros dorsais em poses `up`.

---

## 8. Interpretação de Direções Top-Down

- **`down` (Frontal)**:
  O personagem está voltado diretamente para a câmera/parte inferior do mapa. Rosto, olhos, peito e detalhes frontais em evidência.
- **`up` (Costas / Dorsal)**:
  O personagem está de costas, voltado para o topo do mapa. Costas da cabeça, cauda, coluna, asas e calcanhares em evidência; o rosto não é visível.
- **`left` (Perfil Esquerdo)**:
  Personagem caminhando/olhando para a esquerda.
- **`right` (Perfil Direito)**:
  Personagem caminhando/olhando para a direita.

---

## 9. Regras de Espelhamento (`flipX`) vs Geração Nativa

1. Se `walk_right` já existe e o personagem possui anatomia simétrica, `walk_left` é configurado preferencialmente via:
   ```json
   "walk_left": {
     "frames": ["sprites/.../walk_right_01.png"],
     "flipX": true
   }
   ```
   ou espelhado horizontalmente sem redundância de asset.
2. Direções verticais (`up` e `down`) **nunca** podem ser resolvidas por `flip`, exigindo representação visual real das vistas frontal e dorsal.

---

## 10. Continuidade Temporal e Sincronia de Poses

A geração direcional frame a frame deve sincronizar as fases da animação:
- **Frame 01 (Passada Esquerda)**: Se `walk_down_01` exibe o pé esquerdo à frente, `walk_up_01` deve exibir o pé esquerdo avançando visto de costas.
- **Frame 02 (Passagem / Contato)**: Posição neutra com pés alinhados ao solo.
- **Frame 03 (Passada Direita)**: Pé direito à frente com elevação do calcanhar esquerdo.
- **Ataques de Projétil**: Se frame 01 for preparação/carga e frame 02 for liberação, os frames direcionais correspondentes devem manter estritamente essa ordem.

---

## 11. Regra de Execução Unitária (1 Frame por PNG)

### REGRA INEGOCIÁVEL:
> **CADA GERAÇÃO PRODUZ EXATAMENTE 1 IMAGEM PNG CONTENDO 1 ÚNICO FRAME.**

- Proibido gerar folhas, grades, matrizes ou strips com múltiplos quadros.
- Proibido juntar direções na mesma imagem.
- Caminho canônico:
  ```text
  public/sprites/<digimon>/walk/<direction>/walk_<direction>_<NN>.png
  ```

---

## 12. Validação Visual e Critérios de Aceitação

Todo frame gerado é submetido a inspeção imediata:
1. **Fundo**: 100% transparente ($\alpha = 0$ em toda a área externa à silhueta).
2. **Tamanho**: Exatamente $96\times96$ pixels.
3. **Ancoragem**: Pés em $y=90$, centro em $x=48$.
4. **Teste de Lado a Lado**: O frame gerado é colocado entre os frames originais; se causar estranheza anatômica ou destruturar o estilo, é **rejeitado**.

---

## 13. Critérios de Rejeição e Descarte

O frame deve ser sumariamente descartado e refeito caso apresente:
- Aparência de outro Digimon ou estilização genérica.
- Dimensões corporais discrepantes em mais de 5% dos originais.
- Presença de fundo opaco, sombras de chão fora do padrão ou artefatos visuais.
- Detalhes adicionados que não existem no modelo original do personagem.
- Efeito de blur/antialiasing incompatível com pixel art 1:1.

---

## 14. Registro de Proveniência e Metadados

Todo frame gerado via 4-Way deve conter registro formal de auditoria:
```json
{
  "file": "sprites/agumon/walk/up/walk_up_01.png",
  "action": "walk",
  "direction": "up",
  "frame_index": 1,
  "source": "generated_4way",
  "references": [
    "sprites/agumon/walk/down/walk_down_01.png",
    "sprites/agumon/walk/right/walk_right_01.png",
    "sprites/agumon/idle/idle_01.png"
  ],
  "canvas": "96x96",
  "baseline_y": 90,
  "validation_status": "ACCEPTED"
}
```

---

## 15. Atualização de Manifests

Após validação e aceitação:
1. Incluir as novas chaves em `docs/digital-path/manifests/<digimon>.json`.
2. Se todas as 4 direções (`down`, `up`, `left`, `right`) estiverem cobertas, atualizar:
   ```json
   "movementStyle": "4-way"
   ```
3. Se faltar direção vertical e o fallback for lateral, manter explicitamente:
   ```json
   "movementStyle": "2-way"
   ```

---

## 16. Registro nos Relatórios Finais

Todas as operações de geração direcional devem ser consolidadas nos artefatos:
- `docs/sprite-audit/4way-generation-report.md`
- `docs/sprite-audit/4way-generation-report.json`
- `docs/sprite-audit/digimon-readiness.md`
