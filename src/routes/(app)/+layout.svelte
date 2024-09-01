<script lang="ts">
	import Footer from '../Footer.svelte';
	import Header from '../Header.svelte';
</script>

<div
	class="flex flex-col min-h-screen bg-slate-100 text-gray-950 p-5 font-urbanist selection:bg-amber-300"
>
	<Header />

	<main class="relative flex-1 mt-10 z-0 max-w-[900px] mx-auto">
		<slot />
	</main>

	<Footer />
</div>
