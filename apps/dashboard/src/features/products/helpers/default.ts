import { RowSelectionState } from "@tanstack/react-table"


// export const rowSelectDefault = (products: ProductWithOptionalOrder[]) => {
//     return products.reduce((acc, product, index) => {
//         if (!!product.order && product.order?.quantity > 0) {
//             acc[index + 2] = true
//         }
//         return acc
//     }, {} as RowSelectionState)
// }

export const rowSelectDefault = (
    products: ProductWithOptionalOrder[],
    oldSelection?: RowSelectionState
): RowSelectionState => {
    const result: RowSelectionState = {}

    products.forEach((product, index) => {
        const id = product?.id != null ? String(product.id) : undefined
        if (!id) return

        const hasOrder = !!product.order && (product.order.quantity ?? 0) > 0

        // preferência: se tem order, seleciona
        if (hasOrder) {
            result[id] = true
            return
        }

        // fallback: se veio seleção antiga por indice (ou por id), mantém
        if (oldSelection) {
            if (oldSelection[id]) {
                result[id] = true
                return
            }
            // suporte a keys index-based antigas:
            if (oldSelection[String(index)]) {
                result[id] = true
                return
            }
        }
    })

    return result
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