<script lang="ts">
	import { page } from '$app/stores';
	import DrawerMenu from '$lib/components/DrawerMenu.svelte';
	import MenuButton from '$lib/components/MenuButton.svelte';
	import SocialsNavigation from '$lib/components/SocialsNavigation.svelte';
	import { socialLinksList } from '$lib/data/socialLinksList';
	import { clickOnAnchor } from '$lib/directives/clickOnAnchor';
	import { WorkOption as works } from '$lib/types/common';
	import { transformWorkOptions } from '$lib/utils';
	import MainLogo from './MainLogo.svelte';
	import MainNav from './MainNav.svelte';
	import TestNav from './TestNav.svelte';

	const workMenuItems = transformWorkOptions(works);
	let open = false;

	const toggleDrawer = () => {
		open = !open;
	};
</script>

<header class="header">
	<MainLogo />
	<div class="header__nav">
		<MainNav ariaLabel="main navigation">
			<SocialsNavigation list={socialLinksList} />
		</MainNav>
	</div>

	<!-- <MainLogo />
	<nav aria-label="Main navigation" class="header__nav">
		<MainNav />
		<div class="header__nav-socials">
			<SocialsNavigation list={socialLinksList} />
		</div>
	</nav> -->
	<div class="header__menu-button">
		<MenuButton
			on:click={() => {
				toggleDrawer();
			}}
			{open}
		/>
	</div>
</header>

{#if open}
	<DrawerMenu {open} on:clickAway={toggleDrawer} placement="right">
		<div class="wrapper__drawer cluster">
			<!-- <nav
				aria-label="Mobile main navigation"
				class="wrapper wrapper__drawer-panel"
				use:clickOnAnchor
				on:clickOnAnchor={toggleDrawer}
			> -->
			<MainNav ariaLabel="Mobile main navigation" />
			<!-- <ul role="list" class="flow">
					<li class="dropdown">
						<button
							type="button"
							class="dropdown__title link"
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
				</ul> -->
			<!-- </nav> -->
			<div class="header__nav-socials wrapper">
				<SocialsNavigation list={socialLinksList} iconHeight="2rem" />
			</div>
		</div>
	</DrawerMenu>
{/if}

<style lang="scss">
	.header {
		margin-top: var(--space-m);
		padding-inline: var(--gutter-wrapper-inner);

		display: flex;
		gap: 1em 0.5em;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		align-items: center;
	}

	.header__menu-button {
		align-self: self-start;
		z-index: 100;

		@include respond-to('m') {
			display: none;
		}
	}

	.header__nav {
		display: none;

		@include respond-to('m') {
			display: flex;
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
		}
	}
</style>
