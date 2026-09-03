'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getOrderStatus } from "../services/crud.order.status"

export const useOrderStatus = () => {
    return useQuery({
        queryKey: KEYS.orderStatus.getAll(),
        queryFn: getOrderStatus,
        select: data => data.status
    })
}