---
title: "Patterns réutilisables"
description: "Découvrez les patterns du Page Builder : sauvegardez des groupes de blocs en tant que modèles réutilisables et insérez-les dans n'importe quelle page."
---

Les **patterns** sont des groupes de blocs sauvegardés en tant que modèles réutilisables. Ils permettent de capitaliser sur les mises en page créées et de les réutiliser sur l'ensemble du site sans reconstruire chaque élément manuellement.

## Principe de fonctionnement

Un pattern est une copie figée d'un ensemble de blocs avec leurs propriétés et leur structure. Lorsqu'un pattern est inséré dans une page, une copie indépendante des blocs est créée. Les modifications apportées à l'instance insérée n'affectent pas le pattern original, et inversement.

Ce fonctionnement garantit que chaque page reste autonome tout en permettant de démarrer à partir d'une base cohérente.

## Modèle BlockPattern

Les patterns sont stockés dans la base de données via le modèle `BlockPattern`. Chaque pattern contient les informations suivantes :

| Champ | Description |
|---|---|
| **name** | Nom du pattern affiché dans la bibliothèque. |
| **slug** | Identifiant unique généré automatiquement à partir du nom. |
| **description** | Description courte du pattern (optionnelle). |
| **category** | Catégorie de classement du pattern. |
| **blocks** | Arbre de blocs au format JSON, identique à la structure d'une page. |
| **preview** | Capture d'écran miniature du pattern, générée automatiquement. |
| **site_id** | Identifiant du site propriétaire (multi-site). |

## BlockPatternService

Le service `BlockPatternService` centralise les opérations CRUD sur les patterns :

| Méthode | Description |
|---|---|
| `list()` | Récupère tous les patterns du site courant, avec filtrage optionnel par catégorie. |
| `get($id)` | Récupère un pattern par son identifiant. |
| `create($data)` | Crée un nouveau pattern à partir d'un ensemble de blocs. |
| `update($id, $data)` | Met à jour le nom, la description, la catégorie ou les blocs d'un pattern. |
| `delete($id)` | Supprime un pattern de manière définitive. |
| `duplicate($id)` | Crée une copie d'un pattern existant. |

Le service valide les données d'entrée et gère la sérialisation/désérialisation de l'arbre de blocs JSON.

## Administration des patterns

### BlockPatternController

Le contrôleur `BlockPatternController` expose les endpoints d'administration pour gérer les patterns depuis l'interface d'administration :

| Route | Méthode | Description |
|---|---|---|
| `/admin/patterns` | GET | Liste de tous les patterns avec filtrage et pagination. |
| `/admin/patterns/create` | POST | Création d'un nouveau pattern. |
| `/admin/patterns/{id}` | PUT | Mise à jour d'un pattern existant. |
| `/admin/patterns/{id}` | DELETE | Suppression d'un pattern. |
| `/admin/patterns/{id}/duplicate` | POST | Duplication d'un pattern. |

L'accès aux endpoints est protégé par la policy `BlockPatternPolicy` qui vérifie les permissions de l'utilisateur.

### Page d'administration

La page d'administration des patterns offre les fonctionnalités suivantes :

- **Liste** : affichage de tous les patterns sous forme de grille avec miniatures, noms et catégories.
- **Recherche** : filtrage par nom ou par catégorie.
- **Création** : formulaire de création avec champs nom, description et catégorie.
- **Édition** : modification du nom, de la description et de la catégorie. Les blocs ne sont pas éditables directement depuis cette page.
- **Suppression** : suppression avec confirmation. Les pages utilisant des instances du pattern ne sont pas affectées.

## Créer un pattern

### Depuis le Page Builder

La méthode la plus courante pour créer un pattern est de le faire directement depuis le Page Builder :

1. Sélectionner les blocs à sauvegarder en tant que pattern. Il est possible de sélectionner une section entière ou un ensemble de blocs.
2. Cliquer sur le bouton **"Sauvegarder comme pattern"** dans la barre d'outils contextuelle.
3. Renseigner un **nom** pour le pattern.
4. Choisir une **catégorie** (existante ou nouvelle).
5. Ajouter une **description** optionnelle.
6. Valider la création.

Le pattern est immédiatement disponible dans la bibliothèque de patterns pour toutes les pages du site.

### Depuis l'administration

Il est également possible de créer un pattern depuis la page d'administration dédiée, en définissant les blocs manuellement au format JSON. Cette méthode est destinée aux développeurs qui souhaitent créer des patterns par programmation.

## Insérer un pattern

L'insertion d'un pattern dans une page se fait depuis le panneau d'insertion du Page Builder :

1. Ouvrir le panneau d'insertion de blocs.
2. Sélectionner l'onglet **"Patterns"**.
3. Parcourir la bibliothèque ou filtrer par catégorie.
4. Cliquer sur le pattern souhaité pour l'insérer à la position du curseur.

Les blocs du pattern sont insérés en tant que copie indépendante. Ils peuvent être modifiés, déplacés ou supprimés comme n'importe quel autre bloc de la page.

## Catégories de patterns

Les catégories permettent d'organiser les patterns pour en faciliter la recherche :

| Catégorie suggérée | Description |
|---|---|
| **En-têtes** | Sections hero, en-têtes de page. |
| **Appels à l'action** | Blocs CTA, bannières promotionnelles. |
| **Témoignages** | Carrousels et grilles de témoignages. |
| **Tarifs** | Tableaux de prix et comparatifs. |
| **Équipe** | Grilles de membres d'équipe. |
| **FAQ** | Sections de questions fréquentes (accordéons). |
| **Contact** | Formulaires de contact avec carte et coordonnées. |
| **Pieds de page** | Sections de pied de page avec colonnes d'informations. |

Les catégories sont libres : il est possible d'en créer autant que nécessaire pour structurer la bibliothèque selon les besoins du projet.

## Partage entre les pages

Les patterns sont partagés à l'échelle du site. Un pattern créé sur une page est accessible depuis toutes les autres pages du même site. En mode multi-site, chaque site dispose de sa propre bibliothèque de patterns, isolée des autres sites.

## Cas d'utilisation courants

### Sections d'appel à l'action

Créer un pattern pour une section CTA standardisée (titre, description, bouton) et l'insérer sur les pages de service ou de produit pour maintenir une cohérence visuelle.

### Carrousels de témoignages

Sauvegarder un carrousel de témoignages avec sa mise en page et son style, puis le réutiliser sur les pages de destination.

### Tableaux de tarifs

Définir un tableau comparatif de plans tarifaires en tant que pattern, garantissant que toutes les pages de tarification utilisent la même structure.

### Sections hero

Créer des variantes de sections hero (avec image, avec vidéo, avec dégradé) et les proposer en tant que points de départ lors de la création de nouvelles pages.

### En-têtes de section

Standardiser les en-têtes de section (titre + sous-titre + séparateur) pour assurer une hiérarchie visuelle cohérente sur tout le site.

:::tip[Conseil]
Définissez une convention de nommage pour les patterns (par exemple : `[Catégorie] - [Description]`) afin de maintenir une bibliothèque organisée lorsque le nombre de patterns augmente.
:::
