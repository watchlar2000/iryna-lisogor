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
					class="dropdown__title link"
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
	<div class="header__menu-button">
		<MenuButton
			data-button-radius="menu"
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
			<nav
				aria-label="Mobile main navigation"
				class="wrapper wrapper__drawer-panel"
				use:clickOnAnchor
				on:clickOnAnchor={toggleDrawer}
			>
				<ul role="list" class="flow">
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
				</ul>
			</nav>
			<div class="header__nav-socials wrapper">
				<SocialsNavigation list={socialLinksList} iconHeight="2rem" />
			</div>
		</div>
	</DrawerMenu>
{/if}

<style lang="scss">
	@import './styles.scss';
</style>
