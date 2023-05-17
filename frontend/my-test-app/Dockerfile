# Frontend Dockerfile
FROM node:16-alpine

RUN mkdir -p /home/react/app/node_modules && chown -R node:node /home/react/app

WORKDIR /home/react/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]