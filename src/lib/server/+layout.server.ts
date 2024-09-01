// import { db } from '$lib/server/db';
// import { projects } from '$lib/server/schema.js';
// import { and, eq } from 'drizzle-orm';

// export async function load({ params }) {
// 	const { work: workSlug, slug } = params;

// 	const projectsData = await db.query.projects.findMany({
// 		where: and(
// 			workSlug ? eq(projects.work, workSlug) : undefined,
// 			slug ? eq(projects.slug, slug) : undefined
// 		),
// 		with: {
// 			images: true
// 		}
// 	});

// 	console.log(projectsData);

// 	return {
// 		projects: projectsData
// 	};
// }
