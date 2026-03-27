---
title: Champs personnalisés
description: Système de champs personnalisés d'ArtisanCMS - types de champs, groupes, validation et affichage dynamique.
---

Les champs personnalisés permettent d'ajouter des métadonnées structurées à vos contenus sans modifier la base de données. ArtisanCMS propose plus de 15 types de champs organisés en groupes assignables aux différents types de contenu.

## Architecture

Le système repose sur trois modèles :

- **CustomFieldGroup** : regroupe les champs et les assigne à un type de contenu
- **CustomField** : définit un champ individuel (type, validation, options)
- **CustomFieldValue** : stocke la valeur d'un champ pour un contenu donné

```
CustomFieldGroup (ex: "Informations produit")
├── CustomField (ex: "Prix", type: number)
├── CustomField (ex: "Référence", type: text)
└── CustomField (ex: "En stock", type: checkbox)
    └── CustomFieldValue (valeur pour chaque page/article/entrée)
```

## Types de champs disponibles

ArtisanCMS propose les types de champs suivants :

| Type | Description | Exemple de valeur |
|------|-------------|-------------------|
| `text` | Champ texte court | "Référence ABC-123" |
| `textarea` | Zone de texte multiligne | Description longue |
| `number` | Valeur numérique | 42, 3.14 |
| `email` | Adresse email validée | "contact@example.com" |
| `url` | URL validée | "https://example.com" |
| `select` | Liste déroulante | Choix parmi des options |
| `checkbox` | Case a cocher (booléen) | true / false |
| `radio` | Boutons radio | Choix unique parmi des options |
| `date` | Sélecteur de date | "2026-04-15" |
| `datetime` | Date et heure | "2026-04-15 14:30:00" |
| `color` | Sélecteur de couleur | "#FF5733" |
| `image` | Sélecteur d'image (média) | Référence vers un média |
| `file` | Sélecteur de fichier | Référence vers un fichier |
| `wysiwyg` | Éditeur de texte riche | Contenu HTML |
| `repeater` | Groupe de sous-champs répétable | Liste de valeurs structurées |

## Groupes de champs

Les champs sont organisés en groupes via le modèle `CustomFieldGroup` :

```php
// Structure d'un groupe de champs
$group = CustomFieldGroup::create([
    'name' => 'Détails du produit',
    'slug' => 'details-produit',
    'content_type' => 'page',    // Type de contenu cible
    'position' => 'sidebar',      // Position dans l'interface admin
    'order' => 1,
]);
```

### Assignation aux types de contenu

Un groupe de champs peut etre assigné a :

- **Pages** : toutes les pages ou un template spécifique
- **Articles** : tous les articles ou une catégorie spécifique
- **Entrées de contenu** : un type de contenu personnalisé spécifique

## Valeurs polymorphiques

Le modèle `CustomFieldValue` utilise une relation polymorphique pour s'attacher à n'importe quel type de contenu :

```php
class CustomFieldValue extends Model
{
    public function valuable(): MorphTo
    {
        return $this->morphTo(); // Page, Post ou ContentEntry
    }
}
```

Cela permet de réutiliser le meme système de champs pour tous les contenus sans tables supplémentaires.

## Validation

Chaque champ peut définir des règles de validation Laravel :

```php
$field = CustomField::create([
    'name' => 'Prix',
    'slug' => 'prix',
    'type' => 'number',
    'validation' => 'required|numeric|min:0|max:99999',
    'default_value' => '0',
]);
```

Les règles de validation sont appliquées cote serveur lors de la sauvegarde et cote client pour une expérience utilisateur fluide.

## Administration

Le `Admin\CustomFieldController` fournit l'interface de gestion :

- Création et édition de groupes de champs
- Ajout, suppression et réorganisation des champs dans un groupe
- Configuration des options pour les champs de type select, radio et checkbox
- Définition des règles de validation
- Prévisualisation du rendu

## Champ Repeater

Le type `repeater` permet de créer des groupes de sous-champs répétables. C'est utile pour des données structurées comme une galerie, une liste de liens ou un tableau de prix :

```
Repeater "Galerie"
├── image (type: image)
├── legende (type: text)
└── lien (type: url)
```

L'utilisateur peut ajouter, supprimer et réordonner les entrées du repeater dans l'interface d'administration.

## Affichage dans le Page Builder

Les valeurs des champs personnalisés sont accessibles dans le Page Builder via le système de contenu dynamique. Cela permet d'insérer des données de champs personnalisés directement dans les blocs du builder sans code personnalisé.

## Récupérer les valeurs

Dans un template Blade ou un contrôleur, les valeurs sont accessibles via la relation :

```php
// Récupérer la valeur d'un champ personnalisé
$prix = $page->customFieldValues()
    ->whereHas('customField', fn($q) => $q->where('slug', 'prix'))
    ->first()
    ->value;
```
