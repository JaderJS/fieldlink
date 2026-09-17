import { api } from "@/core/api"
import { Station } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"


const getStations = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.station.getAll>>) => {
    const { data } = await api.get<{ stations: Station[] }>(`/stations`, {
        params: ctx.queryKey[1]
    })
    return data
}

const getStation = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.station.getById>>) => {
    const { data } = await api.get<{ station: Station }>(`/stations/${ctx.queryKey[1]}`)
    return data
}

const upsertStation = async (body: any) => {
    const { data } = await api.post<{ station: Station }>(`/stations`, body)
    return data
}

export {
    getStations,
    getStation,
    upsertStation,
}