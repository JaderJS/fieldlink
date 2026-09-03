import axios, { AxiosError } from "axios"
import { toast } from "sonner"

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_INTERNAL_BACKEND_URL || "http://localhost:3000"
    : "/api"
console.log(baseURL)
export const api = axios.create({
    baseURL: baseURL,
    withCredentials: true
})

api.interceptors.request.use(async (config) => {
    if (typeof window === "undefined") {
        const { headers } = await import("next/headers")
        config.headers = await headers() as any
    }
    return config
}, error => {
    return Promise.reject(error)
})

interface ResponseError {
    msg: string
    [k: string]: any
}

api.interceptors.response.use((res) => res, (error: AxiosError<ResponseError>) => {
    const slug = error.response?.data.msg || error.response?.data.message || error.message || "Ops! Algo deu errado"
    if (typeof window !== "undefined") {
        console.error(error.response)
        if (["401", "403"].includes(error.code!)) {
            toast.warning(slug)
            return Promise.reject(error)
        }
        if ([302].includes(error.response?.status!)) {
            const url = error.response?.data.url
            window.location.href = error.response?.data.url
            return Promise.reject(error)
        }
        toast.error(slug)
    }
    return Promise.reject(error)
})  