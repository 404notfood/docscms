---
title: "Assistant IA"
description: "Plugin Assistant IA d'ArtisanCMS : generation de contenu avec OpenAI et Anthropic, suggestions de titres, meta descriptions et integration dans l'editeur de pages."
---

Le plugin Assistant IA integre des capacites d'intelligence artificielle directement dans l'editeur de contenu d'ArtisanCMS. Il exploite les API d'OpenAI et d'Anthropic pour assister les redacteurs dans la creation et l'amelioration de contenu.

## Fonctionnalites

L'assistant IA propose plusieurs types d'assistance a la redaction :

| Fonctionnalite | Description |
|---|---|
| **Generation de contenu** | Redaction de paragraphes ou de sections completes a partir d'un sujet |
| **Reecriture** | Reformulation d'un texte existant pour ameliorer la clarte ou le ton |
| **Titres** | Suggestions de titres accrocheurs pour les pages et articles |
| **Meta descriptions** | Generation de meta descriptions optimisees pour le SEO |
| **Resume** | Creation d'un resume a partir d'un contenu long |
| **Traduction** | Assistance a la traduction du contenu |

## Integration des API

Le plugin supporte deux fournisseurs d'IA :

### OpenAI

Integration avec les modeles GPT d'OpenAI. Les modeles disponibles dependent de votre compte et de votre abonnement OpenAI.

### Anthropic

Integration avec les modeles Claude d'Anthropic, offrant une alternative performante pour la generation de contenu.

### Configuration des cles API

Les cles API sont configurees depuis l'interface d'administration via le **AiAssistantController**. Les cles sont stockees de maniere chiffree en base de donnees pour garantir leur securite.

Pour configurer le plugin :

1. Accedez aux parametres du plugin Assistant IA
2. Selectionnez le fournisseur souhaite (OpenAI ou Anthropic)
3. Saisissez votre cle API
4. Choisissez le modele par defaut
5. Enregistrez les parametres

## Utilisation dans l'editeur

L'assistant IA est accessible directement dans l'editeur de pages et d'articles. Plusieurs points d'integration sont disponibles :

### Barre d'outils

Un bouton dedié dans la barre d'outils de l'editeur ouvre le panneau de l'assistant IA. Depuis ce panneau, vous pouvez :

- Decrire le contenu souhaite et generer un texte
- Selectionner un texte existant et demander une reecriture
- Generer des suggestions de titres

### Menu contextuel

En selectionnant du texte dans l'editeur, un menu contextuel propose les actions IA suivantes :

- **Reecrire** : reformuler le texte selectionne
- **Developper** : enrichir et detailler le texte
- **Simplifier** : rendre le texte plus accessible
- **Corriger** : corriger la grammaire et l'orthographe

### Champs SEO

Dans les champs SEO de l'editeur, l'assistant peut generer automatiquement :

- Un titre SEO optimise a partir du contenu de la page
- Une meta description respectant les recommandations de longueur

## Parametres

Les parametres du plugin sont accessibles depuis l'administration :

| Parametre | Description |
|---|---|
| **Fournisseur** | OpenAI ou Anthropic |
| **Cle API** | Cle d'authentification (stockee chiffree) |
| **Modele** | Modele par defaut a utiliser |
| **Temperature** | Creativite des reponses (0 = deterministe, 1 = creatif) |
| **Langue par defaut** | Langue de generation du contenu |
| **Longueur maximale** | Nombre maximal de tokens par generation |

## Securite

La securite des cles API est assuree par :

- Stockage chiffre en base de donnees (jamais en clair)
- Transmission uniquement via des requetes serveur (jamais exposees au frontend)
- Acces restreint aux utilisateurs disposant de la permission appropriee

## Bonnes pratiques

Pour tirer le meilleur parti de l'assistant IA :

- Fournissez des instructions precises et contextuelles pour obtenir de meilleurs resultats
- Relisez et editez toujours le contenu genere avant publication
- Utilisez la reecriture pour ameliorer un premier jet plutot que de partir de zero
- Ajustez la temperature en fonction du type de contenu (basse pour du contenu factuel, haute pour du contenu creatif)

:::caution[Attention]
Le contenu genere par l'IA doit toujours etre verifie et valide par un redacteur humain avant publication. L'assistant IA est un outil d'aide a la redaction, pas un remplacement du jugement editorial.
:::
