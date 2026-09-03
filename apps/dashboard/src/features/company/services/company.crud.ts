import { api } from "@/core/api"
import { Company } from "../types"

const getCompanies = async () => {
    const resp = await api.get<{ companies: Company[] }>(`/company`)
    return resp.data
}

export { getCompanies }
