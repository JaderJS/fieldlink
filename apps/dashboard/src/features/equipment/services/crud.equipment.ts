import { api } from "@/core/api"
import { Equipment } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getEquipments = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.equipment.getAll>>) => {
    const { data } = await api.get<{ equipments: Equipment[] }>(`/equipments`)
    return data
}

const getEquipment = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.equipment.getById>>) => {
    const { data } = await api.get<{ equipment: Equipment }>(`/equipments/${ctx.queryKey[1]}`)
    return data
}

const upsertEquipment = async (body: any) => {
    const { data } = await api.post<{ equipment: Equipment }>(`/equipments`, body)
    return data
}

export {
    getEquipments,
    getEquipment,
    upsertEquipment
}