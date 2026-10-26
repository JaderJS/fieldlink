import { db } from "@fieldlink/database";

export const getCustomers = async () => {
	const query = await db.query.customers.findMany();
	return query;
};
