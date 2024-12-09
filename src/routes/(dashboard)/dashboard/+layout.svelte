<script>
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';

	import { Toaster } from 'svelte-french-toast';
</script>

<Toaster position="bottom-center" />
<div class="sidebar">
	<aside class="dashboard__sidebar">
		<nav class="wrapper flow cluster">
			<a
				href="/dashboard/projects"
				class="button exclude"
				class:active={$page.url.pathname === '/dashboard/projects'}
			>
				<Icon name="data" /> Projects
			</a>
			<a
				href="/dashboard/about"
				class="button exclude"
				class:active={$page.url.pathname === '/dashboard/about'}
			>
				<Icon name="info" /> About
			</a>
			<a
				href="/dashboard/images"
				class="button exclude"
				class:active={$page.url.pathname === '/dashboard/images'}
			>
				<Icon name="info" /> Images
			</a>
		</nav>
	</aside>
	<main class="dashboard__content wrapper">
		<slot />
	</main>
</div>

<style lang="scss">
	.sidebar {
		display: flex;
		flex-wrap: nowrap;
		min-block-size: 100vh;
		width: 100%;
	}

	.dashboard__sidebar {
		min-width: max-content;
		padding-block: var(--space-m);
	}

	.dashboard__content {
		width: 100%;
		max-width: 55ch;
		padding-block: var(--space-m);
		background-color: hsl(0, 0%, 96%);
		margin-block: var(--space-m);
		border-radius: var(--button-border-radius);
	}

	nav {
		--cluster-direction: column;
		--cluster-wrap: nowrap;
		--cluster-row-gap: 0;
		--cluster-vertical-alignment: stretch;

		.button {
			text-decoration: none;

			--_font-size: var(--size-step--3);
			--_font-weight: 500;
			--_bg: var(--color-surface-800);
			--_hover-color: currentColor;
			--_hover-bg: var(--color-surface-700);
			--_hover-color: var(--color-dark-200);
			--_active-bg: var(--color-surface-600);
			--_active-color: var(--color-dark-100);

			--_border-width: 3px;

			--_padding-inline: var(--space-s);
			--_padding-block: var(--space-xs);

			--_border-radius: var(--button-border-radius);
		}

		.active {
			--_bg: var(--color-accent-800);
			--_font-weight: 700;
		}
	}
</style>
