import { channelGroupChannels, channelGroups } from "@/db";
import { db } from "@/main";

export async function createChannelGroup(data: {
	customerId: string;
	title: string;
	description?: string;
	actorId: string;
}) {
	const [group] = await db
		.insert(channelGroups)
		.values({
			customerId: data.customerId,
			title: data.title,
			description: data.description ?? null,
			createdBy: data.actorId,
			updatedBy: data.actorId,
		})
		.returning();

	return group;
}

export async function addChannelToGroup(data: {
	groupId: string;
	channelId: string;
	order?: number;
}) {
	const [result] = await db
		.insert(channelGroupChannels)
		.values({
			groupId: data.groupId,
			channelId: data.channelId,
			position: data.order ?? null,
		})
		.onConflictDoUpdate({
			target: [channelGroupChannels.groupId, channelGroupChannels.channelId],
			set: {
				position: data.order ?? null,
			},
		})
		.returning();

	return result;
}
