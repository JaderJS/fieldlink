import { api } from "@/core/api"
import { KEYS } from "@/core/keys"
import { QueryFunctionContext } from "@tanstack/react-query"
import { Transaction } from "@/features/transaction/types"

const getTransactions = async () => {
    const { data } = await api.get<{ transactions: Transaction[] }>(`/transactions`)
    return data
}

const getTransactionById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.transaction.getById>>) => {
    const [, id, filters] = ctx.queryKey
    const resp = await api.get<{ transaction: Transaction }>(`/transactions/${id}`)
    return resp.data
}

const upsertTransaction = async (body: any) => {
    const resp = await api.post(`/transactions`, body)
    return resp.data
}

const deleteTransaction = async (id: number) => {
    const resp = await api.delete(`/transactions/${id}`)
    return resp.data
}

export {
    getTransactions,
    getTransactionById,
    upsertTransaction,
    deleteTransaction
}