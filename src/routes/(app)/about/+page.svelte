<script lang="ts">
	import type { Author } from '$lib/types';
	import { Image } from '@unpic/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: authorData = data.authorData as Author;
</script>

<svelte:head>
	<title>Iryna Lisogor | About</title>
	<meta content="About the author" name="description" />
</svelte:head>

<div class="">
	<Image
		alt="Iryna Lisogor profile photo"
		layout="constrained"
		src={authorData.photoUrl ?? ''}
		aspectRatio={1.5}
	/>
	<h2 class="text-4xl font-normal mt-6">Hello!</h2>
	<div class="flex flex-col gap-4 mt-6 text-xl">
		<div class="font-ubuntu font-light -mt-3 flex flex-col gap-3">
			{@html authorData.about}
		</div>
	</div>
</div>
