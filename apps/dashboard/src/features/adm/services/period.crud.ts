import { api } from "@/core/api"
import { Period } from "@/features/period/types"

const getPeriods = async () => {
    const resp = await api.get<{ periods: Period[] }>(`/period`)
    return resp.data
}

export { getPeriods }
