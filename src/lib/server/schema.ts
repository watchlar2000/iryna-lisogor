import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

const timestamps = {
	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.$onUpdate(() => new Date())
};

export const authors = pgTable('authors', {
	id: serial('id').primaryKey(),
	name: varchar('name'),
	surname: varchar('surname'),
	photoUrl: varchar('photo_url'),
	about: text('about'),
	...timestamps
});

export const works = pgTable('works', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	slug: varchar('slug').notNull()
});

// export const worksRelations = relations(works, ({ many }) => ({
// 	projects: many(projects)
// }));

export const projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	title: varchar('title').notNull(),
	slug: varchar('slug').notNull(),
	description: varchar('description'),
	work: varchar('work'),
	...timestamps
});

export const projectsRelations = relations(projects, ({ many }) => ({
	images: many(images)
}));

export const images = pgTable('images', {
	id: serial('id').primaryKey(),
	url: varchar('url').notNull(),
	alt: varchar('alt').notNull(),
	projectId: integer('project_id').references(() => projects.id, { onDelete: 'cascade' }),
	isCoverImage: boolean('is_cover_image').default(false).notNull(),
	...timestamps
});

export const imagesRelations = relations(images, ({ one }) => ({
	project: one(projects, {
		fields: [images.projectId],
		references: [projects.id]
	})
}));

export type InsertAuthor = typeof authors.$inferInsert;
export type SelectAuthor = typeof authors.$inferSelect;

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;

export type InsertImage = typeof images.$inferInsert;
export type SelectImage = typeof images.$inferSelect;
