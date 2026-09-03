'use client'

import { KEYS } from "@/core/keys"
import { deleteTransaction } from "@/features/adm/services/transaction.crud"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.transaction.getAll() })
        }
    })
}