import { db } from '$lib/server/db';
import { works } from '$lib/server/schema';

export async function load() {
	const worksData = await db.select().from(works);

	// const projectsData = await db
	// 	.select()
	// 	.from(projects)
	// 	.leftJoin(images, eq(projects.id, images.projectId));

	const projectsData = await db.query.projects.findMany({
		with: {
			images: true
		}
	});


	return {
		works: worksData ?? [],
		projects: projectsData ?? []
	};
}