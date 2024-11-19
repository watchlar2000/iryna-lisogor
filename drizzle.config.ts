import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env' });

const { DATABASE_URL } = process.env;

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: DATABASE_URL as string
	}
});
