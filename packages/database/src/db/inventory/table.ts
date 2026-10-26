import { sql } from "drizzle-orm";
import {
	check,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const inventoryLevels = pgTable(
	"inventory_levels",
	{
		warehouseId: text("warehouse_id").notNull(),
		sku: text("sku").notNull(),
		quantity: integer("quantity").notNull().default(0),
		version: integer("version").notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		primaryKey({ columns: [t.warehouseId, t.sku] }),
		check("inventory_levels_quantity_non_negative", sql`${t.quantity} >=0`),
	],
);
