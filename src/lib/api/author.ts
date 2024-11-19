import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import { api } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import type { Author } from '$lib/types/common';

const authorApi = api(authors);

type Id = {
	id: number;
};

type UpdateParams = Id & {
	payload: Record<string, string>;
};

export interface AuthorAPI {
	read(params?: Id): Promise<Author[]>;
	update(params: UpdateParams): Promise<Author[]>;
}

export const author: AuthorAPI = {
	async read(params) {
		const { id } = params ?? {};
		const idParam = id ? { id } : {};
		const data = await authorApi.read(idParam);

		if (!data.length)
			throw new BaseError({
				status: HTTP_STATUS.NOT_FOUND,
				message: 'No author data found',
				data: id ? { requestedId: id } : null
			});

		return data as Author[];
	},
	async update(params) {
		const { id, payload } = params;
		const data = await authorApi.update({ id, payload });

		if (!data.length)
			throw new BaseError({
				status: HTTP_STATUS.BAD_REQUEST,
				message: 'Something went wrong updating the author data',
				data: id ? { requestedId: id } : null
			});

		return data as Author[];
	}
};
