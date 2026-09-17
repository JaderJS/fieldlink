import { randomUUIDv7 } from "bun";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("orders", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => randomUUIDv7()),
});
