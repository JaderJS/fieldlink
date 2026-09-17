-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE SCHEMA "base";
--> statement-breakpoint
CREATE SCHEMA "finance";
--> statement-breakpoint
CREATE TYPE "base"."OrderStatusType" AS ENUM('PROCESS', 'INIT', 'FINISHED');--> statement-breakpoint
CREATE TYPE "base"."ProductDiscountType" AS ENUM('NONE', 'PERCENT', 'AMOUNT');--> statement-breakpoint
CREATE TYPE "base"."Role" AS ENUM('USER', 'ADMIN', 'ROOT');--> statement-breakpoint
CREATE TYPE "base"."ServiceType" AS ENUM('STARTED', 'PENDING', 'FINISHED', 'DROPPED');--> statement-breakpoint
CREATE TYPE "base"."TypeAnalogSilent" AS ENUM('CSQ', 'TPL', 'DPL_N', 'DPL_I');--> statement-breakpoint
CREATE TYPE "base"."TypeProduct" AS ENUM('UND', 'm', 'L', 'g');--> statement-breakpoint
CREATE TYPE "base"."TypeTransaction" AS ENUM('INPUT', 'OUTPUT');--> statement-breakpoint
CREATE TYPE "Role" AS ENUM('USER', 'ADMIN', 'ROOT');--> statement-breakpoint
CREATE TYPE "TypeAnalogSilent" AS ENUM('CSQ', 'TPL', 'DPL_N', 'DPL_I');--> statement-breakpoint
CREATE TYPE "TypeTransaction" AS ENUM('INPUT', 'OUTPUT');--> statement-breakpoint
CREATE TYPE "UnityProduct" AS ENUM('und', 'm', 'l', 'g');--> statement-breakpoint
CREATE TYPE "DocStatus" AS ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED', 'REVIEW');--> statement-breakpoint
CREATE TYPE "DocType" AS ENUM('PAGE', 'DATABASE', 'TEMPLATE', 'BOARD', 'CALENDAR', 'GALLERY');--> statement-breakpoint
CREATE TYPE "DocVisibility" AS ENUM('PRIVATE', 'PUBLIC', 'WORKSPACE', 'SHARED');--> statement-breakpoint
CREATE TYPE "InstallmentStatus" AS ENUM('PENDING', 'PAID', 'PARTIAL', 'CANCELLED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "PaymentMethod" AS ENUM('CARD', 'PIX', 'BOLETO', 'TED', 'CASH', 'OTHER', 'NOT_DECLARED');--> statement-breakpoint
CREATE TYPE "OrderStatusFlag" AS ENUM('FINISHED', 'BUDGET', 'NOTHING');--> statement-breakpoint
CREATE TABLE "base"."_ArchivesToEquipment" (
	"A" text,
	"B" integer,
	CONSTRAINT "_ArchivesToEquipment_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_ArchivesToTransactions" (
	"A" text,
	"B" integer,
	CONSTRAINT "_ArchivesToTransactions_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_ArchivesToWork" (
	"A" text,
	"B" integer,
	CONSTRAINT "_ArchivesToWork_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_CartToOtherValues" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_CartToOtherValues_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_CategoryTransactionToTransactions" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_CategoryTransactionToTransactions_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_ChannelSchemaToEquipment" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_ChannelSchemaToEquipment_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_EquipmentToStation" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_EquipmentToStation_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_GroupToStation" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_GroupToStation_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_OrderToOtherValues" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_OrderToOtherValues_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."_OtherValuesToWork" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_OtherValuesToWork_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "base"."Archives" (
	"cuid" text PRIMARY KEY,
	"title" text NOT NULL,
	"size" text NOT NULL,
	"type" text NOT NULL,
	"path" text NOT NULL,
	"pathUrl" text NOT NULL,
	"createdCuid" text NOT NULL,
	"updatedCuid" text NOT NULL,
	"ownerCuid" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Bank" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"pix" text NOT NULL,
	"limitBankingMovements" double precision DEFAULT 0 NOT NULL,
	"limitBankingMovementsMonth" double precision DEFAULT 0 NOT NULL,
	"ownerCuid" text NOT NULL,
	"updatedBy" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Cart" (
	"id" serial PRIMARY KEY,
	"total" double precision NOT NULL,
	"status" "base"."OrderStatusType" NOT NULL,
	"assignedCuid" text NOT NULL,
	"supplierId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."CategoryTransaction" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."ChannelAnalogOnChannelSchema" (
	"channelSchemaId" integer,
	"stationId" integer,
	"order" integer NOT NULL,
	CONSTRAINT "ChannelAnalogOnChannelSchema_pkey" PRIMARY KEY("channelSchemaId","stationId")
);
--> statement-breakpoint
CREATE TABLE "base"."ChannelDigitalOnChannelSchema" (
	"channelSchemaId" integer,
	"stationId" integer,
	"groupId" integer,
	"slot" integer NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT "ChannelDigitalOnChannelSchema_pkey" PRIMARY KEY("channelSchemaId","stationId","groupId")
);
--> statement-breakpoint
CREATE TABLE "base"."ChannelSchema" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"content" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Client" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"property" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Company" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"cnpj" text NOT NULL,
	"ownerCuid" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Daily" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"ownerCuid" text NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Equipment" (
	"id" serial PRIMARY KEY,
	"nickname" text NOT NULL,
	"sn" text NOT NULL,
	"identifier" integer NOT NULL,
	"productId" integer NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."GoogleTokens" (
	"id" serial PRIMARY KEY,
	"tokens" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Group" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"identifier" integer NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Order" (
	"id" serial PRIMARY KEY,
	"status" "base"."OrderStatusType" NOT NULL,
	"total" double precision NOT NULL,
	"assignedCuid" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"clientId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."OtherValues" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"price" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."parentTransaction" (
	"id" serial PRIMARY KEY,
	"n" integer NOT NULL,
	"firstTransactionId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Period" (
	"id" serial PRIMARY KEY,
	"startTime" timestamp(3) NOT NULL,
	"endTime" timestamp(3) NOT NULL,
	"name" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Product" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"pictureUrl" text NOT NULL,
	"description" text,
	"price" double precision NOT NULL,
	"discountType" "base"."ProductDiscountType" NOT NULL,
	"discountValue" double precision DEFAULT 0 NOT NULL,
	"stock" integer NOT NULL,
	"CategoryId" integer NOT NULL,
	"unity" "base"."TypeProduct" NOT NULL,
	"priceFn" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createCuid" text NOT NULL,
	"updatedCuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."ProductCategory" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"tags" text[],
	"parentCategoryId" integer
);
--> statement-breakpoint
CREATE TABLE "base"."ProductPriceHistory" (
	"id" serial PRIMARY KEY,
	"productId" integer NOT NULL,
	"costValue" double precision NOT NULL,
	"saleValue" double precision NOT NULL,
	"createdCuid" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."ProductsOnCart" (
	"cartId" integer,
	"productId" integer,
	"quantity" integer NOT NULL,
	"price" double precision NOT NULL,
	CONSTRAINT "ProductsOnCart_pkey" PRIMARY KEY("cartId","productId")
);
--> statement-breakpoint
CREATE TABLE "base"."ProductsOnOrder" (
	"productId" integer,
	"orderId" integer,
	"quantity" integer NOT NULL,
	"price" double precision NOT NULL,
	CONSTRAINT "ProductsOnOrder_pkey" PRIMARY KEY("productId","orderId")
);
--> statement-breakpoint
CREATE TABLE "base"."Property" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"clientId" integer NOT NULL,
	"updateAt" timestamp(3) NOT NULL,
	"createAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Service" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"status" "base"."ServiceType" NOT NULL,
	"isActive" boolean DEFAULT true NOT NULL,
	"clientId" integer NOT NULL,
	"startTime" timestamp(3) NOT NULL,
	"endTime" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Station" (
	"id" serial PRIMARY KEY,
	"propertyId" integer NOT NULL,
	"content" text NOT NULL,
	"rx" double precision NOT NULL,
	"tx" double precision NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"updateAt" timestamp(3) NOT NULL,
	"createAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."StationAnalog" (
	"id" serial PRIMARY KEY,
	"stationId" integer NOT NULL,
	"silent" "base"."TypeAnalogSilent" NOT NULL,
	"encoder" double precision NOT NULL,
	"decoder" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."StationDigital" (
	"id" serial PRIMARY KEY,
	"stationId" integer NOT NULL,
	"slot" integer NOT NULL,
	"colorCode" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Supplier" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."TransactionGroup" (
	"id" serial PRIMARY KEY,
	"transactionId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Transactions" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"type" "base"."TypeTransaction" NOT NULL,
	"description" text,
	"isDelete" boolean DEFAULT false NOT NULL,
	"hasNfe" boolean DEFAULT false NOT NULL,
	"value" double precision NOT NULL,
	"billed" boolean DEFAULT false NOT NULL,
	"createCuid" text NOT NULL,
	"updatedCuid" text NOT NULL,
	"companyId" integer NOT NULL,
	"bankId" integer NOT NULL,
	"periodId" integer NOT NULL,
	"hasNotify" boolean DEFAULT false NOT NULL,
	"serviceId" integer,
	"cartId" integer,
	"orderId" integer,
	"eventId" text,
	"content" text DEFAULT '' NOT NULL,
	"fromAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"parentTransactionId" integer
);
--> statement-breakpoint
CREATE TABLE "base"."User" (
	"cuid" text PRIMARY KEY,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"nickname" text NOT NULL,
	"avatarUrl" text NOT NULL,
	"role" "base"."Role" NOT NULL,
	"password" text NOT NULL,
	"isEnable" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "base"."Work" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"startTime" timestamp(3) NOT NULL,
	"endTime" timestamp(3) NOT NULL,
	"serviceId" integer NOT NULL,
	"total" double precision NOT NULL,
	"orderId" integer
);
--> statement-breakpoint
CREATE TABLE "_ArchivesToEquipment" (
	"A" text,
	"B" integer,
	CONSTRAINT "_ArchivesToEquipment_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_ArchivesToInstallment" (
	"A" text,
	"B" integer,
	CONSTRAINT "_ArchivesToInstallment_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_ArchivesToTransactions" (
	"A" text,
	"B" integer,
	CONSTRAINT "_ArchivesToTransactions_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_CategoryProductToProduct" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_CategoryProductToProduct_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_CategoryTransactionToTransactions" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_CategoryTransactionToTransactions_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_ChannelSchemaToEquipment" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_ChannelSchemaToEquipment_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_EquipmentToStation" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_EquipmentToStation_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_GroupToStation" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_GroupToStation_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_SaleToWork" (
	"A" integer,
	"B" integer,
	CONSTRAINT "_SaleToWork_AB_pkey" PRIMARY KEY("A","B")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" text NOT NULL,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp(3),
	"refreshTokenExpiresAt" timestamp(3),
	"scope" text,
	"password" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Archives" (
	"cuid" text PRIMARY KEY,
	"pathUrl" text NOT NULL,
	"createdCuid" text NOT NULL,
	"ownerCuid" text NOT NULL,
	"path" text NOT NULL,
	"size" text NOT NULL,
	"type" text NOT NULL,
	"updatedCuid" text NOT NULL,
	"title" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Bank" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"pix" text NOT NULL,
	"limitBankingMovements" double precision DEFAULT 0 NOT NULL,
	"limitBankingMovementsMonth" double precision DEFAULT 0 NOT NULL,
	"ownerCuid" text NOT NULL,
	"updatedBy" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Cart" (
	"id" serial PRIMARY KEY,
	"total" integer NOT NULL,
	"supplierId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"title" text NOT NULL,
	"otherValues" jsonb[] DEFAULT ARRAY[]::jsonb[],
	"transactionId" integer NOT NULL,
	"content" jsonb
);
--> statement-breakpoint
CREATE TABLE "CategoryOrder" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CategoryProduct" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CategoryTransaction" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ChannelAnalogOnChannelSchema" (
	"channelSchemaId" integer PRIMARY KEY,
	"order" serial,
	"decoder" double precision NOT NULL,
	"encoder" double precision NOT NULL,
	"silent" "TypeAnalogSilent" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ChannelDigitalOnChannelSchema" (
	"channelSchemaId" integer,
	"groupId" integer,
	"order" serial,
	"slot" integer NOT NULL,
	"colorCode" integer NOT NULL,
	CONSTRAINT "ChannelDigitalOnChannelSchema_pkey" PRIMARY KEY("channelSchemaId","groupId")
);
--> statement-breakpoint
CREATE TABLE "ChannelSchema" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"stationId" integer NOT NULL,
	"content" jsonb
);
--> statement-breakpoint
CREATE TABLE "Client" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"property" text NOT NULL,
	"docId" text
);
--> statement-breakpoint
CREATE TABLE "clients_more_infos" (
	"id" serial PRIMARY KEY,
	"clientId" integer NOT NULL,
	"email" text,
	"phone" text,
	"address" text,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"zipCode" text,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Company" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"cnpj" text NOT NULL,
	"ownerCuid" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Doc" (
	"cuid" text PRIMARY KEY,
	"title" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"archivedAt" timestamp(3),
	"category" text,
	"color" text,
	"createdCuid" text NOT NULL,
	"icon" text,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"isFavorite" boolean DEFAULT false NOT NULL,
	"isLocked" boolean DEFAULT false NOT NULL,
	"isPublic" boolean DEFAULT false NOT NULL,
	"isTemplate" boolean DEFAULT false NOT NULL,
	"parentCuid" text,
	"properties" jsonb,
	"publishedAt" timestamp(3),
	"slug" text NOT NULL,
	"status" "DocStatus" DEFAULT 'DRAFT'::"DocStatus" NOT NULL,
	"tags" text[],
	"templateCuid" text,
	"updatedAt" timestamp(3) NOT NULL,
	"updatedCuid" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"visibility" "DocVisibility" DEFAULT 'PRIVATE'::"DocVisibility" NOT NULL,
	"content" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Equipment" (
	"id" serial PRIMARY KEY,
	"sn" text NOT NULL,
	"identifier" integer NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"productId" integer NOT NULL,
	"nickname" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "GoogleTokens" (
	"id" serial PRIMARY KEY,
	"tokens" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Group" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"type" text NOT NULL,
	"identifier" integer NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "HistoryProduct" (
	"id" serial PRIMARY KEY,
	"productId" integer NOT NULL,
	"price" double precision NOT NULL,
	"cost" double precision NOT NULL,
	"stock" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "installments" (
	"id" serial PRIMARY KEY,
	"value" integer NOT NULL,
	"status" "InstallmentStatus" DEFAULT 'PENDING'::"InstallmentStatus" NOT NULL,
	"installmentsNumber" integer NOT NULL,
	"paymentMethod" "PaymentMethod" DEFAULT 'NOT_DECLARED'::"PaymentMethod" NOT NULL,
	"billed" boolean DEFAULT false NOT NULL,
	"periodId" integer NOT NULL,
	"transactionId" integer NOT NULL,
	"dueAt" timestamp(3) NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"createdCuid" text NOT NULL,
	"updatedCuid" text NOT NULL,
	"paidAt" timestamp(3),
	"installmentsTotal" integer,
	"paymentReference" text
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"total" integer NOT NULL,
	"categoryId" integer NOT NULL,
	"clientId" integer NOT NULL,
	"docCuid" text,
	"otherValues" jsonb[] DEFAULT ARRAY[]::jsonb[],
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"updatedByCuid" text NOT NULL,
	"discount" integer DEFAULT 0 NOT NULL,
	"flag" text DEFAULT 'Desconhecido' NOT NULL,
	"date" jsonb,
	"transactionId" integer NOT NULL,
	"isBudget" boolean DEFAULT false NOT NULL,
	"orderStatusId" integer DEFAULT 1 NOT NULL,
	"content" jsonb
);
--> statement-breakpoint
CREATE TABLE "order_status" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"color" text NOT NULL,
	"flag" "OrderStatusFlag" DEFAULT 'NOTHING'::"OrderStatusFlag" NOT NULL,
	"ordering" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Period" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"endTime" timestamp(3) NOT NULL,
	"startTime" timestamp(3) NOT NULL,
	"order" serial
);
--> statement-breakpoint
CREATE TABLE "Product" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"price" double precision NOT NULL,
	"cost" double precision NOT NULL,
	"stock" integer NOT NULL,
	"unity" "UnityProduct" DEFAULT 'und'::"UnityProduct" NOT NULL,
	"pictureUrl" text NOT NULL,
	"description" text,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"updatedByCuid" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProductsOnCarts" (
	"cartId" integer,
	"productId" integer,
	"price" double precision NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT "ProductsOnCarts_pkey" PRIMARY KEY("cartId","productId")
);
--> statement-breakpoint
CREATE TABLE "ProductsOnSales" (
	"quantity" integer NOT NULL,
	"price" double precision NOT NULL,
	"saleId" integer,
	"productId" integer,
	CONSTRAINT "ProductsOnSales_pkey" PRIMARY KEY("saleId","productId")
);
--> statement-breakpoint
CREATE TABLE "Property" (
	"id" serial PRIMARY KEY,
	"clientId" integer NOT NULL,
	"updateAt" timestamp(3) NOT NULL,
	"createAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"title" text NOT NULL,
	"city" text DEFAULT 'Desconhecido' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Sale" (
	"total" double precision NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"id" serial PRIMARY KEY,
	"orderId" integer NOT NULL,
	"otherValues" jsonb[] DEFAULT ARRAY[]::jsonb[]
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expiresAt" timestamp(3) NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Station" (
	"id" serial PRIMARY KEY,
	"propertyId" integer NOT NULL,
	"content" text NOT NULL,
	"rx" double precision NOT NULL,
	"tx" double precision NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL,
	"updateAt" timestamp(3) NOT NULL,
	"createAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StationAnalog" (
	"id" serial PRIMARY KEY,
	"stationId" integer NOT NULL,
	"silent" "TypeAnalogSilent" NOT NULL,
	"encoder" double precision NOT NULL,
	"decoder" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE "StationDigital" (
	"id" serial PRIMARY KEY,
	"stationId" integer NOT NULL,
	"slot" integer NOT NULL,
	"colorCode" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Supplier" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Transactions" (
	"id" serial PRIMARY KEY,
	"type" "TypeTransaction" NOT NULL,
	"bankId" integer NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"hasNfe" boolean DEFAULT false NOT NULL,
	"isDelete" boolean DEFAULT false NOT NULL,
	"title" text NOT NULL,
	"companyId" integer NOT NULL,
	"createCuid" text NOT NULL,
	"updatedCuid" text NOT NULL,
	"eventId" text,
	"hasNotify" boolean DEFAULT false NOT NULL,
	"cartId" integer,
	"orderId" integer,
	"total" integer DEFAULT 0 NOT NULL,
	"content" jsonb
);
--> statement-breakpoint
CREATE TABLE "User" (
	"cuid" text PRIMARY KEY,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"nickname" text NOT NULL,
	"role" "Role" NOT NULL,
	"isEnable" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"avatarUrl" text NOT NULL,
	"password" text NOT NULL,
	"emailVerified" boolean DEFAULT false NOT NULL,
	"image" text
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp(3) NOT NULL,
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Work" (
	"id" serial PRIMARY KEY,
	"total" double precision NOT NULL,
	"orderId" integer NOT NULL,
	"docCuid" text,
	"otherValues" jsonb[] DEFAULT ARRAY[]::jsonb[],
	"createdAt" timestamp(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp(3) NOT NULL,
	"updatedByCuid" text NOT NULL,
	"flag" text DEFAULT 'Desconhecido' NOT NULL,
	"date" jsonb,
	"title" text NOT NULL,
	"content" jsonb,
	"archives" jsonb[] DEFAULT ARRAY[]::jsonb[],
	"open" boolean DEFAULT false NOT NULL,
	"orderN" integer DEFAULT 0 NOT NULL,
	"disabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE INDEX "_ArchivesToEquipment_B_index" ON "base"."_ArchivesToEquipment" ("B");--> statement-breakpoint
CREATE INDEX "_ArchivesToTransactions_B_index" ON "base"."_ArchivesToTransactions" ("B");--> statement-breakpoint
CREATE INDEX "_ArchivesToWork_B_index" ON "base"."_ArchivesToWork" ("B");--> statement-breakpoint
CREATE INDEX "_CartToOtherValues_B_index" ON "base"."_CartToOtherValues" ("B");--> statement-breakpoint
CREATE INDEX "_CategoryTransactionToTransactions_B_index" ON "base"."_CategoryTransactionToTransactions" ("B");--> statement-breakpoint
CREATE INDEX "_ChannelSchemaToEquipment_B_index" ON "base"."_ChannelSchemaToEquipment" ("B");--> statement-breakpoint
CREATE INDEX "_EquipmentToStation_B_index" ON "base"."_EquipmentToStation" ("B");--> statement-breakpoint
CREATE INDEX "_GroupToStation_B_index" ON "base"."_GroupToStation" ("B");--> statement-breakpoint
CREATE INDEX "_OrderToOtherValues_B_index" ON "base"."_OrderToOtherValues" ("B");--> statement-breakpoint
CREATE INDEX "_OtherValuesToWork_B_index" ON "base"."_OtherValuesToWork" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX "Equipment_identifier_key" ON "base"."Equipment" ("identifier");--> statement-breakpoint
CREATE UNIQUE INDEX "Equipment_sn_key" ON "base"."Equipment" ("sn");--> statement-breakpoint
CREATE UNIQUE INDEX "Period_name_key" ON "base"."Period" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "ProductCategory_parentCategoryId_key" ON "base"."ProductCategory" ("parentCategoryId");--> statement-breakpoint
CREATE UNIQUE INDEX "StationAnalog_stationId_key" ON "base"."StationAnalog" ("stationId");--> statement-breakpoint
CREATE UNIQUE INDEX "StationDigital_stationId_key" ON "base"."StationDigital" ("stationId");--> statement-breakpoint
CREATE UNIQUE INDEX "Supplier_name_key" ON "base"."Supplier" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "base"."User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "User_nickname_key" ON "base"."User" ("nickname");--> statement-breakpoint
CREATE INDEX "_ArchivesToEquipment_B_index" ON "_ArchivesToEquipment" ("B");--> statement-breakpoint
CREATE INDEX "_ArchivesToInstallment_B_index" ON "_ArchivesToInstallment" ("B");--> statement-breakpoint
CREATE INDEX "_ArchivesToTransactions_B_index" ON "_ArchivesToTransactions" ("B");--> statement-breakpoint
CREATE INDEX "_CategoryProductToProduct_B_index" ON "_CategoryProductToProduct" ("B");--> statement-breakpoint
CREATE INDEX "_CategoryTransactionToTransactions_B_index" ON "_CategoryTransactionToTransactions" ("B");--> statement-breakpoint
CREATE INDEX "_ChannelSchemaToEquipment_B_index" ON "_ChannelSchemaToEquipment" ("B");--> statement-breakpoint
CREATE INDEX "_EquipmentToStation_B_index" ON "_EquipmentToStation" ("B");--> statement-breakpoint
CREATE INDEX "_GroupToStation_B_index" ON "_GroupToStation" ("B");--> statement-breakpoint
CREATE INDEX "_SaleToWork_B_index" ON "_SaleToWork" ("B");--> statement-breakpoint
CREATE UNIQUE INDEX "Cart_transactionId_key" ON "Cart" ("transactionId");--> statement-breakpoint
CREATE UNIQUE INDEX "CategoryOrder_name_key" ON "CategoryOrder" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "clients_more_infos_clientId_key" ON "clients_more_infos" ("clientId");--> statement-breakpoint
CREATE INDEX "Doc_createdCuid_idx" ON "Doc" ("createdCuid");--> statement-breakpoint
CREATE INDEX "Doc_isDeleted_idx" ON "Doc" ("isDeleted");--> statement-breakpoint
CREATE INDEX "Doc_isFavorite_idx" ON "Doc" ("isFavorite");--> statement-breakpoint
CREATE INDEX "Doc_parentCuid_idx" ON "Doc" ("parentCuid");--> statement-breakpoint
CREATE UNIQUE INDEX "Doc_slug_key" ON "Doc" ("slug");--> statement-breakpoint
CREATE INDEX "Doc_status_idx" ON "Doc" ("status");--> statement-breakpoint
CREATE INDEX "Doc_updatedCuid_idx" ON "Doc" ("updatedCuid");--> statement-breakpoint
CREATE UNIQUE INDEX "Equipment_identifier_key" ON "Equipment" ("identifier");--> statement-breakpoint
CREATE UNIQUE INDEX "Equipment_sn_key" ON "Equipment" ("sn");--> statement-breakpoint
CREATE UNIQUE INDEX "order_status_name_key" ON "order_status" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "Order_transactionId_key" ON "Order" ("transactionId");--> statement-breakpoint
CREATE UNIQUE INDEX "Period_name_key" ON "Period" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "session_token_key" ON "session" ("token");--> statement-breakpoint
CREATE UNIQUE INDEX "StationAnalog_stationId_key" ON "StationAnalog" ("stationId");--> statement-breakpoint
CREATE UNIQUE INDEX "StationDigital_stationId_key" ON "StationDigital" ("stationId");--> statement-breakpoint
CREATE UNIQUE INDEX "Supplier_name_key" ON "Supplier" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "User_email_key" ON "User" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "User_nickname_key" ON "User" ("nickname");--> statement-breakpoint
ALTER TABLE "base"."Archives" ADD CONSTRAINT "Archives_createdCuid_fkey" FOREIGN KEY ("createdCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Archives" ADD CONSTRAINT "Archives_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Archives" ADD CONSTRAINT "Archives_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Bank" ADD CONSTRAINT "Bank_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Cart" ADD CONSTRAINT "Cart_assignedCuid_fkey" FOREIGN KEY ("assignedCuid") REFERENCES "base"."User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Cart" ADD CONSTRAINT "Cart_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "base"."Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ChannelAnalogOnChannelSchema" ADD CONSTRAINT "ChannelAnalogOnChannelSchema_channelSchemaId_fkey" FOREIGN KEY ("channelSchemaId") REFERENCES "base"."ChannelSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ChannelAnalogOnChannelSchema" ADD CONSTRAINT "ChannelAnalogOnChannelSchema_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "base"."Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ChannelDigitalOnChannelSchema" ADD CONSTRAINT "ChannelDigitalOnChannelSchema_channelSchemaId_fkey" FOREIGN KEY ("channelSchemaId") REFERENCES "base"."ChannelSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ChannelDigitalOnChannelSchema" ADD CONSTRAINT "ChannelDigitalOnChannelSchema_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "base"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ChannelDigitalOnChannelSchema" ADD CONSTRAINT "ChannelDigitalOnChannelSchema_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "base"."Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Company" ADD CONSTRAINT "Company_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Daily" ADD CONSTRAINT "Daily_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Equipment" ADD CONSTRAINT "Equipment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "base"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "base"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Product" ADD CONSTRAINT "Product_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "base"."ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Product" ADD CONSTRAINT "Product_createCuid_fkey" FOREIGN KEY ("createCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Product" ADD CONSTRAINT "Product_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductCategory" ADD CONSTRAINT "ProductCategory_parentCategoryId_fkey" FOREIGN KEY ("parentCategoryId") REFERENCES "base"."ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductPriceHistory" ADD CONSTRAINT "ProductPriceHistory_createdCuid_fkey" FOREIGN KEY ("createdCuid") REFERENCES "base"."User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductPriceHistory" ADD CONSTRAINT "ProductPriceHistory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "base"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductsOnCart" ADD CONSTRAINT "ProductsOnCart_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "base"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductsOnCart" ADD CONSTRAINT "ProductsOnCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "base"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "base"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."ProductsOnOrder" ADD CONSTRAINT "ProductsOnOrder_productId_fkey" FOREIGN KEY ("productId") REFERENCES "base"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Property" ADD CONSTRAINT "Property_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "base"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Service" ADD CONSTRAINT "Service_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "base"."Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Station" ADD CONSTRAINT "Station_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "base"."Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."StationAnalog" ADD CONSTRAINT "StationAnalog_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "base"."Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."StationDigital" ADD CONSTRAINT "StationDigital_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "base"."Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."TransactionGroup" ADD CONSTRAINT "TransactionGroup_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "base"."Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "base"."Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "base"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "base"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_createCuid_fkey" FOREIGN KEY ("createCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "base"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_parentTransactionId_fkey" FOREIGN KEY ("parentTransactionId") REFERENCES "base"."Transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "base"."Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "base"."Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Transactions" ADD CONSTRAINT "Transactions_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "base"."User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Work" ADD CONSTRAINT "Work_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "base"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."Work" ADD CONSTRAINT "Work_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "base"."Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ArchivesToEquipment" ADD CONSTRAINT "_ArchivesToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Archives"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ArchivesToEquipment" ADD CONSTRAINT "_ArchivesToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ArchivesToTransactions" ADD CONSTRAINT "_ArchivesToTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Archives"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ArchivesToTransactions" ADD CONSTRAINT "_ArchivesToTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ArchivesToWork" ADD CONSTRAINT "_ArchivesToWork_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Archives"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ArchivesToWork" ADD CONSTRAINT "_ArchivesToWork_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_CartToOtherValues" ADD CONSTRAINT "_CartToOtherValues_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_CartToOtherValues" ADD CONSTRAINT "_CartToOtherValues_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."OtherValues"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_CategoryTransactionToTransactions" ADD CONSTRAINT "_CategoryTransactionToTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."CategoryTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_CategoryTransactionToTransactions" ADD CONSTRAINT "_CategoryTransactionToTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ChannelSchemaToEquipment" ADD CONSTRAINT "_ChannelSchemaToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."ChannelSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_ChannelSchemaToEquipment" ADD CONSTRAINT "_ChannelSchemaToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_EquipmentToStation" ADD CONSTRAINT "_EquipmentToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_EquipmentToStation" ADD CONSTRAINT "_EquipmentToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_GroupToStation" ADD CONSTRAINT "_GroupToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_GroupToStation" ADD CONSTRAINT "_GroupToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_OrderToOtherValues" ADD CONSTRAINT "_OrderToOtherValues_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_OrderToOtherValues" ADD CONSTRAINT "_OrderToOtherValues_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."OtherValues"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_OtherValuesToWork" ADD CONSTRAINT "_OtherValuesToWork_A_fkey" FOREIGN KEY ("A") REFERENCES "base"."OtherValues"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "base"."_OtherValuesToWork" ADD CONSTRAINT "_OtherValuesToWork_B_fkey" FOREIGN KEY ("B") REFERENCES "base"."Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Archives" ADD CONSTRAINT "Archives_createdCuid_fkey" FOREIGN KEY ("createdCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Archives" ADD CONSTRAINT "Archives_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Archives" ADD CONSTRAINT "Archives_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Bank" ADD CONSTRAINT "Bank_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ChannelAnalogOnChannelSchema" ADD CONSTRAINT "ChannelAnalogOnChannelSchema_channelSchemaId_fkey" FOREIGN KEY ("channelSchemaId") REFERENCES "ChannelSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ChannelDigitalOnChannelSchema" ADD CONSTRAINT "ChannelDigitalOnChannelSchema_channelSchemaId_fkey" FOREIGN KEY ("channelSchemaId") REFERENCES "ChannelSchema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ChannelDigitalOnChannelSchema" ADD CONSTRAINT "ChannelDigitalOnChannelSchema_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ChannelSchema" ADD CONSTRAINT "ChannelSchema_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Client" ADD CONSTRAINT "Client_docId_fkey" FOREIGN KEY ("docId") REFERENCES "Doc"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Company" ADD CONSTRAINT "Company_ownerCuid_fkey" FOREIGN KEY ("ownerCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Property" ADD CONSTRAINT "Property_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Station" ADD CONSTRAINT "Station_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "StationAnalog" ADD CONSTRAINT "StationAnalog_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "StationDigital" ADD CONSTRAINT "StationDigital_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_bankId_fkey" FOREIGN KEY ("bankId") REFERENCES "Bank"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_createCuid_fkey" FOREIGN KEY ("createCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ArchivesToEquipment" ADD CONSTRAINT "_ArchivesToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "Archives"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ArchivesToEquipment" ADD CONSTRAINT "_ArchivesToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ArchivesToTransactions" ADD CONSTRAINT "_ArchivesToTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "Archives"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ArchivesToTransactions" ADD CONSTRAINT "_ArchivesToTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_CategoryTransactionToTransactions" ADD CONSTRAINT "_CategoryTransactionToTransactions_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryTransaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_CategoryTransactionToTransactions" ADD CONSTRAINT "_CategoryTransactionToTransactions_B_fkey" FOREIGN KEY ("B") REFERENCES "Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ChannelSchemaToEquipment" ADD CONSTRAINT "_ChannelSchemaToEquipment_A_fkey" FOREIGN KEY ("A") REFERENCES "ChannelSchema"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ChannelSchemaToEquipment" ADD CONSTRAINT "_ChannelSchemaToEquipment_B_fkey" FOREIGN KEY ("B") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_EquipmentToStation" ADD CONSTRAINT "_EquipmentToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "Equipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_EquipmentToStation" ADD CONSTRAINT "_EquipmentToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_GroupToStation" ADD CONSTRAINT "_GroupToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_GroupToStation" ADD CONSTRAINT "_GroupToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "Station"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_createdCuid_fkey" FOREIGN KEY ("createdCuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_parentCuid_fkey" FOREIGN KEY ("parentCuid") REFERENCES "Doc"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_templateCuid_fkey" FOREIGN KEY ("templateCuid") REFERENCES "Doc"("cuid") ON DELETE SET NULL ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Doc" ADD CONSTRAINT "Doc_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ProductsOnSales" ADD CONSTRAINT "ProductsOnSales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ProductsOnSales" ADD CONSTRAINT "ProductsOnSales_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "HistoryProduct" ADD CONSTRAINT "HistoryProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ProductsOnCarts" ADD CONSTRAINT "ProductsOnCarts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "ProductsOnCarts" ADD CONSTRAINT "ProductsOnCarts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_CategoryProductToProduct" ADD CONSTRAINT "_CategoryProductToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "CategoryProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_CategoryProductToProduct" ADD CONSTRAINT "_CategoryProductToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CategoryOrder"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_docCuid_fkey" FOREIGN KEY ("docCuid") REFERENCES "Doc"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "order_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Order" ADD CONSTRAINT "Order_updatedByCuid_fkey" FOREIGN KEY ("updatedByCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "Supplier"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Work" ADD CONSTRAINT "Work_docCuid_fkey" FOREIGN KEY ("docCuid") REFERENCES "Doc"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "Work" ADD CONSTRAINT "Work_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_SaleToWork" ADD CONSTRAINT "_SaleToWork_A_fkey" FOREIGN KEY ("A") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_SaleToWork" ADD CONSTRAINT "_SaleToWork_B_fkey" FOREIGN KEY ("B") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_createdCuid_fkey" FOREIGN KEY ("createdCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_periodId_fkey" FOREIGN KEY ("periodId") REFERENCES "Period"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "installments" ADD CONSTRAINT "installments_updatedCuid_fkey" FOREIGN KEY ("updatedCuid") REFERENCES "User"("cuid") ON DELETE RESTRICT ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ArchivesToInstallment" ADD CONSTRAINT "_ArchivesToInstallment_A_fkey" FOREIGN KEY ("A") REFERENCES "Archives"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "_ArchivesToInstallment" ADD CONSTRAINT "_ArchivesToInstallment_B_fkey" FOREIGN KEY ("B") REFERENCES "installments"("id") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("cuid") ON DELETE CASCADE ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "clients_more_infos" ADD CONSTRAINT "clients_more_infos_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
*/