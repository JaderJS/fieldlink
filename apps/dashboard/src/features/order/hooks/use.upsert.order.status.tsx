'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertOrderStatus } from "../services/crud.order.status"
import { KEYS } from "@/core/keys"

export const useUpsertOrderStatus = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertOrderStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.orderStatus.getAll() })
        }
    })
}