CREATE TYPE "storage_objects_status" AS ENUM('PENDING', 'FAILED', 'ACTIVE', 'DELETED_PENDING', 'DELETED');--> statement-breakpoint
CREATE TABLE "storage_attachments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"storage_object_id" uuid NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "storage_objects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"object_key" text NOT NULL,
	"original_name" text NOT NULL,
	"content_type" text NOT NULL,
	"size" bigint NOT NULL,
	"expect_size" bigint NOT NULL,
	"status" "storage_objects_status" DEFAULT 'PENDING'::"storage_objects_status",
	"is_locked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "storage_objects_object_key_index" ON "storage_objects" ("object_key");--> statement-breakpoint
CREATE INDEX "storage_objects_status_idx" ON "storage_objects" ("status");--> statement-breakpoint
ALTER TABLE "storage_attachments" ADD CONSTRAINT "storage_attachments_storage_object_id_storage_objects_id_fkey" FOREIGN KEY ("storage_object_id") REFERENCES "storage_objects"("id");