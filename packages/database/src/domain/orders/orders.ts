  import type z from "zod";
  import { orders, works } from "@/db/orders/tables";
  import { db } from "@/main";
  import { ConflictError } from "./errors";
  import type { upsertOrderSchema } from "./schemas/upsert.orders.schema";

  export const getOrders = async () => {
  	return await db.query.orders.findMany({
  		with: {
  			works: true,
  		},
  	});
  };

  export const upsertOrder = async (
    order: z.infer<typeof upsertOrderSchema>,
  ) => {
    const mutation = await db.transaction(async (tx) => {
      const [orderMutation] = await tx
        .insert(orders)
        .values({
          ...(order.id && { id: order.id }),
          customerId: order.customerId,
          name: order.name,
          paid: false,
          total: order.total,
          content: order.content,
          description: order.description,
          createdById: order.actorId,
          updatedById: order.actorId,
        })
        .onConflictDoUpdate({
          target: orders.id,
          set: {
            customerId: order.customerId,
            name: order.name,
            total: order.total,
            content: order.content,
            description: order.description,
            updatedById: order.actorId,
            updatedAt: new Date(),
          },
        })
        .returning();

      if (!orderMutation) {
        throw new ConflictError("Error to upsert order");
      }

      await Promise.all(
        order.works.map((work, index) =>
          tx.insert(works).values({
            name: work.name,
            orderId: orderMutation.id,
            total: 0,
            order: index,
          }),
        ),
      );

      return orderMutation;
    });

    const insertedWorks = await db.query.works.findMany();

    console.log("INSERTED WORKS:", insertedWorks);

    return mutation;
  };
