'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getEquipments } from "../services/crud.equipment"

export const useEquipments = () => {
    return useQuery({
        queryKey: KEYS.equipment.getAll(),
        queryFn: getEquipments,
        select: data => data.equipments
    })
}