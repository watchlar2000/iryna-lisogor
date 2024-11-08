<script lang="ts">
	import { page } from '$app/stores';
	import { navConfig } from '$lib/config';
	import { PAGE } from '$lib/constants';
	import { clickOutside } from '$lib/directives/clickOutside';
	import { tick } from 'svelte';
	import { fly } from 'svelte/transition';
	import Icon from '../Icon.svelte';

	export let ariaLabel: string;

	let expanded = false;
	let focusedIndex = -1;

	const workMenuItems = navConfig;

	function handleClick(event: Event) {
		if (event.type === 'outclick') {
			expanded = false;
			return;
		}

		expanded = !expanded;
		focusedIndex = expanded ? 0 : -1;
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (!expanded) return;

		console.log(event.key);

		switch (event.key) {
			case 'ArrowDown':
				focusedIndex = (focusedIndex + 1) % workMenuItems.length;
				break;
			case 'ArrowUp':
				focusedIndex = (focusedIndex - 1 + workMenuItems.length) % workMenuItems.length;
				break;
			case ' ':
				document.getElementById(`work-menu-item-${focusedIndex}`)?.click();
				break;
			case 'Escape':
				expanded = false;
				document.querySelector(`.dropdown__title`)?.focus();
				break;
		}
	}

	$: if (expanded) {
		tick().then(() => {
			document.getElementById(`work-menu-item-${focusedIndex}`)?.focus();
		});
	}
</script>

<nav aria-label={ariaLabel} {...$$restProps} class="cluster">
	{#each navConfig as { title, href, items } (title)}
		{#if items && items.length > 0}
			<div class="dropdown">
				<button
					type="button"
					class="dropdown__title"
					aria-controls="id-works-menu"
					aria-haspopup="true"
					aria-expanded={expanded}
					title="Open for more work categories"
					on:click={handleClick}
					on:keydown={handleKeyDown}
					use:clickOutside
					on:outclick={handleClick}
				>
					works
					<Icon
						name="crown"
						height="1.5ch"
						style="transform: rotate({expanded ? 180 : 0}deg); transition: transform 0.2s ease;"
					/>
				</button>

				{#if expanded}
					<ul
						class="dropdown__menu"
						id="id-works-menu"
						role="list"
						transition:fly={{ duration: 150, y: -10 }}
					>
						{#each items as { title, href }, index (title)}
							<li>
								<a
									{href}
									class="exclude"
									id={`work-menu-item-${index}`}
									tabindex="-1"
									on:keydown={handleKeyDown}
								>
									{title}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>
		{:else}
			<a {href} aria-current={$page.url.pathname === href ? PAGE : undefined} class="exclude">
				{title}
			</a>
		{/if}
	{/each}
</nav>

<style lang="scss">
	nav {
		z-index: 99;

		a,
		button {
			--_font-size: var(--size-step-1);
			--_font-weight: inherit;
			--_border-radius: 0px;
			--_padding-inline: 1.5ch;
			--_padding-block: 1ch;
			--_outline-offset: 0px;
			--_border-width: 0px;

			&:active {
				background-color: var(--color-surface-800);
			}
		}

		a {
			text-decoration: none;
		}

		button {
			--_bg: none;
			--_hover-bg: none;
			--_hover-color: curretColor;

			&:active {
				transform: none;
			}
		}

		.dropdown {
			position: relative;
		}

		.dropdown__title {
			touch-action: manipulation;
			user-select: none;
			-webkit-tap-highlight-color: transparent;
		}

		.dropdown__menu {
			position: absolute;
			background: hsl(0, 0%, 98%);
			top: 67px;
			left: 50%;
			transform: translate(-50%);

			& > li {
				display: flex;
				justify-content: center;
				width: 100%;
				min-width: 18ch;
				text-align: center;

				a {
					width: 100%;
					padding-inline: 1.25ch;
					padding-block: 0.75ch;
				}
			}
		}
	}
</style>
