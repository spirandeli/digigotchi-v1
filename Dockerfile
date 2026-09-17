FROM node:22-alpine

WORKDIR /app

# O lock anterior estava fora de sincronia com package.json e fazia o npm ci falhar.
# Instalamos a partir do package.json para o ambiente de desenvolvimento Docker.
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
