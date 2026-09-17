import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { ChannelSchema } from "../types"
import { getChannelsSchemas } from "../services/crud"

export const useChannelsSchemas = ({ filters }: { filters?: { stationId: number } } = {}) => {
    return useQuery({
        queryKey: KEYS.channelSchema.getAll({ stationId: filters?.stationId }),
        queryFn: getChannelsSchemas,
        select: data => data.channelsSchemas
    })
}