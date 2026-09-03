import { api } from "@/core/api"
import { Installment } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getInstallments = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.installment.getAll>>) => {
    const params = ctx.queryKey[1]
    const { data } = await api.get<{ installments: Installment[] }>(`/installments`, { params })
    return data
}

const upsertInstallment = async (body: Partial<Pick<Installment, "id" | "Archives" | 'createdCuid' | 'updatedCuid' | "createdAt" | "updatedAt">> & any) => {
    const { data } = await api.post<{ installment: Installment }>(`/installments`, body)
    return data
}

const deleteInstallment = async (id: number) => {
    const { data } = await api.delete(`/installments/${id}`)
}


export { getInstallments, upsertInstallment, deleteInstallment }