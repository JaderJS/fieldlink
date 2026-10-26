CREATE TABLE "inventory_levels" (
	"warehouse_id" text,
	"sku" text,
	"quantity" integer DEFAULT 0 NOT NULL,
	"version" integer NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "inventory_levels_pkey" PRIMARY KEY("warehouse_id","sku"),
	CONSTRAINT "inventory_levels_quantity_non_negative" CHECK ("quantity" >=0)
);
