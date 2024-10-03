<script lang="ts">
	import { toggleScrollLock } from '$lib/helpers/togglecrollLock';
	import { createEventDispatcher, onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	// const MOBILE_MENU_CLOSE_WIDTH = 900;

	type Placement = 'left' | 'right' | 'top' | 'bottom';

	export let open: boolean = false;
	export let placement: Placement = 'left';
	export let size: string = '25ch';

	const dispatch = createEventDispatcher();

	$: style = `--size: ${size};`;

	const handleClickAway = () => {
		dispatch('clickAway');
	};

	const handleKeyDown = (event) => {
		const escapeKey = event.key === 'Escape';

		if (open && escapeKey) {
			handleClickAway();
		}
	};

	// const handleWindowResize = () => {
	// 	if (!open) return;

	// 	if (open && innerWidth > MOBILE_MENU_CLOSE_WIDTH) {
	// 		handleClickAway();
	// 	}
	// };

	onMount(() => {
		toggleScrollLock();
		// window.addEventListener('resize', handleWindowResize);

		return () => {
			toggleScrollLock();
			// window.removeEventListener('resize', handleWindowResize);
		};
	});
</script>

<svelte:window on:keydown={handleKeyDown} />

<aside class="drawer" class:open {style}>
	<div class="overlay" on:click={handleClickAway} />

	<div
		class="panel {placement}"
		class:size
		transition:slide={{ duration: 250, easing: quintOut, axis: 'y' }}
		data-wrapper-type="inner"
	>
		<slot />
	</div>
</aside>

<style>
	.drawer {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		overflow: auto;
	}

	.drawer.open {
		z-index: 99;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: contrast(40%) blur(2px);
	}

	.panel {
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--color-light);
		z-index: 3;
		overflow: auto;
	}

	.panel.left {
		left: 0;
		transform: translate(-100%, 0);
	}

	.panel.right {
		right: 0;
		transform: translate(100%, 0);
	}

	.panel.top {
		top: 0;
		right: 0;
		left: 0;
		transform: translate(0, -100%);
	}

	.panel.bottom {
		bottom: 0;
		transform: translate(0, 100%);
	}

	.panel.left.size,
	.panel.right.size {
		max-width: var(--size);
	}

	.panel.top.size,
	.panel.bottom.size {
		height: max-content;
	}

	.drawer.open .panel {
		transform: translate(0, 0);
	}
</style>
