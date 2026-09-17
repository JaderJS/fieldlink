import { UserProps } from "@/functions/user"
import { Installment } from "../installment/types"
import { Order } from "../order/types"
import { Cart } from "../cart/types"
import { Company } from "../company/types"
import { Bank } from "../bank/types"
import { Archive } from "../archive/types"

export interface Transaction {
    id: number
    title: string
    type: "INPUT" | "OUTPUT"
    isDelete: boolean
    hasNfe: boolean
    total: number
    createdCuid: string
    updatedCuid: string
    companyId: number
    bankId: number
    hasNotify: boolean
    content: Object
    fromAt: string
    createdAt: string
    updatedAt: string

    cartId?: number
    orderId?: number

    cart?: Cart
    order?: Order
    company: Company
    bank: Bank
    createdBy: UserProps
    updatedBy: UserProps

    archives: Archive[]
    installments: Installment[]
    categories: { id: number, name: string }[]
}