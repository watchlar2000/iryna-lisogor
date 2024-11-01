import { HTTP_STATUS } from '$lib/constants/HttpStatusCode';
import { BaseError } from '$lib/errors/BaseError';
import { mapRowsToProjectsWithImages } from '$lib/helpers/api';
import { api } from '$lib/server/db';
import { images, projects } from '$lib/server/schema';
import type { ProjectReadParam, ProjectWithImages } from '$lib/types/projects';
import { error } from '@sveltejs/kit';
import { eq, SQL } from 'drizzle-orm';
import type { PgSelect } from 'drizzle-orm/pg-core';

const projectApi = api(projects);

export interface ProjectAPI {
	read(params?: ProjectReadParam): Promise<ProjectWithImages[]>;
}

const withImages = <T extends PgSelect>(qb: T) => {
	return qb.leftJoin(images, eq(projects.id, images.projectId));
};

export const project: ProjectAPI = {
	async read(params) {
		const { id, work, slug } = params ?? {};
		const idParam = id ? { id } : {};
		const where: SQL[] = [];

		if (work) where.push(eq(projects.work, work));
		if (slug) where.push(eq(projects.slug, slug));

		const query = projectApi.read({ where, ...idParam }).$dynamic();
		const rows = await withImages(query);

		if (!rows.length)
			throw new BaseError({
				status: HTTP_STATUS.NOT_FOUND,
				message: 'No project data found'
			});

		return mapRowsToProjectsWithImages(rows);
	}
};
