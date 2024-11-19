import { onMount } from 'svelte';

export const lockBodyScroll = () => {
	onMount(() => {
		document.body.dataset.scrollLocked = 'true';

		return () => delete document.body.dataset.scrollLocked;
	});
};
