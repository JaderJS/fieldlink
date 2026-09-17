import { api } from "@/core/api"

const getSuppliers = async () => {
    const resp = await api.get<{ suppliers: Supplier[] }>(`/supplier`)
    return resp.data
}

export {
    getSuppliers
}