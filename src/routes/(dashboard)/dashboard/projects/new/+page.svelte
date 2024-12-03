<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import TipTapEditor from '$lib/components/RichTextEditor/TipTapEditor.svelte';
	import { initImageUpload } from '$lib/utils/file';
	import { notification } from '$lib/utils/notification';
	import type { ActionResult } from '@sveltejs/kit';
	import { readFileAsDataURL } from '../../about/utils';

	let project = {
		title: '',
		description: ''
	};

	let inputImage: HTMLInputElement;
	let projectImage = '';
	let modal: Modal;
	$: if (modal) modal.open();

	const updateImageLocally = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
		const fd = new FormData(event.currentTarget);
		const image = fd.get('projectImage');

		try {
			if (image) {
				projectImage = await readFileAsDataURL(image as File);
			}
		} catch (err) {
			notification.error(err?.message);
		}
	};

	type HandleEnhanceParams = { formData: FormData };
	type HandleEnhanceReturnParams = {
		result: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>;
	};

	const handleEnhance = ({ formData }: HandleEnhanceParams) => {
		formData.set('description', project.description);
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

<Modal bind:this={modal}>
	<div slot="header">
		<h2>Add new project image</h2>
	</div>
	<div slot="commands" class="project-image">
		<form
			method="POST"
			action="?/image"
			class="flow"
			on:change={updateImageLocally}
			use:enhance
			enctype="multipart/form-data"
		>
			{#if projectImage}
				<div>
					<img src={projectImage} alt="" />
				</div>
			{/if}

			<button
				on:click={() => initImageUpload(inputImage)}
				aria-label="upload new image"
				type="button"
				class="button-custom"
			>
				<Icon name="plus" /> Add new image
			</button>
			<input
				accept="image/*"
				bind:this={inputImage}
				id="projectImage"
				name="projectImage"
				type="file"
				class="hidden"
			/>

			<label for="title" class="cluster">
				<h5>Title:</h5>
				<input type="text" name="title" id="title" placeholder="Title" class="input" />
			</label>
			<label for="alt" class="cluster">
				<h5>Alt:</h5>
				<textarea
					name="alt"
					id="alt"
					placeholder="Provide a brief description of the image for accessibility and SEO purposes"
					class="input"
				/>
			</label>
			<button type="submit">Save</button>
		</form>
	</div>
</Modal>
<div class="flow">
	<header>
		<h6>New project</h6>
	</header>
	<form method="POST" action="?/project" class="flow" use:enhance={handleEnhance}>
		<label for="title" class="cluster">
			<h5>Title:</h5>
			<input type="text" id="title" class="input" name="title" value={project.title} />
		</label>
		<label for="work" class="cluster">
			<h5>Work:</h5>
			<select name="work" id="work">
				<option value="backgrpund-painting">Background painting</option>
				<option value="visual-development">Visual development</option>
				<option value="playground">Playground</option>
			</select>
		</label>
		<section class="flow">
			<h5>Description:</h5>
			<TipTapEditor bind:content={project.description} />
		</section>
		<button type="submit">Save</button>
	</form>
	<hr />
	<div class="flow">
		<h5>Images:</h5>
		<button
			on:click={() => modal.open()}
			aria-label="upload new file"
			type="button"
			class="button-custom"
			disabled={!project.title}
		>
			Add image
		</button>
		<div>
			<ul role="list">
				<li>No images...</li>
			</ul>
		</div>
	</div>
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
</style>
