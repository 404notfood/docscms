---
title: Import / Export
description: Fonctionnalites d'import et d'export d'ArtisanCMS - sauvegarde JSON, migration WordPress WXR et transfert entre environnements.
---

ArtisanCMS propose un systeme d'import/export pour sauvegarder le contenu, migrer entre environnements ou importer des donnees depuis WordPress.

## Architecture

Le systeme repose sur deux composants principaux :

- **`Admin\ImportExportController`** : interface d'administration pour lancer les operations d'import et d'export.
- **`ImportExportService`** : logique metier de serialisation, deserialization et transformation des donnees.

```php
Route::get('import-export', [ImportExportController::class, 'index']);
Route::post('export', [ImportExportController::class, 'export']);
Route::post('import', [ImportExportController::class, 'import']);
```

## Formats supportes

### Export JSON (format natif)

Le format JSON natif est le format principal d'ArtisanCMS. Il produit un fichier complet et structutre contenant l'ensemble des donnees selectionnees.

### Export WordPress WXR

Le format WXR (WordPress eXtended RSS) permet de generer un fichier compatible avec les outils d'import WordPress, facilitant une eventuelle migration vers WordPress.

### Import JSON

L'import JSON restaure les donnees a partir d'un fichier precedemment exporte au format natif. Le service gere la correspondance des identifiants et la resolution des references entre les entites.

### Import WordPress WXR

L'import WXR permet de migrer un site WordPress vers ArtisanCMS. Le service transforme automatiquement :

- Les articles WordPress en articles ArtisanCMS
- Les pages WordPress en pages ArtisanCMS
- Les categories et tags en taxonomies
- Les menus de navigation
- Les references aux medias (les fichiers doivent etre transferes separement)

## Contenu exportable

L'export permet de selectionner les types de donnees a inclure :

| Type de donnees | Description |
|-----------------|-------------|
| **Pages** | Toutes les pages avec leur hierarchie et leurs metadonnees SEO |
| **Articles** | Articles avec auteur, date de publication et statut |
| **Medias** | References aux fichiers medias (chemins et metadonnees) |
| **Menus** | Structure des menus de navigation et elements associes |
| **Parametres** | Configuration du site (hors valeurs chiffrees) |
| **Taxonomies** | Categories, tags et termes personnalises |

### Export selectif

L'interface d'administration presente des cases a cocher pour chaque type de donnees. L'administrateur choisit ce qu'il souhaite inclure dans l'export.

```php
// Exemple de requete d'export selective
$exportData = $importExportService->export([
    'pages'      => true,
    'posts'      => true,
    'media'      => false,
    'menus'      => true,
    'settings'   => false,
    'taxonomies' => true,
]);
```

## Structure du fichier JSON

Le fichier JSON exporte respecte une structure claire :

```json
{
    "version": "1.0",
    "cms_version": "1.2.0",
    "exported_at": "2026-03-27T10:00:00Z",
    "site": {
        "name": "Mon Site",
        "locale": "fr"
    },
    "pages": [],
    "posts": [],
    "menus": [],
    "taxonomies": []
}
```

Le champ `version` identifie le format du fichier et permet de gerer la retrocompatibilite lors des futures evolutions.

## Cas d'utilisation

### Migration entre environnements

Exportez le contenu depuis l'environnement de production et importez-le en preprod ou en local pour travailler avec des donnees reelles.

### Sauvegarde manuelle

Generez un export JSON complet comme sauvegarde ponctuelle du contenu du site, en complement des sauvegardes automatiques de la base de donnees.

### Migration depuis WordPress

Utilisez l'import WXR pour migrer un site WordPress existant vers ArtisanCMS. Les etapes recommandees sont :

1. Exportez le contenu depuis WordPress (Outils > Exporter).
2. Transferez les fichiers medias dans le repertoire `storage/app/public/media` d'ArtisanCMS.
3. Importez le fichier WXR depuis l'interface d'administration d'ArtisanCMS.
4. Verifiez le contenu importe et ajustez la mise en forme si necessaire.

:::note
Lors d'un import WordPress, le contenu HTML est conserve tel quel. Pour exploiter le Page Builder, une conversion manuelle des pages est recommandee.
:::
