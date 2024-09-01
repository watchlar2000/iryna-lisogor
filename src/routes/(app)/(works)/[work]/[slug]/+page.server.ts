import { routing } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	return {
		projects: await routing.project.get({ slug })
	};
};
