import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import { db } from '$lib/server/db';
import { images, type InsertImage } from '$lib/server/schema';
import { asc, desc, eq } from 'drizzle-orm';

export const image = {
	async read() {
		const rows = await db.query.images.findMany({ orderBy: [desc(images.updatedAt)] });

		if (!rows.length)
			throw new BaseError({
				status: HTTP_STATUS.NOT_FOUND,
				message: 'No image data found'
			});

		return rows;
	},
	async create({ payload }: { payload: InsertImage }) {
		const rows = await db
			.insert(images)
			.values({ ...payload })
			.returning();

		if (!rows.length)
			throw new BaseError({
				status: HTTP_STATUS.BAD_REQUEST,
				message: 'Something went wrong uploading the image'
			});

		return rows;
	},
	async delete({ id }: { id: number }) {
		if (!id)
			throw new BaseError({
				status: HTTP_STATUS.BAD_REQUEST,
				message: 'No image id provided'
			});

		const rows = await db.delete(images).where(eq(images.id, id)).returning();

		if (!rows)
			throw new BaseError({
				status: HTTP_STATUS.NOT_FOUND,
				message: 'Something went wrong deleting the image'
			});

		return rows;
	}
};
