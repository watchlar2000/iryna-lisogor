<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import { cubicOut } from 'svelte/easing';
	import { scale } from 'svelte/transition';

	export let data;

	$: ({ pathname } = data);
</script>

<div class="app-wrapper">
	<Header />
	{#key pathname}
		<main class="main" in:scale={{ start: 0.9, duration: 350, easing: cubicOut }}>
			<slot />
		</main>
	{/key}
	<Footer />
</div>

<style>
	.main {
		margin-top: var(--space-m);
		margin-inline: auto;
	}
</style>
