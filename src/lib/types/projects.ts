import { WorkType, type SelectProjectsToImages } from '../server/schema';
import { type Image, type Project } from './common';

type ProjectImages = SelectProjectsToImages & {
	image: Image;
};

export type ProjectWithImages = Project & {
	coverImage?: Image;
	images: ProjectImages[];
};

type EmptyObj = Record<PropertyKey, never>;

export type ProjectReadParam =
	| EmptyObj
	| { id: number }
	| { workType: WorkType }
	| { slug: string };

// export type Row = {
// 	projects: Project;
// 	images: Image;
// };
