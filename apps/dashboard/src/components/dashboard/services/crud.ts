import { api } from "@/core/api"
import { Finance } from "../types"

const getDashboardFinance = async () => {
    const { data } = await api.get<{ dashboard: Finance }>(`/dashboard`)
    return data
}

export {
    getDashboardFinance
}