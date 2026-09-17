import { z } from "zod"

export const upsertPropertySchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string(),
    city: z.string(),
    clientId: z.coerce.number(),
    stationsIds: z.array(z.number()).optional()
})

export type UpsertPropertySchema = z.infer<typeof upsertPropertySchema>