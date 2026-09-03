import { z } from "zod"

export const upsertProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(3, "Name is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    cost: z.coerce.number().min(0, "Cost must be a positive number"),
    pictureUrl: z.string().url(),
    categoriesIds: z.array(z.coerce.number()).optional(),
    description: z.string().optional()
})

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;