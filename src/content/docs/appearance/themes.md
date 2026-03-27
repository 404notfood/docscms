---
title: "Themes"
description: "Gestion des themes dans ArtisanCMS : modele CmsTheme, ThemeManager, structure des themes, variables CSS, activation et creation de themes personnalises."
---

Le systeme de themes d'ArtisanCMS permet de modifier l'apparence complete de votre site sans toucher au contenu. Les themes controlent les layouts, les couleurs, la typographie et l'ensemble du rendu visuel.

## Architecture

Le coeur du systeme repose sur deux composants principaux situes dans `app/CMS/Themes/` :

- **CmsTheme** : le modele Eloquent qui represente un theme en base de donnees. Il stocke le nom, la description, le statut (actif/inactif), les parametres de personnalisation et la reference au template par defaut.
- **ThemeManager** : le service central qui gere le chargement, l'activation et la resolution des themes. Il determine quel theme est actif et fournit l'acces a ses fichiers et parametres.

## Structure d'un theme

Les themes sont stockes dans le repertoire `content/themes/`. Chaque theme suit une structure conventionnelle :

```
content/themes/mon-theme/
├── theme.json            # Manifeste du theme (nom, version, auteur, parametres)
├── layouts/
│   ├── default.blade.php # Layout principal
│   ├── blog.blade.php    # Layout pour les articles
│   └── landing.blade.php # Layout page d'atterrissage
├── css/
│   └── variables.css     # Variables CSS personnalisees
├── overrides/
│   └── ...               # Surcharges de composants
└── preview.png           # Apercu du theme pour l'administration
```

### Manifeste theme.json

Le fichier `theme.json` declare les metadonnees et les options du theme :

```json
{
  "name": "Mon Theme",
  "version": "1.0.0",
  "author": "Nom de l'auteur",
  "description": "Description du theme",
  "default_template": "starter",
  "settings": {
    "primary_color": "#3B82F6",
    "font_family": "Inter",
    "border_radius": "8px"
  }
}
```

La propriete `default_template` permet au theme de declarer un template de site qui sera propose automatiquement lors de l'installation.

## Variables CSS et generation de styles

Le **ThemeCssGenerator** transforme les parametres du theme en variables CSS applicables a l'ensemble du site. Lorsqu'un administrateur modifie une couleur ou une police dans l'editeur de theme, le generateur produit une feuille de style a jour.

Les variables CSS generees suivent une convention de nommage coherente :

```css
:root {
  --theme-primary: #3B82F6;
  --theme-font-family: 'Inter', sans-serif;
  --theme-border-radius: 8px;
  --theme-spacing-base: 1rem;
}
```

Ces variables sont ensuite utilisees par les layouts et les blocs du page builder pour assurer une coherence visuelle sur tout le site.

## Layouts interchangeables

Chaque theme peut fournir plusieurs layouts. Les layouts sont **hot-swappable** : il est possible de changer le layout d'une page sans perdre son contenu. Le ThemeManager resout dynamiquement le layout a utiliser en fonction de la page, du type de contenu et de la configuration.

## Activation et desactivation

La gestion des themes s'effectue depuis l'interface d'administration via le **ThemeController** (`Admin/ThemeController`). Les actions disponibles sont :

| Action | Description |
|---|---|
| **Activer** | Definit le theme comme theme courant du site |
| **Desactiver** | Revient au theme par defaut |
| **Configurer** | Ouvre l'editeur de parametres du theme |
| **Previsualiser** | Affiche un apercu du theme sans l'activer |

Un seul theme peut etre actif a la fois. Le changement de theme est instantane et n'affecte pas le contenu existant.

## Cache et performances

Le **ThemeObserver** surveille les modifications apportees aux themes et invalide automatiquement le cache associe. Cela garantit que toute modification de parametres, de layout ou de style est immediatement refletee sur le site, sans intervention manuelle.

Les fichiers CSS generes sont mis en cache et ne sont recalcules que lorsqu'un parametre du theme est modifie.

## Creer un theme personnalise

Pour creer un theme personnalise :

1. Creez un nouveau repertoire dans `content/themes/` avec le nom de votre theme.
2. Ajoutez un fichier `theme.json` avec les metadonnees et les parametres par defaut.
3. Creez au moins un layout dans le dossier `layouts/`.
4. Definissez vos variables CSS dans `css/variables.css`.
5. Ajoutez une image `preview.png` pour l'apercu dans l'administration.

:::tip[Pour aller plus loin]
Consultez le guide developpeur pour une documentation detaillee sur la creation de themes avances, incluant les surcharges de composants, les hooks de theme et l'integration avec le page builder.
:::
