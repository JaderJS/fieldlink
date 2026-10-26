import { inventoryLevelsRepository } from "@fieldlink/database/repository/inventory";
import { EventStore, execute, loadAggregate } from "@fieldlink/events";
import type { Db } from "@fieldlink/events/types";
import {
	count as countStock,
	issue,
	receive,
	STOCK_STREAM,
	type StockState,
	stockItem,
	stockItemId,
} from "./aggregate";
import type { IssueReason, StockEvent } from "./events";
import { inventoryLevelProjection, rebuildInventoryLevels } from "./projection";

interface Actor {
	actorId?: string;
}

export interface StockItemRef {
	warehouseId: string;
	sku: string;
}

export type HistoryEntry = StockEvent & {
	version: number;
	occurredAt: Date;
	actorId: string | null;
};

export interface Inventory {
	add(
		input: StockItemRef & { quantity: number; reference?: string } & Actor,
	): Promise<{ version: number }>;

	remove(
		input: StockItemRef & {
			quantity: number;
			reason: IssueReason;
			reference?: string;
		} & Actor,
	): Promise<{ version: number }>;

	count(
		input: StockItemRef & { countedQuantity: number } & Actor,
	): Promise<{ changed: boolean; version: number | null }>;

	balance(item: StockItemRef): Promise<number>;

	history(item: StockItemRef): Promise<HistoryEntry[]>;

	balanceAt(
		item: StockItemRef,
		at: { version?: number; asOf?: Date },
	): Promise<{ quantity: number; version: number }>;

	rebuild(): Promise<void>;
}

export function createInventory({
	db,
	maxRetries = 25,
}: {
	db: Db;
	maxRetries: number;
}): Inventory {
	const store = new EventStore(db).registerProjection(inventoryLevelProjection);
	const levels = inventoryLevelsRepository(db);

	const run = (
		item: StockItemRef,
		decide: (state: StockState) => StockEvent[],
		actorId?: string,
	) =>
		execute(store, stockItem, stockItemId(item.warehouseId, item.sku), decide, {
			maxRetries,
			metadata: actorId ? { actorId } : undefined,
		});

	return {
		async add({ warehouseId, sku, quantity, reference, actorId }) {
			const stored = await run(
				{ warehouseId, sku },
				receive({ quantity, reference }),
				actorId,
			);
			return { version: stored.at(-1)!.version };
		},

		async remove({ warehouseId, sku, quantity, reason, reference, actorId }) {
			const stored = await run(
				{ warehouseId, sku },
				issue({ quantity, reason, reference }),
				actorId,
			);
			return { version: stored.at(-1)!.version };
		},

		async count({ warehouseId, sku, countedQuantity, actorId }) {
			const stored = await run(
				{ warehouseId, sku },
				countStock({ countedQuantity }),
				actorId,
			);
			return {
				changed: stored.length > 0,
				version: stored.at(-1)?.version ?? null,
			};
		},

		async balance({ warehouseId, sku }) {
			return (await levels.find(warehouseId, sku))?.quantity ?? 0;
		},

		async history({ warehouseId, sku }) {
			const events = await store.load<StockEvent>(
				STOCK_STREAM,
				stockItemId(warehouseId, sku),
			);
			return events.map(
				(e) =>
					({
						type: e.type,
						payload: e.payload,
						version: e.version,
						occurredAt: e.occuredAt,
						actorId:
							typeof e.metadata.actorId === "string"
								? e.metadata.actorId
								: null,
					}) as HistoryEntry,
			);
		},

		async balanceAt({ warehouseId, sku }, at) {
			const { state, version } = await loadAggregate(
				store,
				stockItem,
				stockItemId(warehouseId, sku),
				at,
			);
			return { quantity: state.quantity, version };
		},

		rebuild: () => rebuildInventoryLevels(db, store),
	};
}
