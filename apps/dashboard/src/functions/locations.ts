import { api } from "@/core/api"

const getSitesByLocation = async (body: { longitude: number, latitude: number, maxDistance?: number }) => {
    const resp = await api.post(`/location/get-sites`, body)
    return resp.data
}

export { getSitesByLocation }