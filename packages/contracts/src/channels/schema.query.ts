import z from "zod";

export const queryFindManyChannelsSchema = z.object({
	search: z.string().trim().min(1).optional(),
	mode: z.enum(["ANALOG", "DIGITAL"]).optional(),
	customerId: z.uuid().optional(),
	rx: z.coerce.number().optional(),
	tx: z.coerce.number().optional(),
	spacingInKHz: z.coerce.number().optional(),
});

export type QueryFindManyChannels = z.infer<typeof queryFindManyChannelsSchema>;
