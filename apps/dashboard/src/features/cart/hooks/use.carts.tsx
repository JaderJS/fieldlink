'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getCarts } from "../services/crud"

export const useCarts = () => {

    return useQuery({
        queryKey: KEYS.cart.getAll(),
        queryFn: getCarts,
        select: data => data.carts.map(c => ({ ...c, title: c.title }))
    })
}