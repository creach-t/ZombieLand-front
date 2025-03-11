FROM node:18-alpine

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier les fichiers source
COPY . .

# Exposer le port utilisé par l'application
EXPOSE 5173

# Commande pour lancer l'application en mode développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
