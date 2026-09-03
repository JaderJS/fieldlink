import { api } from "@/core/api"
import { getCookie } from "cookies-next"
import axios, { AxiosResponse } from "axios"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"
interface UploadImageProps {
    pathUrl: string
    path: string
}

async function uploadImage(formData: FormData): Promise<UploadImageProps> {
    const resp: AxiosResponse<UploadImageProps> = await api.post(`/upload/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return resp.data
}

interface ResponseUploadFile {
    contentType: string
    path: string
    pathUrl: string
    size: string
}

const uploadFile = async (formData: FormData) => {
    const resp = await api.post<ResponseUploadFile>(`/upload/file`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return resp.data
}

interface ResponseFindLocationByCity {
    results: {
        location: {
            coordinates: {
                latitude: string
                longitude: string
            }
        }
    }[]
}

const randomLocation = async () => {
    const resp = await api.get<ResponseFindLocationByCity>('https://randomuser.me/api/')
    const latitude = parseFloat(resp.data.results[0].location.coordinates.latitude)
    const longitude = parseFloat(resp.data.results[0].location.coordinates.longitude)
    const coordinates = [longitude, latitude]
    return coordinates
}

interface ResponseGetCoordinateByCity {
    place_id: number
    name: string
    lat: string
    lon: string
    [key: string]: any
}
const getCoordinateByCity = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.location.getByName>>) => {
    const [_key, params] = ctx.queryKey
    const resp = await axios.get<ResponseGetCoordinateByCity[]>('https://nominatim.openstreetmap.org/search', {
        params: {
            q: params.cityName,
            format: 'json',
            addressDetails: 1,
            limit: 5
        }
    })
    const process = resp.data.map((city) => ({ ...city, id: city.place_id, lon: parseFloat(city.lon), lat: parseFloat(city.lat) }))

    return process
}

export { randomLocation, uploadImage, getCoordinateByCity, uploadFile }