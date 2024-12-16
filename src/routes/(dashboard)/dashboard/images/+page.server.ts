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

			const file = fd.get('image') as File;
			const alt = fd.get('alt') as string;
			const width = parseInt(fd.get('width') as string, 10);
			const height = parseInt(fd.get('height') as string, 10);

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
				data: { publicUrl: url }
			} = await imagesStorage.post({ file, name });

			if (!url) {
				return fail(402, {
					error: 'Failed to upload image'
				});
			}

			const payload: InsertImage = {
				url,
				alt,
				width,
				height
			};

			await routing.image.create({ payload });

			return {
				success: true,
				message: 'Image uploaded'
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
		try {
			const fd = await request.formData();

			const id = parseInt(fd.get('id') as string, 10);
			const imageIsUpdated = fd.get('imageIsUpdate');
			const file = fd.get('image') as File;
			const previousUrl = fd.get('url') as string;
			const alt = fd.get('alt') as string;
			const width = parseInt(fd.get('width') as string, 10);
			const height = parseInt(fd.get('height') as string, 10);

			if (imageIsUpdated && !file) {
				return fail(400, {
					error: 'No image provided'
				});
			}

			if (imageIsUpdated && !(file instanceof File)) {
				return fail(400, { error: 'Invalid file input' });
			}

			if (imageIsUpdated && !file.type.startsWith('image/')) {
				return fail(400, { error: 'Only image files are allowed' });
			}

			if (imageIsUpdated && file.size > 5 * 1024 * 1024) {
				// 5MB limit
				return fail(400, { error: 'File size exceeds 5MB' });
			}

			// const name = crypto.randomUUID();
			// const {
			// 	data: { publicUrl: url }
			// } = await imagesStorage.post({ file, name });

			// if (!url) {
			// 	return fail(402, {
			// 		error: 'Failed to upload image'
			// 	});
			// }

			const postImageAndGetUrl = async (file: File) => {
				const name = crypto.randomUUID();
				const {
					data: { publicUrl: url }
				} = await imagesStorage.post({ file, name });
				return url;
			};

			const url = imageIsUpdated ? await postImageAndGetUrl(file) : previousUrl;

			if (!url) {
				return fail(402, {
					error: 'Failed to upload image'
				});
			}

			const payload: InsertImage = {
				url,
				alt,
				width,
				height
			};

			await routing.image.update({ id, payload });

			return {
				success: true,
				message: 'Image updated'
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
				message: 'Image deleted'
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
