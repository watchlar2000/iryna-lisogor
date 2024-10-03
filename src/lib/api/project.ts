import { mapRowsToProjectsWithImages } from '$lib/helper/api';
import { api } from '$lib/server/db';
import { images, projects } from '$lib/server/schema';
import type { ProjectReadParam, ProjectWithImages, Row } from '$lib/types/projects';
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
		const read = projectApi.read;

		if (id) {
			const query = read({ id }).$dynamic();
			const rows = (await withImages(query)) as Row[];
			return mapRowsToProjectsWithImages(rows);
		}

		const where: SQL[] = [];

		if (work) where.push(eq(projects.work, work));
		if (slug) where.push(eq(projects.slug, slug));

		const query = read({ where }).$dynamic();
		const rows = (await withImages(query)) as Row[];
		return mapRowsToProjectsWithImages(rows);
	}
};
