import { defineRelationsPart } from "drizzle-orm";

import { schema } from "./../../main";

// export const stationRelations = defineRelationsPart(schema, (r) => ({
// 	customers: {
// 		// stations: r.many.stations(),
// 		// channels: r.many.channels(),
// 		// channelGroups: r.many.channelGroups(),
// 		// talkgroups: r.many.talkgroups(),
// 		// equipments: r.many.equipments(),
// 	},

// 	stations: {
// 		customer: r.one.customers({
// 			from: r.stations.customerId,
// 			to: r.customers.id,
// 		}),

// 		channels: r.many.channels({
// 			from: r.stations.id.through(r.stationChannels.stationId),
// 			to: r.channels.id.through(r.stationChannels.channelId),
// 		}),

// 		versions: r.many.stationVersions(),

// 		// equipment: r.many.equipments({
// 		// 	from: r.stations.id.through(r.stationEquipments.stationId),
// 		// 	to: r.equipments.id.through(r.stationEquipments.equipmentId),
// 		// }),

// 		// stationEquipment: {
// 		//      station: r.one.stations({
// 		//        from: r.stationEquipment.stationId,
// 		//        to: r.stations.id,
// 		//      }),

// 		//      equipment: r.one.equipment({
// 		//        from: r.stationEquipment.equipmentId,
// 		//        to: r.equipment.id,
// 		//      }),
// 		//    },
// 		//  }),
// 	},

// 	channels: {
// 		customer: r.one.customers({
// 			from: r.channels.customerId,
// 			to: r.customers.id,
// 		}),

// 		digital: r.one.digitalChannels(),

// 		analog: r.one.analogChannels(),

// 		stationLinks: r.many.stationChannels(),

// 		stations: r.many.stations({
// 			from: r.channels.id.through(r.stationChannels.channelId),
// 			to: r.stations.id.through(r.stationChannels.stationId),
// 		}),

// 		groups: r.many.channelGroups({
// 			from: r.channels.id.through(r.channelGroupChannels.channelId),
// 			to: r.channelGroups.id.through(r.channelGroupChannels.groupId),
// 		}),

// 		// versions: r.many.channelVersions(),

// 		programmingProfiles: r.many.programmingProfiles({
// 			from: r.channels.id.through(r.programmingChannels.channelId),
// 			to: r.programmingProfiles.id.through(r.programmingChannels.profileId),
// 		}),
// 	},

// 	digitalChannels: {
// 		channel: r.one.channels({
// 			from: r.digitalChannels.channelId,
// 			to: r.channels.id,
// 		}),

// 		talkgroup: r.one.talkgroups({
// 			from: r.digitalChannels.talkgroupId,
// 			to: r.talkgroups.id,
// 		}),
// 	},

// 	analogChannels: {
// 		channel: r.one.channels({
// 			from: r.analogChannels.channelId,
// 			to: r.channels.id,
// 		}),
// 	},

// 	// channelVersions: {
// 	// 	channel: r.one.channels({
// 	// 		from: r.channelVersions.channelId,
// 	// 		to: r.channels.id,
// 	// 	}),
// 	// },

// 	channelGroups: {
// 		customer: r.one.customers({
// 			from: r.channelGroups.customerId,
// 			to: r.customers.id,
// 		}),

// 		channels: r.many.channels({
// 			from: r.channelGroups.id.through(r.channelGroupChannels.groupId),
// 			to: r.channels.id.through(r.channelGroupChannels.channelId),
// 		}),
// 	},

// 	channelGroupChannels: {
// 		group: r.one.channelGroups({
// 			from: r.channelGroupChannels.groupId,
// 			to: r.channelGroups.id,
// 		}),

// 		channel: r.one.channels({
// 			from: r.channelGroupChannels.channelId,
// 			to: r.channels.id,
// 		}),
// 	},

// 	talkgroups: {
// 		customer: r.one.customers({
// 			from: r.talkgroups.customerId,
// 			to: r.customers.id,
// 		}),

// 		channels: r.many.channels(),
// 	},

// 	equipmentModels: {
// 		equipment: r.many.equipments(),
// 	},
// 	equipment: {
// 		customer: r.one.customers({
// 			from: r.equipments.customerId,
// 			to: r.customers.id,
// 		}),

// 		model: r.one.equipmentModels({
// 			from: r.equipments.modelId,
// 			to: r.equipmentModels.id,
// 		}),

// 		profiles: r.many.programmingProfiles(),

// 		// stations: r.many.stations({
// 		// 	from: r.equipments.id.through(r.stationEquipment.equipmentId),
// 		// 	to: r.stations.id.through(r.stationEquipment.stationId),
// 		// }),
// 	},

// 	programmingProfiles: {
// 		equipment: r.one.equipments({
// 			from: r.programmingProfiles.equipmentId,
// 			to: r.equipments.id,
// 		}),

// 		channels: r.many.channels({
// 			from: r.programmingProfiles.id.through(r.programmingChannels.profileId),
// 			to: r.channels.id.through(r.programmingChannels.channelId),
// 		}),

// 		groups: r.many.channelGroups({
// 			from: r.programmingProfiles.id.through(r.programmingGroups.profileId),
// 			to: r.channelGroups.id.through(r.programmingGroups.groupId),
// 		}),

// 		programmingChannels: r.many.programmingChannels(),

// 		programmingGroups: r.many.programmingGroups(),
// 	},

// 	programmingChannels: {
// 		profile: r.one.programmingProfiles({
// 			from: r.programmingChannels.profileId,
// 			to: r.programmingProfiles.id,
// 		}),

// 		channel: r.one.channels({
// 			from: r.programmingChannels.channelId,
// 			to: r.channels.id,
// 		}),
// 	},

// 	programmingGroups: {
// 		profile: r.one.programmingProfiles({
// 			from: r.programmingGroups.profileId,
// 			to: r.programmingProfiles.id,
// 		}),

// 		group: r.one.channelGroups({
// 			from: r.programmingGroups.groupId,
// 			to: r.channelGroups.id,
// 		}),
// 	},
// }));
