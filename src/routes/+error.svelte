<script>
	import { page } from '$app/stores';
</script>

<div class="wrapper">
	<div class="wrapper__content flow">
		<h2>{$page.status}</h2>
		<p>{$page.error?.message}</p>
		<a href="/" class="link">Click to go home</a>
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
	}
</style>
