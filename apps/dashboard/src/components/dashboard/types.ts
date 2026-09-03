export interface Finance {
    pmp: number
    pmr: number
    transactionsOnPeriods: { month: string, in: number, out: number, acc: number }[]
    inPeriod: { installments: any[] } // installments com value em reais
    periods: {
        id: number
        name: string
        startDate?: Date | null
        endDate?: Date | null
        in: number
        out: number
        installments: any[] // parcelas com value em reais
    }[]
    notBilled: { out: number, in: number }
    total: {
        in: number
        out: number
        balance: number
        installments: any[] // parcelas com value em reais
        outSuppliers: number
    }
    aging: {
        receivables: Record<string, number>
        payables: Record<string, number>
    }
    projectedCashflow?: { month: string, projectedNet: number, inflow: number, outflow: number }[]
    runwayMonths?: number | null
}