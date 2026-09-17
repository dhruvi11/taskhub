FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Prisma
COPY prisma ./prisma
RUN npx prisma generate

# TypeScript configuration
COPY tsconfig.json ./

# Application source
COPY src ./src

# Build production JavaScript
RUN npm run build

# Render will route traffic to this port
EXPOSE 10000

# Start production server
CMD ["npm", "start"]