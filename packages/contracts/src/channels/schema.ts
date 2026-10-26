import z from "zod";

const hz = z.number().int().positive().max(999_000_000);

export const mhzToHz = z
	.string()
	.min(1, "Adicione um valor")
	.regex(/^\d{1,4}([,.]\d{1,5})?$/, "Frequência inválida")
	.transform((v) => Math.round(Number(v.replace(",", ".")) * 1_000_000))
	.pipe(hz);

const buildChannelSchema = <F extends z.ZodType<number>>(freq: F) => {
	const base = z.object({
		id: z.string().optional(),
		customerId: z.string().min(1, "Vincule a um cliente"),
		title: z.string().min(1, "Adicione um titulo"),
		description: z.string().optional(),
		rx: freq,
		tx: freq,
	});

	const digital = base.extend({
		mode: z.literal("DIGITAL"),
		protocol: z.enum(["DMR"]).default("DMR"),
		colorCode: z.number().int().min(0).max(15),
		slot: z.number().int().min(1).max(2),
		talkgroup: z.string().nullish(),
	});

	const analog = base
		.extend({
			mode: z.literal("ANALOG"),
			squelchMode: z.enum(["CARRIER", "CTCSS", "DCS"]).default("CARRIER"),
			txToneHz: z.number().positive().max(9999.99).nullish(),
			rxToneHz: z.number().positive().max(9999.99).nullish(),
			txDcsCode: z.number().int().min(1).max(777).nullish(),
			rxDcsCode: z.number().int().min(1).max(777).nullish(),
		})
		.refine(
			(d) =>
				d.squelchMode !== "CTCSS" || d.txToneHz != null || d.rxToneHz != null,
			{ message: "Informe o tom CTCSS", path: ["txToneHz"] },
		)
		.refine(
			(d) =>
				d.squelchMode !== "DCS" || d.txDcsCode != null || d.rxDcsCode != null,
			{ message: "Informe o código DCS", path: ["txDcsCode"] },
		);

	return z.discriminatedUnion("mode", [digital, analog]);
};

export const upsertChannelSchema = buildChannelSchema(hz);
export const upsertChannelSchemaFRONT = buildChannelSchema(mhzToHz);

export const getChannelSchema = z.object({ id: z.string() });

export type UpsertChannel = z.output<typeof upsertChannelSchema> & {
	actorId: string;
};
export type UpsertChannelInput = z.input<typeof upsertChannelSchemaFRONT>;
