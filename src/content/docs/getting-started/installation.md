---
title: Installation
description: Guide d'installation complet d'ArtisanCMS, en mode classique ou via Docker, avec l'assistant d'installation web.
---

ArtisanCMS propose deux methodes d'installation : une installation classique sur votre serveur ou une installation conteneurisee via Docker.

## Methode 1 : Installation classique

### Cloner le depot

```bash
git clone https://github.com/artisancms/artisancms.git
cd artisancms
```

### Installer les dependances

```bash
# Dependances PHP
composer install

# Dependances front-end
npm install
```

### Configurer l'environnement

Copiez le fichier d'environnement et generez la cle d'application :

```bash
cp .env.example .env
php artisan key:generate
```

Editez ensuite le fichier `.env` pour configurer votre base de donnees et les autres parametres :

```env
APP_NAME=ArtisanCMS
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=artisancms
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null

CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
```

### Lancer l'installation

Vous avez deux options pour proceder a l'installation initiale.

#### Option A : Installation rapide en ligne de commande

La commande `cms:install --quick` execute automatiquement les migrations, cree un compte administrateur par defaut et configure les parametres de base :

```bash
php artisan cms:install --quick
```

Cette commande effectue les etapes suivantes :
1. Verification des prerequis systeme
2. Execution des migrations de base de donnees
3. Creation du compte administrateur
4. Configuration des parametres par defaut du site
5. Publication des assets

#### Option B : Assistant d'installation web

Lancez le serveur de developpement, puis accedez a l'assistant via votre navigateur :

```bash
php artisan serve
```

Rendez-vous sur `http://localhost:8000/install` pour demarrer l'assistant d'installation multi-etapes (voir la section [Etapes de l'assistant](#etapes-de-lassistant-dinstallation) ci-dessous).

### Compiler les assets de production

Une fois l'installation terminee, compilez les assets front-end pour la production :

```bash
npm run build
```

### Demarrer le serveur de developpement

Plusieurs options sont disponibles pour le developpement local :

```bash
# Serveur PHP uniquement
php artisan serve

# Compilation front-end en mode watch
npm run dev

# Commande combinee : serveur PHP + compilation front-end
composer run dev
```

:::tip[Astuce]
La commande `composer run dev` lance simultanement le serveur Laravel et le watcher Vite. C'est la methode recommandee pour le developpement local.
:::

---

## Methode 2 : Docker

ArtisanCMS inclut un fichier `docker-compose.yml` preconfigure pour un deploiement rapide.

### Lancer les conteneurs

```bash
docker compose up -d
```

Cette commande demarre les services suivants :
- **app** -- Conteneur PHP-FPM avec l'application ArtisanCMS
- **nginx** -- Serveur web Nginx comme reverse proxy
- **mysql** -- Base de donnees MySQL 8
- **redis** -- Serveur de cache Redis

### Acceder a l'application

Une fois les conteneurs demarres, l'application est accessible sur le port configure (par defaut `http://localhost:8080`).

### Structure du Dockerfile

Le `Dockerfile` fourni est base sur une image PHP-FPM optimisee :

```dockerfile
FROM php:8.3-fpm

# Installation des dependances systeme
RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libjpeg-dev libfreetype6-dev \
    libxml2-dev libzip-dev libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring xml bcmath gd zip

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installation de Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

RUN chown -R www-data:www-data storage bootstrap/cache

EXPOSE 9000
CMD ["php-fpm"]
```

### Configuration Docker Compose

Exemple de fichier `docker-compose.yml` :

```yaml
services:
  app:
    build: .
    volumes:
      - .:/var/www/html
    depends_on:
      - mysql
      - redis
    environment:
      - DB_HOST=mysql
      - REDIS_HOST=redis

  nginx:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - .:/var/www/html
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - app

  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: artisancms
    volumes:
      - mysql_data:/var/lib/mysql
    ports:
      - "3306:3306"

  redis:
    image: redis:alpine
    ports:
      - "6379:6379"

volumes:
  mysql_data:
```

:::note
Pour un environnement de production Docker, pensez a definir des mots de passe securises, a configurer les volumes persistants et a mettre en place un reverse proxy avec certificat SSL.
:::

---

## Etapes de l'assistant d'installation

L'assistant d'installation web (`/install`) guide l'utilisateur a travers cinq etapes successives.

### Etape 1 : Verification des prerequis

Le service `RequirementsChecker` analyse automatiquement votre environnement et verifie :

- Version de PHP (8.3+ requise)
- Extensions PHP requises (BCMath, Ctype, Fileinfo, etc.)
- Permissions d'ecriture sur les repertoires `storage/` et `bootstrap/cache/`
- Presence de Composer et Node.js

Un indicateur visuel (vert/rouge) s'affiche pour chaque prerequis. Tous les elements doivent etre valides pour passer a l'etape suivante.

### Etape 2 : Configuration de la base de donnees

Le service `DatabaseConfigurator` permet de configurer la connexion a la base de donnees :

- Choix du moteur (MySQL ou MariaDB)
- Hote, port, nom de la base, identifiants
- Test de connexion automatique
- Execution des migrations

L'assistant tente une connexion de test avant de valider la configuration. En cas d'erreur, un message explicite est affiche.

### Etape 3 : Creation du compte administrateur

Renseignez les informations du premier compte administrateur :

- Nom complet
- Adresse e-mail
- Mot de passe (minimum 8 caracteres, avec confirmation)

Ce compte dispose de tous les privileges sur l'installation.

### Etape 4 : Parametres du site

Configurez les informations de base du site :

- **Nom du site** -- Affiche dans l'en-tete et le titre des pages
- **Description** -- Meta-description par defaut pour le referencement
- **Locale** -- Langue principale du site (fr, en, es, de, it, pt, nl)

### Etape 5 : Selection d'un template (optionnel)

Choisissez un template de demarrage parmi les modeles proposes. Cette etape est facultative mais permet de disposer immediatement de :

- Pages de demonstration preconcues
- Structure de navigation d'exemple
- Contenu de demonstration (textes, images)
- Configuration de theme predefinie

Si vous preferez partir de zero, vous pouvez ignorer cette etape.

---

## Apres l'installation

Une fois l'installation terminee, vous pouvez :

- Acceder au panneau d'administration a l'adresse `/admin`
- Commencer a creer du contenu avec le Page Builder
- Configurer les plugins et les themes

Consultez le guide [Premier lancement](/getting-started/first-launch/) pour les etapes de configuration initiale recommandees.
