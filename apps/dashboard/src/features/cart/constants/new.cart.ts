import { UpsertCartSchema } from "../schema/schema.cart";


export const defaultNewCart = ({ supplierId = -1, periodId = -1, bankId = -1 }: { supplierId?: number, bankId?: number, periodId?: number } = {}): UpsertCartSchema => {
    return ({
        title: "Nova compra",
        total: 0,
        transaction: {
            type: "OUTPUT",
            bankId,
            companyId: -1,
            content: {},
            hasNfe: false,
            hasNotify: false,
            isDelete: false,
            title: "Nova transação",
            total: 0,
            installments: [{
                billed: false,
                dueAt: new Date(),
                installmentsNumber: 1,
                paymentMethod: "PIX",
                value: 0,
                periodId,
                status: "PENDING",
                transactionId: -1
            }]
        },
        otherValues: [],
        productsOnCart: [],
        createdAt: new Date(),
        supplierId,
    })
}