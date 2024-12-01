<script lang="ts">
	export let label = '';
	export let onClick: () => void;
	export let title: string;
</script>

<button type="button" on:click={onClick} class={$$props.class || ''} {title}>
	{label}
</button>

<style lang="scss">
	button {
		--button-padding-inline: 1.75ch;
		--button-padding-block: 0.75ch;
		--button-font-size: var(--size-step--3);

		&.is-active {
			--button-bg: var(--color-link-500);
			--button-text: var(--color-surface-900);
			--button-hover-bg: var(--color-link-400);
		}
	}
</style>
