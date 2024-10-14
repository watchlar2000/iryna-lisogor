import { api } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import type { Author } from '$lib/types/common';
import { error } from '@sveltejs/kit';

const authorApi = api(authors);

type AuthorReadParam = {
	id: number;
};

export interface AuthorAPI {
	read(params?: AuthorReadParam): Promise<Author[]>;
}

export const author: AuthorAPI = {
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
};
