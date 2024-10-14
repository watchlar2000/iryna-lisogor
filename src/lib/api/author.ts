import { api } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import type { Author } from '$lib/types/common';
import { error } from '@sveltejs/kit';
// import { error } from '@sveltejs/kit';
// import type { Author, AuthorPayload } from '$lib/types/index.ts';
// import { eq, sql } from 'drizzle-orm';

const authorApi = api(authors);

type AuthorReadParam = {
	id: number;
};

export interface AuthorAPI {
	read(params?: AuthorReadParam): Promise<Author[]>;
}

export default {
	async read(params) {
		const { id } = params ?? {};
		const read = authorApi.read;
		let data: Author[];

		if (id) {
			data = (await read({ id })) as Author[];
		} else {
			data = (await read()) as Author[];
		}

		if (!data.length) throw error(404, 'No author data found');

		return data;
	}
} as AuthorAPI;

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
