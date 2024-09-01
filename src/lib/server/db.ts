import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export const sql = postgres(DATABASE_URL, { prepare: false });
export const db = drizzle(sql, { schema });
