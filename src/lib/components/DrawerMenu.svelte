<script lang="ts">
	import { toggleScrollLock } from '$lib/helpers/togglecrollLock';
	import { createEventDispatcher, onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fade, slide } from 'svelte/transition';

	// const MOBILE_MENU_CLOSE_WIDTH = 900;

	export let open: boolean = false;
	export let placement: Placement = 'left';

	const dispatch = createEventDispatcher();

	const isPanelVertical = placement === 'top' || placement === 'bottom';

	type Placement = 'left' | 'right' | 'top' | 'bottom';

	export let size: string = isPanelVertical ? '25ch' : '40ch';

	const transitionConfig = {
		duration: 300,
		// delay: 100,
		easing: quintOut,
		axis: isPanelVertical ? 'y' : 'x'
	};

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
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="overlay" on:click={handleClickAway} transition:fade={transitionConfig} />

	<div
		class="panel {placement}"
		class:size
		data-wrapper-type="inner"
		transition:slide={transitionConfig}
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
		background: var(--color-global-bg);
		z-index: 3;
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
