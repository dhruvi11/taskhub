FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma ./prisma

RUN npx prisma generate

COPY tsconfig.json ./
COPY src ./src

EXPOSE 5050

CMD ["npm", "run", "dev"]