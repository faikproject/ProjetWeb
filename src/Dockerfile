FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY src/.env ./.env
COPY src/postcss.config.js ./postcss.config.js
COPY src/tailwind.config.js ./tailwind.config.js

EXPOSE 3001