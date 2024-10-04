<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
</script>

<div class="app-wrapper">
	<Header />

	<main class="main">
		<slot />
	</main>
	<Footer />
</div>

<style>
	.main {
		margin-top: var(--space-m);
		margin-inline: auto;
	}
</style>
