import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChannelSchema } from "../types"
import { getChannelSchema, upsertChannelSchema } from "../services/crud"
import { KEYS } from "@/core/keys"

export const useUpsertChannelSchema = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertChannelSchema,
        onSuccess: (resp) => {
            queryClient.invalidateQueries({ queryKey: KEYS.channelSchema.getAll() })
            queryClient.invalidateQueries({ queryKey: KEYS.channelSchema.getById(resp.channelSchema.id) })
        }
    })
}