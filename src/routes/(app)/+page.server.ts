import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await withErrorHandling(() => routing.project.read());

	return { projects: data };
};
