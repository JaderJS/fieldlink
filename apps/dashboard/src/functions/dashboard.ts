import { api } from "@/core/api"
import { Transaction } from "@/features/transaction/types"

export interface Dashboard {
    totalBalance: number
    pmp: number
    pmr: number
    accountPayable: number
    transactionsOnPeriods: {
        name: string
        in: number
        out: number
    }[],
    notBilled: {
        out: number
        in: number
    }
    total: {
        in: number
        out: number
        balance: number
        transactions: Partial<Transaction>[]
        outSuppliers: number
    }
}

const getHealth = async () => {
    const resp = await api.get<Dashboard>(`/dashboard`)
    return resp.data
}

interface BanksDashboard {
    id: number,
    name: string,
    in: number,
    out: number,
    maxIn: number,
    minIn: number,
    maxOut: number,
    minOut: number,
    balance: number,
    transactions: Transaction[]
    isDefault: boolean
}

const getBanksDashboard = async () => {
    const resp = await api.get<{ banks: BanksDashboard[] }>(`/dashboard/banks`)
    return resp.data
}

export { getHealth, getBanksDashboard }