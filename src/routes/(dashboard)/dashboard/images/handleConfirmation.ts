import type Prompt from '$lib/components/Modal/Prompt.svelte';

type HandleConfirmation = {
	prompt: Prompt;
	label: string;
	description: string;
};

export const handleConfirmation = async ({ prompt, label, description }: HandleConfirmation) =>
	new Promise((resolve) => {
		prompt.open();
		prompt.$set({
			onresult: (result) => {
				resolve(result);
				return result;
			},
			label,
			description
		});
	});
