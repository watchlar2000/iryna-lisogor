<script lang="ts">
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import TipTap from '$lib/components/RichTextEditor/TipTapEditor.svelte';
	import type { Author } from '$lib/types/common';
	import type { ActionResult } from '@sveltejs/kit';
	import { Image } from '@unpic/svelte';
	import type { PageData } from './$types';
	import { readFileAsDataURL } from './utils';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';

	export let data: PageData;

	export let form: ActionData;

	// let { email, error, message } = form ?? {};
 	// $: ({ email, error, message } = form ?? {
 	// 	email: '',
 	// 	error: { field: '', message: '' },
 	// 	message: ''
 	// });

	$: ({ photoUrl, about: aboutHTML } = data.author[0]);

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

		if (photoFile) {
			updatedPhotoUrl = await readFileAsDataURL(photoFile as File);
			isDirty = true;
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
			toast.success('Your changes have been saved');
		}

		applyAction(result);
	};
</script>

<!--https://hartenfeller.dev/blog/sveltekit-image-upload-store-->
<div class="flow">
	<header class="cluster">
		<h6>About page</h6>
		<span class="timestamp">Last update: Nov 3 2024</span>
	</header>

	<form
		enctype="multipart/form-data"
		method="POST"
		action="?/about"
		on:change={handleChange}
		on:submit|preventDefault={handleSubmit}
		class="flow"
		use:enhance={() => {
			return async ({ update }) => {
				await update();
				toast.promise(
					new Promise(resolve, reject) => {

					},
					{ loading: 'Toasting bread...', success: 'Here’s your toast!', error: 'Your toast burned :(' }
				)
			}
		}}
	>
		<!-- <section class="flow">
			<h5>Profile photo:</h5>
			<div class="cluster">
				<div class="wrapper__image cluster">
					<Image
						alt="Iryna Lisogor profile photo"
						aspectRatio={1}
						layout="constrained"
						src={updatedPhotoUrl ? updatedPhotoUrl : photoUrl}
					/>
				</div>
				<button on:click={initImageUpload} type="button" class="button-custom">
					<Icon name="update" /> Change profile photo
				</button>
			</div>
			<div class="hidden">
				<input accept="image/*" bind:this={inputFile} id="photoFile" name="photoFile" type="file" />
			</div>
		</section>
		<section class="flow">
			<h5>About:</h5>
			<TipTap bind:content={about} />
		</section>
		<div class="cluster wrapper__form-controls">
			<button type="submit" disabled={!isDirty}>Save</button>
			{#if isDirty}
				<button type="reset">Cancel</button>
			{/if}
		</div> -->
	</form>
</div>

<style lang="scss">
	.wrapper__image {
		max-width: 15ch;
	}

	header.cluster {
		--_horizontal-alignment: space-between;

		width: 100%;
	}

	.wrapper__form-controls {
		--_column-gap: 1ch;
	}

	.button-custom {
		--button-bg: none;
		--button-font-size: 0.875rem;
		--button-font-weight: 500;
		--button-padding-inline: 1.5ch;
		--button-padding-block: 0.5ch;
		--button-border-width: 0px;
	}
</style>
