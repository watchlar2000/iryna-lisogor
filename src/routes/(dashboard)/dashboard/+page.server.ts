import { redirect } from '@sveltejs/kit';

export const load = () => {
	/*
	TODO: double check status code
	*/
	redirect(308, '/dashboard/projects');
};
