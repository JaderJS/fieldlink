'use client'

import { Input } from '@/components/ui/input'
import React, { ChangeEvent, ReactNode, useContext, useEffect, useState } from 'react'
import { useProductsTable } from '../../hooks/use.product.table'

export const Header = ({ children }: { children?: ReactNode }) => {
    return <div>{children}</div>
}

export const HeaderSearch = () => {

    const { table } = useProductsTable()

    const [search, setSearch] = useState<string>("")

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = String(e.target.value)
        table?.setGlobalFilter(value)
        setSearch(value)
    }

    return (
        <Input placeholder='Buscar produtos' value={search} onChange={handleSearch} />
    )
}