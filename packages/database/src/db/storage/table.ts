import {
	bigint,
	boolean,
	index,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";

export const storageEntityTypes = [
	"station",
	"channel",
	"asset",
	"customer",
] as const;

export type StorageEntityType = (typeof storageEntityTypes)[number];

export const storageObjectStatusEnum = pgEnum("storage_objects_status", [
	"PENDING",
	"FAILED",
	"ACTIVE",
	"DELETED_PENDING",
	"DELETED",
]);

export const storageObjects = pgTable(
	"storage_objects",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		objectKey: text("object_key").notNull(),
		originalName: text("original_name").notNull(),
		contentType: text("content_type").notNull(),
		size: bigint("size", { mode: "number" }).notNull(),
		expectedSize: bigint("expect_size", { mode: "number" }).notNull(),
		status: storageObjectStatusEnum("status").default("PENDING"),
		isLocked: boolean("is_locked").default(false),
		bucket: text("bucket").notNull().default("assets"),
		isPrivate: boolean("is_private").default(false).notNull(),
		createdAt: timestamp("created_at").notNull().defaultNow(),
	},
	(table) => [
		uniqueIndex("storage_objects_object_key_index").on(table.objectKey),
		index("storage_objects_status_idx").on(table.status),
	],
);

export const storageAttachments = pgTable("storage_attachments", {
	id: uuid("id").primaryKey().defaultRandom(),
	storageObjectId: uuid("storage_object_id")
		.notNull()
		.references(() => storageObjects.id),
	entityType: text("entity_type").notNull(),
	entityId: uuid("entity_id").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});
