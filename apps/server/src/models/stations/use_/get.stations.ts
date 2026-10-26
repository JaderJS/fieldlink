import { db } from "@fieldlink/database";

export const getStation = async () => {
	return await db.query.stations.findMany({ with: { groups: true } });
};
