import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: '.env' });

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	}
});
