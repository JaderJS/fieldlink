import {
	bigserial,
	boolean,
	integer,
	jsonb,
	pgTable,
	primaryKey,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { user } from "../auth/tables";
import { customers } from "../customers/table";
import { products } from "../products/table";

export const orders = pgTable("orders", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	description: text("description"),
	content: jsonb("content"),
	customerId: uuid("customer_id")
		.notNull()
		.references(() => customers.id),
	paid: boolean("paid").notNull(),
	total: integer("total").notNull(),
	createdById: uuid("created_by_id")
		.notNull()
		.references(() => user.id),
	updatedById: uuid("updated_by_id")
		.notNull()
		.references(() => user.id),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const works = pgTable("works", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	orderId: uuid("order_id")
		.notNull()
		.references(() => orders.id, { onDelete: "cascade" }),
	order: integer("order").notNull(),
	total: integer("total").notNull(),
	content: jsonb("content"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.$onUpdate(() => new Date()),
});

export const worksToItems = pgTable(
	"works_to_items",
	{
		id: bigserial("id", { mode: "number" }).primaryKey(),
		workId: uuid("work_id")
			.notNull()
			.references(() => works.id),
		productId: uuid("product_id")
			.notNull()
			.references(() => products.id),
		name: text("name").notNull(),
		description: text("description"),
		quantity: integer("quantity").notNull(),
		value: integer("value").notNull(),
	},
	(t) => [primaryKey({ columns: [t.workId, t.productId] })],
);

export const sells = pgTable("sells", {
	id: uuid("id").primaryKey().defaultRandom(),
	orderId: uuid("order_id")
		.notNull()
		.references(() => orders.id),
});
