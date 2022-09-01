FROM node:12-alpine

WORKDIR /chat-backend

COPY package*.json ./

USER node

RUN npm install

EXPOSE 3000
