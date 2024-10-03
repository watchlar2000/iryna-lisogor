import { routing } from '$lib/api';
import { db } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import { imagesStorage } from '$lib/server/supabase';
import type { AuthorPayload } from '$lib/types/authors';
import { eq } from 'drizzle-orm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const author = await routing.author.read();

	return { author };
};

export const actions = {
	about: async ({ request }) => {
		const fd = await request.formData();

		try {
			const payload: Partial<AuthorPayload> = {};
			const { photoFile: image, prevPhotoUrl, about } = Object.fromEntries(fd);

			if (image) {
				const imageName = `profile-photo-${crypto.randomUUID()}`;
				const { publicUrl } = await imagesStorage.post({ image, imageName });
				const oldProfileImageName = prevPhotoUrl
					? prevPhotoUrl.toString().split('/').pop() || ''
					: '';
				await imagesStorage.delete({ imageName: oldProfileImageName });
				payload.photoUrl = publicUrl ?? '';
			}

			if (about) {
				payload.about = about.toString();
			}

			await db.update(authors).set(payload).where(eq(authors.id, 1));
		} catch (error) {
			console.log(error);
		}
	}
} satisfies Actions;
