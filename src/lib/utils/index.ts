import type { Image, Work, WorkOption } from '$lib/types/common';

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

export const getCoverImage = (id: number, imageList: Image[]) => {
	return imageList.find((image) => image.id === id);
};

export const fullYear = () => new Date().getFullYear();

/*
export const slugify = (str: string) => {
	return (
		String(str)
			.normalize('NFKD') // split accented characters into their base characters and diacritical marks
			// biome-ignore lint/suspicious/noMisleadingCharacterClass: <explanation>
			.replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
			.trim() // trim leading or trailing whitespace
			.toLowerCase() // convert to lowercase
			.replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
			.replace(/\s+/g, '-') // replace spaces with hyphens
			.replace(/-+/g, '-') // remove consecutive hyphens
			.replace(/^-+|-+$/g, '')
	); // remove leading and trailing hyphens
};
*/
