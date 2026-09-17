import { id } from "date-fns/locale"
import { z } from "zod"

export const upsertClientSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    moreInfos: z.object({
        id: z.number().optional(),
        state: z.string(),
        city: z.string(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        zipCode: z.string().optional(),
    }),
    propertyIds: z.array(z.string()).default([]),
    docId: z.string().optional()
})

export type UpsertClientSchema = z.infer<typeof upsertClientSchema>