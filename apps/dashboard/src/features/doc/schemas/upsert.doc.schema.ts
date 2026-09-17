import { z } from "zod";

export const upsertDocSchema = z.object({
    cuid: z.string().cuid2(),
    title: z.string(),
    slug: z.string(),
    content: z.record(z.string(), z.any())
})

export type UpsertDocSchema = z.infer<typeof upsertDocSchema>