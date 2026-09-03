import { RowSelectionState } from "@tanstack/react-table"

export const rowSelectDefault = (products: ProductWithOptionalOrder[]) => {
    return products.reduce((acc, product, index) => {
        if (!!product.order && product.order?.quantity > 0) {
            acc[index] = true
        }
        return acc
    }, {} as RowSelectionState)
}

export const pinDefault = (products: ProductWithOptionalOrder[]) => {
    const pin: string[] = products.reduce<string[]>((acc, product, index) => {
        if (!!product.order && product.order?.quantity > 0) {
            return [...acc, String(product.id)]
        }
        return acc
    }, [])
    return pin
}