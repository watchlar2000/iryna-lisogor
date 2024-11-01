import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const projectsData = await withErrorHandling(() => {
		return routing.project.read({ work: params.work });
	});

	return {
		projects: projectsData
	};
};
