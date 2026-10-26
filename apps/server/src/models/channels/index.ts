import {
	queryFindManyChannelsSchema,
	upsertChannelSchema,
} from "@fieldlink/contracts";
import Elysia from "elysia";
import { coreAuth } from "../../core/auth/auth";
import { getChannels, upsertChannel } from "./use";

export const handleChannels = new Elysia({
	prefix: "/channels",
	tags: ["Channels"],
})
	.use(coreAuth)
	.get(
		"/",
		async ({ query }) => {
			const data = await getChannels(query);
			return { channels: data };
		},
		{ auth: true, query: queryFindManyChannelsSchema },
	)
	.post(
		"/",
		async ({ body, user }) => {
			const mutation = await upsertChannel({
				...body,
				customerId: body.customerId,
				actorId: user.id,
			});
			return { channel: mutation };
		},
		{
			auth: true,
			body: upsertChannelSchema,
		},
	);
