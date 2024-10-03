export const clickOnAnchor = (node) => {
	const handleClick = (event) => {
		if (event.target.tagName === 'A') {
			node.dispatchEvent(new CustomEvent('clickOnAnchor'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
