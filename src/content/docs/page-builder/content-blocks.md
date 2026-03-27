---
title: "Blocs de contenu"
description: "Documentation détaillée des 18 blocs de contenu du Page Builder : titres, texte riche, boutons, accordéons, compteurs, tableaux et bien d'autres composants éditoriaux."
---

Les blocs de contenu constituent le coeur éditorial des pages construites avec le Page Builder. Ils couvrent un large éventail de besoins : rédaction de texte, structuration de l'information, mise en valeur de données et interaction avec le visiteur.

---

## Heading

Le bloc **Heading** affiche un titre avec un niveau sémantique configurable.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Texte** | Contenu du titre | "Titre" |
| **Niveau** | Balise HTML : H1, H2, H3, H4, H5 ou H6 | H2 |
| **Alignement** | Alignement horizontal : gauche, centre, droite ou justifié | Gauche |
| **Couleur** | Couleur du texte | Héritée du thème |
| **Taille de police** | Taille personnalisée en px, rem ou em | Définie par le niveau |
| **Graisse** | Épaisseur de la police (300 à 900) | 700 (bold) |
| **Espacement des lettres** | Espacement entre les caractères | Normal |
| **Transformation** | Transformation du texte : majuscules, minuscules, capitales | Aucune |

Le niveau du titre détermine la balise HTML générée, ce qui influence le référencement et l'accessibilité. La taille visuelle peut être modifiée indépendamment du niveau sémantique.

---

## Text

Le bloc **Text** intègre un éditeur de texte riche basé sur **TipTap**, offrant une expérience d'édition fluide directement dans le Page Builder.

### Fonctionnalités de l'éditeur

L'éditeur TipTap propose les options de mise en forme suivantes :

- **Formatage** : gras, italique, souligné, barré, exposant, indice.
- **Listes** : listes à puces, listes numérotées, listes de tâches.
- **Liens** : insertion de liens avec URL, cible (nouvel onglet) et attribut nofollow.
- **Alignement** : gauche, centre, droite, justifié.
- **Couleurs** : couleur du texte et couleur de surlignage.
- **Blocs** : paragraphe, titres (H1-H6), citation.
- **Médias inline** : insertion d'images dans le flux de texte.

### Paramètres du bloc

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Contenu** | Texte riche au format HTML | Paragraphe vide |
| **Couleur** | Couleur par défaut du texte | Héritée du thème |
| **Taille de police** | Taille de base du texte | 16 px |
| **Hauteur de ligne** | Interligne du texte | 1.6 |
| **Espacement des paragraphes** | Marge entre les paragraphes | 1 em |

---

## Button

Le bloc **Button** affiche un bouton cliquable avec de nombreuses options de personnalisation.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Texte** | Libellé du bouton | "Cliquez ici" |
| **Lien** | URL de destination (interne ou externe) | Aucun |
| **Cible** | Ouverture dans le même onglet ou un nouvel onglet | Même onglet |
| **Variante** | Style prédéfini : primary, secondary, outline, ghost, destructive | Primary |
| **Taille** | Taille du bouton : small, medium, large | Medium |
| **Icône** | Icône optionnelle affichée avant ou après le texte | Aucune |
| **Position de l'icône** | Placement de l'icône : gauche ou droite du texte | Gauche |
| **Pleine largeur** | Le bouton occupe toute la largeur de son conteneur | Non |
| **Alignement** | Alignement horizontal du bouton : gauche, centre ou droite | Gauche |
| **Bordure arrondie** | Rayon des coins du bouton en pixels | Défini par le thème |

---

## Hero

Le bloc **Hero** crée une section d'en-tête visuelle, généralement placée en haut de page pour capter l'attention du visiteur.

### Paramètres

| Propriété | Description |
|---|---|
| **Titre** | Titre principal du hero, généralement en H1. |
| **Sous-titre** | Texte descriptif affiché sous le titre. |
| **Bouton principal** | Appel à l'action principal avec texte et lien. |
| **Bouton secondaire** | Appel à l'action secondaire optionnel. |
| **Image de fond** | Image issue de la bibliothèque de médias. |
| **Vidéo de fond** | Vidéo en lecture automatique, muette et en boucle. |
| **Overlay** | Superposition colorée avec opacité réglable pour améliorer la lisibilité du texte sur le fond. |
| **Hauteur** | Hauteur du hero : auto, viewport complet (100vh) ou valeur personnalisée. |
| **Alignement du contenu** | Position du texte : gauche, centre ou droite ; haut, milieu ou bas. |

---

## Accordion

Le bloc **Accordion** affiche une liste de sections dépliantes, idéal pour les FAQ ou le contenu organisé par thème.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Éléments** | Liste de paires titre/contenu | 3 éléments par défaut |
| **Mode d'ouverture** | Un seul élément ouvert à la fois ou plusieurs simultanément | Un seul |
| **Élément ouvert par défaut** | Index de l'élément ouvert au chargement (ou aucun) | Premier élément |
| **Icône** | Style de l'indicateur d'ouverture : flèche, plus/moins ou chevron | Chevron |
| **Style** | Apparence : bordé, séparé ou minimaliste | Bordé |

Le contenu de chaque élément de l'accordéon accepte du texte riche (formatage, liens, images).

---

## Tabs

Le bloc **Tabs** organise le contenu en onglets horizontaux, permettant au visiteur de naviguer entre différentes sections sans quitter la page.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Onglets** | Liste de paires titre/contenu | 3 onglets par défaut |
| **Onglet actif par défaut** | Index de l'onglet affiché au chargement | Premier onglet |
| **Position des onglets** | Placement des titres d'onglets : haut, bas, gauche ou droite | Haut |
| **Alignement** | Alignement des titres d'onglets : gauche, centre, droite ou pleine largeur | Gauche |
| **Style** | Apparence des onglets : souligné, encadré ou pilule | Souligné |
| **Icônes** | Icône optionnelle pour chaque onglet | Aucune |

---

## Counter

Le bloc **Counter** affiche un nombre animé qui s'incrémente de la valeur de départ à la valeur cible lors du défilement de la page.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Valeur de départ** | Nombre initial de l'animation | 0 |
| **Valeur cible** | Nombre final de l'animation | 100 |
| **Durée** | Durée de l'animation en millisecondes | 2000 ms |
| **Préfixe** | Texte affiché avant le nombre (ex. : "$", "+") | Aucun |
| **Suffixe** | Texte affiché après le nombre (ex. : "%", " clients") | Aucun |
| **Séparateur de milliers** | Caractère de séparation des milliers | Espace |
| **Décimales** | Nombre de décimales affichées | 0 |
| **Titre** | Texte descriptif affiché sous le compteur | Aucun |

L'animation se déclenche lorsque le bloc entre dans le viewport du visiteur.

---

## Icon Box

Le bloc **Icon Box** combine une icône, un titre et une description dans une carte structurée, idéale pour présenter des fonctionnalités ou des services.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Icône** | Icône sélectionnée depuis la bibliothèque d'icônes intégrée | Étoile |
| **Titre** | Titre de la carte | "Fonctionnalité" |
| **Description** | Texte descriptif sous le titre | Paragraphe de présentation |
| **Position de l'icône** | Placement de l'icône : haut, gauche ou droite du contenu | Haut |
| **Taille de l'icône** | Taille de l'icône en pixels | 48 px |
| **Couleur de l'icône** | Couleur de l'icône | Couleur primaire du thème |
| **Lien** | URL optionnelle rendant toute la carte cliquable | Aucun |

---

## Table

Le bloc **Table** affiche un tableau de données structuré avec en-têtes et lignes configurables.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Colonnes** | Nombre de colonnes et en-têtes | 3 colonnes |
| **Lignes** | Contenu des cellules pour chaque ligne | 3 lignes |
| **En-tête** | Afficher ou masquer la ligne d'en-tête | Activé |
| **Pied de tableau** | Afficher ou masquer la ligne de pied | Désactivé |
| **Style** | Apparence : lignes alternées, bordé, minimaliste | Lignes alternées |
| **Responsive** | Comportement sur petit écran : défilement horizontal ou empilement | Défilement horizontal |
| **Alignement** | Alignement du texte par colonne : gauche, centre ou droite | Gauche |

---

## Alert

Le bloc **Alert** affiche un message d'avertissement ou d'information mis en évidence avec un style visuel distinctif.

### Variantes

| Variante | Couleur | Icône par défaut | Utilisation |
|---|---|---|---|
| **Info** | Bleu | Cercle d'information | Information complémentaire |
| **Success** | Vert | Coche | Confirmation, message positif |
| **Warning** | Orange | Triangle d'avertissement | Mise en garde |
| **Error** | Rouge | Croix dans un cercle | Erreur, alerte critique |

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Variante** | Type d'alerte : info, success, warning, error | Info |
| **Titre** | Titre optionnel affiché en gras | Aucun |
| **Contenu** | Message de l'alerte (texte riche) | Texte par défaut |
| **Icône** | Icône personnalisée ou icône par défaut de la variante | Icône de la variante |
| **Fermable** | Afficher un bouton de fermeture | Non |

---

## Countdown

Le bloc **Countdown** affiche un compte à rebours vers une date et une heure cibles.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Date cible** | Date et heure de fin du compte à rebours | 7 jours dans le futur |
| **Format** | Unités affichées : jours, heures, minutes, secondes | Toutes les unités |
| **Labels** | Texte sous chaque unité (ex. : "Jours", "Heures") | Labels français |
| **Style** | Apparence : cartes, cercles, simple | Cartes |
| **Message de fin** | Texte affiché lorsque le compte à rebours atteint zéro | "Le temps est écoulé" |
| **Séparateur** | Caractère affiché entre les unités | ":" |

---

## Code Block

Le bloc **Code Block** affiche du code source avec coloration syntaxique, adapté aux sites techniques et à la documentation.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Code** | Contenu du bloc de code | Exemple de code |
| **Langage** | Langage de programmation pour la coloration syntaxique | JavaScript |
| **Thème** | Thème de coloration : clair ou sombre | Sombre |
| **Numéros de ligne** | Afficher les numéros de ligne | Oui |
| **Ligne de surbrillance** | Lignes mises en évidence (ex. : "1,3-5") | Aucune |
| **Bouton de copie** | Afficher un bouton pour copier le code dans le presse-papiers | Oui |
| **Nom du fichier** | Nom de fichier optionnel affiché dans l'en-tête | Aucun |

Les langages supportés incluent : JavaScript, TypeScript, PHP, Python, HTML, CSS, JSON, Bash, SQL, et de nombreux autres via la bibliothèque de coloration syntaxique intégrée.

---

## Blockquote

Le bloc **Blockquote** affiche une citation stylisée, idéale pour mettre en valeur un témoignage, une phrase marquante ou une référence.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Citation** | Texte de la citation | Texte par défaut |
| **Auteur** | Nom de l'auteur de la citation | Aucun |
| **Source** | Source ou référence de la citation | Aucune |
| **Style** | Apparence : bordure latérale, guillemets ou carte | Bordure latérale |
| **Alignement** | Alignement du texte : gauche, centre ou droite | Gauche |
| **Taille de police** | Taille du texte de la citation | 1.2 em |

---

## List

Le bloc **List** affiche une liste ordonnée ou non ordonnée avec des options de personnalisation étendues.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Éléments** | Liste des éléments textuels | 3 éléments par défaut |
| **Type** | Liste ordonnée (numérotée) ou non ordonnée (à puces) | Non ordonnée |
| **Icône** | Icône personnalisée remplaçant les puces standard | Aucune |
| **Couleur de l'icône** | Couleur de l'icône ou de la puce | Couleur primaire du thème |
| **Espacement** | Espace entre les éléments de la liste | 8 px |
| **Style de numérotation** | Pour les listes ordonnées : décimal, romain, alphabétique | Décimal |

---

## Team Members

Le bloc **Team Members** affiche une carte de membre d'équipe avec photo, informations et liens vers les réseaux sociaux.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Photo** | Image du membre depuis la bibliothèque de médias | Placeholder |
| **Nom** | Nom complet du membre | "Nom du membre" |
| **Rôle** | Titre ou poste occupé | "Poste" |
| **Biographie** | Description courte du membre | Aucune |
| **Réseaux sociaux** | Liens : LinkedIn, Twitter/X, GitHub, site personnel, email | Aucun |
| **Forme de la photo** | Forme de l'image : cercle, carré, carré arrondi | Cercle |
| **Alignement** | Alignement du contenu : gauche, centre ou droite | Centre |

Pour afficher plusieurs membres d'équipe côte à côte, placez plusieurs blocs Team Members dans une grille.

---

## Progress Bar

Le bloc **Progress Bar** affiche une barre de progression animée avec un pourcentage et un label.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Pourcentage** | Valeur de progression (0 à 100) | 75 |
| **Label** | Texte descriptif affiché au-dessus ou à côté de la barre | "Progression" |
| **Afficher le pourcentage** | Afficher la valeur numérique | Oui |
| **Couleur de la barre** | Couleur de la barre de progression | Couleur primaire du thème |
| **Couleur de fond** | Couleur de l'arrière-plan de la barre | Gris clair |
| **Hauteur** | Hauteur de la barre en pixels | 12 px |
| **Bordure arrondie** | Rayon des coins de la barre | 6 px |
| **Animation** | Animer la barre lors de l'entrée dans le viewport | Oui |
| **Durée de l'animation** | Durée de l'animation en millisecondes | 1500 ms |

---

## Timeline

Le bloc **Timeline** affiche une frise chronologique verticale, adaptée à la présentation d'un historique, d'un parcours ou d'étapes successives.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Événements** | Liste d'événements avec date, titre et description | 3 événements |
| **Position** | Disposition : alternée (gauche/droite), gauche uniquement ou droite uniquement | Alternée |
| **Style des marqueurs** | Apparence des points de la frise : cercle, icône ou nombre | Cercle |
| **Couleur de la ligne** | Couleur de la ligne verticale de la frise | Gris |
| **Couleur des marqueurs** | Couleur des points ou icônes | Couleur primaire du thème |
| **Animation** | Animer l'apparition des événements au défilement | Oui |

Chaque événement de la timeline accepte du texte riche pour le champ de description.

---

## TOC (Table of Contents)

Le bloc **TOC** génère automatiquement une table des matières à partir des blocs Heading présents sur la page.

### Paramètres

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Niveaux détectés** | Niveaux de titres inclus (H1-H6) | H2 et H3 |
| **Style** | Apparence : liste simple, liste numérotée, liste avec points | Liste simple |
| **Titre** | Titre affiché au-dessus de la table des matières | "Sommaire" |
| **Position fixe** | La table des matières reste visible lors du défilement (sticky) | Non |
| **Surlignage actif** | Le titre actuellement visible dans le viewport est mis en surbrillance | Oui |
| **Défilement fluide** | Animation de défilement lors du clic sur un lien | Oui |

La table des matières se met à jour automatiquement lorsque des titres sont ajoutés, modifiés ou supprimés dans le Page Builder.

:::tip[Conseil]
Placez le bloc TOC dans une colonne latérale d'une grille avec l'option de position fixe activée pour créer une navigation latérale qui suit le visiteur lors du défilement.
:::
