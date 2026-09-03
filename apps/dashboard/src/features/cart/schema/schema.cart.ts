import { upsertInstallmentSchema } from "@/features/installment/schemas/upsert.installment.schema"
import { z } from "zod"

export const upsertCartSchema = z.object({

    id: z.coerce.number().optional(),
    title: z.coerce.string(),
    total: z.coerce.number(),
    supplierId: z.coerce.number().default(0),
    createdAt: z.coerce.date(),
    transaction: z.object({
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
        content: z.record(z.string(), z.any())
    }),
    otherValues: z.array(z.object({
        id: z.coerce.number().optional(),
        name: z.string(),
        price: z.coerce.number()
    })),
    productsOnCart: z.array(z.object({
        cartId: z.coerce.number().optional(),
        productId: z.coerce.number().optional(),
        quantity: z.coerce.number(),
        price: z.coerce.number(),
        product: z.object({
            id: z.coerce.number(),
            name: z.string(),
            cost: z.coerce.number(),
            price: z.coerce.number(),
            stock: z.coerce.number(),
            pictureUrl: z.string(),
            categories: z.array(z.object({
                id: z.coerce.number(),
                name: z.string()
            }))
        }).nullish(),
    })).min(1, { message: "Selecione ao menos um produto para continuar" }),
})

export type UpsertCartSchema = z.infer<typeof upsertCartSchema>

export const DEFAULT_NEW_OTHER_VALUES: UpsertCartSchema['otherValues'][number] = {
    price: 0,
    name: "Outro valor"
}