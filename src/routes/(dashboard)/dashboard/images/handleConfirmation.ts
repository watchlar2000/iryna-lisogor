import type Prompt from '$lib/components/Modal/Prompt.svelte';

export const handleConfirmation = async (prompt: Prompt) => {
	let userConfirmed = false;

	await new Promise((resolve) => {
		prompt.open();
		prompt.$set({
			onresult: (result) => {
				userConfirmed = result;
				resolve(result);
				return result;
			},
			label: 'Delete',
			description: 'Image to be deleted from the database'
		});
	});

	return userConfirmed;
};
