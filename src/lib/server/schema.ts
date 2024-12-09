import { relations } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';
import { pgEnum, pgTable as table } from 'drizzle-orm/pg-core';
import { enumToPgEnum } from '../utils/enumToPgEnum';
import { generateUniqueString } from '../utils/generateUniqueString';

const timestamps = {
	createdAt: t.timestamp('created_at').notNull().defaultNow(),
	updatedAt: t
		.timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date())
};

export enum WorkType {
	BACKGROUND_PAINTING = 'background-painting',
	VISUAL_DEVELOPMENT = 'visual-development',
	PLAYGROUND = 'playground'
}

export const workTypesEnum = pgEnum('work_type', enumToPgEnum(WorkType));

export const authors = table('authors', {
	id: t.serial('id').primaryKey(),
	name: t.varchar('name').notNull(),
	surname: t.varchar('surname'),
	photoUrl: t.varchar('photo_url'),
	about: t.text('about'),
	...timestamps
});

export const projects = table('projects', {
	id: t.serial('id').primaryKey(),
	title: t.varchar('title').notNull(),
	slug: t
		.varchar('slug')
		.$default(() => generateUniqueString(16))
		.unique(),
	description: t.varchar('description'),
	workType: workTypesEnum('work_type'),
	coverImageId: t.integer('cover_image_id').references(() => images.id),
	...timestamps
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
	coverImage: one(images, {
		fields: [projects.coverImageId],
		references: [images.id]
	}),
	images: many(projectsToImages)
}));

export const images = table('images', {
	id: t.serial('id').primaryKey(),
	url: t.varchar('url').notNull(),
	alt: t.varchar('alt').notNull(),
	width: t.integer('width').notNull(),
	height: t.integer('height').notNull(),
	...timestamps
});

export const imagesRelations = relations(images, ({ many }) => ({
	projects: many(projectsToImages)
}));

export const projectsToImages = table('projects_to_images', {
	projectId: t
		.integer('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
	imageId: t
		.integer('image_id')
		.notNull()
		.references(() => images.id, { onDelete: 'cascade' })
});

export const projectsToImagesRelations = relations(projectsToImages, ({ one }) => ({
	project: one(projects, {
		fields: [projectsToImages.projectId],
		references: [projects.id]
	}),
	image: one(images, {
		fields: [projectsToImages.imageId],
		references: [images.id]
	})
}));

// export type InsertAuthor = typeof authors.$inferInsert;
// export type SelectAuthor = typeof authors.$inferSelect;

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;

export type SelectProjectsToImages = typeof projectsToImages.$inferSelect;
// export type InsertProjectsToImages = typeof projectsToImages.$inferInsert;
