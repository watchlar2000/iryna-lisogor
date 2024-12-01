<script lang="ts">
	import { Editor } from '@tiptap/core';
	import { onDestroy, onMount } from 'svelte';
	import { controls, extensions } from './config';
	import EditorButton from './EditorButton.svelte';

	export let content = '';
	let element: HTMLElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			editorProps: {
				attributes: {
					class: 'wrapper__editor flow'
				}
			},
			injectCSS: false,
			element: element,
			extensions,
			content,
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			},
			onTransaction: () => {
				editor = editor;
			}
		});
	});

	onDestroy(() => {
		editor.destroy();
	});
</script>

<div class="flow {$$props.class || ''}">
	<div class="cluster">
		{#each controls(editor) as { label, onClick, className, title }}
			<EditorButton {label} {onClick} class={className} {title} />
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
