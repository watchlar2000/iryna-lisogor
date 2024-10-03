export const toggleScrollLock = () => {
	const isScrollLocked = document.body.dataset.scrollLocked === '1';

	if (isScrollLocked) {
		delete document.body.dataset.scrollLocked;
	} else {
		document.body.dataset.scrollLocked = '1';
	}
};
