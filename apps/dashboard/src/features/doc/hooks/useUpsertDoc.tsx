'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertDoc } from "../services/crud"
import { KEYS } from "@/core/keys"


export const useUpsertDoc = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertDoc,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: KEYS.docs.getAll() })
        }
    })

}