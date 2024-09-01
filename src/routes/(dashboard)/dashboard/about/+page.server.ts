import { db } from '$lib/server/db';
import { authors } from '$lib/server/schema';
import { supabase } from '$lib/supabaseClient';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';

export const actions = {
	default: async (event) => {
		const d = await event.request.formData();

		const image = d.get('profileImage');

		const { data, error } = await supabase.storage
			.from('images')
			.upload(`profile-photo-${crypto.randomUUID()}`, image, {
				cacheControl: '3600',
				upsert: false
			});

		if (error) {
			console.log({ error });
			return;
		}

		const {
			data: { publicUrl: photoUrl }
		} = supabase.storage.from('images').getPublicUrl(data.path);

		await db.update(authors).set({ photoUrl }).where(eq(authors.id, 1));
	}
} satisfies Actions;
