import z from "zod"

export const upsertInstallmentSchema = z.object({
    id: z.coerce.number().optional(),
    value: z.coerce.number(),
    status: z.enum(["PENDING", "PAID", "PARTIAL", "CANCELLED", "REFUNDED"]),
    installmentsNumber: z.coerce.number(),
    paymentMethod: z.enum(["CARD", "PIX", "BOLETO", "TED", "CASH", "OTHER", "NOT_DECLARED"]),
    billed: z.coerce.boolean(),
    periodId: z.coerce.number(),
    transactionId: z.coerce.number(),
    dueAt: z.coerce.date(),
    paidAt: z.coerce.date().optional(),
    installmentsTotal: z.coerce.number().optional(),
    paymentReference: z.string().optional(),
})

export type UpsertInstallmentSchema = z.infer<typeof upsertInstallmentSchema>