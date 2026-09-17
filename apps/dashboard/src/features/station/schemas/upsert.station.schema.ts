import { z } from "zod"

export const upsertStationSchema = z.object({
    id: z.coerce.number().optional(),
    content: z.record(z.string(), z.any()).optional(),
    rx: z.number(),
    tx: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    isActive: z.boolean(),
    mode: z.enum(['digital', 'analog']),
    propertyId: z.coerce.number(),
}).and(z.union([
    z.object({
        mode: z.literal("digital"), digital: z.object({
            id: z.coerce.number().optional(),
            stationId: z.coerce.number(),
            slot: z.coerce.number(),
            colorCode: z.coerce.number(),
        }),
    }),
    z.object({
        mode: z.literal("analog"), analog: z.object({
            id: z.coerce.number().optional(),
            stationId: z.coerce.number(),
            silent: z.enum(["CSQ", "TPL", "DPL_N", "DPL_I"]),
            encoder: z.coerce.number(),
            decoder: z.coerce.number()
        }),
    }),
]))

export type UpsertStationSchema = z.infer<typeof upsertStationSchema>