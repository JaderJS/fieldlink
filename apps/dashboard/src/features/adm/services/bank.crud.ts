import { api } from "@/core/api"
import { Bank } from "@/features/bank/types"

const getBanks = async () => {
    const resp = await api.get<{ banks: Bank[] }>(`/bank`)
    return resp.data
}

export { getBanks }
