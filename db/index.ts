import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { DATABASE_URL } from '@/constants/env_var';

const sql = neon(DATABASE_URL);
const db = drizzle(sql, {
	schema,
});

export default db;
