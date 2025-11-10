# Utilisation d'une image Node.js légère
FROM node:18-bullseye

# Installer Python pour exécuter les scripts
RUN apt-get update && apt-get install -y python3 python3-pip

# Créer le dossier d’exécution isolé
WORKDIR /sandbox

# Copier les fichiers nécessaires
COPY sandbox.js /sandbox/
COPY run_code.sh /sandbox/
RUN chmod +x /sandbox/run_code.sh

# Limiter les permissions (pas de root)
USER node

# Commande par défaut
CMD ["node", "sandbox.js"]
