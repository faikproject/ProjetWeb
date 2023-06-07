FROM node:19-alpine

ARG NODE_ENV

WORKDIR /usr/src/app

## COPY nodemon.json ./
COPY package*.json ./

RUN npm i -g npm@9.1.2

RUN npm config set fetch-retry-mintimeout 200000
RUN npm config set fetch-retry-maxtimeout 12000000

RUN npm cache clear --force

RUN npm install -g nodemon
RUN npm install --no-audit

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

## ffmpeg
RUN apk update
RUN apk add
RUN apk add ffmpeg

## EXIFTOOL
RUN apk add gcc libc-dev linux-headers postgresql-dev musl-dev zlib zlib-dev libffi-dev
RUN apk add exiftool

EXPOSE 8080

CMD ["nodemon","-L","server/server.js"];