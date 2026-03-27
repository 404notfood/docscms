---
title: "Modèles & Base de données"
description: "Référence des 37 modèles Eloquent, des migrations, des factories et des seeders d'ArtisanCMS. Relations, traits et structure de la base de données."
---

ArtisanCMS utilise Eloquent ORM avec 37 modèles, 45 migrations et un préfixe `cms_` sur toutes les tables. Cette page décrit la structure de la base de données et les relations entre les entités.

## Modèles principaux

### Contenu

| Modèle | Table | Description |
|--------|-------|-------------|
| `Page` | `cms_pages` | Pages du site (soft deletes) |
| `Post` | `cms_posts` | Articles de blog (soft deletes) |
| `ContentType` | `cms_content_types` | Types de contenu personnalisés |
| `Revision` | `cms_revisions` | Historique des révisions (polymorphique) |
| `Block` | `cms_blocks` | Blocs du Page Builder |
| `BlockPattern` | `cms_block_patterns` | Modèles de blocs réutilisables |
| `GlobalSection` | `cms_global_sections` | Sections globales (header, footer) |
| `Popup` | `cms_popups` | Popups et modales |
| `Widget` | `cms_widgets` | Widgets de sidebar/footer |

### Taxonomies

| Modèle | Table | Description |
|--------|-------|-------------|
| `Taxonomy` | `cms_taxonomies` | Définition des taxonomies |
| `Term` | `cms_terms` | Termes (catégories, tags) |
| `Termable` | `cms_termables` | Table pivot polymorphique |

### Médias

| Modèle | Table | Description |
|--------|-------|-------------|
| `Media` | `cms_media` | Fichiers médias uploadés |
| `MediaFolder` | `cms_media_folders` | Dossiers de la bibliothèque |

### Utilisateurs & Rôles

| Modèle | Table | Description |
|--------|-------|-------------|
| `User` | `cms_users` | Utilisateurs du CMS |
| `Role` | `cms_roles` | Rôles avec permissions JSON |

### Navigation & SEO

| Modèle | Table | Description |
|--------|-------|-------------|
| `Menu` | `cms_menus` | Menus de navigation |
| `MenuItem` | `cms_menu_items` | Éléments de menu |
| `Redirect` | `cms_redirects` | Redirections 301/302 |
| `FormEntry` | `cms_form_entries` | Soumissions de formulaires |

### Personnalisation

| Modèle | Table | Description |
|--------|-------|-------------|
| `Theme` | `cms_themes` | Thèmes installés |
| `Plugin` | `cms_plugins` | Plugins installés |
| `Setting` | `cms_settings` | Paramètres clé-valeur |
| `CustomField` | `cms_custom_fields` | Champs personnalisés (polymorphique) |
| `DesignToken` | `cms_design_tokens` | Tokens de design |
| `Branding` | `cms_brandings` | Configuration de la marque |

### Système

| Modèle | Table | Description |
|--------|-------|-------------|
| `ActivityLog` | `cms_activity_logs` | Journal d'activité |
| `Comment` | `cms_comments` | Commentaires |
| `Notification` | `cms_notifications` | Notifications |
| `EmailTemplate` | `cms_email_templates` | Templates d'emails |
| `Newsletter` | `cms_newsletters` | Campagnes newsletter |
| `NewsletterSubscriber` | `cms_newsletter_subscribers` | Abonnés newsletter |
| `Webhook` | `cms_webhooks` | Configuration des webhooks |
| `AnalyticPageView` | `cms_analytic_page_views` | Vues de pages brutes |
| `AnalyticAggregation` | `cms_analytic_aggregations` | Données agrégées |
| `SearchIndex` | `cms_search_index` | Index de recherche |
| `ContentLock` | `cms_content_locks` | Verrous d'édition |
| `Site` | `cms_sites` | Sites (multi-site) |

## Relations clés

### Relations polymorphiques

Les **révisions** et les **champs personnalisés** utilisent des relations polymorphiques pour s'attacher à tout type de contenu.

```php
// Le modèle Revision
class Revision extends Model
{
    public function revisionable(): MorphTo
    {
        return $this->morphTo();
    }
}

// Utilisation depuis Page ou Post
class Page extends Model
{
    public function revisions(): MorphMany
    {
        return $this->morphMany(Revision::class, 'revisionable');
    }
}
```

### Relations many-to-many (Taxonomies)

Les termes de taxonomie sont liés au contenu via la table pivot polymorphique `cms_termables`.

```php
class Page extends Model
{
    public function terms(): MorphToMany
    {
        return $this->morphToMany(Term::class, 'termable', 'cms_termables');
    }
}
```

### Verrouillage de contenu

Le modèle `ContentLock` empêche l'édition simultanée d'un même contenu.

```php
class ContentLock extends Model
{
    public function lockable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

## Traits importants

| Trait | Description |
|-------|-------------|
| `HasContentFeatures` | Ajoute les révisions, champs personnalisés, SEO, statut de publication |
| `HasSiteScope` | Filtre automatiquement les requêtes par site actif (multi-site) |
| `LogsActivity` | Enregistre automatiquement les actions dans le journal d'activité |
| `SoftDeletes` | Suppression douce sur `Page` et `Post` |

```php
class Page extends Model
{
    use HasContentFeatures, HasSiteScope, LogsActivity, SoftDeletes;
}
```

## Migrations

Les 45 migrations sont exécutées lors de l'installation et suivent les conventions Laravel. Toutes les tables utilisent le préfixe `cms_`.

```bash
# Exécuter les migrations
php artisan migrate

# Voir le statut des migrations
php artisan migrate:status
```

## Factories (tests)

ArtisanCMS fournit 18 factories pour générer des données de test.

```php
// Créer une page publiée
$page = Page::factory()->published()->create();

// Créer 10 articles avec des catégories
$posts = Post::factory()->count(10)->withCategories()->create();

// Créer un utilisateur avec un rôle
$admin = User::factory()->admin()->create();

// Créer un média avec un fichier image
$media = Media::factory()->image()->create();
```

Les factories disponibles couvrent : `Page`, `Post`, `User`, `Role`, `Media`, `MediaFolder`, `Menu`, `MenuItem`, `Term`, `Taxonomy`, `Comment`, `Block`, `Widget`, `Popup`, `Notification`, `EmailTemplate`, `Newsletter` et `FormEntry`.

## Seeders

| Seeder | Description |
|--------|-------------|
| `DatabaseSeeder` | Orchestre tous les seeders |
| `RoleSeeder` | Crée les rôles par défaut (admin, éditeur, auteur, contributeur) |
| `BlockSeeder` | Enregistre les blocs intégrés dans la base |
| `SettingsSeeder` | Initialise les paramètres par défaut du CMS |

```bash
# Exécuter tous les seeders
php artisan db:seed

# Exécuter un seeder spécifique
php artisan db:seed --class=RoleSeeder
```

## Schéma relationnel simplifié

```
cms_users ──── cms_roles
    │
    ├── cms_pages ──── cms_revisions (polymorphique)
    │       │
    │       ├── cms_termables ──── cms_terms ──── cms_taxonomies
    │       ├── cms_custom_fields (polymorphique)
    │       └── cms_content_locks
    │
    ├── cms_posts ──── cms_revisions (polymorphique)
    │       │
    │       ├── cms_termables ──── cms_terms
    │       ├── cms_custom_fields (polymorphique)
    │       └── cms_comments
    │
    ├── cms_media ──── cms_media_folders
    │
    └── cms_activity_logs
```
