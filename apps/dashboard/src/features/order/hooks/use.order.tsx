'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "../services/crud.order"
import { Order } from "../types"
import { getOrderAnalyticsById } from "../services/crud.order.analytics"

export const useOrder = ({ order, initialData }: { order: Pick<Order, "id">, initialData?: Order }) => {
    return useQuery({
        queryKey: KEYS.order.getById(order.id),
        queryFn: getOrderById,
        select: data => data.order,
        initialData: { order: initialData }
    })
}

export const useOrderAnalytics = ({ order }: { order: Pick<Order, "id"> }) => {
    return useQuery({
        queryKey: KEYS.order.getAnalyticsById(order.id),
        queryFn: getOrderAnalyticsById,
        select: data => data.analytics
    })
}