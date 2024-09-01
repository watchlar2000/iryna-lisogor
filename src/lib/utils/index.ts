import type { Image, WorkOption, WorkType } from '../types';

export const convertToSlug = (text: WorkType) => {
	return text
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
};

export const transformWorkOptions = (works: typeof WorkOption) =>
	Object.values(works).map((option) => ({
		title: option,
		slug: convertToSlug(option)
	}));

export const getCoverImage = (imageList: Image[]) => {
	return imageList.find((image) => image.isCoverImage);
};
