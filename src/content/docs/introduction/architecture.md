---
title: "Architecture"
description: "Architecture technique d'ArtisanCMS : structure monorepo, backend Laravel, frontend React/Inertia, système de plugins, thèmes et stratégie de cache."
---

ArtisanCMS repose sur une architecture monorepo hybride qui sépare clairement le backend Laravel, le frontend React et les packages partagés. Cette page détaille l'organisation du code, le fonctionnement des plugins et des thèmes, ainsi que les stratégies de cache et de traitement asynchrone.

## Structure du projet

```
artisancms/
├── app/
│   ├── CMS/                    # Coeur du CMS
│   │   ├── CMSServiceProvider.php
│   │   ├── HookManager.php
│   │   ├── BlockRegistry.php
│   │   ├── PluginManager.php
│   │   └── ThemeManager.php
│   ├── Http/
│   │   ├── Controllers/        # Controllers (Admin, API, Front)
│   │   └── Middleware/         # Middleware personnalisés
│   ├── Models/                 # Modèles Eloquent
│   ├── Policies/               # Policies d'autorisation
│   ├── Services/               # Services métier
│   ├── Jobs/                   # Jobs asynchrones
│   └── Observers/              # Observers pour l'invalidation de cache
├── bootstrap/
├── config/                     # Configuration Laravel + CMS
├── database/
│   ├── migrations/             # Migrations de base de données
│   └── seeders/                # Seeders (données initiales)
├── packages/                   # Packages React partagés
│   ├── blocks/                 # @artisan/blocks
│   ├── page-builder/           # @artisan/page-builder
│   ├── ui/                     # @artisan/ui (composants shadcn/ui)
│   └── theme-engine/           # @artisan/theme-engine
├── plugins/                    # Plugins installés
│   ├── seo/
│   ├── ecommerce/
│   ├── form-builder/
│   ├── ai-assistant/
│   ├── backup/
│   ├── member-space/
│   └── contact-form/
├── resources/
│   ├── js/                     # Frontend React (pages Inertia)
│   │   ├── Pages/              # Pages React (Admin, Auth, Front)
│   │   ├── Components/         # Composants React partagés
│   │   ├── Hooks/              # Hooks React personnalisés
│   │   ├── Stores/             # Stores Zustand
│   │   └── Lib/                # Utilitaires et helpers
│   ├── css/                    # Styles Tailwind
│   └── views/                  # Vues Blade (layout racine)
├── routes/
│   ├── web.php                 # Routes web (admin + front)
│   ├── api.php                 # Routes API REST
│   └── channels.php            # Canaux de broadcast
├── storage/
├── tests/
│   ├── Feature/                # Tests fonctionnels PHPUnit
│   ├── Unit/                   # Tests unitaires PHPUnit
│   └── js/                     # Tests frontend Vitest
├── themes/                     # Thèmes installés
│   └── default/
├── composer.json
├── package.json
├── vite.config.ts
├── turbo.json
└── tsconfig.json
```

## Backend : Laravel 13

### Service Provider Pattern

Le backend est organisé autour des Service Providers de Laravel. Le `CMSServiceProvider` est le point d'entrée principal du CMS. Il enregistre les services fondamentaux au démarrage de l'application :

```php
class CMSServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(HookManager::class);
        $this->app->singleton(BlockRegistry::class);
        $this->app->singleton(PluginManager::class);
        $this->app->singleton(ThemeManager::class);
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
        $this->registerCoreBlocks();
        $this->bootPlugins();
        $this->bootTheme();
    }
}
```

### Eloquent ORM et relations polymorphiques

Les modèles utilisent abondamment les relations polymorphiques d'Eloquent pour gérer les contenus de manière flexible :

```php
// Un champ personnalisé peut appartenir à une Page, un Post ou un CPT
class CustomFieldValue extends Model
{
    public function fieldable(): MorphTo
    {
        return $this->morphTo();
    }
}

// Les révisions sont polymorphiques
class Revision extends Model
{
    public function revisionable(): MorphTo
    {
        return $this->morphTo();
    }
}

// Les médias sont attachables à tout type de contenu
class Media extends Model
{
    public function mediable(): MorphTo
    {
        return $this->morphTo();
    }
}
```

Cette approche permet d'ajouter des champs personnalisés, des révisions ou des médias à n'importe quel type de contenu sans dupliquer la logique.

## Frontend : React 19 + Inertia 2

### Le rôle d'Inertia

Inertia agit comme un pont entre Laravel et React. Il permet de construire une interface d'administration de type SPA (Single Page Application) sans écrire d'API séparée :

1. Le controller Laravel retourne une réponse Inertia avec les données.
2. Inertia transmet ces données comme props au composant React correspondant.
3. La navigation entre pages est gérée côté client sans rechargement complet.

```php
// Controller Laravel
class PageController extends Controller
{
    public function edit(Page $page): Response
    {
        return Inertia::render('Pages/Edit', [
            'page' => $page->load('customFields', 'revisions', 'media'),
            'blocks' => BlockRegistry::all(),
            'templates' => ThemeManager::getTemplates(),
        ]);
    }
}
```

```tsx
// Composant React (Page Inertia)
interface EditPageProps {
  page: Page;
  blocks: BlockDefinition[];
  templates: Template[];
}

export default function Edit({ page, blocks, templates }: EditPageProps) {
  return (
    <AdminLayout>
      <PageBuilder
        initialContent={page.content}
        blocks={blocks}
        templates={templates}
        onSave={(content) => router.put(`/admin/pages/${page.id}`, { content })}
      />
    </AdminLayout>
  );
}
```

### Les 4 packages partagés

Les packages React dans `packages/` sont partagés entre l'administration et les thèmes via npm workspaces :

| Package | Rôle |
|---|---|
| `@artisan/ui` | Composants d'interface basés sur shadcn/ui (boutons, modales, formulaires, etc.) |
| `@artisan/blocks` | Définition et rendu des 39 types de blocs du page builder |
| `@artisan/page-builder` | Logique du builder : drag & drop, arbre de blocs, undo/redo, auto-save |
| `@artisan/theme-engine` | Moteur de rendu des thèmes : résolution de templates, injection de CSS, layout switching |

## Architecture des plugins

### Structure d'un plugin

Chaque plugin suit une structure conventionnelle :

```
plugins/seo/
├── src/
│   ├── SeoServiceProvider.php     # Point d'entrée
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── config.php                 # Configuration par défaut
├── resources/
│   └── js/
│       ├── Pages/                 # Pages React du plugin
│       └── Components/            # Composants React du plugin
├── database/
│   └── migrations/                # Migrations auto-découvertes
├── routes/
│   └── web.php                    # Routes du plugin
├── tests/
└── plugin.json                    # Métadonnées (nom, version, dépendances)
```

### Service Provider comme point d'entrée

Le Service Provider du plugin est la pierre angulaire de l'intégration :

```php
class SeoServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/config.php', 'plugins.seo');
    }

    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');
        $this->loadRoutesFrom(__DIR__ . '/../routes/web.php');

        // Enregistrer des hooks
        HookManager::action('page.after_save', [SeoAnalyzer::class, 'analyze']);
        HookManager::filter('head.meta_tags', [SeoMetaTags::class, 'inject']);

        // Ajouter un item au menu admin
        HookManager::action('admin.menu', function (Menu $menu) {
            $menu->add('SEO', '/admin/seo', 'chart-bar');
        });
    }
}
```

### Cycle de vie d'un plugin

Le `PluginManager` orchestre le cycle de vie complet :

```
load → install → activate → deactivate → uninstall
```

| Phase | Action |
|---|---|
| **load** | Détection et lecture du `plugin.json`, vérification des dépendances |
| **install** | Exécution des migrations, copie des assets, enregistrement en base |
| **activate** | Enregistrement du Service Provider, exécution des hooks `onActivate` |
| **deactivate** | Désenregistrement des hooks, suppression du cache lié au plugin |
| **uninstall** | Rollback des migrations, suppression des données et assets |

### Système de hooks et filtres

Le `HookManager` est le mécanisme central d'extensibilité :

```php
// Actions : exécuter du code à un moment précis
HookManager::action('page.before_save', callable $callback, int $priority = 10);
HookManager::action('page.after_save', callable $callback, int $priority = 10);
HookManager::action('user.logged_in', callable $callback, int $priority = 10);

// Filtres : transformer une valeur
$value = HookManager::filter('page.title', $originalValue, ...$args);
$value = HookManager::filter('page.content', $html, $page);
```

Les hooks supportent un système de priorités (plus le chiffre est bas, plus l'exécution est précoce) et permettent aux plugins de s'interconnecter sans couplage direct.

## Architecture des thèmes

### Structure d'un thème

```
themes/default/
├── theme.json                # Métadonnées et configuration
├── layouts/
│   ├── default.tsx           # Layout par défaut
│   ├── full-width.tsx        # Layout pleine largeur
│   └── sidebar.tsx           # Layout avec barre latérale
├── templates/
│   ├── page.tsx              # Template de page
│   ├── post.tsx              # Template d'article
│   └── archive.tsx           # Template d'archive
├── components/               # Composants React du thème
├── assets/                   # Images, fonts, etc.
├── css/
│   └── theme.css             # Styles du thème
└── tokens.json               # Design tokens (couleurs, typographies)
```

### Hot-swapping et CSS

Les thèmes sont interchangeables à chaud. Le `ThemeManager` gère la résolution du thème actif et le `ThemeCssGenerator` transforme les design tokens en variables CSS :

```css
/* Généré automatiquement depuis tokens.json */
:root {
  --color-primary: #2563eb;
  --color-secondary: #7c3aed;
  --font-heading: 'Inter', sans-serif;
  --font-body: 'Open Sans', sans-serif;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 2rem;
  --radius-default: 0.5rem;
}
```

### Système de templates

La résolution des templates suit une cascade :

1. Template spécifique assignée au contenu (ex : `full-width`)
2. Template par type de contenu (ex : `post.tsx` pour un article)
3. Template par défaut (`page.tsx`)
4. Layout par défaut du thème (`default.tsx`)

## Stockage du contenu

Le contenu des pages et articles est stocké sous forme d'arbre JSON de blocs imbriqués dans la colonne `content` de la table correspondante :

```
Section
├── Grid (2 colonnes)
│   ├── Heading "Bienvenue"
│   └── Paragraph "Description..."
├── Image (hero.webp)
└── Section (imbriquée)
    └── Grid (3 colonnes)
        ├── Card "Service 1"
        ├── Card "Service 2"
        └── Card "Service 3"
```

Cette structure permet une profondeur d'imbrication illimitée tout en restant interrogeable et transformable côté serveur. Le `BlockRegistry` valide chaque bloc lors de la sauvegarde.

## Stratégie de cache

### Invalidation par Observers

Les Observers Eloquent écoutent les événements de modèle (created, updated, deleted) et invalident les caches correspondants :

```php
class PageObserver
{
    public function saved(Page $page): void
    {
        Cache::tags(['pages', "page:{$page->id}"])->flush();
        Cache::tags(['menus'])->flush(); // Les menus peuvent référencer des pages
    }
}
```

### TTL par composant

Chaque type de donnée possède son propre TTL (Time To Live) :

| Composant | TTL | Justification |
|---|---|---|
| Pages publiées | 60 minutes | Contenu stable, invalidé à la sauvegarde |
| Menus | 120 minutes | Changement rare |
| Paramètres | 24 heures | Très stable |
| Blocs dynamiques | 5 minutes | Contenu pouvant changer fréquemment |
| Médias (métadonnées) | 60 minutes | Stable après upload |

### Drivers de cache

| Environnement | Driver | Raison |
|---|---|---|
| Développement | `file` | Aucune dépendance externe, simple à déboguer |
| Production | `redis` | Performant, support des tags, TTL natif |

## Traitement asynchrone

Les tâches lourdes ou non bloquantes sont déléguées au système de queues Laravel :

```php
// Tracking analytique : ne bloque pas la réponse HTTP
class TrackPageViewJob implements ShouldQueue
{
    public function handle(): void
    {
        PageView::create([
            'page_id' => $this->pageId,
            'ip_hash' => hash('sha256', $this->ip),
            'user_agent' => $this->userAgent,
            'referrer' => $this->referrer,
            'viewed_at' => now(),
        ]);
    }
}

// Dispatch de webhook : retry automatique en cas d'échec
class WebhookDispatchJob implements ShouldQueue
{
    public int $tries = 3;
    public array $backoff = [10, 60, 300];

    public function handle(): void
    {
        $signature = hash_hmac('sha256', $this->payload, $this->webhook->secret);

        Http::withHeaders([
            'X-Webhook-Signature' => $signature,
            'Content-Type' => 'application/json',
        ])->post($this->webhook->url, $this->payload);
    }
}
```

Les jobs asynchrones sont utilisés pour :

- **Analytics** : `TrackPageViewJob` enregistre les pages vues sans ralentir la navigation.
- **Webhooks** : `WebhookDispatchJob` envoie les notifications HTTP avec retry et backoff exponentiel.
- **Médias** : Optimisation d'images (conversion WebP, génération de tailles) en arrière-plan.
- **Emails** : Envoi des notifications et newsletters via la queue.
- **Sauvegardes** : Création des sauvegardes automatiques sans bloquer l'administration.

:::note[Pour aller plus loin]
L'architecture détaillée de chaque sous-système (plugins, thèmes, blocs, API) est documentée dans les sections correspondantes de la documentation. Consultez la section [Développeur](/developer/hooks-filters/) pour les guides d'intégration.
:::
