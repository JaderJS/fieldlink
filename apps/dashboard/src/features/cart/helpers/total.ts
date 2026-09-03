import { UseFormReturn } from "react-hook-form"
import { UpsertCartSchema } from "../schema/schema.cart"

export const recalculateTotalFn = (form: UseFormReturn<UpsertCartSchema>) => {
    const productsOnCartTotal = form.getValues('productsOnCart').reduce((acc, p) => acc + (p.price * p.quantity), 0)
    const otherValuesTotal = form.getValues('otherValues').reduce((acc, o) => acc + o.price, 0)
    const transaction = form.getValues('transaction')

    const total = productsOnCartTotal + otherValuesTotal
    form.setValue('transaction', {
        ...transaction,
        installments: transaction.installments.map((t) => ({ ...t, value: total / (transaction.installments.length === 0 ? 1 : transaction.installments.length) }))
    })
    form.setValue('total', total)
}
