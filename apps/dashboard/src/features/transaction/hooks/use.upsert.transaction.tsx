'use client'

import { KEYS } from "@/core/keys"
import { upsertTransaction } from "@/features/transaction/services/transaction.crud"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useUpsertTransaction = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: upsertTransaction,
        onError: () => {
            toast.error(`Ops! houve um erro ao salvar`)
        },
        onMutate: () => {
            toast.info(`Salvando alterações`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.transaction.getAll() })
            queryClient.invalidateQueries({ queryKey: KEYS.notification.getAll() })
        }
    })
}