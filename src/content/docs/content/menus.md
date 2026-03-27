---
title: Menus de navigation
description: Création et gestion des menus de navigation dans ArtisanCMS - types de menus, éléments hiérarchiques et cache.
---

Les menus de navigation permettent de structurer la navigation de votre site. ArtisanCMS offre un constructeur de menus visuel avec support de la hiérarchie, plusieurs emplacements prédéfinis et un cache automatique.

## Modèles

### Menu

Le modèle `Menu` (`App\Models\Menu`) représente un menu complet :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Nom du menu |
| `slug` | `string` | Identifiant unique |
| `location` | `string` | Emplacement (header, footer, sidebar, custom) |
| `site_id` | `integer` | Site associé (multi-site) |
| `is_active` | `boolean` | Menu actif ou inactif |

### MenuItem

Le modèle `MenuItem` (`App\Models\MenuItem`) représente un élément individuel du menu :

| Champ | Type | Description |
|-------|------|-------------|
| `menu_id` | `integer` | Menu parent |
| `parent_id` | `integer` | Élément parent (sous-menus) |
| `title` | `string` | Texte affiché |
| `type` | `string` | Type de lien |
| `reference_id` | `integer` | ID du contenu lié (nullable) |
| `url` | `string` | URL personnalisée (nullable) |
| `target` | `string` | Cible du lien (`_self`, `_blank`) |
| `css_class` | `string` | Classes CSS additionnelles |
| `order` | `integer` | Position dans le menu |

## Types de menus

ArtisanCMS propose quatre emplacements de menu prédéfinis :

| Emplacement | Utilisation typique |
|-------------|---------------------|
| `header` | Navigation principale en haut de page |
| `footer` | Liens du pied de page |
| `sidebar` | Navigation latérale |
| `custom` | Emplacement libre pour les thèmes |

Chaque emplacement peut contenir un seul menu actif à la fois.

## Types de liens

Les éléments de menu supportent plusieurs types de liens :

### Lien vers une page

```php
MenuItem::create([
    'type' => 'page',
    'reference_id' => $page->id,
    'title' => $page->title,
]);
```

L'URL est automatiquement mise à jour si le slug de la page change.

### Lien vers un article

```php
MenuItem::create([
    'type' => 'post',
    'reference_id' => $post->id,
    'title' => $post->title,
]);
```

### Lien vers une catégorie

```php
MenuItem::create([
    'type' => 'category',
    'reference_id' => $term->id,
    'title' => $term->name,
]);
```

### URL personnalisée

```php
MenuItem::create([
    'type' => 'custom',
    'url' => 'https://example.com',
    'title' => 'Lien externe',
    'target' => '_blank',
]);
```

## Hiérarchie des éléments

Les éléments de menu supportent l'imbrication via le champ `parent_id` pour créer des sous-menus :

```
Menu principal
├── Accueil
├── Services
│   ├── Consulting
│   ├── Formation
│   └── Support
├── Blog
└── Contact
```

L'interface d'administration permet de réorganiser les éléments par drag-and-drop et de les imbriquer visuellement.

## Administration

Le `Admin\MenuController` gère les opérations sur les menus :

```php
Route::resource('menus', MenuController::class);
Route::post('menus/{menu}/items', [MenuController::class, 'storeItem']);
Route::put('menus/{menu}/items/{item}', [MenuController::class, 'updateItem']);
Route::delete('menus/{menu}/items/{item}', [MenuController::class, 'destroyItem']);
Route::post('menus/{menu}/reorder', [MenuController::class, 'reorder']);
```

### MenuService

Le `MenuService` encapsule la logique métier :

```php
class MenuService
{
    public function getMenuByLocation(string $location): ?Menu;
    public function getMenuTree(Menu $menu): Collection;
    public function reorderItems(Menu $menu, array $order): void;
    public function duplicateMenu(Menu $menu): Menu;
}
```

## Cache et performances

Les menus sont mis en cache automatiquement pour éviter des requêtes répétées à chaque chargement de page. Le `MenuObserver` se charge d'invalider le cache lorsqu'un menu ou un élément est modifié :

```php
class MenuObserver
{
    public function saved(Menu $menu): void
    {
        Cache::tags(['menus', "site:{$menu->site_id}"])->flush();
    }

    public function deleted(Menu $menu): void
    {
        Cache::tags(['menus', "site:{$menu->site_id}"])->flush();
    }
}
```

Le cache est également invalidé lors de la modification d'un `MenuItem` pour garantir la cohérence des données affichées.

## Affichage dans les templates

Pour afficher un menu dans un template Blade :

```blade
@php
    $menu = app(MenuService::class)->getMenuByLocation('header');
    $items = app(MenuService::class)->getMenuTree($menu);
@endphp

<nav>
    @foreach($items as $item)
        <a href="{{ $item->url }}" target="{{ $item->target }}">
            {{ $item->title }}
        </a>
    @endforeach
</nav>
```

Les thèmes ArtisanCMS incluent des composants Blade prêts a l'emploi pour le rendu des menus avec support des sous-menus.
