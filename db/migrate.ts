import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "db/migrations",
    });

    console.log("Migration successful");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();