import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const fd = await request.formData();

		console.log({ fd });
	}
};
