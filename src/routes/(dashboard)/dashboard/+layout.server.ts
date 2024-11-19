import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const { project, work } = routing;
	const [projects, works] = await withErrorHandling(() =>
		Promise.all([project.read(), work.read()])
	);

	return { projects, works };
};
