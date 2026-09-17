'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../services/crud"

interface UseProductsProps {
    // initialValues?: Product[]
    initialValues?: ProductWithOptionalOrder[]
    filters?: Partial<ProductWithOptionalOrder>
}

export const useProducts = ({ initialValues = [], filters }: UseProductsProps = {}) => {
    return useQuery<{ products: ProductWithOptionalOrder[] }>({
        queryKey: KEYS.product.getAll(),
        queryFn: getProducts,
        // select: data => data.products,
        select: data => {
            const map = new Map(initialValues.map(p => [p.id, { quantity: p.order?.quantity, price: p.order?.price }]))
            return {
                products: data.products.map(p => ({
                    ...p,
                    order: !!map.get(p.id) ? {
                        quantity: map.get(p.id)?.quantity ?? 0,
                        price: map.get(p.id)?.price ?? 0
                    } : undefined
                }))
            }
        },
        initialData: { products: initialValues }
    })
}