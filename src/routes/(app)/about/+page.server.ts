import { routing } from '$lib/api';
// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const author = await routing.author.read({ id: 1 });
	return { author };
};
