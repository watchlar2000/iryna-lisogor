<script lang="ts">
	import ProjectView from '$lib/components/ProjectView.svelte';
	import type { ProjectWithImages } from '$lib/types/projects.ts';
	import type { PageData } from './$types';

	export let data: PageData;

	$: project = data.project as ProjectWithImages[];
</script>

<ProjectView project={project[0]} />
