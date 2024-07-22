import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server';
import { works } from '$lib/server/schema';

export const load: LayoutServerLoad = async ({
	locals: { session },
	cookies
}) => {
	const data = await db.select().from(works);

	console.log(data);

	return {
		session,
		cookies: cookies.getAll()
	};

};

// import { db } from '$lib/server/db';
// import { works } from '$lib/server/schema';
//
// function convertToSlug(text) {
// 	return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
// }
//
// export async function load() {
// 	const worksData = await db.select().from(works);
// 	const mappedWorksData = worksData.map(work => ({
// 		...work,
// 		slug: convertToSlug(work.title)
// 	}));
//
// 	// const projectsData = await db
// 	// 	.select()
// 	// 	.from(projects)
// 	// 	.leftJoin(images, eq(projects.id, images.projectId));
//
// 	const projectsData = await db.query.projects.findMany({
// 		with: {
// 			images: true
// 		}
// 	});
//
// 	return {
// 		works: mappedWorksData ?? [],
// 		projects: projectsData ?? []
// 	};
// }