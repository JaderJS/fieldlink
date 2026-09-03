import { UseFormReturn } from "react-hook-form"
import { UpsertOrderSchema } from "../schema/upsert.schema"

export const recalculateTotalFn = (form: UseFormReturn<UpsertOrderSchema>, { workIndex, saleIndex }: { workIndex?: number, saleIndex?: number } = {}): number => {

    const works = form.getValues("works") ?? []
    const totalInWorks = works.reduce((acc, work, workIndex_) => {
        if (work.disabled) {
            return acc
        }

        const sales = (work.sales ?? []).reduce((acc_, sale) => {
            acc_ += sale.productsOnSale.reduce((acc__, productOnSale) => {
                acc__ += productOnSale.price * productOnSale.quantity
                return acc__
            }, 0)
            return acc_
        }, 0)
        const otherValues = (work.otherValues ?? []).reduce((acc_, item) => acc_ + item.price, 0)

        if (workIndex === workIndex_) {
            form.setValue(`works.${workIndex}.total`, sales + otherValues)
        }

        acc += (sales + otherValues)
        return acc
    }, 0)

    const sales = form.getValues('sales') ?? []
    const totalInSales = sales.reduce((acc, sale, saleIndex_) => {
        acc += (sale.productsOnSale ?? []).reduce((acc_, productOnSale) => {
            acc_ += productOnSale.price * productOnSale.quantity
            return acc_
        }, 0)
        if (saleIndex === saleIndex_) {
            form.setValue(`sales.${saleIndex}.total`, acc)
        }
        return acc
    }, 0)

    const otherValues = form.getValues('otherValues') ?? []
    const totalOtherValues = otherValues.reduce((acc, otherValue) => {
        acc += otherValue.price
        return acc
    }, 0)

    const total = totalInWorks + totalOtherValues + totalInSales
    form.setValue(`total`, total)

    const discount = form.getValues('discount') || 0
    const totalWithDiscount = total * (1 - discount)

    const transaction = form.getValues('transaction')
    const newInstallments = transaction.installments.map((i, index) => ({
        ...i,
        installmentsNumber: index,
        value: totalWithDiscount / (transaction.installments.length ?? 1)
    }))
    form.setValue(`transaction.installments`, newInstallments)

    return totalInWorks
}
