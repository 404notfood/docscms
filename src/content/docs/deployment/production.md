---
title: "Mise en production"
description: "Guide complet de deploiement d'ArtisanCMS en production : checklist, configuration serveur, SSL, cron, queues et script de deploiement."
---

Ce guide couvre les etapes pour deployer ArtisanCMS sur un serveur de production.

## Checklist de production

### Variables d'environnement essentielles

```env
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:...     # php artisan key:generate
APP_URL=https://www.monsite.com
```

:::caution[Critique]
Ne deploiez **jamais** avec `APP_DEBUG=true` en production. Cela exposerait des informations sensibles aux visiteurs.
:::

### Base de donnees, cache et messagerie

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=artisancms
DB_USERNAME=artisancms_user
DB_PASSWORD=mot_de_passe_fort

CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_ENCRYPTION=tls
```

## Commandes de deploiement

```bash
php artisan storage:link          # Lien symbolique stockage public
npm run build                     # Compilation des assets frontend
php artisan migrate --force       # Migration de la base de donnees
php artisan optimize              # Optimisation (config, routes, vues)
```

## Configuration serveur web

### Apache

ArtisanCMS inclut un `.htaccess` dans `public/`. Activez `mod_rewrite`.

```apache
<VirtualHost *:443>
    ServerName www.monsite.com
    DocumentRoot /var/www/artisancms/public

    <Directory /var/www/artisancms/public>
        AllowOverride All
        Require all granted
    </Directory>

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/monsite.pem
    SSLCertificateKeyFile /etc/ssl/private/monsite.key
</VirtualHost>
```

### Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name www.monsite.com;
    root /var/www/artisancms/public;
    index index.php;

    ssl_certificate /etc/ssl/certs/monsite.pem;
    ssl_certificate_key /etc/ssl/private/monsite.key;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known) {
        deny all;
    }
}
```

## SSL/TLS

Let's Encrypt fournit des certificats gratuits :

```bash
sudo certbot --nginx -d www.monsite.com -d monsite.com
```

## Taches planifiees (Cron)

```bash
* * * * * cd /var/www/artisancms && php artisan schedule:run >> /dev/null 2>&1
```

| Commande | Frequence | Description |
|---|---|---|
| `cms:publish-scheduled` | Chaque minute | Publie les contenus planifies |
| `cms:analytics:aggregate` | Quotidienne | Agrege les donnees d'analytics |
| `cms:purge-views` | Hebdomadaire | Purge les page views expirees |
| `cms:check-updates` | Quotidienne | Verifie les mises a jour disponibles |

## Files d'attente (Queue Workers)

### Configuration Supervisor

```ini
[program:artisancms-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/artisancms/artisan queue:work redis --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/artisancms/storage/logs/worker.log
```

```bash
sudo supervisorctl reread && sudo supervisorctl update
sudo supervisorctl start artisancms-worker:*
```

## Permissions des fichiers

```bash
sudo chown -R www-data:www-data /var/www/artisancms
sudo find /var/www/artisancms -type d -exec chmod 755 {} \;
sudo find /var/www/artisancms -type f -exec chmod 644 {} \;
sudo chmod -R 775 /var/www/artisancms/storage
sudo chmod -R 775 /var/www/artisancms/bootstrap/cache
```

## Script de deploiement

ArtisanCMS inclut un script `deploy.sh` :

```bash
#!/bin/bash
set -e
echo "Deploiement d'ArtisanCMS..."

git pull origin main
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan optimize
php artisan view:cache
sudo supervisorctl restart artisancms-worker:*

echo "Deploiement termine."
```

:::tip[Conseil]
Testez chaque deploiement sur un environnement de staging avant d'appliquer les changements en production.
:::
