import type { authors, images, projects, works } from '$lib/server/schema.ts';
import { type InferSelectModel } from 'drizzle-orm';

export const WorkOption = {
	visualDevelopment: 'visual development',
	backgroundPainting: 'background painting'
} as const;

// type WorkOptionType = typeof WorkOption.visualDevelopment | typeof WorkOption.backgroundPainting;

// export interface WorkMenuItem {
// 	title: WorkOptionType;
// 	slug: string;
// }

// export type WorkMenuItem = Pick<Work, 'slug' | 'title'>;

export type Image = InferSelectModel<typeof images>;
export type Author = InferSelectModel<typeof authors>;
export type Project = InferSelectModel<typeof projects>;
export type Work = InferSelectModel<typeof works>;

// export type Database<T extends DrizzleD1Database> = T;
