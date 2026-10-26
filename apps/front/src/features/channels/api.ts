import {
	queryFindManyChannelsSchema,
	upsertChannelSchema,
} from "@fieldlink/contracts";
import type { Channel } from "@fieldlink/server/types";
import { createServerFn } from "@tanstack/react-start";
import { apiServer } from "@/lib/api";

export const getChannelsAPI = createServerFn({ method: "GET" })
	.validator(queryFindManyChannelsSchema)
	.handler(async ({ data: filters }) => {
		const { data } = await apiServer().get<{ channels: Channel[] }>(
			"/channels",
			{ params: filters },
		);
		return data;
	});

export const upsertChannelAPI = createServerFn({ method: "POST" })
	.validator(upsertChannelSchema)
	.handler(async ({ data: body }) => {
		const { data } = await apiServer().post<{ channel: Channel }>(
			"/channels",
			body,
		);
		return data;
	});
