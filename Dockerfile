FROM node:12-alpine

RUN mkdir -p /chat-backend/node_modules && chown -R node:node /chat-backend/server.js

WORKDIR /chat-backend/server.js

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "node", "app.js" ]
