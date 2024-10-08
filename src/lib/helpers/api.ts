import type { ProjectWithImages } from '$lib/types/projects';
import type { Row } from 'postgres';

export const mapRowsToProjectsWithImages = (rows: Row[]): ProjectWithImages[] => {
	if (rows.length === 0) return [];

	const data = rows.reduce<Record<number, ProjectWithImages>>((acc, row) => {
		const { projects, images } = row;
		const projectId = projects.id;

		if (!acc[projectId]) {
			acc[projectId] = {
				...projects,
				images: []
			};
		}

		if (images) {
			acc[projectId].images.push(images);
		}

		return acc;
	}, {});

	return Object.values(data);
};
