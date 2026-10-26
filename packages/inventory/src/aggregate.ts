import { DomainError } from "@fieldlink/events";
import type { Aggregate } from "@fieldlink/events/types";
import type { IssueReason, StockEvent } from "./events";

export const STOCK_STREAM = "STOCK_STREAM";

export const stockItemId = (warehouseId: string, sku: string) =>
	`${warehouseId}:${sku}`;

export function parseStockItemId(id: string) {
	const i = id.indexOf(":");
	return { warehouseId: id.slice(0, i), sku: id.slice(i + 1) };
}

export class InsufficientStockError extends DomainError {
	constructor(available: number, requested: number) {
		super(
			`Estoque insuficiente: disponível ${available}, solicitado ${requested}`,
		);
	}
}

export interface StockState {
	quantity: number;
}

export const stockItem: Aggregate<StockState, StockEvent> = {
	streamType: STOCK_STREAM,
	initialState: () => ({ quantity: 0 }),
	evolve: (state, event) => {
		switch (event.type) {
			case "StockReceived":
				return { quantity: state.quantity + event.payload.quantity };
			case "StockIssued":
				return { quantity: state.quantity - event.payload.quantity };
			case "StockCounted":
				return { quantity: event.payload.countedQuantity };
		}
	},
};

function assertPositiveInt(n: number, field: string) {
	if (!Number.isInteger(n) || n < 0) {
		throw new DomainError(`${field} deve ser um inteiro positivo`);
	}
}

export const receive =
	(cmd: { quantity: number; reference?: string }) =>
	(_state: StockState): StockEvent[] => {
		assertPositiveInt(cmd.quantity, "quantity");
		return [
			{
				type: "StockReceived",
				payload: { quantity: cmd.quantity, reference: cmd.reference },
			},
		];
	};

export const issue =
	(cmd: { quantity: number; reason: IssueReason; reference?: string }) =>
	(state: StockState): StockEvent[] => {
		assertPositiveInt(cmd.quantity, "quantity");
		if (state.quantity < cmd.quantity)
			throw new InsufficientStockError(state.quantity, cmd.quantity);

		return [
			{
				type: "StockIssued",
				payload: {
					quantity: cmd.quantity,
					reason: cmd.reason,
					reference: cmd.reference,
				},
			},
		];
	};

export const count =
	(cmd: { countedQuantity: number }) =>
	(state: StockState): StockEvent[] => {
		if (!Number.isInteger(cmd.countedQuantity) || cmd.countedQuantity < 0) {
			throw new DomainError("countedQuantity deve ser um inteiro >=0");
		}

		if (cmd.countedQuantity === state.quantity) return [];

		return [
			{
				type: "StockCounted",
				payload: {
					previousQuantity: state.quantity,
					countedQuantity: cmd.countedQuantity,
				},
			},
		];
	};
