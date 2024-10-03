<script lang="ts">
	import { page } from '$app/stores';
	import DrawerMenu from '$lib/components/DrawerMenu.svelte';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import SocialsNavigation from '$lib/components/SocialsNavigation.svelte';
	import { socialLinksList } from '$lib/data/socialLinksList';
	import { clickOnAnchor } from '$lib/directives/clickOnAnchor';
	import { WorkOption as works } from '$lib/types/common';
	import { transformWorkOptions } from '$lib/utils';

	const workMenuItems = transformWorkOptions(works);
	let open = false;

	const toggleDrawer = () => {
		open = !open;
	};
</script>

<header class="header">
	<a href="/" class="header__logo">Iryna Lisogor</a>
	<nav aria-label="Main navigation" class="header__nav">
		<ul role="list">
			<li class="dropdown">
				<button
					type="button"
					class="dropdown__title"
					aria-expanded="false"
					aria-controls="id-works-menu"
				>
					works
				</button>
				<ul class="dropdown__menu" id="id-works-menu" role="list">
					{#each workMenuItems as { title, slug } (slug)}
						<li>
							<a href={`/${slug}`}>
								{title}
							</a>
						</li>
					{/each}
				</ul>
			</li>
			<li aria-current={$page.url.pathname === '/playground' ? 'page' : undefined}>
				<a href="/playground"> playground </a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about"> about </a>
			</li>
			<li class="header__nav-socials">
				<SocialsNavigation list={socialLinksList} />
			</li>
		</ul>
	</nav>
	<MenuButton
		class="button menu"
		data-button-radius="hard"
		on:click={() => {
			toggleDrawer();
		}}
		{open}
	/>

	{#if open}
		<DrawerMenu {open} on:clickAway={toggleDrawer} placement="top">
			<nav
				aria-label="Mobile main navigation"
				class="wrapper wrapper__drawer"
				use:clickOnAnchor
				on:clickOnAnchor={toggleDrawer}
			>
				<ul role="list">
					<li class="dropdown">
						<button
							type="button"
							class="dropdown__title"
							aria-expanded="false"
							aria-controls="id-works-menu-mobile"
						>
							works
						</button>
						<ul class="dropdown__menu" id="id-works-menu-mobile" role="list">
							{#each workMenuItems as { title, slug } (slug)}
								<li>
									<a href={`/${slug}`}>
										{title}
									</a>
								</li>
							{/each}
						</ul>
					</li>
					<li aria-current={$page.url.pathname === '/playground' ? 'page' : undefined}>
						<a href="/playground"> playground </a>
					</li>
					<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
						<a href="/about"> about </a>
					</li>
					<li class="header__nav-socials">
						<SocialsNavigation list={socialLinksList} --svg-height="3rem" />
					</li>
				</ul>
			</nav>
		</DrawerMenu>
	{/if}
</header>

<style lang="scss">
	.wrapper__drawer {
		margin: 10rem 0 5rem;
		display: flex;
		justify-content: center;

		ul {
			font-size: var(--text-size-heading-1);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--space-m);
		}

		a {
			text-decoration: none;
		}

		.collapse {
			text-align: center;
		}

		.collapse__list {
			margin-top: var(--space-m);
			font-size: var(--text-size-heading-3);
		}
	}

	.header :global(.menu) {
		display: flex;
		--button-color: inherit;
		--button-hover-color: inherit;
		--button-bg: none;
		--button-hover-bg: none;
		--button-padding: var(--space-s);
		--button-outline-width: 2px;
		--button-outline-style: dashed;
		--button-outline-offset: 0;
		--button-border-width: 0;
		--button-gap: 0;

		font-weight: normal;
		font-size: var(--size-step-3);

		z-index: 100;

		@include respond-to('m') {
			display: none;
		}
	}

	.header {
		padding-inline: var(--gutter-wrapper-inner);

		display: flex;
		gap: 1em 0.5em;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		align-items: center;
	}

	.header__logo {
		--outline-offset: 0;

		font-size: var(--text-logo);
		line-height: 1.1;
		font-style: normal;
		text-decoration: none;

		width: min-content;
		margin-top: var(--space-m);
		padding: 0.1em 0.25em;
		text-transform: uppercase;
		font-weight: normal;
	}

	.header__nav {
		display: none;

		@include respond-to('m') {
			display: block;
		}

		ul {
			display: grid;
			align-items: center;
			font-size: var(--size-step-2);
			font-weight: normal;
		}

		> ul {
			grid-auto-flow: column;
			gap: 0.5em;

			// > li {
			// 	a,
			// 	.dropdown__title {
			// 		text-decoration: none;
			// 		text-align: center;
			// 		display: inline-block;
			// 		padding: 0.5em 1em;
			// 	}

			// 	a:hover,
			// 	.dropdown__title:hover {
			// 		text-decoration: underline;
			// 	}

			// 	a:focus,
			// 	.dropdown__title:focus {
			// 		text-decoration: underline;
			// 		outline: none;
			// 		background-color: transparent;
			// 	}
			// }
		}
	}

	.header nav li {
		a,
		.dropdown__title {
			text-decoration: none;
			text-align: center;
			display: inline-block;
			padding: 0.5em 1em;
		}

		a:hover,
		.dropdown__title:hover {
			text-decoration: underline;
		}

		a:focus,
		.dropdown__title:focus {
			text-decoration: underline;
			outline: none;
			background-color: transparent;
		}
	}

	// > :global(*) {
	// 		width: var(--size-step-3);
	// 	}

	// :global(.header__burger) {
	// 	display: block;

	// 	@include respond-to('m') {
	// 		display: none;
	// 	}
	// }

	.header__nav-socials {
		display: flex;
	}

	.dropdown {
		position: relative;

		&:hover .dropdown__menu,
		&:focus-within .dropdown__menu {
			opacity: 1;
			transform: rotateX(0) translateX(-50%);
			visibility: visible;
			transition-delay: 0.1s;
		}

		&:hover .dropdown__title::after,
		&:focus-within .dropdown__title::after {
			transform: translateX(-50%) scale(-1);
		}
	}

	.dropdown__menu {
		position: absolute;
		background: var(--color-light-gray);
		transform-origin: top;
		opacity: 1;
		transition: 0.15s all ease-in;
		left: 50%;
		transform: rotateX(-90deg) translate(-50%);
	}

	.dropdown__menu > li {
		max-width: 20ch;

		a {
			width: max-content;
		}

		// @include respond-to('sm') {
		// 	min-width: 20ch;
		// }
	}

	.dropdown__title {
		display: inline-flex;
		align-items: center;
		position: relative;

		&:after {
			position: absolute;
			content: '';
			border: 0.6em solid transparent;
			border-top-color: var(--color-light-gray);
			bottom: -0.6em;
			left: 50%;
			transform: translateX(-50%) scaleY(1);
			transform-origin: center 0.3em;
			transition: all 0.15s ease-in-out 0s;
		}

		&:hover::after,
		&:focus::after {
			transform: translateX(-50%) scaleY(-1);
		}
	}
</style>
