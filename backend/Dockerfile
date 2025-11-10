# Utiliser Node.js officiel
FROM node:18-bullseye

# Définir le dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code du backend
COPY . .

# Exposer le port utilisé par le serveur
EXPOSE 5000

# Commande pour démarrer le serveur
CMD ["npm", "start"]
