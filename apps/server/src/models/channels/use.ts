import type {
	queryFindManyChannelsSchema,
	UpsertChannel,
} from "@fieldlink/contracts";
import { db, eq, schema } from "@fieldlink/database";
import z from "zod";

const KHZ = 1_000;

const frequencyWindow = (centerHz: number, spacingInKHz: number) => {
	const delta = Math.round(spacingInKHz * KHZ);
	return { gte: Math.max(0, centerHz - delta), lte: centerHz + delta };
};

export const getChannels = async (
	filters: Partial<z.infer<typeof queryFindManyChannelsSchema>> = {},
) => {
	const { rx, tx, spacingInKHz = 25 } = filters;
	const term = filters?.search?.replace(/[%_\\]/g, "\\$&");

	const query = await db.query.channels.findMany({
		where: {
			...(filters?.mode && { mode: filters?.mode }),
			...(filters?.customerId && { customerId: filters?.customerId }),
			...(rx !== undefined && { rx: frequencyWindow(rx, spacingInKHz) }),
			...(tx !== undefined && { tx: frequencyWindow(tx, spacingInKHz) }),
			...(term && {
				OR: [
					{ title: { ilike: `%${term}%` } },
					{ description: { ilike: `%${term}%` } },
				],
			}),
		},
		with: {
			digital: true,
			analog: true,
			customer: true,
			updater: { columns: { id: true, name: true } },
		},
	});

	return query;
};

export const upsertChannel = async ({ id, ...data }: UpsertChannel) => {
	const channels = schema.channels;
	const channelsDigital = schema.digitalChannels;
	const channelsAnalog = schema.analogChannels;

	const mutation = await db.transaction(async (tx_) => {
		const [channel] = await tx_
			.insert(channels)
			.values({
				...(id && { id: id }),
				mode: data.mode,
				title: data.title,
				description: data.description,
				customerId: data.customerId,
				rx: data.rx,
				tx: data.tx,
				createdBy: data.actorId,
				updatedBy: data.actorId,
			})
			.onConflictDoUpdate({
				target: channels.id,
				set: {
					mode: data.mode,
					title: data.title,
					description: data.description,
					customerId: data.customerId,
					rx: data.rx,
					tx: data.tx,
					updatedBy: data.actorId,
				},
			})
			.returning();

		if (data.mode === "DIGITAL") {
			const values = {
				channelId: channel.id,
				colorCode: data.colorCode,
				slot: data.slot,
				protocol: data.protocol,
				talkgroupId: data.talkgroup,
			};

			await tx_
				.insert(channelsDigital)
				.values(values)
				.onConflictDoUpdate({
					target: channelsDigital.channelId,
					set: { ...values, updatedAt: new Date() },
				});

			await tx_
				.delete(channelsAnalog)
				.where(eq(channelsAnalog.channelId, channel.id));
		}
		if (data.mode === "ANALOG") {
			const values = {
				channelId: channel.id,
				squelchMode: data.squelchMode,
				txToneHz: data.txToneHz?.toString() ?? null,
				rxToneHz: data.rxToneHz?.toString() ?? null,
				txDcsCode: data.txDcsCode ?? null,
				rxDcsCode: data.rxDcsCode ?? null,
			};

			await tx_
				.insert(channelsAnalog)
				.values(values)
				.onConflictDoUpdate({
					target: channelsAnalog.channelId,
					set: { ...values, updatedAt: new Date() },
				});

			await tx_
				.delete(channelsDigital)
				.where(eq(channelsDigital.channelId, channel.id));
		}

		return channel;
	});

	if (!mutation) {
		throw new Error("Error to upsert channel");
	}

	return mutation;
};
