---
title: Parametres
description: Systeme de parametres d'ArtisanCMS - modele hierarchique, categories, chiffrement des valeurs sensibles et invalidation du cache.
---

ArtisanCMS dispose d'un systeme de parametres flexible base sur une notation hierarchique a points. Les parametres sont stockes en base de donnees et accessibles depuis toute l'application.

## Modele Setting

Le modele `Setting` utilise une notation a points (dot notation) pour organiser les parametres de maniere hierarchique :

```php
// Exemples de cles de parametres
'site.name'          // Nom du site
'site.description'   // Description du site
'mail.driver'        // Driver d'envoi d'emails
'seo.robots'         // Directive robots.txt
'security.2fa'       // Activation de l'authentification a deux facteurs
```

### Champs du modele

| Champ | Type | Description |
|-------|------|-------------|
| `key` | `string` | Cle unique en notation a points |
| `value` | `text` | Valeur du parametre (chaine, JSON, boleen) |
| `type` | `string` | Type de champ : `text`, `textarea`, `boolean`, `select`, `number` |
| `group` | `string` | Categorie de regroupement |
| `encrypted` | `boolean` | Indique si la valeur est chiffree |
| `site_id` | `integer` | Site associe en mode multi-site (nullable) |

## Controleur et interface

Le `Admin\SettingController` fournit l'interface d'administration des parametres. Les parametres sont presentes par categories dans des onglets distincts.

```php
Route::get('settings/{group}', [SettingController::class, 'edit']);
Route::put('settings/{group}', [SettingController::class, 'update']);
```

## Categories de parametres

### General

Configuration de base du site : nom, description, URL, logo, favicon, fuseau horaire et langue par defaut.

### SEO

Parametres de referencement : balise title par defaut, meta-description globale, directives robots.txt, activation du sitemap XML automatique et configuration des balises Open Graph.

### Mail

Configuration de l'envoi d'emails : driver (`smtp`, `mailgun`, `ses`), hote SMTP, port, identifiants, adresse d'expediteur par defaut et nom d'expediteur.

### Media

Parametres de la mediatheque : taille maximale d'import, formats autorises, dimensions de redimensionnement automatique, qualite de compression JPEG et activation du traitement WebP.

### Securite

Options de securite : activation de l'authentification a deux facteurs (2FA), duree de session, politique de mots de passe, nombre maximal de tentatives de connexion et activation du mode maintenance.

### Performance

Parametres de performance : activation du cache de pages, duree de vie du cache, minification des assets, activation du lazy loading des images et configuration du CDN.

## Observer de cache

Le `SettingObserver` surveille les modifications des parametres et invalide automatiquement le cache associe :

```php
class SettingObserver
{
    public function updated(Setting $setting): void
    {
        Cache::forget("settings.{$setting->group}");
        Cache::forget("settings.all");
    }
}
```

Cela garantit que les modifications de parametres sont immediatement prises en compte dans toute l'application.

## Parametres chiffres

Les valeurs sensibles comme les cles API ou les mots de passe de services externes sont automatiquement chiffrees en base de donnees :

```php
// Les parametres marques comme chiffres utilisent le chiffrement Laravel
$setting->encrypted = true;
$setting->value = 'ma-cle-api-secrete'; // Chiffree automatiquement a la sauvegarde
```

Le dechiffrement est transparent a la lecture : l'application accede toujours aux valeurs en clair via l'accesseur du modele.

## Seeder de parametres

Le `SettingsSeeder` initialise les valeurs par defaut lors de l'installation :

```php
// Extrait du SettingsSeeder
Setting::firstOrCreate(['key' => 'site.name'], [
    'value' => 'Mon Site ArtisanCMS',
    'type'  => 'text',
    'group' => 'general',
]);
```

Ce seeder est idempotent : il ne remplace pas les valeurs deja definies par l'administrateur.

## Multi-site

En mode multi-site, chaque site peut surcharger les parametres globaux. Le systeme de resolution fonctionne par cascade :

1. Recherche d'un parametre specifique au site courant (`site_id` defini).
2. Si absent, utilisation du parametre global (`site_id` nul).

Cette approche permet de partager une configuration de base tout en personnalisant les parametres site par site.

:::note
Les parametres de la categorie Securite et Performance s'appliquent globalement et ne peuvent pas etre surcharges par site.
:::
