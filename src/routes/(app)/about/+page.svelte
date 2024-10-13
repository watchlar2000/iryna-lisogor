<script lang="ts">
	import type { Author } from '$lib/types/common';
	import { Image } from '@unpic/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: author = data.author[0] as Author;
</script>

<svelte:head>
	<title>Iryna Lisogor | About</title>
	<meta content="About the author" name="description" />
</svelte:head>

<div class="flow">
	<div class="wrapper heading" data-wrapper-type="inner">
		<h1>About me</h1>
	</div>

	<div class="wrapper flow" data-wrapper-type="inner">
		<p class="article__photo">
			<Image
				alt="Iryna Lisogor profile photo"
				layout="constrained"
				src={author.photoUrl ?? ''}
				aspectRatio={1}
			/>
		</p>
		<h2>Hello!</h2>
		<div class="flow">
			{@html author.about}
		</div>
	</div>
</div>

<style lang="scss">
	.article__photo {
		margin-inline: auto;
		width: 50%;
	}
</style>
