import { routing } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		project: await routing.project.read({ slug: params.slug })
	};
};
