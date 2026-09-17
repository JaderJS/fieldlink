import { UpsertTransactionSchema } from "../schemas/transaction.schema"

export const DEFAULT_CONTENT_IN_TRANSACTION = "<p className='text-muted-foreground'>Caso deseja, adicione algo aqui!</p>"

export const DEFAULT_NEW_TRANSACTION: UpsertTransactionSchema = {
    title: 'Nova transação',
    type: 'INPUT',
    description: 'Descrição',
    hasNfe: false,
    value: 0,
    billed: false,
    fromAt: new Date(),
    content: DEFAULT_CONTENT_IN_TRANSACTION,
    hasNotify: false,
    periodId: 0,
    companyId: 0,
    bankId: 0
}