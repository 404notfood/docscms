---
title: "Branding & White-label"
description: "Personnalisation white-label complete d'ArtisanCMS : logo, favicon, couleurs, nom du panneau d'administration, page de connexion et import/export des parametres."
---

ArtisanCMS offre un systeme de white-label complet qui permet de personnaliser entierement l'identite visuelle du CMS. Cette fonctionnalite est particulierement utile pour les agences qui deploient le CMS pour leurs clients.

## Fonctionnalites de personnalisation

Le systeme de branding permet de modifier les elements suivants :

| Element | Description |
|---|---|
| **Logo** | Logo affiche dans l'administration et sur la page de connexion |
| **Favicon** | Icone de l'onglet du navigateur |
| **Couleurs** | Palette de couleurs du panneau d'administration |
| **Nom du CMS** | Nom affiche dans le titre et les en-tetes de l'administration |
| **Page de connexion** | Personnalisation complete de la page de login (fond, logo, texte) |
| **Pied de page admin** | Texte affiche en bas du panneau d'administration |

## Architecture

### BrandingController

Le **BrandingController** gere l'interface d'administration pour la configuration du branding. Il expose les actions suivantes :

- **index** : affiche les parametres de branding actuels
- **update** : enregistre les modifications de branding
- **import** : importe une configuration de branding depuis un fichier
- **export** : exporte la configuration actuelle

### BrandingService

Le **BrandingService** centralise la logique metier du branding :

- Chargement des parametres de branding depuis la base de donnees
- Traitement des fichiers uploades (logo, favicon)
- Generation des styles CSS personnalises pour l'administration
- Validation et application des modifications

### Middleware InjectBranding

Le middleware **InjectBranding** est applique a toutes les routes d'administration. Il ajoute automatiquement les donnees de branding a chaque reponse Inertia, rendant les informations de personnalisation disponibles dans tous les composants React de l'interface d'administration.

Les donnees injectees incluent :

- URL du logo et du favicon
- Nom personnalise du CMS
- Variables de couleur
- Texte du pied de page

## Configuration

Depuis le panneau d'administration, acceez a la section Branding pour personnaliser votre instance :

### Logo et favicon

Telechargez votre logo (formats PNG, SVG ou JPEG recommandes) et votre favicon (format ICO ou PNG 32x32). Le logo est automatiquement redimensionne pour s'adapter a l'interface.

### Couleurs de l'administration

Personnalisez les couleurs cles du panneau d'administration :

- Couleur principale (en-tete, boutons primaires)
- Couleur secondaire (accents, liens)
- Couleur de la barre laterale
- Couleur de fond

### Nom et textes

Remplacez "ArtisanCMS" par le nom de votre choix. Ce nom apparait dans :

- Le titre de l'onglet du navigateur
- L'en-tete du panneau d'administration
- La page de connexion
- Les emails envoyes par le systeme

## Import et export

Le systeme de branding supporte l'import et l'export de configurations, ce qui facilite le deploiement sur plusieurs instances.

### Export

L'export genere un fichier JSON contenant tous les parametres de branding, y compris les references aux fichiers media (logo, favicon). Les fichiers media sont inclus en base64 dans l'export.

### Import

L'import d'une configuration est valide par le **BrandingImportRequest** qui verifie :

- La structure du fichier JSON
- La validite des fichiers media encodes
- La compatibilite des parametres avec la version du CMS

## Cas d'usage : agences

Le white-label est concu pour les agences web qui souhaitent proposer ArtisanCMS a leurs clients sous leur propre marque :

1. **Configurez** le branding avec le logo et les couleurs de votre agence
2. **Exportez** la configuration pour la reutiliser sur tous les sites clients
3. **Importez** la configuration sur chaque nouvelle installation
4. **Personnalisez** les details specifiques a chaque client (nom, favicon)

:::tip[Conseil]
Preparez un fichier de branding de base pour votre agence et importez-le systematiquement sur chaque nouveau projet. Cela garantit une identite coherente et fait gagner du temps lors de la mise en place.
:::
