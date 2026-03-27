---
title: "SEO"
description: "Plugin SEO d'ArtisanCMS : generation de sitemap, gestion du robots.txt, meta tags, Open Graph, analyse SEO et URLs canoniques."
---

Le plugin SEO d'ArtisanCMS fournit les outils necessaires pour optimiser le referencement naturel de votre site. Il est situe dans `content/plugins/seo/` et s'integre nativement a l'editeur de contenu.

## Fonctionnalites

Le plugin SEO couvre l'ensemble des besoins en referencement :

| Fonctionnalite | Description |
|---|---|
| **Sitemap XML** | Generation automatique du fichier `sitemap.xml` |
| **Robots.txt** | Gestion du fichier `robots.txt` depuis l'administration |
| **Meta tags** | Titre, description et mots-cles par page |
| **Open Graph** | Balises Open Graph pour le partage sur les reseaux sociaux |
| **Analyse SEO** | Score et recommandations pour chaque page |
| **URLs canoniques** | Definition automatique ou manuelle des URLs canoniques |

## Sitemap XML

Le plugin genere automatiquement un fichier `sitemap.xml` accessible a la racine du site. Le sitemap est mis a jour dynamiquement a chaque publication ou modification de contenu.

Le sitemap inclut :

- Toutes les pages publiees avec leur date de derniere modification
- Tous les articles de blog publies
- Les pages de categories et de tags
- La frequence de mise a jour estimee pour chaque URL
- La priorite relative de chaque page

### Configuration du sitemap

Depuis les parametres du plugin, vous pouvez :

- Exclure des pages specifiques du sitemap
- Definir la frequence de mise a jour par defaut
- Configurer la priorite par type de contenu
- Limiter le nombre d'URLs par sitemap (pagination automatique au-dela)

## Robots.txt

Le plugin fournit un editeur integre pour le fichier `robots.txt`. Vous pouvez definir les regles d'exploration pour les moteurs de recherche directement depuis l'administration, sans avoir a modifier un fichier sur le serveur.

Un fichier par defaut est genere avec les regles recommandees :

```
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://votre-site.com/sitemap.xml
```

## Meta tags par page

Chaque page et chaque article dispose de champs SEO dedies dans l'editeur de contenu :

### Titre SEO

Le titre qui apparait dans les resultats de recherche. S'il n'est pas defini, le titre de la page est utilise par defaut. Un compteur de caracteres aide a respecter la longueur recommandee (50-60 caracteres).

### Meta description

La description affichee sous le titre dans les resultats de recherche. Un compteur indique la longueur optimale (150-160 caracteres).

### Mots-cles

Bien que les mots-cles aient une influence limitee sur le referencement moderne, le champ est disponible pour les moteurs qui les utilisent encore.

### URL canonique

L'URL canonique est definie automatiquement pour chaque page. Vous pouvez la surcharger manuellement si necessaire, par exemple pour indiquer la source originale d'un contenu duplique.

## Open Graph

Le plugin genere automatiquement les balises Open Graph pour optimiser l'affichage lors du partage sur les reseaux sociaux (Facebook, LinkedIn, Twitter/X) :

- `og:title` : titre de la page
- `og:description` : description de la page
- `og:image` : image mise en avant de la page
- `og:url` : URL canonique
- `og:type` : type de contenu (article, page)

Ces balises peuvent etre personnalisees individuellement pour chaque page.

## Analyse SEO

Le plugin fournit un score SEO pour chaque page avec des recommandations concretes :

- Presence et longueur du titre SEO
- Presence et longueur de la meta description
- Utilisation des balises de titre (H1, H2, H3)
- Presence d'une image mise en avant
- Lisibilite du contenu
- Densite des mots-cles
- Presence de liens internes et externes

Le score est affiche sous forme de jauge dans l'editeur de contenu, avec une liste de points a ameliorer.

## Options de configuration

Les parametres generaux du plugin SEO sont accessibles depuis l'administration :

| Parametre | Description |
|---|---|
| **Separateur de titre** | Caractere entre le titre de la page et le nom du site |
| **Nom du site dans le titre** | Ajouter ou non le nom du site aux titres SEO |
| **Image Open Graph par defaut** | Image utilisee si aucune image n'est definie |
| **Verification Google** | Code de verification pour Google Search Console |
| **Verification Bing** | Code de verification pour Bing Webmaster Tools |

:::note
Le plugin SEO est active par defaut sur les nouvelles installations d'ArtisanCMS. Il est recommande de configurer les parametres generaux des la mise en place du site.
:::
