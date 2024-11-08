import { FileHandler } from '@tiptap-pro/extension-file-handler';
import type { Editor } from '@tiptap/core';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';

export type EditorControl = {
	label: string;
	onClick: () => void;
	active: boolean;
	disabled: boolean;
};

const setLink = (editor: Editor) => () => {
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

export const controls = (editor: Editor): EditorControl[] => {
	return [
		{
			label: 'B',
			onClick: () => editor.chain().focus().toggleBold().run(),
			active: editor.isActive('bold'),
			disabled: false
		},
		{
			label: 'I',
			onClick: () => editor.chain().focus().toggleItalic().run(),
			active: editor.isActive('italic'),
			disabled: false
		},
		{
			label: 'UL',
			onClick: () => editor.chain().focus().toggleBulletList().run(),
			active: editor.isActive('bulletList'),
			disabled: false
		},
		{
			label: 'OL',
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
			active: editor.isActive('orderedList'),
			disabled: false
		},
		{
			label: 'Set link',
			onClick: setLink(editor),
			active: editor.isActive('link'),
			disabled: false
		},
		{
			label: 'Unset link',
			onClick: () => editor.chain().focus().unsetLink().run(),
			active: true,
			disabled: false
		}
	];
};

export const extensions = [
	StarterKit.configure({
		history: false
	}),
	Link.configure({
		openOnClick: false,
		protocols: ['https', 'mailto'],
		HTMLAttributes: {
			rel: 'noopener noreferrer'
		}
	}),
	Image,
	FileHandler.configure({
		allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
		onDrop: (currentEditor, files, pos) => {
			files.forEach((file) => {
				const fileReader = new FileReader();

				fileReader.readAsDataURL(file);
				fileReader.onload = () => {
					currentEditor
						.chain()
						.insertContentAt(pos, {
							type: 'image',
							attrs: {
								src: fileReader.result
							}
						})
						.focus()
						.run();
				};
			});
		}
		// onDrop: (editor, files, htmlContent) => {
		// 	console.log({ editor, files, htmlContent });
		// }
	})
];
