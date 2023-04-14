# Utiliser une image de base avec Node.js
FROM node:lts

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le code source de l'application dans le conteneur
COPY . .

# Exposer le port 4200 pour l'exécution de l'application Angular
EXPOSE 4200

# Démarrer l'application Angular en mode développement
CMD ["npm", "run", "start"]
