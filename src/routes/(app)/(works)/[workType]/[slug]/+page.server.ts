import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const data = await withErrorHandling(() => routing.project.read({ slug }));

	return {
		project: data
	};
};
