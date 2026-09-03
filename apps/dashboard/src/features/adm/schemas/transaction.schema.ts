import { z } from "zod"
import { DEFAULT_CONTENT_IN_TRANSACTION } from "../constants/transaction.default"


export const upsertTransactionSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(3),
    type: z.enum(['INPUT', 'OUTPUT']),
    description: z.string().optional(),
    hasNfe: z.boolean().default(false),
    value: z.coerce.number(),
    billed: z.boolean().default(false),
    fileUrl: z.string().optional(),
    fromAt: z.coerce.date(),
    periodId: z.coerce.number(),
    serviceId: z.coerce.number().optional(),
    companyId: z.coerce.number(),
    bankId: z.coerce.number(),
    hasNotify: z.coerce.boolean(),
    content: z.string().default(DEFAULT_CONTENT_IN_TRANSACTION),
})

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>

