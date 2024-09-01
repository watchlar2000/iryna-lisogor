import type { images } from '$lib/server/schema';
import { type InferSelectModel } from 'drizzle-orm';

export const WorkOption = {
	visualDevelopment: 'visual development',
	backgroundPainting: 'background painting'
} as const;

export type WorkType = typeof WorkOption.visualDevelopment | typeof WorkOption.backgroundPainting;

export interface WorkMenuItem {
	title: WorkType;
	slug: string;
}

export type Image = InferSelectModel<typeof images>;
