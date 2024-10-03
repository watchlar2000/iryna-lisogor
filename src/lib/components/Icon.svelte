<script lang="ts">
	import { icons } from '$lib/icons';
	import { type IconName } from '$lib/types/icons';

	export let name: IconName;

	let displayIcon = icons[name];
</script>

<div class={$$restProps.class || ''}>{@html displayIcon.src}</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
