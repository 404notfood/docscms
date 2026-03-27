---
title: "Templates de site"
description: "Systeme de templates de site d'ArtisanCMS : sites de demonstration pre-configures, installation, structure des templates et personnalisation."
---

Les templates de site sont des configurations completes pre-construites qui permettent de demarrer un nouveau projet avec un site fonctionnel en quelques clics. Ils incluent des pages, des articles, des menus, des medias et des reglages prets a l'emploi.

## Concept

Un template de site est un ensemble coherent de contenus et de configurations qui constitue un site de demonstration complet. Contrairement a un theme qui ne modifie que l'apparence, un template importe du contenu reel : pages, articles de blog, menus de navigation, images et parametres du site.

## Templates inclus

ArtisanCMS est livre avec plus de 5 templates couvrant differents cas d'usage :

| Template | Description |
|---|---|
| **Starter** | Site vitrine minimaliste, ideal pour debuter |
| **Blog** | Blog complet avec categories, tags et barre laterale |
| **Portfolio** | Site portfolio pour creatifs et freelances |
| **Corporate** | Site d'entreprise avec sections equipe, services, contact |
| **Landing** | Page d'atterrissage optimisee pour la conversion |

Chaque template est concu pour etre fonctionnel des l'installation et entierement personnalisable par la suite.

## Architecture

### TemplateService

Le **TemplateService** gere les operations liees aux templates :

- Listage des templates disponibles avec leurs metadonnees
- Installation d'un template (importation de toutes les donnees)
- Verification des dependances et de la compatibilite
- Nettoyage des donnees existantes avant installation (optionnel)

### TemplateController

Le **TemplateController** expose l'interface d'administration pour :

- Parcourir la galerie de templates disponibles
- Previsualiser un template avant installation
- Lancer l'installation d'un template
- Verifier le statut de l'installation en cours

## Structure d'un template

Les templates sont stockes dans le repertoire `content/templates/`. Chaque template suit une structure definie :

```
content/templates/starter/
├── template.json       # Manifeste du template
├── pages/
│   ├── home.json       # Page d'accueil avec blocs du page builder
│   ├── about.json      # Page A propos
│   └── contact.json    # Page Contact
├── posts/
│   ├── post-1.json     # Article de demonstration
│   └── post-2.json     # Article de demonstration
├── menus/
│   └── main.json       # Menu de navigation principal
├── media/
│   ├── hero.jpg        # Images de demonstration
│   └── ...
└── settings/
    └── site.json       # Parametres du site (titre, description, etc.)
```

### Manifeste template.json

Le fichier `template.json` contient les metadonnees du template :

```json
{
  "name": "Starter",
  "version": "1.0.0",
  "description": "Site vitrine minimaliste pour debuter",
  "author": "ArtisanCMS",
  "preview": "preview.png",
  "theme": "default",
  "requires": {
    "cms": ">=1.0.0",
    "plugins": []
  },
  "contents": {
    "pages": 3,
    "posts": 2,
    "menus": 1,
    "media": 5
  }
}
```

## Processus d'installation

L'installation d'un template suit un processus sequentiel :

1. **Verification** : le systeme verifie la compatibilite du template avec la version du CMS et les plugins requis
2. **Import des medias** : les images et fichiers sont copies dans la mediatheque
3. **Import des pages** : les pages sont creees avec leur structure de blocs du page builder
4. **Import des articles** : les articles de blog sont crees avec leurs categories et tags
5. **Import des menus** : les menus de navigation sont configures
6. **Application des parametres** : les reglages du site sont mis a jour (titre, description, etc.)

Le processus d'installation peut etre execute sur un site vierge ou sur un site existant. Dans ce dernier cas, le contenu existant est conserve et le contenu du template est ajoute.

## Lien avec les themes

Un theme peut declarer un `default_template` dans son manifeste. Lorsque ce theme est installe, le CMS propose automatiquement d'installer le template associe. Cela permet aux createurs de themes de fournir un contenu de demonstration adapte a leur design.

## Creer un template personnalise

Pour creer votre propre template :

1. Creez un repertoire dans `content/templates/` avec le slug de votre template
2. Redigez le fichier `template.json` avec les metadonnees
3. Exportez vos pages, articles et menus au format JSON
4. Ajoutez les fichiers media necessaires
5. Testez l'installation sur une instance propre

:::note
Les templates sont un outil de demarrage rapide. Apres installation, le contenu importe est entierement independant du template et peut etre modifie librement sans affecter le template source.
:::
