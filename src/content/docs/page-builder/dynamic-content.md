---
title: "Contenu dynamique"
description: "Liez les propriétés des blocs du Page Builder à des sources de données dynamiques : paramètres du site, champs de page, champs personnalisés et données utilisateur."
---

Le système de contenu dynamique permet de lier les propriétés des blocs du Page Builder à des sources de données externes. Au lieu de saisir une valeur fixe, il est possible de référencer une donnée qui sera résolue automatiquement lors du rendu de la page.

## Principe de fonctionnement

Le contenu dynamique repose sur un mécanisme de **placeholders** (espaces réservés) insérés dans les propriétés des blocs. Au moment du rendu de la page, le `DynamicContentService` parcourt l'arbre de blocs, détecte les placeholders et les remplace par les valeurs correspondantes issues des sources de données configurées.

Ce processus est transparent pour le visiteur : la page affiche les valeurs résolues comme si elles avaient été saisies manuellement.

## DynamicContentService

Le service `DynamicContentService` est le composant central du système de contenu dynamique. Il assure les responsabilités suivantes :

| Responsabilité | Description |
|---|---|
| **Résolution des placeholders** | Parcourt l'arbre de blocs et remplace chaque placeholder par sa valeur. |
| **Gestion des sources** | Enregistre et interroge les sources de données disponibles. |
| **Cache** | Met en cache les valeurs résolues pour optimiser les performances. |
| **Valeurs par défaut** | Fournit une valeur de repli lorsqu'une source de données est indisponible. |
| **Validation** | Vérifie la syntaxe des placeholders et la disponibilité des sources. |

### Cycle de résolution

Le cycle de résolution se déroule en quatre étapes :

1. **Extraction** : le service parcourt les propriétés des blocs et identifie les placeholders.
2. **Regroupement** : les placeholders sont regroupés par source de données pour minimiser les requêtes.
3. **Résolution** : chaque source de données est interrogée pour obtenir les valeurs correspondantes.
4. **Injection** : les valeurs résolues remplacent les placeholders dans l'arbre de blocs.

## Sources de données

Le système de contenu dynamique prend en charge quatre types de sources de données.

### Paramètres du site

Les paramètres globaux du site sont accessibles en tant que source de données dynamique :

| Placeholder | Valeur retournée |
|---|---|
| `{{site.name}}` | Nom du site |
| `{{site.description}}` | Description du site |
| `{{site.url}}` | URL du site |
| `{{site.logo}}` | URL du logo du site |
| `{{site.email}}` | Adresse email de contact |
| `{{site.phone}}` | Numéro de téléphone |
| `{{site.address}}` | Adresse postale |
| `{{site.social.facebook}}` | URL de la page Facebook |
| `{{site.social.twitter}}` | URL du compte Twitter/X |
| `{{site.social.instagram}}` | URL du compte Instagram |

### Champs de page

Les métadonnées et les champs standard de la page en cours sont disponibles :

| Placeholder | Valeur retournée |
|---|---|
| `{{page.title}}` | Titre de la page |
| `{{page.slug}}` | Slug de la page |
| `{{page.excerpt}}` | Extrait de la page |
| `{{page.featured_image}}` | URL de l'image mise en avant |
| `{{page.published_at}}` | Date de publication (formatée) |
| `{{page.updated_at}}` | Date de dernière modification (formatée) |
| `{{page.author.name}}` | Nom de l'auteur de la page |
| `{{page.author.avatar}}` | URL de l'avatar de l'auteur |
| `{{page.category}}` | Catégorie de la page |

### Champs personnalisés

Les champs personnalisés (custom fields) définis sur la page ou le type de contenu sont accessibles via le préfixe `fields` :

| Placeholder | Valeur retournée |
|---|---|
| `{{fields.nom_du_champ}}` | Valeur du champ personnalisé |
| `{{fields.prix}}` | Exemple : valeur d'un champ "prix" |
| `{{fields.couleur}}` | Exemple : valeur d'un champ "couleur" |

Les champs personnalisés supportent tous les types de données : texte, nombre, date, image, fichier, relation, booléen, sélection, etc.

### Données utilisateur

Les informations de l'utilisateur connecté sont disponibles pour créer des expériences personnalisées :

| Placeholder | Valeur retournée |
|---|---|
| `{{user.name}}` | Nom complet de l'utilisateur connecté |
| `{{user.first_name}}` | Prénom de l'utilisateur |
| `{{user.email}}` | Adresse email de l'utilisateur |
| `{{user.avatar}}` | URL de l'avatar de l'utilisateur |
| `{{user.role}}` | Rôle de l'utilisateur |

Les placeholders utilisateur retournent une valeur vide si aucun utilisateur n'est connecté. Il est recommandé de définir une valeur par défaut pour ces cas.

## Syntaxe des placeholders

Les placeholders utilisent la syntaxe à doubles accolades :

```
{{source.propriété}}
```

### Règles de syntaxe

| Règle | Exemple |
|---|---|
| Les placeholders sont encadrés par `{{` et `}}` | `{{site.name}}` |
| La source et la propriété sont séparées par un point | `{{page.title}}` |
| Les propriétés imbriquées utilisent la notation pointée | `{{site.social.facebook}}` |
| Les espaces à l'intérieur des accolades sont ignorés | `{{ site.name }}` est valide |

### Valeurs par défaut

Il est possible de définir une valeur de repli qui sera utilisée si la source de données ne retourne pas de valeur :

```
{{page.excerpt | "Aucune description disponible"}}
```

La valeur par défaut est séparée du placeholder par le caractère `|` (pipe) et doit être encadrée par des guillemets doubles.

### Formatage

Certains formateurs sont disponibles pour transformer la valeur retournée :

| Formateur | Description | Exemple |
|---|---|---|
| `upper` | Convertit en majuscules | `{{page.title \| upper}}` |
| `lower` | Convertit en minuscules | `{{page.title \| lower}}` |
| `date` | Formate une date | `{{page.published_at \| date:"d/m/Y"}}` |
| `truncate` | Tronque le texte | `{{page.excerpt \| truncate:100}}` |
| `default` | Valeur par défaut | `{{page.excerpt \| default:"Aucun extrait"}}` |

Les formateurs peuvent être chainés :

```
{{page.title | upper | truncate:50}}
```

## Utilisation dans le Page Builder

### Insertion d'un placeholder

Pour insérer un contenu dynamique dans un bloc :

1. Sélectionner le bloc à modifier.
2. Cliquer sur le champ de propriété souhaité (titre, texte, URL, etc.).
3. Cliquer sur l'icône **"Contenu dynamique"** (icône d'éclair) à côté du champ.
4. Parcourir les sources de données disponibles dans le panneau qui s'ouvre.
5. Sélectionner la donnée souhaitée. Le placeholder est inséré automatiquement dans le champ.

### Prévisualisation

Dans l'éditeur, les placeholders sont affichés sous deux formes :

- **Mode édition** : le placeholder est visible avec sa syntaxe (`{{page.title}}`), encadré par un badge coloré.
- **Mode prévisualisation** : le placeholder est remplacé par la valeur réelle issue de la source de données.

Le basculement entre les deux modes se fait via le bouton de prévisualisation de la barre d'outils.

## Cas d'utilisation

### En-tête dynamique avec le titre de page

Utiliser un bloc Heading avec le placeholder `{{page.title}}` pour afficher automatiquement le titre de la page. Cette approche garantit que le titre affiché reste synchronisé avec le titre configuré dans les paramètres de la page.

### Informations de contact du site

Insérer les coordonnées du site (`{{site.email}}`, `{{site.phone}}`, `{{site.address}}`) dans un bloc de pied de page. Si les coordonnées changent, toutes les pages sont mises à jour automatiquement.

### Contenu personnalisé selon l'utilisateur

Afficher un message de bienvenue personnalisé avec `{{user.first_name}}` pour les utilisateurs connectés, avec une valeur par défaut pour les visiteurs anonymes :

```
Bienvenue, {{user.first_name | default:"cher visiteur"}} !
```

### Données de champs personnalisés

Sur un type de contenu "Produit" avec des champs personnalisés (prix, référence, disponibilité), utiliser les placeholders pour afficher ces informations dans les blocs du Page Builder :

```
Référence : {{fields.reference}}
Prix : {{fields.prix}} EUR
```

### Dates formatées

Afficher la date de publication d'un article dans un format localisé :

```
Publié le {{page.published_at | date:"d MMMM Y"}}
```

## Intégration avec les types de contenu

Le système de contenu dynamique s'intègre nativement avec le système de types de contenu (content types) d'ArtisanCMS. Lorsqu'un type de contenu définit des champs personnalisés, ceux-ci sont automatiquement disponibles en tant que source de données dynamique dans le Page Builder.

Par exemple, un type de contenu "Événement" avec les champs personnalisés `date_debut`, `date_fin`, `lieu` et `organisateur` rend disponibles les placeholders suivants :

- `{{fields.date_debut}}`
- `{{fields.date_fin}}`
- `{{fields.lieu}}`
- `{{fields.organisateur}}`

Cette intégration permet de créer des templates de page réutilisables pour chaque type de contenu, où la mise en page est définie une seule fois et le contenu est alimenté dynamiquement par les champs de chaque entrée.

:::tip[Conseil]
Combinez les patterns réutilisables avec le contenu dynamique pour créer des templates de page puissants. Sauvegardez un pattern contenant des placeholders, puis insérez-le dans les pages d'un même type de contenu : la mise en page est identique, mais les données affichées sont propres à chaque page.
:::
