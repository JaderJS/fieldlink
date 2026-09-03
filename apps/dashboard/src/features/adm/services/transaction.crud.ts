import { api } from "@/core/api"
import { KEYS } from "@/core/keys"
import { Transaction } from "@/features/transaction/types"
import { QueryFunctionContext } from "@tanstack/react-query"

const getTransactions = async () => {
    const resp = await api.get<{ transactions: Transaction[] }>(`/transaction`)
    return resp.data
}

const getTransactionById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.transaction.getById>>) => {
    const [, id, filters] = ctx.queryKey
    const resp = await api.get<{ transaction: Transaction }>(`/transaction/${id}`)
    return resp.data
}

const upsertTransaction = async (body: any) => {
    const resp = await api.post(`/transaction`, body)
    return resp.data
}

const deleteTransaction = async (id: number) => {
    const resp = await api.delete(`/transaction/${id}`)
    return resp.data
}

export {
    getTransactions,
    getTransactionById,
    upsertTransaction,
    deleteTransaction
}