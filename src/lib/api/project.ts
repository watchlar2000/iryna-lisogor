import { db } from '$lib/server';
import { projects } from '$lib/server/schema';
import type { Project } from '$lib/types/index.ts';
import { and, eq } from 'drizzle-orm';

interface GetProjectParams {
	id?: number;
	work?: string;
	slug?: string;
}

export interface ProjectAPI {
	get(params: GetProjectParams): Promise<Project | Project[] | undefined>;
}

export default {
	get(params: GetProjectParams = {}): Promise<Project | Project[] | undefined> {
		const { id, work, slug } = params;

		if (id) {
			return db.query.projects.findMany({
				where: (projects, { eq }) => eq(projects.id, id)
			});
		}

		const whereCondition = and(
			work ? eq(projects.work, work) : undefined,
			slug ? eq(projects.slug, slug) : undefined
		);

		return db.query.projects.findMany({
			where: whereCondition,
			with: {
				images: true
			}
		});
	}
} as ProjectAPI;
