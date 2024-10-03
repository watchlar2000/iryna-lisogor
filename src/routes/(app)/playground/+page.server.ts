import { routing } from '$lib/api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const projects = await routing.project.read({ work: 'playground' });
	return { projects };
};
