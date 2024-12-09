<script lang="ts">
	import { convertToSlug, getCoverImage } from '$lib/utils';
	import { Image } from '@unpic/svelte';

	export let projects;

	function convertToKebabCase(input: string) {
		return input
			.trim() // Remove leading/trailing whitespace
			.toLowerCase() // Convert to lowercase
			.replace(/\s+/g, '-'); // Replace spaces with hyphens
	}

	$: console.log(projects);
</script>

<svelte:head>
	<title>Iryna Lisogor | Home</title>
	<meta content="Iryna Lisogor portfolio page" name="description" />
</svelte:head>

<div class="wrapper">
	{#if projects.length}
		<ul class="auto-grid" role="list">
			{#each projects as project (project.id)}
				<li>
					<a class="" href={`${convertToKebabCase(project.workType)}/${project.slug}`}>
						<Image
							src={project.coverImage.url}
							layout="constrained"
							aspectRatio={1.5}
							alt="Some alt text..."
						/>
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<p>Projects under maintenance</p>
	{/if}
</div>

<style lang="scss">
	.auto-grid {
		--auto-grid-min-size: 20rem;
		--auto-grid-gap: 1.75em;

		a {
			display: block;

			& > :global(img) {
				border-radius: calc(var(--button-border-radius) / 2);
			}
		}
	}
</style>
