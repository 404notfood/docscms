---
title: Taxonomies
description: Système de taxonomies d'ArtisanCMS - catégories, tags et taxonomies personnalisées pour organiser vos contenus.
---

Les taxonomies permettent de classer et organiser vos contenus selon différents critères. ArtisanCMS propose un système flexible supportant les catégories hiérarchiques, les tags plats et les taxonomies personnalisées.

## Architecture

Le système de taxonomies repose sur deux modèles principaux :

- **Taxonomy** : définit un type de classement (ex: "Catégories", "Tags")
- **TaxonomyTerm** : représente un terme individuel au sein d'une taxonomie (ex: "Tutoriels", "Laravel")

```php
// Exemple de structure
$taxonomy = Taxonomy::where('slug', 'categories')->first();
$terms = $taxonomy->terms; // Collection de TaxonomyTerm
```

## Modèle Taxonomy

Le modèle `Taxonomy` (`App\Models\Taxonomy`) définit un type de classement :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Nom de la taxonomie (ex: "Catégories") |
| `slug` | `string` | Identifiant unique |
| `description` | `text` | Description de la taxonomie |
| `is_hierarchical` | `boolean` | Support de la hiérarchie parent-enfant |
| `content_types` | `json` | Types de contenu associés |

### Taxonomies par défaut

ArtisanCMS crée automatiquement deux taxonomies lors de l'installation :

- **Catégories** (`categories`) : taxonomie hiérarchique pour la classification principale
- **Tags** (`tags`) : taxonomie plate pour le marquage transversal

## Modèle TaxonomyTerm

Chaque terme (`App\Models\TaxonomyTerm`) appartient à une taxonomie :

| Champ | Type | Description |
|-------|------|-------------|
| `taxonomy_id` | `integer` | Référence vers la taxonomie parente |
| `name` | `string` | Nom du terme |
| `slug` | `string` | Identifiant URL |
| `description` | `text` | Description du terme |
| `parent_id` | `integer` | Terme parent (taxonomies hiérarchiques) |
| `order` | `integer` | Ordre d'affichage |

### Hiérarchie des catégories

Les taxonomies hiérarchiques supportent des termes imbriqués :

```
Développement web
├── Frontend
│   ├── React
│   └── Vue.js
└── Backend
    ├── Laravel
    └── Node.js
```

## Relation polymorphique

L'association entre les termes et les contenus utilise une table pivot polymorphique `cms_termables` :

```php
// Table cms_termables
Schema::create('cms_termables', function (Blueprint $table) {
    $table->id();
    $table->foreignId('taxonomy_term_id');
    $table->morphs('termable'); // termable_id + termable_type
});
```

Cette approche permet d'associer les memes termes à des pages, articles et entrées de contenu personnalisées sans tables de jonction supplémentaires.

## Utilisation avec les contenus

### Associer des termes

```php
// Associer des catégories à un article
$post->taxonomyTerms()->attach([$termId1, $termId2]);

// Remplacer toutes les catégories
$post->taxonomyTerms()->sync([$termId1, $termId3]);
```

### Requeter par terme

```php
// Articles d'une catégorie spécifique
$posts = Post::whereHas('taxonomyTerms', function ($query) {
    $query->where('slug', 'tutoriels');
})->published()->get();
```

## Types de contenu supportés

Les taxonomies sont utilisables avec :

- **Pages** : classement thématique des pages
- **Articles** : catégories et tags de blog
- **Entrées de contenu** : classification des types personnalisés

Le trait `HasContentFeatures` fournit automatiquement la relation `taxonomyTerms()` à tous ces modèles.

## Administration

Le `Admin\TaxonomyController` gère l'ensemble des opérations CRUD :

- Création et édition de taxonomies
- Gestion des termes (ajout, suppression, réorganisation)
- Interface drag-and-drop pour l'arborescence des catégories
- Assignation aux types de contenu

## TaxonomyService

Le `TaxonomyService` encapsule la logique métier :

```php
class TaxonomyService
{
    public function createTerm(Taxonomy $taxonomy, array $data): TaxonomyTerm;
    public function updateTerm(TaxonomyTerm $term, array $data): TaxonomyTerm;
    public function deleteTerm(TaxonomyTerm $term): bool;
    public function reorderTerms(array $order): void;
    public function getTermTree(Taxonomy $taxonomy): Collection;
}
```

Ce service est utilisé par le contrôleur et peut etre injecté dans vos propres plugins ou extensions.

## Créer une taxonomie personnalisée

Pour ajouter une taxonomie adaptée à vos besoins (ex: "Niveaux de difficulté" pour des tutoriels) :

1. Accédez à la section Taxonomies dans l'administration
2. Cliquez sur "Nouvelle taxonomie"
3. Définissez le nom, le slug et le type (hiérarchique ou plate)
4. Assignez-la aux types de contenu souhaités
5. Ajoutez vos termes
