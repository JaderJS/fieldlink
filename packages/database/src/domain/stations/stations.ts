import { and, eq } from "drizzle-orm";
import { stationChannels, stations } from "../../db";
import { db } from "../../main";
import { NotFoundError } from "./errors";

export interface ICreateStation {
	customerId: string;
	title: string;
	latitude?: number;
	longitude?: number;
	mode: "ANALOG" | "DIGITAL" | "MIXED";
	actorId: string;
}

export interface IUpdateStation {
	id: string;
	latitude?: number;
	longitude?: number;
	mode?: "ANALOG" | "DIGITAL" | "MIXED";
	actorId: string;
}

export async function getStations() {
	const query = await db.select().from(stations);
	return query;
}

export async function createStation(data: ICreateStation) {
	return db.transaction(async (tx) => {
		const [station] = await tx
			.insert(stations)
			.values({
				customerId: data.customerId,
				latitude: data.latitude !== undefined ? String(data.latitude) : null,
				longitude: data.longitude !== undefined ? String(data.longitude) : null,
				mode: data.mode,
			})
			.returning();

		if (!station) throw new Error("Failed to create station");
	});
}

export async function updateStation(data: IUpdateStation) {
	return db.transaction(async (tx) => {
		const [station] = await db
			.select()
			.from(stations)
			.where(eq(stations.id, data.id))
			.limit(1);

		if (!station) {
			throw new NotFoundError("Station", data.id);
		}

		await tx
			.update(stations)
			.set({
				latitude: data.latitude !== undefined ? String(data.latitude) : null,
				longitude: data.longitude !== undefined ? String(data.longitude) : null,
				mode: data.mode,
			})
			.where(eq(stations.id, data.id));
	});
}

export async function attachChannelToStation({
	stationId,
	channelId,
	order,
	alias,
}: {
	stationId: string;
	channelId: string;
	order: number;
	alias?: string;
}) {
	const [result] = await db
		.insert(stationChannels)
		.values({
			channelId: channelId,
			stationId: stationId,
			alias: alias,
			position: order,
		})
		.onConflictDoUpdate({
			target: [stationChannels.stationId, stationChannels.channelId],
			set: {
				position: order,
				alias: alias,
				enabled: true,
			},
		})
		.returning();

	if (!result) throw new Error("Failed to attach channel to station");

	return result;
}

export async function detachChannelStation({
	stationId,
	channelId,
}: {
	stationId: string;
	channelId: string;
}) {
	await db
		.delete(stationChannels)
		.where(
			and(
				eq(stationChannels.stationId, stationId),
				eq(stationChannels.channelId, channelId),
			),
		);
}
