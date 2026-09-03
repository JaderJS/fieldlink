import { Transaction } from "../transaction/types"

export interface Cart {
    id: number
    total: number
    title: string
    supplierId: number
    createdAt: Date
    productsOnCart: {
        cartId: number
        productId: number
        price: number
        quantity: number
        cart: Cart
        product: Product
    }[]
    otherValues: OtherValue[]
    transaction: Transaction
    supplier: {
        id: number,
        name: string
    }
}

interface OtherValue {
    id: number
    name: string
    price: number
}