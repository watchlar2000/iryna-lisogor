<script lang="ts">
	import DrawerMenu from '$lib/components/DrawerMenu.svelte';
	import MenuButton from '$lib/components/Header/MenuButton.svelte';
	import SocialsNavigation from '$lib/components/SocialsNavigation.svelte';
	import { socialLinksList } from '$lib/data/socialLinksList';
	import MainLogo from './MainLogo.svelte';
	import MainNav from './MainNav.svelte';

	let open = false;

	const toggleDrawer = () => {
		open = !open;
	};
</script>

<header class="header">
	<MainLogo />
	<div class="header__nav">
		<MainNav ariaLabel="Desktop main navigation" />
		<div>
			<SocialsNavigation list={socialLinksList} --link-padding-inline="1.5ch" />
		</div>
	</div>
	<div class="header__menu-button">
		<MenuButton on:click={toggleDrawer} {open} />
	</div>
</header>
{#if open}
	<DrawerMenu {open} on:clickAway={toggleDrawer} placement="right">
		<div class="wrapper__drawer">
			<div>
				<MainNav
					ariaLabel="Mobile main navigation"
					--cluster-direction="column"
					--menu-font-size="var(--text-size-heading-1)"
					on:closeModal={toggleDrawer}
				/>
			</div>
			<SocialsNavigation list={socialLinksList} iconHeight="2.25rem" --link-padding="1.5ch" />
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
		z-index: 100;

		@include respond-to('m') {
			display: none;
		}
	}

	.header__nav {
		display: none;

		@include respond-to('m') {
			display: flex;
			align-items: stretch;
			gap: var(--space-s);
		}
	}

	.wrapper__drawer {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 7.5rem;
		gap: var(--space-l);

		min-height: calc(100vh - 7.5rem);
		padding: var(--space-l);
		overflow-y: auto;

		& > div:first-child {
			flex: 1;
		}
	}
</style>
