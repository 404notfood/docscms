---
title: "Blocs média"
description: "Documentation détaillée des blocs média du Page Builder : Image, Video, Gallery/Carousel, Map, Logo Grid et Embed."
---

Les blocs média permettent d'intégrer des éléments visuels et multimédias dans les pages construites avec le Page Builder. Ils prennent en charge les images, les vidéos, les cartes interactives et les contenus embarqués provenant de services tiers.

---

## Image

Le bloc **Image** affiche une image issue de la bibliothèque de médias d'ArtisanCMS, avec des options complètes de personnalisation et d'optimisation.

### Sélection de l'image

L'image est sélectionnée depuis la bibliothèque de médias intégrée. Le sélecteur de médias permet de parcourir les fichiers existants, d'effectuer une recherche par nom ou par type, et d'uploader de nouvelles images directement depuis le panneau de paramètres.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Image** | Fichier image depuis la bibliothèque de médias | Aucune |
| **Texte alternatif** | Attribut `alt` pour l'accessibilité et le référencement | Texte alt du fichier média |
| **Légende** | Texte affiché sous l'image | Aucune |
| **Lien** | URL de destination au clic sur l'image (interne, externe ou média) | Aucun |
| **Ouvrir dans un nouvel onglet** | Le lien s'ouvre dans un nouvel onglet | Non |
| **Lightbox** | Ouvre l'image en plein écran au clic | Non |

### Dimensionnement

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Largeur** | Largeur de l'image en pixels ou en pourcentage | 100 % |
| **Hauteur** | Hauteur de l'image (auto ou valeur fixe) | Auto |
| **Ajustement** | Comportement de redimensionnement : cover, contain ou fill | Cover |
| **Alignement** | Alignement horizontal : gauche, centre ou droite | Centre |
| **Bordure arrondie** | Rayon des coins en pixels | 0 px |

### Images responsive

Le bloc Image génère automatiquement des tailles d'image adaptées aux différents viewports grâce au système d'optimisation d'images intégré à ArtisanCMS :

- Les images sont converties au format **WebP** pour réduire le poids des fichiers.
- L'attribut `srcset` est généré automatiquement avec plusieurs résolutions.
- Le **lazy loading** natif est activé par défaut pour les images situées en dessous de la ligne de flottaison.

### Options avancées

| Propriété | Description |
|---|---|
| **Ombre portée** | Ombre CSS appliquée à l'image avec couleur, décalage et flou configurables. |
| **Bordure** | Bordure autour de l'image avec style, épaisseur et couleur. |
| **Filtre CSS** | Filtres visuels : niveaux de gris, sépia, luminosité, contraste, flou. |
| **Masque** | Forme de masque appliquée à l'image : cercle, losange, hexagone. |
| **Animation à l'entrée** | Animation lors de l'apparition dans le viewport : fondu, glissement, zoom. |

---

## Video

Le bloc **Video** permet d'intégrer une vidéo uploadée ou un lecteur embarqué depuis YouTube ou Vimeo.

### Sources vidéo

Le bloc supporte trois sources de vidéo :

| Source | Description |
|---|---|
| **Upload** | Vidéo uploadée dans la bibliothèque de médias (MP4, WebM). |
| **YouTube** | Intégration via l'URL de la vidéo YouTube. Le lecteur embarqué est affiché automatiquement. |
| **Vimeo** | Intégration via l'URL de la vidéo Vimeo. Le lecteur embarqué est affiché automatiquement. |

### Paramètres de lecture

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Lecture automatique** | La vidéo démarre automatiquement au chargement de la page | Non |
| **Boucle** | La vidéo reprend depuis le début à la fin de la lecture | Non |
| **Son désactivé** | La vidéo démarre sans son (obligatoire si autoplay est activé) | Non |
| **Contrôles** | Afficher les contrôles de lecture (play, pause, volume, progression) | Oui |
| **Image de couverture** | Image affichée avant le lancement de la lecture | Première frame (YouTube/Vimeo) ou aucune |

### Dimensionnement

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Ratio** | Rapport largeur/hauteur : 16:9, 4:3, 21:9, 1:1 ou personnalisé | 16:9 |
| **Largeur** | Largeur du lecteur en pixels ou en pourcentage | 100 % |
| **Alignement** | Alignement horizontal du lecteur : gauche, centre ou droite | Centre |

:::note
Lorsque la lecture automatique est activée, les navigateurs modernes exigent que la vidéo soit en mode muet. Le paramètre "Son désactivé" est automatiquement activé si "Lecture automatique" est sélectionné.
:::

---

## Gallery / Carousel

Le bloc **Gallery / Carousel** affiche une collection d'images sous forme de grille ou de carrousel défilant.

### Mode grille

En mode grille, les images sont disposées dans une grille régulière avec les options suivantes :

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Colonnes** | Nombre de colonnes de la grille (1 à 6) | 3 |
| **Gap** | Espacement entre les images en pixels | 10 px |
| **Ratio des images** | Rapport hauteur/largeur : 1:1, 4:3, 16:9 ou original | 1:1 |
| **Ajustement** | Comportement de redimensionnement dans la cellule : cover ou contain | Cover |

Le nombre de colonnes s'adapte automatiquement sur les viewports tablette et mobile.

### Mode carrousel

En mode carrousel, les images défilent horizontalement avec les options suivantes :

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Images visibles** | Nombre d'images affichées simultanément | 3 |
| **Défilement automatique** | Le carrousel avance automatiquement | Non |
| **Intervalle** | Durée entre chaque défilement automatique en millisecondes | 3000 ms |
| **Boucle** | Le carrousel recommence après la dernière image | Oui |
| **Navigation** | Afficher les flèches de navigation | Oui |
| **Pagination** | Afficher les points de pagination | Oui |

### Options communes

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Images** | Collection d'images depuis la bibliothèque de médias | Aucune |
| **Légendes** | Afficher les légendes sous chaque image | Non |
| **Lightbox** | Ouvrir les images en plein écran au clic | Oui |
| **Bordure arrondie** | Rayon des coins des images | 0 px |

---

## Map

Le bloc **Map** affiche une carte interactive avec marqueur(s), adaptée pour indiquer une localisation physique (bureaux, magasin, événement).

### Fournisseurs de cartes

Le bloc Map supporte deux fournisseurs :

| Fournisseur | Description | Configuration requise |
|---|---|---|
| **OpenStreetMap** | Carte libre et gratuite. Aucune clé API requise. | Aucune |
| **Google Maps** | Carte Google avec fonctionnalités avancées. | Clé API Google Maps dans les paramètres du site |

Le fournisseur par défaut est configurable dans les paramètres généraux du site.

### Paramètres de localisation

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Mode de localisation** | Recherche par adresse ou par coordonnées GPS | Adresse |
| **Adresse** | Adresse complète pour le géocodage automatique | Aucune |
| **Latitude** | Coordonnée de latitude (mode coordonnées) | 48.8566 |
| **Longitude** | Coordonnée de longitude (mode coordonnées) | 2.3522 |
| **Niveau de zoom** | Zoom de la carte (1 = monde entier, 18 = bâtiment) | 14 |

### Marqueurs

| Propriété | Description |
|---|---|
| **Marqueur principal** | Marqueur positionné à l'adresse ou aux coordonnées spécifiées. Activé par défaut. |
| **Marqueurs supplémentaires** | Liste de marqueurs additionnels avec position, titre et description. |
| **Info-bulle** | Texte affiché au clic ou au survol du marqueur. |
| **Icône personnalisée** | Image personnalisée remplaçant le marqueur par défaut. |

### Options d'affichage

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Hauteur** | Hauteur de la carte en pixels | 400 px |
| **Style de carte** | Thème visuel de la carte (clair, sombre, satellite, terrain) | Clair |
| **Contrôles de zoom** | Afficher les boutons de zoom | Oui |
| **Défilement pour zoomer** | Autoriser le zoom avec la molette de la souris | Non |
| **Plein écran** | Afficher le bouton de plein écran | Oui |

:::tip[Conseil]
Désactivez l'option "Défilement pour zoomer" pour éviter que les visiteurs ne se retrouvent bloqués dans la carte lors du défilement de la page sur mobile.
:::

---

## Logo Grid

Le bloc **Logo Grid** affiche une grille de logos ou d'images, idéal pour présenter des partenaires, des clients ou des technologies utilisées.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Logos** | Collection d'images depuis la bibliothèque de médias | Aucune |
| **Colonnes** | Nombre de colonnes de la grille (2 à 8) | 4 |
| **Gap** | Espacement entre les logos en pixels | 20 px |
| **Niveaux de gris** | Afficher les logos en niveaux de gris avec retour à la couleur au survol | Non |
| **Opacité** | Opacité des logos au repos (0.1 à 1) | 0.7 |
| **Opacité au survol** | Opacité des logos au survol | 1 |
| **Liens** | URL de destination pour chaque logo | Aucun |
| **Ouvrir dans un nouvel onglet** | Les liens s'ouvrent dans un nouvel onglet | Oui |
| **Taille maximale** | Taille maximale de chaque logo en pixels | 120 px |
| **Alignement vertical** | Alignement des logos dans les cellules : haut, centre ou bas | Centre |

### Comportement responsive

Le nombre de colonnes s'adapte automatiquement :

| Viewport | Colonnes par défaut |
|---|---|
| **Desktop** | Valeur configurée (2 à 8) |
| **Tablette** | Moitié de la valeur desktop (minimum 2) |
| **Mobile** | 2 colonnes |

---

## Embed

Le bloc **Embed** permet d'intégrer du contenu provenant de services tiers via le protocole **oEmbed**. Il suffit de coller l'URL du contenu pour obtenir un lecteur embarqué.

### Services supportés

Le bloc Embed reconnaît automatiquement les URL des services suivants :

| Service | Type de contenu |
|---|---|
| **YouTube** | Vidéos et playlists |
| **Vimeo** | Vidéos |
| **Twitter / X** | Tweets et fils de discussion |
| **Instagram** | Publications et reels |
| **Spotify** | Morceaux, albums et playlists |
| **SoundCloud** | Morceaux et playlists |
| **CodePen** | Pens (démonstrations de code) |
| **Figma** | Fichiers et prototypes |
| **Google Maps** | Cartes et itinéraires |

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **URL** | URL du contenu à embarquer | Aucune |
| **Ratio** | Rapport largeur/hauteur du conteneur : 16:9, 4:3, 1:1 ou auto | 16:9 |
| **Largeur maximale** | Largeur maximale du bloc en pixels ou en pourcentage | 100 % |
| **Alignement** | Alignement horizontal du contenu : gauche, centre ou droite | Centre |
| **Légende** | Texte descriptif affiché sous le contenu embarqué | Aucune |

### Fonctionnement

1. L'utilisateur colle l'URL du contenu dans le champ dédié.
2. Le système effectue une requête oEmbed pour récupérer les métadonnées et le code d'intégration.
3. L'aperçu est affiché dans l'éditeur.
4. Sur le site publié, le contenu embarqué est chargé en lazy loading pour préserver les performances.

:::note
Pour les URL non reconnues par le système oEmbed, le bloc affiche un message indiquant que le service n'est pas supporté. Il est possible d'utiliser un bloc de code HTML personnalisé via le système de plugins pour intégrer des services additionnels.
:::
