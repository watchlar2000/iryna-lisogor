import toast, { type Renderable, type ValueOrFunction } from 'svelte-french-toast';

export const notification = {
	success: (message: string) => {
		toast.success(message);
	},
	error: (message: string) => {
		toast.error(message);
	},
	promise: <T>(
		promise: Promise<T>,
		message: {
			loading: Renderable;
			success: ValueOrFunction<Renderable, T>;
			error: ValueOrFunction<Renderable, unknown>;
		}
	) => {
		toast.promise(promise, message);
	}
};
