# Front-end Dockerfile
FROM node:16

# Utwórz katalog roboczy
WORKDIR /my-test-app

# Skopiuj pliki package.json i package-lock.json do katalogu roboczego
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj pozostałe pliki projektu do katalogu roboczego
COPY . .

# Dodaj zmienną środowiskową do określenia portu (możesz dostosować, jeśli potrzebujesz innego portu)
ENV PORT 3000

# Dodaj zmienną środowiskową do określenia środowiska jako "production"
ENV NODE_ENV production

# Zbuduj aplikację React
RUN npm run build

# Ustawanie portu na zewnątrz kontenera
EXPOSE $PORT

# Uruchom serwer Node.js
CMD ["npm", "start"]