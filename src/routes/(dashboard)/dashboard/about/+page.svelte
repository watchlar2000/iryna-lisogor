<script lang="ts">
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import TipTap from '$lib/components/TipTapEditor.svelte';
	import type { Author } from '$lib/types/common';
	import type { ActionResult } from '@sveltejs/kit';
	import { Image } from '@unpic/svelte';
	import type { PageData } from './$types';
	import { readFileAsDataURL } from './utils';

	export let data: PageData;

	$: ({ photoUrl, about: aboutHTML } = data.author[0] as Author);

	$: about = aboutHTML ?? '';

	$: {
		isDirty = about !== aboutHTML;
	}

	let isDirty: boolean = false;
	let inputFile: HTMLElement;
	let updatedPhotoUrl: string | null = null;

	const initImageUpload = () => {
		inputFile.click();
	};

	const handleChange = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const fd = new FormData(event.currentTarget);
		const photoFile = fd.get('photoFile');
		isDirty = true;

		if (photoFile) {
			updatedPhotoUrl = await readFileAsDataURL(photoFile as File);
		}
	};

	type FormEvent = EventTarget & HTMLFormElement;

	const handleSubmit = async (event: { currentTarget: FormEvent }): Promise<void> => {
		type InitData = Author & {
			prevPhotoUrl: string;
		};

		const authorData = data.author[0] as Author;
		const initData: InitData = {
			...authorData,
			prevPhotoUrl: authorData.photoUrl ?? ''
		};

		const fd = new FormData(event.currentTarget);

		fd.set('about', about);

		type Key = keyof InitData;

		const filteredFormData = [...fd.entries()]
			.filter(([key, value]) => {
				if (key === 'photoFile' && value instanceof File) {
					return value.name.length;
				}

				return initData[key as Key] !== value;
			})
			.reduce((acc, [key, value]) => {
				acc.set(key, value);
				return acc;
			}, new FormData());

		if (filteredFormData.get('photoFile')) {
			filteredFormData.set('prevPhotoUrl', initData.prevPhotoUrl);
		}

		const response = await fetch(event.currentTarget.action, {
			method: 'POST',
			body: filteredFormData
		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	};
</script>

<!--https://hartenfeller.dev/blog/sveltekit-image-upload-store-->
<!--
use:enhance={() => {
	// formLoading = true;
	return async ({ update }) => {
		// formLoading = false;
		update();
	};
}}
-->
<h1 class="text-2xl font-bold">About page</h1>
<!-- {#if formLoading}
	<p>Server is running...</p>
{/if} -->
<form
	class="mt-6 max-w-[600px]"
	enctype="multipart/form-data"
	method="POST"
	action="?/about"
	on:change={handleChange}
	on:submit|preventDefault={handleSubmit}
>
	<div>
		<h2 class="text-lg font-semibold">Profile photo:</h2>
		<div class="mt-2 max-w-[400px]">
			<Image
				alt="Iryna Lisogor profile photo"
				aspectRatio={1.5}
				layout="constrained"
				src={updatedPhotoUrl ?? photoUrl}
			/>
			<input
				accept="image/*"
				bind:this={inputFile}
				class="hidden"
				id="photoFile"
				name="photoFile"
				type="file"
			/>
		</div>
		<button
			class="flex gap-2 items-center hover:underline focus:underline p-2 bg-orange-300 text-xs mt-4 rounded-md"
			on:click={initImageUpload}
			type="button"
		>
			Upload new photo
		</button>
	</div>
	<hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
	<div>
		<h2 class="text-lg font-semibold">About:</h2>
		<TipTap bind:content={about} class="mt-5" />
	</div>
	<div class="mt-4 flex gap-4">
		<button
			type="submit"
			class="py-2 px-4 bg-blue-200 disabled:opacity-30 disabled:cursor-not-allowed"
			disabled={!isDirty}>Save</button
		>
	</div>
</form>
