# Étape 1 : Utiliser une image Node.js légère
FROM node:16-alpine AS build

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers du build dans le dossier par défaut de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port sur lequel Nginx sera accessible
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
