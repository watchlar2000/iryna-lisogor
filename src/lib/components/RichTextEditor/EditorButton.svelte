<script lang="ts">
	export let label = '';
	export let onClick: () => void;
	export let active = false;
	export let disabled = false;
</script>

<button type="button" on:click={onClick} class:active {disabled}>
	{label}
</button>

<style lang="scss">
	button {
		--button-border-width: 0px;
		--button-padding-inline: 1.75ch;
		--button-padding-block: 0.75ch;
		--button-font-size: var(--size-step--2);
		--button-font-weight: 600;
	}
</style>
