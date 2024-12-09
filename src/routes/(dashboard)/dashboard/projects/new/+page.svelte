<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import TipTapEditor from '$lib/components/RichTextEditor/TipTapEditor.svelte';
	import type { InsertProject, SelectImage, SelectProject } from '$lib/server/schema';
	import type { ActionResult } from '@sveltejs/kit';
	import { writable } from 'svelte/store';

	export let data;

	let inputImage: HTMLInputElement;
	let modal: Modal;

	$: images = data.images;

	type Project = InsertProject & {
		images: SelectImage[];
	};

	let project = writable<Project>({
		title: '',
		description: '',
		images: []
	});

	$: if (modal) modal.open();

	type HandleEnhanceParams = { formData: FormData };
	type HandleEnhanceReturnParams = {
		result: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>;
	};

	const handleEnhance = ({ formData }: HandleEnhanceParams) => {
		formData.set('description', $project.description as string);
		// formData.set('updatedPhotoUrl', updatedPhotoUrl);
		// formData.set('authorId', id.toString());

		return async ({ result }: HandleEnhanceReturnParams) => {
			if (result.type === 'success') {
				await invalidateAll();
			}

			await applyAction(result);
		};
	};
</script>

<Modal bind:this={modal} --dialog-width="80vw">
	<div slot="header">
		<h2>Select images related to project</h2>
	</div>
	<ul role="list" class="cluster" draggable="true">
		{#each $project.images as image}
			<li>{image.id}</li>
		{/each}
	</ul>
	<ul role="list" class="auto-grid auto-grid__images">
		{#each images as image}
			<li>
				<label class="cluster">
					<input
						type="checkbox"
						name="selectedImage"
						value={image}
						bind:group={$project.images}
						hidden
					/>
					<img src={image.url} alt={image.alt} />
				</label>
			</li>
		{/each}
	</ul>
	<div slot="commands"></div>
</Modal>
<div class="flow">
	<header>
		<h6>New project</h6>
	</header>
	<form method="POST" action="?/project" class="flow" use:enhance={handleEnhance}>
		<label for="project-title" class="cluster">
			<h5>Title:</h5>
			<input type="text" id="project-title" class="input" name="title" value={$project.title} />
		</label>
		<label for="work" class="cluster">
			<h5>Work:</h5>
			<select name="work" id="work">
				<option value="backgrpund-painting">Background painting</option>
				<option value="visual-development">Visual development</option>
				<option value="playground">Playground</option>
			</select>
		</label>
		<section class="cluster cluster__images">
			<div class="cluster cluster__images--header">
				<h5>Images:</h5>
				<button
					on:click={modal.open}
					aria-label="upload new file"
					type="button"
					class="button-custom"
				>
					<Icon name="update" /> Add image
				</button>
			</div>
			<div>
				<ul role="list">
					{#if $project.images.length > 0}
						{#each $project.images as image}
							<li>{image.id}</li>
						{/each}
					{:else}
						<li>No images selected</li>
					{/if}
				</ul>
			</div>
		</section>
		<section class="flow">
			<h5>Description:</h5>
			<TipTapEditor bind:content={$project.description} />
		</section>
		<button type="submit">Save</button>
	</form>
</div>

<!-- export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	slug: varchar('slug').notNull(),
	description: varchar('description'),
	work: varchar('work'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
}); -->

<style lang="scss">
	label {
		--cluster-direction: column;
		--cluster-row-gap: 0.5ch;
		--cluster-vertical-alignment: flex-start;
		--cluster-horizontal-alignment: flex-start;

		// display: inline-flex;

		// background-color: gray;

		// justify-content: flex-start;

		input {
			width: 100%;
		}
	}

	.project-image {
		width: 100%;
	}

	.cluster__images {
		--cluster-direction: column;
		--cluster-vertical-alignment: flex-start;

		&--header {
			--cluster-direction: row;
			--cluster-horizontal-alignment: space-between;

			width: 100%;
		}
	}

	.button-custom {
		--button-padding-inline: 1.75ch;
		--button-padding-block: 0.75ch;
		--button-font-size: var(--size-step--3);
	}

	.auto-grid__images {
		--auto-grid-min-size: 10ch;
		--auto-grid-gap: var(--space-s);
	}
</style>
