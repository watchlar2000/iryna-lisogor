import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const validParam = ['visual-development', 'background-painting', 'playground'];

export const load: LayoutServerLoad = async ({ params }) => {
	if (validParam.indexOf(params.work) === -1) {
		throw error(404, 'Page not found');
	}
};
