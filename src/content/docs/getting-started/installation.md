---
title: Installation
description: Guide d'installation complet d'ArtisanCMS avec l'assistant graphique, la ligne de commande ou Docker.
---

ArtisanCMS propose deux méthodes d'installation : classique sur votre serveur ou conteneurisée via Docker. Dans les deux cas, un **assistant d'installation graphique** vous guide étape par étape.

## Méthode 1 : Installation classique

### Cloner le dépôt

```bash
git clone https://github.com/404notfood/artisancms.git
cd artisancms
```

### Installer les dépendances

```bash
# Dépendances PHP
composer install

# Dépendances front-end
npm install
```

### Configurer l'environnement

```bash
cp .env.example .env
php artisan key:generate
```

Éditez le fichier `.env` pour configurer au minimum la base de données :

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=artisancms
DB_USERNAME=root
DB_PASSWORD=votre_mot_de_passe
```

### Lancer l'installation

#### Option A : Assistant d'installation graphique (recommandé)

Démarrez le serveur puis ouvrez votre navigateur :

```bash
php artisan serve
```

Rendez-vous sur `http://localhost:8000/install`. L'assistant vous guide en **6 étapes** (voir la section détaillée ci-dessous).

:::tip[Astuce]
L'assistant graphique est la méthode recommandée. Il vérifie automatiquement les prérequis, teste la connexion à la base de données et configure tout pour vous.
:::

#### Option B : Installation rapide en ligne de commande

```bash
php artisan cms:install --quick
```

Cette commande utilise les valeurs par défaut et les variables du `.env` pour tout configurer automatiquement. Le compte admin créé sera `admin@artisancms.dev` avec le mot de passe `password`.

Pour une installation interactive en CLI (avec prompts pour chaque paramètre) :

```bash
php artisan cms:install
```

### Compiler les assets de production

```bash
npm run build
```

### Démarrer en développement

```bash
# Commande combinée (recommandée) : serveur Laravel + Vite
composer run dev

# Ou séparément
php artisan serve   # Serveur PHP
npm run dev         # Compilation front-end en mode watch
```

---

## Méthode 2 : Docker

ArtisanCMS inclut un `docker-compose.yml` préconfigué.

### Lancer les conteneurs

```bash
docker compose up -d
```

Services démarrés :

| Service | Description |
|---------|-------------|
| **app** | PHP-FPM avec ArtisanCMS |
| **nginx** | Serveur web Nginx |
| **mysql** | MySQL 8 |
| **redis** | Cache Redis |

Accédez à `http://localhost:8080/install` pour lancer l'assistant.

### Exemple docker-compose.yml

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

  redis:
    image: redis:alpine

volumes:
  mysql_data:
```

:::note
Pour la production Docker, définissez des mots de passe sécurisés, configurez les volumes persistants et mettez en place un certificat SSL.
:::

---

## Assistant d'installation graphique

L'assistant web (`/install`) guide l'utilisateur à travers **6 étapes**. L'interface est responsive avec une barre de progression latérale (desktop) ou en haut de page (mobile).

:::note[Protection automatique]
Le middleware `EnsureInstalled` redirige automatiquement vers `/install` si le CMS n'est pas encore installé. Une fois l'installation terminée, l'assistant devient inaccessible (404).
:::

### Étape 1 : Bienvenue et choix de la langue

L'écran d'accueil présente ArtisanCMS et permet de choisir la langue de l'installation et du site :

| Langue | Code |
|--------|------|
| Français | `fr` |
| English | `en` |
| Español | `es` |
| Deutsch | `de` |

La langue sélectionnée est appliquée immédiatement à l'interface et sera définie comme locale par défaut du site.

### Étape 2 : Licence

Affichage de la licence MIT avec les conditions d'utilisation. L'utilisateur doit cocher la case d'acceptation pour continuer.

Points clés de la licence :
- Utilisation personnelle et commerciale autorisée
- Modifications autorisées
- Distribution avec licence obligatoire
- Aucune collecte de données

### Étape 3 : Vérification des prérequis

Le service `RequirementsChecker` analyse automatiquement votre environnement serveur.

**Éléments obligatoires** (doivent tous être validés) :

| Prérequis | Détail |
|-----------|--------|
| PHP | Version 8.3 ou supérieure |
| Extensions PHP | PDO, PDO MySQL, OpenSSL, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath, Fileinfo, cURL |
| Traitement d'images | GD ou Imagick (au moins un) |
| Permissions d'écriture | `storage/`, `bootstrap/cache/`, `.env`, `content/` |

**Éléments recommandés** (non bloquants) :

| Prérequis | Détail |
|-----------|--------|
| Node.js | Version 20 ou supérieure |
| npm | Version 9 ou supérieure |

Chaque élément affiche un indicateur visuel :
- ✅ Vert : validé
- ❌ Rouge : obligatoire manquant (bloque la progression)
- ⚠️ Jaune : recommandé manquant (non bloquant)

Un bouton **Revérifier** permet de relancer l'analyse après avoir corrigé un problème.

### Étape 4 : Configuration de la base de données

Configuration de la connexion MySQL/MariaDB avec test de connexion en temps réel.

**Champs du formulaire :**

| Champ | Défaut | Description |
|-------|--------|-------------|
| Hôte | `127.0.0.1` | Adresse du serveur MySQL |
| Port | `3306` | Port MySQL |
| Base de données | `artisan_cms` | Nom de la base |
| Utilisateur | `root` | Utilisateur MySQL |
| Mot de passe | *(vide)* | Mot de passe MySQL |
| Préfixe des tables | *(vide)* | Préfixe optionnel (ex: `cms_`) |
| Créer automatiquement | ✅ Activé | Crée la base si elle n'existe pas |

**Test de connexion :**

Le bouton **Tester la connexion** effectue un test AJAX vers le serveur :
1. Connexion PDO au serveur MySQL
2. Vérification de l'existence de la base de données
3. Création automatique si la case est cochée (UTF8MB4)
4. Affichage de la version MySQL détectée

En cas d'erreur, des messages explicites sont affichés :
- *Nom d'utilisateur ou mot de passe incorrect*
- *La base de données n'existe pas*
- *MySQL n'est pas démarré*
- *L'adresse du serveur est invalide*

:::tip[Astuce]
Le test de connexion doit réussir avant de pouvoir passer à l'étape suivante.
:::

### Étape 5 : Configuration du site et du compte administrateur

Cette étape contient **deux onglets** dans un même formulaire.

#### Onglet « Votre site »

| Champ | Obligatoire | Défaut | Description |
|-------|:-----------:|--------|-------------|
| Nom du site | ✅ | `Mon site ArtisanCMS` | Affiché dans l'en-tête et le titre |
| Description | — | *(vide)* | Tagline / meta-description |
| URL du site | ✅ | Auto-détectée | URL publique du site |
| Fuseau horaire | ✅ | `Europe/Paris` | Liste de tous les fuseaux PHP |

#### Onglet « Administrateur »

| Champ | Obligatoire | Validation |
|-------|:-----------:|------------|
| Nom complet | ✅ | Minimum 2 caractères |
| Adresse e-mail | ✅ | Format email valide |
| Mot de passe | ✅ | Minimum 8 caractères |
| Confirmation | ✅ | Doit correspondre au mot de passe |

**Indicateur de force du mot de passe :**

Une barre à 6 segments évalue la robustesse en temps réel :

| Critère | Points |
|---------|:------:|
| 8 caractères minimum | +1 |
| 12 caractères ou plus | +1 |
| Au moins une majuscule | +1 |
| Au moins une minuscule | +1 |
| Au moins un chiffre | +1 |
| Au moins un caractère spécial | +1 |

- 🔴 **Faible** : 0-2 points
- 🟡 **Moyen** : 3-4 points
- 🟢 **Fort** : 5-6 points

### Étape 6 : Exécution de l'installation

L'installation s'exécute automatiquement en **11 sous-étapes** séquentielles avec une barre de progression animée.

| Sous-étape | Description technique | Poids |
|------------|----------------------|:-----:|
| Environnement | Écriture du fichier `.env` avec les paramètres de base de données | 5 |
| Migrations | Exécution de `php artisan migrate --force` (création de toutes les tables) | 20 |
| Rôles | Création des 4 rôles par défaut (Admin, Éditeur, Auteur, Abonné) | 5 |
| Administrateur | Création du compte admin avec le rôle Admin | 5 |
| Paramètres | Insertion des 24 paramètres par défaut (général, SEO, mail, contenu, média, maintenance) | 10 |
| Thème | Installation du thème Default avec ses couleurs et typographies | 15 |
| Blocs | Enregistrement des 11 blocs de base (section, grid, heading, text, image, video, button, hero, etc.) | 15 |
| Page d'accueil | Création de la page « Bienvenue » et configuration comme page d'accueil | 10 |
| Site | Création de l'enregistrement du site principal avec le domaine détecté | 5 |
| Répertoires | Création des dossiers `content/themes/`, `content/plugins/`, `storage/app/public/media/` | 5 |
| Finalisation | Écriture du fichier `storage/.installed`, nettoyage des caches, lien storage | 10 |

**Messages de progression :**

| Progression | Message |
|:-----------:|---------|
| 0-20% | *Les ouvriers enfilent leurs gants...* |
| 20-40% | *Les murs montent !* |
| 40-60% | *On pose le carrelage...* |
| 60-80% | *La peinture sèche...* |
| 80-100% | *On plante les fleurs dans le jardin...* |
| 100% | *Les clés sont sur la porte !* |

En cas d'erreur sur une sous-étape, l'installation s'arrête avec un message explicite et un bouton **Réessayer**.

### Écran de félicitations

Une fois l'installation terminée, un écran de célébration affiche :
- Un récapitulatif (nom du site, URL, email admin, version)
- Un rappel de noter le mot de passe administrateur
- Deux boutons d'accès rapide :
  - **Entrer dans mon atelier** → accès au panneau d'administration (`/admin`)
  - **Admirer la façade** → voir le site public

**Prochaines étapes suggérées :**
1. Choisir un thème (Apparence > Thème)
2. Créer des pages avec le Page Builder
3. Configurer les menus de navigation
4. Explorer les plugins disponibles

---

## Installation en ligne de commande

### Mode rapide

```bash
php artisan cms:install --quick
```

Valeurs par défaut utilisées :

| Paramètre | Valeur |
|-----------|--------|
| Langue | `fr` |
| Base de données | Variables du `.env` |
| Nom du site | `ArtisanCMS` |
| URL | Variable `APP_URL` du `.env` |
| Fuseau horaire | `Europe/Paris` |
| Email admin | `admin@artisancms.dev` |
| Mot de passe admin | `password` |

:::caution[Attention]
Changez immédiatement le mot de passe par défaut après l'installation rapide !
:::

### Mode interactif

```bash
php artisan cms:install
```

La commande vous guidera avec des prompts pour chaque paramètre :
1. Vérification des prérequis (avec indicateurs visuels ✓/✗/⚠)
2. Configuration de la base de données (hôte, port, nom, identifiants + test de connexion)
3. Informations du site (nom, description, URL, fuseau horaire, langue)
4. Compte administrateur (nom, email, mot de passe)

### Réinstallation

Pour forcer une réinstallation sur un CMS déjà installé :

```bash
php artisan cms:install --force
```

---

## Après l'installation

Une fois l'installation terminée :

- Le fichier `storage/.installed` est créé (marqueur d'installation)
- L'assistant `/install` devient inaccessible (retourne 404)
- Le panneau d'administration est accessible sur `/admin`

Consultez le guide [Premier lancement](/getting-started/first-launch/) pour les étapes de configuration initiale.
