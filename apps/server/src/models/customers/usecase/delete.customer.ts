import { db, eq, schema } from "@fieldlink/database";

export const deleteCustomer = async (id: string) => {
	await db.delete(schema.customers).where(eq(schema.customers.id, id));
	return;
};
