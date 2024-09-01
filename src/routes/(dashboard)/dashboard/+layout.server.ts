import { db } from '$lib/server/db';
import { works } from '$lib/server/schema';

export async function load() {
	return {
		works: await db.select().from(works)
	};
}
