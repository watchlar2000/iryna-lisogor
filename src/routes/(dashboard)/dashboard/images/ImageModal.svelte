<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import { initImageUpload } from '$lib/utils/file';
	import { onMount } from 'svelte';
	import { getImageData } from '../about/getImageData';

	type ImageData = {
		url: string;
		alt: string;
		width: number;
		height: number;
		id?: number;
		input?: HTMLInputElement;
	};

	const defaultImageData = {
		url: '',
		alt: '',
		width: 0,
		height: 0
	};

	export let mode: 'create' | 'edit' = 'create';

	let formAction: string;
	$: formAction = mode === 'create' ? '?/upload' : '?/update';

	export let imageDataProp: ImageData = {
		...defaultImageData
	};
	export let title = 'Add new image';

	let imageData: ImageData;
	$: imageData = { ...imageDataProp };

	let inputImage: HTMLInputElement;

	let modal: Modal;

	let imageIsUpdated = false;

	export const open = () => {
		modal.open();
	};

	const close = () => {
		modal.close();
	};

	const closeAndReset = () => {
		imageData = { ...defaultImageData };
		close();
	};

	const handleChange = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const fd = new FormData(event.currentTarget);
		const imageFile = fd.get('image');

		if (!imageFile) return;

		const data = await getImageData(imageFile as File);

		imageData.url = data?.url as string;
		imageData.width = data?.width as number;
		imageData.height = data?.height as number;

		if (mode === 'edit') {
			imageIsUpdated = true;
		}
	};

	onMount(() => {
		imageData.input = inputImage;
	});
</script>

<Modal bind:this={modal}>
	<div slot="header">
		<h2>{title}</h2>
	</div>
	<div class="modal__content">
		<form
			method="POST"
			action={formAction}
			class="flow"
			on:change={handleChange}
			use:enhance={() => {
				return async ({ result }) => {
					if (result.type === 'success') {
						closeAndReset();
						invalidateAll();
					}

					await applyAction(result);
				};
			}}
			enctype="multipart/form-data"
		>
			{#if imageData.url}
				<img src={imageData.url} alt={imageData.alt} />
			{/if}
			<div>
				<button
					on:click={() => {
						initImageUpload(inputImage);
					}}
					type="button"
					class="button-custom"
				>
					<Icon name="plus" />
					<span class="visually-hidden">{!imageData.url ? 'Add new image' : 'Update image'}</span>
					{!imageData.url ? 'Add new image' : 'Update image'}
				</button>
			</div>
			<input
				accept="image/*"
				bind:this={inputImage}
				id="image"
				name="image"
				type="file"
				class="hidden"
			/>
			<input type="text" id="width" name="width" value={imageData.width} hidden />
			<input type="text" id="height" name="height" value={imageData.height} hidden />
			{#if mode === 'edit'}
				<input type="text" id="id" name="id" bind:value={imageData.id} hidden />
				<input type="text" id="url" name="url" value={imageData.url} hidden />
				<input
					type="checkbox"
					id="imageIsUpdated"
					name="imageIsUpdated"
					bind:checked={imageIsUpdated}
					hidden
				/>
			{/if}

			<div>
				<label for="alt" class="flow">
					<h5>Alt:</h5>
					<textarea
						name="alt"
						id="alt"
						value={imageData.alt}
						placeholder="Provide a brief description of the image for accessibility and SEO purposes"
						class="input"
					/>
				</label>
			</div>
			<div class="cluster form__controls">
				<button type="submit" on:click={close}>Save</button>
				<button type="button" on:click={closeAndReset}>Cancel</button>
			</div>
		</form>
	</div>
</Modal>

<style lang="scss">
	.modal__content {
		width: 100%;
		overflow-y: auto;
		max-height: 50vh;
		padding: var(--space-xs);

		label {
			--flow-space: var(--space-xs);
			text-align: start;
		}

		img {
			// height: 9ch;
			width: auto;
			margin-inline: auto;
		}
	}

	.form__controls {
		--cluster-direction: row;
		--cluster-horizontal-alignment: center;
	}
</style>
