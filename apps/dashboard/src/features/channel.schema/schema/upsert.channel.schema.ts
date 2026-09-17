import { z } from "zod";

export const upsertChannelSchemaSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string(),
    content: z.record(z.string(), z.any()),
    stationId: z.coerce.number(),
    channelsAnalog: z.array(z.object({
        channelSchemaId: z.coerce.number().optional(),
        silent: z.enum(['CSQ', 'TPL', 'DPL_N', 'DPL_I']),
        encoder: z.coerce.number().default(0),
        decoder: z.coerce.number().default(0),
        order: z.coerce.number().optional()
    })).optional(),
    channelsDigital: z.array(z.object({
        channelSchemaId: z.coerce.number().optional(),
        slot: z.coerce.number().default(0),
        colorCode: z.coerce.number().default(0),
        groupId: z.coerce.number(),
        order: z.coerce.number().optional()
    })).optional(),
})

export type UpsertChannelSchemaSchema = z.infer<typeof upsertChannelSchemaSchema>