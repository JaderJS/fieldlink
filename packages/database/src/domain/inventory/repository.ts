import type { Db } from "@fieldlink/events/types";
import { and, eq, sql } from "drizzle-orm";
import { inventoryLevels } from "@/db";
import type { schema } from "@/main";

export type InventoryLevels = typeof schema.inventoryLevels.$inferSelect;

interface ItemKey {
	warehouseId: string;
	sku: string;
}

export interface InventoryRepository {
	find(warehouseId: string, sku: string): Promise<InventoryLevels | undefined>;

	applyDelta(
		input: ItemKey & { delta: number; version: number; at: Date },
	): Promise<void>;

	setQuantity(
		input: ItemKey & { quantity: number; version: number; at: Date },
	): Promise<void>;

	deleteAll(): Promise<void>;
}

export function inventoryLevelsRepository(tx: Db): InventoryRepository {
	const target = [inventoryLevels.warehouseId, inventoryLevels.sku];

	return {
		async find(warehouseId, sku) {
			const [row] = await tx
				.select()
				.from(inventoryLevels)
				.where(
					and(
						eq(inventoryLevels.warehouseId, warehouseId),
						eq(inventoryLevels.sku, sku),
					),
				);
			return row;
		},

		async applyDelta({ warehouseId, sku, delta, version, at }) {
			await tx
				.insert(inventoryLevels)
				.values({ warehouseId, sku, quantity: delta, version })
				.onConflictDoUpdate({
					target,
					set: {
						quantity: sql`${inventoryLevels.quantity} + ${delta}`,
						version,
						updatedAt: at,
					},
				});
		},

		async setQuantity({ warehouseId, sku, quantity, version, at }) {
			await tx
				.insert(inventoryLevels)
				.values({ warehouseId, sku, quantity, version })
				.onConflictDoUpdate({
					target,
					set: { quantity, version, updatedAt: at },
				});
		},

		async deleteAll() {
			await tx.delete(inventoryLevels);
		},
	};
}
