---
title: "Présentation d'ArtisanCMS"
description: "Découvrez ArtisanCMS, le CMS open-source moderne construit avec Laravel 13, React 19 et Inertia 2. Une alternative performante et extensible à WordPress, Joomla et Drupal."
---

ArtisanCMS est un système de gestion de contenu (CMS) open-source de nouvelle génération. Conçu pour répondre aux exigences des projets web modernes, il combine un backend robuste avec une interface d'administration réactive et intuitive.

## Pourquoi ArtisanCMS ?

Les CMS traditionnels comme WordPress, Joomla ou Drupal ont été conçus il y a plus de 15 ans. Malgré leurs évolutions, ils trainent un héritage technique qui impacte la performance, la sécurité et l'expérience développeur.

ArtisanCMS part d'une feuille blanche pour offrir :

- **Un stack technique moderne** : Laravel 13, React 19, Inertia 2, shadcn/ui et Tailwind CSS v4.
- **Une expérience sans code pour les utilisateurs finaux** : page builder visuel, gestion de contenu intuitive, personnalisation graphique complète.
- **Un accès total au code pour les développeurs** : hooks/filtres, plugins, thèmes, API REST, commandes CLI.
- **Des performances natives** : pas de couche de plugins lourde, cache multi-niveaux, optimisation d'images intégrée.

## Principes fondateurs

### Performance

Chaque composant est optimisé : cache intelligent avec invalidation automatique, images WebP générées à la volée, lazy loading natif, jobs asynchrones pour les tâches lourdes. Le résultat est un CMS qui charge rapidement, même avec un contenu riche.

### Sécurité

La sécurité est intégrée dès la conception : validation stricte des entrées, policies granulaires sur chaque ressource, headers de sécurité configurés par défaut, audit trail complet, signature HMAC des webhooks et protection CSRF native de Laravel.

### Extensibilité

Le système de plugins repose sur les Service Providers de Laravel et un mécanisme de hooks/filtres inspiré de WordPress mais modernisé. Chaque plugin peut étendre le backend, l'interface d'administration et les fonctionnalités frontend sans modifier le coeur du CMS.

### Simplicité

L'interface d'administration est pensée pour être utilisée sans formation technique. Le page builder fonctionne en glisser-déposer, les paramètres sont organisés de manière logique et chaque action offre un feedback visuel immédiat.

## Public cible

ArtisanCMS s'adresse à trois profils principaux :

| Profil | Besoin | Ce qu'offre ArtisanCMS |
|---|---|---|
| **Développeurs** | Un CMS avec un stack moderne, testable et extensible | Laravel + React + TypeScript, architecture propre, hooks/filtres, CLI |
| **Agences web** | Un outil productif pour livrer des sites clients rapidement | Page builder, multi-site, white-label, templates de site, plugins officiels |
| **Entreprises** | Un CMS fiable, sécurisé et évolutif | Permissions granulaires, audit trail, multi-langue, e-commerce intégré |

## Comparaison avec les CMS existants

| Critère | ArtisanCMS | WordPress | Joomla | Drupal |
|---|:---:|:---:|:---:|:---:|
| **Stack technique** | Laravel 13 + React 19 | PHP procédural | PHP (MVC partiel) | PHP (Symfony) |
| **Interface admin** | React SPA (Inertia) | jQuery + blocs React | jQuery + Bootstrap | jQuery + Twig |
| **Page Builder** | Natif (39 blocs) | Gutenberg (plugin) | Aucun natif | Aucun natif |
| **Typage** | TypeScript + PHP strict | Non | Non | Partiel |
| **Multi-site natif** | Oui | Partiel (WordPress Multisite) | Non | Non |
| **E-commerce** | Plugin officiel intégré | WooCommerce (lourd) | VirtueMart | Drupal Commerce |
| **SEO** | Plugin officiel | Yoast/RankMath (tiers) | Extensions tierces | Extensions tierces |
| **Performance** | Cache multi-couches natif | Plugins de cache requis | Plugins de cache requis | Cache intégré |
| **Bloat plugins** | Architecture légère | Dépendance forte aux plugins | Modéré | Modéré |
| **API REST** | Intégrée | Intégrée (v2) | Intégrée | Intégrée |
| **Gestion des rôles** | 40+ permissions granulaires | 5 rôles fixes | ACL flexible | Permissions granulaires |
| **White-label** | Natif | Plugins tiers | Non | Non |

## Architecture en bref

ArtisanCMS adopte une architecture monorepo hybride :

```
artisancms/
├── app/               # Backend Laravel (Controllers, Models, Services, CMS Core)
├── resources/js/      # Frontend React + Inertia (pages admin)
├── packages/          # Packages React partagés (@artisan/ui, @artisan/blocks, ...)
├── plugins/           # Plugins officiels et personnalisés
├── themes/            # Thèmes installés
└── routes/            # Routes web et API
```

Le backend Laravel gère la logique métier, la persistance et la sécurité. Le frontend React, chargé via Inertia, offre une navigation de type SPA sans nécessiter d'API séparée. Les packages partagés (`@artisan/ui`, `@artisan/blocks`, `@artisan/page-builder`, `@artisan/theme-engine`) assurent la cohérence entre l'administration et les thèmes.

:::tip[Prochaine étape]
Consultez la page [Fonctionnalités](/introduction/features/) pour découvrir en détail tout ce qu'ArtisanCMS peut faire, ou passez directement au [guide d'installation](/getting-started/installation/) pour commencer.
:::
