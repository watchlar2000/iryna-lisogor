<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { SocialLink } from '$lib/types/socials';

	export let list: SocialLink[];
	export let iconHeight = 'var(--text-size-heading-4)';
</script>

<h2 class="visually-hidden">List of social media links including instagram, linkedin, and email</h2>
<ul role="list" class="cluster">
	{#each list as { href, name } (href)}
		<li>
			<a {href} target="_blank" class="exclude">
				<Icon {name} height={iconHeight} />
			</a>
		</li>
	{/each}
</ul>

<style lang="scss">
	.cluster {
		--cluster-column-gap: 1.25ch;

		height: 100%;
		li {
			display: inline-block;
			height: 100%;
		}

		a {
			display: grid;
			place-content: center;
			min-height: 100%;
			padding-inline: var(--space-s);
		}
	}
</style>
