import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const data = await withErrorHandling(() => routing.project.read());

	return { projects: data };
};
