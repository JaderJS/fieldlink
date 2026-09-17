import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	archivesInBase: {
		equipmentInBases: r.many.equipmentInBase({
			from: r.archivesInBase.cuid.through(r.archivesToEquipmentInBase.a),
			to: r.equipmentInBase.id.through(r.archivesToEquipmentInBase.b)
		}),
		transactionsInBases: r.many.transactionsInBase({
			from: r.archivesInBase.cuid.through(r.archivesToTransactionsInBase.a),
			to: r.transactionsInBase.id.through(r.archivesToTransactionsInBase.b)
		}),
		workInBases: r.many.workInBase({
			from: r.archivesInBase.cuid.through(r.archivesToWorkInBase.a),
			to: r.workInBase.id.through(r.archivesToWorkInBase.b)
		}),
		userInBaseCreatedCuid: r.one.userInBase({
			from: r.archivesInBase.createdCuid,
			to: r.userInBase.cuid,
			alias: "archivesInBase_createdCuid_userInBase_cuid"
		}),
		userInBaseOwnerCuid: r.one.userInBase({
			from: r.archivesInBase.ownerCuid,
			to: r.userInBase.cuid,
			alias: "archivesInBase_ownerCuid_userInBase_cuid"
		}),
		userInBaseUpdatedCuid: r.one.userInBase({
			from: r.archivesInBase.updatedCuid,
			to: r.userInBase.cuid,
			alias: "archivesInBase_updatedCuid_userInBase_cuid"
		}),
	},
	equipmentInBase: {
		archivesInBases: r.many.archivesInBase(),
		channelSchemaInBases: r.many.channelSchemaInBase(),
		stationInBases: r.many.stationInBase({
			from: r.equipmentInBase.id.through(r.equipmentToStationInBase.a),
			to: r.stationInBase.id.through(r.equipmentToStationInBase.b)
		}),
		productInBase: r.one.productInBase({
			from: r.equipmentInBase.productId,
			to: r.productInBase.id
		}),
	},
	transactionsInBase: {
		archivesInBases: r.many.archivesInBase(),
		categoryTransactionInBases: r.many.categoryTransactionInBase(),
		transactionGroupInBases: r.many.transactionGroupInBase(),
		bankInBase: r.one.bankInBase({
			from: r.transactionsInBase.bankId,
			to: r.bankInBase.id
		}),
		cartInBase: r.one.cartInBase({
			from: r.transactionsInBase.cartId,
			to: r.cartInBase.id
		}),
		companyInBase: r.one.companyInBase({
			from: r.transactionsInBase.companyId,
			to: r.companyInBase.id
		}),
		userInBaseCreateCuid: r.one.userInBase({
			from: r.transactionsInBase.createCuid,
			to: r.userInBase.cuid,
			alias: "transactionsInBase_createCuid_userInBase_cuid"
		}),
		orderInBase: r.one.orderInBase({
			from: r.transactionsInBase.orderId,
			to: r.orderInBase.id
		}),
		transactionsInBase: r.one.transactionsInBase({
			from: r.transactionsInBase.parentTransactionId,
			to: r.transactionsInBase.id,
			alias: "transactionsInBase_parentTransactionId_transactionsInBase_id"
		}),
		transactionsInBases: r.many.transactionsInBase({
			alias: "transactionsInBase_parentTransactionId_transactionsInBase_id"
		}),
		periodInBase: r.one.periodInBase({
			from: r.transactionsInBase.periodId,
			to: r.periodInBase.id
		}),
		serviceInBase: r.one.serviceInBase({
			from: r.transactionsInBase.serviceId,
			to: r.serviceInBase.id
		}),
		userInBaseUpdatedCuid: r.one.userInBase({
			from: r.transactionsInBase.updatedCuid,
			to: r.userInBase.cuid,
			alias: "transactionsInBase_updatedCuid_userInBase_cuid"
		}),
	},
	workInBase: {
		archivesInBases: r.many.archivesInBase(),
		otherValuesInBases: r.many.otherValuesInBase(),
	},
	cartInBase: {
		otherValuesInBases: r.many.otherValuesInBase({
			from: r.cartInBase.id.through(r.cartToOtherValuesInBase.a),
			to: r.otherValuesInBase.id.through(r.cartToOtherValuesInBase.b)
		}),
		productInBases: r.many.productInBase({
			from: r.cartInBase.id.through(r.productsOnCartInBase.cartId),
			to: r.productInBase.id.through(r.productsOnCartInBase.productId)
		}),
		transactionsInBases: r.many.transactionsInBase(),
	},
	otherValuesInBase: {
		cartInBases: r.many.cartInBase(),
		orderInBases: r.many.orderInBase(),
		workInBases: r.many.workInBase({
			from: r.otherValuesInBase.id.through(r.otherValuesToWorkInBase.a),
			to: r.workInBase.id.through(r.otherValuesToWorkInBase.b)
		}),
	},
	categoryTransactionInBase: {
		transactionsInBases: r.many.transactionsInBase({
			from: r.categoryTransactionInBase.id.through(r.categoryTransactionToTransactionsInBase.a),
			to: r.transactionsInBase.id.through(r.categoryTransactionToTransactionsInBase.b)
		}),
	},
	channelSchemaInBase: {
		equipmentInBases: r.many.equipmentInBase({
			from: r.channelSchemaInBase.id.through(r.channelSchemaToEquipmentInBase.a),
			to: r.equipmentInBase.id.through(r.channelSchemaToEquipmentInBase.b)
		}),
		stationInBases: r.many.stationInBase({
			from: r.channelSchemaInBase.id.through(r.channelAnalogOnChannelSchemaInBase.channelSchemaId),
			to: r.stationInBase.id.through(r.channelAnalogOnChannelSchemaInBase.stationId)
		}),
		channelDigitalOnChannelSchemaInBases: r.many.channelDigitalOnChannelSchemaInBase(),
	},
	stationInBase: {
		equipmentInBases: r.many.equipmentInBase(),
		groupInBases: r.many.groupInBase(),
		channelSchemaInBases: r.many.channelSchemaInBase(),
		channelDigitalOnChannelSchemaInBases: r.many.channelDigitalOnChannelSchemaInBase(),
		propertyInBase: r.one.propertyInBase({
			from: r.stationInBase.propertyId,
			to: r.propertyInBase.id
		}),
		stationAnalogInBases: r.one.stationAnalogInBase(),
		stationDigitalInBases: r.one.stationDigitalInBase(),
	},
	groupInBase: {
		stationInBases: r.many.stationInBase({
			from: r.groupInBase.id.through(r.groupToStationInBase.a),
			to: r.stationInBase.id.through(r.groupToStationInBase.b)
		}),
		channelDigitalOnChannelSchemaInBases: r.many.channelDigitalOnChannelSchemaInBase(),
	},
	orderInBase: {
		otherValuesInBases: r.many.otherValuesInBase({
			from: r.orderInBase.id.through(r.orderToOtherValuesInBase.a),
			to: r.otherValuesInBase.id.through(r.orderToOtherValuesInBase.b)
		}),
		clientInBase: r.one.clientInBase({
			from: r.orderInBase.clientId,
			to: r.clientInBase.id
		}),
		productInBases: r.many.productInBase({
			from: r.orderInBase.id.through(r.productsOnOrderInBase.orderId),
			to: r.productInBase.id.through(r.productsOnOrderInBase.productId)
		}),
		transactionsInBases: r.many.transactionsInBase(),
		serviceInBases: r.many.serviceInBase({
			from: r.orderInBase.id.through(r.workInBase.orderId),
			to: r.serviceInBase.id.through(r.workInBase.serviceId)
		}),
	},
	userInBase: {
		archivesInBasesCreatedCuid: r.many.archivesInBase({
			alias: "archivesInBase_createdCuid_userInBase_cuid"
		}),
		archivesInBasesOwnerCuid: r.many.archivesInBase({
			alias: "archivesInBase_ownerCuid_userInBase_cuid"
		}),
		archivesInBasesUpdatedCuid: r.many.archivesInBase({
			alias: "archivesInBase_updatedCuid_userInBase_cuid"
		}),
		bankInBases: r.many.bankInBase(),
		supplierInBases: r.many.supplierInBase({
			from: r.userInBase.cuid.through(r.cartInBase.assignedCuid),
			to: r.supplierInBase.id.through(r.cartInBase.supplierId)
		}),
		companyInBases: r.many.companyInBase(),
		dailyInBases: r.many.dailyInBase(),
		productInBasesCreateCuid: r.many.productInBase({
			alias: "productInBase_createCuid_userInBase_cuid"
		}),
		productInBasesUpdatedCuid: r.many.productInBase({
			alias: "productInBase_updatedCuid_userInBase_cuid"
		}),
		productInBasesViaProductPriceHistoryInBase: r.many.productInBase({
			from: r.userInBase.cuid.through(r.productPriceHistoryInBase.createdCuid),
			to: r.productInBase.id.through(r.productPriceHistoryInBase.productId),
			alias: "userInBase_cuid_productInBase_id_via_productPriceHistoryInBase"
		}),
		transactionsInBasesCreateCuid: r.many.transactionsInBase({
			alias: "transactionsInBase_createCuid_userInBase_cuid"
		}),
		transactionsInBasesUpdatedCuid: r.many.transactionsInBase({
			alias: "transactionsInBase_updatedCuid_userInBase_cuid"
		}),
	},
	bankInBase: {
		userInBase: r.one.userInBase({
			from: r.bankInBase.ownerCuid,
			to: r.userInBase.cuid
		}),
		transactionsInBases: r.many.transactionsInBase(),
	},
	supplierInBase: {
		userInBases: r.many.userInBase(),
	},
	channelDigitalOnChannelSchemaInBase: {
		channelSchemaInBase: r.one.channelSchemaInBase({
			from: r.channelDigitalOnChannelSchemaInBase.channelSchemaId,
			to: r.channelSchemaInBase.id
		}),
		groupInBase: r.one.groupInBase({
			from: r.channelDigitalOnChannelSchemaInBase.groupId,
			to: r.groupInBase.id
		}),
		stationInBase: r.one.stationInBase({
			from: r.channelDigitalOnChannelSchemaInBase.stationId,
			to: r.stationInBase.id
		}),
	},
	companyInBase: {
		userInBase: r.one.userInBase({
			from: r.companyInBase.ownerCuid,
			to: r.userInBase.cuid
		}),
		transactionsInBases: r.many.transactionsInBase(),
	},
	dailyInBase: {
		userInBase: r.one.userInBase({
			from: r.dailyInBase.ownerCuid,
			to: r.userInBase.cuid
		}),
	},
	productInBase: {
		equipmentInBases: r.many.equipmentInBase(),
		productCategoryInBase: r.one.productCategoryInBase({
			from: r.productInBase.categoryId,
			to: r.productCategoryInBase.id
		}),
		userInBaseCreateCuid: r.one.userInBase({
			from: r.productInBase.createCuid,
			to: r.userInBase.cuid,
			alias: "productInBase_createCuid_userInBase_cuid"
		}),
		userInBaseUpdatedCuid: r.one.userInBase({
			from: r.productInBase.updatedCuid,
			to: r.userInBase.cuid,
			alias: "productInBase_updatedCuid_userInBase_cuid"
		}),
		userInBases: r.many.userInBase({
			alias: "userInBase_cuid_productInBase_id_via_productPriceHistoryInBase"
		}),
		cartInBases: r.many.cartInBase(),
		orderInBases: r.many.orderInBase(),
	},
	clientInBase: {
		orderInBases: r.many.orderInBase(),
		propertyInBases: r.many.propertyInBase(),
		serviceInBases: r.many.serviceInBase(),
	},
	productCategoryInBase: {
		productInBases: r.many.productInBase(),
		productCategoryInBase: r.one.productCategoryInBase({
			from: r.productCategoryInBase.parentCategoryId,
			to: r.productCategoryInBase.id,
			alias: "productCategoryInBase_parentCategoryId_productCategoryInBase_id"
		}),
		productCategoryInBases: r.one.productCategoryInBase({
			alias: "productCategoryInBase_parentCategoryId_productCategoryInBase_id"
		}),
	},
	propertyInBase: {
		clientInBase: r.one.clientInBase({
			from: r.propertyInBase.clientId,
			to: r.clientInBase.id
		}),
		stationInBases: r.many.stationInBase(),
	},
	serviceInBase: {
		clientInBase: r.one.clientInBase({
			from: r.serviceInBase.clientId,
			to: r.clientInBase.id
		}),
		transactionsInBases: r.many.transactionsInBase(),
		orderInBases: r.many.orderInBase(),
	},
	stationAnalogInBase: {
		stationInBase: r.one.stationInBase({
			from: r.stationAnalogInBase.stationId,
			to: r.stationInBase.id
		}),
	},
	stationDigitalInBase: {
		stationInBase: r.one.stationInBase({
			from: r.stationDigitalInBase.stationId,
			to: r.stationInBase.id
		}),
	},
	transactionGroupInBase: {
		transactionsInBase: r.one.transactionsInBase({
			from: r.transactionGroupInBase.transactionId,
			to: r.transactionsInBase.id
		}),
	},
	periodInBase: {
		transactionsInBases: r.many.transactionsInBase(),
	},
	archives: {
		equipment: r.many.equipment({
			from: r.archives.cuid.through(r.archivesToEquipment.a),
			to: r.equipment.id.through(r.archivesToEquipment.b)
		}),
		installments: r.many.installments({
			from: r.archives.cuid.through(r.archivesToInstallment.a),
			to: r.installments.id.through(r.archivesToInstallment.b)
		}),
		transactions: r.many.transactions({
			from: r.archives.cuid.through(r.archivesToTransactions.a),
			to: r.transactions.id.through(r.archivesToTransactions.b)
		}),
		userCreatedCuid: r.one.user({
			from: r.archives.createdCuid,
			to: r.user.cuid,
			alias: "archives_createdCuid_user_cuid"
		}),
		userOwnerCuid: r.one.user({
			from: r.archives.ownerCuid,
			to: r.user.cuid,
			alias: "archives_ownerCuid_user_cuid"
		}),
		userUpdatedCuid: r.one.user({
			from: r.archives.updatedCuid,
			to: r.user.cuid,
			alias: "archives_updatedCuid_user_cuid"
		}),
	},
	equipment: {
		archives: r.many.archives(),
		channelSchemas: r.many.channelSchema(),
		stations: r.many.station({
			from: r.equipment.id.through(r.equipmentToStation.a),
			to: r.station.id.through(r.equipmentToStation.b)
		}),
		product: r.one.product({
			from: r.equipment.productId,
			to: r.product.id
		}),
	},
	installments: {
		archives: r.many.archives(),
		userCreatedCuid: r.one.user({
			from: r.installments.createdCuid,
			to: r.user.cuid,
			alias: "installments_createdCuid_user_cuid"
		}),
		period: r.one.period({
			from: r.installments.periodId,
			to: r.period.id
		}),
		transaction: r.one.transactions({
			from: r.installments.transactionId,
			to: r.transactions.id
		}),
		userUpdatedCuid: r.one.user({
			from: r.installments.updatedCuid,
			to: r.user.cuid,
			alias: "installments_updatedCuid_user_cuid"
		}),
	},
	transactions: {
		archives: r.many.archives(),
		categoryTransactions: r.many.categoryTransaction(),
		suppliers: r.many.supplier(),
		installments: r.many.installments(),
		orders: r.one.order(),
		bank: r.one.bank({
			from: r.transactions.bankId,
			to: r.bank.id
		}),
		company: r.one.company({
			from: r.transactions.companyId,
			to: r.company.id
		}),
		userCreateCuid: r.one.user({
			from: r.transactions.createCuid,
			to: r.user.cuid,
			alias: "transactions_createCuid_user_cuid"
		}),
		userUpdatedCuid: r.one.user({
			from: r.transactions.updatedCuid,
			to: r.user.cuid,
			alias: "transactions_updatedCuid_user_cuid"
		}),
	},
	categoryProduct: {
		products: r.many.product({
			from: r.categoryProduct.id.through(r.categoryProductToProduct.a),
			to: r.product.id.through(r.categoryProductToProduct.b)
		}),
	},
	product: {
		categoryProducts: r.many.categoryProduct(),
		equipment: r.many.equipment(),
		historyProducts: r.many.historyProduct(),
		carts: r.many.cart(),
		sales: r.many.sale({
			from: r.product.id.through(r.productsOnSales.productId),
			to: r.sale.id.through(r.productsOnSales.saleId)
		}),
	},
	categoryTransaction: {
		transactions: r.many.transactions({
			from: r.categoryTransaction.id.through(r.categoryTransactionToTransactions.a),
			to: r.transactions.id.through(r.categoryTransactionToTransactions.b)
		}),
	},
	channelSchema: {
		equipment: r.many.equipment({
			from: r.channelSchema.id.through(r.channelSchemaToEquipment.a),
			to: r.equipment.id.through(r.channelSchemaToEquipment.b)
		}),
		channelAnalogOnChannelSchemas: r.many.channelAnalogOnChannelSchema(),
		groups: r.many.group({
			from: r.channelSchema.id.through(r.channelDigitalOnChannelSchema.channelSchemaId),
			to: r.group.id.through(r.channelDigitalOnChannelSchema.groupId)
		}),
		station: r.one.station({
			from: r.channelSchema.stationId,
			to: r.station.id
		}),
	},
	station: {
		equipment: r.many.equipment(),
		groups: r.many.group(),
		channelSchemas: r.many.channelSchema(),
		property: r.one.property({
			from: r.station.propertyId,
			to: r.property.id
		}),
		stationAnalogs: r.one.stationAnalog(),
		stationDigitals: r.one.stationDigital(),
	},
	group: {
		stations: r.many.station({
			from: r.group.id.through(r.groupToStation.a),
			to: r.station.id.through(r.groupToStation.b)
		}),
		channelSchemas: r.many.channelSchema(),
	},
	sale: {
		works: r.many.work({
			from: r.sale.id.through(r.saleToWork.a),
			to: r.work.id.through(r.saleToWork.b)
		}),
		products: r.many.product(),
		order: r.one.order({
			from: r.sale.orderId,
			to: r.order.id
		}),
	},
	work: {
		sales: r.many.sale(),
	},
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.cuid
		}),
	},
	user: {
		accounts: r.many.account(),
		archivesCreatedCuid: r.many.archives({
			alias: "archives_createdCuid_user_cuid"
		}),
		archivesOwnerCuid: r.many.archives({
			alias: "archives_ownerCuid_user_cuid"
		}),
		archivesUpdatedCuid: r.many.archives({
			alias: "archives_updatedCuid_user_cuid"
		}),
		banks: r.many.bank(),
		companies: r.many.company(),
		docsCreatedCuid: r.many.doc({
			alias: "doc_createdCuid_user_cuid"
		}),
		docsUpdatedCuid: r.many.doc({
			alias: "doc_updatedCuid_user_cuid"
		}),
		installmentsCreatedCuid: r.many.installments({
			alias: "installments_createdCuid_user_cuid"
		}),
		installmentsUpdatedCuid: r.many.installments({
			alias: "installments_updatedCuid_user_cuid"
		}),
		orders: r.many.order(),
		sessions: r.many.session(),
		transactionsCreateCuid: r.many.transactions({
			alias: "transactions_createCuid_user_cuid"
		}),
		transactionsUpdatedCuid: r.many.transactions({
			alias: "transactions_updatedCuid_user_cuid"
		}),
	},
	bank: {
		user: r.one.user({
			from: r.bank.ownerCuid,
			to: r.user.cuid
		}),
		transactions: r.many.transactions(),
	},
	supplier: {
		transactions: r.many.transactions({
			from: r.supplier.id.through(r.cart.supplierId),
			to: r.transactions.id.through(r.cart.transactionId)
		}),
	},
	channelAnalogOnChannelSchema: {
		channelSchema: r.one.channelSchema({
			from: r.channelAnalogOnChannelSchema.channelSchemaId,
			to: r.channelSchema.id
		}),
	},
	client: {
		doc: r.one.doc({
			from: r.client.docId,
			to: r.doc.cuid
		}),
		clientsMoreInfos: r.one.clientsMoreInfos(),
		orders: r.many.order(),
		properties: r.many.property(),
	},
	doc: {
		clients: r.many.client(),
		userCreatedCuid: r.one.user({
			from: r.doc.createdCuid,
			to: r.user.cuid,
			alias: "doc_createdCuid_user_cuid"
		}),
		docParentCuid: r.one.doc({
			from: r.doc.parentCuid,
			to: r.doc.cuid,
			alias: "doc_parentCuid_doc_cuid"
		}),
		docsParentCuid: r.many.doc({
			alias: "doc_parentCuid_doc_cuid"
		}),
		docTemplateCuid: r.one.doc({
			from: r.doc.templateCuid,
			to: r.doc.cuid,
			alias: "doc_templateCuid_doc_cuid"
		}),
		docsTemplateCuid: r.many.doc({
			alias: "doc_templateCuid_doc_cuid"
		}),
		userUpdatedCuid: r.one.user({
			from: r.doc.updatedCuid,
			to: r.user.cuid,
			alias: "doc_updatedCuid_user_cuid"
		}),
		ordersDocCuid: r.many.order({
			alias: "order_docCuid_doc_cuid"
		}),
		ordersViaWork: r.many.order({
			from: r.doc.cuid.through(r.work.docCuid),
			to: r.order.id.through(r.work.orderId),
			alias: "doc_cuid_order_id_via_work"
		}),
	},
	clientsMoreInfos: {
		client: r.one.client({
			from: r.clientsMoreInfos.clientId,
			to: r.client.id
		}),
	},
	company: {
		user: r.one.user({
			from: r.company.ownerCuid,
			to: r.user.cuid
		}),
		transactions: r.many.transactions(),
	},
	historyProduct: {
		product: r.one.product({
			from: r.historyProduct.productId,
			to: r.product.id
		}),
	},
	period: {
		installments: r.many.installments(),
	},
	order: {
		categoryOrder: r.one.categoryOrder({
			from: r.order.categoryId,
			to: r.categoryOrder.id
		}),
		client: r.one.client({
			from: r.order.clientId,
			to: r.client.id
		}),
		doc: r.one.doc({
			from: r.order.docCuid,
			to: r.doc.cuid,
			alias: "order_docCuid_doc_cuid"
		}),
		orderStatus: r.one.orderStatus({
			from: r.order.orderStatusId,
			to: r.orderStatus.id
		}),
		transaction: r.one.transactions({
			from: r.order.transactionId,
			to: r.transactions.id
		}),
		user: r.one.user({
			from: r.order.updatedByCuid,
			to: r.user.cuid
		}),
		sales: r.many.sale(),
		docs: r.many.doc({
			alias: "doc_cuid_order_id_via_work"
		}),
	},
	categoryOrder: {
		orders: r.many.order(),
	},
	orderStatus: {
		orders: r.many.order(),
	},
	cart: {
		products: r.many.product({
			from: r.cart.id.through(r.productsOnCarts.cartId),
			to: r.product.id.through(r.productsOnCarts.productId)
		}),
	},
	property: {
		client: r.one.client({
			from: r.property.clientId,
			to: r.client.id
		}),
		stations: r.many.station(),
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.cuid
		}),
	},
	stationAnalog: {
		station: r.one.station({
			from: r.stationAnalog.stationId,
			to: r.station.id
		}),
	},
	stationDigital: {
		station: r.one.station({
			from: r.stationDigital.stationId,
			to: r.station.id
		}),
	},
}))