import { api } from "@/core/api"
import { Property } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getProperties = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.property.getAll>>) => {
    const { data } = await api.get<{ properties: Property[] }>(`/properties`, { params: ctx.queryKey[1] })
    return data
}

const getPropertyById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.property.getById>>) => {
    const { data } = await api.get<{ property: Property }>(`/property/${ctx.queryKey[1]}`)
    return data
}

const getProperty = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.property.getById>>) => {
    const { data } = await api.post<{ property: Property }>(`/properties/${ctx.queryKey[2]}`)
    return data
}

const upsertProperty = async (body: any) => {
    const { data } = await api.post<{ property: Property }>(`/properties`, body)
    return data
}


export {
    getProperties,
    getPropertyById,
    getProperty,
    upsertProperty
}