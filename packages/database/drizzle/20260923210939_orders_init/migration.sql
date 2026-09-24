CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" text,
	"content" jsonb,
	"customer_id" uuid NOT NULL,
	"paid" boolean NOT NULL,
	"total" integer NOT NULL,
	"created_by_id" uuid NOT NULL,
	"updated_by_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sells" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"order_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "works" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"order_id" uuid NOT NULL,
	"order" integer NOT NULL,
	"total" integer NOT NULL,
	"content" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "works_to_items" (
	"id" bigserial,
	"work_id" uuid,
	"product_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"value" integer NOT NULL,
	CONSTRAINT "works_to_items_pkey" PRIMARY KEY("work_id","product_id")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"imageUrl" text NOT NULL,
	"price" integer NOT NULL,
	"cost" integer NOT NULL,
	"margin" integer DEFAULT 1,
	"version" integer NOT NULL,
	"created_by_id" uuid NOT NULL,
	"updated_by_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_created_by_id_users_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_updated_by_id_users_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "sells" ADD CONSTRAINT "sells_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id");--> statement-breakpoint
ALTER TABLE "works" ADD CONSTRAINT "works_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id");--> statement-breakpoint
ALTER TABLE "works_to_items" ADD CONSTRAINT "works_to_items_work_id_works_id_fkey" FOREIGN KEY ("work_id") REFERENCES "works"("id");--> statement-breakpoint
ALTER TABLE "works_to_items" ADD CONSTRAINT "works_to_items_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_created_by_id_users_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_updated_by_id_users_id_fkey" FOREIGN KEY ("updated_by_id") REFERENCES "users"("id");