<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let open = false;
	export let onClick = () => {
		dispatch('click');
		open = !open;
	};

	export let ariaLabel = 'Toggle menu';
</script>

<button
	on:click={onClick}
	aria-expanded={open}
	aria-label={ariaLabel}
	class={`button ${$$restProps.class || ''}`}
>
	<svg class:open viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="5">
		<path
			class="top"
			d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
		/>
		<path class="middle" d="m 30,50 h 40" />
		<path
			class="bottom"
			d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
		/>
	</svg>
	Menu
</button>

<style lang="scss">
	button {
		--button-font-size: var(--size-step-1);
		--button-font-weight: 500;
		--button-border-width: 0px;
		--button-bg: none;
		--button-hover-bg: var(--color-surface-800);
		--button-hover-color: var(--color-dark-200);
		--button-active-color: var(--color-dark-100);
		--button-active-bg: var(--color-surface-700);
		--button-transform-scale: 1;
		--button-outline-offset: 0px;
	}

	svg {
		--_transition-duration: 0.25s;
		--_icon-height: 3.5ch;

		padding: 0;

		.top {
			stroke-dasharray: 40 160;
			transition: stroke-dashoffset var(--_transition-duration);
		}

		.middle {
			transform-origin: 50%;
			transition: transform var(--_transition-duration);
		}

		.bottom {
			stroke-dasharray: 40 85;
			transition: stroke-dashoffset var(--_transition-duration);
		}
	}

	.open {
		transform: rotate(45deg);
	}

	.open .top,
	.open .bottom {
		stroke-dashoffset: -64px;
	}

	.open .middle {
		transform: rotate(90deg);
	}
</style>
