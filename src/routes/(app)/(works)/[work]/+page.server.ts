import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
// import type { PageServerLoad } from './$types';

export const load = async ({ params }) => {
	const param = params.work;
	const data = await withErrorHandling(() => routing.project.read({ work: param }));

	return {
		projects: data
	};
};
