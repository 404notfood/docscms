---
title: Articles de blog
description: Gestion des articles de blog dans ArtisanCMS - publication, catégories, commentaires et flux RSS.
---

Les articles de blog permettent de publier du contenu éditorial organisé par catégories et tags. ArtisanCMS offre un système de blog complet avec pagination, commentaires et génération de flux RSS.

## Modèle Post

Le modèle `Post` (`App\Models\Post`) partage de nombreuses fonctionnalités avec le modèle Page grâce aux traits communs :

```php
class Post extends Model
{
    use HasContentFeatures; // Révisions, taxonomies, champs personnalisés
    use HasSiteScope;       // Filtrage multi-site automatique
    use SoftDeletes;        // Corbeille
}
```

### Champs principaux

| Champ | Type | Description |
|-------|------|-------------|
| `title` | `string` | Titre de l'article |
| `slug` | `string` | Identifiant URL unique |
| `content` | `json` | Contenu structuré (arbre de blocs) |
| `excerpt` | `text` | Extrait affiché dans les listes |
| `featured_image` | `string` | Image mise en avant |
| `status` | `string` | Statut de publication |
| `comment_status` | `boolean` | Active/désactive les commentaires |
| `publish_at` | `datetime` | Date de publication programmée |
| `author_id` | `integer` | Auteur de l'article |

## Affichage public

Le `Front\BlogController` gère l'affichage du blog cote visiteur :

```php
// Routes publiques du blog
Route::get('/blog', [BlogController::class, 'index']);       // Liste paginée
Route::get('/blog/{slug}', [BlogController::class, 'show']); // Article unique
```

### Pagination et filtrage

La liste des articles supporte :

- **Pagination** : nombre d'articles par page configurable dans les paramètres
- **Filtrage par catégorie** : `/blog?category=tutoriels`
- **Filtrage par tag** : `/blog?tag=laravel`
- **Recherche** : filtrage par mots-clés dans le titre et le contenu

## Image mise en avant

Chaque article peut avoir une image mise en avant qui sera affichée :

- En haut de l'article (vue détaillée)
- Comme vignette dans la liste du blog
- Dans les balises Open Graph pour le partage sur les réseaux sociaux

L'image est automatiquement optimisée en WebP avec des variantes responsives (voir la section [Médias](/content/media/)).

## Catégories et tags

Les articles utilisent le système de [taxonomies](/content/taxonomies/) pour leur organisation :

- **Catégories** : taxonomie hiérarchique pour la classification principale
- **Tags** : taxonomie plate pour le marquage transversal

```php
// Récupérer les articles d'une catégorie
$posts = Post::whereHas('taxonomyTerms', function ($query) {
    $query->where('slug', 'tutoriels');
})->published()->paginate(12);
```

## Système de commentaires

Les commentaires peuvent etre activés ou désactivés individuellement sur chaque article via le champ `comment_status` :

```php
$post->comment_status = true;  // Commentaires ouverts
$post->comment_status = false; // Commentaires fermés
```

Consultez la section [Commentaires](/content/comments/) pour le détail du système de modération.

## Flux RSS

Le `Front\RssController` génère automatiquement un flux RSS pour le blog :

```php
Route::get('/rss', [RssController::class, 'index']);
```

Le flux inclut les derniers articles publiés avec leur titre, extrait, auteur et date de publication. Le format respecte la spécification RSS 2.0.

## Administration

La gestion des articles en back-office passe par `Admin\PostController` :

### Création et édition

L'interface d'administration offre :

- Un éditeur basé sur le Page Builder pour le contenu
- La sélection de catégories et tags
- Le choix de l'image mise en avant via le gestionnaire de médias
- Les champs SEO (meta title, meta description)
- La planification de publication
- L'activation/désactivation des commentaires

### Workflow de publication

Les articles suivent le meme workflow que les pages :

| Statut | Description |
|--------|-------------|
| `draft` | Brouillon en cours de rédaction |
| `review` | Soumis pour relecture |
| `approved` | Validé par un relecteur |
| `published` | Publié et visible sur le blog |

## Révisions et champs personnalisés

Grace au trait `HasContentFeatures`, chaque article bénéficie automatiquement :

- D'un **historique de révisions** complet permettant de revenir à une version antérieure
- De **champs personnalisés** pour ajouter des métadonnées supplémentaires (source, auteur invité, etc.)

## SEO

Les articles disposent des champs SEO standard :

- `meta_title` : titre optimisé pour les moteurs de recherche
- `meta_description` : description pour les résultats de recherche
- `meta_keywords` : mots-clés associés

Les balises Open Graph et Twitter Card sont générées automatiquement pour un partage optimal sur les réseaux sociaux.
