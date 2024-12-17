<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Prompt from '$lib/components/Modal/Prompt.svelte';
	import { notification } from '$lib/utils/notification.js';
	import type { ActionData } from './$types';
	import { handleConfirmation } from './handleConfirmation.js';
	import ImageModal from './ImageModal.svelte';

	export let data;
	$: images = data.images;

	export let form: ActionData;
	$: if (form) {
		form?.error ? notification.error(form.error) : notification.success(form.message ?? 'Done');
	}

	let deleteImagePrompt: Prompt;
	let createModal: ImageModal;
	let editModal: ImageModal;

	const editImageData = {
		id: -1,
		url: '',
		alt: '',
		width: 0,
		height: 0
	};

	const openEditModal = () => editModal.open();
</script>

<Prompt bind:this={deleteImagePrompt} />
<ImageModal bind:this={createModal} />
<ImageModal bind:this={editModal} imageDataProp={editImageData} mode="edit" title="Edit image" />
<section class="flow">
	<header class="cluster">
		<h6>Images</h6>
		<button type="button" class="button" on:click={createModal.open}>
			<Icon name="plus" />
			Add new image
		</button>
	</header>
	<div class="auto-grid">
		{#each images as image}
			<div class="image__card cluster">
				<div class="image__card--cover">
					<img src={image.url} alt={image.alt} />
				</div>
				<form
					method="POST"
					action="?/delete"
					use:enhance={async ({ cancel }) => {
						const userConfirmation = await handleConfirmation({
							prompt: deleteImagePrompt,
							label: 'Delete image',
							description: 'Image to be deleted from the database'
						});

						if (!userConfirmation) {
							cancel();
							return;
						}

						return async ({ result }) => {
							if (result.type === 'success') {
								await invalidateAll();
							}

							await applyAction(result);
						};
					}}
				>
					<input type="text" name="id" value={image.id} class="hidden" />
					<input type="text" name="name" value={image.url.toString().split('/').pop()} hidden />
					<div class="image__card--controls cluster">
						<button
							class="button"
							type="button"
							on:click={() => {
								editImageData.id = image.id;
								editImageData.url = image.url;
								editImageData.alt = image.alt;
								editImageData.width = image.width;
								editImageData.height = image.height;

								// Object.assign(editImageData, image);

								openEditModal();
							}}
						>
							<Icon name="edit" height="1em" />
							<span class="visually-hidden">Edit image</span>
						</button>
						<button class="button">
							<Icon name="trash" height="1em" />
							<span class="visually-hidden">Remove image</span>
						</button>
					</div>
				</form>
			</div>
		{/each}
	</div>
</section>

<style lang="scss">
	section.flow {
		--flow-space: var(--space-l);
	}

	header.cluster {
		--_horizontal-alignment: space-between;

		width: 100%;

		button {
			--_bg: var(--color-link-800);
			--_font-size: var(--size-step--2);
			--_padding-inline: 1.25ch;
			--_padding-block: 0.75ch;
			--_hover-bg: var(--color-link-500);
			--_hover-color: var(--color-surface-800);
			--_active-bg: var(--color-link-400);
			--_active-color: var(--color-surface-900);
			--_text: var(--color-dark-100);
			--_font-weight: 600;
			--_border-width: 0px;

			text-decoration: none;
		}
	}

	.auto-grid {
		--auto-grid-min-size: 12ch;
		--auto-grid-gap: var(--space-s);

		.cluster {
			--cluster-horizontal-alignment: center;
			--cluster-row-gap: var(--space-xs);
		}
	}

	.image__card {
		background-color: var(--color-surface-900);
		padding: var(--space-xs);
		border-radius: 0.75ch;

		p {
			font-size: 0.8rem;
		}

		&--cover {
			height: 10ch;
			width: 100%;

			img {
				object-fit: cover;
				height: 100%;
				width: 100%;
				border-radius: 0.5rem;
			}
		}

		&--controls {
			--cluster-column-gap: var(--space-xs);

			margin-inline: auto;

			button {
				--button-icon-size: 0.1rem;
				--button-padding-inline: 1ch;
				--button-padding-block: 0.5ch;
			}
		}
	}
</style>
