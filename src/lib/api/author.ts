import { db } from '$lib/server/index.ts';
import type { Author } from '$lib/types/index.ts';

export interface AuthorAPI {
	get(): Promise<Author | undefined>;
}

export default {
	get(): Promise<Author | undefined> {
		return db.query.authors.findFirst();
	}
} as AuthorAPI;
