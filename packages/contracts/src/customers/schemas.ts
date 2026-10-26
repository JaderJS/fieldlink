import { z } from "zod";

export const upsertCustomerSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
});

export const getCustomerBODY = upsertCustomerSchema.extend({ id: z.string() });

export const upsertCustomerSchemaFRONT = upsertCustomerSchema;

export type UpsertCustomerInput = z.input<typeof upsertCustomerSchema>;
