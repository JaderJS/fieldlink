import { api } from '@/core/api'
import { KEYS } from '@/core/keys'
import { QueryFunctionContext } from '@tanstack/react-query'
import { Order } from '../types'
import { AxiosHeaders } from 'axios'
// import { headers } from 'next/headers'

const getOrders = async () => {
    const { data } = await api.get<{ orders: Order[] }>('/order')
    return data
}

const getOrderById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.order.getById>>, headers?: AxiosHeaders) => {
    const { data } = await api.get<{ order: Order }>(`/order/${ctx.queryKey[1]}`, { headers: headers })
    return data
}

const sendOrderOfEmail = async ({ id, ...body }: { id: number, [key: string]: any }) => {
    const { data } = await api.post<{ order: Order }>(`/order/${id}/send/email`, body)
    return data
}

const upsertOrder = async (body: Partial<Pick<Order, "id">> & any) => {
    // const upsertOrder = async (body: Partial<Pick<Order, "id">> & Partial<Order>) => {
    const resp = await api.post<{ order: Order }>('/order', body)
    return resp.data
}

const deleteOrder = async (id: number) => {
    const resp = await api.delete(`/order/${id}`)
    return resp.data
}

export {
    getOrders,
    upsertOrder,
    getOrderById,
    deleteOrder,
    sendOrderOfEmail
}