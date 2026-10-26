ALTER TABLE "channel_analogs" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "channel_digital" ADD COLUMN "updated_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "channel_groups" ALTER COLUMN "created_at" SET DATA TYPE timestamp USING "created_at"::timestamp;--> statement-breakpoint
ALTER TABLE "channel_groups" ALTER COLUMN "updated_at" SET DATA TYPE timestamp USING "updated_at"::timestamp;--> statement-breakpoint
ALTER TABLE "channels" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "stations" ALTER COLUMN "updated_at" DROP DEFAULT;