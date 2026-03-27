---
title: "Stack technique"
description: "Détail complet de la stack technique d'ArtisanCMS : Laravel 13, React 19, Inertia 2, Tailwind CSS v4, MySQL, Vite, et tous les outils de développement."
---

ArtisanCMS est construit sur une stack technique moderne et cohérente. Cette page détaille chaque technologie utilisée, son rôle dans l'architecture et les versions requises.

## Vue d'ensemble

| Couche | Technologie | Version |
|---|---|---|
| Backend | Laravel | 13.x |
| Langage backend | PHP | 8.3+ |
| Frontend | React | 19.x |
| Typage frontend | TypeScript | 5.x |
| Bridge backend/frontend | Inertia.js | 2.x |
| UI Components | shadcn/ui | latest |
| CSS | Tailwind CSS | 4.x |
| Base de données | MySQL / MariaDB | 8.0+ / 10.6+ |
| Build | Vite | 6.x |
| Monorepo | npm workspaces + Turborepo | - |
| Tests backend | PHPUnit | 11.x |
| Tests frontend | Vitest | 3.x |

## Backend

### Laravel 13 (PHP 8.3+)

Laravel est le framework PHP qui structure l'ensemble du backend. ArtisanCMS utilise les conventions et fonctionnalités clés de Laravel :

- **Service Providers** : Point d'entrée pour l'enregistrement des services du CMS et des plugins.
- **Eloquent ORM** : Modèles avec relations (polymorphiques, many-to-many, etc.), scopes et observers.
- **Policies** : Autorisation granulaire sur chaque ressource via les policies Laravel.
- **Form Requests** : Validation des données entrantes avec des règles strictes.
- **Queues** : Traitement asynchrone des jobs (webhooks, analytics, médias, emails).
- **Cache** : Abstraction multi-drivers (file, Redis) avec support des tags.
- **Events & Listeners** : Système d'événements natif complété par le `HookManager` du CMS.
- **Scheduler** : Planification des tâches récurrentes (agrégation analytics, nettoyage cache, sauvegardes).

**Standards de code** :
- PSR-12 pour le style de code
- `declare(strict_types=1)` dans tous les fichiers PHP
- Typage strict des paramètres et retours de fonctions

```php
<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\Page;
use Illuminate\Support\Collection;

final class PageService
{
    public function __construct(
        private readonly PageRepository $repository,
        private readonly CacheService $cache,
    ) {}

    public function getPublished(): Collection
    {
        return $this->cache->remember('pages.published', 3600, function (): Collection {
            return $this->repository->findPublished();
        });
    }
}
```

### Authentification : Laravel Breeze

Laravel Breeze fournit l'authentification de base :

- Inscription et connexion
- Réinitialisation de mot de passe
- Vérification d'email
- Middleware d'authentification sur les routes admin et API

L'authentification API utilise Laravel Sanctum pour les tokens d'accès.

### Recherche : Laravel Scout

Laravel Scout fournit l'abstraction pour la recherche full-text :

- Indexation automatique des contenus (pages, articles, produits, médias)
- Recherche globale depuis l'administration
- Compatible avec les drivers Meilisearch, Algolia ou base de données

## Frontend

### React 19

React est utilisé pour l'ensemble de l'interface d'administration. La version 19 apporte des améliorations de performance et le support des Server Components (utilisés de manière sélective via Inertia).

Chaque page de l'administration est un composant React recevant ses données en props depuis le controller Laravel via Inertia.

### TypeScript 5

L'intégralité du code frontend est écrit en TypeScript strict :

```typescript
// Types partagés pour les modèles
interface Page {
  id: number;
  title: string;
  slug: string;
  content: BlockNode[];
  status: 'draft' | 'review' | 'approved' | 'published';
  parent_id: number | null;
  template: string;
  created_at: string;
  updated_at: string;
}

interface BlockNode {
  id: string;
  type: string;
  props: Record<string, unknown>;
  children?: BlockNode[];
}
```

### Inertia.js 2

Inertia est le lien entre Laravel et React. Il élimine le besoin d'une API REST pour l'administration :

- Les controllers retournent `Inertia::render()` au lieu de JSON ou Blade.
- La navigation entre pages se fait côté client (pas de rechargement complet).
- Les formulaires utilisent le helper `useForm()` d'Inertia pour la soumission.
- Le partage de données globales (utilisateur connecté, permissions, paramètres) se fait via `Inertia::share()`.

```tsx
import { useForm } from '@inertiajs/react';

export function CreatePageForm() {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    slug: '',
    template: 'default',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/pages');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Titre"
        value={data.title}
        onChange={(e) => setData('title', e.target.value)}
        error={errors.title}
      />
      <Button type="submit" disabled={processing}>
        Créer la page
      </Button>
    </form>
  );
}
```

### Gestion d'état : Zustand

Zustand gère l'état local complexe qui dépasse les props Inertia, notamment dans le page builder :

```typescript
import { create } from 'zustand';

interface PageBuilderState {
  blocks: BlockNode[];
  selectedBlockId: string | null;
  undoStack: BlockNode[][];
  redoStack: BlockNode[][];
  addBlock: (block: BlockNode, parentId: string) => void;
  moveBlock: (blockId: string, targetId: string, position: number) => void;
  updateBlockProps: (blockId: string, props: Record<string, unknown>) => void;
  undo: () => void;
  redo: () => void;
  selectBlock: (blockId: string | null) => void;
}

export const usePageBuilderStore = create<PageBuilderState>((set, get) => ({
  blocks: [],
  selectedBlockId: null,
  undoStack: [],
  redoStack: [],
  addBlock: (block, parentId) => {
    // Sauvegarde dans l'historique + ajout du bloc
  },
  // ...
}));
```

### Editeur riche : TipTap

TipTap est utilisé pour l'édition de texte riche dans les blocs de contenu :

- Formatage (gras, italique, souligné, barré)
- Titres, listes, citations, code
- Liens et images inline
- Tableaux
- Extensions personnalisées pour les variables dynamiques

## Interface utilisateur

### shadcn/ui

Les composants d'interface sont basés sur shadcn/ui, encapsulés dans le package `@artisan/ui` :

- Composants accessibles (conformes WAI-ARIA)
- Personnalisables via les design tokens
- Légers et tree-shakeable
- Composants principaux : Button, Input, Select, Dialog, Sheet, Tabs, Table, Form, Toast, Command, Popover, etc.

### Tailwind CSS v4

Tailwind CSS v4 gère l'ensemble du styling :

- Configuration via les design tokens du CMS
- Classes utilitaires pour un développement rapide
- Purge automatique des classes non utilisées en production
- Support du dark mode (préparé, non activé par défaut)

### dnd-kit

La bibliothèque dnd-kit fournit les interactions de glisser-déposer du page builder :

- Drag & drop accessible (support clavier et lecteurs d'écran)
- Sortable pour la réorganisation des blocs
- Droppable zones pour l'insertion entre blocs
- Overlays visuels pendant le déplacement

## Base de données

### MySQL 8.0+ / MariaDB 10.6+

ArtisanCMS supporte les deux moteurs de base de données :

| Fonctionnalité utilisée | MySQL | MariaDB |
|---|---|---|
| JSON columns | 8.0+ | 10.2+ |
| Full-text search (InnoDB) | 5.7+ | 10.0+ |
| Common Table Expressions (CTE) | 8.0+ | 10.2+ |
| Window functions | 8.0+ | 10.2+ |

Les colonnes JSON sont utilisées pour stocker le contenu des blocs, les métadonnées de configuration des plugins et les paramètres des design tokens.

**Version minimale recommandée** : MySQL 8.0 ou MariaDB 10.6 pour bénéficier de toutes les optimisations.

## Build et outillage

### Vite 6

Vite est le bundler utilisé pour le développement et la production :

- Hot Module Replacement (HMR) instantané en développement
- Build optimisé avec tree-shaking et code splitting en production
- Plugin `laravel-vite-plugin` pour l'intégration avec Laravel
- Support natif de TypeScript et JSX

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.tsx'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/resources/js',
      '@artisan/ui': '/packages/ui/src',
      '@artisan/blocks': '/packages/blocks/src',
      '@artisan/page-builder': '/packages/page-builder/src',
      '@artisan/theme-engine': '/packages/theme-engine/src',
    },
  },
});
```

### npm workspaces + Turborepo

La gestion des packages partagés repose sur npm workspaces, orchestrée par Turborepo :

- **npm workspaces** : Résolution des dépendances entre `packages/*` et l'application principale.
- **Turborepo** : Parallélisation et cache des tâches de build (`turbo run build`, `turbo run test`).

```json
// package.json (racine)
{
  "workspaces": [
    "packages/*",
    "plugins/*/resources/js"
  ]
}
```

```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["^build"]
    },
    "lint": {}
  }
}
```

## Tests

### PHPUnit 11 (Backend)

Les tests backend couvrent les couches service, controller et intégration :

```php
class PageServiceTest extends TestCase
{
    public function test_published_pages_are_cached(): void
    {
        $page = Page::factory()->published()->create();

        Cache::shouldReceive('remember')
            ->once()
            ->andReturn(collect([$page]));

        $result = $this->pageService->getPublished();

        $this->assertCount(1, $result);
    }
}
```

```bash
# Lancer les tests backend
php artisan test
php artisan test --filter=PageServiceTest
php artisan test --coverage
```

### Vitest 3 (Frontend)

Les tests frontend utilisent Vitest avec React Testing Library :

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BlockRenderer } from '@artisan/blocks';

describe('BlockRenderer', () => {
  it('renders a heading block correctly', () => {
    const block: BlockNode = {
      id: '1',
      type: 'heading',
      props: { level: 2, content: 'Mon titre' },
    };

    render(<BlockRenderer block={block} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Mon titre');
  });
});
```

```bash
# Lancer les tests frontend
npx vitest
npx vitest run
npx vitest --coverage
```

## Outils de développement

### Qualité de code

| Outil | Rôle | Configuration |
|---|---|---|
| **ESLint** | Linting JavaScript/TypeScript | `eslint.config.js` |
| **Prettier** | Formatage du code frontend | `.prettierrc` |
| **Laravel Pint** | Formatage du code PHP (PSR-12) | `pint.json` |
| **PHPStan** | Analyse statique PHP | `phpstan.neon` |
| **TypeScript** | Vérification de types | `tsconfig.json` |

### Commandes de développement

```bash
# Démarrer le serveur de développement complet (Laravel + Vite)
composer run dev

# Lancer uniquement le serveur Laravel
php artisan serve

# Lancer uniquement Vite (HMR)
npx vite

# Build de production
npm run build

# Linting et formatage
npx eslint .                    # Lint frontend
./vendor/bin/pint               # Format PHP
npx prettier --write .          # Format frontend

# Analyse statique
./vendor/bin/phpstan analyse    # Analyse PHP
npx tsc --noEmit                # Vérification TypeScript

# Tests
php artisan test                # Tests backend
npx vitest run                  # Tests frontend
npx turbo run test              # Tous les tests (Turborepo)
```

## Dépendances principales

### Backend (composer.json)

| Package | Rôle |
|---|---|
| `laravel/framework` | Framework PHP principal |
| `laravel/breeze` | Authentification (login, register, password reset) |
| `laravel/sanctum` | Authentification API par tokens |
| `laravel/scout` | Recherche full-text |
| `inertiajs/inertia-laravel` | Adaptateur Inertia pour Laravel |
| `intervention/image` | Manipulation d'images (resize, WebP, EXIF) |
| `spatie/laravel-permission` | Gestion des rôles et permissions |
| `spatie/laravel-activitylog` | Journal d'activité |
| `spatie/laravel-backup` | Sauvegarde de base de données et fichiers |
| `spatie/laravel-sitemap` | Génération de sitemap XML |
| `stripe/stripe-php` | SDK Stripe pour le e-commerce |
| `openai-php/laravel` | SDK OpenAI pour l'assistant IA |

### Frontend (package.json)

| Package | Rôle |
|---|---|
| `react` / `react-dom` | Bibliothèque d'interface utilisateur |
| `@inertiajs/react` | Adaptateur Inertia pour React |
| `typescript` | Typage statique |
| `tailwindcss` | Framework CSS utilitaire |
| `@dnd-kit/core` / `@dnd-kit/sortable` | Drag & drop pour le page builder |
| `zustand` | Gestion d'état légère |
| `@tiptap/react` / `@tiptap/starter-kit` | Editeur riche |
| `lucide-react` | Icônes |
| `recharts` | Graphiques pour les analytics |
| `date-fns` | Manipulation de dates |
| `zod` | Validation de schémas |
| `react-hook-form` | Gestion de formulaires |
| `@radix-ui/*` | Primitives UI accessibles (base de shadcn/ui) |

### Outils de build et développement

| Package | Rôle |
|---|---|
| `vite` | Bundler et serveur de développement |
| `@vitejs/plugin-react` | Support React dans Vite |
| `laravel-vite-plugin` | Intégration Vite/Laravel |
| `vitest` | Framework de tests frontend |
| `@testing-library/react` | Utilitaires de test React |
| `eslint` | Linting du code |
| `prettier` | Formatage du code |
| `turbo` | Orchestration monorepo |

:::tip[Environnement de développement]
Consultez la page [Prérequis](/getting-started/requirements/) pour les versions exactes requises et la page [Installation](/getting-started/installation/) pour configurer votre environnement de développement.
:::
