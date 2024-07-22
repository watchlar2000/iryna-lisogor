<div
	class="flex flex-col min-h-full h-screen bg-blue-200 text-gray-950 p-5 font-urbanist"
>
	<header class="flex w-full justify-between">
		<h2 class="text-3xl">Dashboard</h2>
		<button>Logout</button>
	</header>

	<main class="mt-7 max-w-[900px] bg-amber-600">
		<slot />
	</main>
</div>
