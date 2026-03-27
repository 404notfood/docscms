---
title: "Créer un plugin"
description: "Guide complet pour créer un plugin ArtisanCMS : structure, manifest, ServiceProvider, routes, pages d'administration et migrations."
---

ArtisanCMS dispose d'une architecture de plugins permettant d'étendre les fonctionnalités du CMS. Ce guide couvre la création d'un plugin de A à Z.

## Génération avec Artisan

La commande `cms:plugin:create` génère l'ensemble de la structure du plugin.

```bash
php artisan cms:plugin:create
```

L'assistant interactif vous demande le nom, le slug, la description et l'auteur du plugin. Les fichiers sont générés dans `content/plugins/`.

## Structure du plugin

```
content/plugins/my-plugin/
├── artisan-plugin.json          # Manifest du plugin
├── src/
│   └── MyPluginServiceProvider.php  # Point d'entrée
├── database/
│   └── migrations/              # Migrations spécifiques
├── routes/
│   └── admin.php                # Routes d'administration
├── resources/
│   └── js/Pages/                # Pages Inertia (React)
├── config/
│   └── settings.php             # Configuration par défaut
└── README.md
```

## Manifest (artisan-plugin.json)

Le manifest décrit les métadonnées et les dépendances du plugin.

```json
{
    "name": "Mon Plugin",
    "slug": "my-plugin",
    "version": "1.0.0",
    "description": "Description de mon plugin",
    "author": {
        "name": "John Doe",
        "email": "john@example.com"
    },
    "url": "https://example.com/my-plugin",
    "min_cms_version": "1.0.0",
    "dependencies": []
}
```

| Champ | Type | Description |
|-------|------|-------------|
| `name` | string | Nom d'affichage du plugin |
| `slug` | string | Identifiant unique (kebab-case) |
| `version` | string | Version SemVer |
| `min_cms_version` | string | Version minimale d'ArtisanCMS requise |
| `dependencies` | array | Liste des slugs de plugins requis |

## ServiceProvider

Le ServiceProvider est le point d'entrée de votre plugin. Il enregistre les services, les routes et les hooks.

```php
<?php

namespace Plugins\MyPlugin;

use Illuminate\Support\ServiceProvider;
use App\CMS\Traits\ReadsPluginSettings;

class MyPluginServiceProvider extends ServiceProvider
{
    use ReadsPluginSettings;

    protected string $pluginSlug = 'my-plugin';

    public function register(): void
    {
        // Enregistrer vos services dans le conteneur
        $this->app->singleton(MyService::class, function () {
            return new MyService($this->getPluginSettings());
        });
    }

    public function boot(): void
    {
        // Charger les migrations
        $this->loadMigrationsFrom(__DIR__ . '/../database/migrations');

        // Charger les routes
        $this->loadRoutesFrom(__DIR__ . '/../routes/admin.php');

        // Enregistrer des hooks
        \CMS::addAction('content.saved', function ($content) {
            app(MyService::class)->handleContentSaved($content);
        });

        // Enregistrer des blocs personnalisés
        \CMS::addBlock('my-plugin/custom-block', [
            'name' => 'Mon Bloc',
            'category' => 'content',
            'component' => 'MyPluginBlock',
        ]);
    }
}
```

## Trait ReadsPluginSettings

Ce trait permet d'accéder aux paramètres configurés par l'utilisateur pour votre plugin.

```php
use App\CMS\Traits\ReadsPluginSettings;

class MyPluginServiceProvider extends ServiceProvider
{
    use ReadsPluginSettings;

    protected string $pluginSlug = 'my-plugin';

    public function boot(): void
    {
        $apiKey = $this->getPluginSetting('api_key');
        $allSettings = $this->getPluginSettings();
    }
}
```

## Routes d'administration

Définissez vos routes dans `routes/admin.php`. Elles sont automatiquement préfixées et protégées par le middleware d'administration.

```php
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('admin/plugins/my-plugin')->middleware(['web', 'auth', 'admin'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Plugins/MyPlugin/Index', [
            'settings' => app(MyService::class)->getSettings(),
        ]);
    })->name('plugins.my-plugin.index');

    Route::post('/settings', [MyPluginController::class, 'updateSettings'])
        ->name('plugins.my-plugin.settings.update');
});
```

## Pages d'administration (Inertia)

Créez vos composants React dans `resources/js/Pages/`.

```tsx
// resources/js/Pages/Plugins/MyPlugin/Index.tsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function MyPluginIndex({ settings }) {
    const { data, setData, post } = useForm({
        api_key: settings.api_key || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('plugins.my-plugin.settings.update'));
    };

    return (
        <AdminLayout>
            <Head title="Mon Plugin" />
            <form onSubmit={handleSubmit}>
                <input
                    value={data.api_key}
                    onChange={e => setData('api_key', e.target.value)}
                />
                <button type="submit">Enregistrer</button>
            </form>
        </AdminLayout>
    );
}
```

## Migrations

Placez vos migrations dans `database/migrations/`. Préfixez vos tables avec le slug du plugin pour éviter les conflits.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cms_my_plugin_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('data')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cms_my_plugin_items');
    }
};
```

## Cycle de vie

| Événement | Hook | Description |
|-----------|------|-------------|
| Activation | `plugin.activating` | Avant activation, permet de vérifier les prérequis |
| Activé | `plugin.activated` | Après activation, exécuter les initialisations |
| Désactivation | `plugin.deactivated` | Nettoyage des ressources temporaires |

## Tester un plugin

Créez vos tests dans un dossier `tests/` à la racine du plugin.

```php
use Tests\TestCase;

class MyPluginTest extends TestCase
{
    public function test_plugin_activates_successfully(): void
    {
        $this->artisan('cms:plugin:activate', ['slug' => 'my-plugin'])
            ->assertExitCode(0);
    }
}
```

Exécutez les tests avec `php artisan test --filter=MyPlugin`.
