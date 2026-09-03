import { upsertTransactionSchema } from "@/features/transaction/schemas/upsert.transaction.schema";
import { upsertTransaction } from "@/features/transaction/services/transaction.crud";
import { Transaction } from "@tiptap/pm/state";
import { id } from "date-fns/locale";
import { z } from "zod";

const ProductSchema = z.object({
    id: z.number(),
    name: z.string().min(1, "Nome é obrigatório"),
    price: z.number().min(0, "Preço deve ser maior que 0"),
    cost: z.number().min(0, "Custo deve ser maior que 0"),
    stock: z.number(),
    categories: z.array(z.object({
        id: z.coerce.number(),
        name: z.string()
    }))
})

export const saleSchema = z.object({
    id: z.number().optional(),
    total: z.coerce.number(),
    content: z.record(z.string(), z.any()),
    createdAt: z.coerce.date().optional(),
    productsOnSale: z.array(z.object({
        saleId: z.coerce.number().optional(),
        productId: z.coerce.number().optional(),
        quantity: z.coerce.number().transform(arg => (arg < 0 || arg === 0) ? 1 : arg),
        price: z.coerce.number().min(0, "Price must be a positive number"),
        product: ProductSchema,
    })).min(1),
})

export type SaleSchema = z.infer<typeof saleSchema>

const otherValueSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Nome é obrigatório"),
    price: z.coerce.number().min(0.001, "Valor deve ser maior que 0.001"),
})

export const dateSchema = z.object({
    finish: z.coerce.date(),
    start: z.coerce.date(),
    hours: z.coerce.number(),
})


export const upsertOrderSchema = z.object({
    id: z.number().optional(),
    title: z.string().min(1, "Title is required"),
    clientId: z.coerce.number(),
    discount: z.coerce.number(),
    total: z.coerce.number(),
    flag: z.string(),
    statusId: z.coerce.number(),
    date: dateSchema.optional(),
    works: z.array(z.object({
        id: z.number().optional(),
        title: z.string(),
        total: z.coerce.number(),
        content: z.record(z.string(), z.any()).optional(),
        date: dateSchema.optional(),
        sales: z.array(saleSchema).optional(),
        otherValues: z.array(otherValueSchema).optional(),
        open: z.coerce.boolean().default(true),
        disabled: z.coerce.boolean().default(false),
        orderN: z.coerce.number().default(0),
        archives: z.array(z.object({
            title: z.string(),
            path: z.string(),
            type: z.string(),
            pathUrl: z.string(),
            description: z.string().optional()
        })).optional()
    })).optional(),
    transaction: upsertTransactionSchema,
    sales: z.array(saleSchema).optional(),
    otherValues: z.array(otherValueSchema).optional(),
})

export type UpsertOrderSchema = z.infer<typeof upsertOrderSchema>

export const DEFAULT_NEW_TRANSACTION_IN_ORDER: UpsertOrderSchema['transaction'] = {
    companyId: 0,
    hasNfe: false,
    hasNotify: false,
    isDelete: false,
    content: {},
    title: "Nova transação",
    type: "INPUT",
    total: 0,
    installments: [],
    bankId: 0,
}
