'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getGroups } from "../services/crud"
import { Station } from "@/features/station/types"

export const useGroups = ({ filters }: { filters?: { station?: Pick<Station, 'id'> } } = {}) => {
    return useQuery({
        queryKey: KEYS.group.getAll({ stationId: filters?.station?.id }),
        queryFn: getGroups,
        select: data => data.groups
    })
}