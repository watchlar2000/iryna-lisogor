<script>
	import { page } from '$app/stores';

	$: ({ status, error } = $page);
</script>

<div class="wrapper">
	<div class="wrapper__content flow">
		<h2>{status}</h2>
		<p class="error">{error?.message}</p>
		<p>Reload the page and try one more time</p>
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: grid;
		min-height: 100vh;
		place-content: center;
	}

	.wrapper__content {
		width: 25ch;
		max-width: 40ch;
		background-color: var(--color-light);
		padding: var(--space-m);

		h2 {
			font-size: var(--text-size-heading-1);
		}

		a {
			width: max-content;
			font-weight: bold;
			text-decoration: underline;
			font-size: var(--text-size-meta);
		}

		.error {
			font-size: var(--text-size-meta);
			padding: var(--space-xs);
			background-color: var(--color-warning-900);
		}
	}
</style>
