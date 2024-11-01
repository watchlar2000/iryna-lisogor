import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const authorData = await withErrorHandling(() => {
		return routing.author.read();
	});

	return { author: authorData };
};
