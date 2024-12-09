<script lang="ts">
	import type { ProjectWithImages } from '$lib/types/projects.ts';
	import { Image } from '@unpic/svelte';

	export let project: ProjectWithImages;
</script>

<svelte:head>
	<title>Iryna Lisogor | {project.title}</title>
	<meta content={project.title} name={project.description} />
</svelte:head>

<div class="flow">
	<div class="wrapper" data-wrapper-type="inner">
		<h1>{project.title}</h1>
	</div>

	<div class="wrapper flow cluster">
		<p data-wrapper-type="inner">{project.description}</p>
		{#each project.images as { image }}
			<div>
				<Image
					src={image.url}
					layout="constrained"
					width={image.width}
					height={image.height}
					alt={image.alt}
				/>
			</div>
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}
	p {
		/* text-align: center; */
		width: 100%;
	}
	.cluster {
		--cluster-horizontal-alignment: center;
		--cluster-wrap: wrap;
	}
</style>
