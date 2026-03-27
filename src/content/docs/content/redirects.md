---
title: Redirections
description: Gestion des redirections URL dans ArtisanCMS - redirections 301/302, middleware et migration depuis un ancien CMS.
---

Le système de redirections d'ArtisanCMS permet de gérer les redirections d'URL de manière centralisée. Il est particulièrement utile lors de changements d'URL, de restructurations de site ou de migrations depuis un autre CMS.

## Modèle Redirect

Le modèle `Redirect` (`App\Models\Redirect`) représente une règle de redirection :

| Champ | Type | Description |
|-------|------|-------------|
| `source_url` | `string` | URL d'origine (chemin relatif) |
| `target_url` | `string` | URL de destination |
| `status_code` | `integer` | Code HTTP (301 ou 302) |
| `is_active` | `boolean` | Redirection active ou inactive |
| `hit_count` | `integer` | Nombre de fois déclenchée |
| `last_hit_at` | `datetime` | Dernière utilisation |
| `site_id` | `integer` | Site associé (multi-site) |
| `created_at` | `datetime` | Date de création |

## Types de redirections

### Redirection 301 (permanente)

La redirection 301 indique aux moteurs de recherche que l'URL a changé définitivement. Le "jus SEO" de l'ancienne URL est transféré vers la nouvelle :

```
/ancien-article → /blog/nouvel-article (301)
```

Utilisez ce type pour :
- Les changements de slug permanents
- Les restructurations d'arborescence
- Les migrations depuis un ancien CMS

### Redirection 302 (temporaire)

La redirection 302 indique un changement temporaire. Les moteurs de recherche conservent l'ancienne URL dans leur index :

```
/promo-ete → /promotions/ete-2026 (302)
```

Utilisez ce type pour :
- Les pages temporairement déplacées
- Les redirections saisonnières
- Les pages en maintenance

## Middleware HandleRedirects

Le middleware `HandleRedirects` intercepte chaque requête entrante et vérifie si une redirection correspond :

```php
class HandleRedirects
{
    public function handle(Request $request, Closure $next): Response
    {
        $redirect = $this->findRedirect($request->getPathInfo());

        if ($redirect) {
            $redirect->increment('hit_count');
            $redirect->update(['last_hit_at' => now()]);

            return redirect($redirect->target_url, $redirect->status_code);
        }

        return $next($request);
    }
}
```

Le middleware est enregistré dans le groupe de routes web et s'exécute sur chaque requête. Les redirections sont mises en cache pour minimiser l'impact sur les performances.

## Administration

Le `Admin\RedirectController` fournit l'interface de gestion :

```php
Route::resource('redirects', RedirectController::class);
Route::post('redirects/import', [RedirectController::class, 'import']);
```

### Création d'une redirection

L'interface d'administration permet de :

1. Saisir l'URL source (chemin relatif, ex: `/ancien-chemin`)
2. Saisir l'URL cible (chemin relatif ou URL absolue)
3. Choisir le code de statut (301 ou 302)
4. Activer ou désactiver la redirection

### Liste et filtrage

La liste des redirections affiche :

- L'URL source et cible
- Le code de statut
- Le nombre de hits et la date du dernier hit
- Le statut actif/inactif

Les redirections peuvent etre filtrées par statut et triées par nombre de hits.

### Import en masse

Pour les migrations, un import CSV permet de créer plusieurs redirections simultanément :

```csv
source_url,target_url,status_code
/old-page,/new-page,301
/ancien-blog/post-1,/blog/post-1,301
/contact-us,/contact,301
```

## Cas d'utilisation

### Migration depuis un ancien CMS

Lors du passage d'un CMS comme WordPress ou Joomla vers ArtisanCMS, les URL changent souvent. Créez des redirections 301 pour chaque ancienne URL afin de conserver le référencement :

```
/wp/2024/03/mon-article → /blog/mon-article (301)
/index.php?id=42         → /a-propos          (301)
```

### Changement de slug

Lorsqu'un éditeur modifie le slug d'une page, une redirection peut etre créée automatiquement pour maintenir les anciens liens fonctionnels.

### Restructuration de site

Lors d'un changement d'arborescence :

```
/services/web-design    → /creation-web         (301)
/services/seo           → /referencement-naturel (301)
```

## Cache et Observer

Le `RedirectObserver` invalide le cache des redirections à chaque modification :

```php
class RedirectObserver
{
    public function saved(Redirect $redirect): void
    {
        Cache::tags(['redirects'])->flush();
    }

    public function deleted(Redirect $redirect): void
    {
        Cache::tags(['redirects'])->flush();
    }
}
```

Cela garantit que les nouvelles redirections sont prises en compte immédiatement sans nécessiter de vider manuellement le cache.

## Statistiques

Le compteur `hit_count` et le champ `last_hit_at` permettent de suivre l'utilisation de chaque redirection. Cela aide a identifier :

- Les redirections les plus sollicitées
- Les redirections obsolètes qui ne sont plus utilisées
- Les anciennes URL que les visiteurs tentent encore d'atteindre
