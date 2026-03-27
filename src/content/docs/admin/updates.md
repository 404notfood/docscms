---
title: Mises a jour
description: Systeme de mises a jour d'ArtisanCMS - mise a jour du coeur, des plugins et des themes, strategies de mise a jour et automatisation.
---

ArtisanCMS integre un systeme de mises a jour centralise pour le coeur du CMS, les plugins et les themes. Les mises a jour peuvent etre effectuees depuis l'interface d'administration ou via des commandes Artisan.

## Architecture

Le systeme repose sur les composants suivants :

- **`Admin\UpdateController`** : interface d'administration pour visualiser et appliquer les mises a jour.
- **`UpdateService`** : logique de verification, de telechargement et d'application des mises a jour.

```php
Route::get('updates', [UpdateController::class, 'index']);
Route::post('updates/core', [UpdateController::class, 'updateCore']);
Route::post('updates/plugin/{plugin}', [UpdateController::class, 'updatePlugin']);
Route::post('updates/theme/{theme}', [UpdateController::class, 'updateTheme']);
```

## Types de mises a jour

### Coeur du CMS

Les mises a jour du coeur incluent les corrections de securite, les corrections de bugs et les nouvelles fonctionnalites. Le `UpdateService` compare la version installee avec la derniere version disponible sur le serveur de mises a jour.

### Plugins

Chaque plugin declare sa version dans son fichier de manifeste. Le systeme verifie les nouvelles versions disponibles et permet une mise a jour individuelle ou groupee.

### Themes

Les themes suivent le meme mecanisme que les plugins : verification de version, telechargement du paquet et remplacement des fichiers.

## Strategie de mise a jour

La strategie de mise a jour est configurable dans `config/cms.php` :

```php
// config/cms.php
'updates' => [
    'strategy' => 'minor', // 'disabled', 'minor', 'all'
],
```

| Strategie | Comportement |
|-----------|-------------|
| `disabled` | Aucune verification automatique, mises a jour manuelles uniquement |
| `minor` | Seules les mises a jour mineures et les correctifs sont proposes |
| `all` | Toutes les mises a jour sont proposees, y compris les versions majeures |

## Mise a jour automatique

Les plugins et les themes peuvent etre configures pour se mettre a jour automatiquement :

```php
'auto_update' => [
    'plugins' => true,   // Active la mise a jour automatique des plugins
    'themes'  => false,  // Desactivee par defaut pour les themes
],
```

Lorsque la mise a jour automatique est activee, le systeme applique les mises a jour disponibles lors de l'execution de la commande `AutoUpdate`.

## Commandes Artisan

### Verification des mises a jour

La commande `CheckUpdates` interroge le serveur de mises a jour et affiche les versions disponibles :

```bash
php artisan cms:check-updates
```

Sortie typique :

```
+------------------+----------+-----------+
| Composant        | Actuelle | Disponible|
+------------------+----------+-----------+
| ArtisanCMS Core  | 1.2.0    | 1.2.1     |
| Plugin: SEO Pro  | 2.0.0    | 2.1.0     |
| Theme: Starter   | 1.0.0    | 1.0.0     |
+------------------+----------+-----------+
```

### Mise a jour automatisee

La commande `AutoUpdate` applique les mises a jour disponibles selon la strategie configuree :

```bash
php artisan cms:auto-update
```

Cette commande peut etre planifiee via le scheduler Laravel pour une automatisation complete :

```php
// App\Console\Kernel
$schedule->command('cms:auto-update')->daily();
```

## Interface d'administration

Le panneau de mises a jour dans l'administration affiche :

- La version actuelle du CMS, de chaque plugin et de chaque theme
- Les mises a jour disponibles avec le numero de version et les notes de version
- Un bouton de mise a jour individuelle pour chaque composant
- Un bouton "Tout mettre a jour" pour appliquer l'ensemble des mises a jour en une seule operation

### Processus de mise a jour

Lorsqu'une mise a jour est lancee, le systeme :

1. Cree une sauvegarde des fichiers concernes
2. Telecharge le nouveau paquet depuis le serveur de mises a jour
3. Verifie l'integrite du paquet (checksum)
4. Remplace les fichiers existants
5. Execute les migrations de base de donnees si necessaire
6. Vide les caches

En cas d'erreur, le systeme restaure automatiquement la sauvegarde pour eviter toute interruption de service.

:::caution[Attention]
Il est recommande de sauvegarder votre site avant toute mise a jour majeure. Utilisez la fonctionnalite [Import / Export](/admin/import-export/) pour creer une sauvegarde complete.
:::
