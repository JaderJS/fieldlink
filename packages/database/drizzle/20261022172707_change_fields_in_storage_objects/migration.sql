ALTER TABLE "storage_objects" ADD COLUMN "bucket" text DEFAULT 'assets' NOT NULL;--> statement-breakpoint
ALTER TABLE "storage_objects" ADD COLUMN "is_private" boolean DEFAULT false NOT NULL;