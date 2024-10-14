<script>
	import Icon from '$lib/components/Icon.svelte';
</script>

<div class="sidebar">
	<aside class="dashboard__sidebar">
		<!-- <h1 class="">Admin panel</h1> -->
		<div class="wrapper">
			<ul class="cluster" role="list">
				<li>
					<a href="/dashboard" class="button cluster" data-button-variant="dashboard-link">
						<Icon name="home" /> Dashboard
					</a>
				</li>
				<li>
					<a href="/dashboard/about" class="button" data-button-variant="dashboard-link">
						About page</a
					>
				</li>
				<li>
					<a href="/" class="button" data-button-variant="dashboard-link"> Return to website</a>
				</li>
				<li>
					<a href="/" class="button" data-button-variant="dashboard-link"> + Add new project </a>
				</li>
			</ul>
		</div>
	</aside>
	<main class="dashboard__content wrapper">
		<slot />
	</main>
</div>

<style lang="scss">
	.sidebar {
		display: flex;
		flex-wrap: nowrap;
		gap: var(--space-s);
		min-block-size: 100vh;
	}

	.dashboard__sidebar {
		// --flow-space: 5em;

		font-size: var(--text-size-base);

		background-color: var(--color-light);
		// padding-inline: 1.5rem;
		padding-block: 1.5rem;
	}

	.dashboard__content {
		padding-block: 1.5rem;
	}

	.cluster {
		--_direction: column;
		--_wrap: nowrap;
		--_row-gap: var(--space-s);
		--_vertical-alignment: stretch;

		li a {
			width: 100%;
		}

		a.cluster {
			--_direction: row;
			--_gap: var(--space-xs);
		}
	}

	.wrapper {
		max-width: 50ch;
	}
</style>
