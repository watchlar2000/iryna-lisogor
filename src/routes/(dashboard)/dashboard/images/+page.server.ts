import { routing } from '$lib/api';
import { image } from '$lib/api/image';
import { type InsertImage } from '$lib/server/schema';
import { imagesStorage } from '$lib/server/supabase';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const data = await withErrorHandling(() => routing.image.read());

	return { images: data };
};

export const actions: Actions = {
	upload: async ({ request }) => {
		try {
			const fd = await request.formData();
			const file = fd.get('image') as File | null;
			const alt = fd.get('alt') as string | null;

			if (!file) {
				return fail(400, {
					error: 'No image provided'
				});
			}

			if (!(file instanceof File)) {
				return fail(400, { error: 'Invalid file input' });
			}

			if (!file.type.startsWith('image/')) {
				return fail(400, { error: 'Only image files are allowed' });
			}

			if (file.size > 5 * 1024 * 1024) {
				// 5MB limit
				return fail(400, { error: 'File size exceeds 5MB' });
			}

			const name = crypto.randomUUID();
			const {
				data: { publicUrl }
			} = await imagesStorage.post({ file, name });

			if (!publicUrl) {
				return fail(402, {
					error: 'Failed to upload image'
				});
			}

			const payload: InsertImage = {
				url: publicUrl as string,
				alt: alt ?? '',
				width: 200,
				height: 200
			};

			await routing.image.create({ payload });

			return {
				success: true,
				message: 'Image uploaded successfully'
			};
		} catch (err: unknown) {
			if (err instanceof Error) {
				return fail(400, {
					error: err.message
				});
			}

			return fail(400, {
				error: 'An unknown error occurred'
			});
		}
	},
	update: async ({ request }) => {
		const fd = await request.formData();
		const { image: file } = Object.fromEntries(fd);

		console.log('calling update action');

		console.log(fd);

		// const payload: InsertImage = {};

		// try {
		// 	const fd = await request.formData();
		// 	const { image: file, alt } = Object.fromEntries(fd);

		// 	if (!file) {
		// 		return fail(400, {
		// 			error: 'No image provided'
		// 		});
		// 	}

		// 	const name = crypto.randomUUID();
		// 	const { data } = await imagesStorage.post({ file, name });

		// 	if (!data) {
		// 		return fail(402, {
		// 			error: 'Failed to upload image'
		// 		});
		// 	}

		// 	payload.url = data.publicUrl as string;
		// 	payload.alt = alt as string;
		// 	payload.width = 200;
		// 	payload.height = 200;

		// 	await routing.image.create({ payload });

		// 	return {
		// 		success: true,
		// 		message: 'Image uploaded successfully'
		// 	};
		// } catch (err: unknown) {
		// 	if (err instanceof Error) {
		// 		return fail(400, {
		// 			error: err.message
		// 		});
		// 	}

		// 	return fail(400, {
		// 		error: 'An unknown error occurred'
		// 	});
		// }
	},
	delete: async ({ request }) => {
		try {
			const fd = await request.formData();
			const { name, id } = Object.fromEntries(fd);

			if (!name || !id) {
				return fail(402, {
					error: 'Neither id nor name provided'
				});
			}

			const deleteImageFromStorage = imagesStorage.delete({ name: name as string });
			const deleteImageFromDb = image.delete({ id: +id });

			Promise.all([deleteImageFromStorage, deleteImageFromDb]);

			return {
				success: true,
				message: 'Image deleted successfully'
			};
		} catch (err) {
			if (err instanceof Error) {
				return fail(400, {
					error: err.message
				});
			}

			return fail(400, {
				error: 'An unknown error occurred'
			});
		}
	}
};
