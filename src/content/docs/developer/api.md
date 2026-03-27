---
title: "API REST"
description: "Documentation de l'API REST d'ArtisanCMS : endpoints disponibles, authentification, contrôleurs, format de réponse et limitation de débit."
---

ArtisanCMS expose une API REST pour interagir avec le CMS de manière programmatique. Les routes sont définies dans `routes/api.php` et les contrôleurs se trouvent dans `app/Http/Controllers/Api/`.

## Authentification

L'API utilise **Laravel Sanctum** pour l'authentification. Deux méthodes sont supportées :

- **Session** : pour les appels depuis l'interface d'administration (cookie CSRF)
- **Token API** : pour les intégrations externes

```bash
# Authentification par token
curl -H "Authorization: Bearer {votre-token}" \
     https://example.com/api/search?q=laravel
```

Les tokens sont créés depuis le profil utilisateur dans l'administration.

## Contrôleurs API

### BuilderApiController

Gère les opérations backend du Page Builder.

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/builder/blocks` | Liste des blocs disponibles |
| `POST` | `/api/builder/page/{id}/save` | Sauvegarde du contenu d'une page |
| `POST` | `/api/builder/page/{id}/publish` | Publication d'une page |
| `GET` | `/api/builder/page/{id}/revisions` | Historique des révisions |
| `POST` | `/api/builder/page/{id}/restore/{revisionId}` | Restauration d'une révision |

### MediaApiController

Gère l'upload et le traitement des médias.

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/media` | Liste des médias (paginée) |
| `POST` | `/api/media/upload` | Upload d'un fichier |
| `DELETE` | `/api/media/{id}` | Suppression d'un média |
| `POST` | `/api/media/{id}/optimize` | Optimisation d'une image |
| `GET` | `/api/media/folders` | Arborescence des dossiers |
| `POST` | `/api/media/folders` | Création d'un dossier |

### SearchApiController

Fournit une recherche full-text sur le contenu public du site.

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/search` | Recherche full-text |

#### Paramètres de recherche

| Paramètre | Type | Description |
|-----------|------|-------------|
| `q` | string | Terme de recherche (obligatoire) |
| `type` | string | Filtrer par type : `page`, `post` |
| `limit` | int | Nombre de résultats (défaut : 10, max : 50) |
| `page` | int | Pagination |

#### Exemple de requête

```bash
curl "https://example.com/api/search?q=laravel&type=post&limit=5"
```

#### Exemple de réponse

```json
{
    "data": [
        {
            "id": 42,
            "title": "Guide Laravel",
            "excerpt": "Introduction à Laravel 13...",
            "url": "/blog/guide-laravel",
            "type": "post",
            "published_at": "2025-03-15T10:30:00Z"
        }
    ],
    "meta": {
        "total": 12,
        "per_page": 5,
        "current_page": 1,
        "last_page": 3
    }
}
```

## Format de réponse

Toutes les réponses suivent une structure JSON cohérente.

### Succès

```json
{
    "data": { ... },
    "meta": { ... }
}
```

### Erreur

```json
{
    "message": "Description de l'erreur",
    "errors": {
        "field": ["Détail de la validation"]
    }
}
```

### Codes HTTP utilisés

| Code | Description |
|------|-------------|
| `200` | Succès |
| `201` | Ressource créée |
| `204` | Succès sans contenu |
| `401` | Non authentifié |
| `403` | Non autorisé |
| `404` | Ressource introuvable |
| `422` | Erreur de validation |
| `429` | Trop de requêtes |

## Limitation de débit (Rate Limiting)

L'API applique des limites de débit pour protéger le serveur.

| Groupe | Limite | Fenêtre |
|--------|--------|---------|
| API générale | 60 requêtes | par minute |
| Upload média | 20 requêtes | par minute |
| Recherche | 30 requêtes | par minute |

En cas de dépassement, l'API retourne un code `429` avec les en-têtes suivants :

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
Retry-After: 45
```

## Upload de médias

L'upload utilise `multipart/form-data`.

```bash
curl -X POST \
     -H "Authorization: Bearer {token}" \
     -F "file=@image.jpg" \
     -F "folder_id=3" \
     -F "alt_text=Description de l'image" \
     https://example.com/api/media/upload
```

## Étendre l'API

Les plugins peuvent ajouter leurs propres endpoints dans `routes/admin.php` ou via un fichier de routes dédié.

```php
// Dans le ServiceProvider du plugin
Route::prefix('api/my-plugin')->middleware(['api', 'auth:sanctum'])->group(function () {
    Route::get('/data', [MyPluginApiController::class, 'index']);
    Route::post('/data', [MyPluginApiController::class, 'store']);
});
```
