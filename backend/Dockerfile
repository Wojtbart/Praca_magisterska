FROM node:16-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

RUN apt-get update || : && apt-get install python -y

RUN pip install -r requirements.txt

EXPOSE 9005

CMD [ "node", "app.js" ]