---
title: Pages
description: Gestion des pages dans ArtisanCMS - hiérarchie, workflow de publication, verrouillage de contenu et SEO.
---

Les pages constituent le type de contenu fondamental d'ArtisanCMS. Elles permettent de construire la structure de votre site avec une hiérarchie parent-enfant, un workflow de publication complet et des fonctionnalités SEO intégrées.

## Modèle Page

Le modèle `Page` se trouve dans `App\Models\Page` et utilise plusieurs traits pour enrichir ses fonctionnalités :

```php
class Page extends Model
{
    use HasContentFeatures; // Révisions, taxonomies, champs personnalisés
    use HasSiteScope;       // Filtrage multi-site automatique
    use SoftDeletes;        // Corbeille
}
```

### Champs principaux

| Champ | Type | Description |
|-------|------|-------------|
| `title` | `string` | Titre de la page |
| `slug` | `string` | URL-friendly, unique par site |
| `content` | `json` | Arbre de blocs du Page Builder |
| `excerpt` | `text` | Résumé court de la page |
| `featured_image` | `string` | Chemin de l'image mise en avant |
| `template` | `string` | Template Blade utilisé pour le rendu |
| `parent_id` | `integer` | Référence vers la page parente (nullable) |
| `order` | `integer` | Position dans la hiérarchie |

## Hiérarchie des pages

Les pages supportent une arborescence parent-enfant via le champ `parent_id`. Cela permet de créer des structures comme :

```
/ (Accueil)
├── /a-propos
│   ├── /a-propos/equipe
│   └── /a-propos/histoire
├── /services
│   ├── /services/consulting
│   └── /services/formation
└── /contact
```

Le slug complet est automatiquement construit à partir de la hiérarchie parentale.

## Workflow de publication

Chaque page possède un statut qui contrôle sa visibilité :

| Statut | Description |
|--------|-------------|
| `draft` | Brouillon, visible uniquement en admin |
| `review` | En attente de relecture |
| `approved` | Approuvée, prête à être publiée |
| `published` | Publiée et accessible au public |

### Niveaux d'accès

En complément du statut, chaque page définit un niveau d'accès :

- **public** : accessible à tous les visiteurs
- **private** : accessible uniquement aux utilisateurs connectés
- **restricted** : accessible uniquement aux rôles autorisés

## Planification de publication

Les champs `publish_at` et `unpublish_at` permettent de programmer la publication et le retrait automatique d'une page :

```php
$page->publish_at = '2026-04-01 09:00:00';
$page->unpublish_at = '2026-04-30 23:59:59';
```

Un job planifié se charge d'appliquer les changements de statut aux dates configurées.

## Verrouillage de contenu

Pour éviter les conflits d'édition simultanée, ArtisanCMS implémente un système de verrouillage :

```php
// Champs de verrouillage sur le modèle Page
$page->checked_out_by; // ID de l'utilisateur qui édite
$page->checked_out_at; // Horodatage du verrouillage
```

Lorsqu'un utilisateur ouvre une page en édition, elle est automatiquement verrouillée. Les autres utilisateurs voient un avertissement et ne peuvent pas modifier la page tant que le verrou n'est pas libéré.

## SEO et Open Graph

Chaque page dispose de champs dédiés au référencement :

| Champ | Description |
|-------|-------------|
| `meta_title` | Titre pour les moteurs de recherche |
| `meta_description` | Description pour les résultats de recherche |
| `meta_keywords` | Mots-clés (séparés par des virgules) |

Les balises Open Graph sont générées automatiquement à partir de ces champs pour un partage optimal sur les réseaux sociaux.

## CRUD et contrôleurs

La gestion des pages passe par `Admin\PageController` qui délègue la logique métier au `PageService` :

```php
// Routes admin pour les pages
Route::resource('pages', PageController::class);
```

Les actions disponibles sont : création, édition, duplication, mise à la corbeille et restauration.

## Autorisation

L'accès aux pages est contrôlé par `PagePolicy` qui vérifie les permissions selon le rôle de l'utilisateur :

- `viewAny` : lister les pages
- `create` : créer une nouvelle page
- `update` : modifier une page existante
- `delete` : mettre à la corbeille
- `restore` : restaurer depuis la corbeille
- `forceDelete` : suppression définitive

## Corbeille (Soft Deletes)

Les pages supprimées ne sont pas effacées de la base de données. Elles sont déplacées dans la corbeille grâce au trait `SoftDeletes` de Laravel. Un administrateur peut les restaurer ou les supprimer définitivement.

## Trait HasContentFeatures

Ce trait partagé entre les pages, articles et entrées de contenu fournit automatiquement :

- **Révisions** : historique complet des modifications
- **Taxonomies** : catégorisation par termes
- **Champs personnalisés** : données additionnelles via les groupes de champs
