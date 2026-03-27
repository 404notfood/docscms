---
title: "Créer un thème"
description: "Guide complet pour créer un thème ArtisanCMS : structure, manifest, layouts, variables CSS, paramètres de personnalisation et activation."
---

Les thèmes ArtisanCMS contrôlent l'apparence visuelle du site. Chaque thème définit ses layouts, ses variables CSS et ses paramètres de personnalisation. Ce guide détaille la création d'un thème personnalisé.

## Génération avec Artisan

```bash
php artisan cms:theme:create
```

L'assistant interactif demande le nom, le slug, la description et l'auteur du thème. Les fichiers sont générés dans `content/themes/`.

## Structure du thème

```
content/themes/my-theme/
├── theme.json                  # Manifest du thème
├── preview.png                 # Aperçu (1200x900 recommandé)
├── layouts/
│   ├── default.blade.php       # Layout principal
│   ├── blog.blade.php          # Layout blog
│   └── landing.blade.php       # Layout landing page
├── components/
│   └── Header.tsx              # Composants React réutilisables
├── settings/
│   └── theme-settings.json     # Déclaration des paramètres
├── css/
│   └── theme.css               # Styles de base
└── templates/
    └── default_template.json   # Contenu de démonstration
```

## Manifest (theme.json)

```json
{
    "name": "Mon Thème",
    "slug": "my-theme",
    "version": "1.0.0",
    "description": "Un thème moderne et épuré",
    "author": {
        "name": "John Doe",
        "url": "https://example.com"
    },
    "min_cms_version": "1.0.0",
    "default_template": "default_template",
    "supports": ["dark-mode", "custom-colors", "custom-fonts"]
}
```

Le champ `default_template` pointe vers un fichier JSON dans `templates/` qui sera automatiquement importé comme contenu de démonstration lors de l'activation du thème.

## Layouts

Les layouts définissent la structure HTML des pages. Ils utilisent Blade pour le rendu côté serveur.

```blade
{{-- layouts/default.blade.php --}}
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $page->seo_title ?? $page->title }} | {{ $siteName }}</title>
    <link rel="stylesheet" href="{{ $themeCssUrl }}">
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body class="theme-{{ $themeSlug }}">
    @include('themes.' . $themeSlug . '.partials.header')

    <main>
        {!! $content !!}
    </main>

    @include('themes.' . $themeSlug . '.partials.footer')
</body>
</html>
```

### Variables disponibles dans les layouts

| Variable | Type | Description |
|----------|------|-------------|
| `$page` | Page | Objet de la page courante |
| `$siteName` | string | Nom du site |
| `$themeSlug` | string | Slug du thème actif |
| `$themeCssUrl` | string | URL du CSS généré |
| `$content` | string | Contenu rendu de la page |
| `$menus` | Collection | Menus du site |

## Variables CSS et ThemeCssGenerator

ArtisanCMS utilise le `ThemeCssGenerator` pour convertir automatiquement les paramètres du thème en variables CSS. Les administrateurs modifient les couleurs et polices via l'interface, et le CSS est regénéré dynamiquement.

```css
/* CSS généré automatiquement à partir des paramètres */
:root {
    --color-primary: #3b82f6;
    --color-secondary: #10b981;
    --color-accent: #f59e0b;
    --color-background: #ffffff;
    --color-text: #1f2937;
    --font-heading: 'Inter', sans-serif;
    --font-body: 'Open Sans', sans-serif;
    --spacing-base: 1rem;
    --border-radius: 0.5rem;
}
```

Utilisez ces variables dans vos styles :

```css
/* css/theme.css */
.theme-my-theme h1 {
    font-family: var(--font-heading);
    color: var(--color-primary);
}

.theme-my-theme body {
    font-family: var(--font-body);
    color: var(--color-text);
    background-color: var(--color-background);
}
```

## Paramètres du thème

Déclarez les paramètres personnalisables dans `settings/theme-settings.json`.

```json
{
    "sections": [
        {
            "id": "colors",
            "label": "Couleurs",
            "fields": [
                {
                    "id": "primary_color",
                    "type": "color",
                    "label": "Couleur principale",
                    "default": "#3b82f6"
                },
                {
                    "id": "secondary_color",
                    "type": "color",
                    "label": "Couleur secondaire",
                    "default": "#10b981"
                }
            ]
        },
        {
            "id": "typography",
            "label": "Typographie",
            "fields": [
                {
                    "id": "heading_font",
                    "type": "font",
                    "label": "Police des titres",
                    "default": "Inter"
                },
                {
                    "id": "body_font",
                    "type": "font",
                    "label": "Police du texte",
                    "default": "Open Sans"
                }
            ]
        },
        {
            "id": "layout",
            "label": "Mise en page",
            "fields": [
                {
                    "id": "container_width",
                    "type": "select",
                    "label": "Largeur du conteneur",
                    "options": ["960px", "1200px", "1440px", "full"],
                    "default": "1200px"
                }
            ]
        }
    ]
}
```

Les types de champs supportés sont : `color`, `font`, `select`, `text`, `number`, `toggle` et `image`.

## Surcharge des templates par défaut

Un thème peut surcharger les templates du CMS en plaçant des fichiers dans le dossier `layouts/`. Le moteur de rendu cherche d'abord dans le thème actif, puis utilise les templates par défaut.

## Contenu de démonstration

Le fichier `templates/default_template.json` définit les pages et blocs créés automatiquement lors de l'activation.

```json
{
    "pages": [
        {
            "title": "Accueil",
            "slug": "/",
            "layout": "landing",
            "blocks": [
                {
                    "type": "hero",
                    "data": {
                        "title": "Bienvenue",
                        "subtitle": "Un site propulsé par ArtisanCMS"
                    }
                }
            ]
        }
    ]
}
```

## Activation et changement de thème

L'activation d'un thème se fait depuis l'interface d'administration sous **Apparence > Thèmes**. Le changement de thème est instantané (hot-swapping) et ne nécessite aucun redémarrage. Le CSS est regénéré automatiquement à partir des paramètres du nouveau thème.

## Bonnes pratiques

- Utilisez exclusivement les **variables CSS** pour les couleurs et polices afin de respecter la personnalisation utilisateur.
- Fournissez un **aperçu** (`preview.png`) de qualité pour aider les utilisateurs à choisir.
- Incluez un **contenu de démonstration** pertinent pour illustrer les capacités du thème.
- Testez votre thème en mode sombre si vous déclarez le support `dark-mode`.
