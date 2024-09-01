<script lang="ts">
	import type { Image as ImageType, ProjectWithImages } from '$lib/types/index.ts';
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

<section class="w-full flex flex-col gap-8">
	<h1 class="text-4xl">{project.title}</h1>
	<!-- <pre>{JSON.stringify(images, null, 4)}</pre> -->
	<Image src={cover?.url} layout="constrained" aspectRatio={1} alt={cover?.alt} />
	<h2 class="text-xl">{project.description}</h2>
	{#each nonCover as image}
		<Image src={image.url} layout="constrained" aspectRatio={1} alt={image.alt} />
	{/each}
</section>
