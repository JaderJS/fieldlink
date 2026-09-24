import { afterAll, beforeAll, describe, expect, test } from "bun:test";
import { eq } from "drizzle-orm";
import { customers, orders, user } from "@/db";
import { getOrders, upsertOrder } from "@/domain/orders/orders";
import { db } from "@/main";

describe("populate orders", () => {
	let userId: string;
	let customerId: string;

	beforeAll(async () => {
		const integer = Math.round(Math.random() * 1000);
		const [userMutation] = await db
			.insert(user)
			.values({
				email: `jader.jader${integer}@gmail.com`,
				name: `jader.jader${integer}`,
			})
			.returning({
				id: user.id,
			});
		if (!userMutation) throw new Error("userMutation is undefined");
		userId = userMutation?.id;

		const [customerMutation] = await db
			.insert(customers)
			.values({
				name: `Jader${integer}`,
			})
			.returning({
				id: customers.id,
			});

		if (!customerMutation) throw new Error("customerMutation is undefined");
		customerId = customerMutation.id;
	});

  afterAll(async () => {
    const query = await getOrders();
    console.log(query)
    await db.delete(orders);

		await db.delete(customers).where(eq(customers.id, customerId));
			await db.delete(user).where(eq(user.id, userId));
		});

  test("should create an order", async () => {
   const result= await upsertOrder({
      actorId: userId,
      customerId: customerId,
      name: "Test Order",
      description: "Test order description",
      content: {
        type:"test"
      },
      otherItems: [],
      sells: [],
      total: 1000,
      transactions: [],
      works: [{ items: [], otherItems: [], total: 1000, name: "Test Work"}],
    })

   expect(result).toBeDefined();
		expect(result?.name).toBe("Test Order");
		expect(result?.customerId).toBe(customerId);
		expect(result?.total).toBe(1000);
		expect(result?.createdById).toBe(userId);
		expect(result?.updatedById).toBe(userId);
		expect(result?.paid).toBe(false);
	});
});
