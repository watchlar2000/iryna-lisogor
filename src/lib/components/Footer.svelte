<script lang="ts">
	import SocialsNavigation from '$lib/components/SocialsNavigation.svelte';
	import { socialLinksList } from '$lib/data/socialLinksList';
	import { fullYear } from '$lib/utils';
</script>

<footer class="wrapper">
	<div class="footer__socials-nav">
		<SocialsNavigation list={socialLinksList} />
	</div>
	<p>
		All artistic content Copyright &#169;<br />
		{fullYear()} Iryna Lisogor, All rights
	</p>
</footer>

<style lang="scss">
	.wrapper {
		font-size: var(--size-step--3);
		margin: var(--space-l-3xl) auto var(--space-s);
		text-align: center;
	}

	.footer__socials-nav {
		display: flex;
		justify-content: center;
		margin-bottom: var(--space-s);

		@include respond-to('m') {
			display: none;
		}
	}
</style>
