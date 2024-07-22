<script lang="ts">
	import type { PageData } from './$types';
	import { Image } from '@unpic/svelte';

	export let data: PageData;
	$: ({ authorData } = data);
</script>

<svelte:head>
	<title>Iryna Lisogor | About</title>
	<meta content="About the author" name="description" />
</svelte:head>

<div class="">
	<Image
		alt="Iryna Lisogor profile photo"
		aspectRatio={1.5}
		layout="constrained"
		src={authorData.photoUrl}
	/>
	<h2 class="uppercase text-4xl font-normal mt-6">About</h2>
	<div class="flex flex-col gap-4 mt-6 text-xl">
		<div class="font-ubuntu font-light -mt-3 flex flex-col gap-3">
			{@html authorData?.about}
		</div>
	</div>
</div>
