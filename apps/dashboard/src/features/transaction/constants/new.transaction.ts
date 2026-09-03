import { DEFAULT_NEW_INSTALLMENT } from "@/features/installment/constants/new.installment"
import { UpsertTransactionSchema } from "../schemas/upsert.transaction.schema"

export const DEFAULT_NEW_TRANSACTION: UpsertTransactionSchema = {
    bankId: -1,
    companyId: -1,
    hasNotify: false,
    hasNfe: false,
    title: 'Nova Transação',
    total: 0,
    type: 'INPUT',
    content: {},
    isDelete: false,
    installments: [DEFAULT_NEW_INSTALLMENT]
}