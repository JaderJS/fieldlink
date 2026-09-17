export interface Bank {
    id: number
    name: string
    pix: string
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    limitBankingMovements: number
    limitBankingMovementsMonth: number
}