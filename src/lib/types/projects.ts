import { type Image, type Project } from './common';

export type ProjectWithImages = Project & {
	images: Image[];
};

export type ProjectReadParam =
	| { id: number; work?: never; slug?: never }
	| { work: string; id?: never; slug?: never }
	| { slug: string; id?: never; work?: never };

export type Row = {
	projects: Project;
	images: Image;
};
