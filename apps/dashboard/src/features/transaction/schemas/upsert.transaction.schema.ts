import { upsertInstallmentSchema } from "@/features/installment/schemas/upsert.installment.schema"
import z from "zod"

export const upsertTransactionSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(3),
    type: z.enum(['INPUT', 'OUTPUT']),
    isDelete: z.boolean().default(false),
    hasNfe: z.boolean().default(false),
    total: z.coerce.number(),
    companyId: z.coerce.number(),
    bankId: z.coerce.number(),
    hasNotify: z.coerce.boolean(),
    installments: upsertInstallmentSchema.array().min(1),
    content: z.record(z.string(), z.any()).optional()
})

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>