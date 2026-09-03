import { Order } from "@/features/order/types"
import { Property } from "@/features/properties/types"

export interface Client {
    id: number
    name: string
    property: string
    properties: Property[]
    orders: Order[]
    moreInfos?: {
        id: number
        city: string
        state: string
        email?: string
        phone?: string
        address?: string
        zipCode?: string
        updatedAt: string
        createdAt: string
    }
    doc?: {
        cuid: string
    }
    summary: {
        openOrders: Order[]
        lastOrder?: Order
        firstOrder?: Order
        total: {
            spent: number
            open: number
        }
    }
}