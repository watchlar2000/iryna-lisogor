<script lang="ts">
	import { icons } from '$lib/icons';
	import { type IconName } from '$lib/types/icons';

	export let name: IconName;
	export let height: string = '1em';

	let displayIcon = icons[name];
</script>

<!-- <div class={$$restProps.class || ''}> -->
<div style="--icon-height: {height}">
	{@html displayIcon.src}
</div>

<style lang="scss">
	div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
