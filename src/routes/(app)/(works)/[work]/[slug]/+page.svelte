<script lang="ts">
	import ProjectView from '$lib/components/ProjectView.svelte';
	import type { Project } from '$lib/types/index.ts';
	import type { PageData } from './$types';

	export let data: PageData;

	$: project = data.projects[0] as Project;
</script>

<!-- <pre>{JSON.stringify(data.projects[0], null, 2)}</pre> -->
<ProjectView {project} />
