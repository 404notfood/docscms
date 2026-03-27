---
title: "Fonctionnalités"
description: "Liste complète des fonctionnalités d'ArtisanCMS : gestion de contenu, page builder, médias, e-commerce, SEO, multi-site, analytics, et bien plus."
---

ArtisanCMS offre un ensemble complet de fonctionnalités couvrant la gestion de contenu, la construction de pages, le e-commerce, le SEO et l'administration. Cette page présente l'ensemble des capacités du CMS, organisées par catégorie.

## Gestion de contenu

### Pages

- Hiérarchie parent/enfant illimitée
- Workflow de publication : **Brouillon** > **En relecture** > **Approuvé** > **Publié**
- Publication planifiée avec date et heure
- Verrouillage de contenu (content locking) pour éviter les conflits d'édition simultanée
- Historique des révisions avec comparaison et restauration
- Contenu stocké sous forme d'arbre JSON de blocs (compatible page builder)
- Slug automatique avec support des caractères spéciaux

### Articles de blog

- Système de blog complet avec catégories et tags (taxonomies)
- Image mise en avant, extrait et auteur
- Pagination et fil d'Ariane automatiques
- Commentaires avec modération et anti-spam
- Flux RSS automatique

### Types de contenu personnalisés (CPT)

- Constructeur visuel de types de contenu depuis l'administration
- Définition des champs, taxonomies et options d'affichage
- Routes et slugs configurables par type
- Support des relations entre types de contenu

### Champs personnalisés

Plus de 15 types de champs disponibles :

| Type | Description |
|---|---|
| `text` | Champ texte simple |
| `textarea` | Zone de texte multiligne |
| `richtext` | Editeur riche TipTap |
| `number` | Nombre entier ou décimal |
| `email` | Adresse email avec validation |
| `url` | URL avec validation |
| `select` | Liste déroulante |
| `checkbox` | Case à cocher (booléen) |
| `radio` | Boutons radio |
| `date` | Sélecteur de date |
| `datetime` | Sélecteur de date et heure |
| `file` | Upload de fichier |
| `image` | Upload d'image avec aperçu |
| `color` | Sélecteur de couleur |
| `relation` | Relation vers un autre contenu |
| `repeater` | Groupe de champs répétable |
| `json` | Données JSON libres |

### Révisions

- Sauvegarde automatique de chaque modification
- Comparaison côte à côte entre deux révisions
- Restauration en un clic vers une version précédente
- Nombre de révisions conservées configurable

### Multi-langue

- Interface d'administration et contenu traduisibles
- Gestion des traductions par contenu avec liaison entre versions linguistiques
- Détection automatique de la langue du navigateur

## Page Builder

Le page builder est le coeur de l'expérience de création dans ArtisanCMS.

### 39 types de blocs

Le builder propose 39 blocs organisés en catégories :

**Mise en page** : Section, Grille (Grid), Colonnes, Conteneur, Espaceur, Séparateur, Onglets, Accordéon

**Contenu** : Titre, Paragraphe, Liste, Citation, Tableau, Code, Alerte, Badge, Statistiques, Chronologie, FAQ, Étapes

**Média** : Image, Galerie, Vidéo, Audio, Icône, Logo

**Navigation** : Bouton, Groupe de boutons, Lien, Menu, Fil d'Ariane, Pagination

**Données** : Formulaire, Carte (Map), Graphique, Réseau social, Témoignages

**Dynamique** : Derniers articles, Liste de contenus, Contenu conditionnel

### Fonctionnalités du builder

- **Glisser-déposer** : Réorganisation des blocs par drag & drop (dnd-kit)
- **Édition responsive** : Prévisualisation et personnalisation par breakpoint (desktop, tablette, mobile)
- **Annuler/Rétablir** : Historique d'actions complet (undo/redo)
- **Auto-sauvegarde** : Sauvegarde automatique périodique du brouillon
- **Patterns réutilisables** : Enregistrement de groupes de blocs comme modèles réutilisables
- **Design tokens** : Variables de style globales (couleurs, typographies, espacements) appliquées à tous les blocs
- **Contenu dynamique** : Injection de données depuis les custom fields, les taxonomies ou les requêtes

### Structure des blocs

Le contenu est stocké sous forme d'arbre JSON imbriqué :

```json
{
  "type": "section",
  "props": { "backgroundColor": "#ffffff", "padding": "lg" },
  "children": [
    {
      "type": "grid",
      "props": { "columns": 2, "gap": "md" },
      "children": [
        {
          "type": "heading",
          "props": { "level": 2, "content": "Bienvenue" }
        },
        {
          "type": "paragraph",
          "props": { "content": "Découvrez notre site." }
        }
      ]
    }
  ]
}
```

## Médias

### Upload et traitement

- Upload avec validation MIME stricte (whitelist de types autorisés)
- Conversion automatique en WebP pour les images
- Génération de tailles responsives (thumbnail, medium, large, full)
- Suppression automatique des données EXIF (vie privée)
- Limite de taille configurable par type de fichier

### Organisation

- Dossiers virtuels pour organiser les médias
- Recherche par nom, type, date et dossier
- Suivi d'utilisation : savoir où chaque média est utilisé
- Détection des médias orphelins (non utilisés)

### Sources externes

- Intégration Unsplash et Pexels pour les photos libres de droits
- Import direct depuis l'interface du page builder
- Attribution automatique des crédits

## Navigation et structure

### Menus

- Création de menus avec hiérarchie illimitée (sous-menus imbriqués)
- Ajout de pages, articles, liens personnalisés et catégories
- Réorganisation par glisser-déposer
- Assignation à des emplacements de menu définis par le thème

### Sections globales

- Constructeur de header et footer visuel
- Sections réutilisables sur toutes les pages
- Personnalisation par site en multi-site

### Widgets et zones de widgets

- Bibliothèque de widgets (texte, image, menu, derniers articles, recherche, etc.)
- Zones de widgets définies par le thème
- Configuration par glisser-déposer depuis l'administration

## E-commerce (plugin officiel)

Le plugin e-commerce ajoute un système de vente en ligne complet.

### Catalogue

- Produits avec variantes (taille, couleur, etc.)
- Gestion des stocks avec alertes de seuil
- Images multiples par produit avec galerie
- Catégories et tags de produits

### Vente

- Panier avec persistance en session et en base de données
- Paiement sécurisé via Stripe (Checkout et Payment Intents)
- Zones de livraison avec tarifs configurables
- Règles de taxe par zone géographique
- Coupons de réduction (pourcentage, montant fixe, livraison gratuite)

### Gestion

- Tableau de bord des commandes avec statuts (en attente, payée, expédiée, livrée, annulée)
- Historique des commandes par client
- Avis clients avec modération
- Export des commandes (CSV)

## SEO (plugin officiel)

- Génération automatique du sitemap XML
- Gestion du fichier `robots.txt` depuis l'administration
- Meta tags personnalisables par page (title, description, og:image)
- Score SEO avec recommandations d'optimisation
- URLs canoniques automatiques
- Données structurées (JSON-LD) pour les articles et produits

## Utilisateurs et rôles

### Permissions granulaires

Plus de 40 permissions individuelles couvrant chaque aspect du CMS :

```
pages.view, pages.create, pages.edit, pages.delete, pages.publish
posts.view, posts.create, posts.edit, posts.delete, posts.publish
media.view, media.upload, media.edit, media.delete
users.view, users.create, users.edit, users.delete
roles.view, roles.create, roles.edit, roles.delete
settings.view, settings.edit
plugins.manage, themes.manage
...
```

### Administration des rôles

- Éditeur de rôles visuel avec activation/désactivation des permissions
- Rôles par défaut : Super Admin, Admin, Éditeur, Auteur, Contributeur
- Création de rôles personnalisés illimitée
- Journal d'activité complet : chaque action est enregistrée avec utilisateur, date, IP et détails

## Multi-site

- Base de données partagée avec isolation logique par site
- Résolution automatique par domaine ou sous-domaine
- Branding indépendant par site (logo, couleurs, favicon)
- Paramètres et contenu indépendants par site
- Thème et plugins configurables par site
- Administration centralisée avec bascule rapide entre les sites

## Analytics

- Collecte des données côté serveur (pas de JavaScript client)
- Conforme RGPD : aucun cookie de tracking, respect du header DNT (Do Not Track)
- Agrégation quotidienne des données (pages vues, visiteurs uniques, sources de trafic)
- Tableau de bord avec graphiques et filtres par période
- Export des données analytiques

## Assistant IA (plugin officiel)

- Génération de contenu via OpenAI (GPT) ou Anthropic (Claude)
- Assistance à la rédaction : titres, descriptions, reformulation
- Génération de meta descriptions SEO
- Configuration de la clé API et du modèle depuis l'administration
- Historique des générations

## Formulaires (plugin officiel)

- Constructeur visuel de formulaires (drag & drop)
- Types de champs : texte, email, téléphone, textarea, select, checkbox, radio, fichier
- Protection anti-spam (honeypot + rate limiting)
- Notifications par email à l'administrateur
- Stockage des soumissions en base de données
- Export des soumissions (CSV)

## Sauvegarde (plugin officiel)

- Sauvegarde automatique planifiée (base de données + fichiers)
- Sauvegarde manuelle depuis l'administration
- Restauration complète en un clic
- Historique des sauvegardes avec taille et date
- Nettoyage automatique des anciennes sauvegardes

## Espace membres (plugin officiel)

- Plans d'abonnement configurables (gratuit, premium, etc.)
- Profils membres avec champs personnalisables
- Restriction d'accès au contenu par plan
- Inscription et connexion membres côté front
- Gestion des membres depuis l'administration

## Emails

### Templates

- Templates d'email éditables depuis l'administration
- Variables dynamiques (nom, email, contenu, lien, etc.)
- Prévisualisation avant envoi
- Templates par défaut pour chaque événement (inscription, réinitialisation de mot de passe, commande, etc.)

### Newsletter

- Gestion des abonnés avec import/export
- Création et envoi de newsletters
- Suivi des envois

## Webhooks

- Déclenchement basé sur les événements du CMS (création, mise à jour, suppression de contenu)
- Signature HMAC SHA-256 pour vérifier l'authenticité des requêtes
- Livraison asynchrone via le système de queues Laravel
- Journalisation des envois avec statut de réponse
- Retry automatique en cas d'échec
- Configuration depuis l'administration (URL, événements, secret)

Exemple de payload webhook :

```json
{
  "event": "page.published",
  "timestamp": "2026-03-27T10:30:00Z",
  "data": {
    "id": 42,
    "title": "Nouvelle page",
    "slug": "nouvelle-page",
    "status": "published",
    "author_id": 1
  }
}
```

## White-label

- Personnalisation complète du branding de l'administration
- Logo personnalisé (login, sidebar, favicon)
- Couleurs de l'interface modifiables
- Nom du CMS configurable
- Suppression des mentions ArtisanCMS
- Idéal pour les agences livrant des sites à leurs clients

## Outils développeur

### Hooks et filtres

Système inspiré de WordPress, adapté à l'architecture Laravel :

```php
// Enregistrer un hook (action)
HookManager::action('page.before_save', function (Page $page) {
    $page->slug = Str::slug($page->title);
});

// Appliquer un filtre
$title = HookManager::filter('page.title', $page->title, $page);
```

### Commandes CLI

```bash
php artisan cms:install          # Installation initiale
php artisan cms:update           # Mise à jour du CMS
php artisan cms:plugin:install   # Installer un plugin
php artisan cms:plugin:activate  # Activer un plugin
php artisan cms:theme:install    # Installer un thème
php artisan cms:cache:clear      # Vider le cache CMS
php artisan cms:export           # Exporter le contenu
php artisan cms:import           # Importer du contenu
```

### API REST

API RESTful complète pour accéder aux contenus en lecture et écriture :

```bash
GET    /api/pages              # Liste des pages
GET    /api/pages/{id}         # Détail d'une page
POST   /api/pages              # Créer une page
PUT    /api/pages/{id}         # Mettre à jour une page
DELETE /api/pages/{id}         # Supprimer une page
GET    /api/posts              # Liste des articles
GET    /api/media              # Liste des médias
...
```

Authentification par token (Laravel Sanctum) et filtrage par permissions.

:::tip[En savoir plus]
Chaque fonctionnalité est documentée en détail dans sa section dédiée. Utilisez la navigation latérale pour explorer les guides complets.
:::
