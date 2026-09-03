import { Transaction } from "@/features/transaction/types"
import { UserProps } from "@/functions/user"
import { Period } from "../period/types"
import { Archive } from "../archive/types"

export interface Installment {
    id: number
    value: number
    status: "PENDING" | "PAID" | "PARTIAL" | "CANCELLED" | "REFUNDED"
    installmentsNumber: number
    paymentMethod: "CARD" | "PIX" | "BOLETO" | "TED" | "CASH" | "OTHER" | "NOT_DECLARED"
    billed: boolean
    periodId: number
    transactionId: number
    dueAt: string
    updatedAt: string
    createdAt: string
    createdCuid: string
    updatedCuid: string

    paidAt?: string
    installmentsTotal?: number
    paymentReference?: string

    period: Period
    transaction: Transaction
    createdBy: UserProps
    updatedBy: UserProps

    Archives: Archive[]

}