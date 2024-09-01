import { routing } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	console.log({ playground: params });
	return {
		projects: await routing.project.get({ work: 'playground' })
	};
};