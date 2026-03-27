---
title: "Docker"
description: "Deploiement d'ArtisanCMS avec Docker : services, configuration, volumes, production et mise a l'echelle."
---

ArtisanCMS fournit une configuration Docker complete : `Dockerfile`, `docker-compose.yml` et le repertoire `docker/` pour les fichiers de configuration des services.

## Architecture des services

| Service | Image | Role | Port |
|---|---|---|---|
| **app** | PHP 8.3-FPM (custom) | Application Laravel | 9000 (interne) |
| **nginx** | Nginx Alpine | Serveur web | 80, 443 |
| **mysql** | MySQL 8.0 | Base de donnees | 3306 |
| **redis** | Redis Alpine | Cache, sessions, queues | 6379 |

## Demarrage rapide

```bash
cp .env.example .env
docker compose up -d
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate --seed
docker compose exec app php artisan storage:link
docker compose exec app npm ci && docker compose exec app npm run build
```

L'application est accessible sur `http://localhost`.

## docker-compose.yml

```yaml
services:
  app:
    build: .
    volumes:
      - .:/var/www/html
      - storage-data:/var/www/html/storage/app
    depends_on: [mysql, redis]
    environment:
      DB_HOST: mysql
      REDIS_HOST: redis
      CACHE_DRIVER: redis
      QUEUE_CONNECTION: redis

  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes:
      - .:/var/www/html
      - ./docker/nginx/default.conf:/etc/nginx/conf.d/default.conf
    depends_on: [app]

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_DATABASE: artisancms
      MYSQL_USER: artisancms
      MYSQL_PASSWORD: ${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${DB_ROOT_PASSWORD}
    volumes: [mysql-data:/var/lib/mysql]

  redis:
    image: redis:alpine
    volumes: [redis-data:/data]

volumes:
  mysql-data:
  redis-data:
  storage-data:
```

## Dockerfile

```dockerfile
FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libwebp-dev libfreetype6-dev \
    libzip-dev libicu-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install pdo_mysql gd zip intl bcmath opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www/html
COPY . .
RUN composer install --no-dev --optimize-autoloader
RUN npm ci && npm run build
RUN chown -R www-data:www-data storage bootstrap/cache
```

## Variables d'environnement

```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_DATABASE=artisancms
DB_USERNAME=artisancms
DB_PASSWORD=mot_de_passe_securise

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
REDIS_HOST=redis
```

## Volumes et persistance

| Volume | Point de montage | Fonction |
|---|---|---|
| `mysql-data` | `/var/lib/mysql` | Donnees de la base de donnees |
| `redis-data` | `/data` | Cache et sessions persistantes |
| `storage-data` | `/var/www/html/storage/app` | Medias uploades |

## Image personnalisee

```bash
docker build -t artisancms:latest .
docker tag artisancms:latest registry.example.com/artisancms:latest
docker push registry.example.com/artisancms:latest
```

## Docker en production

Recommandations pour la production :

- **Restart policy** : `restart: unless-stopped` sur chaque service.
- **Healthchecks** : verifications de sante sur chaque conteneur.
- **Secrets** : Docker Secrets ou gestionnaire externe au lieu du `.env`.
- **Ressources** : limitez memoire et CPU par conteneur.

```yaml
services:
  app:
    restart: unless-stopped
    deploy:
      resources:
        limits:
          memory: 512M
    healthcheck:
      test: ["CMD", "php-fpm-healthcheck"]
      interval: 30s
```

## Mise a l'echelle

### Docker Swarm

```bash
docker swarm init
docker stack deploy -c docker-compose.yml artisancms
docker service scale artisancms_app=3
```

### Kubernetes

Convertissez la configuration avec Kompose ou creez des manifestes dedies. Configurez un Ingress Controller, des PersistentVolumeClaims et deploiez les bases de donnees en StatefulSets.

:::tip[Conseil]
En developpement, montez le code en volume bind pour le rechargement automatique. En production, copiez le code dans l'image pour de meilleures performances.
:::
