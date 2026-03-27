---
title: Webhooks
description: Systeme de webhooks d'ArtisanCMS - integrations evenementielles, signature HMAC, livraison fiable et configuration depuis l'administration.
---

Le systeme de webhooks d'ArtisanCMS permet de notifier des services externes lorsque des evenements se produisent dans le CMS. Cela facilite les integrations avec des outils tiers sans developpement de plugin.

## Architecture

Le systeme repose sur les composants suivants :

| Composant | Role |
|-----------|------|
| `WebhookController` | Interface admin pour configurer les webhooks |
| `WebhookService` | Logique de resolution et de dispatch des webhooks |
| `WebhookDispatchJob` | Job asynchrone pour la livraison HTTP fiable |
| `WebhookHookListener` | Ecouteur integre au `HookManager` du systeme de hooks |
| `WebhookPolicy` | Controle d'acces aux operations sur les webhooks |

## Configuration d'un webhook

Depuis l'interface d'administration, un webhook se configure avec les champs suivants :

| Champ | Description |
|-------|-------------|
| **Nom** | Libelle descriptif pour identifier le webhook |
| **URL** | Endpoint HTTP(S) qui recevra les notifications |
| **Secret** | Cle secrete utilisee pour signer les payloads |
| **Evenements** | Liste des evenements auxquels s'abonner |
| **Actif** | Active ou desactive le webhook |

```php
Route::resource('webhooks', WebhookController::class);
```

## Evenements disponibles

Les evenements declencheurs sont organises par categorie :

### Contenu

| Evenement | Declencheur |
|-----------|-------------|
| `content.created` | Creation d'une page ou d'un article |
| `content.updated` | Modification d'un contenu existant |
| `content.published` | Publication d'un contenu |
| `content.deleted` | Suppression d'un contenu |

### Utilisateurs

| Evenement | Declencheur |
|-----------|-------------|
| `user.created` | Creation d'un nouveau compte utilisateur |
| `user.updated` | Modification d'un profil utilisateur |

### Medias

| Evenement | Declencheur |
|-----------|-------------|
| `media.uploaded` | Import d'un nouveau fichier media |
| `media.deleted` | Suppression d'un fichier media |

### Formulaires

| Evenement | Declencheur |
|-----------|-------------|
| `form.submitted` | Soumission d'un formulaire de contact |

## Signature HMAC

Chaque payload est signe avec HMAC SHA-256 pour garantir l'authenticite de la requete. La signature est transmise dans l'en-tete HTTP `X-ArtisanCMS-Signature` :

```php
$signature = hash_hmac('sha256', $payload, $webhook->secret);
```

Le service recepteur doit verifier la signature en recalculant le HMAC avec le secret partage et en le comparant a la valeur de l'en-tete.

### Verification cote recepteur

```php
$expected = hash_hmac('sha256', $requestBody, $sharedSecret);
$valid = hash_equals($expected, $receivedSignature);
```

## Livraison fiable

Le `WebhookDispatchJob` est mis en file d'attente pour garantir une livraison fiable :

- **Timeout** : chaque requete a un delai maximal de 30 secondes.
- **Tentatives** : en cas d'echec (timeout, erreur HTTP 5xx), le job est automatiquement reessaye.
- **Nombre de tentatives** : 3 tentatives avec un delai exponentiel entre chaque essai.
- **Journalisation** : chaque tentative (succes ou echec) est enregistree pour le diagnostic.

```php
class WebhookDispatchJob implements ShouldQueue
{
    public int $tries = 3;
    public array $backoff = [30, 120, 300]; // Secondes entre les tentatives
}
```

## Integration avec le HookManager

Le `WebhookHookListener` s'enregistre automatiquement aupres du `HookManager` d'ArtisanCMS. Lorsqu'un hook interne est declenche, le listener verifie si des webhooks sont configures pour l'evenement correspondant et dispatche les jobs necessaires.

```php
// Enregistrement automatique
HookManager::listen('content.*', [WebhookHookListener::class, 'handle']);
```

## Format du payload

Les payloads sont envoyes en JSON avec la structure suivante :

```json
{
    "event": "content.published",
    "timestamp": "2026-03-27T10:30:00Z",
    "site_id": 1,
    "data": {
        "id": 42,
        "type": "page",
        "title": "Nouvelle page",
        "url": "https://exemple.com/nouvelle-page"
    }
}
```

## Autorisation

La `WebhookPolicy` controle l'acces aux webhooks selon les permissions de l'utilisateur. Seuls les utilisateurs disposant de la permission `webhooks.manage` peuvent creer, modifier ou supprimer des webhooks.
