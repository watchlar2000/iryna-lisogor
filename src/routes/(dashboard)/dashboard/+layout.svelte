<script>
	import Icon from '$lib/components/Icon.svelte';
</script>

<div class="sidebar">
	<aside class="dashboard__sidebar">
		<div class="wrapper cluster">
			<ul class="cluster" role="list">
				<li>
					<a href="/dashboard" class="button cluster" data-button-variant="dashboard-link">
						<Icon name="data" height="1.25em" /> Projects
					</a>
				</li>
				<li>
					<a href="/dashboard/about" class="button cluster" data-button-variant="dashboard-link">
						<Icon name="info" height="1.25em" /> About page</a
					>
				</li>
			</ul>
			<!-- <button class="button button__logout" data-button-variant="dashboard-link">Logout</button> -->
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
		width: 100%;
	}

	.dashboard__sidebar {
		background-color: var(--color-dark);
		padding-block: 2rem;
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
			background-color: hsla(0, 0%, 100%, 0.25);
			color: var(--color-light);
		}

		a.cluster {
			--_direction: row;
			--_gap: var(--space-xs);
		}
	}

	.wrapper {
		width: 100%;
		max-width: 60ch;
	}
</style>
