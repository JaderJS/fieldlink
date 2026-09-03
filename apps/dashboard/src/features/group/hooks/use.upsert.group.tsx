'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertGroup } from "../services/crud"
import { KEYS } from "@/core/keys"

export const useUpsertGroup = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertGroup,
        onSuccess: ({ group }) => {
            queryClient.invalidateQueries({ queryKey: KEYS.group.getAll() })
            queryClient.invalidateQueries({ queryKey: KEYS.group.getById(group.id) })
        }
    })
}