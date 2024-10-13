import { routing } from '$lib/api';
// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// try {
	const author = await routing.author.read({ id: 2 });
	return { author };
	// } catch (e) {
	// throw error(404, e.message);
	// }
};
