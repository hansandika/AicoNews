import { drizzle } from 'drizzle-orm/neon-http';
import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '@/constants/env_var';

const sql = neon(DATABASE_URL);

const db = drizzle(sql);

const main = async () => {
	try {
		await migrate(db, {
			migrationsFolder: 'db/migrations',
		});

		console.log('Migration successful');
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

main();