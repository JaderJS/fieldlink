import { api } from "@/core/api"

const getProducts = async () => {
    const resp = await api.get<{ products: Product[] }>('/product')
    return resp.data
}

const getProductById = async (id: number | string) => {
    const resp = await api.get<{ product: Product }>(`/product/${Number(id)}`)
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