'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertProperty } from "../services/crud.properties"
import { KEYS } from "@/core/keys"

export const useUpsertProperty = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertProperty,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: KEYS.property.getAll() })
        }
    })
} 