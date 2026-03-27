---
title: "Formulaire de contact"
description: "Plugin Formulaire de contact d'ArtisanCMS : formulaire preconfigure, notifications par email, protection anti-spam et personnalisation des champs."
---

Le plugin Formulaire de contact fournit un formulaire de contact preconfigure et pret a l'emploi. C'est une alternative simple et rapide au plugin Form Builder pour les sites ayant uniquement besoin d'un formulaire de contact standard.

## Presentation

Contrairement au plugin Form Builder qui offre un editeur visuel complet pour creer des formulaires personnalises, le plugin Formulaire de contact est concu pour une mise en place rapide. Il propose un formulaire preconfigure avec les champs essentiels, activable en quelques clics.

| Critere | Formulaire de contact | Form Builder |
|---|---|---|
| **Mise en place** | Immediate | Configuration requise |
| **Personnalisation** | Champs predefinis configurables | Editeur visuel complet |
| **Cas d'usage** | Page "Contactez-nous" | Formulaires complexes et varies |
| **Complexite** | Simple | Avancee |

## Champs du formulaire

Le formulaire inclut les champs suivants par defaut :

| Champ | Type | Obligatoire | Personnalisable |
|---|---|---|---|
| **Nom** | Texte | Oui | Libelle modifiable |
| **Email** | Email | Oui | Libelle modifiable |
| **Telephone** | Texte | Non | Activable/desactivable |
| **Sujet** | Select ou texte | Oui | Liste de sujets configurable |
| **Message** | Textarea | Oui | Longueur min/max configurable |

### Personnalisation des champs

Depuis les parametres du plugin, vous pouvez :

- Modifier les libelles de chaque champ
- Activer ou desactiver le champ telephone
- Definir la liste des sujets pour le champ Select
- Configurer la longueur minimale et maximale du message
- Modifier le texte du bouton d'envoi

## Notifications par email

Lorsqu'un visiteur soumet le formulaire, le plugin envoie automatiquement un email a l'administrateur contenant :

- Nom et adresse email de l'expediteur
- Sujet selectionne
- Message complet
- Date et heure de soumission
- Adresse IP de l'expediteur (pour la tracabilite)

### Configuration des notifications

| Parametre | Description |
|---|---|
| **Email destinataire** | Adresse recevant les notifications (par defaut : email admin) |
| **Emails en copie** | Adresses supplementaires en copie |
| **Objet de l'email** | Format de l'objet de l'email de notification |
| **Confirmation expediteur** | Envoyer un accuse de reception a l'expediteur |

L'email de confirmation envoye a l'expediteur est personnalisable : objet, contenu et mise en page peuvent etre modifies depuis l'administration.

## Protection anti-spam

Le plugin integre plusieurs couches de protection contre le spam, actives par defaut :

### Honeypot

Un champ invisible est ajoute au formulaire. Les robots remplissent systematiquement tous les champs, y compris celui-ci, ce qui permet de detecter et de rejeter les soumissions automatisees.

### Limitation de debit (rate limiting)

Le nombre de soumissions est limite par adresse IP :

- Maximum de 5 soumissions par heure par defaut
- Seuil configurable depuis les parametres du plugin
- Message personnalisable affiche en cas de depassement

### Validation cote serveur

Toutes les donnees soumises sont validees sur le serveur :

- Verification du format de l'adresse email
- Longueur minimale du message
- Detection des caracteres suspects
- Verification du champ honeypot

## Integration dans les pages

Le formulaire de contact est disponible en tant que bloc dans le page builder. Pour l'integrer a une page :

1. Editez la page souhaitee avec le page builder
2. Ajoutez un bloc "Formulaire de contact"
3. Configurez les options d'affichage si necessaire
4. Publiez la page

Le formulaire herite automatiquement du style du theme actif pour une integration visuelle harmonieuse.

## Messages de confirmation

Apres soumission reussie du formulaire, un message de confirmation est affiche au visiteur. Ce message est entierement personnalisable depuis les parametres du plugin :

- Texte du message de succes
- Redirection optionnelle vers une page de remerciement
- Affichage d'un message d'erreur personnalise en cas de probleme

## Administration

Le plugin ajoute une section dans le panneau d'administration pour :

- **Parametres** : configuration des champs, des emails et de la protection anti-spam
- **Soumissions** : consultation de l'historique des messages recus
- **Statistiques** : nombre de messages recus par jour, semaine et mois

:::tip[Conseil]
Si votre site necessite uniquement un formulaire de contact standard, ce plugin est le choix ideal. Reservez le plugin Form Builder pour les cas necessitant des formulaires multiples ou des champs complexes.
:::
