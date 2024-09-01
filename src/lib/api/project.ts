import { db } from '$lib/server';
import { projects } from '$lib/server/schema';
import { and, eq, type InferSelectModel } from 'drizzle-orm';

interface GetProjectParams {
	id?: number;
	work?: string;
	slug?: string;
}

export type ProjectType = InferSelectModel<typeof projects>;

export interface ProjectAPI {
	get(params: GetProjectParams): Promise<ProjectType | ProjectType[] | undefined>;
}

export default {
	get(params: GetProjectParams = {}): Promise<ProjectType | ProjectType[] | undefined> {
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
