---
title: Premier lancement
description: Guide des premieres etapes apres l'installation d'ArtisanCMS, decouverte du tableau de bord et configuration initiale.
---

Une fois l'installation terminee, ce guide vous accompagne dans la prise en main d'ArtisanCMS et les etapes de configuration initiale.

## Acceder a l'administration

Ouvrez votre navigateur et rendez-vous a l'adresse suivante :

```
http://votre-domaine.com/admin
```

Le prefixe `/admin` est celui par defaut. Si vous l'avez modifie dans la [configuration](/getting-started/configuration/), utilisez le prefixe personnalise.

Connectez-vous avec les identifiants administrateur definis lors de l'installation (via l'assistant web ou la commande `php artisan cms:install`).

## Decouverte du tableau de bord

Le tableau de bord est la page d'accueil de l'administration. Il offre une vue synthetique de votre site.

### Contenu recent

La section de contenu recent affiche les derniers elements crees ou modifies :

- Pages recemment publiees ou mises a jour
- Articles de blog recents
- Commentaires en attente de moderation
- Fichiers medias uploades recemment

### Widgets d'analytics

Si le module d'analytics est active, le tableau de bord presente :

- Nombre de visiteurs sur les 7 et 30 derniers jours
- Pages les plus consultees
- Sources de trafic principales
- Graphique d'evolution des visites

### Actions rapides

Les actions rapides permettent d'acceder en un clic aux fonctions les plus courantes :

- Creer une nouvelle page
- Rediger un article de blog
- Ajouter un media
- Gerer les menus
- Acceder aux parametres du site

---

## Checklist de configuration initiale

Suivez cette checklist pour configurer votre site apres l'installation.

### 1. Configurer les parametres du site

Rendez-vous dans **Parametres > General** pour definir :

- **Nom du site** -- Affiche dans la barre de titre du navigateur et l'en-tete.
- **Logo** -- Uploadez le logo de votre site (formats SVG, PNG ou JPEG recommandes).
- **Favicon** -- Icone affichee dans les onglets du navigateur (format ICO ou PNG, 32x32 ou 64x64 pixels).
- **Description du site** -- Utilisee par defaut pour la meta-description SEO.

### 2. Configurer l'identite visuelle (branding)

Dans **Apparence > Branding**, personnalisez l'identite visuelle :

- Couleurs principales et secondaires
- Typographies (polices de caracteres)
- Logo alternatif pour le mode sombre
- Personnalisation de l'interface d'administration (white-label)

### 3. Creer votre premiere page

Accedez a **Contenu > Pages** et cliquez sur **Nouvelle page** pour ouvrir le Page Builder visuel :

- Glissez-deposez des blocs pour construire votre mise en page
- 39 types de blocs disponibles (texte, image, galerie, hero, etc.)
- Previsualisation en temps reel sur desktop, tablette et mobile
- Auto-sauvegarde activee par defaut

:::tip[Astuce]
Si vous avez selectionne un template lors de l'installation, des pages de demonstration sont deja disponibles. Vous pouvez les modifier ou les utiliser comme base de travail.
:::

### 4. Configurer les menus de navigation

Rendez-vous dans **Contenu > Menus** pour creer et organiser vos menus :

- Creez un menu principal pour la navigation du site
- Ajoutez des liens vers vos pages, articles, categories ou URL externes
- Organisez les elements par glisser-deposer
- Definissez l'emplacement d'affichage du menu (en-tete, pied de page, barre laterale)

### 5. Configurer le plugin SEO

Activez et configurez le plugin SEO dans **Plugins > SEO** :

- Meta-titres et meta-descriptions personnalisables par page
- Generation automatique du sitemap XML
- Configuration des balises Open Graph pour les reseaux sociaux
- Schema markup (donnees structurees)
- Gestion des robots.txt

### 6. Ajouter des utilisateurs et configurer les roles

Dans **Administration > Utilisateurs & Roles** :

- Creez des comptes pour les membres de votre equipe
- Assignez des roles predefinies : Administrateur, Editeur, Auteur, Contributeur
- Personnalisez les permissions de chaque role selon vos besoins
- Activez l'authentification a deux facteurs (2FA) pour renforcer la securite

### 7. Activer les plugins souhaites

Parcourez la liste des plugins disponibles dans **Plugins** et activez ceux dont vous avez besoin :

| Plugin | Description |
|---|---|
| **SEO** | Outils de referencement et meta-donnees |
| **E-commerce** | Boutique en ligne avec paiement Stripe |
| **Formulaires** | Constructeur de formulaires avec drag & drop |
| **Assistant IA** | Generation et optimisation de contenu par IA |
| **Sauvegarde** | Sauvegardes automatiques et restauration |
| **Espace membres** | Contenu reserve aux membres inscrits |
| **Formulaire de contact** | Formulaire de contact preconfigure |

Chaque plugin dispose de sa propre page de configuration accessible apres activation.

### 8. Choisir et activer un theme

Dans **Apparence > Themes** :

- Parcourez les themes disponibles
- Previsualisez un theme avant de l'activer
- Activez le theme de votre choix
- Personnalisez les options du theme (couleurs, typographies, mise en page)

---

## Commandes de developpement

Pour le developpement local, voici les commandes essentielles :

```bash
# Demarrer le serveur Laravel (accessible sur http://localhost:8000)
php artisan serve

# Lancer le serveur de developpement front-end (Vite) avec hot reload
npm run dev

# Commande combinee : serveur Laravel + Vite en parallele
composer run dev
```

### Commandes utiles supplementaires

```bash
# Vider tous les caches
php artisan optimize:clear

# Regenerer le cache de configuration
php artisan config:cache

# Regenerer le cache des routes
php artisan route:cache

# Executer les migrations en attente
php artisan migrate

# Lancer les tests
php artisan test

# Compiler les assets pour la production
npm run build
```

---

## Prochaines etapes

Votre site ArtisanCMS est maintenant pret. Voici quelques ressources pour aller plus loin :

- [Gestion des pages](/content/pages/) -- Apprenez a creer et organiser votre contenu.
- [Page Builder](/page-builder/overview/) -- Maitrisez l'editeur visuel de pages.
- [Plugins](/plugins/overview/) -- Explorez le systeme de plugins et ses possibilites.
- [Guide developpeur](/developer/hooks-filters/) -- Etendez ArtisanCMS avec des hooks, plugins et themes personnalises.
