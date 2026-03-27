---
title: "Commandes Artisan"
description: "Référence complète des 12 commandes Artisan d'ArtisanCMS : installation, cache, plugins, thèmes, blocs, médias, analytics et mises à jour."
---

ArtisanCMS fournit 12 commandes Artisan dédiées pour gérer le CMS depuis le terminal. Toutes sont préfixées par `cms:`.

## Liste des commandes

| Commande | Description |
|----------|-------------|
| `cms:install` | Assistant d'installation |
| `cms:cache:clear` | Vider tous les caches CMS |
| `cms:plugin:create` | Générer un plugin |
| `cms:theme:create` | Générer un thème |
| `cms:block:create` | Générer un bloc |
| `cms:media:optimize` | Optimiser les images |
| `cms:analytics:aggregate` | Consolider les données analytics |
| `cms:publish-scheduled` | Publier les contenus planifiés |
| `cms:purge-views` | Purger les anciennes données analytics |
| `cms:check-updates` | Vérifier les mises à jour |
| `cms:auto-update` | Mettre à jour automatiquement |
| `cms:seed` | Générer des données de démonstration |

## Installation

```bash
php artisan cms:install
```

Lance l'assistant d'installation interactif qui configure la base de données, crée l'administrateur, installe le thème par défaut et initialise les paramètres du site.

```bash
php artisan cms:install --quick
```

L'option `--quick` utilise les valeurs par défaut pour une installation rapide (utile en CI/CD).

## Gestion du cache

```bash
php artisan cms:cache:clear
```

Vide tous les caches spécifiques au CMS : cache de configuration, cache de templates, cache de menus, cache de thème CSS et cache de blocs. Cette commande est distincte de `php artisan cache:clear` qui ne touche que le cache Laravel standard.

## Génération de plugins, thèmes et blocs

```bash
php artisan cms:plugin:create
```

Génère la structure complète d'un nouveau plugin avec le manifest, le ServiceProvider, les dossiers de routes, migrations et ressources. Voir le guide [Créer un plugin](/developer/create-plugin/).

```bash
php artisan cms:theme:create
```

Génère un nouveau thème avec le manifest, les layouts par défaut, les fichiers CSS et la configuration des paramètres. Voir le guide [Créer un thème](/developer/create-theme/).

```bash
php artisan cms:block:create
```

Génère un bloc personnalisé avec le schéma de données, le composant de rendu React et le panneau de paramètres. Voir le guide [Créer un bloc](/developer/create-block/).

## Optimisation des médias

```bash
php artisan cms:media:optimize
```

Parcourt la bibliothèque de médias et effectue les opérations suivantes :

- Conversion des images JPEG et PNG en format **WebP**
- Génération des tailles responsives (thumbnail, medium, large)
- Compression sans perte visible de qualité
- Mise à jour des références en base de données

Cette commande peut être longue lors de la première exécution sur une bibliothèque existante.

## Analytics

```bash
php artisan cms:analytics:aggregate
```

Consolide les données brutes de visites en statistiques journalières. Agrège les pages vues, visiteurs uniques, sources de trafic et durées de session. Doit être exécutée quotidiennement.

```bash
php artisan cms:purge-views
```

Supprime les données analytics brutes de plus de **90 jours** pour maintenir les performances de la base de données. Les données agrégées sont conservées.

## Publication planifiée

```bash
php artisan cms:publish-scheduled
```

Vérifie les pages et articles dont la date de publication planifiée est dépassée et les publie automatiquement. Met à jour le statut et déclenche les hooks `content.published`.

## Mises à jour

```bash
php artisan cms:check-updates
```

Vérifie si des mises à jour sont disponibles pour le CMS, les plugins installés et les thèmes. Affiche un tableau récapitulatif avec les versions actuelles et disponibles.

```bash
php artisan cms:auto-update
```

Télécharge et installe automatiquement les mises à jour disponibles. Exécute les migrations nécessaires et vide les caches. Il est recommandé de sauvegarder la base de données avant une mise à jour majeure.

## Données de démonstration

```bash
php artisan cms:seed
```

Peuple la base de données avec des contenus de démonstration : pages d'exemple, articles de blog, catégories, médias et menus. Utile pour le développement et les tests.

## Configuration cron recommandée

Ajoutez ces entrées à votre crontab pour automatiser les tâches récurrentes :

```bash
# Publier les contenus planifiés (toutes les minutes)
* * * * * cd /path-to-project && php artisan cms:publish-scheduled >> /dev/null 2>&1

# Consolider les analytics (chaque jour à 2h du matin)
0 2 * * * cd /path-to-project && php artisan cms:analytics:aggregate >> /dev/null 2>&1

# Purger les anciennes données analytics (chaque dimanche à 3h)
0 3 * * 0 cd /path-to-project && php artisan cms:purge-views >> /dev/null 2>&1

# Vérifier les mises à jour (chaque jour à 6h)
0 6 * * * cd /path-to-project && php artisan cms:check-updates >> /dev/null 2>&1

# Optimiser les nouveaux médias (chaque nuit à 4h)
0 4 * * * cd /path-to-project && php artisan cms:media:optimize >> /dev/null 2>&1
```

Alternativement, vous pouvez utiliser le scheduler Laravel dans `app/Console/Kernel.php` :

```php
protected function schedule(Schedule $schedule): void
{
    $schedule->command('cms:publish-scheduled')->everyMinute();
    $schedule->command('cms:analytics:aggregate')->dailyAt('02:00');
    $schedule->command('cms:purge-views')->weeklyOn(0, '03:00');
    $schedule->command('cms:check-updates')->dailyAt('06:00');
    $schedule->command('cms:media:optimize')->dailyAt('04:00');
}
```

Dans ce cas, une seule entrée cron suffit :

```bash
* * * * * cd /path-to-project && php artisan schedule:run >> /dev/null 2>&1
```
