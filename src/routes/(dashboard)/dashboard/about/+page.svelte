<script lang="ts">
	import { enhance } from '$app/forms';
	import { Image } from '@unpic/svelte';
	import IconEdit from '../../../IconEdit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	// console.log(data);

	$: ({ photoUrl, about } = data.authors[0]);

	// let isEditMode: boolean = false;
	// let updatedPhotoUrl: string;
	// let updatedAbout: string;
	let form: null;
	let inputFile: HTMLElement;
	let formLoading: boolean = false;

	const initImageUpload = () => {
		inputFile.click();
	};

	// const readFileAsDataURL = (file: File): Promise<string> => {
	// 	return new Promise((resolve, reject) => {
	// 		const reader = new FileReader();
	//
	// 		reader.onload = function (event: ProgressEvent<FileReader>) {
	// 			resolve(event.target.result as string);
	// 		};
	//
	// 		reader.onerror = function (error) {
	// 			reject(error);
	// 		};
	//
	// 		reader.readAsDataURL(file);
	// 	});
	// };

	// const handleImageUpload = async (e: Event) => {
	// 	const image = (e.target as HTMLInputElement)?.files?.[0];
	//
	// 	if (!image) return;
	//
	// 	updatedPhotoUrl = publicUrl;
	//
	// 	setEditMode();
	// };
	//
	// const setEditMode = (mode: boolean = true): void => {
	// 	isEditMode = mode;
	// };

	// const reset = () => {
	// 	updatedPhotoUrl = '';
	// 	updatedAbout = '';
	// 	setEditMode(false);
	// };
</script>

<!--https://hartenfeller.dev/blog/sveltekit-image-upload-store-->

<h1 class="text-2xl font-bold">About page</h1>
{#if formLoading}
	<p>Server is running...</p>
{/if}
<form
	bind:this={form}
	class="mt-6"
	enctype="multipart/form-data"
	method="POST"
	use:enhance={() => {
		formLoading = true;
		return async ({ update }) => {
			formLoading = false;
			update();
		};
	}}
>
	<div>
		<button
			class="flex gap-2 items-center hover:underline focus:underline"
			on:click={initImageUpload}
			type="button"
		>
			<IconEdit />
			<span class="text-lg font-semibold">Profile photo:</span>
		</button>
		<div class="mt-2 w-1/2">
			<Image
				alt="Iryna Lisogor profile photo"
				aspectRatio={1.6}
				layout="constrained"
				src={photoUrl}
			/>
			<input
				accept="image/*"
				bind:this={inputFile}
				class="hidden"
				name="profileImage"
				on:change={() => form.requestSubmit()}
				type="file"
			/>
		</div>
	</div>
	<hr class="h-px my-5 bg-gray-200 border-0 dark:bg-gray-700" />
	<div>
		<!--	<label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="message"-->
		<!--		>About:</label-->
		<!--	>-->
		<!--	<textarea-->
		<!--		bind:value-->
		<!--		class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
		<!--		id="message"-->
		<!--		placeholder="Write your thoughts here..."-->
		<!--		rows="10"-->
		<!--	></textarea>-->
		<button class="flex gap-2 items-center hover:underline focus:underline">
			<IconEdit />
			<span class="text-lg font-semibold">About:</span>
		</button>
		<div class="flex flex-col gap-3 mt-2">{@html about}</div>
	</div>
	<!--	<div class="mt-6 flex gap-4">-->
	<!--		<button-->
	<!--			class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"-->
	<!--			on:click={reset}-->
	<!--			type="button"-->
	<!--		>-->
	<!--			Cancel-->
	<!--		</button>-->
	<!--		<button-->
	<!--			class="disabled:opacity-50 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"-->
	<!--			disabled={!isEditMode}-->
	<!--			type="submit"-->
	<!--		>-->
	<!--			Save-->
	<!--		</button>-->
	<!--	</div>-->
</form>
