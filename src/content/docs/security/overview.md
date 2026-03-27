---
title: "Vue d'ensemble de la securite"
description: "Architecture de securite d'ArtisanCMS : defense en profondeur, couches de protection et couverture OWASP Top 10."
---

ArtisanCMS adopte une philosophie de **defense en profondeur** : chaque couche de l'application dispose de ses propres mecanismes de protection, de sorte qu'une faille dans une couche ne compromet pas l'ensemble du systeme.

## Principes de conception

La securite n'est pas un module ajoute apres coup. Elle est integree dans chaque composant du CMS :

- **Securite par defaut** : les fonctionnalites sont securisees sans configuration supplementaire.
- **Moindre privilege** : chaque utilisateur dispose uniquement des permissions necessaires a son role.
- **Validation systematique** : toute donnee entrante est validee et assainie avant traitement.
- **Transparence** : chaque action significative est enregistree dans le journal d'activite.

## Les 12 couches de securite

### 1. Authentification

Laravel Breeze fournit la base d'authentification avec login, inscription, reinitialisation de mot de passe et verification d'email. Une authentification a deux facteurs (TOTP) est disponible en option.

### 2. Autorisation

22 policies Laravel et plus de 40 permissions granulaires controlent l'acces a chaque ressource. Le systeme repose sur un controle d'acces base sur les roles (RBAC) avec support des wildcards.

### 3. Validation des entrees

31 Form Requests couvrent tous les endpoints du CMS. Chaque donnee soumise par un formulaire ou une API est validee avec des regles strictes avant d'atteindre la logique metier.

```php
// Exemple : StorePageRequest
public function rules(): array
{
    return [
        'title'   => ['required', 'string', 'max:255'],
        'slug'    => ['required', 'string', 'max:255', 'unique:pages,slug'],
        'content' => ['nullable', 'array'],
        'status'  => ['required', 'in:draft,published,scheduled'],
    ];
}
```

### 4. Assainissement des sorties

Le service `ContentSanitizer` nettoie le contenu genere par les utilisateurs avant son affichage, empechant les attaques XSS (Cross-Site Scripting).

```php
// Le ContentSanitizer supprime les balises et attributs dangereux
$cleanHtml = ContentSanitizer::clean($userContent);
```

### 5. Securite des fichiers

Chaque fichier uploade est soumis a une validation MIME stricte (verification du contenu, pas seulement de l'extension). Les metadonnees EXIF sont automatiquement supprimees des images pour proteger la vie privee.

### 6. Limitation de debit (Rate Limiting)

Des limiteurs de debit sont appliques sur les endpoints sensibles :

| Endpoint | Limite |
|---|---|
| Login | 5 tentatives / minute |
| API | 60 requetes / minute |
| Upload | 10 fichiers / minute |
| Installation | 3 tentatives / heure |

### 7. Headers de securite

ArtisanCMS configure automatiquement les headers HTTP de securite via le middleware `SecurityHeaders` :

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'nonce-...';
X-Frame-Options: DENY
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

### 8. Signature des webhooks

Les webhooks sortants sont signes avec HMAC SHA-256. Le destinataire peut verifier l'authenticite de chaque requete en validant la signature contenue dans le header `X-Webhook-Signature`.

### 9. Chiffrement des parametres sensibles

Les cles API et tokens stockes dans les parametres du CMS sont chiffres en base de donnees via le chiffrement natif de Laravel (`encrypt` / `decrypt`).

### 10. Journal d'audit

Le modele `ActivityLog` enregistre automatiquement les actions critiques : creation, modification, suppression, publication, connexion et deconnexion. Chaque entree inclut l'utilisateur, l'action, la cible, l'adresse IP et l'horodatage.

### 11. Verrouillage de contenu

Le systeme de content locking empeche les conflits d'edition simultanee. Lorsqu'un utilisateur edite une page, un verrou temporaire est pose pour avertir les autres utilisateurs.

### 12. Tokens de previsualisation

Les liens de previsualisation pour le contenu non publie utilisent des tokens temporaires avec expiration configurable, empechant l'acces non autorise au contenu en brouillon.

## Couverture OWASP Top 10

ArtisanCMS adresse chacun des risques du classement OWASP Top 10 :

| Risque OWASP | Protection ArtisanCMS |
|---|---|
| **A01 - Broken Access Control** | 22 policies, 40+ permissions, middleware EnsureAdmin |
| **A02 - Cryptographic Failures** | Chiffrement AES-256 (APP_KEY), HTTPS force, parametres sensibles chiffres |
| **A03 - Injection** | Eloquent ORM (requetes preparees), 31 Form Requests, ContentSanitizer |
| **A04 - Insecure Design** | Architecture defense en profondeur, moindre privilege, validation systematique |
| **A05 - Security Misconfiguration** | Headers securises par defaut, APP_DEBUG=false en production |
| **A06 - Vulnerable Components** | Verification des mises a jour, Composer audit, npm audit |
| **A07 - Auth Failures** | Rate limiting, 2FA TOTP optionnel, sessions securisees |
| **A08 - Data Integrity Failures** | Webhooks signes HMAC, CSRF natif Laravel, validation stricte |
| **A09 - Logging & Monitoring** | ActivityLog complet, journal d'erreurs Laravel |
| **A10 - SSRF** | Validation des URL, pas de requetes sortantes non controlees |

:::tip[En savoir plus]
Consultez les pages [Authentification](/security/authentication/) et [Autorisations](/security/authorization/) pour le detail de chaque mecanisme.
:::
