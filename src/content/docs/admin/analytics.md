---
title: Analytics
description: Systeme d'analytics cote serveur d'ArtisanCMS - suivi des pages vues, agregation quotidienne, conformite RGPD et tableau de bord analytique.
---

ArtisanCMS integre un systeme d'analytics entierement cote serveur. Aucun script de suivi externe n'est injecte dans les pages, ce qui garantit la conformite RGPD et le respect de la vie privee des visiteurs.

## Architecture

Le systeme d'analytics repose sur plusieurs composants :

| Composant | Role |
|-----------|------|
| `TrackPageView` | Middleware qui intercepte les requetes entrantes |
| `TrackPageViewJob` | Job asynchrone qui enregistre la vue |
| `PageView` | Modele pour les vues individuelles brutes |
| `PageViewDaily` | Modele pour les donnees agregees par jour |
| `AnalyticsService` | Service d'interrogation et de calcul des statistiques |
| `AnalyticsController` | Controleur admin pour l'affichage du tableau de bord |

## Collecte des donnees

### Middleware TrackPageView

Le middleware `TrackPageView` est applique aux routes publiques du site. A chaque requete, il dispatche un job asynchrone pour eviter tout impact sur le temps de reponse :

```php
class TrackPageView
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        TrackPageViewJob::dispatch([
            'url'        => $request->fullUrl(),
            'referrer'   => $request->header('referer'),
            'user_agent' => $request->userAgent(),
            'ip_hash'    => hash('sha256', $request->ip()),
            'site_id'    => current_site_id(),
        ]);

        return $response;
    }
}
```

### Job TrackPageViewJob

Le job `TrackPageViewJob` traite l'enregistrement en arriere-plan via la file d'attente. Il cree une entree dans la table `page_views` avec les informations collectees.

## Modeles de donnees

### PageView

Le modele `PageView` stocke chaque vue individuelle :

| Champ | Type | Description |
|-------|------|-------------|
| `url` | `string` | URL de la page visitee |
| `referrer` | `string` | Page d'origine (nullable) |
| `user_agent` | `string` | Agent utilisateur du navigateur |
| `ip_hash` | `string` | Hash SHA-256 de l'adresse IP |
| `site_id` | `integer` | Identifiant du site |
| `created_at` | `timestamp` | Date et heure de la visite |

### PageViewDaily

Le modele `PageViewDaily` contient les donnees agregees par jour et par URL, utilisees pour le tableau de bord analytique.

## Agregation quotidienne

La commande `AggregatePageViewsCommand` consolide les vues brutes en statistiques journalieres :

```bash
php artisan analytics:aggregate
```

Cette commande est prevue pour etre executee quotidiennement via le planificateur Laravel. Elle calcule pour chaque URL et chaque jour : le nombre total de vues, le nombre de visiteurs uniques (base sur `ip_hash`) et les referents principaux.

## Nettoyage des donnees

La commande `PurgeOldPageViewsCommand` supprime les donnees brutes anciennes tout en conservant les agregats :

```bash
# Supprime les vues brutes de plus de 90 jours (valeur par defaut)
php artisan analytics:purge

# Duree de retention personnalisee
php artisan analytics:purge --days=60
```

Les donnees agregees dans `PageViewDaily` sont conservees indefiniment pour l'historique.

## Conformite RGPD

Le systeme d'analytics respecte les exigences du RGPD :

- **Pas de cookies** : aucun cookie de suivi n'est depose.
- **Pas de scripts externes** : aucune donnee n'est transmise a des tiers.
- **Do Not Track** : l'en-tete DNT du navigateur est respecte. Si le visiteur a active DNT, aucune vue n'est enregistree.
- **Adresses IP hashees** : seul un hash SHA-256 de l'IP est stocke, rendant l'identification impossible.
- **Vues admin exclues** : les visites des utilisateurs connectes a l'administration ne sont pas comptabilisees.
- **Retention limitee** : les donnees brutes sont purgees apres 90 jours.

## Tableau de bord analytique

L'`AnalyticsController` expose un tableau de bord accessible depuis l'administration :

### Graphique des pages vues

Graphique en courbes affichant l'evolution des pages vues sur une periode configurable (7, 30 ou 90 jours).

### Top pages

Classement des pages les plus visitees avec le nombre de vues et de visiteurs uniques.

### Referents

Liste des sources de trafic principales (moteurs de recherche, reseaux sociaux, liens directs).

### Visiteurs uniques

Nombre de visiteurs uniques par jour, calcule a partir des hash d'adresses IP.

## Suivi des recherches

Le modele `SearchLog` enregistre les requetes de recherche effectuees par les visiteurs sur le site. Cela permet d'identifier les contenus recherches et d'adapter la strategie editoriale.

```php
SearchLog::create([
    'query'      => $searchTerm,
    'results'    => $resultCount,
    'site_id'    => current_site_id(),
]);
```
