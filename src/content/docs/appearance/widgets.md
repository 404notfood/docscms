---
title: "Widgets"
description: "Systeme de widgets d'ArtisanCMS : modeles Widget et WidgetArea, zones de widgets, types disponibles, glisser-deposer et gestion via l'administration."
---

Le systeme de widgets d'ArtisanCMS permet d'ajouter des elements de contenu dynamiques dans des zones predefinies de votre site, comme les barres laterales, les pieds de page ou des zones personnalisees.

## Concept

Un widget est un petit composant autonome qui affiche un contenu specifique : liste des articles recents, categories, HTML personnalise, etc. Les widgets sont places dans des **zones de widgets** (widget areas) definies par le theme ou la configuration du site.

## Modeles

### Widget

Le modele **Widget** represente un widget individuel. Ses attributs sont :

| Attribut | Description |
|---|---|
| **title** | Titre affiche au-dessus du widget (optionnel) |
| **type** | Type de widget (recent_posts, categories, custom_html, etc.) |
| **widget_area_id** | Zone de widget dans laquelle il est place |
| **settings** | Parametres specifiques au type de widget (JSON) |
| **order** | Position du widget dans la zone |
| **is_active** | Indique si le widget est affiche |

### WidgetArea

Le modele **WidgetArea** represente une zone ou les widgets peuvent etre places :

| Attribut | Description |
|---|---|
| **name** | Nom de la zone (ex. "Barre laterale", "Footer colonne 1") |
| **slug** | Identifiant unique de la zone |
| **description** | Description de l'emplacement de la zone |
| **is_active** | Indique si la zone est active |

## Zones de widgets

ArtisanCMS propose plusieurs zones de widgets par defaut :

| Zone | Emplacement |
|---|---|
| **sidebar** | Barre laterale des pages et articles |
| **footer-1** | Premiere colonne du pied de page |
| **footer-2** | Deuxieme colonne du pied de page |
| **footer-3** | Troisieme colonne du pied de page |

Les themes peuvent declarer des zones de widgets supplementaires en fonction de leur layout. Vous pouvez egalement creer des zones personnalisees depuis l'administration.

## Types de widgets

ArtisanCMS inclut plusieurs types de widgets natifs :

| Type | Description |
|---|---|
| **Articles recents** | Affiche les derniers articles publies avec titre et date |
| **Categories** | Liste des categories avec compteur d'articles |
| **Tags** | Nuage de tags ou liste de tags |
| **HTML personnalise** | Contenu HTML libre pour tout type de contenu |
| **Texte** | Bloc de texte simple avec mise en forme basique |
| **Menu de navigation** | Affiche un menu defini dans la gestion des menus |
| **Recherche** | Formulaire de recherche du site |
| **Image** | Affiche une image avec lien optionnel |

Chaque type de widget dispose de parametres specifiques. Par exemple, le widget "Articles recents" permet de configurer le nombre d'articles affiches et l'affichage ou non de la date.

## Administration

Le **WidgetController** expose l'interface de gestion des widgets dans le panneau d'administration. Les fonctionnalites disponibles sont :

### Glisser-deposer

L'interface de gestion des widgets repose sur le glisser-deposer. Vous pouvez :

- **Ajouter** un widget en le faisant glisser dans une zone
- **Reorganiser** les widgets en modifiant leur ordre par glisser-deposer
- **Deplacer** un widget d'une zone a une autre
- **Supprimer** un widget en le retirant de sa zone

### Configuration des widgets

Chaque widget peut etre configure individuellement :

1. Cliquez sur un widget pour ouvrir son panneau de configuration
2. Modifiez le titre, les parametres specifiques au type et la visibilite
3. Enregistrez les modifications

### Gestion des zones

Depuis l'administration, vous pouvez :

- Creer de nouvelles zones de widgets personnalisees
- Renommer ou desactiver des zones existantes
- Visualiser le contenu de chaque zone

## Rendu

Les zones de widgets sont rendues dans les layouts du theme via le composant dedie. Le systeme resout automatiquement les widgets actifs de chaque zone, les ordonne et genere le HTML correspondant.

:::note
Les widgets sont complementaires aux sections globales. Utilisez les sections globales pour les en-tetes et pieds de page complets, et les widgets pour des elements de contenu modulaires dans les barres laterales et autres zones secondaires.
:::
