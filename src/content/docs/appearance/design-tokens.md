---
title: "Design Tokens"
description: "Systeme de design tokens d'ArtisanCMS : modele DesignToken, types de tokens, gestion via DesignTokenService et editeur d'administration pour une coherence visuelle globale."
---

Les design tokens constituent le socle du systeme de design d'ArtisanCMS. Ils definissent les valeurs fondamentales (couleurs, typographie, espacements) qui sont appliquees de maniere coherente sur l'ensemble du site.

## Concept

Un design token est une valeur de design nommee et reutilisable. Plutot que de definir des couleurs ou des tailles en dur dans chaque composant, ArtisanCMS centralise ces valeurs dans un systeme de tokens. Modifier un token met a jour automatiquement tous les elements qui l'utilisent.

## Modele DesignToken

Le modele **DesignToken** represente un token en base de donnees. Chaque token possede :

- **name** : identifiant unique du token (ex. `color-primary`, `font-size-base`)
- **type** : categorie du token (couleur, typographie, espacement, ombre, bordure)
- **value** : la valeur CSS associee
- **description** : description de l'usage prevu du token

## Types de tokens

Les tokens sont organises en cinq categories :

### Couleurs

Les tokens de couleur definissent la palette chromatique du site :

| Token | Description | Exemple |
|---|---|---|
| `color-primary` | Couleur principale de la marque | `#3B82F6` |
| `color-secondary` | Couleur secondaire | `#6366F1` |
| `color-accent` | Couleur d'accentuation | `#F59E0B` |
| `color-background` | Arriere-plan principal | `#FFFFFF` |
| `color-text` | Couleur de texte par defaut | `#1F2937` |
| `color-muted` | Texte attenue | `#6B7280` |

### Typographie

Les tokens typographiques controlent les polices et les tailles de texte :

| Token | Description | Exemple |
|---|---|---|
| `font-family-base` | Police de corps de texte | `'Inter', sans-serif` |
| `font-family-heading` | Police des titres | `'Plus Jakarta Sans', sans-serif` |
| `font-size-base` | Taille de texte par defaut | `1rem` |
| `font-size-lg` | Texte large | `1.125rem` |
| `line-height-base` | Interlignage par defaut | `1.6` |

### Espacements

Les tokens d'espacement assurent un rythme visuel regulier :

| Token | Description | Exemple |
|---|---|---|
| `spacing-xs` | Espacement extra-petit | `0.25rem` |
| `spacing-sm` | Espacement petit | `0.5rem` |
| `spacing-md` | Espacement moyen | `1rem` |
| `spacing-lg` | Espacement grand | `1.5rem` |
| `spacing-xl` | Espacement extra-grand | `3rem` |

### Ombres

Les tokens d'ombres definissent les niveaux d'elevation :

| Token | Description |
|---|---|
| `shadow-sm` | Ombre legere pour les elements plats |
| `shadow-md` | Ombre moyenne pour les cartes |
| `shadow-lg` | Ombre prononcee pour les elements en surbrillance |

### Bordures

Les tokens de bordure controlent les arrondis et les contours :

| Token | Description | Exemple |
|---|---|---|
| `border-radius-sm` | Arrondi leger | `4px` |
| `border-radius-md` | Arrondi moyen | `8px` |
| `border-radius-lg` | Arrondi prononce | `16px` |
| `border-width` | Epaisseur de bordure par defaut | `1px` |

## DesignTokenService

Le **DesignTokenService** fournit les methodes de gestion des tokens :

- Recuperation de tous les tokens ou filtrage par type
- Creation et mise a jour de tokens
- Generation des variables CSS a partir des tokens actifs
- Reinitialisation aux valeurs par defaut

## Editeur d'administration

Le **DesignTokenController** expose l'interface d'edition des tokens dans le panneau d'administration. L'editeur permet de :

- Visualiser et modifier chaque token par categorie
- Previsualiser les changements en temps reel
- Reinitialiser un token a sa valeur par defaut

## Integration avec le page builder

Les blocs du page builder utilisent les design tokens pour leur rendu. Cela garantit qu'un bloc "Titre" ou "Bouton" respecte automatiquement la palette de couleurs et la typographie definie dans les tokens, sans configuration supplementaire par page.

## StyleBook

La page **StyleBook**, accessible depuis l'administration, affiche un apercu de l'ensemble des tokens appliques a des exemples de composants reels. Elle permet de verifier l'harmonie visuelle globale avant de publier les modifications.

:::note
Les design tokens sont appliques globalement a l'ensemble du site. Pour des personnalisations specifiques a une page, utilisez les options de style disponibles dans chaque bloc du page builder.
:::
