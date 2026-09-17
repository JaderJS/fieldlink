'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertOrder } from "../services/crud.order"
import { KEYS } from "@/core/keys"

export const useUpsertOrder = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: upsertOrder,
        onSuccess: (resp) => {
            queryClient.invalidateQueries({ queryKey: KEYS.order.getAll() })
            queryClient.invalidateQueries({ queryKey: KEYS.order.getById(resp.order.id) })
            queryClient.invalidateQueries({ queryKey: KEYS.notification.getAll() })

            queryClient.setQueryData(KEYS.order.getById(resp.order.id), { ...resp.order })
        }
    })
}