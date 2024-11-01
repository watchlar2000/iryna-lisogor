<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { derived, writable } from 'svelte/store';

	export let data;

	let worksList = [];
	$: worksList = [{ id: 0, title: 'all', slug: 'all' }, ...data.works];

	const filter = writable({
		searchString: '',
		selectedWork: 'all'
	});

	const projects = writable(data.projects);

	const filteredProjects = derived([projects, filter], ([$projects, $filter]) => {
		const { selectedWork, searchString } = $filter;
		const isSelectedWorkAll = selectedWork === 'all';

		if (!searchString && isSelectedWorkAll) return $projects;

		const filteredByWork = isSelectedWorkAll
			? $projects
			: $projects.filter(({ work }) => work === selectedWork);

		return filteredByWork.filter((project) => project.title.toLowerCase().includes(searchString));
	});

	const handleSelectWork = (work: string): void => {
		$filter.selectedWork = work;
	};
</script>

<div class="wrapper flow">
	<h1>Projects</h1>
	<div class="flow control__panel">
		<label for="search">
			Search
			<input type="text" id="search" bind:value={$filter.searchString} />
		</label>
		<div>
			<ul role="list" class="cluster">
				{#each worksList as work (work.id)}
					<li>
						<button
							class:selected={$filter.selectedWork === work.slug}
							on:click={() => {
								handleSelectWork(work.slug);
							}}
							>{work.title}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div>
		{#if $filteredProjects.length}
			<ul role="list" class="projects flow">
				{#each $filteredProjects as project}
					<li class="cluster">
						<div class="project__image">
							<img src={project.images[0].url} alt={project.images[0].alt} />
						</div>
						<div class="project__meta flow">
							<a href={`projects/${project.slug}`} class="link">
								<h2>{project.title}</h2>
							</a>
							<p class="project__work">#{project.work}</p>
						</div>
						<div class="project__controls cluster">
							<button class="button edit" data-button-variant="control">
								<Icon name="edit" height="1.2em" />
							</button>
							<button class="button remove" data-button-variant="control">
								<Icon name="trash" height="1.2em" />
							</button>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No results...</p>
		{/if}
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
	.wrapper {
		// background-color: orange;

		ul.projects li {
			// --_horizontal-alignment: space-between;
			--_vertical-alignment: flex-start;

			width: 100%;
			padding-inline: var(--space-xs);
			padding-block: var(--space-xs);
			background-color: hsl(0, 0%, 99%);
			// min-width: 100%;

			h2 {
				font-size: var(--text-heading-4);
			}
		}
	}

	.project__image {
		height: 5em;
		width: 8em;

		img {
			object-fit: cover;
			object-position: center;
			height: 100%;
		}
	}

	.project__meta {
		align-self: flex-start;
		justify-self: flex-start;
		// text-align: left;
		p {
			font-size: var(--size-step--3);
			padding: 0.15em 0.6em;
			background-color: hsla(0, 0%, 60%, 0.4);
			// width: max-content;
			border-radius: 0.4em;
			width: max-content;
			margin-left: 0;
			color: hsla(0, 0%, 20%, 0.75);
		}
	}

	.project__controls {
		// --_direction: column;
		--_column-gap: var(--space-xs);

		margin-left: auto;
	}

	.control__panel {
		ul {
			--_wrap: nowrap;
			--_column-gap: var(--space-s);
			--_horizontal-alignment: flex-start;
			--_vertical-alignment: flex-start;

			font-size: var(--size-step--3);
			font-weight: 500;

			li {
				flex-basis: 0;
				// width: max-content;

				button {
					width: max-content;
					padding: 0.15em 0.6em;
					background-color: hsla(0, 0%, 60%, 0.4);
					color: hsla(0, 0%, 20%, 0.75);
					border-radius: 0.5rem;
				}
			}
		}

		.selected {
			background-color: orange;
		}
	}
</style>
