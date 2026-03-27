---
title: "Authentification"
description: "Systeme d'authentification d'ArtisanCMS : Laravel Breeze, 2FA TOTP, gestion de sessions, rate limiting et protection contre les attaques par force brute."
---

ArtisanCMS s'appuie sur **Laravel Breeze** pour fournir un systeme d'authentification complet, securise et extensible. Tous les flux standards sont pris en charge nativement.

## Flux d'authentification

### Connexion

Le formulaire de connexion accepte l'email et le mot de passe. Apres verification, une session authentifiee est creee et l'utilisateur est redirige vers le tableau de bord d'administration.

```php
// Routes d'authentification (routes/auth.php)
Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->middleware('throttle:login');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth');
```

### Inscription

L'inscription cree un nouveau compte utilisateur avec le role **Subscriber** par defaut. L'administrateur peut desactiver l'inscription publique dans les parametres du CMS.

```php
Route::post('/register', [RegisteredUserController::class, 'store'])
    ->middleware('guest');
```

### Reinitialisation du mot de passe

Le flux standard Laravel permet a l'utilisateur de demander un lien de reinitialisation par email, puis de definir un nouveau mot de passe via un token temporaire securise.

```php
Route::post('/forgot-password', [PasswordResetLinkController::class, 'store']);
Route::post('/reset-password', [NewPasswordController::class, 'store']);
```

### Verification d'email

Apres l'inscription, un email de verification est envoye. L'utilisateur doit cliquer sur le lien pour confirmer son adresse. Les routes protegees peuvent exiger la verification via le middleware `verified`.

## Controleurs d'authentification

Les controleurs d'authentification se trouvent dans `app/Http/Controllers/Auth/` :

| Controleur | Responsabilite |
|---|---|
| `AuthenticatedSessionController` | Connexion et deconnexion |
| `RegisteredUserController` | Inscription d'un nouveau compte |
| `PasswordResetLinkController` | Envoi du lien de reinitialisation |
| `NewPasswordController` | Reinitialisation du mot de passe |
| `EmailVerificationNotificationController` | Renvoi de l'email de verification |
| `ConfirmablePasswordController` | Confirmation du mot de passe pour les actions sensibles |
| `TwoFactorController` | Activation et verification du 2FA TOTP |

## Authentification a deux facteurs (2FA)

ArtisanCMS propose une authentification a deux facteurs optionnelle basee sur le protocole **TOTP** (Time-based One-Time Password), compatible avec les applications comme Google Authenticator, Authy ou 1Password.

### Activation

L'utilisateur active le 2FA depuis son profil. Le systeme genere un secret TOTP et affiche un QR code a scanner avec l'application d'authentification.

```php
// Activation du 2FA
public function enable(Request $request): JsonResponse
{
    $secret = TwoFactorService::generateSecret();
    $request->user()->update([
        'two_factor_secret'  => encrypt($secret),
        'two_factor_enabled' => true,
    ]);

    return response()->json([
        'qr_code' => TwoFactorService::generateQrCode($secret, $request->user()->email),
    ]);
}
```

### Verification a la connexion

Lorsque le 2FA est active, l'utilisateur doit saisir un code a 6 chiffres apres avoir entre son mot de passe. Le code est valide pendant 30 secondes avec une tolerance d'un intervalle.

## Gestion des sessions

### Configuration

Les sessions sont configurees dans `config/session.php`. En production, le pilote `redis` est recommande pour les performances et la fiabilite.

```bash
SESSION_DRIVER=redis
SESSION_LIFETIME=120
SESSION_SECURE_COOKIE=true
SESSION_SAME_SITE=lax
```

### Se souvenir de moi

La fonctionnalite "Se souvenir de moi" cree un cookie persistant securise qui maintient la session active au-dela de la duree standard. Le token est hache en base de donnees et renouvele a chaque utilisation.

## Protection contre les attaques par force brute

### Rate limiting

Le middleware `throttle` limite les tentatives de connexion echouees :

```php
// Limite : 5 tentatives par minute par combinaison email + IP
RateLimiter::for('login', function (Request $request) {
    return Limit::perMinute(5)->by(
        Str::lower($request->input('email')) . '|' . $request->ip()
    );
});
```

### Verrouillage de compte

Apres 5 tentatives echouees, le compte est temporairement verrouille. L'utilisateur recoit un message indiquant le delai d'attente avant la prochaine tentative.

```
Trop de tentatives de connexion. Veuillez reessayer dans 60 secondes.
```

Le compteur est reinitialise apres une connexion reussie ou apres expiration du delai.

## Middleware d'authentification

ArtisanCMS utilise plusieurs middleware pour proteger les routes :

| Middleware | Role |
|---|---|
| `auth` | Requiert une session authentifiee |
| `guest` | Accessible uniquement aux utilisateurs non connectes |
| `verified` | Requiert la verification de l'email |
| `EnsureAdmin` | Verifie que l'utilisateur dispose d'un role d'administration |
| `throttle:login` | Limite les tentatives de connexion |

```php
// Exemple : protection d'un groupe de routes admin
Route::middleware(['auth', 'verified', EnsureAdmin::class])->group(function () {
    Route::get('/admin', [DashboardController::class, 'index']);
    // ...
});
```

:::caution[Important]
Assurez-vous que `SESSION_SECURE_COOKIE=true` est defini en production pour que les cookies de session soient transmis uniquement via HTTPS.
:::
