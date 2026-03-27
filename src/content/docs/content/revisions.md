---
title: Révisions
description: Système de révisions d'ArtisanCMS - historique des modifications, comparaison de versions et restauration de contenu.
---

Le système de révisions d'ArtisanCMS conserve un historique complet de chaque modification apportée à vos contenus. Il permet de comparer les versions, de visualiser les différences et de restaurer un contenu antérieur en un clic.

## Modèle Revision

Le modèle `Revision` (`App\Models\Revision`) utilise une relation polymorphique pour s'attacher à n'importe quel type de contenu :

| Champ | Type | Description |
|-------|------|-------------|
| `revisionable_type` | `string` | Type du modèle (Page, Post, ContentEntry) |
| `revisionable_id` | `integer` | ID du contenu associé |
| `user_id` | `integer` | Utilisateur ayant effectué la modification |
| `data` | `json` | Snapshot complet du contenu |
| `version` | `integer` | Numéro de version incrémental |
| `created_at` | `datetime` | Date de la modification |

### Relation polymorphique

```php
class Revision extends Model
{
    public function revisionable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
```

## Création automatique

Les révisions sont créées automatiquement à chaque sauvegarde de contenu, sans intervention de l'utilisateur. Ce comportement est fourni par le trait `HasContentFeatures` :

```php
trait HasContentFeatures
{
    public static function bootHasContentFeatures(): void
    {
        static::saving(function ($model) {
            if ($model->exists && $model->isDirty()) {
                $model->createRevision();
            }
        });
    }

    public function revisions(): MorphMany
    {
        return $this->morphMany(Revision::class, 'revisionable')
            ->orderByDesc('version');
    }

    public function createRevision(): Revision
    {
        return $this->revisions()->create([
            'user_id' => auth()->id(),
            'data' => $this->getOriginal(),
            'version' => $this->revisions()->count() + 1,
        ]);
    }
}
```

Ce trait est partagé par les modèles `Page`, `Post` et `ContentEntry`.

## Stockage

Chaque révision stocke un snapshot JSON complet du contenu au moment de la sauvegarde. Cela inclut :

- Le titre et le slug
- Le contenu intégral (arbre de blocs du Page Builder)
- L'extrait
- Les champs SEO (meta_title, meta_description, meta_keywords)
- Le statut de publication
- L'image mise en avant

Cette approche garantit qu'aucune donnée n'est perdue, meme si la structure des champs évolue dans le temps.

## Comparaison de versions

L'interface d'administration permet de comparer deux révisions cote à cote pour visualiser les différences :

### Diff textuel

Les modifications de texte sont affichées avec un code couleur :

- **Vert** : contenu ajouté
- **Rouge** : contenu supprimé
- **Jaune** : contenu modifié

### Diff structurel

Pour le contenu du Page Builder (JSON), le système compare l'arbre de blocs et signale :

- Les blocs ajoutés
- Les blocs supprimés
- Les blocs dont le contenu a été modifié

## Restauration

Pour restaurer une version antérieure :

1. Accédez à l'onglet "Révisions" de la page ou de l'article
2. Parcourez l'historique des versions
3. Sélectionnez la version à restaurer
4. Confirmez la restauration

La restauration crée une nouvelle révision avec le contenu de la version choisie. Le contenu actuel n'est donc jamais perdu : il reste disponible dans l'historique.

```php
// Restaurer une révision par programmation
$revision = $page->revisions()->where('version', 5)->first();
$page->update($revision->data);
// Une nouvelle révision (version N+1) est automatiquement créée
```

## Contenus supportés

Le système de révisions fonctionne avec tous les modèles utilisant le trait `HasContentFeatures` :

| Modèle | Description |
|--------|-------------|
| `Page` | Pages du site |
| `Post` | Articles de blog |
| `ContentEntry` | Entrées de types personnalisés |

## Performances

Pour éviter une croissance excessive de la base de données, il est possible de configurer une limite de révisions par contenu :

```php
// config/cms.php
'revisions' => [
    'enabled' => true,
    'max_per_content' => 50, // Conserver les 50 dernières révisions
],
```

Lorsque la limite est atteinte, les révisions les plus anciennes sont automatiquement purgées.

## Interface d'administration

L'historique des révisions est accessible depuis l'éditeur de chaque contenu via un onglet dédié. Il affiche :

- La liste chronologique des versions avec auteur et date
- Un bouton de comparaison entre deux versions sélectionnées
- Un bouton de restauration pour chaque version
- Un aperçu rapide des modifications apportées
