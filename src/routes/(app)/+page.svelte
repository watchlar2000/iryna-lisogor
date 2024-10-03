<script lang="ts">
	import ProjectsGrid from '$lib/components/ProjectsGrid.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ projects } = data);
</script>

<svelte:head>
	<title>Iryna Lisogor | Home</title>
	<meta content="Iryna Lisogor portfolio page" name="description" />
</svelte:head>

<ProjectsGrid {projects} />
