import { randomInt } from "node:crypto"
import { SaleSchema, UpsertOrderSchema } from "../schema/upsert.schema"
import { DEFAULT_NEW_INSTALLMENT } from "@/features/installment/constants/new.installment"

export const defaultNewOrder = ({ bankId = -1, clientId = -1, companyId = -1 }: { bankId: number, clientId: number, companyId: number }): UpsertOrderSchema => {
    return ({
        statusId: -1,
        title: "Nova ordem",
        flag: "Desconhecido",
        discount: 0,
        transaction: {
            bankId,
            companyId,
            hasNfe: false,
            hasNotify: false,
            isDelete: false,
            type: "INPUT",
            title: "Nova transação",
            content: {},
            total: 0,
            installments: [DEFAULT_NEW_INSTALLMENT]
        },
        total: 0,
        clientId: clientId,
    })
}


export const defaultNewWork = (): NonNullable<UpsertOrderSchema['works']>[number] => {
    return ({
        title: "Novo trabalho",
        disabled: false,
        open: true,
        orderN: 0,
        total: 0,
    })
}

export const defaultNewSale = (): SaleSchema => {
    return ({
        total: 0,
        content: {},
        productsOnSale: [],
    })
}