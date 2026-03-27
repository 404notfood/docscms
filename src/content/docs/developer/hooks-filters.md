---
title: "Hooks & Filtres"
description: "Système de hooks et filtres d'ArtisanCMS inspiré de WordPress. Utilisez les actions et filtres pour étendre le comportement du CMS sans modifier le code source."
---

ArtisanCMS intègre un système de hooks et filtres inspiré de WordPress, permettant aux développeurs d'étendre le comportement du CMS de manière découplée. Ce mécanisme repose sur le **HookManager** (`app/CMS/HookManager.php`) et la facade **CMS** pour un accès simplifié.

## Concepts fondamentaux

Le système distingue deux types de hooks :

- **Actions** : exécutent des callbacks lorsqu'un événement survient (notifications, logs, traitements secondaires).
- **Filtres** : modifient une valeur en la passant à travers une chaîne de callbacks avant de la retourner.

Chaque hook est enregistré avec une **priorité** (entier). Plus le nombre est bas, plus le callback s'exécute tôt. La priorité par défaut est `10`.

## Enregistrer une action

Les actions permettent de réagir à un événement sans modifier la donnée source.

```php
use App\Facades\CMS;

// Envoyer un email lorsqu'un contenu est publié
CMS::addAction('content.published', function ($content) {
    Mail::to($content->author->email)->send(new ContentPublishedMail($content));
}, priority: 10);

// Logger l'activation d'un plugin
CMS::addAction('plugin.activated', function ($plugin) {
    Log::info("Plugin activé : {$plugin->name}");
}, priority: 5);
```

## Déclencher une action

Utilisez `doAction` pour déclencher tous les callbacks enregistrés sur un événement donné.

```php
// Dans un contrôleur ou un service
CMS::doAction('content.published', $page);

// Avec plusieurs arguments
CMS::doAction('content.saving', $content, $request);
```

## Enregistrer un filtre

Les filtres transforment une valeur avant qu'elle ne soit utilisée.

```php
// Mettre le titre en majuscules
CMS::addFilter('content.title', function ($title) {
    return strtoupper($title);
}, priority: 20);

// Ajouter un préfixe aux slugs
CMS::addFilter('content.slug', function ($slug, $content) {
    if ($content->type === 'article') {
        return "blog/{$slug}";
    }
    return $slug;
}, priority: 15);
```

## Appliquer un filtre

```php
// Récupérer le titre filtré
$title = CMS::applyFilter('content.title', $page->title);

// Filtre avec contexte supplémentaire
$slug = CMS::applyFilter('content.slug', $page->slug, $page);
```

## Hooks intégrés

ArtisanCMS fournit de nombreux hooks prêts à l'emploi.

### Actions disponibles

| Hook | Description | Arguments |
|------|-------------|-----------|
| `content.saving` | Avant la sauvegarde d'un contenu | `$content, $request` |
| `content.saved` | Après la sauvegarde d'un contenu | `$content` |
| `content.publishing` | Avant la publication | `$content` |
| `content.published` | Après la publication | `$content` |
| `content.deleting` | Avant la suppression | `$content` |
| `theme.rendering` | Avant le rendu du thème | `$theme, $data` |
| `theme.activated` | Après activation d'un thème | `$theme` |
| `plugin.activating` | Avant activation d'un plugin | `$plugin` |
| `plugin.activated` | Après activation d'un plugin | `$plugin` |
| `plugin.deactivated` | Après désactivation d'un plugin | `$plugin` |
| `user.registered` | Après inscription d'un utilisateur | `$user` |
| `media.uploaded` | Après l'upload d'un média | `$media` |

### Filtres disponibles

| Hook | Description | Valeur |
|------|-------------|--------|
| `content.title` | Filtre le titre affiché | `string $title` |
| `content.body` | Filtre le corps du contenu | `string $body` |
| `content.excerpt` | Filtre l'extrait | `string $excerpt` |
| `content.meta` | Filtre les métadonnées SEO | `array $meta` |
| `admin.menu` | Modifie le menu d'administration | `array $menuItems` |
| `admin.dashboard.widgets` | Modifie les widgets du tableau de bord | `array $widgets` |

## Priorités

Les callbacks sont exécutés dans l'ordre croissant de priorité.

```php
// S'exécute en premier (priorité basse = haute importance)
CMS::addFilter('content.title', fn($t) => trim($t), priority: 1);

// S'exécute en second
CMS::addFilter('content.title', fn($t) => ucfirst($t), priority: 10);

// S'exécute en dernier
CMS::addFilter('content.title', fn($t) => $t . ' | Mon Site', priority: 99);
```

## Utiliser le HookManager directement

Pour un usage avancé, vous pouvez injecter le `HookManager` directement.

```php
use App\CMS\HookManager;

class MyService
{
    public function __construct(private HookManager $hooks) {}

    public function process(): void
    {
        $this->hooks->addAction('content.saved', [$this, 'onContentSaved']);
    }

    public function onContentSaved($content): void
    {
        // Traitement personnalisé
    }
}
```

## Bonnes pratiques

- **Nommez vos hooks** avec un namespace pour éviter les collisions : `monplugin.content.saved`.
- **Utilisez des priorités explicites** plutôt que la valeur par défaut pour garantir l'ordre d'exécution.
- **Gardez les callbacks légers** : déléguez les traitements lourds à des jobs en file d'attente.
- **Documentez vos hooks personnalisés** pour les autres développeurs de plugins.
