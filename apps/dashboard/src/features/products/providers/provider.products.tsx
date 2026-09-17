'use client'

import { ColumnDef, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, PaginationState, RowPinningState, RowSelectionState, Table, useReactTable } from "@tanstack/react-table"
import { Children, createContext, isValidElement, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react"

type ProductWithOptionalOrder = Omit<Product, 'salesOnProduct' | 'histories' | 'unity' | "createdAt" | "updatedAt"> & Partial<{ order: { price: number, quantity: number } }>

export type SelectedProduct = Omit<Product, 'salesOnProduct' | 'histories' | 'unity' | "createdAt" | "updatedAt"> & {
    order: {
        price: number
        quantity: number
    }
}

type HeaderElement = ReactElement<{ children?: ReactNode }>

type IProducts = {
    products: ProductWithOptionalOrder[]
    selectedProducts: ProductWithOptionalOrder[]
    clearSelection: () => void

    append: ({ product, opts }: { product: ProductWithOptionalOrder, opts?: Partial<{ price: number, quantity: number }> }) => void
    remove: (productId: number) => void
    update: (productId: number, { price, quantity }: { price?: number, quantity?: number }) => void

}


export const ProductsContext = createContext<IProducts | undefined>(undefined)

interface ProductsProviderProps {
    data: Product[]
    children: ReactNode
    type?: 'sell' | 'purchase'
    onSelect?: (data: SelectedProduct[]) => void
}


export const ProductsProvider = ({ children, data = [], type = "sell", onSelect }: ProductsProviderProps) => {

    const isFirstRun = useRef(true)

    const normalizedToSelect = (p: ProductWithOptionalOrder): SelectedProduct => ({
        ...p,
        order: {
            price: p.order?.price ?? p.price ?? 0,
            quantity: p.order?.quantity ?? 1
        }
    })
    const products = useMemo(() => data as ProductWithOptionalOrder[], [data])
    // const [products, setProducts] = useState<ProductWithOptionalOrder[]>(data)
    const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(() => {
        const fromData = (data as ProductWithOptionalOrder[]) ?? []
        return fromData.filter(p => !!p.order).map(normalizedToSelect)
    })

    const clearSelection = useCallback(() => {
        setSelectedProducts([])
        // onSelect?.([])
    }, [])

    const append = useCallback(({ opts, product }: { product: ProductWithOptionalOrder, opts?: Partial<{ price: number, quantity: number }> }) => {
        setSelectedProducts((prev) => {
            if (prev.some(p => p.id === product.id)) return prev
            const price = opts?.price ?? (product.price) ?? 0
            const quantity = opts?.quantity ?? 1
            const newItem: SelectedProduct = {
                ...product,
                order: {
                    price,
                    quantity
                }
            }
            const update = [...prev, newItem]
            // onSelect?.(update)
            return update
        })
    }, [])

    const remove = useCallback((productId: number) => {
        setSelectedProducts((prev) => {
            const update = prev.filter(p => p.id !== productId)
            // onSelect?.(update)
            return update
        })
    }, [])

    const update = useCallback((productId: number, { price, quantity }: { price?: number, quantity?: number }) => {
        setSelectedProducts((prev) => {
            const update = prev.map(p => p.id === productId ? {
                ...p,
                order: { price: price ?? p.order.price ?? p.price, quantity: quantity ?? p.order.quantity }
            } : p)
            // onSelect?.(update)
            return update
        })
    }, [])

    const value: IProducts = useMemo(() => ({
        products: products,
        selectedProducts: selectedProducts,
        clearSelection: clearSelection,
        append: append,
        remove: remove,
        update: update,

    }), [data])

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false
            return
        }
        if (selectedProducts.length === 0) {
            onSelect?.([])
            return
        }
        onSelect?.(selectedProducts)
    }, [selectedProducts])

    // useEffect(() => {
    //     setProducts(() => data)
    // }, [data])

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    )
}