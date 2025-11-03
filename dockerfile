# Utiliser une image Node (compatible Bun)
FROM jarredsumner/bun:edge

WORKDIR /app

# Copier les fichiers package / bun.lockb
COPY package.json bun.lockb ./

# Installer les dépendances
RUN bun install

# Copier le reste du projet
COPY . .

# Exposer le port
EXPOSE 5173

# Commande pour lancer le dev (ou build + preview)
CMD ["bun", "dev", "--host", "0.0.0.0"]
