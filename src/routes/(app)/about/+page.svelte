<script lang="ts">
	import { Image } from '@unpic/svelte';
	import type { PageData } from './$types';
	// import { Image } from '@unpic/svelte';

	export let data: PageData;

	$: author = data.author[0];
</script>

<svelte:head>
	<title>Iryna Lisogor | About</title>
	<meta content="About the author" name="description" />
</svelte:head>

<div class="flow">
	<div class="wrapper" data-wrapper-type="inner">
		<h1>About me</h1>
	</div>

	<div class="wrapper flow" data-wrapper-type="inner">
		<div class="profile__photo">
			<Image src={author.photoUrl} alt="Iryna Lisogor herself" aspectRatio={1 / 1.25} />
		</div>
		<h2>Hello!</h2>
		<div class="flow">
			{@html author.about}
		</div>
	</div>
</div>

<style lang="scss">
	// .wrapper > *:not(p > img) {
	// width: 50%;
	// }

	.wrapper {
		--wrapper-max-width: 50ch;
	}

	.profile__photo {
		margin-inline: auto;
		width: 100%;
		max-width: 25ch;
	}
</style>
