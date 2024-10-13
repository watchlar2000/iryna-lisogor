import { routing } from '$lib/api';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const { project, work } = routing;
	// const projects = await project.read();
	// const works = await work.read();

	const [projects, works] = await Promise.all([project.read(), work.read()]);

	return { projects, works };
};
