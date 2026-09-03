import { Cart } from "../cart/types"
import { Order } from "../order/types"

interface Transaction {
    id: number
    title: string
    type: 'INPUT' | 'OUTPUT'
    description?: string
    isDelete: boolean
    hasNfe: boolean
    value: number
    billed: boolean
    fileUrl?: string
    periodId: number
    bankId: number
    hasNotify: boolean
    period: {
        id: number
        name: string
    }
    content: string
    fromAt: Date
    createdCuid: string
    updatedCuid: string
    createdAt: Date
    updatedAt: Date
    company: any
    bank: Bank
    eventId?: number
    cart?: Cart
    order?: Order

    group: Transaction[]
}

interface Bank {
    id: number
    name: string
}

interface Company {
    id: number
    name: string
    cnpj: string
}

interface Period {
    id: number
    name: string
}

