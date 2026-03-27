---
title: Types de contenu personnalisés
description: Création et gestion de types de contenu personnalisés (CPT) dans ArtisanCMS pour structurer vos données sur mesure.
---

Les types de contenu personnalisés (Custom Post Types) permettent d'étendre ArtisanCMS au-dela des pages et articles standard. Vous pouvez créer des structures de données adaptées à vos besoins : témoignages, membres d'équipe, produits, portfolios, etc.

## Architecture

Le système repose sur deux modèles principaux :

- **ContentType** : définit la structure d'un type de contenu (le "moule")
- **ContentEntry** : représente une entrée individuelle d'un type donné (le "contenu")

```php
// Un ContentType "Témoignage" contient plusieurs ContentEntry
$type = ContentType::where('slug', 'temoignages')->first();
$entries = $type->entries; // Collection de ContentEntry
```

## Modèle ContentType

Le modèle `ContentType` (`App\Models\ContentType`) définit les propriétés d'un type de contenu :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Nom affiché (ex: "Témoignages") |
| `slug` | `string` | Identifiant unique (ex: "temoignages") |
| `icon` | `string` | Icone affichée dans le menu admin |
| `description` | `text` | Description du type de contenu |
| `fields` | `json` | Configuration des champs personnalisés |
| `has_archive` | `boolean` | Active une page d'archive publique |
| `is_active` | `boolean` | Active/désactive le type |

## Créer un type de contenu

### Via l'interface d'administration

Le CPT Builder est accessible dans l'administration via `Admin\ContentTypeController`. L'interface permet de :

1. Définir le nom, le slug et l'icone
2. Rédiger une description
3. Configurer les champs associés
4. Activer ou désactiver la page d'archive

### Résultat

Une fois créé, le type de contenu apparait automatiquement dans le menu latéral de l'administration avec son icone dédiée.

## Modèle ContentEntry

Chaque entrée de contenu (`App\Models\ContentEntry`) est liée à un `ContentType` :

```php
class ContentEntry extends Model
{
    use HasContentFeatures; // Révisions, taxonomies, champs personnalisés
    use HasSiteScope;       // Filtrage multi-site
    use SoftDeletes;
}
```

### Champs principaux

| Champ | Type | Description |
|-------|------|-------------|
| `content_type_id` | `integer` | Référence vers le ContentType |
| `title` | `string` | Titre de l'entrée |
| `slug` | `string` | Identifiant URL unique |
| `content` | `json` | Contenu structuré |
| `status` | `string` | Statut de publication |
| `featured_image` | `string` | Image mise en avant |
| `order` | `integer` | Ordre d'affichage |

## Gestion des entrées

Le `Admin\ContentEntryController` gère les opérations CRUD pour les entrées de chaque type :

```php
// Routes générées dynamiquement par type
Route::resource('content-entries/{contentType}', ContentEntryController::class);
```

L'interface d'édition s'adapte automatiquement aux champs définis dans le ContentType.

## Cas d'utilisation courants

### Témoignages

```
Nom : Témoignages
Slug : temoignages
Champs : auteur (text), poste (text), entreprise (text), note (number), photo (image)
```

### Membres d'équipe

```
Nom : Équipe
Slug : equipe
Champs : poste (text), bio (wysiwyg), photo (image), linkedin (url), email (email)
```

### Portfolio

```
Nom : Portfolio
Slug : portfolio
Champs : client (text), date_projet (date), url_projet (url), galerie (repeater > image)
```

### FAQ

```
Nom : FAQ
Slug : faq
Champs : question (text), reponse (wysiwyg), categorie (select)
```

## Taxonomies et champs personnalisés

Grace au trait `HasContentFeatures`, chaque entrée de contenu bénéficie :

- Du système de [taxonomies](/content/taxonomies/) pour la catégorisation
- Des [champs personnalisés](/content/custom-fields/) pour les données additionnelles
- De l'[historique de révisions](/content/revisions/) pour le suivi des modifications

## Affichage public

Les entrées de types de contenu personnalisés sont accessibles publiquement si l'option `has_archive` est activée. Le rendu utilise les templates Blade correspondants ou un template par défaut.
