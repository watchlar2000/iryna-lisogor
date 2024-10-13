import { PRIVATE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SERVICE_ROLE);

const query = (bucketName: string) => {
	return supabase.storage.from(bucketName);
};

const storage = (
	bucketName: string
): {
	post: (params: { image: any; imageName: string }) => Promise<{ publicUrl: string | null }>;
	delete: (params: { imageName: string }) => any;
} => ({
	async post({ image, imageName }) {
		const { data } = await query(bucketName).upload(imageName, image, {
			upsert: false
		});
		const imagePath = data?.path;
		const publicUrl = imagePath ? query(bucketName).getPublicUrl(imagePath).data.publicUrl : null;
		return { publicUrl };
	},
	delete({ imageName }) {
		return query(bucketName).remove([imageName]);
	}
});

export const imagesStorage = storage('images');
