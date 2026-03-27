---
title: "Tests"
description: "Guide des tests dans ArtisanCMS : PHPUnit pour le backend, Vitest pour le frontend, factories, structure des tests et bonnes pratiques."
---

ArtisanCMS maintient une suite de tests couvrant le backend PHP et le frontend React. L'objectif de couverture minimum est de **70%**.

## Stack de tests

| Outil | Cible | Commande |
|-------|-------|----------|
| **PHPUnit** | Backend (PHP/Laravel) | `php artisan test` |
| **Vitest** | Frontend (React/TypeScript) | `npm run test` |

## Structure des tests backend

Les tests PHP se trouvent dans le dossier `tests/` à la racine du projet.

```
tests/
├── Feature/                    # Tests d'intégration
│   ├── Auth/
│   │   └── AuthenticationTest.php
│   ├── Pages/
│   │   ├── PageCreationTest.php
│   │   ├── PagePublishingTest.php
│   │   └── PageRevisionTest.php
│   ├── Posts/
│   │   └── PostManagementTest.php
│   ├── Media/
│   │   └── MediaUploadTest.php
│   ├── Api/
│   │   ├── SearchApiTest.php
│   │   └── BuilderApiTest.php
│   └── Admin/
│       ├── DashboardTest.php
│       └── SettingsTest.php
├── Unit/                       # Tests unitaires
│   ├── Services/
│   │   ├── PageServiceTest.php
│   │   ├── ContentSanitizerTest.php
│   │   └── ImageOptimizerTest.php
│   ├── Models/
│   │   ├── PageTest.php
│   │   └── RoleTest.php
│   └── CMS/
│       └── HookManagerTest.php
└── TestCase.php
```

## Exécuter les tests backend

```bash
# Tous les tests
php artisan test

# Tests d'un dossier spécifique
php artisan test --filter=Feature/Pages

# Un test spécifique
php artisan test --filter=PageCreationTest

# Avec couverture de code
php artisan test --coverage

# En parallèle (plus rapide)
php artisan test --parallel
```

## Écrire un test Feature

Les tests Feature simulent des requêtes HTTP complètes.

```php
<?php

namespace Tests\Feature\Pages;

use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PageCreationTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_create_page(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)->post('/admin/pages', [
            'title' => 'Ma nouvelle page',
            'slug' => 'ma-nouvelle-page',
            'body' => '<p>Contenu de la page</p>',
            'status' => 'draft',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('cms_pages', [
            'title' => 'Ma nouvelle page',
            'slug' => 'ma-nouvelle-page',
        ]);
    }

    public function test_contributor_cannot_publish_page(): void
    {
        $contributor = User::factory()->contributor()->create();
        $page = Page::factory()->draft()->create();

        $response = $this->actingAs($contributor)->put("/admin/pages/{$page->id}", [
            'status' => 'published',
        ]);

        $response->assertForbidden();
    }
}
```

## Écrire un test Unit

Les tests unitaires vérifient une classe ou méthode isolée.

```php
<?php

namespace Tests\Unit\CMS;

use App\CMS\HookManager;
use Tests\TestCase;

class HookManagerTest extends TestCase
{
    public function test_action_is_executed(): void
    {
        $manager = new HookManager();
        $executed = false;

        $manager->addAction('test.event', function () use (&$executed) {
            $executed = true;
        });

        $manager->doAction('test.event');

        $this->assertTrue($executed);
    }

    public function test_filter_modifies_value(): void
    {
        $manager = new HookManager();

        $manager->addFilter('test.filter', function ($value) {
            return strtoupper($value);
        });

        $result = $manager->applyFilter('test.filter', 'hello');

        $this->assertEquals('HELLO', $result);
    }

    public function test_priority_order_is_respected(): void
    {
        $manager = new HookManager();
        $order = [];

        $manager->addAction('test.order', function () use (&$order) {
            $order[] = 'second';
        }, priority: 20);

        $manager->addAction('test.order', function () use (&$order) {
            $order[] = 'first';
        }, priority: 10);

        $manager->doAction('test.order');

        $this->assertEquals(['first', 'second'], $order);
    }
}
```

## Model Factories

Les 18 factories génèrent des données de test réalistes.

```php
// Utilisateur administrateur
$admin = User::factory()->admin()->create();

// Page publiée avec des blocs
$page = Page::factory()->published()->create();

// Article avec catégories et tags
$post = Post::factory()
    ->withCategories(3)
    ->published()
    ->create();

// Média de type image
$media = Media::factory()->image()->create();

// Commentaire sur un article
$comment = Comment::factory()->for($post)->create();
```

### Factories disponibles

`User`, `Role`, `Page`, `Post`, `Media`, `MediaFolder`, `Menu`, `MenuItem`, `Term`, `Taxonomy`, `Comment`, `Block`, `BlockPattern`, `Widget`, `Popup`, `Notification`, `EmailTemplate`, `FormEntry`.

## Tests frontend (Vitest)

Les tests React utilisent Vitest et Testing Library.

```bash
# Tous les tests frontend
npm run test

# Mode watch
npm run test -- --watch

# Avec couverture
npm run test -- --coverage
```

### Exemple de test de composant

```tsx
// resources/js/Components/builder/blocks/__tests__/TestimonialBlock.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TestimonialBlock from '../TestimonialBlock';

describe('TestimonialBlock', () => {
    it('affiche le nom de l\'auteur', () => {
        render(
            <TestimonialBlock
                author="Jean Dupont"
                role="Développeur"
                content="Excellent CMS !"
                avatar={null}
                rating={5}
            />
        );

        expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
    });

    it('affiche le bon nombre d\'étoiles', () => {
        render(
            <TestimonialBlock
                author="Test"
                role=""
                content="Bien"
                avatar={null}
                rating={3}
            />
        );

        const stars = screen.getAllByText('★');
        expect(stars).toHaveLength(3);
    });
});
```

## Tester un plugin

Créez les tests dans le dossier `tests/` du plugin et utilisez les factories du CMS.

```php
namespace Plugins\MyPlugin\Tests;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MyPluginFeatureTest extends TestCase
{
    use RefreshDatabase;

    public function test_plugin_page_is_accessible(): void
    {
        $admin = User::factory()->admin()->create();

        $response = $this->actingAs($admin)
            ->get('/admin/plugins/my-plugin');

        $response->assertOk();
    }
}
```

## Tester un bloc personnalisé

```php
class CustomBlockTest extends TestCase
{
    public function test_block_renders_correctly(): void
    {
        $page = Page::factory()->create([
            'blocks' => [
                ['type' => 'testimonial', 'data' => [
                    'author' => 'Test',
                    'content' => 'Great!',
                    'rating' => 5,
                ]],
            ],
        ]);

        $response = $this->get($page->url);

        $response->assertOk();
        $response->assertSee('Test');
    }
}
```

## Bonnes pratiques

- Utilisez `RefreshDatabase` pour isoler chaque test.
- Préférez les **factories** aux données codées en dur.
- Testez les **permissions** : vérifiez qu'un utilisateur sans droits reçoit un 403.
- Nommez vos tests de manière descriptive : `test_admin_can_publish_draft_page`.
- Exécutez les tests en CI avant chaque merge : `php artisan test --parallel && npm run test`.
