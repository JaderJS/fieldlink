import { defineRelations, defineRelationsPart } from "drizzle-orm";
import { authRelations } from "./auth/relations";
import * as schema from "./index";

// import { stationRelations } from "./stations/relations";

const main = defineRelations(schema, (r) => ({
	stations: {
		groups: r.many.channelGroups({
			from: r.stations.id.through(r.stationToGroups.stationId),
			to: r.channelGroups.id.through(r.stationToGroups.channelGroupId),
		}),
	},
	orders: {
		works: r.many.works({
			from: r.orders.id,
			to: r.works.orderId,
		}),
	},
	channels: {
		digital: r.one.digitalChannels({
			from: r.channels.id,
			to: r.digitalChannels.channelId,
		}),
		analog: r.one.analogChannels({
			from: r.channels.id,
			to: r.analogChannels.channelId,
		}),
		updater: r.one.user({
			from: r.channels.updatedBy,
			to: r.user.id,
			alias: "channel_updater",
		}),
		customer: r.one.customers({
			from: r.channels.customerId,
			to: r.customers.id,
		}),
	},
	user: {
		updatedChannels: r.many.channels({
			from: r.user.id,
			to: r.channels.updatedBy,
			alias: "channel_updater",
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
