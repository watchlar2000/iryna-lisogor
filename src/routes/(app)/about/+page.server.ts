import type { PageServerLoad } from '../$types';
import { db } from '$lib/server';

export const load: PageServerLoad = async () => {
	const authorData = await db.query.author.findFirst();
	return { authorData };
};