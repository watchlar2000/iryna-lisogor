// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const noScroll = (node: HTMLElement) => {
	const bodyEl = document.body;

	const getScrollbarWidth = () => {
		return window.innerWidth - bodyEl.clientWidth;
	};

	const applyNoScroll = () => {
		bodyEl.style.paddingRight = `${getScrollbarWidth()}px`;
		bodyEl.style.overflow = 'hidden';
	};

	const removeNoScroll = () => {
		bodyEl.style.paddingRight = '0';
		bodyEl.style.overflow = 'unset';
	};

	applyNoScroll();

	return {
		destroy() {
			removeNoScroll();
		}
	};
};
