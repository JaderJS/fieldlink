import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getTransactions } from "../services/transaction.crud"
import { Transaction } from "@/features/transaction/types"

export const useTransactions = ({ filters, initialData }: { filters?: Partial<Transaction>, initialData?: Transaction[] } = {}) => {
    return useQuery({
        queryKey: KEYS.transaction.getAll(),
        queryFn: getTransactions,
        // initialData: { transactions: initialData },
        select: data => data.transactions
    })
}