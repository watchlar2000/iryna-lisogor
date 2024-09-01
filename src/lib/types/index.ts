import type { authors, images, projects } from '$lib/server/schema.ts';
import { type InferSelectModel } from 'drizzle-orm';

export const WorkOption = {
	visualDevelopment: 'visual development',
	backgroundPainting: 'background painting'
} as const;

export type Work = typeof WorkOption.visualDevelopment | typeof WorkOption.backgroundPainting;

export interface WorkMenuItem {
	title: Work;
	slug: string;
}

export type Image = InferSelectModel<typeof images>;
export type Author = InferSelectModel<typeof authors>;
export type Project = InferSelectModel<typeof projects>;
export type ProjectWithImages = Project & {
	images: Image[];
};
