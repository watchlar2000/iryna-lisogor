<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	// import Modal from '$lib/components/Modal/Modal.svelte';
	import Prompt from '$lib/components/Modal/Prompt.svelte';
	import { derived, writable } from 'svelte/store';

	export let data;

	// let modal: Modal;

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

	const handleDelete = (id: number) => {
		// modal.open();
	};
</script>

// https://www.captaincodeman.com/dealing-with-dialogs-in-svelte

<Prompt
	label="Delete"
	onresult={() => {}}
	description="Project will be removed from the database"
	labelType="reset"
></Prompt>
<div class="flow">
	<header>
		<h6>Projects</h6>
	</header>
	<!-- <div class="flow control__panel">
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
	</div> -->
	<div>
		{#if $filteredProjects.length}
			<ul role="list" class="projects__list flow">
				{#each $filteredProjects as project}
					<li class="cluster">
						<div class="project__image">
							<img src={project.images[0].url} alt={project.images[0].alt} />
						</div>
						<div class="project__meta flow">
							<!-- <a href={`projects/${project.slug}`}> -->
							<h5>{project.title}</h5>
							<!-- </a> -->
							<div class="project__meta--tags-list">
								<span>#{project.work}</span>
							</div>
						</div>
						<div class="project__controls cluster">
							<button class="button">
								<Icon name="edit" height="1.2em" />
								<span class="visually-hidden">Edit project ${project.title}</span>
							</button>
							<button class="button" type="reset" on:click={() => handleDelete(project.id)}>
								<Icon name="trash" height="1.2em" />
								<span class="visually-hidden">Remove project ${project.title}</span>
							</button>
						</div>
					</li>
				{/each}
			</ul>
		{:else}
			<p>No projects found...</p>
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
	header.cluster {
		--_horizontal-alignment: space-between;

		width: 100%;
	}

	.projects__list {
		li {
			--cluster-vertical-alignment: start;
			background-color: var(--color-surface-900);
			padding: var(--space-s);
			border-radius: 0.625rem;
		}
	}

	.project__image {
		max-width: 12ch;
		height: 8ch;

		img {
			height: 100%;
			object-fit: cover;
		}
	}

	.project__meta {
		--flow-space: 0px;

		flex-grow: 1;

		h5 {
			font-size: var(--text-size-heading-4);
			font-weight: 600;
		}

		&--tags-list span {
			font-size: var(--size-step--2);
			// color: var(--color-surface-800);
			// font-weight: 400;
			// background-color: var(--color-dark-400);
			// padding-inline: 1ch;
			// padding-block: 0.25ch;
			// border-radius: 0.5ch;

			// user-select: none;
		}
	}

	.project__controls {
		--cluster-direction: column;
		--cluster-row-gap: var(--space-xs);

		button {
			--button-border-width: 0px;
		}
	}

	/*
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
		*/
</style>
