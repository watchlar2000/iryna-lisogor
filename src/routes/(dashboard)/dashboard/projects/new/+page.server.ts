import { routing } from '$lib/api';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await withErrorHandling(() => routing.image.read());

	return { images: data };
};

export const actions: Actions = {
	project: async ({ request }) => {
		const fd = await request.formData();

		console.log({ fd });
	},
	image: async ({ request }) => {
		const fd = await request.formData();

		console.log({ fd });
	}
};
