import { api } from "@/core/api"
import { Cart } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getCarts = async () => {
    const resp = await api.get<{ carts: Cart[] }>(`/cart`)
    return resp.data
}

const getCartById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.cart.getById>>) => {
    const { data } = await api.get<{ cart: Cart }>(`/cart/${ctx.queryKey[1]}`)
    return data
}
const upsertCart = async (body: any) => {
    const resp = await api.post<{ cart: Cart }>(`/cart`, body)
    return resp.data
}

const deleteCart = async (id: number) => {
    const resp = await api.delete<{ cart: Cart }>(`/cart/${id}`)
    return resp.data
}

export {
    getCarts,
    getCartById,
    upsertCart,
    deleteCart
}