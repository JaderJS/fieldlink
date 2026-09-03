'use client'

import { ProductsProvider } from "../../providers/provider.products"
import { ViewProducts } from "../view.products"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
import { getProducts } from "@/features/product/services/crud"
import { MoreActions } from "../view/more.actions"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ActionItem } from "../view/action.item"
import { Header, HeaderSearch } from "../view/header"
import z from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"


export const DebugViewProducts = () => {

    const { data } = useQuery({
        queryKey: KEYS.product.getAll(),
        queryFn: getProducts,
        select: data => data.products,
        // select: data => data.products.map((p, index) => ({ ...p, order: index < 3 ? { price: (index + 5) * 10, quantity: 2 } : undefined })).slice(0, 20)
    })

    return (
        <>

            {data && <ProductsProvider
                data={data}
                onSelect={console.log}
            >
                <ViewProducts>
                    <Header>
                        <HeaderSearch />
                    </Header>
                    <MoreActions>
                        {(product) => (
                            <ActionItem onClick={console.log}>Editar {product.id}</ActionItem>
                        )}
                    </MoreActions>
                </ViewProducts>
            </ProductsProvider>}

        </>
    )
}