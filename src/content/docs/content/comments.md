---
title: Commentaires
description: Système de commentaires d'ArtisanCMS - soumission publique, modération, anti-spam et workflow d'approbation.
---

ArtisanCMS intègre un système de commentaires complet pour les articles de blog. Il comprend la soumission publique, un workflow de modération, des mesures anti-spam et une invalidation automatique du cache.

## Modèle Comment

Le modèle `Comment` (`App\Models\Comment`) est associé aux articles :

| Champ | Type | Description |
|-------|------|-------------|
| `post_id` | `integer` | Article commenté |
| `user_id` | `integer` | Utilisateur connecté (nullable) |
| `author_name` | `string` | Nom de l'auteur (visiteurs) |
| `author_email` | `string` | Email de l'auteur (visiteurs) |
| `content` | `text` | Contenu du commentaire |
| `status` | `string` | Statut de modération |
| `ip_address` | `string` | Adresse IP du visiteur |
| `user_agent` | `string` | User-Agent du navigateur |
| `parent_id` | `integer` | Commentaire parent (réponses) |
| `created_at` | `datetime` | Date de publication |

## Soumission publique

Le `Front\PublicCommentController` gère la soumission de commentaires par les visiteurs :

```php
Route::post('/comments', [PublicCommentController::class, 'store']);
```

### Champs requis

Pour les visiteurs non connectés :

- **Nom** : obligatoire
- **Email** : obligatoire, validé mais non affiché publiquement
- **Contenu** : obligatoire, longueur minimale configurable

Pour les utilisateurs connectés, le nom et l'email sont remplis automatiquement depuis leur profil.

### Protection anti-spam

ArtisanCMS met en place plusieurs couches de protection contre le spam :

| Mesure | Description |
|--------|-------------|
| Honeypot | Champ caché invisible pour les humains, détecté par les bots |
| Rate limiting | Limite le nombre de commentaires par IP et par période |
| Validation du contenu | Détection de patterns de spam courants |
| Temps minimum | Temps minimal entre l'affichage du formulaire et la soumission |

## Workflow de modération

Chaque commentaire passe par un workflow d'approbation :

| Statut | Description |
|--------|-------------|
| `pending` | En attente de modération (statut par défaut) |
| `approved` | Approuvé et visible publiquement |
| `rejected` | Rejeté, non affiché sur le site |

### Configuration du workflow

Le comportement par défaut est configurable dans les paramètres du site :

```php
// Paramètres de commentaires
'comments' => [
    'moderation' => true,          // Modération activée par défaut
    'auto_approve_registered' => false, // Auto-approuver les utilisateurs enregistrés
    'notify_admin' => true,         // Notifier l'admin par email
    'min_content_length' => 10,     // Longueur minimale du contenu
],
```

## Administration

Le `Admin\CommentController` fournit l'interface de modération :

```php
Route::resource('comments', CommentController::class)->except(['create', 'store']);
Route::post('comments/{comment}/approve', [CommentController::class, 'approve']);
Route::post('comments/{comment}/reject', [CommentController::class, 'reject']);
Route::post('comments/bulk-action', [CommentController::class, 'bulkAction']);
```

### Actions disponibles

- **Approuver** : rendre le commentaire visible
- **Rejeter** : masquer le commentaire
- **Supprimer** : suppression définitive
- **Action groupée** : approuver, rejeter ou supprimer plusieurs commentaires simultanément

### Interface de modération

L'interface d'administration affiche :

- La liste des commentaires avec filtrage par statut
- Un aperçu rapide du contenu et de l'article associé
- Des indicateurs visuels pour les commentaires en attente
- Un compteur de commentaires en attente dans la barre latérale

## CommentService

Le `CommentService` centralise la logique métier :

```php
class CommentService
{
    public function store(array $data): Comment;
    public function approve(Comment $comment): void;
    public function reject(Comment $comment): void;
    public function getCommentsForPost(Post $post): Collection;
    public function getPendingCount(): int;
}
```

## Commentaires imbriqués

Les visiteurs peuvent répondre à un commentaire existant, créant une structure de conversation imbriquée :

```
Commentaire de Jean
├── Réponse de Marie
│   └── Réponse de Jean
└── Réponse de Pierre
```

L'imbrication est gérée via le champ `parent_id` sur le modèle `Comment`.

## Cache et Observer

Le `CommentObserver` invalide automatiquement le cache lorsqu'un commentaire est créé, modifié ou supprimé :

```php
class CommentObserver
{
    public function saved(Comment $comment): void
    {
        Cache::tags(["post:{$comment->post_id}"])->flush();
    }
}
```

Cela garantit que les visiteurs voient toujours les commentaires à jour sans délai.

## Activation par article

Les commentaires peuvent etre activés ou désactivés individuellement sur chaque article via le champ `comment_status` du modèle `Post`. Consultez la section [Articles de blog](/content/posts/) pour plus de détails.
