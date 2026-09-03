import { Bank } from "@/features/bank/types"

export interface Notification {
    id: string
    kind: string
    transactionId: number
    installmentId: number
    title: string
    bank?: Bank
    amount: string
    amountRaw: number
    dueAt: string
    daysLeft: number
    status: string,
    link: string,
}