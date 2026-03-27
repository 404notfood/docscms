---
title: "Middleware"
description: "Référence des 13 middleware d'ArtisanCMS : installation, authentification, sécurité, multi-site, analytics et gestion des erreurs."
---

ArtisanCMS utilise 13 middleware personnalisés pour gérer l'authentification, la sécurité, le multi-site, le suivi analytics et le traitement des requêtes. Ils se trouvent dans `app/Http/Middleware/`.

## Liste des middleware

| Middleware | Alias | Description |
|------------|-------|-------------|
| `EnsureInstalled` | `installed` | Vérifie que le CMS est installé |
| `EnsureAdmin` | `admin` | Requiert le rôle administrateur |
| `CheckContentAccess` | `content.access` | Vérifie l'accès au contenu |
| `CheckContentLock` | `content.lock` | Empêche l'édition simultanée |
| `SetLocale` | `locale` | Détecte et applique la langue |
| `ResolveSite` | `site` | Résolution du site (multi-site) |
| `InjectBranding` | `branding` | Injecte les données de marque |
| `ErrorRecoveryMiddleware` | `recovery` | Mode dégradé et récupération |
| `CheckMaintenanceMode` | `maintenance` | Gestion du mode maintenance |
| `SecurityHeaders` | `security` | En-têtes de sécurité HTTP |
| `TrackPageView` | `analytics` | Suivi des pages vues |
| `HandleRedirects` | `redirects` | Gestion des redirections |
| `HandleInertiaRequests` | - | Données partagées Inertia |

## EnsureInstalled

Vérifie si le CMS a été configuré. Si ce n'est pas le cas, toutes les requêtes sont redirigées vers `/install`. Ce middleware est appliqué globalement.

```php
// Redirige vers /install si le CMS n'est pas installé
// Laisse passer les requêtes vers /install et les assets
```

## EnsureAdmin

Vérifie que l'utilisateur authentifié possède le rôle administrateur. Retourne une erreur 403 si l'utilisateur n'a pas les droits suffisants.

```php
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
```

## CheckContentAccess

Vérifie les droits d'accès au contenu en fonction du champ `access_level` défini sur chaque page ou article. Les niveaux possibles sont : `public`, `authenticated`, `role_based`.

```php
Route::middleware('content.access')->group(function () {
    Route::get('/{slug}', [PageController::class, 'show']);
});
```

## CheckContentLock

Empêche deux utilisateurs de modifier simultanément le même contenu. Lorsqu'un utilisateur ouvre l'éditeur, un verrou est posé. Si un second utilisateur tente d'accéder au même contenu, il reçoit un avertissement avec le nom de l'utilisateur qui détient le verrou.

```php
Route::middleware('content.lock')->group(function () {
    Route::get('/admin/pages/{page}/edit', [PageController::class, 'edit']);
});
```

## SetLocale

Détecte la langue de l'utilisateur selon la priorité suivante :

1. Paramètre de session
2. Préférence utilisateur en base de données
3. En-tête `Accept-Language` du navigateur
4. Langue par défaut du site

```php
// Appliqué globalement, définit app()->setLocale()
```

## ResolveSite

En mode multi-site, résout le site actif à partir du domaine ou du sous-domaine de la requête. Configure le scope automatique sur tous les modèles utilisant le trait `HasSiteScope`.

```php
// Résolution automatique basée sur le domaine
// example.com -> Site principal
// blog.example.com -> Site blog
```

## InjectBranding

Injecte les données de branding (logo, favicon, couleurs de marque) dans les propriétés partagées Inertia. Ces données sont disponibles dans tous les composants React.

```tsx
// Accessible dans les composants React via usePage()
const { branding } = usePage().props;
// branding.logo, branding.favicon, branding.colors
```

## ErrorRecoveryMiddleware

Détecte le mode dégradé (safe mode) activé lors d'erreurs critiques. En mode dégradé, les plugins sont désactivés et un thème minimal est utilisé. Permet aux administrateurs de diagnostiquer et corriger les problèmes.

## CheckMaintenanceMode

Gère le mode maintenance avec les fonctionnalités suivantes :

- Affiche une page de maintenance personnalisable aux visiteurs
- Les administrateurs authentifiés conservent l'accès au site
- Support d'un token secret pour contourner le mode maintenance

```php
// Les administrateurs accèdent au site normalement
// Les visiteurs voient la page de maintenance
// Accès possible via ?maintenance_token=secret
```

## SecurityHeaders

Ajoute les en-têtes de sécurité HTTP à toutes les réponses.

| En-tête | Valeur | Description |
|---------|--------|-------------|
| `Content-Security-Policy` | Configurable | Politique de sécurité du contenu |
| `X-Frame-Options` | `SAMEORIGIN` | Protection contre le clickjacking |
| `X-Content-Type-Options` | `nosniff` | Empêche le sniffing MIME |
| `Strict-Transport-Security` | `max-age=31536000` | Force HTTPS (HSTS) |
| `X-XSS-Protection` | `1; mode=block` | Protection XSS héritée |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Contrôle du referrer |
| `Permissions-Policy` | Configurable | Contrôle des API navigateur |

## TrackPageView

Enregistre les pages vues pour les analytics de manière asynchrone via une queue. Les données collectées incluent l'URL, le referrer, le user agent et l'horodatage. Les robots et crawlers sont automatiquement exclus.

```php
// Appliqué aux routes publiques uniquement
Route::middleware('analytics')->group(function () {
    Route::get('/{slug}', [PageController::class, 'show']);
});
```

## HandleRedirects

Intercepte les requêtes et vérifie si une redirection (301 ou 302) est configurée pour l'URL demandée. Les redirections sont gérées depuis l'administration sous **SEO > Redirections**.

## HandleInertiaRequests

Partage les données communes avec tous les composants React via Inertia. Ce middleware étend `Inertia\Middleware`.

```php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
        ],
        'settings' => fn () => $this->getPublicSettings(),
        'branding' => fn () => $this->getBranding(),
        'menus' => fn () => $this->getMenus(),
        'notifications' => fn () => $this->getNotifications($request),
        'flash' => [
            'success' => $request->session()->get('success'),
            'error' => $request->session()->get('error'),
        ],
    ]);
}
```

Ces données sont accessibles dans tous les composants React via `usePage().props`.

## Application des middleware

Les middleware sont appliqués dans `bootstrap/app.php` ou dans les routes.

```php
// Application globale
->withMiddleware(function (Middleware $middleware) {
    $middleware->web(append: [
        EnsureInstalled::class,
        SetLocale::class,
        ResolveSite::class,
        SecurityHeaders::class,
        HandleRedirects::class,
    ]);
})

// Application par groupe de routes
Route::middleware(['auth', 'admin', 'branding'])->prefix('admin')->group(function () {
    // Routes d'administration
});
```
