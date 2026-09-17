import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { ChannelSchema } from "../types"
import { getChannelSchema } from "../services/crud"

export const useChannelSchema = ({ channelSchema }: { channelSchema: Pick<ChannelSchema, 'id'> & Omit<ChannelSchema, "id"> }) => {
    return useQuery({
        queryKey: KEYS.channelSchema.getById(channelSchema.id),
        queryFn: getChannelSchema,
        select: data => data.channelSchema,
        initialData: {
            channelSchema: channelSchema
        }
    })
}