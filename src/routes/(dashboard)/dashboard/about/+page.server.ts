import { routing } from '$lib/api';
import { imagesStorage } from '$lib/server/supabase';
import type { AuthorPayload } from '$lib/types/authors';
import { getReadableDate } from '$lib/utils/date';
import { withErrorHandling } from '$lib/utils/withErrorHandling';
import { fail } from '@sveltejs/kit';
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
			const { photoFile, previousPhotoUrl, updatedPhotoUrl, about, authorId } =
				Object.fromEntries(fd);

			if (updatedPhotoUrl !== previousPhotoUrl && photoFile) {
				const name = `profile-photo-${crypto.randomUUID()}`;
				const { data } = await imagesStorage.post({ file: photoFile, name });

				if (!data) {
					return fail(402, {
						error: 'Failed to upload photo'
					});
				}

				const oldProfileImageName = previousPhotoUrl.toString().split('/').pop();
				await imagesStorage.delete({ name: oldProfileImageName as string });
				payload.photoUrl = data.publicUrl;
			}

			if (about) {
				payload.about = about.toString();
			}

			await routing.author.update({ id: +authorId, payload });

			return {
				success: true
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
	}
} satisfies Actions;
