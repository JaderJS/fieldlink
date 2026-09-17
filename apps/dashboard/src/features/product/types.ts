interface Product {
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
    salesOnProduct: {
        saleId: number
        productId: number
        quantity: number
        price: number
        product: Product
    }[]

    summary: {
        maxPrice: number,
        minPrice: number,
        avgPrice: number,
        variation: number,
        total: {
            out: number,
            in: number
        },
        _count: {
            sales: number
        },
    }
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

type ProductWithOptionalOrder = Omit<Product, 'salesOnProduct' | 'histories' | 'unity' | "createdAt" | "updatedAt"> & Partial<{ order: { price: number, quantity: number } }>
