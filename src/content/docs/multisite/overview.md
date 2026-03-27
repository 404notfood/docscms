---
title: Configuration multi-site
description: Architecture multi-site d'ArtisanCMS - modele Site, filtrage automatique par site, resolution de domaine et configuration partagee.
---

ArtisanCMS supporte nativement le mode multi-site, permettant de gerer plusieurs sites web depuis une seule installation. Chaque site dispose de son propre contenu, de ses parametres et de son identite visuelle, tout en partageant la meme base de donnees et la meme infrastructure.

## Architecture

Le multi-site repose sur une architecture a base de donnees partagee. Une colonne `site_id` est presente sur les tables de contenu, permettant d'isoler les donnees de chaque site.

### Modele Site

Le modele `Site` represente un site dans l'installation :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Nom du site |
| `domain` | `string` | Domaine associe (ex: `www.exemple.com`) |
| `locale` | `string` | Langue principale du site |
| `is_active` | `boolean` | Site actif ou desactive |
| `is_primary` | `boolean` | Site principal de l'installation |
| `settings` | `json` | Surcharges de parametres specifiques au site |

```php
class Site extends Model
{
    protected $casts = [
        'is_active'  => 'boolean',
        'is_primary' => 'boolean',
        'settings'   => 'array',
    ];
}
```

## Filtrage automatique par site

### Trait HasSiteScope

Le trait `HasSiteScope` est utilise par tous les modeles dont le contenu est propre a un site (pages, articles, medias, menus, etc.). Il applique automatiquement un scope global qui filtre les requetes selon le site courant :

```php
trait HasSiteScope
{
    protected static function bootHasSiteScope(): void
    {
        static::addGlobalScope('site', function (Builder $builder) {
            $builder->where('site_id', current_site_id());
        });

        static::creating(function (Model $model) {
            $model->site_id = current_site_id();
        });
    }
}
```

Ce trait garantit qu'un utilisateur ne voit et ne modifie que le contenu du site sur lequel il travaille, sans intervention manuelle dans les requetes.

## Resolution de domaine

### Middleware ResolveSite

Le middleware `ResolveSite` intercepte chaque requete et determine le site courant en fonction du domaine :

```php
class ResolveSite
{
    public function handle(Request $request, Closure $next)
    {
        $site = Site::where('domain', $request->getHost())
                    ->where('is_active', true)
                    ->first();

        if ($site) {
            app()->instance('current_site', $site);
        }

        return $next($request);
    }
}
```

Si aucun site ne correspond au domaine de la requete, le site principal (`is_primary = true`) est utilise par defaut.

## Ressources partagees et independantes

### Partagees entre tous les sites

| Ressource | Description |
|-----------|-------------|
| **Utilisateurs** | Un seul compte pour acceder a tous les sites |
| **Roles et permissions** | Les roles sont definis globalement |
| **Plugins** | Les plugins sont installes une seule fois |
| **Mediatheque** | Les fichiers medias sont partages |

### Independantes par site

| Ressource | Description |
|-----------|-------------|
| **Pages** | Chaque site a ses propres pages |
| **Articles** | Les articles sont propres a chaque site |
| **Menus** | Navigation specifique par site |
| **Parametres** | Surcharges de configuration par site |
| **Themes** | Chaque site peut utiliser un theme different |
| **Taxonomies** | Categories et tags propres a chaque site |

## Configuration

Le mode multi-site se configure dans `config/cms.php` :

```php
// config/cms.php
'multisite' => [
    'enabled'  => env('CMS_MULTISITE', false),
    'shared'   => ['users', 'roles', 'plugins', 'media'],
],
```

Activez le mode multi-site en definissant la variable d'environnement :

```env
CMS_MULTISITE=true
```

## Cas d'utilisation

### Agence gerant plusieurs clients

Une agence web peut gerer les sites de tous ses clients depuis une seule installation d'ArtisanCMS. Chaque client dispose de son propre domaine, contenu et identite visuelle.

### Sites multi-langues

Gerez un site en plusieurs langues avec un sous-domaine par langue (`fr.exemple.com`, `en.exemple.com`). Chaque site contient le contenu traduit dans sa langue.

### Sites regionaux

Declinez un site en versions regionales avec du contenu adapte a chaque marche, tout en partageant les ressources communes (medias, plugins, utilisateurs).

:::note
Le mode multi-site necessite que chaque domaine soit correctement configure au niveau DNS et pointe vers le serveur hebergeant l'installation ArtisanCMS.
:::
