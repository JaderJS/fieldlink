import { beforeEach, describe, expect, test } from "bun:test";
import { db, schema } from "@fieldlink/database";
import { createInventory } from "@/api";

const item = { warehouseId: "fieldlink", sku: "SKU-1" };

const inventory = createInventory({ db: db, maxRetries: 30 });

beforeEach(async () => {
	await db.delete(schema.events);
	await db.delete(schema.inventoryLevels);
});

describe("Regra de negócio Inventory", async () => {
	test("add registra a entrada e atualiza o inventario", async () => {
		const adds = Array.from({ length: 20 }).map((_, index) => {
			return inventory.add({
				...item,
				quantity: 2 * index,
				reference: "BF-25",
			});
		});
		await Promise.all(adds);

		await inventory.remove({
			...item,
			quantity: 2,
			reason: "SALE",
			reference: "BF-25",
		});

		const history = await inventory.history(item);
		console.log(history);
		expect(await inventory.balance(item)).toBe(418);
	}, 30_000);
});
