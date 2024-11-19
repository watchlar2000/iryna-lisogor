import toast from 'svelte-french-toast';

export const notification = {
	success: (message: string) => {
		toast.success(message);
	},
	error: (message: string) => {
		toast.error(message);
	}
};
