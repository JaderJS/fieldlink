import { z } from "zod";

export const upsertInvoiceSchema = z.object({
    title: z.string(),
    obs: z.string().optional(),
    company: z.object({
        id: z.coerce.number(),
        name: z.string(),
        cnpj: z.string()
    }),
    type: z.enum(["Orçamento", "Manutenção", "Venda", "Manutenção/Venda"]).default('Orçamento'),
    client: z.object({
        id: z.coerce.number().optional(),
        property: z.string(),
        cnpj: z.string(),
        name: z.string(),
        state: z.string(),
        town: z.string()
    }),
    itens: z.array(z.object({
        qtd: z.coerce.number(),
        name: z.string(),
        value: z.coerce.number()
    })),
    otherValues: z.array(z.object({
        qtd: z.coerce.number(),
        name: z.string(),
        value: z.coerce.number()
    }))
})

export type UpsertInvoiceSchema = z.infer<typeof upsertInvoiceSchema> 