import { inventoryLevelsRepository } from "@fieldlink/database/repository/inventory";
import type { EventStore } from "@fieldlink/events";
import type { Db, Projection } from "@fieldlink/events/types";
import { parseStockItemId, STOCK_STREAM } from "./aggregate";
import type { StockEvent } from "./events";

export const inventoryLevelProjection: Projection<StockEvent> = {
	name: "stock_levels",
	streamType: [STOCK_STREAM],
	async handle(event, tx) {
		const levels = inventoryLevelsRepository(tx);
		const { warehouseId, sku } = parseStockItemId(event.streamId);
		const common = {
			warehouseId,
			sku,
			version: event.version,
			at: event.occuredAt,
		};

		switch (event.type) {
			case "StockReceived": {
				await levels.applyDelta({ ...common, delta: event.payload.quantity });
				break;
			}

			case "StockIssued": {
				console.log(event.payload.quantity);
				await levels.applyDelta({ ...common, delta: -event.payload.quantity });
				break;
			}

			case "StockCounted": {
				await levels.setQuantity({
					...common,
					quantity: event.payload.countedQuantity,
				});
				break;
			}
		}
	},
};

export async function rebuildInventoryLevels(db: Db, store: EventStore) {
	await db.transaction(async (tx) => {
		await inventoryLevelsRepository(tx).deleteAll();
		for await (const event of store.readAll<StockEvent>({
			streamType: STOCK_STREAM,
		})) {
			await inventoryLevelProjection.handle(event, tx);
		}
	});
}
