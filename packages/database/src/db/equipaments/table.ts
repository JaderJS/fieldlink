import {
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { customers } from "../customers/table";

export const equipmentStatusEnum = pgEnum("equipment_status", [
	"ACTIVE",
	"MAINTENANCE",
	"INACTIVE",
	"RETIRED",
]);

/* -------------------------------------------------------------------------- */
/* Equipment Models                                                           */
/* -------------------------------------------------------------------------- */
export const equipmentModels = pgTable(
	"equipment_models",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		manufacturer: text("manufacturer").notNull(),

		model: text("model").notNull(),

		description: text("description"),

		createdAt: timestamp("created_at").notNull().defaultNow(),
	},

	(table) => [
		uniqueIndex("equipment_models_manufacturer_model_unique").on(
			table.manufacturer,
			table.model,
		),
	],
);

/* -------------------------------------------------------------------------- */
/* Equipment                                                                  */
/* -------------------------------------------------------------------------- */
export const equipments = pgTable(
	"equipments",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		customerId: uuid("customer_id")
			.notNull()
			.references(() => customers.id),

		modelId: uuid("model_id")
			.notNull()
			.references(() => equipmentModels.id),

		sn: text("serial_number").notNull(),

		assetNumber: text("asset_number"),

		status: equipmentStatusEnum().default("ACTIVE"),

		notes: text("notes"),

		createdBy: uuid("created_by").notNull(),

		updatedBy: uuid("updated_by").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),

		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [
		index("equipments_customer_idx").on(table.customerId),
		uniqueIndex("equipment_customer_serial_unique").on(
			table.customerId,
			table.sn,
		),

		uniqueIndex("equipment_customer_asset_unique").on(
			table.customerId,
			table.assetNumber,
		),
	],
);
