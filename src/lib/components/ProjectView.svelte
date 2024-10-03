<script lang="ts">
	import type { Image as ImageType } from '$lib/types/common.ts';
	import type { ProjectWithImages } from '$lib/types/projects.ts';
	import { Image } from '@unpic/svelte';

	export let project: ProjectWithImages;

	type CategorizedImages = {
		cover: ImageType | null;
		nonCover: ImageType[];
	};

	$: ({ cover, nonCover } = project.images.reduce<CategorizedImages>(
		(acc, cur) => {
			if (cur.isCoverImage) {
				acc.cover = cur;
			} else {
				acc.nonCover = [...acc.nonCover, cur];
			}

			return acc;
		},
		{
			cover: null,
			nonCover: []
		}
	));
</script>

<svelte:head>
	<title>Iryna Lisogor | {project.title}</title>
	<meta content={project.title} name={project.description} />
</svelte:head>

<div class="flow">
	<div class="wrapper heading" data-wrapper-type="inner">
		<h1>{project.title}</h1>
	</div>

	<div class="wrapper flow">
		<p data-wrapper-type="inner">{project.description}</p>
		<Image src={cover?.url} layout="constrained" aspectRatio={1.5} alt={cover?.alt} />
		{#each nonCover as image}
			<Image src={image.url} layout="constrained" aspectRatio={1.5} alt={image.alt} />
		{/each}
	</div>
</div>
