<script lang="ts">
	import { Editor } from '@tiptap/core';
	import Link from '@tiptap/extension-link';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';

	let element: Element;
	let editor: Editor;
	export let content: string = '';

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [
				StarterKit.configure({
					history: false
				}),
				Link.configure({
					openOnClick: false,
					protocols: ['https', 'mailto'],
					HTMLAttributes: {
						rel: 'noopener noreferrer'
					}
				})
			],
			content: content,
			onTransaction: () => {
				editor = editor;
			},
			onUpdate: ({ editor }) => {
				content = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});

	const setLink = () => {
		const previousUrl = editor.getAttributes('link').href;
		const input = window.prompt('URL', previousUrl);

		if (input === null) {
			return;
		}

		if (input === '') {
			editor.chain().focus().extendMarkRange('link').unsetLink().run();

			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const href = emailRegex.test(input) ? `mailto:${input}` : input;

		editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
	};
</script>

<div class={$$props.class}>
	{#if editor}
		<div class="flex gap-2 [&>*]:p-2 [&>*]:bg-gray-400 text-xs">
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleBold().run()}
				class:active={editor.isActive('bold')}
			>
				B
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleItalic().run()}
				class:active={editor.isActive('italic')}
			>
				I
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleBulletList().run()}
				class:active={editor.isActive('bulletList')}
			>
				UL
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().toggleOrderedList().run()}
				class:active={editor.isActive('orderedList')}
			>
				OL
			</button>
			<button
				type="button"
				on:click={setLink}
				class:active={editor.isActive('link') ? 'is-active' : ''}
			>
				Set link
			</button>
			<button
				type="button"
				on:click={() => editor.chain().focus().unsetLink().run()}
				disabled={!editor.isActive('link')}
			>
				Unset link
			</button>
		</div>
	{/if}

	<div
		bind:this={element}
		class="[&>div]:flex [&>div]:flex-col [&>div]:gap-4 [&>div]:p-4 bg-yellow-200 mt-2"
	/>
</div>
