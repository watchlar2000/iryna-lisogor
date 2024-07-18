<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	let show = false;
	let menu = null; // menu wrapper DOM reference
	let menuMobile = null; // menu wrapper DOM reference
	let showMobileMenu = false;

	let worksSubmenu = false;

	const toggleWorksSubmenu = () => {
		worksSubmenu = !worksSubmenu;
	};

	const toggleMobileMenu = () => {
		showMobileMenu = !showMobileMenu;
	};

	const closeMobileMenu = () => {
		if (!showMobileMenu) {
			showMobileMenu = false;
		}
	};

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && menu && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<header class="flex justify-between items-center">
	<div class="corner z-50">
		<a href="/">
			<h1 class="text-5xl">Iryna <br /> Lisogor</h1>
		</a>
	</div>
	<!--	Desktop Manu-->
	<nav class="hidden md:block">
		<ul class="flex gap-4 text-2xl">
			<!--			<li aria-current={$page.url.pathname === '/works' ? 'page' : undefined}>-->
			<!--				<a href="/works">works</a>-->
			<!--			</li>-->
			<li bind:this={menu} class="relative">
				<div>
					<button class="menu focus:outline-none focus:underline" on:click={() => (show = !show)}>
						works
					</button>

					{#if show}
						<div
							in:scale={{ duration: 100, start: 0.95 }}
							out:scale={{ duration: 75, start: 0.95 }}
							class="absolute z-100 mt-5 w-max rounded shadow-md bg-white translate-x-[50%] right-[50%]"
						>
							<a
								href="/works/visual-development"
								class="block px-4 py-2 hover:bg-amber-600 transition-all"
							>
								visual development
							</a>
							<a
								href="/works/background-painting"
								class="block px-4 py-2 hover:bg-amber-600 transition-all"
							>
								background painting
							</a>
						</div>
					{/if}
				</div>
			</li>
			<li aria-current={$page.url.pathname === '/playground' ? 'page' : undefined}>
				<a class="focus:outline-none focus:underline" href="/playground"> playground </a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a class="focus:outline-none focus:underline" href="/about"> about </a>
			</li>
		</ul>
	</nav>
	<!--	Mobile Menu-->

	<button
		class="md:hidden z-50 group h-20 w-20 flex cursor-pointer items-center justify-center hover:bg-white focus:outline-none focus:bg-white"
		on:click={toggleMobileMenu}
	>
		<span class="space-y-2">
			<span
				class="block h-0.5 w-10 origin-center rounded-full bg-slate-900 transition-transform ease-in-out {showMobileMenu &&
					'translate-y-2.5 rotate-45'}"
			/>
			<span
				class="block h-0.5 origin-center rounded-full bg-slate-900 transition-transform ease-in-out delay-100 {showMobileMenu &&
					'w-0'}"
			/>
			<span
				class="block h-0.5 w-10 origin-center rounded-full bg-slate-900 transition-transform ease-in-out {showMobileMenu &&
					'-translate-y-2.5 -rotate-45'}"
			/>
		</span>
	</button>
	<aside
		class="absolute z-30 px-4 py-40 w-full bottom-0 top-0 border-r-2 shadow-lg bg-amber-600 delay-100 transition-all {showMobileMenu
			? 'left-0'
			: '-left-[100%]'}"
	>
		<nav class="text-5xl p-12 bg-blue-300 h-full mx-5">
			<ul class="flex flex-col gap-10">
				<li bind:this={menuMobile} class="relative">
					<div>
						<button
							class="focus:outline-none focus:underline hover:underline"
							on:click={toggleWorksSubmenu}
						>
							works
						</button>

						{#if worksSubmenu}
							<div
								class="font-urbanist text-3xl font-light mt-4"
								in:scale={{ duration: 100, start: 0.95 }}
								out:scale={{ duration: 75, start: 0.95 }}
							>
								<a
									class="block py-2 focus:outline-none focus:underline hover:underline"
									href="/works/visual-development"
								>
									visual development
								</a>
								<a
									class="block py-2 focus:outline-none focus:underline hover:underline"
									href="/works/background-painting"
								>
									background painting
								</a>
							</div>
						{/if}
					</div>
				</li>
				<li aria-current={$page.url.pathname === '/playground' ? 'page' : undefined}>
					<a class="focus:outline-none focus:underline hover:underline" href="/playground">
						playground
					</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a class="focus:outline-none focus:underline hover:underline" href="/about"> about </a>
				</li>
			</ul>
		</nav>
	</aside>
</header>
