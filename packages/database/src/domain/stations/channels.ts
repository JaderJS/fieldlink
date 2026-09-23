import { analogChannels, channels, digitalChannels } from "@/db";
import { db } from "@/main";
import { ValidationError } from "./errors";

interface IChannelBase {
	customerId: string;
	title: string;
	rx: number;
	tx: number;
	description?: string;
	actorId: string;
}

interface IDigitalChannel {
	mode: "DIGITAL";
	protocol: "DMR" | "P25" | "DSTAR" | "OTHER";
	colorCode: number;
	slot: number;
	talkgroupId?: string;
}
interface IAnalogChannelCarrier {
	mode: "ANALOG";
	squelchMode: "CARRIER";
}

interface IAnalogChannelCTCSS {
	mode: "ANALOG";
	squelchMode: "CTCSS";
	txToneHz: number;
	rxToneHz: number;
}

interface IAnalogChannelDCS {
	mode: "ANALOG";
	squelchMode: "DCS";
	txDcsCode: number;
	rxDcsCode: number;
}

export type ICreateChannel = IChannelBase &
	(
		| IDigitalChannel
		| IAnalogChannelCarrier
		| IAnalogChannelCTCSS
		| IAnalogChannelDCS
	);

function validateChannel(data: ICreateChannel) {
	if (data.tx <= 0 || data.rx <= 0) {
		throw new ValidationError("RX and TX must be greater than zero");
	}
	if (data.mode === "DIGITAL" && (data.colorCode < 0 || data.colorCode > 15)) {
		throw new ValidationError("DMR color code must be between 0 and 15");
	}
	if (data.mode === "DIGITAL" && (data.slot < 1 || data.slot > 2)) {
		throw new ValidationError("DMR slot must be 1 or 2");
	}
	if (
		data.mode === "ANALOG" &&
		data.squelchMode === "CTCSS" &&
		data.txToneHz === undefined &&
		data.rxToneHz === undefined
	) {
		throw new ValidationError("CTCSS requires TX or RX tone");
	}
}

export async function createChannel(data: ICreateChannel) {
	validateChannel(data);
	return db.transaction(async (tx) => {
		const [channel] = await tx
			.insert(channels)
			.values({
				customerId: data.customerId,
				createdBy: data.actorId,
				updatedBy: data.actorId,
				mode: data.mode,
				rx: data.rx,
				tx: data.tx,
				title: data.title,
			})
			.returning();

		if (!channel) {
			throw new Error("Failed to create channel");
		}

		if (data.mode === "DIGITAL") {
			await tx.insert(digitalChannels).values({
				channelId: channel.id,
				protocol: data.protocol,
				colorCode: data.colorCode,
				slot: data.slot,
				talkgroupId: data.talkgroupId ?? null,
			});
		}

		if (data.mode === "ANALOG" && data.squelchMode === "CARRIER") {
			await tx.insert(analogChannels).values({
				channelId: channel.id,
				squelchMode: data.squelchMode,
			});
		}
		if (data.mode === "ANALOG" && data.squelchMode === "CTCSS") {
			await tx.insert(analogChannels).values({
				channelId: channel.id,
				squelchMode: data.squelchMode,
				txToneHz: data.txToneHz !== undefined ? String(data.txToneHz) : null,
				rxToneHz: data.rxToneHz !== undefined ? String(data.rxToneHz) : null,
			});
		}
		if (data.mode === "ANALOG" && data.squelchMode === "DCS") {
			await tx.insert(analogChannels).values({
				channelId: channel.id,
				squelchMode: data.squelchMode,
				txDcsCode: data.txDcsCode,
				rxDcsCode: data.rxDcsCode,
			});
		}

		return channel;
	});
}
