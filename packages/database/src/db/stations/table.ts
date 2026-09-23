import {
	boolean,
	index,
	integer,
	numeric,
	pgEnum,
	pgTable,
	primaryKey,
	smallint,
	text,
	timestamp,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core";
import { customers } from "../customers/table";
import { equipments } from "../equipaments/table";

export const channelModeEnum = pgEnum("channel_mode", ["ANALOG", "DIGITAL"]);

export const digitalProtocolEnum = pgEnum("digital_protocol", [
	"DMR",
	"P25",
	"DSTAR",
	"OTHER",
]);

export const analogSquelchModeEnum = pgEnum("analog_squelch_mode", [
	"CARRIER",
	"CTCSS",
	"DCS",
]);

/* -------------------------------------------------------------------------- */
/* Stations                                                                   */
/* -------------------------------------------------------------------------- */
export const stationModeEnum = pgEnum("station_mode", [
	"ANALOG",
	"DIGITAL",
	"MIXED",
]);

export const stations = pgTable(
	"stations",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		customerId: uuid("customer_id").notNull(),

		latitude: numeric("latitude", { precision: 10, scale: 7 }),

		longitude: numeric("longitude", { precision: 10, scale: 7 }),

		mode: stationModeEnum("mode").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),

		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [
		index("stations_customer_idx").on(table.customerId),
		index("stations_location_idx").on(table.latitude, table.longitude),
	],
);

/* -------------------------------------------------------------------------- */
/* Station Versions                                                           */
/* -------------------------------------------------------------------------- */
export const stationVersions = pgTable(
	"station_versions",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		stationId: uuid("station_id")
			.notNull()
			.references(() => stations.id),

		version: integer("version").notNull(),

		title: text("title").notNull(),

		latitude: numeric("latitude", { precision: 10, scale: 7 }),

		longitude: numeric("longitude", { precision: 10, scale: 7 }),

		mode: stationModeEnum("mode").notNull(),

		changedBy: uuid("changed_by").notNull(),

		changedAt: timestamp("changed_at", {
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),

		reason: text("reason"),
	},
	(table) => [
		uniqueIndex("station_versions_unique").on(table.stationId, table.version),

		index("station_versions_station_idx").on(table.stationId),
	],
);

/* -------------------------------------------------------------------------- */
/* Channels                                                                   */
/* -------------------------------------------------------------------------- */
export const channels = pgTable(
	"channels",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		customerId: uuid("customer_id")
			.notNull()
			.references(() => customers.id),

		title: text("title").notNull(),

		mode: channelModeEnum().notNull(),

		rx: integer("rx").notNull(),

		tx: integer("tx").notNull(),

		description: text("description"),

		createdBy: uuid("created_by").notNull(),

		updatedBy: uuid("updated_by").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),

		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},
	(table) => [
		index("channels_customer_idx").on(table.customerId),

		index("channels_frequency_idx").on(table.rx, table.tx),
	],
);

/* -------------------------------------------------------------------------- */
/* Digital Channel                                                            */
/* -------------------------------------------------------------------------- */
export const digitalChannels = pgTable("channel_digital", {
	channelId: uuid("channel_id")
		.primaryKey()
		.references(() => channels.id),

	protocol: digitalProtocolEnum().notNull().default("DMR"),

	colorCode: smallint("color_code").notNull(),

	slot: smallint().notNull(),

	talkgroupId: uuid("talkgroup_id").references(() => talkgroups.id),

	createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/* Analog Channel                                                             */
/* -------------------------------------------------------------------------- */
export const analogChannels = pgTable("channel_analogs", {
	channelId: uuid("channel_id")
		.primaryKey()
		.references(() => channels.id),

	squelchMode: analogSquelchModeEnum("squelch_mode")
		.notNull()
		.default("CARRIER"),

	txToneHz: numeric("tx_tone_hz", {
		precision: 6,
		scale: 2,
	}),

	rxToneHz: numeric("rx_tone_hz", {
		precision: 6,
		scale: 2,
	}),

	txDcsCode: integer("tx_dcs_code"),

	rxDcsCode: integer("rx_dcs_code"),

	createdAt: timestamp("created_at").notNull().defaultNow(),
});

/* -------------------------------------------------------------------------- */
/* Channel Groups                                                             */
/* -------------------------------------------------------------------------- */
export const channelGroups = pgTable(
	"channel_groups",
	{
		id: uuid().primaryKey().defaultRandom(),

		customerId: uuid("customer_id")
			.notNull()
			.references(() => customers.id),

		title: text().notNull(),

		description: text(),

		createdBy: uuid("created_by").notNull(),
		updatedBy: uuid("updated_by").notNull(),

		createdAt: timestamp("created_at", {
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),

		updatedAt: timestamp("updated_at", {
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),
	},

	(table) => [index("channel_groups_customer_idx").on(table.customerId)],
);

/* -------------------------------------------------------------------------- */
/* Talkgroups                                                                 */
/* -------------------------------------------------------------------------- */
export const talkgroupTypeEnum = pgEnum("talkgroup_type", [
	"GROUP",
	"PRIVATE",
	"ALL_CALL",
]);

export const talkgroups = pgTable(
	"talkgroups",
	{
		id: uuid("id").primaryKey().defaultRandom(),

		customerId: uuid("customer_id")
			.notNull()
			.references(() => customers.id),

		number: integer("number").notNull(),

		title: text("title").notNull(),

		type: talkgroupTypeEnum().notNull().default("GROUP"),

		description: text("description"),

		createdAt: timestamp("created_at").notNull().defaultNow(),

		updatedAt: timestamp("updated_at").notNull().defaultNow(),
	},

	(table) => [
		uniqueIndex("talkgroups_customer_number_unique").on(
			table.customerId,
			table.number,
		),
	],
);

/* -------------------------------------------------------------------------- */
/* Programming Profiles                                                       */
/* -------------------------------------------------------------------------- */
export const programmingStatusEnum = pgEnum("programming_status", [
	"DRAFT",
	"ACTIVE",
	"ARCHIVED",
]);

export const programmingProfiles = pgTable(
	"programming_profiles",
	{
		id: uuid().primaryKey().defaultRandom(),

		equipmentId: uuid("equipment_id")
			.notNull()
			.references(() => equipments.id),

		version: integer().notNull(),

		status: programmingStatusEnum("status").notNull().default("DRAFT"),

		description: text("description"),

		createdBy: uuid("created_by").notNull(),

		createdAt: timestamp("created_at").notNull().defaultNow(),

		activatedAt: timestamp("activated_at"),
	},

	(table) => [
		uniqueIndex("programming_profiles_equipment_version_unique").on(
			table.equipmentId,
			table.version,
		),

		index("programming_profiles_equipment_idx").on(table.equipmentId),
	],
);

/* -------------------------------------------------------------------------- */
/* Programming Channels                                                       */
/* -------------------------------------------------------------------------- */
export const programmingChannels = pgTable(
	"programming_channels",
	{
		profileId: uuid("profile_id")
			.notNull()
			.references(() => programmingProfiles.id),

		channelId: uuid("channel_id")
			.notNull()
			.references(() => channels.id),

		position: integer("position ").notNull(),

		alias: text("alias"),

		scanEnabled: boolean("scan_enabled").notNull().default(false),

		txPower: text("tx_power"),

		createdAt: timestamp("created_at").notNull().defaultNow(),
	},

	(table) => [
		primaryKey({
			columns: [table.profileId, table.channelId],
		}),

		index("programming_channels_channel_idx").on(table.channelId),
	],
);

/* -------------------------------------------------------------------------- */
/* Programming Groups                                                         */
/* -------------------------------------------------------------------------- */
export const programmingGroups = pgTable(
	"programming_groups",
	{
		profileId: uuid("profile_id")
			.notNull()
			.references(() => programmingProfiles.id),

		groupId: uuid("group_id")
			.notNull()
			.references(() => channelGroups.id),

		position: integer("position"),

		createdAt: timestamp("created_at").notNull().defaultNow(),
	},

	(table) => [
		primaryKey({
			columns: [table.profileId, table.groupId],
		}),
	],
);

/* -------------------------------------------------------------------------- */
/* Station <-> Channel                                                        */
/* -------------------------------------------------------------------------- */
export const stationChannels = pgTable(
	"station_channels",
	{
		stationId: uuid("station_id")
			.notNull()
			.references(() => stations.id),

		channelId: uuid("channel_id")
			.notNull()
			.references(() => channels.id),

		position: integer("position"),

		alias: text("alias"),

		enabled: boolean("enabled").notNull().default(true),

		createdAt: timestamp("created_at").notNull().defaultNow(),
	},

	(table) => [
		primaryKey({
			columns: [table.stationId, table.channelId],
		}),

		index("station_channels_channel_idx").on(table.channelId),
	],
);

/* -------------------------------------------------------------------------- */
/* Channel <-> Group                                                          */
/* -------------------------------------------------------------------------- */

export const channelGroupChannels = pgTable(
	"channel_group_channels",
	{
		groupId: uuid("group_id")
			.notNull()
			.references(() => channelGroups.id),

		channelId: uuid("channel_id")
			.notNull()
			.references(() => channels.id),

		position: integer(),

		createdAt: timestamp("created_at", {
			withTimezone: true,
		})
			.notNull()
			.defaultNow(),
	},

	(table) => [
		primaryKey({
			columns: [table.groupId, table.channelId],
		}),
	],
);
