import type { UpsertCustomerInput } from "@fieldlink/contracts";
import { db, schema } from "@fieldlink/database";

export const upsertCustomer = async ({ id, name }: UpsertCustomerInput) => {
	const customers = schema.customers;
	const [mutation] = await db
		.insert(customers)
		.values({
			...(id && { id }),
			name,
		})
		.onConflictDoUpdate({ target: customers.id, set: { name: name } })
		.returning();

	if (!mutation) throw new Error("Failed to upsert customer");

	return mutation;
};
