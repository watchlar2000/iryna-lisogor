<script lang="ts">
	import { convertToSlug, getCoverImage } from '$lib/utils';
	import { Image } from '@unpic/svelte';

	export let projects;

	// console.log({ projects });
</script>

<svelte:head>
	<title>Iryna Lisogor | Home</title>
	<meta content="Iryna Lisogor portfolio page" name="description" />
</svelte:head>

<section class="w-full">
	<!-- <pre>{JSON.stringify(projects, null, 4)}</pre> -->
	{#if projects.length}
		<ul class="grid md:grid-cols-2 gap-4">
			{#each projects as project (project.id)}
				<a class="focus:border-amber-500" href={`/${project.work}/${convertToSlug(project.title)}`}>
					<Image
						src={getCoverImage(project.images).url}
						layout="constrained"
						aspectRatio={1}
						alt={getCoverImage(project.images).alt}
					/>
				</a>
			{/each}
		</ul>
	{:else}
		<p>Projects under maintenance</p>
	{/if}
</section>
