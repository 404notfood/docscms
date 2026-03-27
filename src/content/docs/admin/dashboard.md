---
title: Tableau de bord
description: Tableau de bord d'administration ArtisanCMS - widgets, actions rapides, journal d'activite et notifications systeme.
---

Le tableau de bord est la page d'accueil de l'interface d'administration. Il offre une vue d'ensemble de l'activite du site et un acces rapide aux actions les plus courantes.

## Architecture

Le tableau de bord repose sur deux composants principaux :

- **`Admin\DashboardController`** : point d'entree de la route `/admin`, il orchestre le chargement des donnees.
- **`DashboardService`** : service qui agrege les statistiques, les contenus recents et les notifications pour les transmettre a la vue.

```php
// Route du tableau de bord
Route::get('/admin', [DashboardController::class, 'index']);
```

## Widgets du tableau de bord

Le tableau de bord est compose de widgets independants, chacun affichant une categorie d'informations.

### Statistiques rapides

Un bandeau de chiffres cles affiches en haut de page :

| Statistique | Description |
|-------------|-------------|
| Pages publiees | Nombre total de pages avec le statut `published` |
| Articles publies | Nombre total d'articles publies |
| Medias | Nombre de fichiers dans la mediatheque |
| Utilisateurs | Nombre d'utilisateurs actifs |

### Pages recentes

Liste des cinq dernieres pages modifiees avec leur statut, leur auteur et la date de derniere modification. Un lien direct permet d'acceder a l'edition de chaque page.

### Articles recents

Liste des cinq derniers articles crees ou modifies. Affiche le titre, la categorie principale, le statut de publication et la date.

### Vue d'ensemble Analytics

Un graphique synthetique presentant l'evolution des pages vues sur les 30 derniers jours. Ce widget utilise les donnees du modele `PageViewDaily` (voir la section [Analytics](/admin/analytics/)).

## Actions rapides

Un panneau d'actions rapides permet de lancer les operations les plus frequentes en un clic :

- **Creer une page** : ouvre directement l'editeur de page vierge.
- **Creer un article** : ouvre le formulaire de creation d'article.
- **Importer un media** : ouvre la boite de dialogue d'import de la mediatheque.

Ces raccourcis evitent de naviguer dans les menus pour les taches quotidiennes.

## Journal d'activite

Le widget d'activite affiche les dernieres actions effectuees sur le site par l'ensemble des utilisateurs :

- Creation, modification, suppression de contenus
- Connexions et deconnexions
- Modifications de parametres
- Actions sur les medias

Chaque entree du journal indique l'utilisateur, l'action realisee, la ressource concernee et l'horodatage. Les donnees proviennent du modele `ActivityLog`.

```php
// Exemple d'entree du journal
ActivityLog::create([
    'user_id'     => $user->id,
    'action'      => 'updated',
    'subject_type' => 'App\Models\Page',
    'subject_id'  => $page->id,
    'description' => 'Page "Accueil" modifiee',
]);
```

## Notifications systeme

Le tableau de bord affiche les notifications importantes en haut de page :

- **Mises a jour disponibles** : nouvelles versions du CMS, des plugins ou des themes.
- **Erreurs systeme** : problemes detectes par le `HealthCheckService` (base de donnees, cache, file d'attente).
- **Alertes de securite** : tentatives de connexion suspectes, certificats expires.

Les notifications sont classees par niveau de severite (info, avertissement, critique) et peuvent etre masquees individuellement.

## Disposition personnalisable

L'agencement des widgets est configurable par chaque administrateur. Les widgets peuvent etre :

- Reordonnes par glisser-deposer
- Masques individuellement selon les preferences de l'utilisateur
- Reinitialises a la disposition par defaut

Les preferences de disposition sont stockees dans le profil de l'utilisateur et persistent entre les sessions.

:::tip[Astuce]
Les widgets du tableau de bord sont reactifs et s'adaptent automatiquement aux ecrans de differentes tailles, y compris les tablettes.
:::
