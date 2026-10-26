import {
	bigserial,
	index,
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";

export const events = pgTable(
	"domain_events",
	{
		position: bigserial("position", { mode: "number" }).primaryKey(),
		id: uuid("id").notNull().unique().defaultRandom(),
		streamType: text("stream_type").notNull(),
		streamId: text("steam_id").notNull(),
		version: integer("version").notNull(),
		type: text("type").notNull(),
		payload: jsonb("payload").notNull(),
		metadata: jsonb("metadata")
			.$type<Record<string, unknown>>()
			.notNull()
			.default({}),
		occurredAt: timestamp("occurred_at", { withTimezone: true })
			.notNull()
			.defaultNow(),
	},
	(t) => [
		uniqueIndex("events_stream_version_unique").on(
			t.streamType,
			t.streamId,
			t.version,
		),
		index("events_type_idx").on(t.type),
	],
);
