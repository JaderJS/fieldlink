import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertTransaction } from "../services/transaction.crud"
import { KEYS } from "@/core/keys"
import { Transaction } from "@/features/transaction/types"

interface UseTransactionUpsertProps {
    action: 'create' | 'update' | 'delete',
    data: Transaction
}

export const useTransactionUpsert = ({ action, data }: UseTransactionUpsertProps) => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertTransaction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.transaction.getAll() })
        }
    })
}