'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertCart } from "../services/crud"
import { KEYS } from "@/core/keys"

export const useUpsertCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertCart,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: KEYS.cart.getAll() })
        }
    })

}