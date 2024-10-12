<script lang="ts">
	import { convertToSlug, getCoverImage } from '$lib/utils';
	import { Image } from '@unpic/svelte';

	export let projects;
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
					<a class="" href={`/${project.work}/${convertToSlug(project.title)}`}>
						<Image
							src={getCoverImage(project.images).url}
							layout="constrained"
							aspectRatio={1.5}
							alt={getCoverImage(project.images).alt}
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
		}
	}
</style>
