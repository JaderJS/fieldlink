'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../service/crud.product"

export const useProducts = () => {
    return useQuery({
        queryKey: KEYS.product.getAll(),
        queryFn: getProducts,
        select: data => data.products
    })
}