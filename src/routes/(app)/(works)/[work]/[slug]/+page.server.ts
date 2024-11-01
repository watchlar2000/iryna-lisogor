import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const projectData = await withErrorHandling(() => {
		return routing.project.read({ slug: params.slug });
	});

	return {
		project: projectData
	};
};
