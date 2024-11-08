import { listener } from '$lib/utils/events';

export const clickOutside = (node: HTMLElement) => {
	const handleClick = (event: Event) => {
		if (!node.contains(event.target as HTMLElement)) {
			node.dispatchEvent(new CustomEvent('outclick'));
		}
	};

	const removeListener = listener(document.body, 'click', handleClick);

	// document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			removeListener();
		}
	};
};
