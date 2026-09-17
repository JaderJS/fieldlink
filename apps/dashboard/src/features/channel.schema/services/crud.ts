import { api } from "@/core/api"
import { ChannelSchema } from "../types"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getChannelsSchemas = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.channelSchema.getAll>>) => {
    const { data } = await api.get<{ channelsSchemas: ChannelSchema[] }>(`/channels-schemas`, { params: ctx.queryKey[1] })
    return data
}

const getChannelSchema = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.channelSchema.getById>>) => {
    const { data } = await api.get<{ channelSchema: ChannelSchema }>(`/channels-schemas/${ctx.queryKey[1]}`)
    return data
}

const upsertChannelSchema = async (body: any) => {
    const { data } = await api.post<{ channelSchema: ChannelSchema }>(`/channels-schemas`, body)
    return data
}

export {
    getChannelsSchemas,
    getChannelSchema,
    upsertChannelSchema
}
