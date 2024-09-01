import type { Image, Work, WorkOption } from '$lib/types/index.ts';

export const convertToSlug = (text: Work) => {
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
