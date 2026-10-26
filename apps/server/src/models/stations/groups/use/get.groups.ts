import { db } from "@fieldlink/database";

export const getGroups = async () => {
	return await db.query.channelGroups.findMany();
};
