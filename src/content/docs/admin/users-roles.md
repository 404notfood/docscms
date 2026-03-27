---
title: Utilisateurs & Roles
description: Gestion des utilisateurs, roles et permissions dans ArtisanCMS - modeles, CRUD, profils et autorisation granulaire.
---

ArtisanCMS integre un systeme complet de gestion des utilisateurs et des roles avec plus de 40 permissions granulaires organisees par module.

## Modeles

### User

Le modele `User` etend le modele d'authentification Laravel standard et ajoute les fonctionnalites propres au CMS :

```php
class User extends Authenticatable
{
    use HasRoles;       // Relation avec les roles
    use SoftDeletes;    // Desactivation sans suppression
}
```

### Role

Le modele `Role` definit un ensemble de permissions attribuables aux utilisateurs :

```php
class Role extends Model
{
    // Relation many-to-many avec les permissions
    public function permissions(): BelongsToMany;
    // Relation many-to-many avec les utilisateurs
    public function users(): BelongsToMany;
}
```

## Roles par defaut

ArtisanCMS fournit six roles preconfigures lors de l'installation :

| Role | Description |
|------|-------------|
| **Super Admin** | Acces total, ne peut pas etre supprime |
| **Admin** | Administration complete sauf gestion du Super Admin |
| **Editor** | Gestion de tout le contenu, publication incluse |
| **Author** | Creation et gestion de son propre contenu |
| **Contributor** | Creation de brouillons, soumission pour relecture |
| **Subscriber** | Acces au contenu restreint, gestion de son profil |

## Permissions granulaires

Les permissions sont organisees par module. Chaque module propose un ensemble d'actions :

- **Pages** : `pages.view`, `pages.create`, `pages.update`, `pages.delete`, `pages.publish`
- **Articles** : `posts.view`, `posts.create`, `posts.update`, `posts.delete`, `posts.publish`
- **Medias** : `media.view`, `media.upload`, `media.update`, `media.delete`
- **Utilisateurs** : `users.view`, `users.create`, `users.update`, `users.delete`
- **Roles** : `roles.view`, `roles.create`, `roles.update`, `roles.delete`
- **Parametres** : `settings.view`, `settings.update`
- **Plugins** : `plugins.manage`, `plugins.install`, `plugins.configure`
- **Themes** : `themes.manage`, `themes.install`, `themes.configure`
- **Analytics** : `analytics.view`, `analytics.export`

### Editeur de role

L'interface d'edition d'un role presente les permissions sous forme de cases a cocher regroupees par module. Un bouton "Tout selectionner" permet d'activer rapidement toutes les permissions d'un module.

## Controleurs et services

### Gestion des utilisateurs

- **`Admin\UserController`** : operations CRUD sur les utilisateurs (liste, creation, edition, desactivation).
- **`UserService`** : logique metier de creation, mise a jour et desactivation des comptes.

### Gestion des roles

- **`Admin\RoleController`** : operations CRUD sur les roles et attribution des permissions.
- **`RoleService`** : logique metier de gestion des roles et synchronisation des permissions.

```php
Route::resource('users', UserController::class);
Route::resource('roles', RoleController::class);
```

## CRUD utilisateur

Les operations disponibles sur les utilisateurs sont :

- **Creer** : formulaire avec nom, email, mot de passe et attribution de role.
- **Editer** : modification des informations, changement de role.
- **Desactiver** : l'utilisateur ne peut plus se connecter mais ses contenus sont preserves (soft delete).

Les utilisateurs desactives peuvent etre reactives a tout moment depuis l'interface d'administration.

## Profil utilisateur

Le `AccountController` permet a chaque utilisateur de gerer son propre profil :

- **Avatar** : import d'une image de profil, geree par le `AvatarService` (redimensionnement automatique, stockage optimise).
- **Mot de passe** : modification du mot de passe avec verification de l'ancien mot de passe.
- **Preferences** : langue de l'interface, fuseau horaire, notifications.

## Autorisation

Les policies Laravel controlent l'acces aux ressources :

- **`UserPolicy`** : verifie les permissions `users.*` avant chaque action sur un utilisateur.
- **`RolePolicy`** : verifie les permissions `roles.*` et empeche la modification du role Super Admin par un non-Super Admin.

```php
// Exemple de verification dans un controleur
$this->authorize('update', $user);
```

## Journal d'activite

Le modele `ActivityLog` enregistre automatiquement les actions effectuees par chaque utilisateur :

```php
// Structure d'une entree de journal
[
    'user_id'      => 1,
    'action'       => 'created',
    'subject_type' => 'App\Models\Page',
    'subject_id'   => 42,
    'description'  => 'Page "Contact" creee',
    'ip_address'   => '192.168.1.1',
    'created_at'   => '2026-03-27 10:30:00',
]
```

L'historique d'activite est consultable depuis la fiche de chaque utilisateur dans l'interface d'administration.
