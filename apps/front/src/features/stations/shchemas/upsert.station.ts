import z from "zod";

export const upsertStationSchema = z.object({
	customerId: z.string(),
	mode: z.enum(["ANALOG", "DIGITAL"]),
	title: z.string(),
});

export type UpsertStationSchema = z.infer<typeof upsertStationSchema>;
