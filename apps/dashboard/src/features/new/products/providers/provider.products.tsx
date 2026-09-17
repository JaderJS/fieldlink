'use client'

import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from "react"

export type IProduct = {
    id: string
    sku: string
    name: string
    stock: number
    price: number
    pictureUrl: string
    unit: "m" | "l" | "g"
    createdAt: Date
    updatedAt: Date
    content?: Record<string, any> //Tip tap
    description?: string
    order?: {
        name?: string
        quantity: number
        value: number
    }
    details?: {
        thumbUrl: string
        salePrice: number
        costPrice: number
        avgPrice: number
        history: IProduct[] //max 15
    }
}

export type ProductTableProps = {
    initialData?: IProduct[]
    className?: string
    pageSize?: number
}


const ProductTableContext = createContext<{
    data: IProduct[],
    setData: (updater: (prev: IProduct[]) => IProduct[]) => void;
} | null>(null)

export function useProductTableContext() {
    const ctx = useContext(ProductTableContext)
    if (!ctx) throw new Error("useProductTableContext must be inside ProductTableProvider")
    return ctx
}

type Primitive = string | number | boolean | bigint | symbol | null | undefined | Date

export type NestedKeys<T> = {
    [K in Extract<keyof T, string>]: T[K] extends Primitive
    ? K
    : T[K] extends Array<infer U>
    ? // include array index-level keys as just the property (no numeric indexes)
    K | `${K}.${Extract<keyof U, string>}`
    : K | `${K}.${NestedKeys<NonNullable<T[K]>>}`
}[Extract<keyof T, string>]

export function ProductTableRoot({
    children,
    initialData = [],

    data: controlledData,
    onDataChange
}: {
    children: ReactNode,
    initialData: IProduct[]

    //controlled props
    data?: IProduct[]
    onDataChange?: (next: IProduct[]) => void
}) {

    // const [data, setDataState] = useState<IProduct[]>(initialData)
    const [internalData, setInternalData] = useState<IProduct[]>(initialData)
    const data = controlledData ?? internalData

    const setData = useCallback(
        (updater: (prev: IProduct[]) => IProduct[]) => {
            if (controlledData && onDataChange) {
                onDataChange(updater(controlledData))
            } else {
                setInternalData((prev) => updater(prev))
                if (onDataChange) onDataChange(updater(internalData))
            }
        },
        [controlledData, onDataChange, internalData]
    )

    const value = useMemo(() => ({ data, setData }), [data, setData])

    return (
        <ProductTableContext.Provider
            value={value}
        >
            {children}
        </ProductTableContext.Provider>
    )
}