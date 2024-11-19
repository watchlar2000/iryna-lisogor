import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import { error } from '@sveltejs/kit';

const baseError = {
	status: HTTP_STATUS.INTERNAL_ERROR,
	message: 'Something went wrong',
	data: null
};

export const withErrorHandling = async <T>(fn: () => Promise<T>): Promise<T> => {
	try {
		return await fn();
	} catch (err) {
		const { status, message, data } = err instanceof BaseError ? err : baseError;
		throw error(status, { message, data });
	}
};
