import { api } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import type { Author } from '$lib/types/common';
// import type { Author, AuthorPayload } from '$lib/types/index.ts';
// import { eq, sql } from 'drizzle-orm';

const authorApi = api(authors);

type AuthorReadParam = {
	id: number;
};

export interface AuthorAPI {
	read(params?: AuthorReadParam): Promise<Author[] | Author>;
}

// put(params: { payload: Partial<AuthorPayload>; id: number }): Promise<void>;

export const author: AuthorAPI = {
	async read(params) {
		const { id } = params ?? {};
		const read = authorApi.read;

		if (id) {
			const data = await read({ id });
			return data[0] as Author;
		}

		return (await read()) as Author[];
	}
};

// export default (db: DatabaseType): AuthorAPI => ({
// 	get({ id }) {
// 		return db.query.authors.findMany({
// 			where: eq(authors.id, id)
// 		});
// 	},
// 	async put({ id, payload }) {
// 		await db
// 			.update(authors)
// 			.set({ ...payload, updatedAt: sql`NOW()` })
// 			.where(eq(authors.id, id));
// 	}
// });
