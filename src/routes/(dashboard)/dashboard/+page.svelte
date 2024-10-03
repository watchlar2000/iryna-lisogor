<script lang="ts">
	import { type ProjectWithImages } from '$lib/types/projects';
	import type { PageData } from './$types';

	export let data: PageData;

	$: projects = data.projects as ProjectWithImages[];
</script>

<ul class="flex flex-col gap-2">
	{#each projects as project}
		<li class="p-2 bg-purple-100">
			<a href={`dashboard/projects/${project.slug}`}>
				<h2>{project.title}</h2>
			</a>
			<!-- <img src={project.images[0].url} alt={project.images[0].alt} /> -->
		</li>
	{/each}
</ul>
