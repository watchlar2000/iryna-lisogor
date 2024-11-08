<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	let menuExpanded = false;
	let activeItemIndex = -1;

	const groups = [
		[{ text: `Edit` }, { text: `Duplicate` }],
		[{ text: `Archive` }, { text: `Move` }],
		[{ text: `Delete` }]
	];

	// Flattened list of menu items for easier navigation
	const items = groups.flat();

	function toggleMenu() {
		menuExpanded = !menuExpanded;
		if (menuExpanded) activeItemIndex = -1; // Reset selection on open
	}

	function handleSelect(option) {
		console.log('Selected option:', option.text);
		menuExpanded = false;
	}

	function handleOutsideClick(event) {
		if (!event.target.closest('.dropdown')) {
			menuExpanded = false;
			activeItemIndex = -1;
		}
	}

	function handleKeyDown(event) {
		if (menuExpanded) {
			switch (event.key) {
				case 'PageUp':
					event.preventDefault();
					activeItemIndex = Math.max(0, activeItemIndex - 1);
					break;
				case 'PageDown':
					event.preventDefault();
					activeItemIndex = Math.min(items.length - 1, activeItemIndex + 1);
					break;
				case 'Enter':
					if (activeItemIndex !== -1) handleSelect(items[activeItemIndex]);
					break;
				case 'Escape':
					menuExpanded = false;
					break;
			}
		}
	}

	onMount(() => {
		window.addEventListener('click', handleOutsideClick);
		window.addEventListener('keydown', handleKeyDown);
	});

	onDestroy(() => {
		window.removeEventListener('click', handleOutsideClick);
		window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<div class="container">
	<div class="dropdown">
		<button on:click={toggleMenu} class="dropdown-button">
			Options
			<span class="chevron">&#x25BC;</span>
		</button>

		{#if menuExpanded}
			<div class="menu" in:scale={{ duration: 100 }} out:fade={{ duration: 75 }}>
				{#each groups as group}
					<div class="menu-group">
						{#each group as option, index}
							<button
								on:click={() => handleSelect(option)}
								class="menu-item {activeItemIndex === index ? 'active' : ''}"
							>
								{option.text}
							</button>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.dropdown {
		position: relative;
		top: 4rem;
		width: 14rem;
		text-align: right;
	}

	.dropdown-button {
		display: inline-flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: #ffffff;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 0.375rem;
		border: none;
		cursor: pointer;
		transition: background-color 0.3s;
	}

	.dropdown-button:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}

	.chevron {
		font-size: 0.875rem;
		color: #d1bce2;
		margin-left: 0.5rem;
	}

	.menu {
		position: absolute;
		right: 0;
		margin-top: 0.5rem;
		width: 100%;
		background-color: #ffffff;
		border-radius: 0.375rem;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		z-index: 10;
	}

	.menu-group {
		padding: 0.25rem 0;
	}

	.menu-item {
		display: flex;
		width: 100%;
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		color: #333333;
		background-color: transparent;
		border: none;
		cursor: pointer;
		transition:
			background-color 0.2s,
			color 0.2s;
		text-align: left;
	}

	.menu-item:hover {
		background-color: #f0f0f0;
	}

	.menu-item.active {
		background-color: #7c3aed;
		color: #ffffff;
	}
</style>
