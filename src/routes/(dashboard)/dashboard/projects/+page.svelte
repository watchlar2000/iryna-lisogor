<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import Prompt from '$lib/components/Modal/Prompt.svelte';
	import { notification } from '$lib/utils/notification.js';
	import { Image } from '@unpic/svelte';
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';

	export let data;

	let deleteProject: Prompt;
	let onresult = false;
	let onDeleteCallback: () => Promise<void>;
	let onDeleteResult: (result: boolean) => Promise<void>;

	const workTypesList = [
		{
			id: 0,
			title: 'all',
			slug: 'all'
		},
		{
			id: 1,
			title: 'background painting',
			slug: 'background-painting'
		},
		{
			id: 2,
			title: 'visual development',
			slug: 'visual-development'
		},
		{
			id: 3,
			title: 'playground',
			slug: 'playground'
		}
	] as const;

	// searchString will be used along with the search input so admin can use it to find the projects more efficiently
	const filter = writable({
		// searchString: '',
		selectedWorkType: 'all'
	});

	const projects = writable(data.projects);

	onMount(() => {
		const { hash } = document.location;

		if (hash) {
			filter.set({ selectedWorkType: hash.slice(1) });
		}
	});

	const filteredProjects = derived([projects, filter], ([$projects, $filter]) => {
		const { selectedWorkType } = $filter;
		const isSelectedWorkAll = selectedWorkType === 'all';

		if (isSelectedWorkAll) return $projects;

		const filteredByWork = isSelectedWorkAll
			? $projects
			: $projects.filter(({ workType }) => workType === selectedWorkType);

		// return filteredByWork.filter((project) => project.title.toLowerCase().includes(searchString));

		return filteredByWork;
	});

	const handleSelectWork = (work: string): void => {
		document.location.hash = work;
		$filter.selectedWorkType = work;
	};

	const handleDelete = (id: number): void => {
		deleteProject.open();

		onDeleteCallback = () => {
			return new Promise((resolve) => {
				setTimeout(() => {
					console.log(`removed project with id ${id}`);
					resolve();
				}, 2000);
			});
		};
	};

	$: if (onresult) {
		notification.promise(onDeleteCallback(), {
			loading: 'Removing project',
			success: 'Removed successfully',
			error: 'Failed to remove project'
		});
		onresult = false;
	}

	// https://www.captaincodeman.com/dealing-with-dialogs-in-svelte
</script>

<Prompt
	bind:this={deleteProject}
	label="Delete"
	onresult={(res) => (onresult = res)}
	description="Project will be removed from the database"
	labelType="reset"
/>
<div class="flow">
	<header class="cluster">
		<h6>Projects</h6>
		<a href="projects/new" class="button">
			<Icon name="plus" />
			Add new project
		</a>
	</header>
	<div class="flow filter__panel">
		<div>
			<ul role="list" class="cluster">
				{#each workTypesList as work (work.id)}
					<li>
						<button
							class:selected={$filter.selectedWorkType === work.slug}
							class="button"
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
			<ul role="list" class="projects__list flow">
				{#each $filteredProjects as project}
					<li class="cluster">
						<div class="project__image">
							<Image
								src={project.coverImage?.url}
								alt={project.coverImage?.alt}
								width={project.coverImage?.width}
								height={project.coverImage?.height}
							/>
						</div>
						<div class="project__meta flow">
							<h5>{project.title}</h5>
							<div class="project__meta--tags-list">
								<span>#{project.workType}</span>
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

<style lang="scss">
	header.cluster {
		--_horizontal-alignment: space-between;

		width: 100%;

		a {
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

	.projects__list {
		li {
			--cluster-vertical-alignment: start;

			background-color: var(--color-surface-900);
			padding: var(--space-xs);
			border-radius: 0.625rem;
		}
	}

	.project__image {
		max-width: 12ch;
		height: 8ch;
		border-radius: 0.375rem;
		overflow: hidden;

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
		}
	}

	.project__controls {
		--cluster-direction: column;
		--cluster-row-gap: var(--space-xs);

		button {
			--button-border-width: 0px;
		}
	}

	.filter__panel {
		button {
			--button-padding-inline: 1.75ch;
			--button-padding-block: 0.75ch;
			--button-font-size: var(--size-step--3);

			text-transform: capitalize;
		}
	}

	.selected {
		border-color: var(--color-accent-400);
	}
</style>
