CREATE TABLE "domain_events" (
	"position" bigserial PRIMARY KEY,
	"id" uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
	"stream_type" text NOT NULL,
	"steam_id" text NOT NULL,
	"version" integer NOT NULL,
	"type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"metadata" jsonb DEFAULT '{}' NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "events_stream_version_unique" ON "domain_events" ("stream_type","steam_id","version");--> statement-breakpoint
CREATE INDEX "events_type_idx" ON "domain_events" ("type");