'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteClient } from "../service/client.crud"
import { KEYS } from "@/core/keys"

export const useDeleteClient = () => {

    const querClient = useQueryClient()

    return useMutation({
        mutationFn: deleteClient,
        onSuccess: () => {
            querClient.invalidateQueries({ queryKey: KEYS.client.getAll() })
        }
    })
}