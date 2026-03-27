---
title: Emails & Newsletter
description: Gestion des templates d'emails et du systeme de newsletter dans ArtisanCMS - templates personnalisables, abonnements et campagnes.
---

ArtisanCMS propose un systeme complet de gestion des emails transactionnels et une fonctionnalite de newsletter integree pour communiquer avec les visiteurs du site.

## Templates d'emails

### Modele EmailTemplate

Le modele `EmailTemplate` permet de definir des templates d'emails editables depuis l'interface d'administration :

| Champ | Type | Description |
|-------|------|-------------|
| `name` | `string` | Identifiant unique du template |
| `subject` | `string` | Objet de l'email (supporte les variables) |
| `body` | `text` | Corps du message en HTML (supporte les variables) |
| `description` | `string` | Description pour l'administrateur |
| `is_active` | `boolean` | Active ou desactive l'envoi |

### Variables de template

Les templates utilisent un systeme de variables a double accolades pour inserer des donnees dynamiques :

| Variable | Description |
|----------|-------------|
| `{{user.name}}` | Nom complet du destinataire |
| `{{user.email}}` | Adresse email du destinataire |
| `{{site.name}}` | Nom du site |
| `{{site.url}}` | URL du site |
| `{{reset.link}}` | Lien de reinitialisation de mot de passe |
| `{{verification.link}}` | Lien de verification d'email |

### Service et controleur

- **`EmailTemplateService`** : gere le rendu des templates avec remplacement des variables et l'envoi des emails.
- **`Admin\EmailTemplateController`** : interface CRUD pour editer les templates depuis l'administration.

```php
Route::resource('email-templates', EmailTemplateController::class);
```

### Templates par defaut

ArtisanCMS inclut des templates preconfigures pour les emails courants :

- Bienvenue apres inscription
- Reinitialisation de mot de passe
- Verification d'adresse email
- Notification de nouveau commentaire
- Confirmation d'abonnement newsletter
- Notification d'administrateur (nouveau contenu, nouvel utilisateur)

Chaque template peut etre personnalise librement depuis l'interface d'administration sans toucher au code.

## Newsletter

### Modele NewsletterSubscriber

Le modele `NewsletterSubscriber` stocke les abonnes a la newsletter :

| Champ | Type | Description |
|-------|------|-------------|
| `email` | `string` | Adresse email de l'abonne |
| `name` | `string` | Nom de l'abonne (optionnel) |
| `status` | `string` | Statut : `pending`, `confirmed`, `unsubscribed` |
| `token` | `string` | Token unique pour confirmation et desabonnement |
| `confirmed_at` | `timestamp` | Date de confirmation (double opt-in) |
| `site_id` | `integer` | Site associe en mode multi-site |

### Inscription publique

Le `NewsletterSubscribeController` gere l'inscription des visiteurs depuis le site public :

```php
// Routes publiques
Route::post('/newsletter/subscribe', [NewsletterSubscribeController::class, 'subscribe']);
Route::get('/newsletter/confirm/{token}', [NewsletterSubscribeController::class, 'confirm']);
Route::get('/newsletter/unsubscribe/{token}', [NewsletterSubscribeController::class, 'unsubscribe']);
```

Le processus suit un double opt-in : l'abonne recoit un email de confirmation et doit cliquer sur le lien pour valider son inscription.

### Gestion des abonnes

Le `NewsletterController` dans l'administration permet de :

- Consulter la liste des abonnes avec filtres par statut
- Exporter la liste des abonnes au format CSV
- Supprimer des abonnes individuellement ou en masse
- Visualiser les statistiques d'abonnement (nouveaux abonnes, desabonnements)

### Campagnes

L'interface d'administration permet de creer et d'envoyer des campagnes email aux abonnes confirmes. Les campagnes supportent :

- Un objet et un corps personnalises
- L'utilisation des variables de template
- L'envoi en file d'attente pour gerer les gros volumes
- Le ciblage par statut d'abonne

## Configuration email

La configuration de l'envoi d'emails se fait via le fichier `.env` :

```env
# SMTP classique
MAIL_MAILER=smtp
MAIL_HOST=smtp.exemple.com
MAIL_PORT=587
MAIL_USERNAME=votre_utilisateur
MAIL_PASSWORD=votre_mot_de_passe
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contact@exemple.com
MAIL_FROM_NAME="${APP_NAME}"
```

ArtisanCMS supporte les drivers de mail Laravel : `smtp`, `mailgun`, `ses`, `postmark` et `log` (pour le developpement).

:::tip[Astuce]
En developpement, utilisez le driver `log` ou un outil comme Mailpit pour intercepter les emails sans les envoyer reellement.
:::
