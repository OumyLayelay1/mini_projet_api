# Dockerfile pour API REST Node.js/Express/MongoDB

# Utiliser une image Node.js Alpine (plus légère)
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json (si disponible)
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production && npm cache clean --force

# Copier le code source de l'application
COPY . .

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Changer la propriété des fichiers
RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

# Exposer le port sur lequel l'application s'exécute
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Commande pour démarrer l'application
CMD ["node", "index.js"]

# Alternative pour le développement (commentée)
# CMD ["npm", "start"]