import { RowSelectionState } from "@tanstack/react-table"

export const rowSelectDefault = (products: ProductWithOptionalOrder[]) => {
    const debug =  products.reduce((acc, product) => {
        if (product.order && product.order.quantity > 0 && product.id != null) {
            acc[String(product.id)] = true
        }
        return acc
    }, {} as RowSelectionState)
    return debug
}
