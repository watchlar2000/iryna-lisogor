<script lang="ts">
	import { page } from '$app/stores';
	import type { WorkMenuItem } from '$lib/types';
	import { WorkOption as works } from '$lib/types';
	import { transformWorkOptions } from '$lib/utils';
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { scale } from 'svelte/transition';

	// export let workMenuItems;

	const workMenuItems: WorkMenuItem[] = transformWorkOptions(works);

	let isOpen = false;
	let dropdownOpen = false;

	let navPosition = tweened(-100, {
		duration: 500,
		easing: quintOut
	});

	let desktopDropdownOpen = false;
	let desktopDropdown = null;

	function toggleMenu() {
		isOpen = !isOpen;
		navPosition.set(isOpen ? 0 : -100);

		if (isOpen) {
			document.body.classList.add('overflow-hidden');
		} else {
			document.body.classList.remove('overflow-hidden');
		}

		if (isOpen) {
			// document.body.style.position = 'fixed';

			document.body.style.height = '100vh';
			document.body.style.overflowY = 'hidden';
		} else {
			// document.body.style.position = '';

			document.body.style.height = 'auto';
			document.body.style.overflowY = 'visible';
		}
	}

	function toggleDropdown() {
		dropdownOpen = !dropdownOpen;
	}

	function toggleDesktopDropdown() {
		desktopDropdownOpen = !desktopDropdownOpen;
	}

	function navigateTo() {
		// setTimeout(() => {
		// 	// Simulate navigation, replace with actual navigation logic
		// 	window.location.href = page;
		// }, 100); // Match this duration with the transition duration

		setTimeout(() => {
			toggleMenu();
		}, 200);
	}

	onMount(() => {
		const handleOutsideClick = (event) => {
			if (desktopDropdownOpen && desktopDropdown && !desktopDropdown.contains(event.target)) {
				desktopDropdownOpen = false;
			}
		};

		const handleEscape = (event) => {
			if (desktopDropdownOpen && event.key === 'Escape') {
				desktopDropdownOpen = false;
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

<header>
	<div class="flex justify-between items-center">
		<a href="/" class="z-50">
			<h1 class="text-5xl">Iryna <br /> Lisogor</h1>
		</a>
		<button
			class="md:hidden z-50 group h-20 w-20 flex cursor-pointer items-center justify-center hover:bg-white focus:outline-none focus:bg-white"
			on:click={toggleMenu}
		>
			<span class="space-y-2">
				<span
					class="block h-0.5 w-10 origin-center rounded-full bg-slate-900 transition-transform ease-in-out {isOpen &&
						'translate-y-2.5 rotate-45'}"
				/>
				<span
					class="block h-0.5 origin-center rounded-full bg-slate-900 transition-transform ease-in-out delay-100 {isOpen &&
						'w-0'}"
				/>
				<span
					class="block h-0.5 w-10 origin-center rounded-full bg-slate-900 transition-transform ease-in-out {isOpen &&
						'-translate-y-2.5 -rotate-45'}"
				/>
			</span>
		</button>

		<nav class="hidden md:block">
			<ul class="flex gap-10 text-2xl">
				<!--			<li aria-current={$page.url.pathname === '/works' ? 'page' : undefined}>-->
				<!--				<a href="/works">works</a>-->
				<!--			</li>-->
				<li bind:this={desktopDropdown} class="relative">
					<div>
						<button
							class="menu focus:outline-none focus:underline"
							on:click={toggleDesktopDropdown}
						>
							works
						</button>

						{#if desktopDropdownOpen}
							<div
								in:scale={{ duration: 100, start: 0.95 }}
								out:scale={{ duration: 75, start: 0.95 }}
								class="absolute z-50 mt-5 w-max rounded shadow-md bg-white translate-x-[50%] right-[50%]"
							>
								{#each workMenuItems as { title, slug }}
									<a
										href={slug}
										class="block px-4 py-2 hover:bg-amber-600 transition-all"
										on:click={() => (desktopDropdownOpen = false)}
									>
										{title}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</li>
				<li aria-current={$page.url.pathname === '/playground' ? 'page' : undefined}>
					<a
						class="focus:outline-none focus:underline"
						href="/playground"
						on:click={toggleDropdown}
					>
						playground
					</a>
				</li>
				<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a class="focus:outline-none focus:underline" href="/about" on:click={toggleDropdown}>
						about
					</a>
				</li>
			</ul>
		</nav>
	</div>

	<!-- Mobile Navigation -->
	<nav
		class="fixed top-0 left-0 w-full h-full bg-amber-600 flex justify-center items-center md:hidden z-30"
		style="transform: translateX({$navPosition}%)"
	>
		<ul class="text-center text-6xl space-y-8">
			<li class="relative">
				<div>
					<button
						class="focus:outline-none focus:underline hover:underline"
						on:click={toggleDropdown}
					>
						works
					</button>

					{#if dropdownOpen}
						<div
							class="font-urbanist text-3xl font-light mt-4"
							in:scale={{ duration: 100, start: 0.95 }}
							out:scale={{ duration: 75, start: 0.95 }}
						>
							{#each workMenuItems as { title, slug }}
								<a
									href={slug}
									class="block px-4 py-2 hover:bg-amber-600 transition-all"
									on:click={navigateTo}
								>
									{title}
								</a>
							{/each}
						</div>
					{/if}
				</div>
			</li>
			<li aria-current={$page.url.pathname === '/playground' ? 'page' : undefined}>
				<a
					class="focus:outline-none focus:underline hover:underline"
					href="/playground"
					on:click={navigateTo}
				>
					playground
				</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a
					class="focus:outline-none focus:underline hover:underline"
					href="/about"
					on:click={navigateTo}
				>
					about
				</a>
			</li>
		</ul>
	</nav>
</header>
