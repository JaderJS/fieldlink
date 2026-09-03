import { Schema } from "../components/transactions/view.transactions";

export const DEFAULT_TRANSACTION_IN_VIEW: Schema['rows'][number] = {
    bankId: 0,
    companyId: 0,
    periodId: 0,
    billed: false,
    createCuid: "",
    fromAt: new Date(),
    hasNfe: false,
    hasNotify: false,
    title: "Nova transação",
    type: "INPUT",
    content: "",
    updatedCuid: "",
    value: 0,
    isDelete: false,
}