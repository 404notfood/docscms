---
title: Prerequis
description: Configuration systeme requise et recommandee pour installer et faire fonctionner ArtisanCMS.
---

Avant d'installer ArtisanCMS, assurez-vous que votre environnement repond aux exigences suivantes.

## Specifications

Le tableau ci-dessous resume les specifications minimales et recommandees pour faire fonctionner ArtisanCMS dans de bonnes conditions.

| Composant | Minimum requis | Recommande |
|---|---|---|
| **PHP** | 8.3 | 8.4+ |
| **Composer** | 2.x | Derniere version stable |
| **Node.js** | 20.x | 22 LTS |
| **npm** | 10.x | Derniere version stable |
| **Base de donnees** | MySQL 8.0 / MariaDB 10.6 | MySQL 8.4+ / MariaDB 11+ |
| **Serveur web** | Apache 2.4 ou Nginx 1.20 | Nginx 1.26+ |
| **Espace disque** | 500 Mo | 2 Go+ |
| **RAM** | 512 Mo | 1 Go+ |
| **Cache** | Fichier (par defaut) | Redis 7+ |

## PHP 8.3+

ArtisanCMS necessite PHP 8.3 ou superieur. Les extensions PHP suivantes doivent etre activees :

| Extension | Description |
|---|---|
| **BCMath** | Calculs mathematiques de precision arbitraire |
| **Ctype** | Verification de type de caracteres |
| **Fileinfo** | Detection du type MIME des fichiers |
| **JSON** | Encodage et decodage JSON |
| **Mbstring** | Gestion des chaines de caracteres multi-octets |
| **OpenSSL** | Chiffrement et securite |
| **PDO** | Couche d'abstraction d'acces aux bases de donnees |
| **Tokenizer** | Analyse lexicale PHP |
| **XML** | Traitement des documents XML |
| **GD** ou **Imagick** | Manipulation et optimisation d'images |

Pour verifier votre version de PHP et les extensions installees :

```bash
# Version de PHP
php -v

# Extensions actives
php -m

# Verification detaillee d'une extension specifique
php -m | grep -i bcmath
```

:::tip[Astuce]
Sous Ubuntu/Debian, vous pouvez installer les extensions manquantes avec :
```bash
sudo apt install php8.3-bcmath php8.3-ctype php8.3-fileinfo php8.3-mbstring \
  php8.3-xml php8.3-gd php8.3-mysql php8.3-tokenizer php8.3-curl
```
:::

## Composer 2.x

Composer est le gestionnaire de dependances PHP utilise pour installer ArtisanCMS et ses packages.

```bash
# Verifier la version
composer --version

# Installer Composer (si necessaire)
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php composer-setup.php --install-dir=/usr/local/bin --filename=composer
php -r "unlink('composer-setup.php');"
```

## Node.js 20+ et npm 10+

Node.js et npm sont necessaires pour compiler les assets front-end (React, CSS, etc.).

```bash
# Verifier les versions
node -v
npm -v
```

:::note
Il est recommande d'utiliser un gestionnaire de versions Node.js tel que [nvm](https://github.com/nvm-sh/nvm) ou [fnm](https://github.com/Schniz/fnm) pour gerer plusieurs versions de Node.js.
:::

## Base de donnees

ArtisanCMS supporte les moteurs de base de donnees suivants :

- **MySQL 8.0+** -- Option recommandee pour la production.
- **MariaDB 10.6+** -- Alternative compatible, performante en lecture.

```bash
# Verifier la version MySQL
mysql --version

# Verifier la version MariaDB
mariadb --version
```

Assurez-vous que le jeu de caracteres par defaut est configure en `utf8mb4` avec la collation `utf8mb4_unicode_ci` pour un support complet de l'Unicode.

## Serveur web

### Apache

Apache doit avoir le module `mod_rewrite` active pour la reecriture d'URL. ArtisanCMS inclut un fichier `.htaccess` preconfigure.

```bash
# Activer mod_rewrite
sudo a2enmod rewrite
sudo systemctl restart apache2
```

### Nginx

Pour Nginx, une configuration de base est necessaire pour rediriger les requetes vers le front controller Laravel :

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/artisancms/public;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## Redis (recommande)

Redis est fortement recommande pour la gestion du cache et des files d'attente (queues) en production.

```bash
# Installer Redis
sudo apt install redis-server

# Verifier le fonctionnement
redis-cli ping
# Reponse attendue : PONG
```

Configurez ensuite les variables d'environnement dans votre fichier `.env` :

```bash
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

## Docker (optionnel)

Pour un deploiement conteneurise, ArtisanCMS fournit un fichier `docker-compose.yml` preconfigure. Les seuls prerequis sont :

- **Docker Engine** 24+
- **Docker Compose** v2+

```bash
# Verifier les versions
docker --version
docker compose version
```

:::caution[Attention]
Docker est une option alternative d'installation. Si vous choisissez cette methode, les prerequis PHP, Composer, Node.js et serveur web n'ont pas besoin d'etre installes sur votre machine hote, car tout est encapsule dans les conteneurs.
:::

## Verification rapide

Utilisez le script suivant pour verifier que votre environnement repond aux exigences minimales :

```bash
#!/bin/bash
echo "=== Verification des prerequis ArtisanCMS ==="

echo -n "PHP 8.3+ : "
php -r "echo (version_compare(PHP_VERSION, '8.3.0', '>=') ? 'OK' : 'NON') . ' (' . PHP_VERSION . ')';" 2>/dev/null || echo "NON INSTALLE"

echo -n "Composer 2.x : "
composer --version 2>/dev/null | grep -q "2\." && echo "OK" || echo "NON"

echo -n "Node.js 20+ : "
node -v 2>/dev/null | grep -qE "v(2[0-9]|[3-9][0-9])" && echo "OK ($(node -v))" || echo "NON"

echo -n "npm 10+ : "
npm -v 2>/dev/null | grep -qE "^1[0-9]\." && echo "OK ($(npm -v))" || echo "NON"

echo -n "MySQL/MariaDB : "
mysql --version 2>/dev/null || echo "NON INSTALLE"

echo ""
echo "Extensions PHP requises :"
for ext in bcmath ctype fileinfo json mbstring openssl pdo tokenizer xml gd; do
  echo -n "  $ext : "
  php -m 2>/dev/null | grep -qi "$ext" && echo "OK" || echo "MANQUANTE"
done
```
