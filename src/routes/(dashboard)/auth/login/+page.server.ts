import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const { error } = await locals.supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error) {
			console.error(error);
			return fail(401, { success: false, message: 'Authentication failed' });
		} else {
			redirect(303, '/dashboard');
		}
	}
};
