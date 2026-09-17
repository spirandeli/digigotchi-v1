# Digimon Virtual Pet RPG

## Documento de especificação para desenvolvimento

**Projeto:** Digimon Virtual Pet RPG  
**Tecnologias:** HTML5, CSS3, JavaScript  
**Plataforma inicial:** Navegador desktop e celular  
**Modelo de jogo:** Pet virtual inspirado em Tamagotchi e Pou  
**Sistema de conta:** Login, cadastro e salvamento online  
**Primeiros Digimons:** Agumon, Etemon, Gabumon e Veemon

---

# 1. Visão geral

O projeto será um jogo de Digimon Virtual Pet inspirado na experiência de cuidar de um animal virtual, como em Tamagotchi e Pou.

O jogador deverá criar uma conta, receber ou escolher um Digimon e cuidar dele diariamente. O Digimon terá necessidades, comportamentos, animações, crescimento, experiência, evolução e uma relação contínua com o jogador.

O jogo deverá permitir:

- Alimentar o Digimon.
- Dar banho e cuidar da higiene.
- Colocar o Digimon para dormir.
- Brincar e jogar minijogos.
- Acompanhar fome, felicidade, energia e saúde.
- Ganhar experiência e subir de nível.
- Evoluir para novas formas.
- Comprar itens e decorações.
- Personalizar o ambiente.
- Salvar tudo na conta do jogador.
- Continuar simulando a passagem do tempo mesmo quando o navegador estiver fechado.
- Expandir futuramente para combate, coleção, eventos e RPG.

A proposta não é criar apenas uma tela com uma imagem de Digimon. O objetivo é criar um personagem virtual vivo, com necessidades, reações, personalidade, crescimento e histórico.

---

# 2. Tecnologias

## Front-end

- HTML5 para a estrutura.
- CSS3 para visual e responsividade.
- JavaScript para a lógica.
- Canvas 2D ou elementos HTML para renderização.
- Web Audio API para sons.
- LocalStorage para cache local e preferências.
- Fetch API para comunicação com o servidor.

## Back-end

Uma arquitetura recomendada:

- Node.js.
- Express.
- PostgreSQL.
- Autenticação por sessão segura ou tokens.
- Hospedagem web.
- Banco de dados online.

Uma alternativa é utilizar Supabase para autenticação e banco de dados, reduzindo a quantidade de código de back-end necessário.

O login não deve ser apenas um formulário visual. A autenticação precisa ser real, com validação no servidor e armazenamento seguro.

---

# 3. Sistema de login e contas

## Tela inicial

A tela inicial deverá conter:

1. Logo do jogo.
2. Digimon em destaque.
3. Botão Entrar.
4. Botão Criar conta.
5. Opção de jogar como visitante, se implementada.
6. Configurações de áudio.
7. Idioma.
8. Termos de uso e política de privacidade.

## Cadastro

Campos:

- Nome de usuário.
- E-mail.
- Senha.
- Confirmação de senha.

Regras:

- E-mail válido.
- Nome de usuário único.
- Senha validada.
- Senha armazenada com hash seguro.
- Validação no navegador e no servidor.
- Recuperação de senha.

## Login

O jogador deverá entrar usando e-mail ou nome de usuário e senha.

Depois da autenticação, será direcionado ao mundo virtual.

## Salvamento

Cada conta deverá possuir seus próprios dados:

- Perfil.
- Digimon atual.
- Coleção.
- Inventário.
- Moedas.
- Decorações.
- Evoluções.
- Histórico.
- Configurações.

Exemplo conceitual:

```text
Conta:
  id: 001
  username: jogador
  email: usuario@email.com

Digimon:
  id: 1001
  espécie: Agumon
  apelido: Meu Agumon
  nível: 1
  elemento: Fogo
  vida: 100
  fome: 80
  felicidade: 90
  energia: 100
  experiência: 0
  última_atualização: data
```

---

# 4. Tela principal

A tela principal deverá funcionar como um aplicativo de pet virtual.

## Estrutura visual sugerida

```text
┌─────────────────────────────────────────────┐
│ PERFIL     MOEDAS     NÍVEL             ⚙   │
├─────────────────────────────────────────────┤
│                                             │
│                MUNDO VIRTUAL                │
│                                             │
│                  DIGIMON                    │
│                                             │
│           Quarto / Jardim / Área            │
│                                             │
├─────────────────────────────────────────────┤
│ Fome       ████████░░ 80                     │
│ Felicidade █████████░ 90                     │
│ Energia    ███████░░░ 70                     │
│ Higiene    █████████░ 90                     │
├─────────────────────────────────────────────┤
│ COMIDA  BRINCAR  DORMIR  SAÚDE  LIMPAR       │
├─────────────────────────────────────────────┤
│ CASA  INVENTÁRIO  EVOLUÇÃO  ARENA            │
└─────────────────────────────────────────────┘
```

O layout deverá ser responsivo e funcionar em:

- Computadores.
- Notebooks.
- Tablets.
- Celulares.

Os botões devem ser grandes o suficiente para toque.

---

# 5. O Digimon como personagem vivo

O Digimon deverá possuir estados e animações diferentes.

## Animações

- Idle ou espera.
- Felicidade.
- Tristeza.
- Fome.
- Sono.
- Doença.
- Alimentação.
- Banho.
- Brincadeira.
- Evolução.
- Ataque, caso o combate seja implementado.

## Reações

Quando o jogador alimentar o Digimon:

1. Verificar se existe comida no inventário.
2. Consumir o item.
3. Aumentar a fome.
4. Reproduzir animação de comer.
5. Alterar felicidade, se aplicável.
6. Emitir som.
7. Salvar o estado no servidor.

Quando o jogador não cuidar do Digimon:

1. A fome diminui.
2. A energia pode diminuir.
3. A felicidade pode diminuir.
4. A higiene diminui.
5. A saúde pode ser afetada.
6. O Digimon muda sua animação.
7. O jogador recebe uma notificação.

---

# 6. Sistema de necessidades

## Atributos

| Atributo | Faixa | Função |
|---|---:|---|
| Fome | 0–100 | Indica a necessidade de alimentação |
| Felicidade | 0–100 | Representa satisfação e vínculo |
| Energia | 0–100 | Diminui com atividades |
| Higiene | 0–100 | Indica limpeza |
| Saúde | 0–100 | Afetada por negligência e doenças |
| Experiência | Variável | Usada para progressão |
| Nível | Variável | Define crescimento |
| Disciplina | 0–100 | Pode influenciar comportamento e evolução |

Valores sugeridos para um Digimon recém-criado:

```text
Fome: 100
Felicidade: 80
Energia: 100
Higiene: 100
Saúde: 100
Experiência: 0
Nível: 1
Disciplina: 50
```

Esses valores deverão ser ajustados durante os testes.

---

# 7. Passagem do tempo

O Digimon deverá continuar vivendo quando o jogador fechar o navegador.

O servidor deverá registrar a última atualização e calcular o tempo transcorrido.

Exemplo:

```javascript
const agora = Date.now();

const tempoPassado =
  agora - digimon.ultimaAtualizacao;

const minutosPassados =
  tempoPassado / (1000 * 60);
```

A lógica deverá:

- Usar o horário do servidor.
- Evitar manipulação pelo relógio do computador.
- Limitar a simulação máxima por atualização.
- Impedir valores negativos.
- Recalcular os atributos ao entrar no jogo.
- Salvar a nova data de atualização.

Exemplo ilustrativo:

```text
Último acesso: 12:00
Novo acesso: 15:00
Tempo ausente: 180 minutos

Fome: 100 → 70
Energia: 100 → 80
Felicidade: 80 → 70
```

Os números acima são apenas exemplos.

Recomendação: o Digimon não deve ser apagado automaticamente após alguns dias de ausência. Ele pode ficar debilitado, dormir ou entrar em recuperação, preservando o vínculo e o progresso do jogador.

---

# 8. Alimentação

O jogador terá um inventário de comidas.

## Exemplos de itens

| Item | Efeito sugerido |
|---|---|
| Carne Digital | Recupera fome |
| Fruta Digital | Recupera fome e felicidade |
| Ração Especial | Recupera fome e saúde |
| Comida Elemental | Concede bônus temporário |
| Comida Rara | Usada em eventos ou condições especiais |

Regras:

- Cada alimento possui efeitos configuráveis.
- O item é retirado do inventário.
- A fome não pode passar de 100.
- O Digimon reage visualmente.
- O consumo é salvo no servidor.
- O cliente não pode criar itens sem validação.

---

# 9. Higiene

O jogador deverá cuidar da limpeza do Digimon.

Ações possíveis:

- Banho.
- Escovação.
- Limpeza do quarto.
- Retirada de sujeira.
- Uso de itens de higiene.

Exemplo:

```text
Higiene atual: 35

Jogador usa banho.

Higiene: 35 → 100
Energia: 100 → 95
Felicidade: 70 → 75
```

O banho deverá ter animação e som.

---

# 10. Sono

O Digimon deverá possuir um sistema de descanso.

Regras sugeridas:

- O jogador pode colocar o Digimon para dormir.
- A tela pode escurecer.
- O Digimon possui animação de sono.
- A energia recupera com o tempo.
- O jogador pode acordá-lo.
- O descanso influencia humor e saúde.

O sistema deverá utilizar o horário do servidor ou um horário configurado pelo jogador.

---

# 11. Brincadeiras e minijogos

O jogo deverá possuir atividades simples.

Sugestões:

- Bola.
- Jogo de memória.
- Jogo de reflexo.
- Desviar de obstáculos.
- Clicar em objetos.
- Jogo de alimentação.
- Jogo elemental.

Recompensas possíveis:

- Moedas.
- Experiência.
- Felicidade.
- Itens.

Os minijogos deverão funcionar com mouse e toque.

---

# 12. Moedas e loja

O jogador poderá ganhar moedas através de:

- Minijogos.
- Missões diárias.
- Cuidados com o Digimon.
- Eventos.
- Recompensas de login.
- Conquistas.

A loja poderá vender:

- Comidas.
- Itens de higiene.
- Decorações.
- Roupas.
- Brinquedos.
- Itens de evolução.
- Itens especiais.

As recompensas e compras deverão ser validadas no servidor.

---

# 13. Experiência e níveis

O Digimon ganhará experiência através de:

- Alimentação.
- Brincadeiras.
- Treinamento.
- Minijogos.
- Missões.
- Combates futuros.

Exemplo:

```text
Nível: 1
Experiência: 80 / 100

Ganho: 30 XP

Resultado:
Nível: 2
Experiência: 10 / 150
```

A experiência necessária deverá ser configurável por estágio e espécie.

---

# 14. Sistema de evolução

A evolução será uma das principais características do jogo.

Estrutura conceitual:

```text
Digimon Inicial
  ↓
PRIMEIRA EVOLUÇÃO
  ↓
SEGUNDA EVOLUÇÃO
```

A árvore deverá ser configurável por dados, não codificada com dezenas de condições fixas.

Cada regra de evolução poderá considerar:

- Espécie atual.
- Nível.
- Experiência.
- Elemento.
- Disciplina.
- Felicidade.
- Saúde.
- Item.
- Horário.
- Condição de morte.
- Origem mágica.
- Origem espacial.

---

# 15. Sistema elemental

O projeto possui quatro elementos básicos:

- Fogo.
- Ar.
- Gelo.
- Eletricidade.

## Bebês elementais definidos

| Elemento | Bebê |
|---|---|
| Fogo | Agumon |
| Ar | Veemon |
| Gelo | Gabumon |
| Eletricidade | Etemon |

Esses bebês pertencem à estrutura elemental do projeto.

Os quatro Digimons iniciais jogáveis deste documento são uma seleção especial de espécies que serão inseridas primeiro no jogo.





# 20. Quarto e ambientes

Ambientes previstos:

- Quarto.
- Jardim.
- Área de treino.
- Loja.
- Área de evolução.
- Área de batalha.
- Mundo Digital.

O jogador poderá:

- Trocar papel de parede.
- Colocar móveis.
- Comprar decorações.
- Alterar chão.
- Colocar brinquedos.
- Mudar o ambiente.
- Desbloquear novos locais.

Todas as alterações deverão ser salvas por conta.

---

# 21. Inventário

Categorias:

```text
Comidas
Higiene
Brinquedos
Itens raros
Evolução
Decorações
Roupas
```

Exemplo:

```json
{
  "id": "carne_digital",
  "nome": "Carne Digital",
  "categoria": "comida",
  "quantidade": 10,
  "efeitos": {
    "fome": 20,
    "felicidade": 5
  }
}
```

---

# 22. Notificações

Notificações possíveis:

- Seu Digimon está com fome.
- Seu Digimon está cansado.
- Seu Digimon está doente.
- Seu Digimon evoluiu.
- Você ganhou moedas.
- Uma missão está disponível.
- Um evento começou.

Notificações do navegador devem ser opcionais e depender de permissão.

---

# 23. Perfil e coleção

O perfil deverá mostrar:

- Nome de usuário.
- Avatar.
- Data de criação.
- Digimon atual.
- Moedas.
- Conquistas.
- Coleção.
- Histórico de evoluções.
- Estatísticas.

Digimons ainda não descobertos podem aparecer como silhuetas.

A coleção deverá registrar:

- Espécies descobertas.
- Formas evoluídas.
- Elementos.
- Origem.
- Data de descoberta.
- Quantidade de vezes obtida.

---

# 24. Árvore visual de evolução

A árvore deverá mostrar claramente a origem de cada evolução.

Ao clicar em uma espécie, mostrar:

- Nome.
- Elemento.
- Estágio.
- Descrição visual.
- Origem.
- Evoluções disponíveis.
- Requisitos.
- Histórico.

A árvore deverá permitir:

- Zoom.
- Navegação.
- Filtros por elemento.
- Filtros por estágio.
- Visualização de caminhos alternativos.
- Visualização de caminhos de morte.
- Visualização de origens mágicas e espaciais.

---

# 25. Primeiros Digimons jogáveis

## Regra principal: o jogo começa no estágio Bebê

Os quatro Digimons escolhidos pelo jogador não serão entregues diretamente em sua forma adulta ou de primeira evolução.

O jogador deverá começar com o **Bebê correspondente à linha escolhida**. A espécie escolhida no início define a linha evolutiva principal, mas o primeiro personagem controlável será sempre um Digimon Bebê.

### Seleção inicial

| Linha escolhida |  Digimon Inicial |
|---|---|---|
| Linha de Agumon |
| Linha de Etemon|
| Linha de Gabumon|
| Linha de Veemon |

**Observação:** Botamon e Dodomon já foram definidos no projeto como bebês de Fogo e Gelo. Para Etemon e Veemon, o desenvolvedor deverá cadastrar bebês próprios ou utilizar os bebês oficiais escolhidos posteriormente. Eles não devem começar diretamente como Etemon ou Veemon.

O fluxo geral será:

```text
Escolher uma linha
        ↓
Receber o Digimon Bebê
        ↓
Cuidar, alimentar e brincar
        ↓
Ganhar experiência e cumprir requisitos
        ↓
Evoluir para a primeira forma
        ↓
Continuar a linha evolutiva
```

---

## 25.1 Linha de Agumon — Fogo

**Linha escolhida pelo jogador:** Agumon.  
**Elemento principal:** Fogo.  
**Digimon inicial real:** Botamon.

### Linha evolutiva

```text
Agumon
  ↓
GeoGreymon
  ↓
WarGreymon
```

### Dados sugeridos

```json
{
  "id": "linha_agumon",
  "nome": "Linha de Agumon",
  "elemento": "fogo",
  "bebê_inicial": "botamon",
  "linha": [
    "agumon",
    "geogreymon",
    "wargreymon"
  ]
}
```

### Regras sugeridas

- Botamon: personagem recebido no início.
- Agumon: personagem recebido no início.
- GeoGreymon: primeira evolução após crescimento e requisitos básicos.
- WarGreymon: nível elevado e requisito especial.


## 25.2 Linha de Etemon — Fogo/Música

**Linha escolhida pelo jogador:** Etemon.  
**Elemento principal:** Fogo.  
**Subtema:** Música, palco, espetáculo e primata digital.  
**Digimon inicial real:** Bebê original da linha de Etemon, a ser definido pelo projeto.

### Linha evolutiva inicial proposta

```text
Etemon
  ↓
MetalEtemon
  ↓
KingEtemon
```

### Dados sugeridos

```json
{
  "id": "linha_etemon",
  "nome": "Linha de Etemon",
  "elemento": "fogo",
  "subtema": "musica",
  "bebê_inicial": "etemon",
  "linha": [
    "etemon",
    "metaletemon",
    "kingetemon"
  ]
}
```

### Observação de design

Etemon não será o personagem inicial controlável. Ele será a forma posterior da linha.

O bebê deverá:

- Ter aparência pequena e fofa.
- Apresentar detalhes musicais.
- Possuir animações de dança ou ritmo.
- Evoluir para Etemon após cumprir os requisitos.
- Manter a identidade visual musical da linha.

### Requisitos sugeridos

- Etemon: recebido no início.
- MetalEtemon: crescimento, experiência e cuidados básicos..
- KingEtemon: nível, experiência e item musical.

A espécie e a aparência do bebê deverão ser definidas antes da implementação final.

---

## 25.3 Linha de Gabumon — Gelo

**Linha escolhida pelo jogador:** Gabumon.  
**Elemento principal:** Gelo.  
**Digimon inicial real:** Gabumon.

### Linha evolutiva

```text
Gabumon
  ↓
Garurumon
  ↓
WereGarurumon
```

### Dados sugeridos

```json
{
  "id": "linha_gabumon",
  "nome": "Linha de Gabumon",
  "elemento": "gelo",
  "bebê_inicial": "dodomon",
  "linha": [
    "gabumon",
    "garurumon",
    "weregarurumon",
  ]
}
```

### Regras sugeridas

- Gabumon: personagem recebido no início.
- Garurumon: primeira evolução após crescimento e requisitos básicos.
- WereGarurumon: nível, disciplina e saúde.

### Ramificações futuras

A linha poderá receber:

- Formas alternativas de Gelo.
- Formas mecânicas.
- Formas de Trevas.
- Formas mágicas ligadas a Gelo.
- Formas espaciais ligadas à origem elemental.

---

## 25.4 Linha de Veemon — Eletricidade

**Linha escolhida pelo jogador:** Veemon.  
**Elemento principal:** Eletricidade.  
**Digimon inicial real:** Bebê original da linha de Veemon, a ser definido pelo projeto.

### Linha evolutiva inicial proposta

```text
Veemon
  ↓
Flamedramon
  ↓
ExVeemon
```

### Dados sugeridos

```json
{
  "id": "linha_veemon",
  "nome": "Linha de Veemon",
  "elemento": "eletricidade",
  "bebê_inicial": "veemon",
  "linha": [
    "veemon",
    "flamedramon",
    "exveemon",
  ]
}
```

### Regras sugeridas

- Veemon: recebido no início.
- Flamedramon: nível e experiência.
- ExVeemon: nível, disciplina e treinamento.



## 25.5 Tela de escolha inicial

O jogador verá as quatro linhas disponíveis, não necessariamente as formas adultas.

```text
┌─────────────────────────────────────────────┐
│             ESCOLHA SUA LINHA                │
├─────────────────────────────────────────────┤
│                                             │
│  [BOTAMON]       [BEBÊ ETEMON]               │
│   LINHA AGUMON   LINHA ETEMON                │
│   FOGO           FOGO / MÚSICA               │
│                                             │
│  [DODOMON]       [BEBÊ VEEMON]               │
│   LINHA GABUMON  LINHA VEEMON                │
│   GELO           ELETRICIDADE                │
│                                             │
├─────────────────────────────────────────────┤
│        CONFIRMAR ESCOLHA                    │
└─────────────────────────────────────────────┘
```

Cada cartão deverá mostrar:

- Imagem do bebê.
- Nome do bebê.
- Nome da linha.
- Elemento.
- Descrição.
- Prévia da linha evolutiva.
- Botão de seleção.

Depois da confirmação, o servidor deverá criar uma instância do bebê escolhido.

---

## 25.6 Criação da instância inicial

Exemplo para a linha de Agumon:

```json
{
  "user_id": 1,
  "species_id": "agumon",
  "line_id": "linha_agumon",
  "nickname": "Meu Digimon",
  "level": 1,
  "experience": 0,
  "hunger": 100,
  "happiness": 80,
  "energy": 100,
  "hygiene": 100,
  "health": 100,
  "discipline": 50
}
```

O jogador começa com:

- Nível 1.
- Experiência 0.
- Atributos básicos preenchidos.
- Bebê selecionado.
- Inventário inicial.
- Quarto inicial.
- Tutorial de cuidados.

A primeira evolução deverá ocorrer apenas quando os requisitos forem cumpridos.

---

## 25.7 Regras gerais para todas as linhas

Todos os quatro iniciais deverão seguir as mesmas regras de pet virtual:

1. Começar no estágio Bebê.
2. Receber alimentação inicial.
3. Possuir necessidades básicas.
4. Ganhar experiência.
5. Crescer com o tempo.
6. Evoluir após cumprir requisitos.
7. Ter animações próprias.
8. Ter histórico de evolução.
9. Poder seguir ramificações futuras.
10. Permanecer salvo na conta do jogador.

O sistema deverá separar:

- `line_id`: identifica a linha escolhida.
- `species_id`: identifica a forma atual.
- `stage`: identifica o estágio.
- `element`: identifica o elemento.
- `evolution_rules`: define as próximas formas.

Assim, o jogo poderá começar com um bebê e evoluir corretamente sem precisar criar uma lógica diferente para cada Digimon.

---

# 26. Estrutura dos quatro iniciais

Os quatro Digimons deverão aparecer na tela de escolha inicial.

```text
┌─────────────────────────────────────────────┐
│             ESCOLHA SEU DIGIMON              │
├─────────────────────────────────────────────┤
│                                             │
│  [AGUMON]       [ETEMON]                    │
│   FOGO          FOGO / MÚSICA               │
│                                             │
│  [GABUMON]      [VEEMON]                    │
│   GELO          ELETRICIDADE                │
│                                             │
├─────────────────────────────────────────────┤
│        CONFIRMAR ESCOLHA                    │
└─────────────────────────────────────────────┘
```

Cada cartão deverá mostrar:

- Imagem.
- Nome.
- Elemento.
- Descrição.
- Linha evolutiva.
- Dificuldade ou estilo.
- Botão de seleção.

O jogador deverá confirmar a escolha antes de criar o Digimon.

---

# 27. Cadastro das espécies

Cada espécie deverá ser armazenada separadamente.

Exemplo:

```json
{
  "id": "agumon",
  "name": "Agumon",
  "element": "fogo",
  "stage": "primeira_evolucao",
  "description": "Descrição visual aprovada do Digimon.",
  "image_url": "/assets/digimon/agumon.png",
  "animation_data": {
    "idle": "/assets/digimon/agumon/idle",
    "happy": "/assets/digimon/agumon/happy",
    "sad": "/assets/digimon/agumon/sad"
  }
}
```

A descrição visual deverá ser armazenada em um campo próprio.

Para Digimons oficiais, usar referências adequadas e verificar os direitos de uso caso o projeto seja publicado.

Para criaturas originais, utilizar as descrições visuais aprovadas no projeto.

---

# 28. Banco de dados

## users

```text
id
username
email
password_hash
created_at
updated_at
```

## digimon_species

```text
id
name
element
stage
description
image_url
animation_data
```

## digimon_instances

```text
id
user_id
species_id
nickname
level
experience
hunger
happiness
energy
hygiene
health
discipline
created_at
updated_at
last_simulated_at
```

## evolution_rules

```text
id
from_species_id
to_species_id
required_level
required_item
required_element
required_condition
```

## inventory

```text
id
user_id
item_id
quantity
```

## items

```text
id
name
category
effects
price
```

## evolution_history

```text
id
digimon_id
from_species_id
to_species_id
reason
created_at
```

## player_settings

```text
user_id
sound_enabled
music_enabled
language
timezone
```

---

# 29. Segurança

Obrigatório:

- Hash seguro de senhas.
- Validação no servidor.
- Proteção contra SQL injection.
- Proteção contra XSS.
- Rate limiting no login.
- Controle de sessão.
- Autorização por usuário.
- Validação de moedas.
- Validação de inventário.
- Validação de evolução.
- Validação de atributos.
- Backup do banco.

O cliente nunca deve ser a autoridade final sobre:

- Moedas.
- Experiência.
- Itens.
- Evoluções.
- Saúde.
- Tempo.
- Recompensas.

---

# 30. Estrutura de pastas

```text
digimon-pet/
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── game.html
│   │
│   ├── css/
│   │   ├── global.css
│   │   ├── login.css
│   │   └── game.css
│   │
│   ├── js/
│   │   ├── auth.js
│   │   ├── api.js
│   │   ├── game.js
│   │   ├── pet.js
│   │   ├── evolution.js
│   │   ├── inventory.js
│   │   ├── minigames.js
│   │   └── ui.js
│   │
│   └── assets/
│       ├── digimon/
│       ├── backgrounds/
│       ├── items/
│       ├── sounds/
│       └── animations/
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── digimon.js
│   │   ├── inventory.js
│   │   └── evolution.js
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── middleware/
│   └── database/
│
└── README.md
```

---

# 31. Regras de programação

## Separar lógica e visual

A lógica do Digimon não deve depender diretamente dos botões HTML.

Exemplo:

```javascript
class DigimonPet {
  constructor(data) {
    this.id = data.id;
    this.species = data.species;
    this.hunger = data.hunger;
    this.happiness = data.happiness;
  }

  feed(food) {
    this.hunger = Math.min(
      100,
      this.hunger + food.hunger
    );
  }
}
```

## Usar dados configuráveis

Evitar dezenas de condições fixas:

```javascript
if (digimon === "Agumon") {
  // lógica específica
}
```

Preferir:

- Tabela de espécies.
- Tabela de evoluções.
- Tabela de itens.
- Tabela de elementos.
- Tabela de condições.

## Salvar ações importantes

Salvar no servidor após:

- Alimentação.
- Compra.
- Evolução.
- Morte.
- Mudança de ambiente.
- Minijogo.
- Alteração do inventário.

---

# 32. Fases de desenvolvimento

## Fase 1 — Protótipo

- [ ] Tela inicial.
- [ ] Cadastro.
- [ ] Login.
- [ ] Banco de dados.
- [ ] Escolha entre os quatro iniciais.
- [ ] Um Digimon na tela.
- [ ] Alimentação.
- [ ] Felicidade.
- [ ] Energia.
- [ ] Higiene.
- [ ] Sono.
- [ ] Salvamento online.
- [ ] Responsividade.

## Fase 2 — Pet virtual completo

- [ ] Animações.
- [ ] Inventário.
- [ ] Loja.
- [ ] Moedas.
- [ ] Minijogos.
- [ ] Quarto.
- [ ] Notificações.
- [ ] Experiência.
- [ ] Níveis.

## Fase 3 — Evoluções

- [ ] Linha de Agumon.
- [ ] Linha de Etemon.
- [ ] Linha de Gabumon.
- [ ] Linha de Veemon.
- [ ] Árvore visual.
- [ ] Evoluções alternativas.
- [ ] Mágico.
- [ ] Trevas.
- [ ] Espaço.
- [ ] Histórico.

## Fase 4 — Conteúdo avançado

- [ ] Coleção.
- [ ] Conquistas.
- [ ] Eventos.
- [ ] Mais Digimons.
- [ ] Batalhas.
- [ ] Novos mundos.
- [ ] Personalização avançada.

---

# 33. Design visual

O jogo deverá possuir uma identidade própria, inspirada em pets virtuais e monstros digitais.

Características:

- Colorido.
- Fofo nos estágios iniciais.
- Mais detalhado conforme evolui.
- Animações expressivas.
- Cenários digitais.
- Interface simples.
- Ícones grandes.
- Feedback visual para todas as ações.

O jogo deve parecer vivo, mas continuar fácil de usar.

---

# 34. Requisitos de qualidade

O desenvolvedor deverá entregar:

- Código organizado.
- Projeto executável.
- Login funcional.
- Banco de dados funcional.
- Salvamento online.
- Interface responsiva.
- Sistema de evolução testado.
- Sistema de tempo testado.
- Sistema de morte testado.
- Inventário testado.
- Documentação de instalação.
- Documentação da API.
- Backup e recuperação de dados.

## Testes obrigatórios

### Login

- Criar conta.
- Entrar.
- Sair.
- Recuperar senha.
- Senha incorreta.

### Salvamento

- Alimentar.
- Fechar navegador.
- Abrir novamente.
- Confirmar persistência.

### Evolução

- Atingir nível.
- Cumprir requisito.
- Evoluir.
- Salvar histórico.
- Reabrir o jogo.

### Tempo

- Simular ausência.
- Verificar fome.
- Verificar energia.
- Verificar saúde.
- Evitar valores negativos.

### Segurança

- Alterar moedas pelo console.
- Alterar atributos.
- Enviar requisições inválidas.
- Tentar acessar dados de outra conta.

---

# 35. Instrução final para o desenvolvedor

Desenvolver um jogo de Digimon Virtual Pet para navegador utilizando HTML5, CSS3 e JavaScript, inspirado na experiência de Tamagotchi e Pou.

O jogador deverá criar uma conta, escolher uma das quatro linhas iniciais — Agumon, Etemon, Gabumon ou Veemon — e começar com o Digimon Bebê correspondente, cuidando dele diariamente.

O jogo deverá possuir login real, banco de dados e salvamento online, permitindo que o progresso permaneça disponível mesmo depois de fechar o navegador.

A arquitetura deverá ser modular, segura e preparada para expansão.

O sistema de Digimons deverá ser baseado em espécies, estágios, elementos e regras de evolução configuráveis.

Os quatro primeiros Digimons deverão ser inseridos com linhas evolutivas próprias:

- Botamon → Agumon → Greymon → MetalGreymon → WarGreymon.
- Bebê da linha de Etemon → Etemon → MetalEtemon → evolução especial.
- Dodomon → Gabumon → Garurumon → WereGarurumon → MetalGarurumon.
- Bebê da linha de Veemon → Veemon → ExVeemon → AeroVeedramon → UlforceVeedramon.

As linhas de Etemon e as ramificações alternativas deverão permanecer configuráveis para ajustes posteriores.

O projeto deverá começar com um protótipo funcional contendo login, escolha inicial, um Digimon, cuidados básicos e salvamento online.

Posteriormente, deverá receber inventário, loja, minijogos, árvore de evolução, mortes, formas mágicas, Trevas e Espaço.

O código deverá permitir adicionar novos Digimons, itens, ambientes e evoluções sem reescrever o núcleo do jogo.

O resultado esperado é um pet virtual de Digimon com identidade própria, evolução, vínculo com o jogador e possibilidade de expansão para um RPG completo.

---

# 36. Observações importantes sobre as linhas evolutivas

As linhas deste documento são uma **base inicial de implementação**.

Antes de publicar a versão definitiva, o desenvolvedor deverá:

1. Confirmar os estágios oficiais de cada Digimon.
2. Definir quais ramificações estarão disponíveis.
3. Validar os nomes das formas.
4. Definir os requisitos de evolução.
5. Criar as descrições visuais.
6. Cadastrar imagens e animações.
7. Verificar direitos de uso dos personagens oficiais.
8. Definir quais formas serão originais do projeto.
9. Testar o balanceamento.
10. Registrar tudo na base de dados.

O jogo deverá ser construído de forma que essas decisões possam ser alteradas sem exigir uma reescrita completa.
