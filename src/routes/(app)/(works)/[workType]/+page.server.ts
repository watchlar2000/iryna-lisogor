import { routing } from '$lib/api';
import { WorkType } from '$lib/server/schema.js';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const ensureValidRoute = (workType: WorkType) => {
	const validWorkTypes = Object.values(WorkType);

	if (!validWorkTypes.includes(workType)) {
		throw error(404, 'Page not found');
	}
};

export const load: PageServerLoad = async ({ params }) => {
	const workType = params.workType;

	ensureValidRoute(workType as WorkType);

	const data = await withErrorHandling(() =>
		routing.project.read({ workType: workType as WorkType })
	);

	return {
		projects: data
	};
};
