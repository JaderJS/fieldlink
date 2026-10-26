import { db } from "@fieldlink/database";

export const getCustomer = async (id: string) => {
	return await db.query.customers.findFirst({ where: { id: id } });
};
