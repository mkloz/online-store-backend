FROM node:18.7 AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

# FROM node:18-alpine AS store
# WORKDIR /app
# COPY . .
# COPY --from=builder /dist ./dist
# RUN npm install --omit=dev && apk --no-cache add curl
