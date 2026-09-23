CREATE TYPE "equipment_status" AS ENUM('ACTIVE', 'MAINTENANCE', 'INACTIVE', 'RETIRED');--> statement-breakpoint
CREATE TYPE "analog_squelch_mode" AS ENUM('CARRIER', 'CTCSS', 'DCS');--> statement-breakpoint
CREATE TYPE "channel_mode" AS ENUM('ANALOG', 'DIGITAL');--> statement-breakpoint
CREATE TYPE "digital_protocol" AS ENUM('DMR', 'P25', 'DSTAR', 'OTHER');--> statement-breakpoint
CREATE TYPE "programming_status" AS ENUM('DRAFT', 'ACTIVE', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "station_mode" AS ENUM('ANALOG', 'DIGITAL', 'MIXED');--> statement-breakpoint
CREATE TYPE "talkgroup_type" AS ENUM('GROUP', 'PRIVATE', 'ALL_CALL');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "customers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipment_models" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"manufacturer" text NOT NULL,
	"model" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "equipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"customer_id" uuid NOT NULL,
	"model_id" uuid NOT NULL,
	"serial_number" text NOT NULL,
	"asset_number" text,
	"status" "equipment_status" DEFAULT 'ACTIVE'::"equipment_status",
	"notes" text,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "channel_analogs" (
	"channel_id" uuid PRIMARY KEY,
	"squelch_mode" "analog_squelch_mode" DEFAULT 'CARRIER'::"analog_squelch_mode" NOT NULL,
	"tx_tone_hz" numeric(6,2),
	"rx_tone_hz" numeric(6,2),
	"tx_dcs_code" integer,
	"rx_dcs_code" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "channel_group_channels" (
	"group_id" uuid,
	"channel_id" uuid,
	"position" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "channel_group_channels_pkey" PRIMARY KEY("group_id","channel_id")
);
--> statement-breakpoint
CREATE TABLE "channel_groups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"customer_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "channels" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"customer_id" uuid NOT NULL,
	"title" text NOT NULL,
	"mode" "channel_mode" NOT NULL,
	"rx" integer NOT NULL,
	"tx" integer NOT NULL,
	"description" text,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "channel_digital" (
	"channel_id" uuid PRIMARY KEY,
	"protocol" "digital_protocol" DEFAULT 'DMR'::"digital_protocol" NOT NULL,
	"color_code" smallint NOT NULL,
	"slot" smallint NOT NULL,
	"talkgroup_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programming_channels" (
	"profile_id" uuid,
	"channel_id" uuid,
	"position " integer NOT NULL,
	"alias" text,
	"scan_enabled" boolean DEFAULT false NOT NULL,
	"tx_power" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "programming_channels_pkey" PRIMARY KEY("profile_id","channel_id")
);
--> statement-breakpoint
CREATE TABLE "programming_groups" (
	"profile_id" uuid,
	"group_id" uuid,
	"position" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "programming_groups_pkey" PRIMARY KEY("profile_id","group_id")
);
--> statement-breakpoint
CREATE TABLE "programming_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"equipment_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"status" "programming_status" DEFAULT 'DRAFT'::"programming_status" NOT NULL,
	"description" text,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"activated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "station_channels" (
	"station_id" uuid,
	"channel_id" uuid,
	"position" integer,
	"alias" text,
	"enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "station_channels_pkey" PRIMARY KEY("station_id","channel_id")
);
--> statement-breakpoint
CREATE TABLE "station_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"station_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"title" text NOT NULL,
	"latitude" numeric(10,7),
	"longitude" numeric(10,7),
	"mode" "station_mode" NOT NULL,
	"changed_by" uuid NOT NULL,
	"changed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"reason" text
);
--> statement-breakpoint
CREATE TABLE "stations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"customer_id" uuid NOT NULL,
	"latitude" numeric(10,7),
	"longitude" numeric(10,7),
	"mode" "station_mode" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "talkgroups" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"customer_id" uuid NOT NULL,
	"number" integer NOT NULL,
	"title" text NOT NULL,
	"type" "talkgroup_type" DEFAULT 'GROUP'::"talkgroup_type" NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "accounts" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verifications" ("identifier");--> statement-breakpoint
CREATE UNIQUE INDEX "equipment_models_manufacturer_model_unique" ON "equipment_models" ("manufacturer","model");--> statement-breakpoint
CREATE INDEX "equipments_customer_idx" ON "equipments" ("customer_id");--> statement-breakpoint
CREATE UNIQUE INDEX "equipment_customer_serial_unique" ON "equipments" ("customer_id","serial_number");--> statement-breakpoint
CREATE UNIQUE INDEX "equipment_customer_asset_unique" ON "equipments" ("customer_id","asset_number");--> statement-breakpoint
CREATE INDEX "channel_groups_customer_idx" ON "channel_groups" ("customer_id");--> statement-breakpoint
CREATE INDEX "channels_customer_idx" ON "channels" ("customer_id");--> statement-breakpoint
CREATE INDEX "channels_frequency_idx" ON "channels" ("rx","tx");--> statement-breakpoint
CREATE INDEX "programming_channels_channel_idx" ON "programming_channels" ("channel_id");--> statement-breakpoint
CREATE UNIQUE INDEX "programming_profiles_equipment_version_unique" ON "programming_profiles" ("equipment_id","version");--> statement-breakpoint
CREATE INDEX "programming_profiles_equipment_idx" ON "programming_profiles" ("equipment_id");--> statement-breakpoint
CREATE INDEX "station_channels_channel_idx" ON "station_channels" ("channel_id");--> statement-breakpoint
CREATE UNIQUE INDEX "station_versions_unique" ON "station_versions" ("station_id","version");--> statement-breakpoint
CREATE INDEX "station_versions_station_idx" ON "station_versions" ("station_id");--> statement-breakpoint
CREATE INDEX "stations_customer_idx" ON "stations" ("customer_id");--> statement-breakpoint
CREATE INDEX "stations_location_idx" ON "stations" ("latitude","longitude");--> statement-breakpoint
CREATE UNIQUE INDEX "talkgroups_customer_number_unique" ON "talkgroups" ("customer_id","number");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id");--> statement-breakpoint
ALTER TABLE "equipments" ADD CONSTRAINT "equipments_model_id_equipment_models_id_fkey" FOREIGN KEY ("model_id") REFERENCES "equipment_models"("id");--> statement-breakpoint
ALTER TABLE "channel_analogs" ADD CONSTRAINT "channel_analogs_channel_id_channels_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id");--> statement-breakpoint
ALTER TABLE "channel_group_channels" ADD CONSTRAINT "channel_group_channels_group_id_channel_groups_id_fkey" FOREIGN KEY ("group_id") REFERENCES "channel_groups"("id");--> statement-breakpoint
ALTER TABLE "channel_group_channels" ADD CONSTRAINT "channel_group_channels_channel_id_channels_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id");--> statement-breakpoint
ALTER TABLE "channel_groups" ADD CONSTRAINT "channel_groups_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id");--> statement-breakpoint
ALTER TABLE "channels" ADD CONSTRAINT "channels_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id");--> statement-breakpoint
ALTER TABLE "channel_digital" ADD CONSTRAINT "channel_digital_channel_id_channels_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id");--> statement-breakpoint
ALTER TABLE "channel_digital" ADD CONSTRAINT "channel_digital_talkgroup_id_talkgroups_id_fkey" FOREIGN KEY ("talkgroup_id") REFERENCES "talkgroups"("id");--> statement-breakpoint
ALTER TABLE "programming_channels" ADD CONSTRAINT "programming_channels_profile_id_programming_profiles_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "programming_profiles"("id");--> statement-breakpoint
ALTER TABLE "programming_channels" ADD CONSTRAINT "programming_channels_channel_id_channels_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id");--> statement-breakpoint
ALTER TABLE "programming_groups" ADD CONSTRAINT "programming_groups_profile_id_programming_profiles_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "programming_profiles"("id");--> statement-breakpoint
ALTER TABLE "programming_groups" ADD CONSTRAINT "programming_groups_group_id_channel_groups_id_fkey" FOREIGN KEY ("group_id") REFERENCES "channel_groups"("id");--> statement-breakpoint
ALTER TABLE "programming_profiles" ADD CONSTRAINT "programming_profiles_equipment_id_equipments_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id");--> statement-breakpoint
ALTER TABLE "station_channels" ADD CONSTRAINT "station_channels_station_id_stations_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id");--> statement-breakpoint
ALTER TABLE "station_channels" ADD CONSTRAINT "station_channels_channel_id_channels_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("id");--> statement-breakpoint
ALTER TABLE "station_versions" ADD CONSTRAINT "station_versions_station_id_stations_id_fkey" FOREIGN KEY ("station_id") REFERENCES "stations"("id");--> statement-breakpoint
ALTER TABLE "talkgroups" ADD CONSTRAINT "talkgroups_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id");