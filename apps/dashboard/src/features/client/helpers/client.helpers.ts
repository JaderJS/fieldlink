import { Order } from "@/features/order/types"
import { Transaction } from "@/features/transaction/types"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Client } from "../type"

export const computeOrderTotal = (o: Order) => {
    let total = Number(o.total ?? 0)
    if (o.otherValues?.length) {
        total += o.otherValues.reduce((s, v) => s + (Number(v.price ?? 0)), 0)
    }
    if (o.works?.length) {
        total += o.works.reduce((s, w) => s + (Number(w.total ?? 0)), 0)
        // se vendas em works têm total, acrescenta também
        for (const w of o.works) {
            if (w.sales?.length) total += w.sales.reduce((s, sv) => s + (Number(sv.total ?? 0)), 0)
        }
    }
    if (o.sales?.length) {
        total += o.sales.reduce((s, sv) => s + (Number(sv.total ?? 0)), 0)
    }
    return total
}

const safeTime = (date: Date | string) => {
    formatDistanceToNow(date, { locale: ptBR })
}

export type ClientSummary = {
    summary: {
        total: number
        openOrders: number
        lastOrder?: Order
        lastTransaction?: Transaction
        // recentOrders: Order[]
        _count: {
            properties: number
        }
    }
}

export const summaryFn = (client: Client): ClientSummary => {
    const orders = Array.isArray(client.orders) ? client.orders : []
    const total = orders.reduce((acc, order) => acc + computeOrderTotal(order), 0)
    const openOrders = orders.filter((order) => order.flag !== "Finalizado").length

    // const lastOrder = [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0] PROBLEM
    const lastOrder = [...orders][0]

    const allTransactions: string | any[] = [] //orders.flatMap((order) => Array.isArray(order.transactions) ? order.transactions : []) 

    const lastTransaction = allTransactions[allTransactions.length - 1]
    // const lastOrder = allTransactions[0]
    // const lastTransaction = [...allTransactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt.getTime()).getTime())[0]

    const propertiesCount = Array.isArray(client.properties) ? client.properties.length : client.property ? 1 : 0

    // const recentOrders = [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 3)

    return {
        summary: {
            total,
            openOrders,
            lastOrder,
            lastTransaction,
            // recentOrders: recentOrders,
            _count: {
                properties: propertiesCount
            }
        }
    }
}