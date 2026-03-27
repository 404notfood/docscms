---
title: "Policies & Permissions"
description: "Système d'autorisation d'ArtisanCMS : 22 policies, 40+ permissions granulaires, rôles par défaut et gestion des accès pour les plugins."
---

ArtisanCMS utilise le système d'autorisation de Laravel (Policies et Gates) enrichi d'un système de permissions granulaires basé sur des rôles. Les 22 policies couvrent l'ensemble des ressources du CMS.

## Système de permissions

Les permissions suivent le format `module.action` et sont stockées en JSON dans la colonne `permissions` du modèle `Role`.

```php
// Exemples de permissions
'pages.create'        // Créer une page
'pages.edit'          // Modifier une page
'pages.delete'        // Supprimer une page
'pages.publish'       // Publier une page
'posts.create'        // Créer un article
'media.upload'        // Uploader un média
'users.manage'        // Gérer les utilisateurs
'settings.edit'       // Modifier les paramètres
```

### Wildcard

Le caractère `*` permet d'accorder toutes les actions d'un module.

```php
// Toutes les permissions sur les pages
'pages.*'

// Toutes les permissions sur tous les modules (super admin)
'*'
```

## Liste des permissions

### Contenu

| Permission | Description |
|------------|-------------|
| `pages.view` | Voir les pages dans l'administration |
| `pages.create` | Créer une nouvelle page |
| `pages.edit` | Modifier une page existante |
| `pages.delete` | Supprimer une page |
| `pages.publish` | Publier ou dépublier une page |
| `posts.view` | Voir les articles |
| `posts.create` | Créer un article |
| `posts.edit` | Modifier un article |
| `posts.delete` | Supprimer un article |
| `posts.publish` | Publier un article |
| `content_types.manage` | Gérer les types de contenu personnalisés |

### Médias

| Permission | Description |
|------------|-------------|
| `media.view` | Voir la bibliothèque de médias |
| `media.upload` | Uploader des fichiers |
| `media.edit` | Modifier les métadonnées |
| `media.delete` | Supprimer des médias |

### Utilisateurs

| Permission | Description |
|------------|-------------|
| `users.view` | Voir la liste des utilisateurs |
| `users.create` | Créer un utilisateur |
| `users.edit` | Modifier un utilisateur |
| `users.delete` | Supprimer un utilisateur |
| `users.manage` | Gérer les rôles et permissions |

### Apparence

| Permission | Description |
|------------|-------------|
| `themes.manage` | Installer et activer des thèmes |
| `menus.manage` | Gérer les menus de navigation |
| `widgets.manage` | Gérer les widgets |
| `design.edit` | Modifier les tokens de design |
| `branding.edit` | Modifier le branding |

### Système

| Permission | Description |
|------------|-------------|
| `plugins.manage` | Installer et gérer les plugins |
| `settings.view` | Voir les paramètres |
| `settings.edit` | Modifier les paramètres |
| `redirects.manage` | Gérer les redirections SEO |
| `analytics.view` | Consulter les statistiques |
| `comments.moderate` | Modérer les commentaires |
| `newsletters.manage` | Gérer les newsletters |
| `webhooks.manage` | Gérer les webhooks |
| `activity_log.view` | Consulter le journal d'activité |
| `forms.view` | Voir les soumissions de formulaires |
| `sites.manage` | Gérer les sites (multi-site) |

## Rôles par défaut

ArtisanCMS crée quatre rôles par défaut via le `RoleSeeder`.

| Rôle | Permissions | Description |
|------|-------------|-------------|
| **Admin** | `*` | Accès complet à toutes les fonctionnalités |
| **Éditeur** | `pages.*`, `posts.*`, `media.*`, `comments.moderate`, `menus.manage` | Gestion complète du contenu |
| **Auteur** | `posts.create`, `posts.edit`, `media.view`, `media.upload` | Rédaction d'articles uniquement |
| **Contributeur** | `posts.create`, `media.view` | Création de brouillons sans publication |

## Modèle Role

```php
class Role extends Model
{
    protected $table = 'cms_roles';

    protected $casts = [
        'permissions' => 'array',
    ];

    public function hasPermission(string $permission): bool
    {
        $permissions = $this->permissions ?? [];

        // Vérifier le wildcard global
        if (in_array('*', $permissions)) {
            return true;
        }

        // Vérifier le wildcard de module (pages.*)
        $module = explode('.', $permission)[0];
        if (in_array("{$module}.*", $permissions)) {
            return true;
        }

        return in_array($permission, $permissions);
    }
}
```

## Liste des 22 Policies

Les policies sont enregistrées dans `AuthServiceProvider`.

| Policy | Modèle | Permissions utilisées |
|--------|--------|----------------------|
| `PagePolicy` | `Page` | `pages.*` |
| `PostPolicy` | `Post` | `posts.*` |
| `ContentTypePolicy` | `ContentType` | `content_types.manage` |
| `MediaPolicy` | `Media` | `media.*` |
| `MediaFolderPolicy` | `MediaFolder` | `media.*` |
| `UserPolicy` | `User` | `users.*` |
| `RolePolicy` | `Role` | `users.manage` |
| `MenuPolicy` | `Menu` | `menus.manage` |
| `MenuItemPolicy` | `MenuItem` | `menus.manage` |
| `ThemePolicy` | `Theme` | `themes.manage` |
| `PluginPolicy` | `Plugin` | `plugins.manage` |
| `SettingPolicy` | `Setting` | `settings.*` |
| `WidgetPolicy` | `Widget` | `widgets.manage` |
| `PopupPolicy` | `Popup` | `pages.edit` |
| `CommentPolicy` | `Comment` | `comments.moderate` |
| `RedirectPolicy` | `Redirect` | `redirects.manage` |
| `TaxonomyPolicy` | `Taxonomy` | `content_types.manage` |
| `NewsletterPolicy` | `Newsletter` | `newsletters.manage` |
| `WebhookPolicy` | `Webhook` | `webhooks.manage` |
| `FormEntryPolicy` | `FormEntry` | `forms.view` |
| `DesignTokenPolicy` | `DesignToken` | `design.edit` |
| `BrandingPolicy` | `Branding` | `branding.edit` |

## Enregistrement dans AuthServiceProvider

```php
// app/Providers/AuthServiceProvider.php
class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Page::class => PagePolicy::class,
        Post::class => PostPolicy::class,
        Media::class => MediaPolicy::class,
        // ... toutes les autres policies
    ];
}
```

## Utilisation dans les contrôleurs

```php
class PageController extends Controller
{
    public function edit(Page $page)
    {
        $this->authorize('update', $page);

        return inertia('Pages/Edit', compact('page'));
    }

    public function destroy(Page $page)
    {
        $this->authorize('delete', $page);

        $page->delete();

        return redirect()->route('admin.pages.index')
            ->with('success', 'Page supprimée.');
    }
}
```

## Permissions personnalisées pour les plugins

Les plugins peuvent déclarer leurs propres permissions.

```php
// Dans le ServiceProvider du plugin
public function boot(): void
{
    // Enregistrer des permissions personnalisées
    \CMS::registerPermissions('my-plugin', [
        'my-plugin.view' => 'Voir les données du plugin',
        'my-plugin.manage' => 'Gérer le plugin',
    ]);
}
```

Ces permissions apparaissent dans l'interface de gestion des rôles et peuvent être attribuées aux utilisateurs.

```php
// Vérifier une permission de plugin dans un contrôleur
$this->authorize('viewAny', MyPluginResource::class);
```
