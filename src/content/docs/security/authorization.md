---
title: "Autorisations"
description: "Systeme d'autorisations d'ArtisanCMS : RBAC, 22 policies, 40+ permissions granulaires, roles par defaut et enforcement dans les controleurs."
---

ArtisanCMS implemente un systeme de controle d'acces base sur les roles (RBAC) avec des permissions granulaires couvrant l'ensemble des ressources du CMS.

## Architecture RBAC

Le systeme repose sur trois entites : **Utilisateur** (possede un ou plusieurs roles), **Role** (regroupe des permissions) et **Permission** (autorise une action sur un module).

```php
class Role extends Model
{
    protected $casts = [
        'permissions' => 'array', // Colonne JSON contenant les permissions
    ];

    public function hasPermission(string $permission): bool
    {
        $permissions = $this->permissions ?? [];
        $module = Str::before($permission, '.');

        // Support du wildcard : 'pages.*' accorde toutes les actions
        if (in_array("{$module}.*", $permissions)) {
            return true;
        }

        return in_array($permission, $permissions);
    }
}
```

## Permissions par module

Les permissions suivent le format `module.action`. Liste complete :

| Module | Permissions |
|---|---|
| **Pages** | `pages.create`, `pages.read`, `pages.update`, `pages.delete`, `pages.publish` |
| **Articles** | `posts.create`, `posts.read`, `posts.update`, `posts.delete`, `posts.publish` |
| **Medias** | `media.upload`, `media.read`, `media.update`, `media.delete` |
| **Taxonomies** | `taxonomies.create`, `taxonomies.read`, `taxonomies.update`, `taxonomies.delete` |
| **Menus** | `menus.create`, `menus.read`, `menus.update`, `menus.delete` |
| **Utilisateurs** | `users.create`, `users.read`, `users.update`, `users.delete` |
| **Roles** | `roles.create`, `roles.read`, `roles.update`, `roles.delete` |
| **Parametres** | `settings.read`, `settings.update` |
| **Plugins** | `plugins.install`, `plugins.activate`, `plugins.deactivate`, `plugins.delete`, `plugins.settings` |
| **Themes** | `themes.activate`, `themes.customize`, `themes.delete` |
| **Webhooks** | `webhooks.create`, `webhooks.read`, `webhooks.update`, `webhooks.delete` |
| **Analytics** | `analytics.read` |
| **Systeme** | `system.read`, `system.update` |

Le wildcard `module.*` accorde toutes les actions d'un module en une seule permission.

## Roles par defaut

| Role | Permissions | Description |
|---|---|---|
| **Super Admin** | Toutes (`*.*`) | Acces total, role non suppressible |
| **Admin** | Presque toutes | Administration complete sauf gestion du Super Admin |
| **Editor** | `pages.*`, `posts.*`, `media.*`, `menus.*`, `taxonomies.*` | Gestion et publication de tout le contenu |
| **Author** | `posts.create/read/update`, `media.upload/read` | Creation et gestion de son propre contenu |
| **Contributor** | `posts.create/read`, `media.upload/read` | Brouillons et soumission pour relecture |
| **Subscriber** | `posts.read`, `pages.read` | Consultation du contenu restreint |

## Les 22 Policies

ArtisanCMS definit une policy par entite dans `app/Policies/` : Page, Post, Media, User, Role, Menu, Taxonomy, Setting, Plugin, Theme, Webhook, Block, Comment, Navigation, Newsletter, Site, Analytics, Form, Redirect, ActivityLog, ContentType et CustomField.

```php
class PagePolicy
{
    public function create(User $user): bool
    {
        return $user->hasPermission('pages.create');
    }

    public function update(User $user, Page $page): bool
    {
        return $user->hasPermission('pages.update');
    }

    public function delete(User $user, Page $page): bool
    {
        return $user->hasPermission('pages.delete');
    }
}
```

## Enforcement dans les controleurs

Les policies sont appliquees via la methode `authorize()` :

```php
class PageController extends Controller
{
    public function store(StorePageRequest $request)
    {
        $this->authorize('create', Page::class);
        // Logique de creation...
    }

    public function destroy(Page $page)
    {
        $this->authorize('delete', $page);
        // Logique de suppression...
    }
}
```

## Middleware EnsureAdmin

Le middleware `EnsureAdmin` protege toutes les routes d'administration :

```php
class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->isAdmin()) {
            abort(403, 'Acces non autorise.');
        }
        return $next($request);
    }
}
```

Il est applique au groupe de routes admin dans `routes/web.php` :

```php
Route::prefix(config('cms.admin_prefix'))
    ->middleware(['auth', 'verified', EnsureAdmin::class])
    ->group(function () {
        // Toutes les routes d'administration
    });
```

:::tip[Astuce]
Les roles personnalises peuvent etre crees depuis **Parametres > Roles** dans l'interface d'administration. Chaque permission est presentee sous forme de case a cocher, regroupee par module.
:::
