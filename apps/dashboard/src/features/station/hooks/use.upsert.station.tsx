'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { upsertStation } from "../services/crud.services"
import { KEYS } from "@/core/keys"

export const useUpsertStation = () => {

    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: upsertStation,
        onSuccess: (resp) => {
            console.log(resp)
            queryClient.invalidateQueries({ queryKey: KEYS.station.getAll() })
            queryClient.invalidateQueries({ queryKey: KEYS.station.getById(resp.station.id) })
        }
    })
}