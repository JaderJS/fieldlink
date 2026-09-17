import { api } from "@/core/api"
import { Group } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getGroups = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.group.getAll>>) => {
    const { data } = await api.get<{ groups: Group[] }>(`/groups`, { params: ctx.queryKey[1] })
    return data
}

const getGroup = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.group.getById>>) => {
    const { data } = await api.get<{ group: Group }>(`/groups/${ctx.queryKey[1]}`)
    return data
}

const upsertGroup = async (body: any) => {
    const { data } = await api.post<{ group: Group }>(`/groups`, body)
    return data
}

export {
    getGroups,
    getGroup,
    upsertGroup
}

