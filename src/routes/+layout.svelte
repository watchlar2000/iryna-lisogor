<script>
	import Header from './Header.svelte';
	import '../app.css';
	import IconInstagram from './IconInstagram.svelte';
	import IconLinkedIn from './IconLinkedIn.svelte';
	import IconEmail from './IconEmail.svelte';
</script>

<div class="flex flex-col min-h-full h-screen bg-slate-50 text-gray-950 p-4 font-urbanist">
	<Header />

	<main class="relative flex-1 bg-amber-100 mt-7 z-0">
		<slot />
	</main>

	<footer class="w-full flex justify-center mt-4 z-50">
		<ul class="flex gap-4">
			<li>
				<a href="#">
					<IconInstagram />
				</a>
			</li>
			<li>
				<a href="#">
					<IconLinkedIn />
				</a>
			</li>
			<li>
				<a href="#">
					<IconEmail />
				</a>
			</li>
		</ul>
	</footer>
</div>
