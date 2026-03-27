---
title: Médias
description: Gestion des médias dans ArtisanCMS - upload, optimisation d'images, dossiers virtuels, photos de stock et suivi d'utilisation.
---

Le gestionnaire de médias d'ArtisanCMS offre une solution complète pour l'upload, l'organisation et l'optimisation de vos fichiers. Il inclut la conversion WebP automatique, la génération d'images responsives et l'intégration de banques d'images.

## Modèle Media

Le modèle `Media` (`App\Models\Media`) représente un fichier uploadé :

| Champ | Type | Description |
|-------|------|-------------|
| `filename` | `string` | Nom du fichier sur le disque |
| `original_name` | `string` | Nom original lors de l'upload |
| `mime_type` | `string` | Type MIME validé |
| `size` | `integer` | Taille en octets |
| `path` | `string` | Chemin relatif sur le disque |
| `alt` | `string` | Texte alternatif (accessibilité) |
| `title` | `string` | Titre du média |
| `folder_id` | `integer` | Dossier virtuel parent |
| `metadata` | `json` | Dimensions, durée, etc. |

## Upload et validation

### Validation par type MIME

ArtisanCMS valide les fichiers par leur type MIME réel (analyse du contenu binaire), et non par l'extension du fichier. Cela empêche l'upload de fichiers malveillants renommés :

```php
// config/cms.php - Types MIME autorisés
'allowed_mime_types' => [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    'application/pdf',
    'video/mp4', 'video/webm',
    'audio/mpeg', 'audio/wav',
],

'max_upload_size' => 10240, // 10 Mo par défaut (en Ko)
```

### Contrôleur et service

L'upload est géré par `Admin\MediaController` qui délègue au `MediaService` :

```php
// Route d'upload
Route::post('media/upload', [MediaController::class, 'store']);
```

Le `MediaService` se charge de la validation, du stockage et du déclenchement de l'optimisation.

## Optimisation des images

### Conversion WebP

Toutes les images uploadées (JPEG, PNG) sont automatiquement converties en format WebP pour réduire leur poids sans perte visible de qualité.

### Images responsives (srcset)

L'`ImageOptimizer` génère plusieurs tailles pour chaque image :

| Taille | Largeur | Utilisation |
|--------|---------|-------------|
| `thumbnail` | 150px | Vignettes admin |
| `small` | 300px | Miniatures |
| `medium` | 768px | Contenu mobile |
| `large` | 1200px | Contenu desktop |
| `full` | Originale | Haute résolution |

Les balises `<img>` générées incluent automatiquement l'attribut `srcset` pour un chargement adaptatif.

### Suppression des données EXIF

Pour protéger la vie privée des utilisateurs, les métadonnées EXIF (localisation GPS, modèle d'appareil photo, etc.) sont automatiquement supprimées lors de l'upload.

## Dossiers virtuels

Le `MediaFolderService` permet d'organiser les médias en dossiers sans modifier la structure de fichiers sur le disque :

```php
class MediaFolderService
{
    public function createFolder(string $name, ?int $parentId = null): MediaFolder;
    public function moveMedia(Media $media, int $folderId): void;
    public function deleteFolder(int $folderId): bool;
    public function getFolderTree(): Collection;
}
```

L'interface d'administration offre un explorateur de fichiers avec drag-and-drop pour déplacer les médias entre dossiers.

## Photos de stock

### Intégration Unsplash et Pexels

Le `StockPhotoService` permet de rechercher et importer des photos libres de droits directement depuis l'interface de gestion des médias :

```php
class StockPhotoService
{
    public function search(string $query, string $provider = 'unsplash'): Collection;
    public function import(string $photoId, string $provider): Media;
}
```

Les clés API sont configurées dans le fichier `.env` :

```bash
UNSPLASH_ACCESS_KEY=votre_cle_unsplash
PEXELS_API_KEY=votre_cle_pexels
```

## Suivi d'utilisation

### MediaUsage

Le modèle `MediaUsage` suit ou chaque média est utilisé dans le contenu :

```php
// Savoir ou un média est utilisé
$usages = $media->usages; // Pages, articles, entrées qui utilisent ce média
```

Cela permet d'afficher un avertissement lorsqu'un utilisateur tente de supprimer un média encore utilisé.

### Détection de médias orphelins

Le `OrphanMediaDetectorService` identifie les médias qui ne sont plus référencés par aucun contenu :

```php
class OrphanMediaDetectorService
{
    public function detect(): Collection;  // Liste des médias orphelins
    public function cleanup(): int;        // Supprime et retourne le nombre supprimé
}
```

Cette fonctionnalité aide a maintenir un espace de stockage propre en éliminant les fichiers inutilisés.

## Configuration

Les paramètres du gestionnaire de médias se trouvent dans `config/cms.php` :

```php
return [
    'media' => [
        'disk' => 'public',
        'max_upload_size' => 10240,        // 10 Mo
        'allowed_mime_types' => [...],
        'image_sizes' => [
            'thumbnail' => ['width' => 150, 'height' => 150, 'crop' => true],
            'small' => ['width' => 300, 'height' => null],
            'medium' => ['width' => 768, 'height' => null],
            'large' => ['width' => 1200, 'height' => null],
        ],
        'webp_quality' => 80,
        'strip_exif' => true,
    ],
];
```
