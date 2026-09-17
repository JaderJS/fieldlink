import { pgSchema, pgEnum, pgTable, integer, serial, text, varchar, jsonb, doublePrecision, timestamp, boolean, index, uniqueIndex, foreignKey, type AnyPgColumn, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const base = pgSchema("base");
export const finance = pgSchema("finance");
export const orderStatusTypeInBase = base.enum("OrderStatusType", ["PROCESS", "INIT", "FINISHED"])
export const productDiscountTypeInBase = base.enum("ProductDiscountType", ["NONE", "PERCENT", "AMOUNT"])
export const roleInBase = base.enum("Role", ["USER", "ADMIN", "ROOT"])
export const serviceTypeInBase = base.enum("ServiceType", ["STARTED", "PENDING", "FINISHED", "DROPPED"])
export const typeAnalogSilentInBase = base.enum("TypeAnalogSilent", ["CSQ", "TPL", "DPL_N", "DPL_I"])
export const typeProductInBase = base.enum("TypeProduct", ["UND", "m", "L", "g"])
export const typeTransactionInBase = base.enum("TypeTransaction", ["INPUT", "OUTPUT"])
export const role = pgEnum("Role", ["USER", "ADMIN", "ROOT"])
export const typeAnalogSilent = pgEnum("TypeAnalogSilent", ["CSQ", "TPL", "DPL_N", "DPL_I"])
export const typeTransaction = pgEnum("TypeTransaction", ["INPUT", "OUTPUT"])
export const unityProduct = pgEnum("UnityProduct", ["und", "m", "l", "g"])
export const docStatus = pgEnum("DocStatus", ["DRAFT", "PUBLISHED", "ARCHIVED", "REVIEW"])
export const docType = pgEnum("DocType", ["PAGE", "DATABASE", "TEMPLATE", "BOARD", "CALENDAR", "GALLERY"])
export const docVisibility = pgEnum("DocVisibility", ["PRIVATE", "PUBLIC", "WORKSPACE", "SHARED"])
export const installmentStatus = pgEnum("InstallmentStatus", ["PENDING", "PAID", "PARTIAL", "CANCELLED", "REFUNDED"])
export const paymentMethod = pgEnum("PaymentMethod", ["CARD", "PIX", "BOLETO", "TED", "CASH", "OTHER", "NOT_DECLARED"])
export const orderStatusFlag = pgEnum("OrderStatusFlag", ["FINISHED", "BUDGET", "NOTHING"])


export const archivesToEquipmentInBase = base.table("_ArchivesToEquipment", {
	a: text("A").notNull().references(() => archivesInBase.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => equipmentInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ArchivesToEquipment_AB_pkey"}),
	index("_ArchivesToEquipment_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const archivesToTransactionsInBase = base.table("_ArchivesToTransactions", {
	a: text("A").notNull().references(() => archivesInBase.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => transactionsInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ArchivesToTransactions_AB_pkey"}),
	index("_ArchivesToTransactions_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const archivesToWorkInBase = base.table("_ArchivesToWork", {
	a: text("A").notNull().references(() => archivesInBase.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => workInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ArchivesToWork_AB_pkey"}),
	index("_ArchivesToWork_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const cartToOtherValuesInBase = base.table("_CartToOtherValues", {
	a: integer("A").notNull().references(() => cartInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => otherValuesInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_CartToOtherValues_AB_pkey"}),
	index("_CartToOtherValues_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const categoryTransactionToTransactionsInBase = base.table("_CategoryTransactionToTransactions", {
	a: integer("A").notNull().references(() => categoryTransactionInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => transactionsInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_CategoryTransactionToTransactions_AB_pkey"}),
	index("_CategoryTransactionToTransactions_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const channelSchemaToEquipmentInBase = base.table("_ChannelSchemaToEquipment", {
	a: integer("A").notNull().references(() => channelSchemaInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => equipmentInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ChannelSchemaToEquipment_AB_pkey"}),
	index("_ChannelSchemaToEquipment_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const equipmentToStationInBase = base.table("_EquipmentToStation", {
	a: integer("A").notNull().references(() => equipmentInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => stationInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_EquipmentToStation_AB_pkey"}),
	index("_EquipmentToStation_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const groupToStationInBase = base.table("_GroupToStation", {
	a: integer("A").notNull().references(() => groupInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => stationInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_GroupToStation_AB_pkey"}),
	index("_GroupToStation_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const orderToOtherValuesInBase = base.table("_OrderToOtherValues", {
	a: integer("A").notNull().references(() => orderInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => otherValuesInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_OrderToOtherValues_AB_pkey"}),
	index("_OrderToOtherValues_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const otherValuesToWorkInBase = base.table("_OtherValuesToWork", {
	a: integer("A").notNull().references(() => otherValuesInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => workInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_OtherValuesToWork_AB_pkey"}),
	index("_OtherValuesToWork_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const archivesInBase = base.table("Archives", {
	cuid: text().primaryKey(),
	title: text().notNull(),
	size: text().notNull(),
	type: text().notNull(),
	path: text().notNull(),
	pathUrl: text().notNull(),
	createdCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	ownerCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const bankInBase = base.table("Bank", {
	id: serial().primaryKey(),
	name: text().notNull(),
	pix: text().notNull(),
	limitBankingMovements: doublePrecision().default(0).notNull(),
	limitBankingMovementsMonth: doublePrecision().default(0).notNull(),
	ownerCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedBy: text().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const cartInBase = base.table("Cart", {
	id: serial().primaryKey(),
	total: doublePrecision().notNull(),
	status: orderStatusTypeInBase().notNull(),
	assignedCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	supplierId: integer().notNull().references(() => supplierInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	isActive: boolean().default(true).notNull(),
});

export const categoryTransactionInBase = base.table("CategoryTransaction", {
	id: serial().primaryKey(),
	name: text().notNull(),
});

export const channelAnalogOnChannelSchemaInBase = base.table("ChannelAnalogOnChannelSchema", {
	channelSchemaId: integer().notNull().references(() => channelSchemaInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	stationId: integer().notNull().references(() => stationInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	order: integer().notNull(),
}, (table) => [
	primaryKey({ columns: [table.channelSchemaId, table.stationId], name: "ChannelAnalogOnChannelSchema_pkey"}),
]);

export const channelDigitalOnChannelSchemaInBase = base.table("ChannelDigitalOnChannelSchema", {
	channelSchemaId: integer().notNull().references(() => channelSchemaInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	stationId: integer().notNull().references(() => stationInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	groupId: integer().notNull().references(() => groupInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	slot: integer().notNull(),
	order: integer().notNull(),
}, (table) => [
	primaryKey({ columns: [table.channelSchemaId, table.stationId, table.groupId], name: "ChannelDigitalOnChannelSchema_pkey"}),
]);

export const channelSchemaInBase = base.table("ChannelSchema", {
	id: serial().primaryKey(),
	title: text().notNull(),
	content: text().notNull(),
});

export const clientInBase = base.table("Client", {
	id: serial().primaryKey(),
	name: text().notNull(),
	property: text().default("").notNull(),
});

export const companyInBase = base.table("Company", {
	id: serial().primaryKey(),
	name: text().notNull(),
	cnpj: text().notNull(),
	ownerCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const dailyInBase = base.table("Daily", {
	id: serial().primaryKey(),
	title: text().notNull(),
	description: text(),
	content: text().notNull(),
	isActive: boolean().default(true).notNull(),
	ownerCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const equipmentInBase = base.table("Equipment", {
	id: serial().primaryKey(),
	nickname: text().notNull(),
	sn: text().notNull(),
	identifier: integer().notNull(),
	productId: integer().notNull().references(() => productInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("Equipment_identifier_key").using("btree", table.identifier.asc().nullsLast()),
	uniqueIndex("Equipment_sn_key").using("btree", table.sn.asc().nullsLast()),
]);

export const googleTokensInBase = base.table("GoogleTokens", {
	id: serial().primaryKey(),
	tokens: jsonb().notNull(),
});

export const groupInBase = base.table("Group", {
	id: serial().primaryKey(),
	title: text().notNull(),
	type: text().notNull(),
	identifier: integer().notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const orderInBase = base.table("Order", {
	id: serial().primaryKey(),
	status: orderStatusTypeInBase().notNull(),
	total: doublePrecision().notNull(),
	assignedCuid: text().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	clientId: integer().notNull().references(() => clientInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const otherValuesInBase = base.table("OtherValues", {
	id: serial().primaryKey(),
	name: text().notNull(),
	price: doublePrecision().notNull(),
});

export const parentTransactionInBase = base.table("parentTransaction", {
	id: serial().primaryKey(),
	n: integer().notNull(),
	firstTransactionId: integer().notNull(),
});

export const periodInBase = base.table("Period", {
	id: serial().primaryKey(),
	startTime: timestamp({ precision: 3 }).notNull(),
	endTime: timestamp({ precision: 3 }).notNull(),
	name: text().notNull(),
	order: integer().default(0).notNull(),
}, (table) => [
	uniqueIndex("Period_name_key").using("btree", table.name.asc().nullsLast()),
]);

export const productInBase = base.table("Product", {
	id: serial().primaryKey(),
	name: text().notNull(),
	pictureUrl: text().notNull(),
	description: text(),
	price: doublePrecision().notNull(),
	discountType: productDiscountTypeInBase().notNull(),
	discountValue: doublePrecision().default(0).notNull(),
	stock: integer().notNull(),
	categoryId: integer("CategoryId").notNull().references(() => productCategoryInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	unity: typeProductInBase().notNull(),
	priceFn: text(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
});

export const productCategoryInBase = base.table("ProductCategory", {
	id: serial().primaryKey(),
	name: text().notNull(),
	slug: text().notNull(),
	tags: text().array(),
	parentCategoryId: integer(),
}, (table) => [
	foreignKey({
		columns: [table.parentCategoryId],
		foreignColumns: [table.id],
		name: "ProductCategory_parentCategoryId_fkey"
	}).onUpdate("cascade").onDelete("set null"),
	uniqueIndex("ProductCategory_parentCategoryId_key").using("btree", table.parentCategoryId.asc().nullsLast()),
]);

export const productPriceHistoryInBase = base.table("ProductPriceHistory", {
	id: serial().primaryKey(),
	productId: integer().notNull().references(() => productInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	costValue: doublePrecision().notNull(),
	saleValue: doublePrecision().notNull(),
	createdCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const productsOnCartInBase = base.table("ProductsOnCart", {
	cartId: integer().notNull().references(() => cartInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	productId: integer().notNull().references(() => productInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	quantity: integer().notNull(),
	price: doublePrecision().notNull(),
}, (table) => [
	primaryKey({ columns: [table.cartId, table.productId], name: "ProductsOnCart_pkey"}),
]);

export const productsOnOrderInBase = base.table("ProductsOnOrder", {
	productId: integer().notNull().references(() => productInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	orderId: integer().notNull().references(() => orderInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	quantity: integer().notNull(),
	price: doublePrecision().notNull(),
}, (table) => [
	primaryKey({ columns: [table.productId, table.orderId], name: "ProductsOnOrder_pkey"}),
]);

export const propertyInBase = base.table("Property", {
	id: serial().primaryKey(),
	title: text().notNull(),
	clientId: integer().notNull().references(() => clientInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	updateAt: timestamp({ precision: 3 }).notNull(),
	createAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const serviceInBase = base.table("Service", {
	id: serial().primaryKey(),
	name: text().notNull(),
	content: text().notNull(),
	status: serviceTypeInBase().notNull(),
	isActive: boolean().default(true).notNull(),
	clientId: integer().notNull().references(() => clientInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	startTime: timestamp({ precision: 3 }).notNull(),
	endTime: timestamp({ precision: 3 }).notNull(),
});

export const stationInBase = base.table("Station", {
	id: serial().primaryKey(),
	propertyId: integer().notNull().references(() => propertyInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	content: text().notNull(),
	rx: doublePrecision().notNull(),
	tx: doublePrecision().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	isActive: boolean().default(false).notNull(),
	updateAt: timestamp({ precision: 3 }).notNull(),
	createAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const stationAnalogInBase = base.table("StationAnalog", {
	id: serial().primaryKey(),
	stationId: integer().notNull().references(() => stationInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	silent: typeAnalogSilentInBase().notNull(),
	encoder: doublePrecision().notNull(),
	decoder: doublePrecision().notNull(),
}, (table) => [
	uniqueIndex("StationAnalog_stationId_key").using("btree", table.stationId.asc().nullsLast()),
]);

export const stationDigitalInBase = base.table("StationDigital", {
	id: serial().primaryKey(),
	stationId: integer().notNull().references(() => stationInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	slot: integer().notNull(),
	colorCode: integer().notNull(),
}, (table) => [
	uniqueIndex("StationDigital_stationId_key").using("btree", table.stationId.asc().nullsLast()),
]);

export const supplierInBase = base.table("Supplier", {
	id: serial().primaryKey(),
	name: text().notNull(),
}, (table) => [
	uniqueIndex("Supplier_name_key").using("btree", table.name.asc().nullsLast()),
]);

export const transactionGroupInBase = base.table("TransactionGroup", {
	id: serial().primaryKey(),
	transactionId: integer().notNull().references(() => transactionsInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const transactionsInBase = base.table("Transactions", {
	id: serial().primaryKey(),
	title: text().notNull(),
	type: typeTransactionInBase().notNull(),
	description: text(),
	isDelete: boolean().default(false).notNull(),
	hasNfe: boolean().default(false).notNull(),
	value: doublePrecision().notNull(),
	billed: boolean().default(false).notNull(),
	createCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedCuid: text().notNull().references(() => userInBase.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	companyId: integer().notNull().references(() => companyInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	bankId: integer().notNull().references(() => bankInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	periodId: integer().notNull().references(() => periodInBase.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	hasNotify: boolean().default(false).notNull(),
	serviceId: integer().references(() => serviceInBase.id, { onDelete: "set null", onUpdate: "cascade" } ),
	cartId: integer().references((): AnyPgColumn => cartInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	orderId: integer().references((): AnyPgColumn => orderInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	eventId: text(),
	content: text().default("").notNull(),
	fromAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	parentTransactionId: integer(),
}, (table) => [
	foreignKey({
		columns: [table.parentTransactionId],
		foreignColumns: [table.id],
		name: "Transactions_parentTransactionId_fkey"
	}).onUpdate("cascade").onDelete("set null"),
]);

export const userInBase = base.table("User", {
	cuid: text().primaryKey(),
	email: text().notNull(),
	name: text().notNull(),
	nickname: text().notNull(),
	avatarUrl: text().notNull(),
	role: roleInBase().notNull(),
	password: text().notNull(),
	isEnable: boolean().default(false).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
}, (table) => [
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast()),
	uniqueIndex("User_nickname_key").using("btree", table.nickname.asc().nullsLast()),
]);

export const workInBase = base.table("Work", {
	id: serial().primaryKey(),
	title: text().notNull(),
	content: text().notNull(),
	startTime: timestamp({ precision: 3 }).notNull(),
	endTime: timestamp({ precision: 3 }).notNull(),
	serviceId: integer().notNull().references(() => serviceInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	total: doublePrecision().notNull(),
	orderId: integer().references(() => orderInBase.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export const archivesToEquipment = pgTable("_ArchivesToEquipment", {
	a: text("A").notNull().references(() => archives.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => equipment.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ArchivesToEquipment_AB_pkey"}),
	index("_ArchivesToEquipment_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const archivesToInstallment = pgTable("_ArchivesToInstallment", {
	a: text("A").notNull().references(() => archives.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => installments.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ArchivesToInstallment_AB_pkey"}),
	index("_ArchivesToInstallment_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const archivesToTransactions = pgTable("_ArchivesToTransactions", {
	a: text("A").notNull().references(() => archives.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => transactions.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ArchivesToTransactions_AB_pkey"}),
	index("_ArchivesToTransactions_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const categoryProductToProduct = pgTable("_CategoryProductToProduct", {
	a: integer("A").notNull().references(() => categoryProduct.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_CategoryProductToProduct_AB_pkey"}),
	index("_CategoryProductToProduct_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const categoryTransactionToTransactions = pgTable("_CategoryTransactionToTransactions", {
	a: integer("A").notNull().references(() => categoryTransaction.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => transactions.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_CategoryTransactionToTransactions_AB_pkey"}),
	index("_CategoryTransactionToTransactions_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const channelSchemaToEquipment = pgTable("_ChannelSchemaToEquipment", {
	a: integer("A").notNull().references(() => channelSchema.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => equipment.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_ChannelSchemaToEquipment_AB_pkey"}),
	index("_ChannelSchemaToEquipment_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const equipmentToStation = pgTable("_EquipmentToStation", {
	a: integer("A").notNull().references(() => equipment.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => station.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_EquipmentToStation_AB_pkey"}),
	index("_EquipmentToStation_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const groupToStation = pgTable("_GroupToStation", {
	a: integer("A").notNull().references(() => group.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => station.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_GroupToStation_AB_pkey"}),
	index("_GroupToStation_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true }),
	startedAt: timestamp("started_at", { withTimezone: true }).default(sql`now()`).notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const saleToWork = pgTable("_SaleToWork", {
	a: integer("A").notNull().references(() => sale.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	b: integer("B").notNull().references(() => work.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.a, table.b], name: "_SaleToWork_AB_pkey"}),
	index("_SaleToWork_B_index").using("btree", table.b.asc().nullsLast()),
]);

export const account = pgTable("account", {
	id: text().primaryKey(),
	accountId: text().notNull(),
	providerId: text().notNull(),
	userId: text().notNull().references(() => user.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	accessToken: text(),
	refreshToken: text(),
	idToken: text(),
	accessTokenExpiresAt: timestamp({ precision: 3 }),
	refreshTokenExpiresAt: timestamp({ precision: 3 }),
	scope: text(),
	password: text(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const archives = pgTable("Archives", {
	cuid: text().primaryKey(),
	pathUrl: text().notNull(),
	createdCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	ownerCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	path: text().notNull(),
	size: text().notNull(),
	type: text().notNull(),
	updatedCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	title: text().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const bank = pgTable("Bank", {
	id: serial().primaryKey(),
	name: text().notNull(),
	pix: text().notNull(),
	limitBankingMovements: doublePrecision().default(0).notNull(),
	limitBankingMovementsMonth: doublePrecision().default(0).notNull(),
	ownerCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedBy: text().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const cart = pgTable("Cart", {
	id: serial().primaryKey(),
	total: integer().notNull(),
	supplierId: integer().notNull().references(() => supplier.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	title: text().notNull(),
	otherValues: jsonb().array().default(sql`ARRAY[]`),
	transactionId: integer().notNull().references((): AnyPgColumn => transactions.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	content: jsonb(),
}, (table) => [
	uniqueIndex("Cart_transactionId_key").using("btree", table.transactionId.asc().nullsLast()),
]);

export const categoryOrder = pgTable("CategoryOrder", {
	id: serial().primaryKey(),
	name: text().notNull(),
}, (table) => [
	uniqueIndex("CategoryOrder_name_key").using("btree", table.name.asc().nullsLast()),
]);

export const categoryProduct = pgTable("CategoryProduct", {
	id: serial().primaryKey(),
	name: text().notNull(),
});

export const categoryTransaction = pgTable("CategoryTransaction", {
	id: serial().primaryKey(),
	name: text().notNull(),
});

export const channelAnalogOnChannelSchema = pgTable("ChannelAnalogOnChannelSchema", {
	channelSchemaId: integer().primaryKey().references(() => channelSchema.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	order: serial().notNull(),
	decoder: doublePrecision().notNull(),
	encoder: doublePrecision().notNull(),
	silent: typeAnalogSilent().notNull(),
});

export const channelDigitalOnChannelSchema = pgTable("ChannelDigitalOnChannelSchema", {
	channelSchemaId: integer().notNull().references(() => channelSchema.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	groupId: integer().notNull().references(() => group.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	order: serial().notNull(),
	slot: integer().notNull(),
	colorCode: integer().notNull(),
}, (table) => [
	primaryKey({ columns: [table.channelSchemaId, table.groupId], name: "ChannelDigitalOnChannelSchema_pkey"}),
]);

export const channelSchema = pgTable("ChannelSchema", {
	id: serial().primaryKey(),
	title: text().notNull(),
	stationId: integer().notNull().references(() => station.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	content: jsonb(),
});

export const client = pgTable("Client", {
	id: serial().primaryKey(),
	name: text().notNull(),
	property: text().notNull(),
	docId: text().references(() => doc.cuid, { onDelete: "set null", onUpdate: "cascade" } ),
});

export const clientsMoreInfos = pgTable("clients_more_infos", {
	id: serial().primaryKey(),
	clientId: integer().notNull().references(() => client.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	email: text(),
	phone: text(),
	address: text(),
	city: text().notNull(),
	state: text().notNull(),
	zipCode: text(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => [
	uniqueIndex("clients_more_infos_clientId_key").using("btree", table.clientId.asc().nullsLast()),
]);

export const company = pgTable("Company", {
	id: serial().primaryKey(),
	name: text().notNull(),
	cnpj: text().notNull(),
	ownerCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
});

export const doc = pgTable("Doc", {
	cuid: text().primaryKey(),
	title: text().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	archivedAt: timestamp({ precision: 3 }),
	category: text(),
	color: text(),
	createdCuid: text().notNull().references(() => user.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	icon: text(),
	isDeleted: boolean().default(false).notNull(),
	isFavorite: boolean().default(false).notNull(),
	isLocked: boolean().default(false).notNull(),
	isPublic: boolean().default(false).notNull(),
	isTemplate: boolean().default(false).notNull(),
	parentCuid: text(),
	properties: jsonb(),
	publishedAt: timestamp({ precision: 3 }),
	slug: text().notNull(),
	status: docStatus().default("DRAFT").notNull(),
	tags: text().array(),
	templateCuid: text(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	updatedCuid: text().notNull().references(() => user.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	version: integer().default(1).notNull(),
	visibility: docVisibility().default("PRIVATE").notNull(),
	content: jsonb().notNull(),
}, (table) => [
	foreignKey({
		columns: [table.parentCuid],
		foreignColumns: [table.cuid],
		name: "Doc_parentCuid_fkey"
	}).onUpdate("cascade").onDelete("set null"),
	foreignKey({
		columns: [table.templateCuid],
		foreignColumns: [table.cuid],
		name: "Doc_templateCuid_fkey"
	}).onUpdate("cascade").onDelete("set null"),
	index("Doc_createdCuid_idx").using("btree", table.createdCuid.asc().nullsLast()),
	index("Doc_isDeleted_idx").using("btree", table.isDeleted.asc().nullsLast()),
	index("Doc_isFavorite_idx").using("btree", table.isFavorite.asc().nullsLast()),
	index("Doc_parentCuid_idx").using("btree", table.parentCuid.asc().nullsLast()),
	uniqueIndex("Doc_slug_key").using("btree", table.slug.asc().nullsLast()),
	index("Doc_status_idx").using("btree", table.status.asc().nullsLast()),
	index("Doc_updatedCuid_idx").using("btree", table.updatedCuid.asc().nullsLast()),
]);

export const equipment = pgTable("Equipment", {
	id: serial().primaryKey(),
	sn: text().notNull(),
	identifier: integer().notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	productId: integer().notNull().references(() => product.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	nickname: text().notNull(),
}, (table) => [
	uniqueIndex("Equipment_identifier_key").using("btree", table.identifier.asc().nullsLast()),
	uniqueIndex("Equipment_sn_key").using("btree", table.sn.asc().nullsLast()),
]);

export const googleTokens = pgTable("GoogleTokens", {
	id: serial().primaryKey(),
	tokens: jsonb().notNull(),
});

export const group = pgTable("Group", {
	id: serial().primaryKey(),
	title: text().notNull(),
	type: text().notNull(),
	identifier: integer().notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const historyProduct = pgTable("HistoryProduct", {
	id: serial().primaryKey(),
	productId: integer().notNull().references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	price: doublePrecision().notNull(),
	cost: doublePrecision().notNull(),
	stock: integer().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const installments = pgTable("installments", {
	id: serial().primaryKey(),
	value: integer().notNull(),
	status: installmentStatus().default("PENDING").notNull(),
	installmentsNumber: integer().notNull(),
	paymentMethod: paymentMethod().default("NOT_DECLARED").notNull(),
	billed: boolean().default(false).notNull(),
	periodId: integer().notNull().references(() => period.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	transactionId: integer().notNull().references(() => transactions.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	dueAt: timestamp({ precision: 3 }).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	createdCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	paidAt: timestamp({ precision: 3 }),
	installmentsTotal: integer(),
	paymentReference: text(),
});

export const order = pgTable("Order", {
	id: serial().primaryKey(),
	title: text().notNull(),
	total: integer().notNull(),
	categoryId: integer().notNull().references(() => categoryOrder.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	clientId: integer().notNull().references(() => client.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	docCuid: text().references(() => doc.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	otherValues: jsonb().array().default(sql`ARRAY[]`),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	updatedByCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	discount: integer().default(0).notNull(),
	flag: text().default("Desconhecido").notNull(),
	date: jsonb(),
	transactionId: integer().notNull().references((): AnyPgColumn => transactions.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	isBudget: boolean().default(false).notNull(),
	orderStatusId: integer().default(1).notNull().references(() => orderStatus.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	content: jsonb(),
}, (table) => [
	uniqueIndex("Order_transactionId_key").using("btree", table.transactionId.asc().nullsLast()),
]);

export const orderStatus = pgTable("order_status", {
	id: serial().primaryKey(),
	name: text().notNull(),
	color: text().notNull(),
	flag: orderStatusFlag().default("NOTHING").notNull(),
	ordering: integer().default(0).notNull(),
}, (table) => [
	uniqueIndex("order_status_name_key").using("btree", table.name.asc().nullsLast()),
]);

export const period = pgTable("Period", {
	id: serial().primaryKey(),
	name: text().notNull(),
	endTime: timestamp({ precision: 3 }).notNull(),
	startTime: timestamp({ precision: 3 }).notNull(),
	order: serial().notNull(),
}, (table) => [
	uniqueIndex("Period_name_key").using("btree", table.name.asc().nullsLast()),
]);

export const product = pgTable("Product", {
	id: serial().primaryKey(),
	name: text().notNull(),
	price: doublePrecision().notNull(),
	cost: doublePrecision().notNull(),
	stock: integer().notNull(),
	unity: unityProduct().default("und").notNull(),
	pictureUrl: text().notNull(),
	description: text(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	updatedByCuid: text().notNull(),
});

export const productsOnCarts = pgTable("ProductsOnCarts", {
	cartId: integer().notNull().references(() => cart.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	productId: integer().notNull().references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	price: doublePrecision().notNull(),
	quantity: integer().notNull(),
}, (table) => [
	primaryKey({ columns: [table.cartId, table.productId], name: "ProductsOnCarts_pkey"}),
]);

export const productsOnSales = pgTable("ProductsOnSales", {
	quantity: integer().notNull(),
	price: doublePrecision().notNull(),
	saleId: integer().notNull().references(() => sale.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	productId: integer().notNull().references(() => product.id, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	primaryKey({ columns: [table.saleId, table.productId], name: "ProductsOnSales_pkey"}),
]);

export const property = pgTable("Property", {
	id: serial().primaryKey(),
	clientId: integer().notNull().references(() => client.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	updateAt: timestamp({ precision: 3 }).notNull(),
	createAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	title: text().notNull(),
	city: text().default("Desconhecido").notNull(),
});

export const sale = pgTable("Sale", {
	total: doublePrecision().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	id: serial().primaryKey(),
	orderId: integer().notNull().references(() => order.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	otherValues: jsonb().array().default(sql`ARRAY[]`),
});

export const session = pgTable("session", {
	id: text().primaryKey(),
	expiresAt: timestamp({ precision: 3 }).notNull(),
	token: text().notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	ipAddress: text(),
	userAgent: text(),
	userId: text().notNull().references(() => user.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
}, (table) => [
	uniqueIndex("session_token_key").using("btree", table.token.asc().nullsLast()),
]);

export const station = pgTable("Station", {
	id: serial().primaryKey(),
	propertyId: integer().notNull().references(() => property.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	content: text().notNull(),
	rx: doublePrecision().notNull(),
	tx: doublePrecision().notNull(),
	latitude: doublePrecision().notNull(),
	longitude: doublePrecision().notNull(),
	isActive: boolean().default(false).notNull(),
	updateAt: timestamp({ precision: 3 }).notNull(),
	createAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const stationAnalog = pgTable("StationAnalog", {
	id: serial().primaryKey(),
	stationId: integer().notNull().references(() => station.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	silent: typeAnalogSilent().notNull(),
	encoder: doublePrecision().notNull(),
	decoder: doublePrecision().notNull(),
}, (table) => [
	uniqueIndex("StationAnalog_stationId_key").using("btree", table.stationId.asc().nullsLast()),
]);

export const stationDigital = pgTable("StationDigital", {
	id: serial().primaryKey(),
	stationId: integer().notNull().references(() => station.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	slot: integer().notNull(),
	colorCode: integer().notNull(),
}, (table) => [
	uniqueIndex("StationDigital_stationId_key").using("btree", table.stationId.asc().nullsLast()),
]);

export const supplier = pgTable("Supplier", {
	id: serial().primaryKey(),
	name: text().notNull(),
}, (table) => [
	uniqueIndex("Supplier_name_key").using("btree", table.name.asc().nullsLast()),
]);

export const transactions = pgTable("Transactions", {
	id: serial().primaryKey(),
	type: typeTransaction().notNull(),
	bankId: integer().notNull().references(() => bank.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	hasNfe: boolean().default(false).notNull(),
	isDelete: boolean().default(false).notNull(),
	title: text().notNull(),
	companyId: integer().notNull().references(() => company.id, { onDelete: "restrict", onUpdate: "cascade" } ),
	createCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	updatedCuid: text().notNull().references(() => user.cuid, { onDelete: "restrict", onUpdate: "cascade" } ),
	eventId: text(),
	hasNotify: boolean().default(false).notNull(),
	cartId: integer(),
	orderId: integer(),
	total: integer().default(0).notNull(),
	content: jsonb(),
});

export const user = pgTable("User", {
	cuid: text().primaryKey(),
	email: text().notNull(),
	name: text().notNull(),
	nickname: text().notNull(),
	role: role().notNull(),
	isEnable: boolean().default(false).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	avatarUrl: text().notNull(),
	password: text().notNull(),
	emailVerified: boolean().default(false).notNull(),
	image: text(),
}, (table) => [
	uniqueIndex("User_email_key").using("btree", table.email.asc().nullsLast()),
	uniqueIndex("User_nickname_key").using("btree", table.nickname.asc().nullsLast()),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp({ precision: 3 }).notNull(),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const work = pgTable("Work", {
	id: serial().primaryKey(),
	total: doublePrecision().notNull(),
	orderId: integer().notNull().references(() => order.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	docCuid: text().references(() => doc.cuid, { onDelete: "cascade", onUpdate: "cascade" } ),
	otherValues: jsonb().array().default(sql`ARRAY[]`),
	createdAt: timestamp({ precision: 3 }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updatedAt: timestamp({ precision: 3 }).notNull(),
	updatedByCuid: text().notNull(),
	flag: text().default("Desconhecido").notNull(),
	date: jsonb(),
	title: text().notNull(),
	content: jsonb(),
	archives: jsonb().array().default(sql`ARRAY[]`),
	open: boolean().default(false).notNull(),
	orderN: integer().default(0).notNull(),
	disabled: boolean().default(false).notNull(),
});
