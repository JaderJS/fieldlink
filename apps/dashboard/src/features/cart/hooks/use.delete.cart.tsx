'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCart } from "../services/crud"
import { KEYS } from "@/core/keys"
import { useRouter } from "next/navigation"

export const useDeleteCart = () => {

    const { push } = useRouter()
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCart,
        onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: KEYS.cart.getAll() })
            push(`/cart`)
        }
    })
}