'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { Cart } from "../types"
import { getCartById } from "../services/crud"

export const useCart = ({ cart }: { cart: Pick<Cart, "id"> }) => {
    return useQuery({
        queryKey: KEYS.cart.getById(cart.id),
        queryFn: getCartById,
        select: data => data.cart
    })
}