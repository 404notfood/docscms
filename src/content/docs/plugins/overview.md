---
title: "Systeme de plugins"
description: "Architecture du systeme de plugins d'ArtisanCMS : PluginManager, manifeste, cycle de vie, hooks/filtres, migrations automatiques et administration."
---

Le systeme de plugins d'ArtisanCMS permet d'etendre les fonctionnalites du CMS sans modifier son code source. Chaque plugin est un module autonome qui peut ajouter des routes, des modeles, des pages d'administration, des blocs de page builder et bien plus.

## Architecture

Le coeur du systeme repose sur le **PluginManager**, situe dans `app/CMS/Plugins/`. Il est responsable de :

- La decouverte et le chargement des plugins installes
- La gestion du cycle de vie (installation, activation, desactivation, desinstallation)
- La resolution des dependances entre plugins
- L'enregistrement des Service Providers de chaque plugin

## Manifeste artisan-plugin.json

Chaque plugin declare ses metadonnees dans un fichier `artisan-plugin.json` a sa racine :

```json
{
  "name": "Mon Plugin",
  "slug": "mon-plugin",
  "version": "1.0.0",
  "description": "Description du plugin",
  "author": {
    "name": "Nom de l'auteur",
    "url": "https://example.com"
  },
  "dependencies": [],
  "settings": {
    "option_1": {
      "type": "string",
      "default": "valeur par defaut",
      "label": "Option 1"
    }
  }
}
```

Les parametres declares dans `settings` sont automatiquement herités par le systeme et accessibles via l'interface de configuration du plugin.

## Structure d'un plugin

Un plugin suit une structure conventionnelle :

```
content/plugins/mon-plugin/
├── artisan-plugin.json    # Manifeste du plugin
├── src/
│   └── MonPluginServiceProvider.php  # Point d'entree Laravel
├── database/
│   └── migrations/        # Migrations de base de donnees
├── routes/
│   ├── web.php            # Routes web du plugin
│   └── api.php            # Routes API du plugin
├── resources/
│   └── js/
│       └── Pages/         # Pages React pour l'administration
└── config/
    └── mon-plugin.php     # Configuration Laravel du plugin
```

### Service Provider

Le Service Provider est le point d'entree du plugin dans l'ecosysteme Laravel. Il enregistre les routes, les vues, les migrations, les commandes et les bindings du conteneur de services.

## Cycle de vie

Un plugin passe par plusieurs etats au cours de son existence :

```
load → install → activate → deactivate → uninstall
```

| Etape | Description |
|---|---|
| **Load** | Le PluginManager decouvre le plugin dans le repertoire des plugins |
| **Install** | Les migrations sont executees et les fichiers de configuration sont publies |
| **Activate** | Le Service Provider est enregistre, les routes et hooks sont actifs |
| **Deactivate** | Le plugin est desactive sans supprimer ses donnees |
| **Uninstall** | Les migrations sont annulees et les donnees du plugin sont supprimees |

### Migrations automatiques

Lors de l'activation d'un plugin, le PluginManager detecte et execute automatiquement les migrations presentes dans le repertoire `database/migrations/` du plugin. De meme, la desinstallation annule ces migrations dans l'ordre inverse.

## Hooks et filtres

Les plugins peuvent s'integrer au CMS via le systeme de hooks et filtres :

- **Hooks (actions)** : permettent d'executer du code a des points specifiques (ex. apres la creation d'un article, avant le rendu d'une page)
- **Filtres** : permettent de modifier des donnees en transit (ex. modifier le titre d'une page, ajouter des champs a un formulaire)

Ce mecanisme permet aux plugins de collaborer entre eux et avec le coeur du CMS sans couplage fort.

## Cache

Le **PluginObserver** surveille les changements d'etat des plugins et invalide le cache associe. La liste des plugins actifs est mise en cache pour eviter de scanner le systeme de fichiers a chaque requete.

## Administration

### PluginController

Le **PluginController** expose l'interface de gestion des plugins :

- Liste des plugins installes avec leur statut
- Installation de nouveaux plugins
- Activation et desactivation
- Desinstallation

### PluginSettingsController

Le **PluginSettingsController** gere les parametres individuels de chaque plugin. Les champs de configuration sont generes dynamiquement a partir du manifeste `artisan-plugin.json`.

## Plugins officiels

ArtisanCMS est livre avec 7 plugins officiels :

| Plugin | Description |
|---|---|
| **SEO** | Sitemap, meta tags, Open Graph, analyse SEO |
| **E-commerce** | Boutique complete avec paiements et gestion de stock |
| **Formulaires** | Constructeur de formulaires visuel |
| **Assistant IA** | Generation de contenu avec OpenAI et Anthropic |
| **Sauvegarde** | Sauvegardes automatisees et restauration |
| **Espace membres** | Abonnements, profils et contenu restreint |
| **Formulaire de contact** | Formulaire de contact preconfigure |

:::tip[Pour aller plus loin]
Chaque plugin officiel dispose de sa propre page de documentation detaillee dans cette section.
:::
