import { api } from "@/core/api"
import { OrderStatus } from "../types"

const getOrderStatus = async () => {
    const { data } = await api.get<{ status: OrderStatus[] }>('/order/status')
    return data
}

const upsertOrderStatus = async (body: any) => {
    const { data } = await api.post<{ status: OrderStatus }>('/order/status', body)
    return data
}


export {
    getOrderStatus,
    upsertOrderStatus
}