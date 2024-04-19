import type { Config } from 'drizzle-kit';
import { DATABASE_URL } from './constants/env_var';

export default {
	schema: './db/schema.ts',
	out: './db/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: DATABASE_URL,
	},
} satisfies Config;