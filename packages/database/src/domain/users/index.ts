import { user } from "@/db"
import { db } from "@/main";
import { eq } from "drizzle-orm";

export const createUser = async (
	data: typeof user.$inferInsert,
) => {
	const [createdUser] = await db
		.insert(user)
		.values(data)
		.returning();

	return createdUser;
};

export const getUsers = async () => {
	return db.query.user.findMany();
};

export const deleteUser = async (id: string) => {
	const [deletedUser] = await db
		.delete(user)
		.where(eq(user.id, id))
		.returning();

	return deletedUser;
};
