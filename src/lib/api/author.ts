import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import { api } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import type { Author } from '$lib/types/common';

const authorApi = api(authors);

type ReadParam = {
	id: number;
};

export interface AuthorAPI {
	read(params?: ReadParam): Promise<Author[]>;
}

export const author: AuthorAPI = {
	async read(params) {
		const { id } = params ?? {};
		const idParam = id ? { id } : {};
		const data = await authorApi.read(idParam);

		if (!data.length)
			throw new BaseError({
				status: HTTP_STATUS.NOT_FOUND,
				message: 'No author data found'
			});

		return data as Author[];
	}
};
