<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import TipTapEditor from '$lib/components/RichTextEditor/TipTapEditor.svelte';
	import { formatDateToReadable } from '$lib/utils/date';
	import { initImageUpload } from '$lib/utils/file';
	import { notification } from '$lib/utils/notification';
	import type { ActionResult } from '@sveltejs/kit';
	import { Image } from '@unpic/svelte';
	import type { ActionData, PageData } from './$types';
	import { readFileAsDataURL } from './utils';

	export let data: PageData;
	export let form: ActionData;

	$: ({ photoUrl, about: aboutHTML, id, updatedAt } = data.author[0]);

	let isDirty = false;
	let loading = false;
	let inputFile: HTMLElement;
	let updatedPhotoUrl = '';
	let about = '';

	$: if (form) {
		form?.error ? notification.error(form.error) : notification.success('Changes saved');
	}

	$: about = aboutHTML ?? '';
	$: updatedPhotoUrl = photoUrl ?? '';

	$: {
		isDirty = about !== aboutHTML || updatedPhotoUrl !== photoUrl;
	}

	const updateProfilePhotoLocally = async (event: {
		currentTarget: EventTarget & HTMLFormElement;
	}) => {
		const fd = new FormData(event.currentTarget);
		const photoFile = fd.get('photoFile');

		try {
			if (photoFile) {
				updatedPhotoUrl = await readFileAsDataURL(photoFile as File);
				isDirty = true;
			}
		} catch (err) {
			notification.error(err.message);
			isDirty = false;
		}
	};

	type HandleEnhanceParams = { formData: FormData };
	type HandleEnhanceReturnParams = {
		result: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>;
	};

	const handleEnhance = ({ formData }: HandleEnhanceParams) => {
		formData.set('about', about);
		formData.set('updatedPhotoUrl', updatedPhotoUrl);
		formData.set('authorId', id.toString());

		loading = true;

		return async ({ result }: HandleEnhanceReturnParams) => {
			if (result.type === 'success') {
				await invalidateAll();
			}

			await applyAction(result);
			loading = false;
		};
	};
</script>

<!--https://hartenfeller.dev/blog/sveltekit-image-upload-store-->

<div class="flow">
	<header class="cluster">
		<h6>About page</h6>
		<span class="timestamp">Last update: {formatDateToReadable(updatedAt)}</span>
	</header>
	<form
		enctype="multipart/form-data"
		method="POST"
		action="?/about"
		on:change={updateProfilePhotoLocally}
		use:enhance={handleEnhance}
		class="flow"
	>
		<section class="flow">
			<h5>Profile photo:</h5>
			<div class="cluster">
				<div class="wrapper__image cluster">
					<Image
						alt="Iryna Lisogor profile photo"
						aspectRatio={1}
						layout="constrained"
						src={!updatedPhotoUrl ? photoUrl : updatedPhotoUrl}
					/>
				</div>
				<button
					on:click={() => initImageUpload(inputFile)}
					aria-label="upload new file"
					type="button"
					class="button-custom"
				>
					<Icon name="update" /> Change profile photo
				</button>
			</div>
			<input
				accept="image/*"
				bind:this={inputFile}
				id="photoFile"
				name="photoFile"
				type="file"
				class="hidden"
			/>
			<input
				type="text"
				name="previousPhotoUrl"
				id="previousPhotoUrl"
				value={photoUrl}
				class="hidden"
			/>
		</section>
		<section class="flow">
			<h5>About:</h5>
			<TipTapEditor bind:content={about} />
		</section>
		<div class="cluster wrapper__form-controls">
			<button type="submit" class="button" disabled={!isDirty || loading}> Save </button>
		</div>
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
		--button-font-size: 0.875rem;
		--button-font-weight: 500;
		--button-padding-inline: 1.5ch;
		--button-padding-block: 0.5ch;
		--button-border-width: 0px;
	}
</style>
