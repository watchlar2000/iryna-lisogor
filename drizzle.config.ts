import { defineConfig } from 'drizzle-kit';
// import { DATABASE_URL } from '$env/static/private';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});