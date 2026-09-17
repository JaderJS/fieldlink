import { z } from "zod";

export const upsertGroupSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string(),
    identifier: z.string(),
    type: z.string(),
})

export type UpsertGroupSchema = z.infer<typeof upsertGroupSchema>