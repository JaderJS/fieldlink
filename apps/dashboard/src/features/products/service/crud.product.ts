import { api } from "@/core/api"
import { KEYS } from "@/core/keys"
import { QueryFunctionContext } from "@tanstack/react-query"

const getProducts = async () => {
    const resp = await api.get<{ products: Product[] }>('/product')
    return resp.data
}

const getProductById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.product.getById>>) => {

    const resp = await api.get<{ product: Product }>(`/product/${ctx.queryKey[1].id}`)
    return resp.data
}

const upsertProduct = async (body: any) => {
    const resp = await api.post<{ product: Product }>('/product', body)
    return resp.data
}

const deleteProduct = async (id: number) => {
    const resp = await api.delete<{ product: Product }>(`/product/${id}`)
    return resp.data
}

export {
    getProducts,
    getProductById,
    upsertProduct,
    deleteProduct
}