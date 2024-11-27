<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import type { EditorControl } from './config';
	import { controls } from './config';
	import EditorButton from './EditorButton.svelte';
	import { initEditor } from './initTipTapEditor';

	export let content = '';
	let element: HTMLElement;

	const controlsList = writable<EditorControl[]>([]);

	onMount(() => {
		const { contentStore, destroy, editor } = initEditor({ content, element });

		contentStore.subscribe((updatedContent) => {
			content = updatedContent;
		});

		controlsList.set(controls(editor));

		return () => {
			destroy();
		};
	});
</script>

<div class={`flow ${$$props.class || ''}`}>
	<div class="cluster">
		{#each $controlsList as { label, onClick, active, disabled }}
			<EditorButton {label} {onClick} {active} {disabled} />
		{/each}
	</div>
	<div bind:this={element} />
</div>

<style lang="scss">
	div > * {
		--_flow-space: var(--space-s);
	}

	.cluster {
		--_column-gap: var(--space-xs);
	}
</style>
