// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.artisancms.dev',
	integrations: [
		starlight({
			title: 'ArtisanCMS',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/artisancms/artisancms' }],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Français',
					lang: 'fr',
				},
			},
			sidebar: [
				{
					label: 'Introduction',
					items: [
						{ label: 'Présentation', slug: 'introduction/overview' },
						{ label: 'Fonctionnalités', slug: 'introduction/features' },
						{ label: 'Architecture', slug: 'introduction/architecture' },
						{ label: 'Stack technique', slug: 'introduction/tech-stack' },
					],
				},
				{
					label: 'Démarrage',
					items: [
						{ label: 'Prérequis', slug: 'getting-started/requirements' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Configuration', slug: 'getting-started/configuration' },
						{ label: 'Premier lancement', slug: 'getting-started/first-launch' },
					],
				},
				{
					label: 'Gestion de contenu',
					items: [
						{ label: 'Pages', slug: 'content/pages' },
						{ label: 'Articles de blog', slug: 'content/posts' },
						{ label: 'Types de contenu personnalisés', slug: 'content/custom-types' },
						{ label: 'Champs personnalisés', slug: 'content/custom-fields' },
						{ label: 'Taxonomies', slug: 'content/taxonomies' },
						{ label: 'Médias', slug: 'content/media' },
						{ label: 'Menus de navigation', slug: 'content/menus' },
						{ label: 'Commentaires', slug: 'content/comments' },
						{ label: 'Révisions', slug: 'content/revisions' },
						{ label: 'Redirections', slug: 'content/redirects' },
					],
				},
				{
					label: 'Page Builder',
					items: [
						{ label: 'Introduction au builder', slug: 'page-builder/overview' },
						{ label: 'Blocs disponibles', slug: 'page-builder/blocks' },
						{ label: 'Blocs de mise en page', slug: 'page-builder/layout-blocks' },
						{ label: 'Blocs de contenu', slug: 'page-builder/content-blocks' },
						{ label: 'Blocs média', slug: 'page-builder/media-blocks' },
						{ label: 'Patterns réutilisables', slug: 'page-builder/patterns' },
						{ label: 'Contenu dynamique', slug: 'page-builder/dynamic-content' },
					],
				},
				{
					label: 'Apparence',
					items: [
						{ label: 'Thèmes', slug: 'appearance/themes' },
						{ label: 'Design Tokens', slug: 'appearance/design-tokens' },
						{ label: 'Sections globales', slug: 'appearance/global-sections' },
						{ label: 'Widgets', slug: 'appearance/widgets' },
						{ label: 'Branding & White-label', slug: 'appearance/branding' },
						{ label: 'Templates de site', slug: 'appearance/templates' },
					],
				},
				{
					label: 'Plugins',
					items: [
						{ label: 'Système de plugins', slug: 'plugins/overview' },
						{ label: 'SEO', slug: 'plugins/seo' },
						{ label: 'E-commerce', slug: 'plugins/ecommerce' },
						{ label: 'Formulaires', slug: 'plugins/form-builder' },
						{ label: 'Assistant IA', slug: 'plugins/ai-assistant' },
						{ label: 'Sauvegarde', slug: 'plugins/backup' },
						{ label: 'Espace membres', slug: 'plugins/member-space' },
						{ label: 'Formulaire de contact', slug: 'plugins/contact-form' },
					],
				},
				{
					label: 'Administration',
					items: [
						{ label: 'Tableau de bord', slug: 'admin/dashboard' },
						{ label: 'Utilisateurs & Rôles', slug: 'admin/users-roles' },
						{ label: 'Paramètres', slug: 'admin/settings' },
						{ label: 'Analytics', slug: 'admin/analytics' },
						{ label: 'Emails & Newsletter', slug: 'admin/emails' },
						{ label: 'Webhooks', slug: 'admin/webhooks' },
						{ label: 'Import / Export', slug: 'admin/import-export' },
						{ label: 'Mises à jour', slug: 'admin/updates' },
						{ label: 'Diagnostic système', slug: 'admin/system' },
					],
				},
				{
					label: 'Multi-site',
					items: [
						{ label: 'Configuration multi-site', slug: 'multisite/overview' },
						{ label: 'Gestion des sites', slug: 'multisite/management' },
					],
				},
				{
					label: 'Développeur',
					items: [
						{ label: 'Hooks & Filtres', slug: 'developer/hooks-filters' },
						{ label: 'Créer un plugin', slug: 'developer/create-plugin' },
						{ label: 'Créer un thème', slug: 'developer/create-theme' },
						{ label: 'Créer un bloc', slug: 'developer/create-block' },
						{ label: 'API REST', slug: 'developer/api' },
						{ label: 'Commandes Artisan', slug: 'developer/commands' },
						{ label: 'Services', slug: 'developer/services' },
						{ label: 'Modèles & Base de données', slug: 'developer/models-database' },
						{ label: 'Middleware', slug: 'developer/middleware' },
						{ label: 'Policies & Permissions', slug: 'developer/policies' },
						{ label: 'Tests', slug: 'developer/testing' },
					],
				},
				{
					label: 'Sécurité',
					items: [
						{ label: 'Vue d\'ensemble', slug: 'security/overview' },
						{ label: 'Authentification', slug: 'security/authentication' },
						{ label: 'Autorisations', slug: 'security/authorization' },
						{ label: 'RGPD & Conformité', slug: 'security/gdpr' },
					],
				},
				{
					label: 'Déploiement',
					items: [
						{ label: 'Mise en production', slug: 'deployment/production' },
						{ label: 'Docker', slug: 'deployment/docker' },
						{ label: 'Performance & Cache', slug: 'deployment/performance' },
					],
				},
			],
		}),
	],
});
