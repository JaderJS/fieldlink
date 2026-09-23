import { eq } from "drizzle-orm";
import { customers } from "@/db";
import { db } from "@/main";
import { NotFoundError } from "./errors";

export type Customer = typeof customers.$inferSelect;

export async function getCustomers(): Promise<Customer[]> {
	const query = await db
		.select()
		.from(customers)

	return query
}

export const upsertCustomer = async ({ name }: { name: string }) => {
  const [customer] = await db
		.insert(customers)
		.values({
			name,
		})
		.onConflictDoUpdate({
			target: customers.name,
			set: {
				name,
			},
		})
		.returning();

	return customer;
};

export const deleteCustomer = async (id: string) => {
  const [query] = await db.select().from(customers).where(eq(customers.id, id)).limit(1)

  if (!query) {
    throw new NotFoundError("Customer", id)
  }

  await db.delete(customers).where(eq(customers.id, id))
};
