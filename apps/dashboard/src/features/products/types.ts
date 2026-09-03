export interface Product {
    id: number
    name: string
    pictureUrl?: string
    price: number
    cost: number
    stock: number
    unity: "und" | "m" | "l" | "g"
    createdAt: Date
    updatedAt: Date
    histories: HistoryProduct[]
    categories: CategoryProduct[]
    group: string
    salesOnProduct: SalesOnProduct[]
}

interface SalesOnProduct {
    saleId: number
    productId: number
    quantity: number
    price: number
    product: Product
}

interface HistoryProduct {
    id: number
    productId: number
    price: number
    cost: number
    stock: number
    createdAt: Date
}

interface CategoryProduct {
    id: number
    name: string
}

export type ProductWithOptionalOrder = Omit<Product, 'salesOnProduct' | 'histories' | 'unity' | "createdAt" | "updatedAt"> & Partial<{ order: { price: number, quantity: number } }>
