import type { Actions } from '@sveltejs/kit';

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
