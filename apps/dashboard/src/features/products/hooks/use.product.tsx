'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../service/crud.product"
import { Product } from "../types"

export const useProduct = ({ product, initialData }: { product: Pick<Product, "id">, initialData?: Product }) => {
    return useQuery({
        queryKey: KEYS.product.getById({ id: product.id }),
        queryFn: getProductById,
        select: data => data.product,
        initialData: { product: initialData }
    })
}