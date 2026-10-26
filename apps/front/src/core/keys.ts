import type { QueryFindManyChannelsSchema } from "@fieldlink/contracts";

export const KEYS = {
	customers: {
		findMany: () => ["find-many-customers"],
	} as const,

	channels: {
		all: ["channels"] as const,
		findMany: (filters: QueryFindManyChannelsSchema = {}) =>
			[...KEYS.channels.all, "find-many", filters] as const,
	} as const,
} as const;
