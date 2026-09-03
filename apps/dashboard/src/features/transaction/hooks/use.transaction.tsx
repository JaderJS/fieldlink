'use client'

import { KEYS } from "@/core/keys"
import { Transaction } from "@/features/transaction/types"
import { useQuery } from "@tanstack/react-query"
import { getTransactionById, getTransactions } from "@/features/transaction/services/transaction.crud"

export const useTransaction = ({ transaction, filters, initialData }: { transaction: Pick<Transaction, 'id'>, filters?: Partial<Transaction>, initialData?: Transaction[] }) => {
    return useQuery({
        queryKey: KEYS.transaction.getById(transaction.id),
        queryFn: getTransactionById,
        // initialData: { transactions: initialData },
        select: data => data.transaction
    })
}