'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { Equipment } from "../types"
import { getEquipment } from "../services/crud.equipment"

export const useEquipment = ({ equipment }: { equipment: Pick<Equipment, "id"> }) => {
    return useQuery({
        queryKey: KEYS.equipment.getById(equipment.id),
        queryFn: getEquipment,
        select: data => data.equipment
    })
}