import { defineRelations, defineRelationsPart } from "drizzle-orm";
import { authRelations } from "./auth/relations";
import * as schema from "./index";

// import { stationRelations } from "./stations/relations";

const main = defineRelations(schema, (r) => ({
	orders: {
		works: r.many.works({
			from: r.orders.id,
			to: r.works.orderId,
		}),
	},
}));

const mainRelations = defineRelationsPart(schema);

export const relations = {
	...main,
	// ...mainRelations,
	// ...authRelations,
	// ...stationRelations,
};
