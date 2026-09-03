'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../services/crud.order"

export const useOrders = () => {
    return useQuery({
        queryKey: KEYS.order.getAll(),
        queryFn: getOrders,
        select: data => data.orders
    })
}