---
title: Configuration
description: Reference complete de la configuration d'ArtisanCMS via le fichier config/cms.php et les variables d'environnement .env.
---

La configuration d'ArtisanCMS repose sur deux mecanismes principaux : le fichier `config/cms.php` pour les parametres applicatifs et le fichier `.env` pour les variables d'environnement.

## Variables d'environnement (.env)

Le fichier `.env` situe a la racine du projet contient les parametres sensibles et specifiques a l'environnement. Il ne doit jamais etre versionne.

### Application

```bash
APP_NAME=ArtisanCMS
APP_ENV=production
APP_KEY=base64:...
APP_DEBUG=false
APP_URL=https://www.example.com
APP_LOCALE=fr
APP_TIMEZONE=Europe/Paris
```

| Variable | Description | Valeurs possibles |
|---|---|---|
| `APP_NAME` | Nom de l'application | Chaine de caracteres |
| `APP_ENV` | Environnement d'execution | `local`, `staging`, `production` |
| `APP_KEY` | Cle de chiffrement (generee automatiquement) | Cle base64 |
| `APP_DEBUG` | Mode debogage | `true`, `false` |
| `APP_URL` | URL publique du site | URL complete |
| `APP_LOCALE` | Langue par defaut | `fr`, `en`, `es`, `de`, `it`, `pt`, `nl` |
| `APP_TIMEZONE` | Fuseau horaire | Fuseau PHP valide |

### Base de donnees

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=artisancms
DB_USERNAME=artisancms_user
DB_PASSWORD=mot_de_passe_securise
```

### Messagerie

```bash
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=noreply@example.com
MAIL_PASSWORD=mot_de_passe_smtp
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@example.com
MAIL_FROM_NAME="${APP_NAME}"
```

### Cache, sessions et files d'attente

```bash
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

| Variable | Description | Valeurs recommandees |
|---|---|---|
| `CACHE_DRIVER` | Pilote de cache | `file`, `redis`, `memcached`, `database` |
| `QUEUE_CONNECTION` | Pilote de file d'attente | `sync`, `redis`, `database` |
| `SESSION_DRIVER` | Pilote de session | `file`, `redis`, `database`, `cookie` |
| `SESSION_LIFETIME` | Duree de session (minutes) | `120` |

:::tip[Astuce]
En production, utilisez `redis` pour le cache, les sessions et les files d'attente afin d'obtenir les meilleures performances.
:::

---

## Fichier config/cms.php

Le fichier `config/cms.php` centralise toute la configuration specifique a ArtisanCMS. Voici sa structure complete avec les explications de chaque section.

### Structure complete

```php
<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Prefixe d'administration
    |--------------------------------------------------------------------------
    |
    | Definit le prefixe URL pour acceder au panneau d'administration.
    | Par defaut : 'admin' -> accessible via /admin
    |
    */
    'admin_prefix' => env('CMS_ADMIN_PREFIX', 'admin'),

    /*
    |--------------------------------------------------------------------------
    | Medias
    |--------------------------------------------------------------------------
    |
    | Configuration de l'upload et du traitement des fichiers medias.
    |
    */
    'media' => [
        'upload_max_size' => env('CMS_UPLOAD_MAX_SIZE', 10240), // en Ko (10 Mo)
        'allowed_mime_types' => [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml',
            'application/pdf',
            'video/mp4',
            'video/webm',
            'audio/mpeg',
            'audio/wav',
            'application/zip',
            'application/x-rar-compressed',
            'text/plain',
            'text/csv',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ],
        'image_optimization' => [
            'driver' => env('CMS_IMAGE_DRIVER', 'gd'), // 'gd' ou 'imagick'
            'quality' => 85,
            'responsive_sizes' => [320, 640, 768, 1024, 1280, 1536, 1920],
            'thumbnail' => [
                'width' => 300,
                'height' => 300,
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Cache
    |--------------------------------------------------------------------------
    |
    | Durees de vie du cache (TTL) par composant, en secondes.
    |
    */
    'cache' => [
        'settings'   => 3600,   // 1 heure
        'pages'      => 600,    // 10 minutes
        'menus'      => 1800,   // 30 minutes
        'themes'     => 3600,   // 1 heure
        'plugins'    => 3600,   // 1 heure
        'blocks'     => 1800,   // 30 minutes
        'taxonomies' => 1800,   // 30 minutes
    ],

    /*
    |--------------------------------------------------------------------------
    | Analytics
    |--------------------------------------------------------------------------
    |
    | Configuration du module d'analytics integre.
    |
    */
    'analytics' => [
        'enabled' => env('CMS_ANALYTICS_ENABLED', true),
        'retention_days' => env('CMS_ANALYTICS_RETENTION', 365),
        'exclude_bots' => true,
        'exclude_admin' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Multi-site
    |--------------------------------------------------------------------------
    |
    | Configuration pour la gestion multi-site.
    |
    */
    'multisite' => [
        'enabled' => env('CMS_MULTISITE_ENABLED', false),
        'shared_database' => true,
        'domain_mapping' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Localisation
    |--------------------------------------------------------------------------
    |
    | Langues disponibles pour le front-office et l'administration.
    |
    */
    'locales' => [
        'supported' => ['fr', 'en', 'es', 'de', 'it', 'pt', 'nl'],
        'default' => env('APP_LOCALE', 'fr'),
        'fallback' => 'en',
    ],

    /*
    |--------------------------------------------------------------------------
    | Consentement cookies
    |--------------------------------------------------------------------------
    |
    | Configuration de la banniere de consentement aux cookies (RGPD).
    |
    */
    'cookie_consent' => [
        'enabled' => env('CMS_COOKIE_CONSENT', true),
        'position' => 'bottom',       // 'bottom', 'top', 'modal'
        'style' => 'bar',             // 'bar', 'box', 'modal'
        'categories' => [
            'necessary' => true,       // Toujours actif, non desactivable
            'analytics' => false,      // Desactive par defaut
            'marketing' => false,      // Desactive par defaut
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Strategie de mise a jour
    |--------------------------------------------------------------------------
    |
    | Definit le comportement des mises a jour automatiques
    | pour les plugins et les themes.
    |
    */
    'update_strategy' => env('CMS_UPDATE_STRATEGY', 'minor'),
    // 'disabled' -> Aucune mise a jour automatique
    // 'minor'    -> Mises a jour mineures et correctifs uniquement
    // 'all'      -> Toutes les mises a jour (mineures et majeures)

];
```

---

## Detail des sections

### Prefixe d'administration

Le prefixe d'administration definit le segment d'URL pour acceder au panneau d'administration. Par defaut, il est regle sur `admin`, ce qui rend l'interface accessible via `/admin`.

```bash
CMS_ADMIN_PREFIX=admin
```

Pour modifier le prefixe (par exemple, pour des raisons de securite) :

```bash
CMS_ADMIN_PREFIX=gestion
```

L'administration sera alors accessible via `/gestion`.

:::caution[Attention]
Apres avoir modifie le prefixe, videz le cache des routes :
```bash
php artisan route:clear
php artisan route:cache
```
:::

### Configuration des medias

#### Limite d'upload

La valeur `upload_max_size` est exprimee en kilo-octets. La valeur par defaut est `10240` (10 Mo). Assurez-vous que les directives PHP `upload_max_filesize` et `post_max_size` dans votre `php.ini` sont coherentes :

```ini
; php.ini
upload_max_filesize = 10M
post_max_size = 12M
```

#### Types MIME autorises

La liste `allowed_mime_types` definit les types de fichiers acceptes par la mediatheque. Vous pouvez la modifier dans `config/cms.php` pour ajouter ou retirer des types selon vos besoins.

#### Optimisation d'images

ArtisanCMS genere automatiquement des variantes responsives pour chaque image uploadee :

| Parametre | Valeur par defaut | Description |
|---|---|---|
| `driver` | `gd` | Moteur de traitement d'image (`gd` ou `imagick`) |
| `quality` | `85` | Qualite de compression JPEG/WebP (1-100) |
| `responsive_sizes` | `[320, 640, 768, 1024, 1280, 1536, 1920]` | Largeurs generees en pixels |
| `thumbnail.width` | `300` | Largeur de la miniature en pixels |
| `thumbnail.height` | `300` | Hauteur de la miniature en pixels |

### Configuration du cache

Chaque composant du CMS possede sa propre duree de cache (TTL) pour un controle fin des performances :

| Composant | TTL par defaut | Description |
|---|---|---|
| `settings` | 3600s (1h) | Parametres globaux du site |
| `pages` | 600s (10min) | Contenu des pages |
| `menus` | 1800s (30min) | Menus de navigation |
| `themes` | 3600s (1h) | Configuration des themes |
| `plugins` | 3600s (1h) | Configuration des plugins |
| `blocks` | 1800s (30min) | Blocs du Page Builder |
| `taxonomies` | 1800s (30min) | Categories et etiquettes |

Pour vider manuellement le cache :

```bash
# Vider tout le cache
php artisan cache:clear

# Vider le cache specifique au CMS
php artisan cms:cache-clear
```

### Analytics

Le module d'analytics integre collecte des donnees de frequentation sans dependance externe. Les parametres disponibles sont :

```bash
CMS_ANALYTICS_ENABLED=true
CMS_ANALYTICS_RETENTION=365
```

- **`enabled`** -- Active ou desactive la collecte de donnees.
- **`retention_days`** -- Duree de conservation des donnees en jours.
- **`exclude_bots`** -- Exclut automatiquement les robots d'indexation.
- **`exclude_admin`** -- Exclut les visites des administrateurs connectes.

### Multi-site

Lorsque le mode multi-site est active, ArtisanCMS permet de gerer plusieurs sites depuis une seule installation :

```bash
CMS_MULTISITE_ENABLED=true
```

- **`shared_database`** -- Les sites partagent la meme base de donnees avec isolation par prefixe.
- **`domain_mapping`** -- Chaque site peut etre associe a son propre nom de domaine.

Consultez la section [Multi-site](/multisite/overview/) pour une configuration detaillee.

### Localisation

ArtisanCMS supporte sept langues de maniere native :

| Code | Langue |
|---|---|
| `fr` | Francais |
| `en` | Anglais |
| `es` | Espagnol |
| `de` | Allemand |
| `it` | Italien |
| `pt` | Portugais |
| `nl` | Neerlandais |

La langue par defaut est definie via `APP_LOCALE` dans le fichier `.env`. La langue de repli (`fallback`) est l'anglais.

### Consentement cookies

La banniere de consentement aux cookies est conforme au RGPD et configurable :

- **`position`** -- Position de la banniere : `bottom`, `top` ou `modal`.
- **`style`** -- Style visuel : `bar` (barre), `box` (boite) ou `modal` (fenetre modale).
- **`categories`** -- Les cookies `necessary` sont toujours actifs. Les categories `analytics` et `marketing` sont desactivees par defaut et necessitent le consentement de l'utilisateur.

### Strategie de mise a jour

La strategie de mise a jour controle le comportement des mises a jour automatiques pour les plugins et les themes :

```bash
CMS_UPDATE_STRATEGY=minor
```

| Strategie | Comportement |
|---|---|
| `disabled` | Aucune mise a jour automatique. Les mises a jour doivent etre effectuees manuellement. |
| `minor` | Installe automatiquement les correctifs et mises a jour mineures (ex: 1.2.3 -> 1.2.4 ou 1.3.0). |
| `all` | Installe toutes les mises a jour, y compris les mises a jour majeures (ex: 1.x -> 2.x). |

:::caution[Attention]
La strategie `all` est deconseille en production car les mises a jour majeures peuvent introduire des changements non retrocompatibles.
:::
