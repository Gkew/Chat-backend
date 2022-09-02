FROM node:12-alpine

RUN mkdir -p /chat-backend

WORKDIR /chat-backend

COPY package*.json ./

USER node

RUN npm install

COPY . /chat-backend

EXPOSE 3000

