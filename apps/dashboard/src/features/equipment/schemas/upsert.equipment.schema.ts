import { z } from "zod";

export const upsertEquipmentSchema = z.object({
    id: z.coerce.number(),
    nickname: z.string(),
    sn: z.string(),
    identifier: z.coerce.number(),
    productId: z.coerce.number(),
})

export type UpsertEquipmentSchema = z.infer<typeof upsertEquipmentSchema>