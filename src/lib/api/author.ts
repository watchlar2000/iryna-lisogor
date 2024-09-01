import { db } from '$lib/server';
import type { authors } from '$lib/server/schema';
import { type InferSelectModel } from 'drizzle-orm';

type AuthorType = InferSelectModel<typeof authors>;

export interface AuthorAPI {
	get(): Promise<AuthorType | undefined>;
}

export default {
	get(): Promise<AuthorType | undefined> {
		return db.query.authors.findFirst();
	}
} as AuthorAPI;
