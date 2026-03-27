---
title: "Créer un bloc"
description: "Guide pour créer un bloc personnalisé pour le Page Builder d'ArtisanCMS : structure, schéma, composant de rendu React, panneau de paramètres et enregistrement."
---

Le Page Builder d'ArtisanCMS fonctionne avec un système de blocs modulaires. Chaque bloc se compose d'un **composant de rendu** (React TSX) et d'un **panneau de paramètres**. Ce guide explique comment créer un bloc personnalisé.

## Génération avec Artisan

```bash
php artisan cms:block:create
```

L'assistant vous demande le nom du bloc, sa catégorie et génère les fichiers nécessaires.

## Architecture d'un bloc

Chaque bloc est constitué de trois éléments :

1. **Définition du schéma** : structure des données et valeurs par défaut
2. **Composant de rendu** : affichage du bloc dans le builder et sur le site
3. **Panneau de paramètres** : interface de configuration dans la barre latérale

## Catégories de blocs

| Catégorie | Slug | Description |
|-----------|------|-------------|
| Mise en page | `layout` | Conteneurs, colonnes, espacements |
| Contenu | `content` | Texte, titres, listes, citations |
| Média | `media` | Images, vidéos, galeries |
| E-commerce | `ecommerce` | Produits, prix, panier |
| Marketing | `marketing` | CTA, témoignages, compteurs |
| Formulaires | `forms` | Formulaires de contact, newsletters |

## Enregistrement via BlockRegistry

Les blocs sont enregistrés dans `app/CMS/Blocks/` via le `BlockRegistry`.

```php
// app/CMS/Blocks/TestimonialBlock.php
<?php

namespace App\CMS\Blocks;

class TestimonialBlock
{
    public static function register(): array
    {
        return [
            'type' => 'testimonial',
            'name' => 'Témoignage',
            'category' => 'marketing',
            'icon' => 'quote',
            'schema' => [
                'author' => [
                    'type' => 'string',
                    'default' => '',
                    'label' => 'Auteur',
                ],
                'role' => [
                    'type' => 'string',
                    'default' => '',
                    'label' => 'Fonction',
                ],
                'content' => [
                    'type' => 'text',
                    'default' => '',
                    'label' => 'Témoignage',
                ],
                'avatar' => [
                    'type' => 'image',
                    'default' => null,
                    'label' => 'Photo',
                ],
                'rating' => [
                    'type' => 'number',
                    'default' => 5,
                    'min' => 1,
                    'max' => 5,
                    'label' => 'Note',
                ],
            ],
        ];
    }
}
```

## Composant de rendu (React TSX)

Le composant de rendu affiche le bloc dans le builder et sur le site public. Il est placé dans `resources/js/Components/builder/blocks/`.

```tsx
// resources/js/Components/builder/blocks/TestimonialBlock.tsx
import React from 'react';

interface TestimonialBlockProps {
    author: string;
    role: string;
    content: string;
    avatar: string | null;
    rating: number;
}

export default function TestimonialBlock({
    author,
    role,
    content,
    avatar,
    rating,
}: TestimonialBlockProps) {
    return (
        <div className="testimonial-block">
            <div className="testimonial-content">
                <blockquote>{content}</blockquote>
                <div className="testimonial-stars">
                    {Array.from({ length: rating }, (_, i) => (
                        <span key={i} className="star filled">★</span>
                    ))}
                </div>
            </div>
            <div className="testimonial-author">
                {avatar && (
                    <img
                        src={avatar}
                        alt={author}
                        className="testimonial-avatar"
                    />
                )}
                <div>
                    <strong>{author}</strong>
                    {role && <span className="testimonial-role">{role}</span>}
                </div>
            </div>
        </div>
    );
}
```

## Panneau de paramètres (React TSX)

Le panneau de paramètres apparaît dans la barre latérale du builder lorsque le bloc est sélectionné.

```tsx
// resources/js/Components/builder/blocks/TestimonialSettings.tsx
import React from 'react';
import { TextInput, TextArea, ImagePicker, RangeSlider } from '@/Components/builder/fields';

interface TestimonialSettingsProps {
    data: {
        author: string;
        role: string;
        content: string;
        avatar: string | null;
        rating: number;
    };
    onChange: (key: string, value: any) => void;
}

export default function TestimonialSettings({ data, onChange }: TestimonialSettingsProps) {
    return (
        <div className="block-settings">
            <TextInput
                label="Auteur"
                value={data.author}
                onChange={(v) => onChange('author', v)}
            />
            <TextInput
                label="Fonction"
                value={data.role}
                onChange={(v) => onChange('role', v)}
            />
            <TextArea
                label="Témoignage"
                value={data.content}
                onChange={(v) => onChange('content', v)}
            />
            <ImagePicker
                label="Photo"
                value={data.avatar}
                onChange={(v) => onChange('avatar', v)}
            />
            <RangeSlider
                label="Note"
                value={data.rating}
                min={1}
                max={5}
                onChange={(v) => onChange('rating', v)}
            />
        </div>
    );
}
```

## Enregistrement depuis un plugin

Les plugins peuvent enregistrer leurs propres blocs dans la méthode `boot()` du ServiceProvider.

```php
public function boot(): void
{
    \CMS::addBlock('my-plugin/testimonial', TestimonialBlock::register());
}
```

## Schéma des types de champs

| Type | Description | Propriétés supplémentaires |
|------|-------------|---------------------------|
| `string` | Texte court | `maxLength` |
| `text` | Texte long | `maxLength` |
| `number` | Nombre | `min`, `max`, `step` |
| `boolean` | Interrupteur | - |
| `image` | Sélecteur d'image | `allowedTypes` |
| `color` | Sélecteur de couleur | - |
| `select` | Liste déroulante | `options` |
| `richtext` | Éditeur riche | `toolbar` |
| `link` | Sélecteur de lien | `allowExternal` |

## Bonnes pratiques

- Fournissez des **valeurs par défaut pertinentes** dans le schéma pour que le bloc soit fonctionnel dès l'ajout.
- Rendez le composant **responsive** avec des styles adaptatifs.
- Utilisez les **variables CSS du thème** pour respecter la charte graphique.
- Validez les données côté serveur dans le schéma du bloc.
- Préfixez le type de bloc avec le slug du plugin pour éviter les conflits de noms.
