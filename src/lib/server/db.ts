import { DATABASE_URL } from '$env/static/private';
import { and, Column, eq, SQL, Table } from 'drizzle-orm';
import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema.ts';

export type DatabaseType = PostgresJsDatabase<typeof schema>;

const sql = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle(sql, { schema });

type ReadParam = {
	id: number;
	where: SQL[];
};

type TableWithId = {
	id: Column;
};

export const api = (table: Table & TableWithId) => ({
	read({ id, where }: Partial<ReadParam> = {}) {
		const filters = [];

		if (id) filters.push(eq(table.id, id));

		if (where) filters.push(...where);

		return db
			.select()
			.from(table)
			.where(and(...filters));
	}
});
