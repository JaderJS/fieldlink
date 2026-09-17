import { Archive } from "../archive/types"
import { Client } from "../client/type"
import { Transaction } from "../transaction/types"

export interface Order {
    id: number
    title: string
    clientId: number
    // status: "INIT" | "PROCESS" | "FINISHED"
    total: number
    discount: number,
    updatedByCuid: string
    updatedAt: Date
    createdAt: Date
    transaction: Transaction
    flag: string
    status?: OrderStatus
    client: Client
    works: Work[],
    otherValues: {
        id: number
        name: string
        price: number
    }[]
    sales: Sale[]
    date?: {
        id?: number
        start: Date
        finish: Date
        hours: number
    }
}

export interface OrderStatus {
    id: number
    name: string
    color: string
}

interface Work {
    id: number
    title: string
    total: number
    orderId: number
    sales: Sale[]
    open: boolean
    disabled: boolean
    otherValues: {
        id: number
        name: string
        price: number
    }[]
    archives: Archive[]
    date?: {
        id: number
        start: Date
        finish: Date
        hours: number
    }
    createdAt: string
    updatedAt: string
    docCuid?: string
    content?: Object
}

interface Sale {
    id: number
    total: number
    createdAt: Date
    orderId: number
    productsOnSale: {
        saleId: number
        productId: number
        price: number
        quantity: number
        product: Product
    }[]
}