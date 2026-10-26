import type { DomainEvent } from "@fieldlink/events/types";

export const issueReasons = [
	"SALE",
	"LOS",
	"RETURN_TO_SUPPLIER",
	"INTERNAL_USE",
] as const;

export type IssueReason = (typeof issueReasons)[number];

export type StockReceived = DomainEvent<
	"StockReceived",
	{ quantity: number; reference?: string }
>;

export type StockIssued = DomainEvent<
	"StockIssued",
	{ quantity: number; reason: IssueReason; reference?: string }
>;

export type StockCounted = DomainEvent<
	"StockCounted",
	{ previousQuantity: number; countedQuantity: number }
>;

export type StockEvent = StockReceived | StockIssued | StockCounted;
