<script>
	import '../app.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<slot />

<!--<div-->
<!--        class="flex flex-col min-h-full h-screen bg-slate-50 text-gray-950 p-5 font-urbanist">-->
<!--    <Header worksMenuItems={works} />-->

<!--    <main class="relative flex-1 mt-7 z-0 max-w-[900px] mx-auto">-->
<!--        <slot />-->
<!--    </main>-->

<!--    <footer class="w-full flex justify-center z-50 py-5">-->
<!--        <ul class="flex gap-4">-->
<!--            <li>-->
<!--                <a href="https://www.instagram.com/iryna_lisogor/">-->
<!--                    <IconInstagram />-->
<!--                </a>-->
<!--            </li>-->
<!--            <li>-->
<!--                <a href="https://www.linkedin.com/in/iryna-lisogor-72975316a">-->
<!--                    <IconLinkedIn />-->
<!--                </a>-->
<!--            </li>-->
<!--            <li>-->
<!--                <a href="mailto:email@">-->
<!--                    <IconEmail />-->
<!--                </a>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </footer>-->
<!--</div>-->
