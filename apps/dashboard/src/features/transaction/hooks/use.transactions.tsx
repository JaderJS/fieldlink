'use client'

import { KEYS } from "@/core/keys"
import { Transaction } from "@/features/transaction/types"
import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "@/features/transaction/services/transaction.crud"

export const useTransactions = ({ filters, initialData }: { filters?: Partial<Transaction>, initialData?: Transaction[] } = {}) => {
    return useQuery({
        queryKey: KEYS.transaction.getAll(),
        queryFn: getTransactions,
        // initialData: { transactions: initialData },
        select: data => data.transactions
    })
}