import { UpsertInstallmentSchema } from "../schemas/upsert.installment.schema";

export const DEFAULT_NEW_INSTALLMENT: UpsertInstallmentSchema = {
    value: 0,
    status: "PENDING",
    installmentsNumber: 1,
    paymentMethod: "NOT_DECLARED",
    billed: false,
    periodId: -1,
    transactionId: -1,
    dueAt: new Date(),
}

export const newInstallment = ({ periodId, transactionId }: { periodId: number, transactionId: number }): UpsertInstallmentSchema => {
    return ({
        value: 0,
        status: "PENDING",
        installmentsNumber: 1,
        paymentMethod: "NOT_DECLARED",
        billed: false,
        periodId,
        transactionId,
        dueAt: new Date()
    })
}