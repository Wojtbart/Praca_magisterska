# Backend Dockerfile
FROM ubuntu:22.04

RUN mkdir -p /usr/src/app/backend/node_modules

WORKDIR /usr/src/app/backend

RUN apt-get update && apt-get install -y \
 locales \
 python3-pip \
 curl

COPY /backend/package*.json ./
COPY /backend/requirements.txt ./

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt install nodejs -y
RUN apt install npm -y

RUN npm cache clean -f
RUN npm config set strict-ssl false
RUN npm install -g n
RUN n stable
RUN ln -sf /usr/local/n/versions/node/7.8.0/bin/node /usr/bin/node

RUN npm install

RUN apt-get install -y python3

COPY --chown=node:node /backend/ .
COPY --chown=node:node /*.py /usr/src/app/
COPY --chown=node:node /*.ini /usr/src/app/

RUN pip install -r requirements.txt

EXPOSE 9005

CMD [ "node", "app.js" ]
