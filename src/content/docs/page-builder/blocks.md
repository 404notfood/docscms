---
title: "Blocs disponibles"
description: "Vue d'ensemble des 39 types de blocs du Page Builder d'ArtisanCMS, organisés par catégorie : mise en page, contenu, média, e-commerce, marketing et formulaires."
---

Le Page Builder d'ArtisanCMS propose **39 types de blocs** couvrant l'ensemble des besoins de construction de pages web. Chaque bloc est conçu pour être configuré visuellement, sans écriture de code.

## Organisation par catégorie

Les blocs sont répartis en six catégories dans le panneau d'insertion :

| Catégorie | Nombre de blocs | Description |
|---|:---:|---|
| [Mise en page](#mise-en-page) | 5 | Structure et organisation de la page |
| [Contenu](#contenu) | 18 | Texte, titres, boutons et composants éditoriaux |
| [Média](#média) | 6 | Images, vidéos, galeries et contenus embarqués |
| [E-commerce](#e-commerce) | 5 | Produits, panier et paiement |
| [Marketing](#marketing) | 3 | Témoignages, tarifs et appels à l'action |
| [Formulaires](#formulaires) | 2 | Construction et intégration de formulaires |

---

## Mise en page

Les blocs de mise en page définissent la structure visuelle de la page. Ils servent de conteneurs pour les autres blocs.

| Bloc | Description |
|---|---|
| **Section** | Conteneur principal pleine largeur avec options de fond (couleur, image, vidéo), espacement et largeur maximale. |
| **Grid** | Grille multi-colonnes (1 à 6 colonnes) avec points de rupture responsive et contrôle de l'espacement. |
| **Spacer** | Espacement vertical configurable par viewport (desktop, tablette, mobile). |
| **Divider** | Ligne de séparation horizontale avec options de style (solide, pointillé, tirets), couleur et épaisseur. |
| **Shape Divider** | Séparateur décoratif SVG (vagues, triangles, courbes) placé en haut ou en bas d'une section. |

:::note
Pour une documentation détaillée de chaque bloc de mise en page, consultez la page [Blocs de mise en page](/page-builder/layout-blocks/).
:::

---

## Contenu

Les blocs de contenu permettent de rédiger et de structurer le contenu éditorial de la page.

| Bloc | Description |
|---|---|
| **Heading** | Titre de niveau H1 à H6 avec alignement, couleur et typographie configurable. |
| **Text** | Éditeur de texte riche basé sur TipTap avec mise en forme, liens et listes. |
| **Button** | Bouton avec lien, variantes de style, icône optionnelle et choix de taille. |
| **Hero** | Section d'en-tête avec titre, sous-titre, appel à l'action et fond image/vidéo. |
| **Accordion** | Sections dépliantes avec titre et contenu masqué par défaut. |
| **Tabs** | Contenu organisé en onglets navigables. |
| **Counter** | Compteur animé avec valeur de départ, valeur cible et durée d'animation. |
| **Icon Box** | Carte composée d'une icône, d'un titre et d'une description. |
| **Table** | Tableau de données avec en-têtes, lignes et options de style. |
| **Alert** | Message d'alerte avec quatre variantes : information, avertissement, erreur et succès. |
| **Countdown** | Compte à rebours basé sur une date cible avec affichage jours/heures/minutes/secondes. |
| **Code Block** | Bloc de code source avec coloration syntaxique et sélection du langage. |
| **Blockquote** | Citation stylisée avec texte, auteur et source optionnels. |
| **List** | Liste ordonnée ou non ordonnée avec icônes personnalisables. |
| **Team Members** | Carte de membre d'équipe : photo, nom, rôle et liens vers les réseaux sociaux. |
| **Progress Bar** | Barre de progression animée avec pourcentage et label. |
| **Timeline** | Frise chronologique verticale avec événements datés. |
| **TOC** | Table des matières générée automatiquement à partir des titres de la page. |

:::note
Pour une documentation détaillée de chaque bloc de contenu, consultez la page [Blocs de contenu](/page-builder/content-blocks/).
:::

---

## Média

Les blocs média permettent d'intégrer des éléments visuels et multimédias.

| Bloc | Description |
|---|---|
| **Image** | Image issue de la bibliothèque de médias avec texte alternatif, légende, lien et lightbox. |
| **Video** | Vidéo uploadée ou embarquée (YouTube/Vimeo) avec lecture automatique, boucle et image de couverture. |
| **Gallery / Carousel** | Galerie d'images en mode grille ou carrousel avec lightbox et légendes. |
| **Map** | Carte interactive OpenStreetMap ou Google Maps avec adresse, coordonnées et marqueurs. |
| **Logo Grid** | Grille de logos avec colonnes configurables, option niveaux de gris et liens. |
| **Embed** | Contenu embarqué via oEmbed : YouTube, Vimeo, Twitter et autres services compatibles. |

:::note
Pour une documentation détaillée de chaque bloc média, consultez la page [Blocs média](/page-builder/media-blocks/).
:::

---

## E-commerce

Les blocs e-commerce sont disponibles lorsque le plugin officiel ArtisanCommerce est activé. Ils permettent d'intégrer des éléments de boutique directement dans les pages.

| Bloc | Description |
|---|---|
| **Product Card** | Carte produit individuelle avec image, nom, prix et bouton d'ajout au panier. |
| **Product Grid** | Grille de produits filtrable par catégorie, tag ou collection. |
| **Featured Products** | Sélection manuelle de produits mis en avant avec mise en page personnalisable. |
| **Cart Widget** | Mini-panier intégrable affichant le résumé du panier et un lien vers la page de paiement. |
| **Checkout Form** | Formulaire de paiement complet avec intégration Stripe. |

Les blocs e-commerce récupèrent dynamiquement les données produit (prix, disponibilité, images) depuis la base de données. Ils se mettent à jour automatiquement lorsque les informations produit changent.

---

## Marketing

Les blocs marketing sont conçus pour la conversion et la mise en valeur de l'offre commerciale.

| Bloc | Description |
|---|---|
| **Testimonials** | Carrousel ou grille de témoignages clients avec photo, nom, entreprise et citation. |
| **Pricing Table** | Tableau comparatif de tarifs avec colonnes de plans, fonctionnalités et boutons d'action. |
| **CTA** | Bloc d'appel à l'action avec titre, description et bouton proéminent. |

---

## Formulaires

Les blocs de formulaires permettent de créer et d'intégrer des formulaires de contact ou de collecte de données.

| Bloc | Description |
|---|---|
| **Form Builder** | Constructeur de formulaire visuel avec champs drag & drop (texte, email, textarea, select, checkbox, radio, file upload). |
| **Form Embed** | Intégration d'un formulaire existant créé depuis le gestionnaire de formulaires. |

Les formulaires soumis sont stockés en base de données et accessibles depuis l'administration. Des notifications par email peuvent être configurées pour chaque formulaire.

---

## Structure technique des blocs

Chaque bloc est composé de deux fichiers situés dans `resources/js/Components/builder/blocks/` :

```
resources/js/Components/builder/blocks/
├── HeadingBlock/
│   ├── HeadingRenderer.tsx    # Composant de prévisualisation et rendu
│   └── HeadingSettings.tsx    # Panneau de paramètres
├── TextBlock/
│   ├── TextRenderer.tsx
│   └── TextSettings.tsx
├── ImageBlock/
│   ├── ImageRenderer.tsx
│   └── ImageSettings.tsx
└── ...
```

### Renderer

Le composant Renderer assure le rendu visuel du bloc dans l'éditeur et sur le site publié. Il reçoit les propriétés du bloc et génère le HTML correspondant.

### Settings

Le composant Settings affiche le panneau de paramètres lorsque le bloc est sélectionné dans l'éditeur. Il permet de modifier les propriétés du bloc (texte, couleurs, espacement, options spécifiques) via des contrôles visuels.

### Enregistrement d'un bloc

Chaque bloc est enregistré dans le registre central des blocs avec ses métadonnées :

- **type** : identifiant unique du bloc.
- **label** : nom affiché dans le panneau d'insertion.
- **category** : catégorie de regroupement.
- **icon** : icône affichée dans le panneau d'insertion.
- **defaultProps** : propriétés par défaut lors de l'insertion.

:::tip[Prochaine étape]
Explorez les pages de documentation dédiées à chaque catégorie pour découvrir les options de configuration détaillées de chaque bloc.
:::
