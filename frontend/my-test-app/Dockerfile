# Front-end Dockerfile
FROM node:16-alpine

RUN mkdir -p /home/react/app/node_modules && chown -R node:node /home/react/app

# Utwórz katalog roboczy
WORKDIR /home/react/app

# Skopiuj pliki package.json i package-lock.json do katalogu roboczego
COPY --chown=node:node package*.json ./

USER node

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY --chown=node:node . .

# Dodaj zmienną środowiskową do określenia środowiska jako "production"
ENV NODE_ENV production

# Zbuduj aplikację React
RUN npm run build

# Ustawanie portu na zewnątrz kontenera
EXPOSE 3000

# Uruchom serwer Node.js
CMD ["npm", "start"]