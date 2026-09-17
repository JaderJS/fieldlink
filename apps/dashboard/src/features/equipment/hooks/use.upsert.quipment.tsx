'use client'

import { useMutation } from "@tanstack/react-query"
import { upsertEquipment } from "../services/crud.equipment"

export const useUpsertEquipment = () => {
    return useMutation({
        mutationFn: upsertEquipment
    })
}