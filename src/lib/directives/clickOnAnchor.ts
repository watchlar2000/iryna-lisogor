import { listener } from '$lib/utils/events';

export const clickOnAnchor = (node: HTMLElement) => {
	const handleClick = (event: Event) => {
		if ((event.target as HTMLElement).tagName === 'A') {
			node.dispatchEvent(new CustomEvent('clickOnAnchor'));
		}
	};

	// const removeListener = listener(node, 'click', handleClick, true);

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			// return removeListener();
			document.removeEventListener('click', handleClick, true);
		}
	};
};
