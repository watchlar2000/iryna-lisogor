// import type { Extensions } from '@tiptap/core';
// import { Editor } from '@tiptap/core';
// import { writable } from 'svelte/store';
// import { extensions as defaultExtensions } from './config';

// type InitEditorParams = {
// 	element: HTMLElement;
// 	content: string;
// 	extensions?: Extensions;
// };

// export const initEditor = ({ content, element, extensions }: InitEditorParams) => {
// 	const contentStore = writable(content);

// 	const editor = new Editor({
// 		editorProps: {
// 			attributes: {
// 				class: 'wrapper__editor flow'
// 			}
// 		},
// 		injectCSS: false,
// 		element: element,
// 		extensions: extensions ?? defaultExtensions,
// 		content,
// 		onUpdate: ({ editor }) => {
// 			contentStore.set(editor.getHTML());
// 		},
// 		onTransaction: ({ editor }) => {
// 			editor = editor;
// 		}
// 	});

// 	return {
// 		editor,
// 		contentStore,
// 		destroy: () => editor.destroy()
// 	};
// };
