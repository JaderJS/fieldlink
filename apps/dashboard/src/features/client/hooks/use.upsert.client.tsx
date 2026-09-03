'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertClient } from "../service/client.crud"
import { KEYS } from "@/core/keys"

export const useUpsertClient = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertClient,
        onSuccess: ({ client }) => {
            queryClient.invalidateQueries({ queryKey: KEYS.client.getAll() })
            queryClient.invalidateQueries({ queryKey: KEYS.client.getById(client.id) })
        }
    })
}