import { api } from "@/core/api"
import { Property } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getProperties = async () => {
    const { data } = await api.get<{ properties: Property[] }>(`/properties`)
    return data
}

const getProperty = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.property.getById>>) => {
    const { data } = await api.post<{ property: Property }>(`/properties/${ctx.queryKey[2]}`)
    return data
}

const upsertProperty = async () => {
    const { data } = await api.post<{ property: Property }>(`/properties`)
    return data
}

export {
    getProperties,
    getProperty,
    upsertProperty
}