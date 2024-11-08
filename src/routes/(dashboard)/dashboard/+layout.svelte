<script>
	import Icon from '$lib/components/Icon.svelte';
</script>

<div class="sidebar">
	<aside class="dashboard__sidebar">
		<nav class="wrapper flow cluster">
			<a href="/dashboard" class="button">
				<Icon name="data" /> Projects
			</a>
			<a href="/dashboard/about" class="button"> <Icon name="info" /> About page</a>
		</nav>
	</aside>
	<main class="dashboard__content wrapper">
		<!-- <header>Hello world</header> -->
		<slot />
	</main>
</div>

<style lang="scss">
	.header {
		padding-block: var(--space-s);

		&__logo {
			padding: 2rem;
			width: min-content;
		}
	}
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
		border-radius: 1rem;
	}

	nav {
		--cluster-direction: column;
		--cluster-wrap: nowrap;
		--cluster-row-gap: 0;
		--cluster-vertical-alignment: stretch;

		.button {
			--button-font-size: var(--size-step--3);
			--button-border-width: 0px;
		}
	}
</style>
