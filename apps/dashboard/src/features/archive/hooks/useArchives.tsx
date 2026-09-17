'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getArchives } from "../service/archive.service"

type IFilters = {
    transaction?: { id: number }
}

export const useArchives = ({ filters }: { filters?: IFilters } = {}) => {
    return useQuery({
        queryKey: KEYS.archive.getAll({ transaction: { id: filters?.transaction?.id ?? -1 } }),
        queryFn: getArchives,
        select: data => data.archives
    })
}