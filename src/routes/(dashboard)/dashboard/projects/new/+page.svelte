<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import TipTapEditor from '$lib/components/RichTextEditor/TipTapEditor.svelte';
	import type { ActionResult } from '@sveltejs/kit';

	let description = '';

	type HandleEnhanceParams = { formData: FormData };
	type HandleEnhanceReturnParams = {
		result: ActionResult<Record<string, unknown> | undefined, Record<string, unknown> | undefined>;
	};

	const handleEnhance = ({ formData }: HandleEnhanceParams) => {
		formData.set('description', description);
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

<div class="flow">
	<header>
		<h6>New project</h6>
	</header>
	<form method="POST" class="flow" use:enhance={handleEnhance}>
		<label for="title" class="cluster">
			<h5>Title:</h5>
			<input type="text" id="title" class="input" name="title" />
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
			<TipTapEditor bind:content={description} />
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
</style>
