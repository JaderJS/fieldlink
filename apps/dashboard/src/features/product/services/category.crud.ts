import { api } from "@/core/api"

const getCategories = async () => {
    const resp = await api.get<{ categories: CategoryProduct[] }>(`/product/category`)
    return resp.data
}

export {
    getCategories
}