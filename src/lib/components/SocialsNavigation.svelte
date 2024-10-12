<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { SocialLink } from '$lib/types/socials';

	export let list: SocialLink[];
	export let iconHeight: string = 'var(--text-size-heading-4)';
</script>

<h2 class="visually-hidden">List of social media links including instagram, linkedin, and email</h2>
<ul role="list" class="cluster">
	{#each list as { href, name } (href)}
		<li>
			<a {href} target="_blank">
				<Icon {name} height={iconHeight} />
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.cluster {
		--_column-gap: var(--space-xs);
		--outline-offset: 0;

		height: 100%;

		li {
			height: 100%;
		}

		a {
			display: grid;
			height: 100%;
			padding-inline: var(--space-s);
			padding-block: var(--space-s);
		}
	}
</style>
