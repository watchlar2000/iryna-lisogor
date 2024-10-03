<script>
	// import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}

		await goto('/');
		// redirect(303, '/');
	};
</script>

<div class="flex w-full min-h-screen bg-slate-50">
	<aside class="flex flex-col justify-between items-start w-[250px] p-6 bg-slate-300 fixed h-full">
		<div>
			<h1 class="text-3xl">Admin panel</h1>
			<ul class="flex flex-col gap-4 mt-6">
				<li><a href="/dashboard"> Home </a></li>
				<li><a href="/dashboard/about"> About page</a></li>
				<li><a href="/"> Return to website</a></li>
				<li class="">
					<a
						class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						href="/dashboard/projects/new"
					>
						+ Add new project
					</a>
				</li>
			</ul>
		</div>
		<button
			class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			on:click={logout}
			type="button"
		>
			Sign out
		</button>
	</aside>
	<main class="w-full min-h-full ml-[250px]">
		<div class="p-8">
			<slot />
		</div>
	</main>
</div>
