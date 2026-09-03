import { z } from "zod"

const DEFAULT_CONTENT = "<p className='text-muted-foreground'>Caso deseja, adicione algo aqui!</p>"

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
    content: z.string().default(DEFAULT_CONTENT),
    parentTransactionId: z.coerce.number().optional(),
})

export type UpsertTransactionSchema = z.infer<typeof upsertTransactionSchema>

export const DEFAULT: UpsertTransactionSchema = {
    title: 'Nova transação',
    type: 'INPUT',
    description: 'Descrição',
    hasNfe: false,
    value: 0,
    billed: false,
    fromAt: new Date(),
    periodId: 0,
    content: DEFAULT_CONTENT,
    companyId: 1,
    bankId: 1
}