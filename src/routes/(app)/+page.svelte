<script lang="ts">
    // export let data;
    // let images = data.images;

    import type {PageData} from './$types';

    export let data: PageData;
    // export let data;
    $: ({projects} = data);
</script>


<svelte:head>
    <title>Iryna Lisogor | Home</title>
    <meta content="Iryna Lisogor portfolio page" name="description" />
</svelte:head>

<section class="w-full">
    <h1 class="text-7xl mt-8">Hello world</h1>
    <!--    <pre>{JSON.stringify(projects, null, 4)}</pre>-->
    <!--	<ul class="grid md:grid-cols-2 gap-4">-->
    <!--		{#each data.projects[0].images as image}-->
    <!--			<li>-->
    <!--				<a class="focus:border-amber-500" href={image.url} target="_blank">-->
    <!--					<Image-->
    <!--						src={image.url}-->
    <!--						layout="constrained"-->
    <!--						fullWidth-->
    <!--						alt={image.title}-->
    <!--					/>-->
    <!--				</a>-->
    <!--			</li>-->
    <!--		{/each}-->
    <!--	</ul>-->

</section>
