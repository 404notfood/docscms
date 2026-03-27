---
title: "Blocs de mise en page"
description: "Documentation détaillée des blocs de mise en page du Page Builder : Section, Grid, Spacer, Divider et Shape Divider."
---

Les blocs de mise en page forment l'ossature de chaque page construite avec le Page Builder. Ils définissent la structure visuelle et organisent les blocs de contenu, média et autres composants.

---

## Section

Le bloc **Section** est le conteneur principal du Page Builder. Chaque page est composée d'une ou plusieurs sections empilées verticalement. Une section occupe toute la largeur de la page et peut contenir des grilles, des blocs de contenu ou d'autres sections imbriquées.

### Options de fond

La section propose plusieurs types de fond, configurables depuis le panneau de paramètres :

| Option | Description |
|---|---|
| **Couleur unie** | Sélection d'une couleur de fond via un sélecteur colorimétrique. Supporte la transparence (RGBA). |
| **Dégradé** | Dégradé linéaire ou radial avec deux couleurs ou plus, angle et position configurables. |
| **Image** | Image de fond issue de la bibliothèque de médias. Options de positionnement, taille (cover, contain, auto), répétition et point focal. |
| **Vidéo** | Vidéo de fond en lecture automatique, muette et en boucle. Un fond de repli (couleur ou image) est affiché pendant le chargement. |

### Espacement

L'espacement de la section est configurable de manière indépendante pour chaque viewport :

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Padding supérieur** | Espace interne en haut de la section | 60 px |
| **Padding inférieur** | Espace interne en bas de la section | 60 px |
| **Padding latéral** | Espace interne à gauche et à droite | 20 px |
| **Margin supérieure** | Espace externe au-dessus de la section | 0 px |
| **Margin inférieure** | Espace externe en dessous de la section | 0 px |

Les valeurs de padding et de margin peuvent être ajustées séparément pour les viewports desktop, tablette et mobile.

### Largeur et mise en page

| Propriété | Description |
|---|---|
| **Largeur maximale** | Limite la largeur du contenu interne de la section (par exemple 1200 px). Le fond reste en pleine largeur. |
| **Pleine largeur** | Lorsque cette option est activée, le contenu de la section s'étend sur toute la largeur de l'écran, sans contrainte de largeur maximale. |
| **Alignement du contenu** | Alignement horizontal du contenu interne : gauche, centre ou droite. |

### Options avancées

| Propriété | Description |
|---|---|
| **ID HTML** | Identifiant HTML personnalisé pour le ciblage par ancre ou par CSS. |
| **Classes CSS** | Classes CSS supplémentaires appliquées à la section. |
| **Overflow masqué** | Masque le contenu qui déborde de la section. Utile avec les Shape Dividers. |
| **Z-index** | Ordre d'empilement de la section par rapport aux sections adjacentes. |

---

## Grid

Le bloc **Grid** crée une grille multi-colonnes à l'intérieur d'une section. Il permet d'organiser les blocs de contenu côte à côte avec un contrôle précis de la répartition de l'espace.

### Configuration des colonnes

| Propriété | Description |
|---|---|
| **Nombre de colonnes** | De 1 à 6 colonnes. Chaque colonne peut contenir un ou plusieurs blocs. |
| **Répartition** | Largeurs relatives des colonnes. Exemples : `1/1` (égales), `2/1` (deux tiers + un tiers), `1/2/1` (latérales étroites). |
| **Templates prédéfinis** | Choix rapide parmi des dispositions courantes : 50/50, 33/33/33, 25/50/25, 70/30, etc. |

### Comportement responsive

La grille s'adapte automatiquement aux différents viewports. Le comportement est configurable pour chaque taille d'écran :

| Viewport | Comportement par défaut | Personnalisable |
|---|---|---|
| **Desktop** | Affiche toutes les colonnes selon la répartition définie | Oui |
| **Tablette** | Empile les colonnes par groupes de 2 | Oui |
| **Mobile** | Empile toutes les colonnes verticalement | Oui |

Il est possible de définir un nombre de colonnes spécifique pour chaque viewport. Par exemple, une grille de 4 colonnes sur desktop peut afficher 2 colonnes sur tablette et 1 colonne sur mobile.

### Espacement

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Gap horizontal** | Espace entre les colonnes | 20 px |
| **Gap vertical** | Espace entre les lignes (lorsque les colonnes s'empilent) | 20 px |

Les valeurs de gap sont configurables par viewport.

### Alignement

| Propriété | Description |
|---|---|
| **Alignement vertical** | Alignement des blocs dans les colonnes : haut, centre, bas ou étirement. |
| **Alignement horizontal** | Alignement du contenu à l'intérieur de chaque colonne : gauche, centre ou droite. |

---

## Spacer

Le bloc **Spacer** insère un espace vertical vide entre deux blocs. Il permet de contrôler précisément l'espacement sans modifier les marges des blocs adjacents.

### Configuration

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Hauteur desktop** | Hauteur de l'espace sur les écrans larges | 40 px |
| **Hauteur tablette** | Hauteur de l'espace sur tablette | 30 px |
| **Hauteur mobile** | Hauteur de l'espace sur mobile | 20 px |

La hauteur est définie en pixels et peut être ajustée indépendamment pour chaque viewport. Dans l'éditeur, le Spacer est représenté par une zone pointillée indiquant la hauteur configurée.

:::tip[Conseil]
Préférez le Spacer aux marges personnalisées lorsque vous avez besoin d'un espacement cohérent entre des blocs de types différents. Cela facilite les ajustements ultérieurs.
:::

---

## Divider

Le bloc **Divider** affiche une ligne de séparation horizontale entre deux blocs. Il permet de créer une rupture visuelle dans le contenu.

### Options de style

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Style de trait** | Apparence de la ligne : solide, pointillé ou tirets | Solide |
| **Couleur** | Couleur de la ligne via le sélecteur colorimétrique | Gris clair (`#e5e7eb`) |
| **Épaisseur** | Épaisseur de la ligne en pixels | 1 px |
| **Largeur** | Largeur de la ligne en pourcentage de son conteneur | 100 % |
| **Alignement** | Alignement horizontal de la ligne : gauche, centre ou droite | Centre |

### Espacement

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Marge supérieure** | Espace au-dessus de la ligne | 20 px |
| **Marge inférieure** | Espace en dessous de la ligne | 20 px |

### Options avancées

| Propriété | Description |
|---|---|
| **Icône centrale** | Icône optionnelle affichée au centre de la ligne de séparation. |
| **Texte central** | Texte court affiché au centre de la ligne (alternatif à l'icône). |

---

## Shape Divider

Le bloc **Shape Divider** ajoute un séparateur décoratif en SVG entre deux sections. Il permet de créer des transitions visuelles élaborées au lieu de simples lignes droites.

### Formes disponibles

Le Shape Divider propose plusieurs formes prédéfinies :

| Forme | Description |
|---|---|
| **Vagues** | Ligne ondulée simple ou multiple. |
| **Triangles** | Forme en dents de scie ou en flèche. |
| **Courbe** | Arc régulier concave ou convexe. |
| **Inclinaison** | Ligne diagonale droite créant un effet de pente. |
| **Zigzag** | Motif en zigzag régulier. |
| **Gouttes** | Forme organique irrégulière. |

### Configuration

| Propriété | Description | Valeur par défaut |
|---|---|---|
| **Position** | Placement du séparateur : haut ou bas de la section | Bas |
| **Forme** | Choix de la forme SVG parmi les options disponibles | Vagues |
| **Couleur** | Couleur de remplissage du SVG. Généralement la couleur de fond de la section adjacente. | Blanc (`#ffffff`) |
| **Hauteur** | Hauteur du séparateur en pixels | 80 px |
| **Largeur** | Étirement horizontal en pourcentage (100 % à 300 %) | 100 % |
| **Retourner horizontalement** | Inverse la forme sur l'axe horizontal | Non |
| **Retourner verticalement** | Inverse la forme sur l'axe vertical | Non |

### Bonnes pratiques

Pour obtenir une transition fluide entre deux sections :

1. Placer le Shape Divider en **bas** de la première section ou en **haut** de la deuxième section.
2. Définir la **couleur** du Shape Divider sur la couleur de fond de la section adjacente.
3. Activer l'option **Overflow masqué** sur la section contenant le Shape Divider pour éviter les débordements visuels.
4. Ajuster la **hauteur** en fonction de la résolution cible. Une hauteur de 60 à 100 px convient à la plupart des cas.

:::note
Le Shape Divider est un bloc enfant de la Section. Il ne peut pas être placé de manière autonome en dehors d'une section.
:::
