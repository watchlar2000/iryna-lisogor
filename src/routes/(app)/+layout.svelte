<script lang="ts">
	import Header from '../Header.svelte';
	import IconInstagram from '../IconInstagram.svelte';
	import IconLinkedIn from '../IconLinkedIn.svelte';
	import IconEmail from '../IconEmail.svelte';

	function convertToSlug(text: string): string {
		return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
	}

	enum WORK_MENU {
		VISUAL_DEVELOPMENT = 'visual development',
		BACKGROUND_PAINTING = 'background painting',
	}

	interface WorkMenuItem {
		title: WORK_MENU,
		slug: string,
	}

	const worksMenuItems: WorkMenuItem[] = [
		{
			title: WORK_MENU.VISUAL_DEVELOPMENT,
			slug: convertToSlug(WORK_MENU.VISUAL_DEVELOPMENT)
		},
		{
			title: WORK_MENU.BACKGROUND_PAINTING,
			slug: convertToSlug(WORK_MENU.BACKGROUND_PAINTING)
		}
	];
</script>

<div
	class="flex flex-col min-h-screen bg-slate-100 text-gray-950 p-5 font-urbanist">
	<Header worksMenuItems={worksMenuItems} />

	<main class="relative flex-1 mt-7 z-0 max-w-[900px] mx-auto">
		<slot />
	</main>

	<footer class="w-full flex justify-center z-50 py-5 mt-5">
		<ul class="flex gap-4">
			<li>
				<a href="https://www.instagram.com/iryna_lisogor/">
					<IconInstagram />
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/iryna-lisogor-72975316a">
					<IconLinkedIn />
				</a>
			</li>
			<li>
				<a href="mailto:email@">
					<IconEmail />
				</a>
			</li>
		</ul>
	</footer>
</div>
