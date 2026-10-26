import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/index";
import { relations } from "./db/relations";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL!,
});

export { schema };

export const db = drizzle({ client: pool, relations: relations });

export { and, asc, desc, eq, gt, gte, ilike, lt, lte, or } from "drizzle-orm";
export type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
