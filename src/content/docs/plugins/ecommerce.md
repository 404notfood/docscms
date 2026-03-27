---
title: "E-commerce"
description: "Plugin E-commerce d'ArtisanCMS : gestion de produits, panier, paiements Stripe, expedition, taxes, coupons, stock, commandes et avis clients."
---

Le plugin E-commerce transforme ArtisanCMS en une plateforme de vente en ligne complete. Il couvre l'ensemble du parcours d'achat, de la presentation des produits au suivi des commandes.

## Produits

### Gestion des produits

Chaque produit dispose des attributs suivants :

| Attribut | Description |
|---|---|
| **Nom** | Nom du produit affiche sur la boutique |
| **Description** | Description detaillee avec editeur de texte riche |
| **Prix** | Prix de vente principal |
| **Images** | Galerie d'images du produit |
| **Variantes** | Declinaisons par taille, couleur ou autre attribut |
| **Inventaire** | Quantite en stock avec suivi automatique |
| **Statut** | Brouillon, publie, archive |

### Variantes

Le systeme de variantes permet de proposer un produit sous differentes declinaisons (taille, couleur, matiere, etc.). Chaque variante peut avoir son propre prix, son propre stock et son propre SKU.

### Categories et collections

Les produits sont organises en categories hierarchiques et en collections thematiques. Une categorie represente un classement permanent (ex. "Vetements > T-shirts"), tandis qu'une collection regroupe des produits autour d'un theme ou d'une occasion (ex. "Soldes d'ete", "Nouveautes").

## Panier et tunnel d'achat

### Panier

Le panier est gere cote serveur avec synchronisation en temps reel. Il supporte :

- Ajout et suppression de produits
- Modification des quantites
- Application de coupons de reduction
- Calcul automatique des frais de livraison et des taxes
- Sauvegarde du panier entre les sessions

### Tunnel d'achat (checkout)

Le processus de commande se deroule en etapes :

1. **Recapitulatif du panier** : verification des articles et des quantites
2. **Informations de livraison** : adresse et methode d'expedition
3. **Paiement** : saisie des informations de paiement
4. **Confirmation** : recapitulatif et validation de la commande

## Paiement

### Integration Stripe

Le plugin integre Stripe comme passerelle de paiement principale. La configuration requiert :

- Cle publique Stripe
- Cle secrete Stripe
- Configuration du webhook pour les notifications de paiement

Le systeme de paiement est concu de maniere extensible pour permettre l'ajout d'autres passerelles de paiement via des plugins tiers.

## Expedition

### Zones d'expedition

Definissez des zones geographiques avec des methodes de livraison specifiques :

| Element | Description |
|---|---|
| **Zone** | Region geographique (pays, region, code postal) |
| **Methodes** | Options de livraison disponibles dans la zone |
| **Tarifs** | Prix par methode (fixe, au poids, gratuit a partir d'un seuil) |

Chaque zone peut proposer plusieurs methodes d'expedition avec des tarifs et des delais differents.

## Taxes

Le systeme de taxes supporte :

- Regles par pays et par region
- Taxes composees (taxe sur taxe)
- Exonerations par type de produit
- Affichage TTC ou HT selon la configuration

Les regles de taxe sont appliquees automatiquement en fonction de l'adresse de livraison du client.

## Coupons de reduction

Creez des coupons avec les options suivantes :

| Option | Description |
|---|---|
| **Type** | Pourcentage ou montant fixe |
| **Montant minimum** | Montant minimum de commande pour appliquer le coupon |
| **Date d'expiration** | Validite temporelle du coupon |
| **Limite d'utilisation** | Nombre maximal d'utilisations (global et par client) |
| **Produits/categories** | Restriction a certains produits ou categories |

## Gestion du stock

Le plugin assure un suivi precis des stocks :

- **Mouvements de stock** : historique de chaque entree et sortie
- **Alertes de stock bas** : notification lorsqu'un produit atteint le seuil minimum
- **Reservation** : le stock est reserve lors de l'ajout au panier pour eviter les surventes

## Commandes

Chaque commande suit un cycle de vie avec les statuts suivants :

| Statut | Description |
|---|---|
| **En attente** | Commande creee, paiement en cours |
| **Payee** | Paiement confirme |
| **En preparation** | Commande en cours de traitement |
| **Expediee** | Colis envoye, numero de suivi attribue |
| **Livree** | Colis recu par le client |
| **Annulee** | Commande annulee |
| **Remboursee** | Remboursement effectue |

L'historique complet de chaque commande est conserve avec les changements de statut.

## Avis clients

Le systeme d'avis permet aux clients de laisser une evaluation et un commentaire sur les produits achetes. Les avis sont soumis a moderation avant publication.

## Administration

Le plugin ajoute les pages d'administration suivantes :

- **Produits** : creation, edition et gestion des produits
- **Categories** : organisation hierarchique des produits
- **Commandes** : suivi et gestion des commandes
- **Rapports** : statistiques de ventes, chiffre d'affaires, produits populaires
- **Coupons** : creation et gestion des codes de reduction
- **Avis** : moderation des avis clients
- **Expedition** : configuration des zones et methodes de livraison
- **Stock** : vue d'ensemble des niveaux de stock et mouvements
- **Taxes** : configuration des regles fiscales

## Pages front-end

Le plugin fournit des pages React pour l'experience d'achat :

| Page | Description |
|---|---|
| **Boutique** | Catalogue des produits avec filtres et recherche |
| **Produit** | Fiche produit detaillee avec galerie et variantes |
| **Panier** | Recapitulatif du panier avec modification des quantites |
| **Checkout** | Tunnel d'achat complet avec paiement |

:::note
Le plugin E-commerce necessite une configuration Stripe valide pour traiter les paiements. Configurez vos cles API Stripe dans les parametres du plugin avant de mettre la boutique en production.
:::
