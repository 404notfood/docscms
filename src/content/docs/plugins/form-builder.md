---
title: "Formulaires"
description: "Plugin Form Builder d'ArtisanCMS : editeur visuel de formulaires, types de champs, protection anti-spam, gestion des soumissions et notifications par email."
---

Le plugin Form Builder permet de creer des formulaires personnalises avec un editeur visuel, sans ecrire de code. Les formulaires peuvent etre integres dans n'importe quelle page via le page builder.

## Editeur visuel

L'editeur de formulaires fonctionne en glisser-deposer. Chaque formulaire est compose de champs que vous organisez librement :

1. **Selectionnez** un type de champ dans la palette disponible
2. **Glissez** le champ dans la zone de construction du formulaire
3. **Configurez** les proprietes du champ (libelle, placeholder, validation)
4. **Reorganisez** les champs par glisser-deposer
5. **Previsualiser** le formulaire avant publication

L'editeur affiche un apercu en temps reel du formulaire tel qu'il apparaitra sur le site.

## Types de champs

Le plugin propose les types de champs suivants :

| Type | Description | Options |
|---|---|---|
| **Texte** | Champ de saisie simple sur une ligne | Longueur min/max, pattern regex |
| **Email** | Champ email avec validation automatique | Verification du format |
| **Textarea** | Zone de texte multiligne | Nombre de lignes, longueur max |
| **Select** | Liste deroulante de choix | Options statiques ou dynamiques |
| **Checkbox** | Case a cocher unique ou groupe | Valeurs multiples possibles |
| **Radio** | Boutons radio pour un choix unique | Liste d'options |
| **Upload de fichier** | Champ d'envoi de fichier | Types acceptes, taille max |

### Configuration des champs

Chaque champ dispose d'options communes :

- **Libelle** : texte affiche au-dessus du champ
- **Placeholder** : texte d'aide affiche dans le champ vide
- **Requis** : rend le champ obligatoire
- **Valeur par defaut** : valeur pre-remplie
- **Aide** : texte d'aide affiche sous le champ
- **Regles de validation** : regles personnalisees (longueur, format, etc.)

## Protection anti-spam

Le plugin integre plusieurs mecanismes de protection contre le spam :

| Mecanisme | Description |
|---|---|
| **Honeypot** | Champ invisible pour pieger les bots |
| **Limitation de debit** | Nombre maximal de soumissions par IP et par periode |
| **Validation cote serveur** | Toutes les donnees sont validees avant enregistrement |

Ces protections sont actives par defaut et ne necessitent aucune configuration.

## Gestion des soumissions

Chaque soumission de formulaire est enregistree en base de donnees et accessible depuis l'administration. L'interface de gestion des soumissions permet de :

- **Consulter** toutes les soumissions d'un formulaire avec pagination
- **Filtrer** par date, statut ou contenu
- **Exporter** les soumissions au format CSV
- **Supprimer** les soumissions obsoletes
- **Marquer** les soumissions comme lues/non lues

Les fichiers uploades via les formulaires sont stockes de maniere securisee et accessibles depuis le detail de chaque soumission.

## Notifications par email

Le plugin envoie automatiquement des notifications par email lors de la reception d'une soumission :

### Notification administrateur

Un email est envoye a l'administrateur (ou a une adresse configuree) avec :

- Le nom du formulaire
- L'ensemble des donnees soumises
- La date et l'heure de soumission
- Un lien direct vers la soumission dans l'administration

### Confirmation a l'expediteur

Si le formulaire contient un champ email, une confirmation automatique peut etre envoyee a l'expediteur. Le contenu de cet email est personnalisable depuis les parametres du formulaire.

## Administration

Le plugin ajoute les pages suivantes au panneau d'administration :

### Liste des formulaires

Vue d'ensemble de tous les formulaires crees, avec pour chacun :

- Nom du formulaire
- Nombre de soumissions
- Date de derniere soumission
- Statut (actif/inactif)

### Editeur de formulaire

Interface de creation et de modification des formulaires avec :

- Editeur visuel en glisser-deposer
- Configuration des champs
- Parametres du formulaire (email de notification, message de confirmation)
- Apercu du formulaire

### Visionneuse de soumissions

Interface de consultation des soumissions recues avec :

- Tableau des soumissions avec tri et filtrage
- Vue detaillee de chaque soumission
- Export CSV
- Actions groupees (supprimer, marquer comme lu)

## Integration avec le page builder

Les formulaires crees sont disponibles en tant que bloc dans le page builder. Inserez un bloc "Formulaire" dans n'importe quelle page et selectionnez le formulaire a afficher.

:::tip[Conseil]
Pour un simple formulaire de contact, le plugin "Formulaire de contact" offre une solution preconfigure plus rapide a mettre en place. Utilisez le Form Builder pour des formulaires personnalises avec des besoins specifiques.
:::
