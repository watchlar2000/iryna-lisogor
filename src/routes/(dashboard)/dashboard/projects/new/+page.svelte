<script lang="ts">
	import TipTap from '$lib/components/TipTapEditor.svelte';
	// import type { PageData } from '../$types';
	import type { LayoutData } from '../../$types';

	export let data: LayoutData;

	$: ({ works } = data);

	let description: string;
	let selectedWork: string;

	const handleSubmit = (event) => {
		const fd = new FormData(event.currentTarget);
		fd.set('work', selectedWork);
		fd.set('description', description);
		console.log(fd);
	};
</script>

<h1>Add new project</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label for="title" class="block"
		>Title
		<input type="text" name="title" id="title" autocomplete="off" />
	</label>

	<div>
		<h2 class="text-lg font-semibold">Description:</h2>
		<TipTap bind:content={description} class="mt-5" />
	</div>

	<select bind:value={selectedWork}>
		{#each works as work (work.id)}
			<option value={work.slug}>
				{work.title}
			</option>
		{/each}
	</select>
	<button class="block p-2 bg-yellow-200 mt-4">Save</button>
</form>

<!-- export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	slug: varchar('slug').notNull(),
	description: varchar('description'),
	work: varchar('work'),
	createdAt: timestamp('created_at').defaultNow(),
	updatedAt: timestamp('updated_at').defaultNow()
}); -->
