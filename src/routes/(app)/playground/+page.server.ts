import { routing } from '$lib/api';
import { WorkType } from '$lib/server/schema';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const workType = WorkType.PLAYGROUND;
	const data = await withErrorHandling(() => routing.project.read({ workType }));

	return { projects: data };
};
