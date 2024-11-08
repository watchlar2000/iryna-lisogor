<script lang="ts">
	import { icons } from '$lib/icons';
	import { type IconName } from '$lib/types/icons';

	export let name: IconName;
	export let height: string = '2ch';
	let className = '';
	let styles = '';

	export { className as class, styles as style };

	let displayIcon = icons[name];
</script>

<span style="--icon-height: {height}; {styles}" class={className} {...$$restProps}>
	{@html displayIcon.src}
</span>

<style lang="scss">
	span {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
