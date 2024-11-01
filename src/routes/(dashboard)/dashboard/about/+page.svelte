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

	let isDirty = false;
	let inputFile: HTMLElement;
	let updatedPhotoUrl = '';

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
<div class="flow">
	<h2>About page</h2>
	<!-- {#if formLoading}
	<p>Server is running...</p>
{/if} -->
	<form
		enctype="multipart/form-data"
		method="POST"
		action="?/about"
		on:change={handleChange}
		on:submit|preventDefault={handleSubmit}
		class="flow"
	>
		<section class="flow">
			<h4>Profile photo:</h4>
			<div class="wrapper__image">
				<Image
					alt="Iryna Lisogor profile photo"
					aspectRatio={1}
					layout="constrained"
					src={updatedPhotoUrl ? updatedPhotoUrl : photoUrl}
				/>
			</div>
			<div class="hidden">
				<input accept="image/*" bind:this={inputFile} id="photoFile" name="photoFile" type="file" />
			</div>
			<button on:click={initImageUpload} type="button" class="button"> Upload new photo </button>
		</section>
		<section class="flow">
			<h4>About:</h4>
			<TipTap bind:content={about} />
		</section>
		<button type="submit" class="button" disabled={!isDirty}>Save</button>
	</form>
</div>

<style lang="scss">
	.wrapper__image {
		// display: grid;
		// place-content: center;
		// margin-inline: auto;
		width: 100%;
		max-width: 20ch;

		button {
			margin-inline: auto;
		}
	}

	form {
		--_flow-space: 1.5em;

		& > * {
			--_flow-space: 2.5em;
		}
	}
</style>
