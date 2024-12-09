import { PRIVATE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import type { FileObject } from '@supabase/storage-js';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(PUBLIC_SUPABASE_URL, PRIVATE_SERVICE_ROLE_KEY);

const query = (bucketName: string) => {
	return supabase.storage.from(bucketName);
};

interface Storage {
	post: (params: { file: FormDataEntryValue; name: string }) => Promise<{
		data: {
			path: string;
			id: string;
			fullPath: string;
			publicUrl: string | undefined;
		};
	}>;
	delete: (params: { name: string }) => Promise<{
		data: FileObject[] | null;
	}>;
}

const storage = (bucketName: string): Storage => ({
	async post({ file, name }) {
		const { data, error } = await query(bucketName).upload(name, file);

		if (error)
			throw new BaseError({
				status: HTTP_STATUS.BAD_REQUEST,
				message: 'Something went wrong uploading a file'
			});

		const imagePath = data.path;
		const publicUrl = query(bucketName).getPublicUrl(imagePath).data.publicUrl;

		return { data: { ...data, publicUrl } };
	},
	async delete({ name }) {
		const { data, error } = await query(bucketName).remove([name]);

		if (error)
			throw new BaseError({
				status: HTTP_STATUS.BAD_REQUEST,
				message: `Something went wrong deleting the file ${name}`
			});

		return { data };
	}
});

export const imagesStorage = storage('images');
