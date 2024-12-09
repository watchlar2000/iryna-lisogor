import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import { db } from '$lib/server/db';
import { projects } from '$lib/server/schema';
import type { ProjectReadParam, ProjectWithImages } from '$lib/types/projects';
import { eq, SQL } from 'drizzle-orm';

type SQLCondition = SQL | ReturnType<typeof eq>;

export interface ProjectAPI {
	read(params?: ProjectReadParam): Promise<ProjectWithImages[]>;
}

export const project = {
	async read(params: ProjectReadParam = {}) {
		let whereCondition: SQLCondition | undefined;
		const [key, value] = Object.entries(params)[0] || [];

		if (key && value) {
			const columnMap: Record<string, any> = {
				id: projects.id,
				workType: projects.workType,
				slug: projects.slug
			};

			whereCondition = eq(columnMap[key], value);
		}

		const rows = await db.query.projects.findMany({
			where: whereCondition,
			with: {
				images: {
					with: {
						image: true
					}
				},
				coverImage: true
			}
		});

		if (!rows.length)
			throw new BaseError({
				status: HTTP_STATUS.NOT_FOUND,
				message: 'No project data found'
			});

		return rows;
	}
};
