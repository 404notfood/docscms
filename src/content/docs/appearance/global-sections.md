---
title: "Sections globales"
description: "Gestion des sections globales (headers et footers) dans ArtisanCMS : modele GlobalSection, construction avec le page builder, application par template et mise en cache."
---

Les sections globales permettent de definir des en-tetes (headers) et des pieds de page (footers) reutilisables sur l'ensemble du site ou sur des templates specifiques. Elles sont construites avec les memes blocs que le page builder, offrant une flexibilite totale de conception.

## Concept

Plutot que de coder un header ou un footer dans un fichier de layout, ArtisanCMS permet de les construire visuellement. Une section globale est un assemblage de blocs (logo, navigation, texte, icones de reseaux sociaux, formulaire de newsletter, etc.) qui s'affiche automatiquement sur les pages concernees.

## Modele GlobalSection

Le modele **GlobalSection** represente une section globale en base de donnees. Ses attributs principaux sont :

| Attribut | Description |
|---|---|
| **name** | Nom de la section (ex. "Header principal", "Footer site") |
| **type** | Type de section : `header` ou `footer` |
| **content** | Structure JSON des blocs composant la section |
| **is_active** | Indique si la section est active |
| **templates** | Liste des templates auxquels la section s'applique |
| **order** | Ordre d'affichage si plusieurs sections du meme type existent |

## Construction avec le page builder

L'editeur de sections globales utilise le meme page builder que l'editeur de pages. Vous disposez de tous les blocs disponibles pour composer vos headers et footers :

- **Blocs de navigation** : menus, liens, fil d'Ariane
- **Blocs de marque** : logo, nom du site
- **Blocs de contenu** : texte, icones, boutons
- **Blocs de formulaire** : recherche, inscription newsletter
- **Blocs de layout** : colonnes, espacement, separateurs

L'edition se fait en glisser-deposer avec un apercu en temps reel.

## GlobalSectionService

Le **GlobalSectionService** fournit les operations de gestion des sections globales :

- **Creation** : ajout d'une nouvelle section avec son type et son contenu
- **Mise a jour** : modification du contenu ou des parametres d'une section
- **Suppression** : retrait d'une section globale
- **Resolution** : determination de la section a afficher pour une page donnee, en fonction du template et des priorites

## Administration

Le **GlobalSectionController** expose l'interface d'administration pour les sections globales. Depuis le panneau d'administration, vous pouvez :

1. **Lister** toutes les sections globales existantes
2. **Creer** une nouvelle section header ou footer
3. **Editer** le contenu d'une section avec le page builder
4. **Configurer** les templates auxquels la section s'applique
5. **Activer/Desactiver** une section

## Application par template

Les sections globales peuvent etre appliquees de deux manieres :

### Application globale

Par defaut, une section s'applique a toutes les pages du site. C'est le cas typique d'un header principal et d'un footer de site.

### Application par template

Vous pouvez restreindre une section a un ou plusieurs templates specifiques. Par exemple :

- Un header simplifie pour les pages d'atterrissage
- Un footer avec des liens legaux uniquement pour les pages e-commerce
- Un header avec barre de recherche pour la section blog

Lorsqu'une page correspond a plusieurs sections du meme type, la section la plus specifique (liee au template) a la priorite sur la section globale.

## Cache et performances

Le **GlobalSectionObserver** surveille les modifications apportees aux sections globales et invalide automatiquement le cache associe. Le rendu HTML des sections est mis en cache pour eviter de recalculer la structure des blocs a chaque chargement de page.

Les evenements suivants declenchent une invalidation du cache :

- Modification du contenu d'une section
- Changement du statut actif/inactif
- Modification de l'association aux templates

:::tip[Bonne pratique]
Creez des sections globales distinctes pour vos differents types de pages plutot que de surcharger un seul header avec des conditions. Cela simplifie la maintenance et ameliore la lisibilite de votre configuration.
:::
