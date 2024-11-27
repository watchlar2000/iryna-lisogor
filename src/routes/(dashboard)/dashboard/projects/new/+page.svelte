<script lang="ts">
	import TipTapEditor from '$lib/components/RichTextEditor/TipTapEditor.svelte';

	let about = '';
</script>

<div class="flow">
	<header>
		<h6>New project</h6>
	</header>
	<form action="" class="flow">
		<label for="title" class="cluster">
			<h5>Title:</h5>
			<input type="text" id="title" class="input" />
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
			<TipTapEditor bind:content={about} />
		</section>
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
		// --cluster-row-gap: var(--space-xs);
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
