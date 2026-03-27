---
title: "Espace membres"
description: "Plugin Espace membres d'ArtisanCMS : abonnements, profils personnalises, restriction de contenu par niveau, annuaire des membres et interface d'administration."
---

Le plugin Espace membres ajoute un systeme complet de gestion des abonnements et de contenu reserve. Il permet de creer des niveaux d'adhesion, de restreindre l'acces a certains contenus et d'offrir un espace personnalise a vos membres.

## Fonctionnalites

| Fonctionnalite | Description |
|---|---|
| **Plans d'abonnement** | Definition de niveaux d'adhesion avec tarification |
| **Profils membres** | Profils utilisateur enrichis avec champs personnalises |
| **Restriction de contenu** | Acces conditionnel aux pages et articles par niveau |
| **Annuaire** | Repertoire des membres accessible selon la configuration |
| **Gestion admin** | Interface complete de gestion des membres et des plans |

## Plans d'abonnement

Les plans d'abonnement definissent les differents niveaux d'adhesion disponibles pour les utilisateurs.

### Configuration d'un plan

Chaque plan est defini par :

| Attribut | Description |
|---|---|
| **Nom** | Nom du plan affiche aux utilisateurs (ex. "Gratuit", "Premium", "Pro") |
| **Description** | Description des avantages du plan |
| **Prix** | Tarif de l'abonnement (0 pour un plan gratuit) |
| **Duree** | Mensuel, annuel ou personnalise |
| **Permissions** | Niveau d'acces au contenu restreint |
| **Limite** | Nombre maximal de membres (optionnel) |

### Hierarchie des plans

Les plans sont organises selon une hierarchie de niveaux. Un membre avec un plan de niveau superieur a automatiquement acces a tout le contenu des niveaux inferieurs.

## Profils membres

Chaque membre dispose d'un profil enrichi au-dela du compte utilisateur standard.

### Champs personnalises

L'administrateur peut definir des champs de profil supplementaires :

- Champs texte (biographie, entreprise, site web)
- Champs de selection (secteur d'activite, centre d'interet)
- Champs de date (date de naissance)
- Champs fichier (avatar, document de presentation)

Les membres remplissent ces champs depuis leur espace personnel. Les champs peuvent etre obligatoires ou optionnels.

### Page de profil membre

Le plugin fournit une page de profil front-end accessible via le **MemberController**. Depuis cette page, les membres peuvent :

- Consulter et modifier leurs informations personnelles
- Voir leur plan d'abonnement actuel
- Gerer leur abonnement (mise a niveau, resiliation)
- Consulter leur historique

## Restriction de contenu

Le coeur du plugin est la capacite de restreindre l'acces au contenu en fonction du niveau d'adhesion.

### Application des restrictions

Les restrictions peuvent etre appliquees a :

- **Pages** : une page entiere est reservee a un niveau d'abonnement
- **Articles** : un article de blog est accessible uniquement aux membres
- **Sections de page** : certains blocs du page builder sont masques pour les non-membres

### Configuration par contenu

Dans l'editeur de chaque page ou article, un panneau "Restriction d'acces" permet de :

- Activer la restriction pour ce contenu
- Selectionner le ou les plans autorises
- Definir un message personnalise pour les visiteurs non autorises
- Configurer une redirection vers la page d'inscription

### Contenu teaser

Pour les contenus restreints, le plugin permet d'afficher un apercu (teaser) du contenu avant le point de restriction, encourageant l'inscription.

## Annuaire des membres

L'annuaire est un repertoire consultable des membres inscrits. Sa configuration permet de :

- Activer ou desactiver l'annuaire
- Choisir les champs de profil affiches dans l'annuaire
- Definir quels niveaux de membres sont visibles
- Restreindre l'acces a l'annuaire aux membres connectes

## Administration

Le plugin ajoute les sections suivantes au panneau d'administration :

### Gestion des membres

- Liste de tous les membres avec filtrage par plan et statut
- Fiche detaillee de chaque membre (profil, historique, abonnement)
- Actions : activer, desactiver, changer de plan, supprimer
- Export de la liste des membres au format CSV

### Gestion des plans

- Creation et modification des plans d'abonnement
- Configuration des tarifs et des durees
- Definition des permissions associees a chaque plan
- Ordre d'affichage des plans sur la page d'inscription

### Parametres

- Configuration de la page d'inscription
- Personnalisation des emails envoyes aux membres
- Parametres de l'annuaire
- Gestion des champs de profil personnalises

## Pages front-end

Le plugin fournit les pages front-end suivantes :

| Page | Description |
|---|---|
| **Inscription** | Formulaire d'inscription avec choix du plan |
| **Profil** | Espace personnel du membre |
| **Annuaire** | Repertoire des membres |
| **Plans** | Presentation des plans d'abonnement disponibles |

:::note
Si le plugin E-commerce est installe, les paiements d'abonnement peuvent etre geres via la meme passerelle de paiement Stripe, offrant une experience unifiee.
:::
