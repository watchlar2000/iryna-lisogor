import {
	boolean,
	integer,
	pgTable,
	serial,
	text,
	timestamp,
	varchar
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const author = pgTable('author', {
	id: serial('id').primaryKey(),
	name: varchar('name'),
	surname: varchar('surname'),
	photoUrl: varchar('photo_url'),
	about: text('about')
});

export const works = pgTable('works', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	slug: varchar('slug').notNull()
});

export const worksRelations = relations(works, ({ many }) => ({
	projects: many(projects)
}));

export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	description: varchar('description'),
	workId: integer('work_type_id').notNull().references(() => works.id),
	coverImageId: integer('title_image_id').notNull().references(() => images.id),
	createdAt: timestamp('created_at').defaultNow()
});

export const projectsRelations = relations(projects, ({ one, many }) => ({
	work: one(works, {
		fields: [projects.workId],
		references: [works.id]
	}),
	coverImage: one(projectCoverImages, {
		fields: [projects.coverImageId],
		references: [projectCoverImages.id]
	}),
	images: many(images)
}));

export const images = pgTable('images', {
	id: serial('id').primaryKey(),
	url: varchar('url').notNull(),
	alt: varchar('alt').notNull(),
	projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }),
	isVisible: boolean('is_visible').default(true).notNull(),
	createdAt: timestamp('created_at').defaultNow()
});

export const imagesRelations = relations(images, ({ one }) => ({
	project: one(projects, {
		fields: [images.projectId],
		references: [projects.id]
	})
}));

export const projectCoverImages = pgTable('projectCoverImages', {
	id: serial('id').primaryKey(),
	url: varchar('url').notNull(),
	alt: varchar('alt').notNull(),
	projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }),
	createdAt: timestamp('created_at').defaultNow()
});

export const projectCoverImagesRelations = relations(projectCoverImages, ({ one }) => ({
	project: one(projects, {
		fields: [projectCoverImages.projectId],
		references: [projects.id]
	})
}));