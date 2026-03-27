---
title: "Services"
description: "Vue d'ensemble des 41 services d'ArtisanCMS organisés par domaine : contenu, utilisateurs, médias, personnalisation, administration, système et analytics."
---

ArtisanCMS utilise une architecture orientée services. Les 41 services situés dans `app/Services/` encapsulent la logique métier et sont injectables via le conteneur de dépendances Laravel.

## Injection de dépendances

Tous les services sont enregistrés dans le conteneur IoC de Laravel. Injectez-les via le constructeur ou la méthode.

```php
use App\Services\PageService;

class PageController extends Controller
{
    public function __construct(private PageService $pageService) {}

    public function show(string $slug)
    {
        $page = $this->pageService->findBySlug($slug);
        return inertia('Pages/Show', compact('page'));
    }
}
```

Injection par méthode dans les routes :

```php
Route::get('/pages', function (PageService $pageService) {
    return $pageService->getAllPublished();
});
```

## Contenu

Services de gestion du contenu éditorial.

| Service | Description |
|---------|-------------|
| `PageService` | CRUD des pages, publication, révisions, duplication |
| `PostService` | CRUD des articles de blog, catégorisation, tags |
| `ContentTypeService` | Gestion des types de contenu personnalisés |
| `ContentSanitizer` | Nettoyage et validation du HTML des contenus |
| `DynamicContentService` | Résolution des contenus dynamiques (blocs conditionnels, personnalisation) |

## Utilisateurs

Services de gestion des utilisateurs et des rôles.

| Service | Description |
|---------|-------------|
| `UserService` | CRUD des utilisateurs, recherche, filtrage |
| `RoleService` | Gestion des rôles et attribution des permissions |
| `AvatarService` | Génération et gestion des avatars utilisateurs |

## Médias

Services de gestion de la bibliothèque de médias.

| Service | Description |
|---------|-------------|
| `MediaService` | Upload, métadonnées, recherche de médias |
| `ImageOptimizer` | Conversion WebP, redimensionnement, compression |
| `MediaFolderService` | Organisation en dossiers de la bibliothèque |
| `OrphanMediaDetectorService` | Détection des médias non utilisés |
| `StockPhotoService` | Intégration avec les banques d'images externes |

## Personnalisation

Services de personnalisation visuelle et structurelle du site.

| Service | Description |
|---------|-------------|
| `DesignTokenService` | Gestion des tokens de design (couleurs, polices, espacements) |
| `BrandingService` | Logo, favicon, couleurs de marque |
| `GlobalSectionService` | Sections globales réutilisables (header, footer) |
| `MenuService` | Création et gestion des menus de navigation |
| `TaxonomyService` | Catégories, tags et taxonomies personnalisées |

## Organisation du contenu

Services d'organisation et de structuration du contenu.

| Service | Description |
|---------|-------------|
| `BlockPatternService` | Modèles de blocs prédéfinis réutilisables |
| `CustomFieldService` | Champs personnalisés polymorphiques |
| `PopupService` | Gestion des popups et modales |
| `WidgetService` | Widgets de la barre latérale et du footer |

## Administration

Services du tableau de bord et de l'administration.

| Service | Description |
|---------|-------------|
| `DashboardService` | Widgets et données du tableau de bord |
| `NotificationService` | Notifications système et utilisateur |
| `ActivityLogService` | Journal d'activité (qui a fait quoi, quand) |
| `CommentService` | Gestion des commentaires et modération |

## Email

Services de gestion des emails et newsletters.

| Service | Description |
|---------|-------------|
| `EmailTemplateService` | Templates d'emails personnalisables |
| `NewsletterService` | Gestion des abonnés et envoi de newsletters |

## Système

Services techniques et d'infrastructure.

| Service | Description |
|---------|-------------|
| `InstallerService` | Logique de l'assistant d'installation |
| `TemplateService` | Résolution et rendu des templates |
| `UpdateService` | Vérification et installation des mises à jour |
| `DatabaseConfigurator` | Configuration dynamique de la connexion BDD |
| `HealthCheckService` | Vérification de l'état du système (BDD, disque, queue) |
| `ErrorRecoveryService` | Mode dégradé et récupération après erreur |
| `RequirementsChecker` | Vérification des prérequis système (PHP, extensions) |

## Analytics

Services de suivi et d'analyse.

| Service | Description |
|---------|-------------|
| `AnalyticsService` | Collecte et agrégation des statistiques de visites |
| `SearchService` | Indexation et recherche full-text |
| `SessionTrackingService` | Suivi des sessions visiteurs |

## Externe

Services d'intégration avec des systèmes tiers.

| Service | Description |
|---------|-------------|
| `WebhookService` | Envoi et réception de webhooks |
| `ImportExportService` | Import/export de contenus (JSON, CSV, WordPress) |

## Pattern utilisé

Les services suivent un pattern cohérent dans ArtisanCMS :

1. **Injection des dépendances** : les services reçoivent leurs dépendances via le constructeur.
2. **Méthodes publiques** : interface claire avec des méthodes nommées selon l'action (`create`, `update`, `delete`, `findBy*`).
3. **Événements** : les services déclenchent des hooks après les opérations importantes.
4. **Validation** : la validation des données est effectuée dans les Form Requests, pas dans les services.

```php
// Exemple de structure type d'un service
class PageService
{
    public function __construct(
        private Page $model,
        private ContentSanitizer $sanitizer,
    ) {}

    public function create(array $data): Page
    {
        $data['body'] = $this->sanitizer->clean($data['body']);
        $page = $this->model->create($data);

        \CMS::doAction('content.saved', $page);

        return $page;
    }

    public function findBySlug(string $slug): ?Page
    {
        return $this->model->where('slug', $slug)
            ->where('status', 'published')
            ->first();
    }
}
```

## Créer un service personnalisé

Créez votre service dans `app/Services/` et enregistrez-le si nécessaire dans un ServiceProvider.

```php
// app/Services/MyCustomService.php
namespace App\Services;

class MyCustomService
{
    public function __construct(private PageService $pages) {}

    public function getLatestPages(int $count = 5): Collection
    {
        return $this->pages->getPublished()->take($count);
    }
}
```

Les services sans interface peuvent être résolus automatiquement par le conteneur sans enregistrement explicite.
