import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "../auth/tables";

export const products = pgTable("products", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	description: text("description"),
	quantity: integer("quantity").notNull(),
	imageUrl: text("imageUrl").notNull(),
	price: integer("price").notNull(),
	cost: integer("cost").notNull(),
	margin: integer("margin").default(1),
	version: integer("version").notNull(),
	createdById: uuid("created_by_id")
		.notNull()
		.references(() => user.id),
	updatedById: uuid("updated_by_id")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().$onUpdate(() =>  new Date()),
});
