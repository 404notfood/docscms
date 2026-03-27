---
title: "Sauvegarde"
description: "Plugin Sauvegarde d'ArtisanCMS : sauvegardes automatisees, restauration, stockage local ou cloud S3, et interface d'administration pour la gestion des backups."
---

Le plugin Sauvegarde assure la protection de vos donnees en automatisant la creation de copies de sauvegarde de votre site. Il permet de sauvegarder la base de donnees, les fichiers medias et la configuration, puis de restaurer n'importe quelle sauvegarde en cas de besoin.

## Fonctionnalites

| Fonctionnalite | Description |
|---|---|
| **Sauvegarde automatique** | Planification de sauvegardes recurrentes |
| **Sauvegarde manuelle** | Declenchement d'une sauvegarde a la demande |
| **Restauration** | Retour a un etat anterieur du site |
| **Stockage flexible** | Local ou cloud (Amazon S3) |
| **Retention** | Suppression automatique des anciennes sauvegardes |

## Contenu d'une sauvegarde

Chaque sauvegarde inclut trois composantes :

### Base de donnees

Un dump complet de la base de donnees MySQL/MariaDB, incluant :

- Toutes les tables du CMS (pages, articles, utilisateurs, parametres)
- Les donnees des plugins (commandes e-commerce, soumissions de formulaires, etc.)
- La structure des tables (schemas)

### Fichiers medias

L'ensemble des fichiers uploades dans la mediatheque :

- Images (originales et miniatures generees)
- Documents (PDF, fichiers bureautiques)
- Videos et fichiers audio

### Configuration

Les fichiers de configuration du site :

- Parametres du CMS
- Configuration des plugins
- Parametres de branding
- Configuration des themes

## Planification automatique

Le plugin utilise le systeme de taches planifiees de Laravel pour automatiser les sauvegardes. Depuis l'administration, configurez la frequence souhaitee :

| Frequence | Description |
|---|---|
| **Quotidienne** | Une sauvegarde chaque jour a l'heure configuree |
| **Hebdomadaire** | Une sauvegarde par semaine au jour et a l'heure choisis |
| **Mensuelle** | Une sauvegarde le premier jour de chaque mois |
| **Personnalisee** | Expression cron pour une planification sur mesure |

### Politique de retention

Pour eviter une accumulation excessive de sauvegardes, configurez une politique de retention :

- Nombre maximal de sauvegardes a conserver
- Age maximal d'une sauvegarde (en jours)
- Conservation forcee de la derniere sauvegarde reussie

Les sauvegardes depassant les criteres de retention sont supprimees automatiquement.

## Stockage

### Stockage local

Par defaut, les sauvegardes sont stockees sur le serveur dans un repertoire dedie. Cette option convient pour les environnements de developpement et les sites avec un espace disque suffisant.

### Stockage cloud (Amazon S3)

Pour la production, le stockage sur Amazon S3 (ou un service compatible S3) est recommande. La configuration requiert :

| Parametre | Description |
|---|---|
| **Access Key** | Cle d'acces AWS |
| **Secret Key** | Cle secrete AWS |
| **Bucket** | Nom du bucket S3 |
| **Region** | Region AWS du bucket |
| **Chemin** | Prefixe de chemin dans le bucket (optionnel) |

Le stockage cloud offre l'avantage de conserver les sauvegardes sur une infrastructure separee du serveur, protegeant contre les pannes materielles.

## Restauration

Le processus de restauration permet de revenir a l'etat exact d'une sauvegarde anterieure :

1. **Selectionnez** la sauvegarde a restaurer depuis la liste
2. **Choisissez** les composantes a restaurer (base de donnees, medias, configuration, ou tout)
3. **Confirmez** la restauration
4. **Patientez** pendant le processus de restauration

La restauration partielle est possible : vous pouvez restaurer uniquement la base de donnees sans toucher aux fichiers medias, ou inversement.

## Administration

L'interface d'administration du plugin offre les fonctionnalites suivantes :

### Tableau de bord

- Date et statut de la derniere sauvegarde
- Prochaine sauvegarde planifiee
- Espace de stockage utilise
- Nombre de sauvegardes conservees

### Liste des sauvegardes

Pour chaque sauvegarde, les informations suivantes sont affichees :

- Date et heure de creation
- Taille totale du fichier
- Composantes incluses (base de donnees, medias, configuration)
- Emplacement de stockage (local ou cloud)
- Actions disponibles (telecharger, restaurer, supprimer)

### Parametres

- Configuration de la frequence de sauvegarde automatique
- Choix du stockage (local ou S3)
- Politique de retention
- Notifications par email en cas d'echec de sauvegarde

:::caution[Attention]
Testez regulierement vos sauvegardes en effectuant une restauration sur un environnement de test. Une sauvegarde qui n'a jamais ete testee ne garantit pas une restauration reussie.
:::
