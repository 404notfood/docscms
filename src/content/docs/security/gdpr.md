---
title: "RGPD & Conformite"
description: "Conformite RGPD d'ArtisanCMS : analytics cote serveur, respect du DNT, consentement cookies, minimisation des donnees et droits des utilisateurs."
---

ArtisanCMS est concu pour faciliter la conformite au **Reglement General sur la Protection des Donnees** (RGPD). Les mecanismes de protection de la vie privee sont integres nativement.

## Analytics respectueuses de la vie privee

Le module d'analytics fonctionne entierement **cote serveur**. Aucun script externe n'est injecte dans les pages. Les donnees sont collectees par un middleware Laravel, les adresses IP sont hachees (SHA-256) et aucun cookie de tracking n'est depose sans consentement.

```php
class TrackPageView
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->shouldTrack($request)) {
            PageView::create([
                'url'        => $request->path(),
                'referrer'   => $request->header('referer'),
                'user_agent' => $request->userAgent(),
                'ip_hash'    => hash('sha256', $request->ip()),
                'country'    => GeoIp::country($request->ip()),
            ]);
        }

        return $response;
    }
}
```

## Respect du header DNT

Lorsqu'un navigateur envoie `DNT: 1`, le middleware desactive automatiquement la collecte :

```php
private function shouldTrack(Request $request): bool
{
    if ($request->header('DNT') === '1') {
        return false;
    }
    if (config('cms.analytics.exclude_bots') && $this->isBot($request)) {
        return false;
    }
    return config('cms.analytics.enabled', true);
}
```

## Consentement aux cookies

La banniere de consentement est configurable dans `config/cms.php` :

```php
'cookie_consent' => [
    'enabled'    => true,
    'position'   => 'bottom',   // 'bottom', 'top', 'modal'
    'style'      => 'bar',      // 'bar', 'box', 'modal'
    'categories' => [
        'necessary' => true,     // Toujours actif, non desactivable
        'analytics' => false,    // Opt-in requis
        'marketing' => false,    // Opt-in requis
    ],
],
```

Seuls les cookies **necessaires** (session, CSRF) sont actifs sans consentement explicite.

## Minimisation des donnees

| Donnee | Traitement | Justification |
|---|---|---|
| Adresse IP | Hachee (SHA-256) | Analytics anonymisees |
| User-Agent | Stocke | Detection des navigateurs |
| URL visitee | Stockee | Statistiques de frequentation |
| Email utilisateur | Stocke | Authentification, notifications |
| Metadonnees EXIF | Supprimees a l'upload | Protection de la vie privee |

## Retention et purge des donnees

La duree de conservation des page views est configurable (90 jours par defaut). La commande `cms:purge-views` supprime les donnees expirees par lots :

```bash
# Purge manuelle
php artisan cms:purge-views

# Automatisation via le scheduler
$schedule->command('cms:purge-views')->weekly();
```

```env
CMS_ANALYTICS_RETENTION=90
```

## Droits des utilisateurs

### Export des donnees

Les utilisateurs peuvent exporter leurs donnees personnelles depuis leur profil (droit a la portabilite, article 20 RGPD). L'export genere un JSON contenant : profil, contenu cree et journal d'activite.

### Suppression de compte

La suppression applique un soft delete par defaut, avec une periode de grace avant purge definitive :

```php
$user->delete();      // Soft delete : definit deleted_at
$user->forceDelete(); // Purge definitive de toutes les donnees
```

## Newsletter

Le systeme de newsletter respecte les principes RGPD :

- **Opt-in explicite** : abonnement par action volontaire uniquement.
- **Double opt-in** : email de confirmation pour valider l'inscription.
- **Desabonnement en un clic** : lien present dans chaque email.
- **Pas de cases pre-cochees** : aucune inscription par defaut.

## Suppression des metadonnees EXIF

Les images uploadees sont automatiquement nettoyees de leurs metadonnees EXIF (coordonnees GPS, modele d'appareil, date de prise de vue) pour proteger la vie privee des utilisateurs.

:::tip[Conseil]
ArtisanCMS fournit les outils techniques pour la conformite RGPD. La conformite juridique complete (registre des traitements, DPO) depend de votre contexte organisationnel.
:::
