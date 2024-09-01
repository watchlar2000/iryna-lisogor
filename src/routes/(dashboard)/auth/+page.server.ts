import type { Actions } from '../../../../.svelte-kit/types/src/routes';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	// signup: async ({request, locals: {supabase}}) => {
	//     const formData = await request.formData();
	//     const email = formData.get('email') as string;
	//     const password = formData.get('password') as string;
	//
	//     const {error} = await supabase.auth.signUp({email, password});
	//     if (error) {
	//         console.error(error);
	//         redirect(303, '/auth/error');
	//     } else {
	//         redirect(303, '/');
	//     }
	// },
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
			redirect(303, '/auth/error');
		} else {
			redirect(303, '/dashboard');
		}
	}
};
