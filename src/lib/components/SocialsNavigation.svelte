<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { SocialLink } from '$lib/types/socials';

	export let list: SocialLink[];
</script>

<h2 class="visually-hidden">List of social media links including instagram, linkedin, and email</h2>
<ul role="list" class="cluster">
	{#each list as { href, name } (href)}
		<li>
			<a {href} target="_blank" class="button">
				<Icon {name} class="icon" />
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.cluster {
		--space: 0.2rem;
	}
	a {
		--outline-offset: 0;
		--icon-width: var(--size-step-6);

		display: block;
		padding-inline: var(--space-s);
		padding-block: 0;

		@include respond-to('m') {
			padding-block: var(--space-s);
		}

		> :global(.icon) {
			width: var(--size-step-5);
			pointer-events: none;
		}
	}
</style>
