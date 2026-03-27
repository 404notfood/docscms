---
title: "Performance & Cache"
description: "Optimisation des performances d'ArtisanCMS : strategie de cache multi-couches, invalidation, images, base de donnees, queues et compilation frontend."
---

ArtisanCMS implemente une strategie d'optimisation a plusieurs niveaux : cache applicatif, traitement d'images, requetes base de donnees, traitement asynchrone et compilation frontend.

## Cache multi-couches

### TTL par composant

Chaque composant dispose de sa propre duree de vie en cache, configurable dans `config/cms.php` :

```php
'cache' => [
    'settings'   => 3600,   // 1 heure
    'pages'      => 600,    // 10 minutes
    'menus'      => 1800,   // 30 minutes
    'themes'     => 3600,   // 1 heure
    'plugins'    => 3600,   // 1 heure
    'blocks'     => 1800,   // 30 minutes
    'taxonomies' => 1800,   // 30 minutes
],
```

### Pilotes recommandes

| Environnement | Pilote | Raison |
|---|---|---|
| Developpement | `file` | Aucune dependance externe |
| Production | `redis` | Haute performance, partage entre workers |

## Invalidation automatique

ArtisanCMS utilise **10 observers** Eloquent pour invalider le cache lorsqu'une ressource est modifiee :

```php
class PageObserver
{
    public function saved(Page $page): void
    {
        Cache::forget("page.{$page->slug}");
        Cache::forget('pages.sitemap');
    }

    public function deleted(Page $page): void
    {
        Cache::forget("page.{$page->slug}");
        Cache::forget('pages.sitemap');
    }
}
```

Les observers couvrent : Page, Post, Menu, Setting, Taxonomy, Theme, Plugin, Block, Media et Navigation.

### Purge manuelle

```bash
php artisan cms:cache-clear    # Cache specifique ArtisanCMS
php artisan cache:clear        # Tout le cache Laravel
```

## Optimisation des images

### Conversion WebP et srcsets responsifs

Chaque image uploadee est convertie en **WebP** (reduction de 25-35%) et declinee en variantes responsives :

```php
'responsive_sizes' => [320, 640, 768, 1024, 1280, 1536, 1920],
```

Le rendu HTML utilise `srcset` pour charger uniquement la taille adaptee :

```html
<img
  src="/storage/media/photo-1024.webp"
  srcset="/storage/media/photo-320.webp 320w,
         /storage/media/photo-640.webp 640w,
         /storage/media/photo-1024.webp 1024w,
         /storage/media/photo-1920.webp 1920w"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
/>
```

Une miniature 300x300 pixels est generee pour la mediatheque et les listes admin.

## Optimisation base de donnees

### Index et eager loading

Les migrations creent des index sur toutes les cles etrangeres et colonnes frequemment filtrees. Les controleurs utilisent le eager loading pour eviter le probleme N+1 :

```php
$pages = Page::with(['author', 'taxonomies', 'media'])
    ->published()
    ->paginate(20);
```

## Traitement asynchrone (Queues)

Les operations couteuses sont traitees en arriere-plan via les queues Laravel :

- **Webhooks** : envoi sans bloquer la requete utilisateur.
- **Analytics** : agregation par job planifie.
- **Images** : generation des variantes responsives differee.

```php
dispatch(new SendWebhookJob($webhook, $payload));
```

## Optimisation frontend

### Code splitting React

L'interface admin charge uniquement le code necessaire a chaque page :

```tsx
const PageEditor = lazy(() => import('./Pages/PageEditor'));
const MediaLibrary = lazy(() => import('./Pages/MediaLibrary'));
const Settings = lazy(() => import('./Pages/Settings'));
```

### Build Vite

La compilation utilise Vite avec tree-shaking, minification, code splitting automatique et compression optionnelle gzip/brotli.

### Turborepo

Le monorepo utilise **Turborepo** pour le cache de build. Les builds incrementaux reutilisent les resultats precedents lorsque le code n'a pas change :

```bash
npx turbo run build
```

## Optimisations Laravel

En production, activez les caches natifs :

```bash
php artisan config:cache    # Fusionne les fichiers de configuration
php artisan route:cache     # Serialise la table de routage
php artisan view:cache      # Precompile les templates Blade
php artisan optimize        # Tout en une commande
```

:::caution[Attention]
Relancez `php artisan optimize` apres chaque deploiement. Les modifications de configuration ou de routes ne sont pas prises en compte tant que le cache n'est pas regenere.
:::
