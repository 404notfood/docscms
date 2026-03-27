---
title: Gestion des sites
description: Administration des sites dans ArtisanCMS multi-site - creation, configuration, personnalisation et basculement entre sites.
---

L'interface d'administration d'ArtisanCMS permet de creer, configurer et gerer les differents sites de l'installation multi-site.

## Controleur et validation

La gestion des sites repose sur :

- **`Admin\SiteController`** : operations CRUD sur les sites (liste, creation, edition, desactivation).
- **`SiteRequest`** : requete de validation pour les champs du formulaire de site.

```php
Route::resource('sites', SiteController::class);
```

## Interface d'administration

### Liste des sites

La page principale affiche tous les sites configures sous forme de tableau :

| Colonne | Description |
|---------|-------------|
| Nom | Nom du site |
| Domaine | Domaine associe |
| Langue | Locale du site |
| Statut | Actif ou inactif |
| Actions | Editer, desactiver, supprimer |

Un badge visuel distingue le site principal des sites secondaires.

### Creation d'un site

Le formulaire de creation d'un nouveau site comprend les champs suivants :

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `name` | `string` | Oui | Nom du site |
| `domain` | `string` | Oui | Domaine complet (ex: `blog.exemple.com`) |
| `locale` | `string` | Oui | Langue principale (`fr`, `en`, `es`, etc.) |
| `is_active` | `boolean` | Non | Actif par defaut a la creation |

```php
// Validation dans SiteRequest
public function rules(): array
{
    return [
        'name'      => ['required', 'string', 'max:255'],
        'domain'    => ['required', 'string', 'unique:sites,domain'],
        'locale'    => ['required', 'string', 'in:fr,en,es,de,it,pt,nl'],
        'is_active' => ['boolean'],
    ];
}
```

Apres la creation, le site est immediatement accessible si le domaine est correctement configure au niveau DNS.

### Edition d'un site

L'edition permet de modifier tous les champs du site ainsi que d'acceder aux parametres avances : surcharges de parametres, personnalisation de la marque et selection du theme.

## Parametres par site

Chaque site peut surcharger les parametres globaux de l'installation. Le systeme de resolution fonctionne par cascade :

1. Le parametre specifique au site est recherche en priorite.
2. S'il n'existe pas, le parametre global est utilise.

Les categories de parametres surchargeables par site :

| Categorie | Exemples |
|-----------|----------|
| **General** | Nom du site, description, logo, favicon |
| **SEO** | Meta-title par defaut, meta-description, sitemap |
| **Mail** | Adresse d'expediteur, nom d'expediteur |
| **Media** | Taille maximale d'import, formats autorises |

:::note
Les parametres de securite et de performance restent globaux et ne peuvent pas etre surcharges par site.
:::

## Personnalisation de la marque

Chaque site dispose de sa propre identite visuelle configurable depuis l'administration :

- **Logo** : image affichee dans l'en-tete du site public et du panneau d'administration.
- **Favicon** : icone du navigateur specifique au site.
- **Couleurs** : palette de couleurs principales et secondaires du theme.
- **Pied de page** : texte et liens personnalises pour le bas de page.

Les ressources visuelles de chaque site sont stockees dans un repertoire dedie au sein de la mediatheque.

## Basculement entre sites

### Selecteur de site

Un selecteur de site est present dans la barre superieure de l'interface d'administration. Il permet de basculer instantanement d'un site a un autre :

- Le site courant est affiche avec son nom et son domaine.
- Un menu deroulant liste tous les sites actifs.
- Le basculement recharge le contexte d'administration pour le site selectionne.

Apres le basculement, toutes les operations (contenu, menus, parametres) s'appliquent exclusivement au site selectionne grace au trait `HasSiteScope`.

### Persistance du contexte

Le site selectionne est stocke en session. L'utilisateur retrouve automatiquement son dernier site actif lors de sa prochaine connexion.

## Gestion du contenu par site

Une fois un site selectionne dans l'administration, toutes les interfaces de contenu sont filtrees automatiquement :

- **Pages** : seules les pages du site courant sont affichees et editables.
- **Articles** : les articles sont propres au site selectionne.
- **Menus** : chaque site possede ses propres menus de navigation.
- **Taxonomies** : les categories et tags sont independants par site.

La creation de contenu attribue automatiquement le `site_id` du site courant au nouvel element.

## Desactivation d'un site

Un site peut etre desactive depuis l'interface d'administration. Un site desactive :

- N'est plus accessible publiquement (affiche une page 404 ou de maintenance).
- Reste visible dans l'administration pour les Super Admins.
- Conserve l'integralite de ses donnees.
- Peut etre reactive a tout moment.

```php
$site->is_active = false;
$site->save();
```

:::caution[Attention]
Le site principal ne peut pas etre desactive. Il sert de site par defaut lorsqu'aucun domaine ne correspond a la requete entrante.
:::
