import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
// import type { PageServerLoad } from './$types';

export const load = async () => {
	const data = await withErrorHandling(() => routing.project.read({ work: 'playground' }));

	return { projects: data };
};
