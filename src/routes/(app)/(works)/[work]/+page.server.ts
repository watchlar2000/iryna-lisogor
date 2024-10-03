import { routing } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		projects: await routing.project.read({ work: params.work })
	};
};
