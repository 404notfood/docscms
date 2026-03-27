---
title: Diagnostic systeme
description: Outils de diagnostic systeme d'ArtisanCMS - verification de sante, prerequis, recuperation d'erreurs, informations systeme et gestion du cache.
---

ArtisanCMS fournit un ensemble d'outils de diagnostic pour surveiller l'etat du systeme, verifier les prerequis et diagnostiquer les problemes.

## Architecture

Le diagnostic systeme repose sur plusieurs composants :

| Composant | Role |
|-----------|------|
| `Admin\SystemController` | Interface d'administration du diagnostic |
| `HealthCheckService` | Verification de l'etat des services |
| `RequirementsChecker` | Validation des prerequis techniques |
| `ErrorRecoveryService` | Detection et recuperation apres erreur |
| `ErrorRecoveryMiddleware` | Middleware de detection du mode securise |

## Verification de sante

Le `HealthCheckService` effectue une serie de verifications sur les services critiques du CMS :

| Verification | Description |
|-------------|-------------|
| **Base de donnees** | Connexion active et temps de reponse |
| **Cache** | Driver de cache operationnel (lecture/ecriture) |
| **File d'attente** | Worker de queue actif et fonctionnel |
| **Stockage** | Permissions d'ecriture sur les repertoires cles |
| **Mail** | Configuration email valide et serveur joignable |

Chaque verification retourne un statut : `ok`, `warning` ou `error`, accompagne d'un message descriptif.

```php
$health = app(HealthCheckService::class)->runAll();
// Retourne un tableau de resultats par service
```

## Verification des prerequis

Le `RequirementsChecker` valide les prerequis techniques de l'environnement :

### Version PHP

Le CMS requiert PHP 8.3 ou superieur. Le checker verifie la version installee et signale toute incompatibilite.

### Extensions PHP

Les extensions suivantes sont requises :

- BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, Zip, GD ou Imagick

### Permissions des repertoires

Le checker verifie les permissions d'ecriture sur :

- `storage/` et ses sous-repertoires
- `bootstrap/cache/`
- `public/media/`

## Recuperation d'erreurs

### ErrorRecoveryService

Le `ErrorRecoveryService` detecte les situations d'erreur critique et propose des actions de recuperation :

- Detection des fichiers de configuration corrompus
- Identification des plugins defaillants
- Verification de l'integrite de la base de donnees

### ErrorRecoveryMiddleware

Le `ErrorRecoveryMiddleware` intercepte les erreurs fatales et active un mode securise. En mode securise :

- Les plugins sont desactives temporairement
- Le theme par defaut est charge
- Un message d'alerte est affiche dans l'administration
- L'administrateur peut diagnostiquer et corriger le probleme

```php
// Detection du mode securise
if (app('cms.safe_mode')) {
    // Charger uniquement les composants essentiels
}
```

## Informations systeme

Le `SystemController` affiche une page recapitulative de l'environnement :

| Information | Exemple |
|-------------|---------|
| Version PHP | 8.3.12 |
| Version Laravel | 11.x |
| Version ArtisanCMS | 1.2.0 |
| Base de donnees | MySQL 8.0.36 |
| Driver de cache | Redis |
| Driver de queue | Database |
| Driver de session | File |
| Espace disque | 12.4 Go disponibles |
| Memoire PHP | 256 Mo (limite) |

Ces informations sont utiles pour le support technique et le diagnostic de problemes.

## Gestion du cache

La commande `CmsCacheClearCommand` permet de vider les differents caches du CMS :

```bash
# Vider tous les caches du CMS
php artisan cms:cache-clear

# Vider un cache specifique
php artisan cms:cache-clear --type=views
php artisan cms:cache-clear --type=settings
php artisan cms:cache-clear --type=routes
```

Les types de cache disponibles :

| Type | Description |
|------|-------------|
| `views` | Cache des vues Blade compilees |
| `settings` | Cache des parametres du site |
| `routes` | Cache des routes |
| `config` | Cache de la configuration |
| `pages` | Cache des pages rendues |

Un bouton "Vider le cache" est egalement disponible dans l'interface d'administration pour les utilisateurs non techniques.

## Visionneuse de logs

L'interface d'administration inclut une visionneuse de logs qui permet de consulter les fichiers de log Laravel directement depuis le navigateur :

- Filtrage par niveau de log (debug, info, warning, error, critical)
- Recherche par mot-cle dans les messages
- Affichage des stack traces pour les erreurs
- Telechargement des fichiers de log

:::caution[Attention]
Les logs peuvent contenir des informations sensibles. L'acces a la visionneuse de logs est restreint aux utilisateurs disposant de la permission `system.view`.
:::
