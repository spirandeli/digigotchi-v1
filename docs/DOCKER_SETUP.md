# Docker - Digigotchi

Esta versão remove o `package-lock.json` inconsistente que causava o erro `npm ci can only install packages when package.json and package-lock.json are in sync`.

O Dockerfile agora instala as dependências diretamente a partir do `package.json` com `npm install`.

## Recriar o ambiente

```bash
docker compose down -v --remove-orphans
docker compose build --no-cache
docker compose up
```

A aplicação escuta na porta `8080`.

Se o encaminhamento `localhost` do WSL não funcionar no Windows, use o IP do WSL:

```bash
hostname -I
```

E acesse `http://IP_DO_WSL:8080`.

## Gerar um novo package-lock.json

Se quiser voltar a usar `npm ci` no futuro, rode uma vez no projeto:

```bash
npm install
```

Isso gera um `package-lock.json` novo e sincronizado. Depois disso o Dockerfile pode voltar a usar `COPY package.json package-lock.json ./` e `RUN npm ci`.
