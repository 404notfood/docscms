---
title: "Introduction au Page Builder"
description: "Découvrez le page builder visuel d'ArtisanCMS : construction de pages par glisser-déposer, 39 types de blocs, édition responsive et sauvegarde automatique."
---

Le Page Builder est le composant central d'ArtisanCMS pour la création de pages. Il permet de concevoir des mises en page complexes grâce à une interface visuelle de type glisser-déposer, sans écrire une seule ligne de code.

## Principes de fonctionnement

### Glisser-déposer visuel

Le Page Builder repose sur la bibliothèque **dnd-kit** pour offrir une expérience de glisser-déposer fluide et accessible. Les blocs peuvent être insérés depuis un panneau latéral, réorganisés par glissement et imbriqués les uns dans les autres.

Chaque interaction est accompagnée d'un retour visuel : indicateurs de positionnement, zones de dépôt mises en surbrillance et animation de déplacement.

### Structure arborescente en JSON

Le contenu de chaque page est stocké sous forme d'un arbre de blocs au format JSON. Cette structure offre plusieurs avantages :

- **Portabilité** : le contenu peut être exporté, importé et versionné facilement.
- **Performance** : le rendu côté serveur est rapide grâce à une structure de données optimisée.
- **Flexibilité** : chaque bloc porte ses propres propriétés et peut contenir des blocs enfants.

### Hiérarchie des blocs

Le Page Builder utilise une structure imbriquée à trois niveaux principaux :

```
Section
└── Grid (colonnes)
    └── Block (contenu)
```

| Niveau | Rôle | Description |
|---|---|---|
| **Section** | Conteneur principal | Définit une zone pleine largeur avec fond, espacement et options de mise en page. |
| **Grid** | Grille de colonnes | Organise le contenu en colonnes (1 à 6) avec des points de rupture responsive. |
| **Block** | Bloc de contenu | Élément individuel : texte, image, bouton, vidéo, formulaire, etc. |

Les blocs de contenu peuvent être placés directement dans une section ou dans les colonnes d'une grille. Les sections et grilles peuvent être imbriquées pour créer des mises en page avancées.

## Édition responsive

Le Page Builder intègre un mode d'édition responsive qui permet de visualiser et d'ajuster la page pour trois types d'écrans :

| Viewport | Largeur | Utilisation |
|---|---|---|
| **Desktop** | 1280 px et plus | Affichage par défaut, édition principale |
| **Tablette** | 768 px | Vérification de la mise en page intermédiaire |
| **Mobile** | 375 px | Optimisation de l'affichage mobile |

En basculant entre les viewports, il est possible de modifier les propriétés spécifiques à chaque taille d'écran : nombre de colonnes, taille des polices, espacement, visibilité des blocs, etc. Les paramètres non modifiés héritent automatiquement du viewport supérieur.

## Sauvegarde automatique

Le Page Builder enregistre automatiquement les modifications à intervalles réguliers. Chaque sauvegarde est silencieuse et non bloquante : l'utilisateur peut continuer à éditer pendant que la requête est envoyée au serveur.

Un indicateur visuel dans la barre d'outils affiche l'état de la sauvegarde :

- **Enregistré** : toutes les modifications sont sauvegardées.
- **Enregistrement...** : une sauvegarde est en cours.
- **Non enregistré** : des modifications en attente n'ont pas encore été envoyées.

La sauvegarde manuelle reste disponible via le bouton dédié ou le raccourci clavier `Ctrl + S`.

## Annuler / Rétablir

Le système d'historique permet de naviguer dans les modifications apportées à la page :

- **Annuler** (`Ctrl + Z`) : revenir à l'état précédent.
- **Rétablir** (`Ctrl + Shift + Z`) : restaurer une modification annulée.

L'historique conserve les dernières modifications effectuées durant la session d'édition. Chaque action significative (ajout, suppression, déplacement, modification de propriété) constitue une entrée dans l'historique.

## Raccourcis clavier

Le Page Builder propose des raccourcis clavier pour accélérer le travail d'édition :

| Raccourci | Action |
|---|---|
| `Ctrl + S` | Sauvegarder la page |
| `Ctrl + Z` | Annuler la dernière action |
| `Ctrl + Shift + Z` | Rétablir l'action annulée |
| `Ctrl + C` | Copier le bloc sélectionné |
| `Ctrl + V` | Coller le bloc copié |
| `Ctrl + D` | Dupliquer le bloc sélectionné |
| `Suppr` / `Backspace` | Supprimer le bloc sélectionné |
| `Echap` | Désélectionner le bloc actif |

## Architecture technique

### Backend : BuilderApiController

Le contrôleur `BuilderApiController` expose les endpoints nécessaires au fonctionnement du Page Builder :

- **Chargement** : récupération de l'arbre de blocs d'une page.
- **Sauvegarde** : enregistrement de l'arbre de blocs modifié.
- **Upload média** : envoi de fichiers depuis l'éditeur vers la bibliothèque de médias.
- **Patterns** : gestion des patterns réutilisables (lecture, insertion).

Toutes les requêtes sont protégées par les policies Laravel et la validation des données.

### Frontend : package @artisan/page-builder

Le Page Builder est distribué sous forme de package React interne `@artisan/page-builder`. Ce package contient :

- Le composant principal `PageBuilder` qui orchestre l'éditeur.
- Le système de drag & drop basé sur dnd-kit.
- Les panneaux de paramètres pour chaque type de bloc.
- Les composants de prévisualisation (renderers).
- La barre d'outils et les contrôles de viewport.

### Gestion d'état : Zustand

L'état du Page Builder est géré par **Zustand**, une bibliothèque de gestion d'état légère pour React. Le store centralisé contient :

- L'arbre de blocs de la page en cours d'édition.
- Le bloc actuellement sélectionné.
- Le viewport actif (desktop, tablette, mobile).
- L'historique des modifications (undo/redo).
- L'état de la sauvegarde.
- Les paramètres de l'éditeur (panneau ouvert, zoom, etc.).

Zustand offre une API simple et performante, sans le boilerplate habituellement associé à Redux. Les mises à jour d'état sont optimisées pour ne re-rendre que les composants concernés.

### Structure des fichiers

Les composants du Page Builder sont organisés dans le répertoire suivant :

```
resources/js/Components/builder/
├── blocks/              # Renderers et settings de chaque bloc
│   ├── HeadingBlock/
│   │   ├── HeadingRenderer.tsx
│   │   └── HeadingSettings.tsx
│   ├── TextBlock/
│   ├── ImageBlock/
│   └── ...
├── panels/              # Panneaux latéraux (blocs, paramètres, layers)
├── toolbar/             # Barre d'outils principale
├── dnd/                 # Composants drag & drop (dnd-kit)
├── viewport/            # Gestion des viewports responsive
└── PageBuilder.tsx      # Composant racine
```

Chaque bloc est composé de deux fichiers :

- **Renderer** (`[Nom]Renderer.tsx`) : composant de prévisualisation affiché dans l'éditeur et sur le site.
- **Settings** (`[Nom]Settings.tsx`) : panneau de paramètres affiché lorsque le bloc est sélectionné.

:::tip[Prochaine étape]
Consultez la page [Blocs disponibles](/page-builder/blocks/) pour découvrir les 39 types de blocs proposés par le Page Builder.
:::
