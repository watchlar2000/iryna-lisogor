import { routing } from '$lib/api';
import { db } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import { imagesStorage } from '$lib/server/supabase';
import type { AuthorPayload } from '$lib/types/authors';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const load = async () => {
	const data = await withErrorHandling(() => routing.author.read());

	return { author: data };
};

export const actions = {
	about: async ({ request }) => {
		const payload: Partial<AuthorPayload> = {};

		try {
			const fd = await request.formData();
			const { photoFile, prevPhotoUrl, about } = Object.fromEntries(fd);

			if (photoFile) {
				const name = `profile-photo-${crypto.randomUUID()}`;
				const { data } = await imagesStorage.post({ file: photoFile, name });

				console.log({ data });

				const oldProfileImageName = prevPhotoUrl
					? prevPhotoUrl.toString().split('/').pop() || ''
					: '';
				await imagesStorage.delete({ name: oldProfileImageName });
				payload.photoUrl = data.publicUrl ?? '';
			}

			if (about) {
				payload.about = about.toString();
			}

			await db.update(authors).set(payload).where(eq(authors.id, 1));
		} catch (err) {
			throw error(400, err.message);
		}
	}
} satisfies Actions;
